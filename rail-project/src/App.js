import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './css/animate.css';
import './css/style1.css';

import React, {useEffect, useState} from 'react';
import Header1 from './component/Header1';
import MiddleSection from './component/MiddleSection';
import About from './component/About';
// import Animation from './component/animation';
import Holiday from './component/Holiday';
import Service from './component/Service';
import Footer from './component/Footer';
import Authentication from './component/Authentication';
import LocalTrain from './component/Local';
import Express from './component/Express';
import Local from './component/Local';
// import Chat2 from './component/Chat2';
import Booking from './component/Booking';
// import Chat3 from './component/Chat3';
import News from './component/News';
import PublishNews from './component/PublishNews';
import NewsFullContent from './component/NewsFullContent';
import Profile from './component/Profile';
import Pnr from './component/Pnr';
import TrainSchedule from './component/TrainSchedule';
import Chat from './component/Chat';

const Temp = () =>{
  const location = useLocation();

  return (
        <Routes>
          <Route path="/" element={
            <>
              <Header1/>
              <div>
                <MiddleSection/>
                <About/>
                <Holiday/>
                <Service/>
                <Footer/>
              </div>
            </>
          } />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/express" element={<Express />} />
          <Route path="/local" element={<Local />} />
          <Route path="/chat" element={<Chat/>} />
          <Route path="/booking" element={<Booking/>} />
          <Route path="/news" element={<News/>} />
          <Route path="/publish-news" element={<PublishNews/>} />
          <Route path="/news/:id" element={<NewsFullContent/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/pnr" element={<Pnr/>} />
          <Route path="/train-schedule" element={<TrainSchedule/>} />
          
          
          
        </Routes>
  );
};

function App() {
  return (
    <Router>
      <Temp />
    </Router>
  );
}

export default App;
