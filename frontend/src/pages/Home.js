import React from 'react';
import '../style/Home.css';
import { Link } from 'react-router-dom';
import EventCalendar from '../components/calender/EventCalendar';
import { Container } from 'react-bootstrap';

function Home({ user }) {
  return (
    <>
      {user.authenticated ? (
        <Container style={{ marginTop: '2vh' }}>
          <EventCalendar user={user} />
        </Container>
      ) : (
        <div className="Home">
          <div></div>
          <div className="headerContainer">
            <h1>When2Meet2.0</h1>
            <p>Find group avaliable time by importing from google calender</p>
            <button>
              <Link
                to="/create"
                style={{ textDecoration: 'none', color: '#FFF' }}
              >
                {' '}
                TRY IT NOW{' '}
              </Link>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
