import React, { useCallback } from "react";
import Button from "../../components/Button";
import nasaAPI from "../../utils/axios";

const RoverSubmitRequest = (props) => {
    const {
        selectedCamera,
        selectedRover,
        selectedSol,
        replacePhotos,
        loading,
        setLoading,
        setRedirectPhotoPage,
    } = props;


    const ButtonProps = useCallback(
        (changeFunc, value, type, evalItem) => {
            return {
                handleClick: () => {
                    if (!loading) {
                        changeFunc(value);
                    }
                },
                type: type,
                selected: value === evalItem,
                selectedRover, // Added to stop warning, it's not doing anything
                selectedCamera, // Added to stop warning, it's not doing anything
            };
        },
        [selectedRover, selectedCamera, loading],
    );

    const getPictures = () => {
        if (
            selectedCamera !== "" &&
            selectedRover !== "" &&
            selectedSol !== ""
        ) {
            setLoading(true);
            nasaAPI
                .getRoverPictures(selectedRover, selectedCamera, selectedSol)
                .then((result) => {
                    replacePhotos(result.data.photos);
                    setLoading(false);
                    setRedirectPhotoPage((prevValue) => {
                        if (!prevValue) {
                            return true;
                        }
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <div className="item-container">
            <div className="submit-btn-holder">
                <Button
                    {...ButtonProps(
                        getPictures,
                        { selectedRover, selectedCamera, selectedSol },
                        "submit",
                        null,
                    )}
                >
                    Get Pictures
                </Button>
            </div>
        </div>
    );
};

export default RoverSubmitRequest;
