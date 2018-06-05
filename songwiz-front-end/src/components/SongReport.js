import React, { Component } from 'react';
import Song from './Song.js';
import './songreport.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class SongReport extends Component {
    constructor() {
      super();
      this.state = {
          showLyrics: false
      }
    }
  
    async componentDidMount() {

    }



    render() {
        console.log('STATE EMOTION', this.props.songReport);
        const data = [];
        const emotionObject = this.props.songReport.data.emotion.document.emotion;
        for (let key in emotionObject) {
            let object = {
                field: key,
                'emotional intensity': emotionObject[key]
            };
            data.push(object);
        };

        // const data = [
        //     {
        //         field: 'Happiness',
        //         score: .8
        //     },
        //     {
        //         field: 'Sadness',
        //         score: .1
        //     },
        //     {
        //         field: 'Fear',
        //         score: .34
        //     },
        //     {
        //         field: 'Excitement',
        //         score: .9
        //     }
        // ];
        console.log('KEY WORDS', this.props.songReport.data.keywords.map( (element) => { return element.text } ));
        const keywords = this.props.songReport.data.keywords.map( (element) => { return element.text } );
      return (
        <div className="App" id="song-report-container">
            <h2> Song Analysis Report</h2>
            <p>Analysis Courtesy of <img src="https://consultingbydegrees.files.wordpress.com/2017/06/m5xbsgp3zxjvkztcxo4o.png" /></p>
            <button onClick={ () => {this.setState({showLyrics: !this.state.showLyrics})}         }> See lyrics from this song! </button>
            <a target="_blank" href={this.props.songReport.song.listenUrl}> <button> Listen on Spotify </button>   </a>
            {this.state.showLyrics ? <p> {this.props.songReport.lyrics} </p> : null}
            <img src={this.props.songReport.song.artworkUrl} />
            <p> Following keywords were identified for this song: <ul> { keywords.map( (element) => <li> {element} </li>    ) } </ul> </p>
            <BarChart style={{'margin': '0 auto'}}
                width={600}
                height={400}
                data={data}
                margin={ {top: 10, right: 0, left: 0, bottom: 25} }
            >
                <XAxis 
                    dataKey="field"
                    fontFamily="sans-serif"
                />
                <YAxis />
                <Tooltip />
                <Legend /> 
                <Bar dataKey="emotional intensity" fill="#8884d8" />
            </BarChart>
        </div>
      );
    }
}

export default SongReport;