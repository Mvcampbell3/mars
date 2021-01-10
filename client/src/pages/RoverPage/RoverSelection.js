import React, { useCallback, useEffect } from 'react';
import './RoverPage.scss';
import Button from '../../components/Button';
import nasaAPI from '../../utils/axios';

const RoverSelection = (props) => {
  const {
    selectRover,
    selectedRover,
    selectedCamera,
    loading,
    setLoading,
    setSelectedCamera,
    setMaxSol,
    setSelectedSol,
    setAvailableCameras,
    setManifestSols
  } = props;

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
      handleSelectedRoverChange(selectedRover);
    }
  }, [selectedRover, handleSelectedRoverChange]);

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

  return (
    <div className="rover-holder">
      <div className="rover-button">
        <Button {...ButtonProps(selectRover, 'curiosity', 'rover', selectedRover)}>Curiosity</Button>
      </div>
      <div className="rover-button">
        <Button {...ButtonProps(selectRover, 'opportunity', 'rover', selectedRover)}>Opportunity</Button>
      </div>
      <div className="rover-button">
        <Button {...ButtonProps(selectRover, 'spirit', 'rover', selectedRover)}>Spirit</Button>
      </div>
    </div>
  );
}

export default RoverSelection;