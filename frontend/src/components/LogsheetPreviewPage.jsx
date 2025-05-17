import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api'; 

const LogsheetPreviewPage = () => {
  const { logsheetId } = useParams();
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          const response = await api.get(`/logs/${logsheetId}/pdf/`, {
            responseType: 'blob',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

         
          const pdfBlob = response.data;
          const url = URL.createObjectURL(pdfBlob);
          setPdfUrl(url);
        }
      } catch (error) {
        console.error('Error fetching PDF:', error);
      }
    };

    fetchPdf();
  }, [logsheetId]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>PDF Logsheet Preview (ID: {logsheetId})</h2>
      {pdfUrl ? (
        <iframe
          src={pdfUrl}  
          title="Logsheet PDF"
          width="100%"
          height="600px"
          style={{ border: '1px solid #ccc', borderRadius: '8px' }}
        ></iframe>
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
};

export default LogsheetPreviewPage;


