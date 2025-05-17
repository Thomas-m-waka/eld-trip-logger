// src/components/LogsheetPreview.jsx
import { useNavigate } from 'react-router-dom';

function LogsheetPreview({ logsheetId }) {
  const navigate = useNavigate();

  const handlePreview = () => {
    navigate(`/logsheet-preview/${logsheetId}`);
  };

  return (
    <button onClick={handlePreview} className="btn btn-sm btn-primary">
      Preview
    </button>
  );
}

export default LogsheetPreview;
