import React, { useState, useEffect } from 'react';
import './RoverPage.scss';
import Button from '../../components/Button';

import nasaAPI from '../../utils/axios';

const RoverPage = (props) => {

  const [selectedRover, setSelectedRover] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedRover !== '') {
      setLoading(true);
      console.log('selectedRover', selectedRover)
      nasaAPI.getRoverManifest(selectedRover)
        .then(result => {
          console.log(result.data);
          setLoading(false)
        })
        .catch(err => {
          console.log(err)
          setLoading(false)
        })
    }
  }, [selectedRover])

  const ButtonProps = (rover) => {

    return {
      handleClick: () => setSelectedRover(rover)
    }
  }

  return (
    <div className="container">
      <h1>This is the rover page</h1>
      {loading && <div>Loading</div>}
      <div className="rover-holder">
        <div className="rover-button">
          <Button {...ButtonProps('curiosity')}>Curiosity</Button>
        </div>
        <div className="rover-button">
          <Button {...ButtonProps('opportunity')}>Opportunity</Button>
        </div>
        <div className="rover-button">
          <Button {...ButtonProps('spirit')}>Spirit</Button>
        </div>
      </div>
    </div>
  );
}

export default RoverPage;