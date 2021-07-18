import React, { useRef, useEffect } from 'react';
import './LandingPage.scss'
import movie from '../../videos/mars.mp4';
import { Link } from 'react-router-dom';

const LandgingPage = () => {

  const myVideo = useRef();

  useEffect(() => {
    myVideo.current.playbackRate = 1;
  }, [myVideo])

  return (
    <div className="landing-container">
      <video ref={myVideo} src={movie} muted loop autoPlay></video>
      <section className="content">
        <h2 className="title">Welcome Martian Explorer</h2>
        <ul className="nav">
          <li className="nav-link">
            <Link to='/rovers'>Rovers</Link>
          </li>
          <li className="nav-link">
            <Link to='/history'>History</Link>
          </li>
        </ul>
      </section>

    </div>
  );
}

export default LandgingPage;