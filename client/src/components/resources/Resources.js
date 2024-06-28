import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Resources.css';

const Resources = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/resources');
      setResources(res.data);
    } catch (err) {
      console.error('Error fetching resources: ', err);
    }
  };

  return (
    <div className="resource-page">
      <div className="resources-container">
      <h2>Resources</h2>
      <div className="resources-list">
        {resources.map((resource) => (
          <a href={resource.url} key={resource._id} className="resource-button" target='_blank' rel="noreferrer">
            {resource.title}
          </a>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Resources;
