// src/components/LogsheetPreviewPage.jsx
import { useParams } from 'react-router-dom';

function LogsheetPreviewPage() {
  const { logsheetId } = useParams();
  const pdfUrl = `/api/logs/${logsheetId}/pdf/`;

  return (
    <div className="pdf-preview-container" style={{ padding: '1rem' }}>
      <h2>Logsheet Preview - ID: {logsheetId}</h2>
      <iframe
        src={pdfUrl}
        title="Logsheet PDF Preview"
        width="100%"
        height="800px"
        style={{ border: '1px solid #ccc' }}
      />
    </div>
  );
}

export default LogsheetPreviewPage;

