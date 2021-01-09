import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RoverPage } from './';
import {
  addPhotos,
  replacePhotos,
  selectRover,
  setLoading,
  setMaxSol,
  setSelectedSol,
  setAvailableCameras,
  setTotalPictures,
  setManifestSols,
  setSelectedCamera
} from '../../redux/actions';


const RoverPageWrapper = (props) => {
  return <RoverPage {...props} />;
}

// Maps

const mapStateToProps = (state) => {
  return {
    photos: state.photos,
    selectedRover: state.selectedRover,
    loading: state.loading,
    maxSol: state.maxSol,
    selectedSol: state.selectedSol,
    availableCameras: state.availableCameras,
    totalPictures: state.totalPictures,
    manifestSols: state.manifestSols,
    selectedCamera: state.selectedCamera
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addPhotos,
      replacePhotos,
      selectRover,
      setLoading,
      setMaxSol,
      setSelectedSol,
      setAvailableCameras,
      setTotalPictures,
      setManifestSols,
      setSelectedCamera
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(RoverPageWrapper);