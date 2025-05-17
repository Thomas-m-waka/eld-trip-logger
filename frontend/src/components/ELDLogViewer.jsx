// src/components/ELDLogViewer.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ELDMapViewer from './ELDMapViewer';

const ELDLogViewer = ({ dailyLogId }) => {
  const [eldEntries, setEldEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await axios.get(`/api/eld-logs/?daily_log=${dailyLogId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`
          }
        });
        setEldEntries(res.data);
      } catch (err) {
        console.error('Failed to load ELD entries:', err);
      }
    };
    fetchEntries();
  }, [dailyLogId]);

  return <ELDMapViewer eldEntries={eldEntries} />;
};

export default ELDLogViewer;
