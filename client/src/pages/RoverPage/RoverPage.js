import React, { useEffect, useCallback, useMemo } from 'react';
import './RoverPage.scss';
import Button from '../../components/Button';
import { RoverSelection, RoverSolSelection } from './'
import nasaAPI from '../../utils/axios';
import { Link } from 'react-router-dom';

const RoverPage = (props) => {
  const {
    photos,
    replacePhotos,
    selectRover,
    selectedRover,
    loading,
    setLoading,
    maxSol,
    setMaxSol,
    selectedSol,
    setSelectedSol,
    availableCameras,
    setAvailableCameras,
    totalPictures,
    setTotalPictures,
    manifestSols,
    setManifestSols,
    selectedCamera,
    setSelectedCamera
  } = props;

  useEffect(() => {
    console.log(photos)
  }, [photos])



  const handleSelectedRoverChange = useCallback(() => {
    setLoading(true);
    setSelectedCamera("");
    setMaxSol("");

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
  }, [selectedRover, setSelectedCamera, setAvailableCameras, setLoading, setManifestSols, setMaxSol, setSelectedSol])

  useEffect(() => {
    if (selectedRover !== '') {
      console.log('running select rover use effect')
      handleSelectedRoverChange(selectedRover)
    }
  }, [selectedRover, handleSelectedRoverChange]);

  useEffect(() => {
    const correctSol = [...manifestSols].filter(manSol => manSol.sol === Number(selectedSol));
    setSelectedCamera("")
    if (correctSol.length > 0) {
      setAvailableCameras(["ALL", ...correctSol[0].cameras]);
      setTotalPictures(correctSol[0].total_photos);
    } else {
      setAvailableCameras([]);
      setTotalPictures(0)
    }
  }, [manifestSols, selectedSol, setAvailableCameras, setTotalPictures, setSelectedCamera])

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



  const getPictures = () => {
    if (selectedCamera !== "" && selectedRover !== "" && selectedSol !== "") {
      nasaAPI.getRoverPictures(selectedRover, selectedCamera, selectedSol)
        .then(result => {
          replacePhotos(result.data.photos);
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  return (
    <div className="container">
      {loading && <div>Loading</div>}
      <div className="item-container">
        <Link to='/'>Home</Link>
        <h1 className='page-title'>{selectedRover === ""
          ? "Please select a rover"
          : selectedRover.charAt(0).toUpperCase() + selectedRover.slice(1)}</h1>
        <RoverSelection {...props} />
      </div>

      {selectedRover !== "" && maxSol !== "" &&
        <RoverSolSelection {...props} />
      }


      {availableCameras && availableCameras.length > 0 && availableCameras.map(camera =>
        <Button key={camera} {...ButtonProps(setSelectedCamera, camera.toLowerCase(), 'camera', selectedCamera)}>{camera}</Button>
      )}

      {totalPictures > 0 ? <h3>Total Pictures: {totalPictures}</h3> : <h3>There are not any pics</h3>}

      <div className="item-container">
        <div className="submit-btn-holder">
          <Button {...ButtonProps(getPictures, { selectedRover, selectedCamera, selectedSol }, 'submit', null)}>Get Pictures</Button>
        </div>
      </div>

      <div>{photos.length > 0 ? "Yes" : "No"}</div>

    </div>
  );
}

export default RoverPage;