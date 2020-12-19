import React, { useCallback } from 'react';
import './RoverPage.scss';
import Button from '../../components/Button';


const RoverSelection = (props) => {
  const {
    selectedRover,
    setSelectedRover,
    selectedCamera,
    loading
  } = props;

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
        <Button {...ButtonProps(setSelectedRover, 'curiosity', 'rover', selectedRover)}>Curiosity</Button>
      </div>
      <div className="rover-button">
        <Button {...ButtonProps(setSelectedRover, 'opportunity', 'rover', selectedRover)}>Opportunity</Button>
      </div>
      <div className="rover-button">
        <Button {...ButtonProps(setSelectedRover, 'spirit', 'rover', selectedRover)}>Spirit</Button>
      </div>
    </div>
  );
}

export default RoverSelection;