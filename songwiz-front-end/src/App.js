import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Search from './components/Search';
import SongList from './components/SongList';
import keys from './env.js';
import NaturalLanguageUnderstandingV1 from 'watson-developer-cloud/natural-language-understanding/v1.js';
import SongReport from './components/SongReport';

const natural_language_understanding = new NaturalLanguageUnderstandingV1({
  'username': 'b9101fd1-37c4-4d23-9366-b9af5cc95bab',
  'password': 'd7kb4FwXUbCk',
  'version': '2018-03-16'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      songsForChoice: [],
      showSongAnalysis: false,
      songReport: null
    };

    this.searchSpotify = this.searchSpotify.bind(this);
    this.handleSongClick = this.handleSongClick.bind(this);
  }

  async componentDidMount() {
    try {
      let response = await axios.get('https://spotify-lit-node-server.herokuapp.com/api/token');
      // let response = await axios.get('http://ec2-54-213-129-218.us-west-2.compute.amazonaws.com:3001')
      console.log('RESPONSE FROM TOKEN REFRESH', response.data);
      this.setState({
        token: `Bearer ${response.data.access_token}`
      });
      console.log('STATE TOKEN', this.state.token);
    } catch(error) {
      console.log('ERROR', error);
    }
  }

  async searchSpotify(event, query) {
    event.preventDefault();
    if (this.state.showSongAnalysis) {
      this.setState({showSongAnalysis: !this.state.showSongAnalysis});
    }
    console.log('SEARCHING SPOTIFY')
    query.replace(' ', '');
    const options = {
      headers: {
        'Authorization': this.state.token
      },
      params: {
        q: query,
        type: 'track'
      }
    };
    const url = 'https://api.spotify.com/v1/search';

    try {
      let response = await axios.get(url, options);
      console.log('RESPONSE FROM SEARCH SPOTIFY', response.data.tracks.items);

      let arrayOfSongs = response.data.tracks.items.map( (element) => {
        return {
          artistName: element.artists[0].name,
          albumName: element.album.name,
          albumId: element.album.id,
          artworkUrl: element.album.images[1].url,
          trackId: element.id,
          title: element.name,
          listenUrl: element.external_urls.spotify
        };
      });

      console.log('ARRAY OF SONGS', arrayOfSongs);
      this.setState({songsForChoice: arrayOfSongs});

    } catch (error) {
      console.log('ERROR', error);
    }

  }

  handleSongClick(song) {

    console.log('HANDLED SONG CLICK', song)
    this.pingMusixMatch(song);

  }

  async pingMusixMatch(song) {
    console.log('PINGGED MUSIC MATCH')
    const baseUrl = 'http://api.musixmatch.com/ws/1.1/';
    const url = 'https://cors-anywhere.herokuapp.com/' + baseUrl + 'matcher.track.get';

    const options = {
      params: {
        apikey: keys.musixMatchKey,
        q_track: song.title,
        q_artist: song.artistName, 
        q_album: song.albumName
      }
    };
    console.log('TYPEOF OPTIONS', typeof options);
    try {
      console.log('TYPEOF OPTIONS', typeof options);
      let response = await axios.get(url, options);
      console.log('RESPONSE FROM MUSIXMATCH', response);
      const track = response.data.message.body.track;
      const trackData = {
        trackId: track.track_id,
        albumId: track.album_id,
        commonTrackId: track.commontrack_id,
        hasLyrics: track.has_lyrics, 
        lyricsId: track.lyrics_id,
        releaseDate: track.first_release_date
      };

      let lyrics = await this.getLyrics(song, trackData);
      window.lyrics = lyrics;
      console.log('THE LYRICS', lyrics);
      let endCharIndex = lyrics.indexOf('..');
      lyrics = lyrics.slice(0, endCharIndex);
      console.log('GETTING TO POST LYRICS');
      const urlAnalyze = 'http://localhost:3001/analyzesong';
      const optionsAnalyze = {
        'lyrics': lyrics 
      };
      // let responseFromWatson = await axios.get('http://localhost:3001');
      let responseFromWatson = await axios.post(urlAnalyze, optionsAnalyze);
      console.log('RESPONSE FROM WATSON', responseFromWatson);
      const songReport = {
        lyrics,
        song,
        data: responseFromWatson.data
      };

      this.setState({showSongAnalysis: true, songReport: songReport});
      console.log('CURRENT STATE', this.state);
    } catch (error) {
      console.log('ERROR', error);
    }

  }

  async getLyrics(song, trackData) {

    const baseUrl = 'http://api.musixmatch.com/ws/1.1/';
    const url = 'https://cors-anywhere.herokuapp.com/' + baseUrl + 'track.lyrics.get';

    const options = {
      params: {
        apikey: keys.musixMatchKey,
        track_id: trackData.trackId
      }
    };

    let response = await axios(url, options);
    console.log('AFTER GETTING LYRICS', response);
    return response.data.message.body.lyrics.lyrics_body;
  }

  showSongs() {

    if (this.state.showSongAnalysis) {
      return (<SongReport {...this.state} />);
    }
    if (this.state.songsForChoice.length) {
      return (<SongList songs={this.state.songsForChoice} handleSongClick={this.handleSongClick} />)
    }
    return (
     null
    );
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/168px-Spotify_logo_without_text.svg.png" className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to SongWiz</h1>
          <p> Powered by <img id="logo" src="http://2017.designmatters.io/media/1340/spotify-logo.png" /> </p>
        </header>
        <Search searchSpotify={this.searchSpotify} />
        {this.showSongs()}
      </div>
    );
  }
}

export default App;
