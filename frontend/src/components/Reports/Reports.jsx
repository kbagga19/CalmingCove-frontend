import React, {useState, useEffect} from 'react'
import './Reports.css';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import axiosapi from '../../services/axiosapi';


function Reports() {
    const [reports, setReports] = useState([]);
    const [pdf, setPdfs] = useState([]);

    // Get Groups Joined
    const fetchData = async () => {
      try {
        const response = await axiosapi.get(`/extra/getUserReport/${localStorage.getItem("id")}`,{ 
          headers: { 
          "Access-Control-Allow-Origin": "*",
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
          } 
        })
        console.log(response.data)
        if (response.status === 200) {
            const pdfs = await response.data;
            console.log(pdfs.map(obj => obj.data));
            setReports(pdfs.map(obj => obj.data))
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        } 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    
    useEffect(() => { 
      fetchData();
    },[])

    useEffect(() => {
        const decodedPDFs = reports.map((base64PDF, index) => {
            const binaryString = window.atob(base64PDF);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            const blob = new Blob([bytes], { type: 'application/pdf' });
            console.log(blob);
            return { blob, fileName: `pdf_${index + 1}.pdf` };
        });
        setPdfs(decodedPDFs)
      }, [reports]);
    

    return (
        <div className='mainReportsPage'>
          <h3>Your Reports</h3>
          {reports.length === 0 ? (
            <h5>Take the test to view reports!</h5>
          ) : (
            <div className='reportBox'>
                {pdf.map(({ blob, fileName }, index) => (
                    <div className='reportInnerBox' key={index}>
                        <a href={URL.createObjectURL(blob)} download={fileName}>
                            Report - {++index}
                        </a>
                        <FileDownloadIcon/>
                    </div>
                ))}
            </div>  
          )
            
          }
        </div>
    )
}

export default Reports