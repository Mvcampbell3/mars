import React from "react";
import "./PhotoItem.scss";

const PhotoItem = ({ img_src, placement, activePhoto }) => {
    return (
        <div className="photo-item-container">
            <img
                src={img_src}
                alt=""
                className={`photo ${
                    activePhoto === placement ? "top" : "stack"
                }`}
            />
        </div>
    );
};

export default PhotoItem;
