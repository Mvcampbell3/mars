import React from "react";
import "./SelectionPage.scss";

const SelectionPage = () => {
    return (
        <div className="selection-page-container">
            <h1 className="main-title">This is the H1 tag</h1>
            <h2>This is the H2 tag</h2>
            <h3>This is the H3 tag</h3>
            <h4>This is the H4 tag</h4>
            <h5>This is the H5 tag</h5>
            <h6>This is the H6 tag</h6>
            <p>This is the P tag</p>
            <a href="./">Home</a>

            <div className="columns">
                <div className="column">One</div>
                <div className="column">Two</div>
                <div className="column">Three</div>
            </div>
            <div class="columns">
                <div class="column">First column</div>
                <div class="column">Second column</div>
                <div class="column">Third column</div>
                <div class="column">Fourth column</div>
            </div>
        </div>
    );
};

export default SelectionPage;
