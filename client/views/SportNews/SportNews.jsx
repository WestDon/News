var React = require("react");
import DefaultLayout from '../Layout/Default';
import News from '../News/News';
import NewsSearch from '../News/NewsSearch';
import { fetchSportNews, clearCache } from '../../services/sportNewsService';
import './SportNews.css';

export default class SportNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      filteredArticles: [],
      searchText: "",
      loading: true,
      error: null,
      selectedCategory: 'all',
      page: 1,
      hasMore: true
    };
  }

  componentDidMount() {
    this.loadSportNews();
  }

  loadSportNews = async (options = {}) => {
    const { page = 1, searchQuery = '', loadMore = false } = options;
    
    this.setState({ loading: true, error: null });

    try {
      const response = await fetchSportNews({
        category: this.state.selectedCategory,
        page: page,
        pageSize: 20,
        searchQuery: searchQuery
      });

      const newArticles = loadMore 
        ? [...this.state.articles, ...response.articles]
        : response.articles;

      this.setState({
        articles: newArticles,
        filteredArticles: newArticles,
        loading: false,
        page: page,
        hasMore: newArticles.length < response.totalResults
      });
    } catch (error) {
      console.error('Error loading sport news:', error);
      this.setState({
        loading: false,
        error: 'Failed to load sports news. Please try again later.'
      });
    }
  };

  handleSearch = (e) => {
    const searchText = e.target.value;
    this.setState({ searchText });

    // Debounce search
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = setTimeout(() => {
      if (searchText.trim()) {
        this.loadSportNews({ searchQuery: searchText, page: 1 });
      } else {
        this.loadSportNews({ page: 1 });
      }
    }, 500);
  };

  handleCategoryChange = (category) => {
    this.setState({ selectedCategory: category }, () => {
      this.loadSportNews({ page: 1 });
    });
  };

  handleLoadMore = () => {
    const nextPage = this.state.page + 1;
    this.loadSportNews({ page: nextPage, loadMore: true });
  };

  handleRetry = () => {
    clearCache();
    this.loadSportNews({ page: 1 });
  };

  renderActionButton = (article) => {
    return (
      <a 
        href={article.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="read-more-btn"
      >
        Read Full Article
      </a>
    );
  };

  renderLoading = () => {
    return (
      <div className="sport-news-loading">
        <div className="spinner"></div>
        <p>Loading sports news...</p>
      </div>
    );
  };

  renderError = () => {
    return (
      <div className="sport-news-error">
        <div className="error-icon">⚠️</div>
        <h3>Oops! Something went wrong</h3>
        <p>{this.state.error}</p>
        <button onClick={this.handleRetry} className="retry-btn">
          🔄 Retry
        </button>
      </div>
    );
  };

  renderCategoryFilters = () => {
    const categories = ['all', 'Football', 'Basketball', 'Tennis', 'Formula 1', 'Boxing'];
    
    return (
      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${this.state.selectedCategory === category ? 'active' : ''}`}
            onClick={() => this.handleCategoryChange(category)}
          >
            {category === 'all' ? 'All Sports' : category}
          </button>
        ))}
      </div>
    );
  };

  render() {
    const { loading, error, filteredArticles, searchText, hasMore } = this.state;

    const NewsWithSearch = NewsSearch(
      NewsDisplay,
      searchText
    );

    return (
      <DefaultLayout handleSearch={this.handleSearch}>
        <div className="sport-news-container">
          <div className="sport-news-header">
            <h1 className="sport-news-title">⚽ Sport News</h1>
            <p className="sport-news-subtitle">Stay updated with the latest sports news from around the world</p>
          </div>

          {this.renderCategoryFilters()}

          {loading && this.state.page === 1 ? (
            this.renderLoading()
          ) : error ? (
            this.renderError()
          ) : (
            <>
              <NewsWithSearch 
                news={filteredArticles} 
                actionNews={this.renderActionButton}
              />
              
              {hasMore && filteredArticles.length > 0 && (
                <div className="load-more-container">
                  <button 
                    onClick={this.handleLoadMore} 
                    className="load-more-btn"
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : '📰 Load More News'}
                  </button>
                </div>
              )}

              {filteredArticles.length === 0 && !loading && (
                <div className="no-results">
                  <p>No sports news found. Try a different search or category.</p>
                </div>
              )}
            </>
          )}
        </div>
      </DefaultLayout>
    );
  }
}

// Simple wrapper component to display news with action button
class NewsDisplay extends React.Component {
  render() {
    return <News {...this.props} />;
  }
}