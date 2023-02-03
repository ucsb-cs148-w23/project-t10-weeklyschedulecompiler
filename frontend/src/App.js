import { useState } from 'react';
import AppNavbar from './components/Nav/AppNavbar';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import CreateGroupPage from './pages/CreateGroupPage';
import Cal from './components/calender/Cal';
import WeekCal from './components/calender/WeekCal';
function App() {
  const [user, setUser] = useState(true);
  return (
    <div className="App">
      <AppNavbar />
      <Home />
      <Cal />
      <WeekCal />
      {/* <Router>
      <AppNavbar />
        <Routes>
          <Route path="/" exact component={Home} />
        </Routes>
      </Router> */}
    </div>
  );
}

export default App;
