import React, { Component } from 'react';
import Song from './Song.js';
import _ from 'lodash';
import './songlist.css';

class SongList extends Component {
    constructor() {
      super();
    

     
    }
  
    async componentDidMount() {

    }



    render() {
      return (
        <div>
          <p> <u> Click on a song below to see its analysis </u> </p>
          <div className="App" className="songlist">
            {this.props.songs.map( (element, index) => {
                console.log(element);
                return (
                  <Song {...element} handleSongClick={this.props.handleSongClick} key={index} song={element}/>
                );
            })}
          </div>
        </div>
      );
    }
}

export default SongList;