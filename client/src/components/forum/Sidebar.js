import React from 'react';
import './Forum.css';

export default function Sidebar({handleClick}) {
  return (
    <div className="sidebar-section">
      <h3>Discussion related to</h3>
      <button onClick={()=>handleClick('Anxiety')}>Anxiety</button>
      <button onClick={()=>handleClick('Depression')}>Depression</button>
      <button onClick={()=>handleClick('Bipolar Disorder')}>Bipolar Disorder</button>
      <button onClick={()=>handleClick('Schizophrenia')}>Schizophrenia</button>
      <button onClick={()=>handleClick('OCD')}>OCD</button>
      <button onClick={()=>handleClick('PTSD')}>PTSD</button>
      <button onClick={()=>handleClick('Burnout')}>Burnout</button>
      <button onClick={()=>handleClick('ADHD')}>ADHD</button>
    </div>
  )
}