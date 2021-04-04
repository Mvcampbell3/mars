import React from "react";
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
import { PhotoPage } from "./";

const PhotoPageWrapper = (props) => {
    return <PhotoPage {...props} />;
};


const mapStateToProps = (state) => {
    return {
        photos: state.photos,
    };
};

export default connect(mapStateToProps)(PhotoPageWrapper);

