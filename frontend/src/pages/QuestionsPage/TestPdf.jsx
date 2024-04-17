import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  pdf,
} from '@react-pdf/renderer';
import Logo from "../../assets/logo.png";
import {format} from 'date-fns';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    header: {
        flexDirection: 'row',
        height: '10%'
    },
    imagePart: {
        paddingLeft: 50,
        justifyContent: 'center',
        width: '65%',
        backgroundColor: '#00007D',
        borderBottomRightRadius: 50
    },
    textPart: {
        backgroundColor: '#242346',
        position: 'absolute',
        right: 0,
        top: 0,
        height: '100%',
        width: '45%',
        borderBottomLeftRadius: -50,
        zIndex: -1,
        alignItems: 'center',
        paddingLeft: '15%',
        justifyContent: 'center',
        textAlign: 'right'
    },
    headerText: {
        color: '#fff',
        fontSize: 8,
        fontFamily: 'Helvetica',
        letterSpacing: 0.5
    },
    logo: {
        width: 60,
        height: 60,
    },
    section: {
        padding: 20,
    },
    title: {
        fontSize: 16,
        fontFamily: 'Helvetica-Bold',
        marginBottom: 10,
    },
    heading: {
        textAlign: 'center',
        color: '#000477',
        fontFamily: 'Helvetica-Bold'
    },
    question: {
        fontSize: 12,
        fontFamily: 'Helvetica-Bold',
        marginBottom: 3,
    },
    answer: {
        fontSize: 12,
        fontFamily: 'Helvetica',
        marginBottom: 10,
        paddingLeft: 18,
    },
    boldText: {
        fontFamily: 'Helvetica-Bold',
    },
    name: {
        color: '#000477',
    }
});

const TestPDF = ({ testData, result, onPdfGenerated }) => {    
    const currentDateAndTime = new Date();

    useEffect(() => {
        generatePDF();
    }, []);

    const generatePDF = async () => {
        const blob = await pdf(
        <Document>
            <Page size="A4" style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.imagePart}>
                        <Image src={Logo} style={styles.logo} />
                    </View>
                    <View style={styles.textPart}>
                        <Text style={styles.headerText}>
                            <Text style={styles.boldText}>MindWell</Text>
                            {'\n'}
                            New Delhi, IN 110027
                            {'\n'}
                            mindwell19@gmail.com
                            {'\n'}
                            123 456 7890
                        </Text>
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.heading}>TEST REPORT</Text>
                    <Text style={styles.question}>{`Name:`}<Text style={styles.name}> {`${localStorage.getItem('name')}`}</Text></Text>

                    <View style={styles.section}>
                    {testData.map((q, index) => (
                        <View key={index}>
                        <Text style={styles.question}>{`${index + 1}. ${q.ques}?`}</Text>
                        <Text style={styles.answer}>{q.ans}</Text>
                        </View>
                    ))}
                    </View>

                    <Text style={styles.question}>Result: <Text style={styles.name}>{`${result}`}</Text></Text>
                    <Text style={styles.question}>Generated On: <Text style={styles.name}>{format(currentDateAndTime, 'dd-MM-yyyy HH:mm:ss')}</Text>
                    </Text>
                </View>
            </Page>
        </Document>
        ).toBlob();
        onPdfGenerated(blob);
    };
    return <div style={{display: 'flex', gap: '5px', alignItems: 'center'}}><InfoOutlinedIcon/>Report generated! You can download it from reports section in dashboard.</div>;
};
  
export default TestPDF;