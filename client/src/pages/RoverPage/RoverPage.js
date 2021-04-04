import React, { useEffect, useState } from "react";
import "./RoverPage.scss";
import {
    RoverSelection,
    RoverSolSelection,
    RoverCameraButtons,
    RoverSubmitRequest,
} from "./";
import { Link, Redirect } from "react-router-dom";
import LoadingDisplay from "../../components/LoadingDisplay";

const RoverPage = (props) => {
    const { photos, selectedRover, maxSol, totalPictures, loading } = props;

    useEffect(() => {
        console.log(photos);
    }, [photos]);

    const [redirectPhotoPage, setRedirectPhotoPage] = useState(false);

    return (
        <div className="container">
            {redirectPhotoPage && <Redirect to="/photos" />}
            {loading && <LoadingDisplay {...props} />}
            <div className="item-container">
                <Link to="/">Home</Link>
                <h1 className="page-title">
                    {selectedRover === ""
                        ? "Please select a rover"
                        : selectedRover.charAt(0).toUpperCase() +
                          selectedRover.slice(1)}
                </h1>
                <RoverSelection {...props} />
            </div>

            {selectedRover !== "" && maxSol !== "" && (
                <RoverSolSelection {...props} />
            )}

            {totalPictures > 0 ? (
                <h3>Total Pictures: {totalPictures}</h3>
            ) : (
                <h3>There are not any pics</h3>
            )}

            <RoverCameraButtons {...props} />

            <RoverSubmitRequest
                {...props}
                setRedirectPhotoPage={setRedirectPhotoPage}
            />
        </div>
    );
};

export default RoverPage;
