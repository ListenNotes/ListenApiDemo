import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

const BACKEND_URL = "http://localhost:8000/"

class EpisodeResult extends Component {
}

class PodcastResult extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.data.title_original,
            thumbnail: this.props.data.thumbnail,
            rss: this.props.data.rss,
            listennotes_url: this.props.data.listennotes_url,
            itunes_id: this.props.data.itunes_id,
            description: this.props.data.description_original
        }
    }

    render() {
        const itunesUrl = "https://itunes.apple.com/us/podcast/id" + this.state.itunes_id
        return (
            <div className="result podcast">
              <a href={this.state.listennotes_url}>
                  <h1>{this.state.title}</h1>
              </a>
              <img alt={this.state.title} src={this.state.thumbnail} />
              <p>{this.state.description}</p>
              <a href={itunesUrl}>iTunes</a>
              <a href={this.state.rss}>RSS</a>
            </div>
        )
    }
}

class App extends Component {
  constructor () {
    super()
    this.state = {
        search: "",
        data: {},
        sort_by_date: false,
        search_episodes: true
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
      this.setState({
          search: e.target.value,
          data: this.state.data,
          sort_by_date: this.state.sort_by_date,
          search_episodes: this.state.search_episodes
      })
  }

  handleClick() {
    axios.get(BACKEND_URL + "search/?q=" + this.state.search)
        .then(response => this.setState({
            search: this.state.search,
            data: response.data,
            sort_by_date: this.state.sort_by_date,
            search_episodes: this.state.search_episodes
        }))
  }

  render() {
    var resultElements = [];
    if (this.state.data.results) {
        resultElements = this.state.data.results.map((d) => {
          return <PodcastResult key={d.itunes_id} data={d}/>
        })
    }
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Listen API Demo</h1>
        </header>
        <input onChange={this.handleChange} type="text" placeholder="Search" value={this.state.search}/>
        <button className='button' onClick={this.handleClick}>
          Click Me
        </button>
        <div>
          {resultElements}
        </div>
      </div>
    );
  }
}

export default App;
