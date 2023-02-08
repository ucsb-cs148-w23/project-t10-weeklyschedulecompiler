import React from 'react';
import '../style/Home.css';

function Main() {
  return (
    <div className="Home">
      <div></div>
      <div className="headerContainer">
        <h1>When2Meet2.0</h1>
        <p>Find group avaliable time by importing from google calender</p>

        <a href="https://project-t10-schedulecompiler.herokuapp.com/auth/google">
          <button>TRY IT NOW </button>
        </a>
      </div>
    </div>
  );
}

export default Main;
