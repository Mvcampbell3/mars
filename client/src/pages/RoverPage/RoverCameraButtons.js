import React, { useCallback } from 'react';
import Button from '../../components/Button';

const RoverCameraButtons = (props) => {

  const {
    selectedCamera,
    selectedRover,
    loading,
    availableCameras,
    setSelectedCamera
  } = props

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
    <div className="rover-cams-holder">
      {availableCameras && availableCameras.length > 0 && availableCameras.map(camera =>
        <Button key={camera} {...ButtonProps(setSelectedCamera, camera.toLowerCase(), 'camera', selectedCamera)}>{camera}</Button>
      )}
    </div>
  );
}

export default RoverCameraButtons;