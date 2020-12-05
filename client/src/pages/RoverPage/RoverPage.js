import React, { useState, useEffect, useCallback } from 'react';
import './RoverPage.scss';
import Button from '../../components/Button';
import { NumberInput, TextInput } from '../../components/Input';

import nasaAPI from '../../utils/axios';

const RoverPage = (props) => {

  const [selectedRover, setSelectedRover] = useState('opportunity');
  const [loading, setLoading] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState('');
  const [maxSol, setMaxSol] = useState()

  useEffect(() => {
    if (selectedRover !== '') {
      setLoading(true);
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

  const ButtonProps = useCallback((rover) => {
    return {
      handleClick: () => {
        if (!loading) {
          setSelectedRover(rover);
        }
      },
      type: 'rover',
      selected: rover === selectedRover
    }
  }, [selectedRover, loading])

  return (
    <div className="container">

      <div className="item-container">
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

      <div className="item-container">
        <div className="sol-holder">
          <div className="sol-stats">

          </div>
          <div className="sol-input-group">
            <label htmlFor="sol-input">Sol</label>
            <NumberInput />
          </div>
          <div className="test">
            <label htmlFor="text-input">Test Text</label>
            <TextInput />
          </div>
        </div>
      </div>

      {loading && <div>Loading</div>}

    </div>
  );
}

export default RoverPage;