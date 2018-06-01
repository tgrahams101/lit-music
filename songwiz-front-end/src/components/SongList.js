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
        <div className="App" className="songlist">
           {this.props.songs.map( (element, index) => {
               console.log(element);
               return (
                <Song {...element} handleSongClick={this.props.handleSongClick} key={index} song={element}/>
               );
           })}
        </div>
      );
    }
}

export default SongList;