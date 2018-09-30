import React, { Component } from 'react';
import './App.less';
import axios from 'axios'

const BACKEND_ROOT_URL = process.env.REACT_APP_BACKEND_ROOT_URL || 'http://localhost:8000/'
const RESULTS_PER_PAGE = 10

class EpisodeResult extends Component {
    constructor(props) {
        super(props)
        const truncated_description = this.props.data.description_original.length > 200 ? this.props.data.description_original.substring(0, 197) + "..." : this.props.data.description_original
        this.state = {
            title: this.props.data.title_original,
            podcastTitle: this.props.data.podcast_title_original,
            publisher: this.props.data.publisher_original,
            thumbnail: this.props.data.thumbnail,
            audio: this.props.data.audio,
            audioLength: this.props.data.audio_length,
            rss: this.props.data.rss,
            listennotesUrl: this.props.data.listennotes_url,
            itunesId: this.props.data.itunes_id,
            description: truncated_description
        }
    }

    render() {
        const itunesUrl = `https://itunes.apple.com/us/podcast/id${this.state.itunesId}`
        return (
            <div className="search-result episode">
              <a className="search-result-title" rel="noopener noreferrer" target="_blank" href={this.state.listennotesUrl}>
                  {this.state.title}
              </a>
              <div className="search-result-creator">
                <img className="search-result-creator-thumbnail" alt={this.state.title} src={this.state.thumbnail} />
                <div className="search-result-creator-names">
                  <p className="podcast-title">{this.state.podcastTitle}</p>
                  <p className="publisher">By {this.state.publisher}</p>
                </div>
              </div>
              <p className="search-result-description">{this.state.description}</p>
              <audio controls>
                <source src={this.state.audio} type="audio/mpeg"/>
                Your browser does not support the audio element.
              </audio>
              <div className="search-result-footer">
                <a href={this.state.audio}>Audio</a>
                <a rel="noopener noreferrer" target="_blank" href={itunesUrl}>iTunes</a>
                <a rel="noopener noreferrer" target="_blank" href={this.state.rss}>RSS</a>
              </div>
            </div>
        )
    }
}

class PodcastResult extends Component {
    constructor(props) {
        super(props)
        const truncated_description = this.props.data.description_original.length > 200 ? this.props.data.description_original.substring(0, 197) + "..." : this.props.data.description_original
        this.state = {
            title: this.props.data.title_original,
            publisher: this.props.data.publisher_original,
            thumbnail: this.props.data.thumbnail,
            rss: this.props.data.rss,
            listennotesUrl: this.props.data.listennotes_url,
            itunesId: this.props.data.itunes_id,
            description: truncated_description
        }
    }

    render() {
        const itunesUrl = `https://itunes.apple.com/us/podcast/id${this.state.itunesId}`
        return (
            <div className="search-result podcast">
              <a className="search-result-title" rel="noopener noreferrer" target="_blank" href={this.state.listennotesUrl}>
                  {this.state.title}
              </a>
              <div className="search-result-creator">
                <img className="search-result-creator-thumbnail" alt={this.state.title} src={this.state.thumbnail} />
                <div className="search-result-creator-names">
                  <p className="publisher">By {this.state.publisher}</p>
                </div>
              </div>
              <p className="search-result-description">{this.state.description}</p>
              <div className="search-result-footer">
                <a className="bottom-link" rel="noopener noreferrer" target="_blank" href={itunesUrl}>iTunes</a>
                <a className="bottom-link" rel="noopener noreferrer" target="_blank" href={this.state.rss}>RSS</a>
              </div>
            </div>
        )
    }
}

class App extends Component {
  constructor () {
    super()
    this.state = {
        search: '',
        data: {},
        offset: 0,
        sortByDate: '0',
        searchType: 'episode',
        resultType: 'episode',
        quotaExceeded: false,
        errorOccurred: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleSortByChange = this.handleSortByChange.bind(this)
    this.handlePage = this.handlePage.bind(this)
    this.search = this.search.bind(this)
  }

  handleTypeChange(e) {
      const newValue = e.target.value
      this.setState(prevState => ({...prevState, searchType: newValue}))
  }

  search(requestUrl) {
    axios.get(requestUrl)
      .then(response => {
      this.setState(prevState => ({...prevState,
        data: response.data,
        resultType: this.state.searchType,
        offset: 0,
        quotaExceeded: false,
        errorOccurred: false
      }))})
      .catch(error => {
        if (error.response.status === 429) {
          this.setState(prevState => ({
            data: [],
            offset: 0,
            quotaExceeded: true,
            errorOccurred: false
          }))
        } else {
          this.setState(prevState => ({
            data: [],
            offset: 0,
            quotaExceeded: false,
            errorOccurred: true
          }))
        }
      })
  }

  handlePage(offset) {
    const requestUrl = `${BACKEND_ROOT_URL}search/?q=${this.state.search}&sort_by_date=${this.state.sortByDate}&type=${this.state.searchType}&offset=${this.state.data.next_offset}`
    this.search(requestUrl)
  }

  handleSortByChange(e) {
      const newValue = e.target.value
      this.setState(prevState => ({...prevState, sortByDate: newValue}))
  }

  handleChange(e) {
      const newValue = e.target.value
      this.setState(prevState => ({...prevState, search: newValue}))
  }

  handleSubmit(e) {
    const requestUrl = `${BACKEND_ROOT_URL}search/?q=${this.state.search}&sort_by_date=${this.state.sortByDate}&type=${this.state.searchType}`
    this.search(requestUrl)
    e.preventDefault();
  }

  render() {
    const resultElements = this.state.data.results ? this.state.data.results.map((d) => {
      if (this.state.resultType === 'episode') {
        return <EpisodeResult key={d.id} data={d}/>
      } else if (this.state.resultType === 'podcast') {
        return <PodcastResult key={d.id} data={d}/>
      }
    }) : []
    const nextPageElement = this.state.data.results ? (
      <span onClick={() => this.handlePage()}>
        Next page ({this.state.data.next_offset / RESULTS_PER_PAGE + 1} of {(this.state.data.total / RESULTS_PER_PAGE).toFixed()})
      </span>
    ) : null
    const quotaExceededMessage = this.state.quotaExceeded ? (<p>Quota exceeded.</p>) : null
    const errorOccurredMessage = this.state.errorOccurred ? (<p>An error occurred.</p>) : null
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Listen API Demo</h1>
        </header>
        <form className="search-form" onSubmit={this.handleSubmit}>
          <div className="search-form-type" onChange={this.handleTypeChange}>
            <input type="radio" defaultChecked value="episode" id="episodeButton" name="type"/>
            <label htmlFor="episodeButton">Episode</label>
            <input type="radio" value="podcast" id="podcastButton" name="type"/>
            <label htmlFor="podcastButton">Podcast</label>
          </div>
          <select className="search-form-sort-by" onChange={this.handleSortByChange}>
            <option value="0">Relevance</option>
            <option value="1">Date</option>
          </select>
          <input className="search-form-text" onChange={this.handleChange} type="text" placeholder="Search" value={this.state.search}/>
          <button className="search-form-submit" type="submit">
            Search
          </button>
        </form>
        <div className="search-results">
          {quotaExceededMessage}
          {errorOccurredMessage}
          {resultElements}
        </div>
        <div className="next-page">
          {nextPageElement}
        </div>
      </div>
    );
  }
}

export default App;
