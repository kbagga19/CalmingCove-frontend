import { React, useState, useEffect, useCallback } from 'react';
import questionsData from '../../utils/questions.js';
import '../../styles/QuestionsPage.css';
import QuestionPart from '../../components/QuestionsPart/QuestionPart.jsx';
import image from '../../assets/quesBackground-2.png';
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link, useParams } from 'react-router-dom';
import GeneralUserDetails from '../../components/GeneralUserDetails/GeneralUserDetails.jsx';
import TestPDF from './TestPdf.jsx';
import axiosapi from '../../services/axiosapi.js'

function QuestionsPage() {
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState([]);
    const [result, setResult] = useState(null);
    const [index, setIndex] = useState(0);
    const [questionsActive, setQuestionsActive] = useState(false);
    const [answerActive, setAnswerActive] = useState(false);
    const [error, setError] = useState('');
    const [isVisible, setIsVisible] = useState(true);
    const [detailsActive, setDetailsActive] = useState(false);
    const [testData, setTestData] = useState([]);
    const [pdfSaved, setPdfSaved] = useState(false);
    const url = 'http://127.0.0.1:5000/depdet/';
    const id = useParams();

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const savePDF = useCallback(async (pdfBlob) => {
        if (pdfSaved) {
            console.log('PDF has already been saved');
            return;
          }
        try {
        console.log(pdfBlob)
        console.log('savePDF function called');
          const formData = new FormData();
          formData.append('pdfFile', pdfBlob, 'test_results.pdf');
          const response = await axiosapi.post(`/extra/addReport/${localStorage.getItem('id')}`, formData, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": "true"
            },
          })
          console.log('PDF saved successfully:', response.data);
          setPdfSaved(true);
        } catch (error) {
          console.error('Failed to save PDF:', error);
        }
    }, [pdfSaved]);


    //to handle the next button to display the next question
    function onNextClick() {
        if (values[index] != null) {
            setIndex(index => index + 1);
            setTimeout(() => {
                setIsVisible(false)
            }, -1000)
            setTimeout(() => {
                setIsVisible(true)
            }, 500)
        } else {
            setError("Answer this question first!");
        }
    }

    //to handle the submit button and calculate results
    const submitResults = async () => {
        setQuestionsActive(false);
        setAnswerActive(true);
        const currentValues = values;
        console.log(currentValues);
        const currentModel = 7;
        console.log(testData)

        if (currentModel === -1) {
            return;
        }

        const obj = { values: currentValues, model: currentModel };
        const jsonStr = JSON.stringify(obj);

        try {
            const resp = await fetch(url + jsonStr, { signal: new AbortController().signal, timeout: 2000 })
                .then(response => response.json());

            displayResults(resp.prediction, currentModel);
            finalResults(resp.prediction);
            localStorage.setItem("result", resp.prediction * 100)
        } catch (err) {
            displayResults(-1, currentModel);
        }
    };

    function finalResults(resul) {
        axiosapi.post(`/extra/addDetails`, { 
            "userId": localStorage.getItem('id'), 
            "result": resul * 100 
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true"
            }
        })
    }

    const displayResults = (result, currentModel) => {
        let resultText;

        if (result > 0.5) {
            resultText = 'High probability of depression';
        } else {
            resultText = 'Low probability of depression';
        }

        if (currentModel === 5 || currentModel === 7) {
            resultText = `${resultText}: ${result * 100}%`;
        }

        if (result === -1) {
            resultText = 'Connection timed out!';
        }

        setResult(resultText);
    };

    return (
        <div style={{ backgroundImage: `url(${image})`, height: '100vh', width: '100vw', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            {loading ? (
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>
            ) : (
                <div>
                    {!detailsActive && !answerActive && !questionsActive && (
                        <div className="assessmentHead">
                            <h1>Start The Assessment</h1>
                            <AiOutlineArrowRight onClick={() => setQuestionsActive(current => !current)} className='nextArrow' />
                        </div>
                    )}

                    {questionsActive && (
                        <>
                            <div className="radio-parent">
                                {questionsData
                                    .filter((question) => question.type === id.id)
                                    .slice(index, index + 1).map(question =>
                                        <div className={`content ${isVisible ? 'visible' : ''}`}>
                                            <QuestionPart setError={setError} setValues={setValues} question={question} index={index} setTestData={setTestData} />
                                        </div>
                                    )}

                                {index < questionsData.filter((question) => question.type === id.id).length - 1 ? (
                                    <button onClick={onNextClick}>Next Question <AiOutlineArrowRight /></button>
                                ) : (
                                    <button onClick={submitResults} type="button" id="submit-btn">Submit</button>
                                )}

                                {error === 'Answer this question first!' && (
                                    <h2 style={{ color: 'red', animation: 'animate 1s linear infinite' }}>{error}</h2>
                                )}
                                <div className='mainQuestionsBar'>
                                    <div className='questionsCompletedBar'>
                                        <div style={{ width: `${(values.length / 13) * 100}%`, height: "2vh" }} className='innerQuestionsBar'></div>
                                    </div>
                                    <h3>{Math.ceil((values.length / 13) * 100)}%</h3>
                                </div>
                            </div>
                        </>
                    )}

                    {answerActive && (
                        <div id="result">
                            <h1>{result}</h1>
                            <button onClick={() => { setAnswerActive(false); setQuestionsActive(false); setDetailsActive(true) }}>Continue<AiOutlineArrowRight /></button>
                            {result != null && (
                            <TestPDF testData={testData} result={result} onPdfGenerated={savePDF} />
                            )
                            }
                        </div>
                    )}

                    {detailsActive && (
                        <GeneralUserDetails />
                    )}
                </div>
            )}
        </div>
    )
}

export default QuestionsPage