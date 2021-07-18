import React from "react";
import "./SelectionPage.scss";

const SelectionPage = () => {
    return (
        <div className="selection-page-container">
            <h1>This is the H1 tag</h1>
            <h2>This is the H2 tag</h2>
            <h3>This is the H3 tag</h3>
            <h4>This is the H4 tag</h4>
            <h5>This is the H5 tag</h5>
            <h6>This is the H6 tag</h6>
            <p>This is the P tag</p>
            <a href="./">Home</a>

            <div className="selection-items grid align-center justify-between">
                <div className="item-one">One</div>
                <div className="item-two">Two</div>
                <div className="item-thee">Three</div>
            </div>
        </div>
    );
};

export default SelectionPage;
