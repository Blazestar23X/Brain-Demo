import Calendar from './calendar';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Payment from './payment';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/calendar">Calendar</Link> |{" "}
        <Link to="/payment">Payment</Link>
      </nav>
      <Routes>
        <Route path="/calendar" element={<Calendar />}/>
        <Route path="/payment" element={<Payment />}/>

      </Routes>
    </Router>
    //<Calendar />
    
  );
}

export default App;
