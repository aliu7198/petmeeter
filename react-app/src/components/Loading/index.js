import React from 'react';
import catCircle from "../../assets/cat-circle.png"
import "./Loading.css"

const Loading = () => {
    return (
        <div className="loading-container">
            <img className="spinner" src={catCircle} alt="Cat loading circle" />
        </div>
    )
}

export default Loading;
