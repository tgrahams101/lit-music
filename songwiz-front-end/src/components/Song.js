import React, { Component } from 'react';
import _ from 'lodash';

const Song = (props) => {
    return (
        <div className="App" onClick={props.handleSongClick.bind(null, props.song)} >
            <p> {props.title}</p>
            <p> {props.artistName } </p>
            <img src={props.artworkUrl} />
        </div>
    );
};


export default Song;
