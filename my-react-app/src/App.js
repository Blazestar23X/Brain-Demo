import Calendar from './calendar';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Payment from './payment';
import Blog from './blog';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51RtTFBDsF3l93BGzKJzXLkf4qq5QjQCnkbIEKTALmfxsuTeGppJrxqF4GNvoW9cE2yCbXwfuF6eTArV2iVW4hqH500TGb2wjYn');

function App() {
  return (
    <Router>
      <nav>
        <Link to="/calendar">Calendar</Link> |{" "}
        <Link to="/payment">Payment</Link> |{" "}
        <Link to="/blog">Blog</Link>
      </nav>
      <Routes>
        <Route path="/calendar" element={<Calendar />} />
        <Route
          path="/payment"
          element={
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          }
        />
        <Route path="/blog" element={<Blog />}/>
      </Routes>
    </Router>
  );
}

export default App;
