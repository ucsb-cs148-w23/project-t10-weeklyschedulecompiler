import { useNavigate } from 'react-router-dom';
import '../style/DefaultLayout.css';
import React from 'react';

export default function DefaultLayout({ children, header, component }) {
  const navigate = useNavigate();
  return (
    <div className='background'>
        <div style={{marginTop: '5%'}} className="headerContainer">
          <h>{header}</h>
          <p>{component}</p>
        </div>
      <p>{children}</p>
    </div>
  );
}