import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './RoverPage.scss';

// import { SpiritPage, CuriosityPage, OpportunityPage } from './'
import Button from '../../components/Button';
import { NumberInput } from '../../components/Input';

import { RoverSelection } from './'

import nasaAPI from '../../utils/axios';

const RoverPage = (props) => {

  const [selectedRover, setSelectedRover] = useState('');
  const [loading, setLoading] = useState(false);
  const [maxSol, setMaxSol] = useState("");
  const [selectedSol, setSelectedSol] = useState('');
  const [availableCameras, setAvailableCameras] = useState([]);
  const [solTotalPictures, setSolTotalPictures] = useState(0);
  const [manifestSols, setManifestSols] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState('');

  const handleSelectedRoverChange = useCallback(() => {
    setLoading(true);
    clearRoverData()
    nasaAPI.getRoverManifest(selectedRover)
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
  }, [selectedRover])

  useEffect(() => {
    if (selectedRover !== '') {
      console.log('running select rover use effect')
      handleSelectedRoverChange(selectedRover)
    }
  }, [selectedRover, handleSelectedRoverChange]);

  const RoverSelectionProps = useMemo(() => {
    return {
      selectedRover,
      setSelectedRover,
      selectedCamera,
      loading
    }
  }, [selectedRover, loading, selectedCamera])

  const clearRoverData = () => {
    setSelectedCamera("");
    setMaxSol("");
  }

  useEffect(() => {
    const correctSol = [...manifestSols].filter(manSol => manSol.sol === Number(selectedSol));
    setSelectedCamera("")
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
        <h1 className='page-title'>{selectedRover === ""
          ? "Please select a rover"
          : selectedRover.charAt(0).toUpperCase() + selectedRover.slice(1)}</h1>
        <RoverSelection {...RoverSelectionProps} />
      </div>

      {selectedRover !== "" && maxSol !== "" &&
        <div className="item-container">
          <div className="sol-holder">
            <div className="sol-stats">
              <h3>Maximum Sol: {maxSol}</h3>
            </div>
            <div className="sol-input-group">
              <label htmlFor="sol-input">Sol</label>
              <NumberInput {...InputProps(setSelectedSol, selectedSol, 'selected-sol-input', 'selected-sol-input', 'A number less or equal to the max sol number')} />
              <h1>{selectedSol}</h1>
            </div>
          </div>
        </div>
      }

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