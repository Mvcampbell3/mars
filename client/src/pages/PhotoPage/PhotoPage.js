import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PhotoItem from "./PhotoItem";
import "./PhotoPage.scss";

const PhotoPage = ({ photos }) => {
    const [loadedPhotos, setLoadedPhotos] = useState(0);
    const [loadedAll, setLoadedAll] = useState(false);
    const [activePhoto, setActivePhoto] = useState(0);
    const [play, setPlay] = useState(false);

    useEffect(() => {
        if (photos.length > 0) {
            const loadPhoto = (photo) => {
                const { img_src } = photo;
                const newImage = new Image();
                newImage.src = img_src;
                newImage.onload = () => {
                    setLoadedPhotos((prevNumber) => {
                        const totalLoaded = prevNumber + 1;
                        if (totalLoaded === photos.length) {
                            setLoadedAll(true);
                        }
                        return totalLoaded;
                    });
                };
            };

            photos.forEach((photo) => loadPhoto(photo));
        }
    }, [photos]);

    const handleClick = () => {
        setPlay((prev) => {
            if (activePhoto >= photos.length) {
                setActivePhoto(0);
            }
            return !prev;
        });
    };

    useEffect(() => {
        let timer;
        if (play) {
            timer = setInterval(() => {
                setActivePhoto((prev) => {
                    if (prev + 1 > photos.length) {
                        clearInterval(timer);
                    }
                    return prev + 1;
                });
            }, 30);
        }

        return () => clearInterval(timer);
    }, [play, photos.length]);

    return (
        <div className="container">
            <h1>This is the photo page</h1>
            <Link to="/rovers">Back</Link>
            <button onClick={handleClick}>Play</button>
            {loadedAll ? (
                <div className="photos-container">
                    {photos.map((photo, i) => (
                        <PhotoItem
                            {...photo}
                            placement={i}
                            key={i}
                            activePhoto={activePhoto}
                        />
                    ))}
                </div>
            ) : (
                `Loading Images... ${loadedPhotos} of ${photos.length}`
            )}
        </div>
    );
};

export default PhotoPage;
