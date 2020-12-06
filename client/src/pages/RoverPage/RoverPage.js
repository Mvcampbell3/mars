import React, { useState, useEffect, useCallback } from 'react';
import './RoverPage.scss';
import Button from '../../components/Button';
import { NumberInput } from '../../components/Input';

import nasaAPI from '../../utils/axios';

const RoverPage = (props) => {

  const [selectedRover, setSelectedRover] = useState('');
  const [loading, setLoading] = useState(false);
  const [maxSol, setMaxSol] = useState();
  const [selectedSol, setSelectedSol] = useState("0");
  const [availableCameras, setAvailableCameras] = useState([]);
  const [solTotalPictures, setSolTotalPictures] = useState(0);
  const [manifestSols, setManifestSols] = useState([]);

  useEffect(() => {
    if (selectedRover !== '') {
      console.log('running select rover use effect')
      setLoading(true);
      nasaAPI.getRoverManifest(selectedRover)
        .then(result => {
          console.log(result.data);
          setSelectedSol("0");
          setAvailableCameras([])
          setMaxSol(result.data.photo_manifest.max_sol);
          setManifestSols(result.data.photo_manifest.photos)
          setLoading(false)
        })
        .catch(err => {
          console.log(err)
          setLoading(false)
        })
    }
  }, [selectedRover])

  useEffect(() => {
    const correctSol = [...manifestSols].filter(manSol => manSol.sol === Number(selectedSol));
    if (correctSol.length > 0) {
      setAvailableCameras(["ALL", ...correctSol[0].cameras]);
      setSolTotalPictures(correctSol[0].total_photos);
    } else {
      setAvailableCameras([]);
      setSolTotalPictures(0)
    }
  }, [manifestSols, selectedSol])

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

  const InputProps = useCallback((changeFunc, value, name, id) => {
    return {
      handleChange: (e) => {
        changeFunc(e.target.value)
      },
      value,
      name,
      id,
      selectedSol // Added to stop warning, it's not doing anything
    }
  }, [selectedSol])

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
            <NumberInput {...InputProps(setSelectedSol, selectedSol, 'selected-sol-input', 'selected-sol-input')} />
            <h1>{selectedSol}</h1>
          </div>
        </div>
      </div>

      {loading && <div>Loading</div>}

      {availableCameras && availableCameras.length > 0 && availableCameras.map(camera => <Button key={camera}>{camera}</Button>)}

      {solTotalPictures > 0 ? <h3>Total Pictures: {solTotalPictures}</h3> : <h3>There are not any pics</h3>}

    </div>
  );
}

export default RoverPage;