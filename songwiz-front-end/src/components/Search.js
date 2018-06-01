import React, { Component } from 'react';
import _ from 'lodash';

class Search extends Component {
    constructor() {
      super();
      this.state = {
        searchQuery: ''
      };

      this.handleChange = this.handleChange.bind(this);
    }
  
    async componentDidMount() {

    }

    handleChange(event) {
        console.log(event);
        console.log(event.target.value);
        this.setState({searchQuery: event.target.value});
    }
  
    render() {
      return (
        <div className="App">
            <form onSubmit= { (event) => { console.log('SEARCH SUBMITTED', this); this.props.searchSpotify(event, this.state.searchQuery)} }>
                <input type="text" style={{'fontSize':'8px', 'fontWeight': 'bold', 'width': '120px', 'padding':'5px'}}placeholder="Type in Song to Analyze" onKeyUp={this.handleChange} />
            </form>
        </div>
      );
    }
}

export default Search;