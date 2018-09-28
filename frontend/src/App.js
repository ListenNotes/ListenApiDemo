import React, { Component } from 'react';
import './App.less';
import axios from 'axios'

const BACKEND_ROOT_URL = "http://localhost:8000/"

class EpisodeResult extends Component {
}

class PodcastResult extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.data.title_original,
            thumbnail: this.props.data.thumbnail,
            rss: this.props.data.rss,
            listennotesUrl: this.props.data.listennotes_url,
            itunesId: this.props.data.itunes_id,
            description: this.props.data.description_original
        }
    }

    render() {
        const itunesUrl = "https://itunes.apple.com/us/podcast/id" + this.state.itunesId
        return (
            <div className="result podcast">
              <a href={this.state.listennotesUrl}>
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
        sortByDate: "0",
        searchType: "episode",
        quotaExceeded: false,
        errorOccurred: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleSortByChange = this.handleSortByChange.bind(this)
  }

  handleTypeChange(e) {
      this.setState({
          search: this.state.search,
          data: this.state.data,
          sortByDate: this.state.sortByDate,
          searchType: e.target.value,
          quotaExceeded: this.state.quotaExceeded,
          errorOccurred: this.state.errorOccurred
      })
  }

  handleSortByChange(e) {
      this.setState({
          search: this.state.search,
          data: this.state.data,
          sortByDate: e.target.value,
          searchType: this.state.searchType,
          quotaExceeded: this.state.quotaExceeded,
          errorOccurred: this.state.errorOccurred
      })
  }

  handleChange(e) {
      this.setState({
          search: e.target.value,
          data: this.state.data,
          sortByDate: this.state.sortByDate,
          searchEpisodes: this.state.searchEpisodes,
          quotaExceeded: this.state.quotaExceeded,
          errorOccurred: this.state.errorOccurred
      })
  }

  handleClick() {
    const requestUrl = BACKEND_ROOT_URL + "search/?q=" + this.state.search + "&sort_by_date=" + this.state.sortByDate + "&type=" + this.state.searchType
    axios.get(requestUrl)
      .then(response => this.setState({
        search: this.state.search,
        data: response.data,
        sortByDate: this.state.sortByDate,
        searchEpisodes: this.state.searchEpisodes,
        quotaExceeded: false,
        errorOccurred: false
      }))
      .catch(error => {
        if (error.response.status === 429) {
          this.setState({
            search: this.state.search,
            data: [],
            sortByDate: this.state.sortByDate,
            searchEpisodes: this.state.searchEpisodes,
            quotaExceeded: true,
            errorOccurred: false
          })
        } else {
          console.log(error.response)
          this.setState({
            search: this.state.search,
            data: [],
            sortByDate: this.state.sortByDate,
            searchEpisodes: this.state.searchEpisodes,
            quotaExceeded: false,
            errorOccurred: true
          })
        }
      })
  }

  render() {
    const resultElements = this.state.data.results ? this.state.data.results.map((d) => {
      return <PodcastResult key={d.id} data={d}/>
    }) : []
    const quotaExceededMessage = this.state.quotaExceeded ? (<p>Quota exceeded.</p>) : null
    const errorOccurredMessage = this.state.errorOccurred ? (<p>An error occurred.</p>) : null
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Listen API Demo</h1>
        </header>
        <div onChange={this.handleTypeChange}>
          <input type="radio" defaultChecked value="episode" id="episodeButton" name="type"/>
          <label htmlFor="episodeButton">Episode</label>
          <input type="radio" value="podcast" id="podcastButton" name="type"/>
          <label htmlFor="podcastButton">Podcast</label>
        </div>
        <select onChange={this.handleSortByChange}>
          <option value="0">Relevance</option>
          <option value="1">Date</option>
        </select>
        <input onChange={this.handleChange} type="text" placeholder="Search" value={this.state.search}/>
        <button className='button' type="submit" onClick={this.handleClick}>
          Search
        </button>
        <div>
          {quotaExceededMessage}
          {errorOccurredMessage}
          {resultElements}
        </div>
      </div>
    );
  }
}

export default App;
