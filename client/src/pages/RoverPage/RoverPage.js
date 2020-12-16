import React, { useState, useEffect, useCallback } from 'react';
import './RoverPage.scss';

// import { SpiritPage, CuriosityPage, OpportunityPage } from './'
import Button from '../../components/Button';
import { NumberInput } from '../../components/Input';

import nasaAPI from '../../utils/axios';

const RoverPage = (props) => {

  const [selectedRover, setSelectedRover] = useState('');
  const [loading, setLoading] = useState(false);
  const [maxSol, setMaxSol] = useState();
  const [selectedSol, setSelectedSol] = useState('');
  const [availableCameras, setAvailableCameras] = useState([]);
  const [solTotalPictures, setSolTotalPictures] = useState(0);
  const [manifestSols, setManifestSols] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState('');

  useEffect(() => {
    if (selectedRover !== '') {
      console.log('running select rover use effect')
      handleSelectedRoverChange(selectedRover)
    }
  }, [selectedRover]);

  const handleSelectedRoverChange = (rover) => {
    setLoading(true);
    nasaAPI.getRoverManifest(rover)
      .then(result => {
        console.log(result.data);
        setSelectedSol('');
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

  const ButtonProps = useCallback((changeFunc, value, type, evalItem) => {
    return {
      handleClick: () => {
        if (!loading) {
          changeFunc(value);
        }
      },
      type: type,
      selected: value === evalItem,
      selectedRover, // Added to stop warning, it's not doing anything
      selectedCamera // Added to stop warning, it's not doing anything
    }
  }, [selectedRover, selectedCamera, loading])

  const InputProps = useCallback((changeFunc, value, name, id, placeholder) => {
    return {
      handleChange: (e) => {
        changeFunc(e.target.value)
      },
      value,
      name,
      id,
      placeholder,
      selectedSol // Added to stop warning, it's not doing anything
    }
  }, [selectedSol]);

  const getPictures = () => {
    if (selectedCamera !== "" && selectedRover !== "" && selectedSol !== "") {
      nasaAPI.getRoverPictures(selectedRover, selectedCamera, selectedSol)
        .then(result => {
          console.log(result.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  return (
    <div className="container">
      <div className="item-container">
        <div className="rover-holder">
          <div className="rover-button">
            <Button {...ButtonProps(setSelectedRover, 'curiosity', 'rover', selectedRover)}>Curiosity</Button>
          </div>
          <div className="rover-button">
            <Button {...ButtonProps(setSelectedRover, 'opportunity', 'rover', selectedRover)}>Opportunity</Button>
          </div>
          <div className="rover-button">
            <Button {...ButtonProps(setSelectedRover, 'spirit', 'rover', selectedRover)}>Spirit</Button>
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
            <NumberInput {...InputProps(setSelectedSol, selectedSol, 'selected-sol-input', 'selected-sol-input', 'A number less or equal to the max sol number')} />
            <h1>{selectedSol}</h1>
          </div>
        </div>
      </div>

      {loading && <div>Loading</div>}

      {availableCameras && availableCameras.length > 0 && availableCameras.map(camera =>
        <Button key={camera} {...ButtonProps(setSelectedCamera, camera.toLowerCase(), 'camera', selectedCamera)}>{camera}</Button>
      )}

      {solTotalPictures > 0 ? <h3>Total Pictures: {solTotalPictures}</h3> : <h3>There are not any pics</h3>}

      <div className="item-container">
        <div className="submit-btn-holder">
          <Button {...ButtonProps(getPictures, { selectedRover, selectedCamera, selectedSol }, 'submit', null)}>Get Pictures</Button>
        </div>
      </div>

    </div>
  );
}

export default RoverPage;