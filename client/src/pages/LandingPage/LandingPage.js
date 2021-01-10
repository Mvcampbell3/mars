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
      {/* <div className="overlay fade-in-animation fast"></div> */}
      <section className="content">
        <h1 className="title">Welcome Martian Explorer</h1>
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