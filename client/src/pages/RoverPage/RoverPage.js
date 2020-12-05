import React, { useState, useEffect, useCallback } from 'react';
import './RoverPage.scss';
import Button from '../../components/Button';
import { NumberInput } from '../../components/Input';

import nasaAPI from '../../utils/axios';

const RoverPage = (props) => {

  const [selectedRover, setSelectedRover] = useState('opportunity');
  const [loading, setLoading] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState('');
  const [maxSol, setMaxSol] = useState();
  const [selectedSol, setSelectedSol] = useState()


  useEffect(() => {
    if (selectedRover !== '') {
      setLoading(true);
      nasaAPI.getRoverManifest(selectedRover)
        .then(result => {
          console.log(result.data);
          setMaxSol(result.data.photo_manifest.max_sol)
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

  const InputProps = useCallback((changeFunc, val) => {
    return {
      handleChange: (e) => {
        changeFunc(e.target.value)
      },
      value: val
    }
  }, [maxSol])

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
            <h3>{maxSol}</h3>
          </div>
          <div className="sol-input-group">
            <label htmlFor="sol-input">Sol</label>
            <NumberInput {...InputProps(setSelectedSol, selectedSol)} />
            <h1>{selectedSol}</h1>
          </div>
        </div>
      </div>

      {loading && <div>Loading</div>}

    </div>
  );
}

export default RoverPage;