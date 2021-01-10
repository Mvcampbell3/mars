import React, { useCallback } from 'react';
import { NumberInput } from '../../components/Input'

const RoverSolSelection = (props) => {

  const {
    maxSol,
    setSelectedSol,
    selectedSol
  } = props;

  const InputProps = useCallback((changeFunc, value, name, id, placeholder) => {
    return {
      handleChange: (e) => {
        changeFunc(e.target.value)
      },
      value,
      name,
      id,
      placeholder,
      selectedSol
    }
  }, [selectedSol]);

  return (
    <div className="item-container">
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
    </div>
  );
}

export default RoverSolSelection;