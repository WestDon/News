import React from 'react';
import DefaultLayout from '../Layout/Default';
import News from '../News/News';
import NewsSearch from '../News/NewsSearch';
import './SportNews.css';

// Mocked Sport News Data
const mockSportNewsData = {
  "status": "ok",
  "source": "sport-news",
  "sortBy": "latest",
  "articles": [
    {
      "author": "John Smith",
      "title": "Champions League Final: Manchester City defeats Real Madrid 3-1",
      "description": "Manchester City secured their second Champions League title with a dominant performance against Real Madrid at Wembley Stadium. Goals from Haaland, De Bruyne, and Foden sealed the victory.",
      "url": "http://example.com/sport/football/champions-league-final",
      "urlToImage": "https://via.placeholder.com/400x300/0066cc/ffffff?text=Champions+League",
      "publishedAt": "2024-06-01T20:45:00Z",
      "category": "Football"
    },
    {
      "author": "Sarah Johnson",
      "title": "NBA Finals: Denver Nuggets Win First Championship in Franchise History",
      "description": "The Denver Nuggets made history by winning their first NBA championship, defeating the Miami Heat 94-89 in Game 5. Nikola Jokic named Finals MVP.",
      "url": "http://example.com/sport/basketball/nba-finals",
      "urlToImage": "https://via.placeholder.com/400x300/ff6600/ffffff?text=NBA+Finals",
      "publishedAt": "2024-06-12T22:30:00Z",
      "category": "Basketball"
    },
    {
      "author": "Michael Brown",
      "title": "Wimbledon 2024: Alcaraz Defeats Djokovic in Epic Five-Set Final",
      "description": "Carlos Alcaraz retained his Wimbledon title with a thrilling five-set victory over Novak Djokovic. The match lasted over four hours in front of a packed Centre Court.",
      "url": "http://example.com/sport/tennis/wimbledon-final",
      "urlToImage": "https://via.placeholder.com/400x300/006633/ffffff?text=Wimbledon",
      "publishedAt": "2024-07-14T16:20:00Z",
      "category": "Tennis"
    },
    {
      "author": "Emily Davis",
      "title": "Formula 1: Verstappen Secures Fourth Consecutive World Championship",
      "description": "Max Verstappen clinched his fourth consecutive F1 World Championship at the Japanese Grand Prix. Red Bull Racing celebrates another dominant season.",
      "url": "http://example.com/sport/f1/verstappen-champion",
      "urlToImage": "https://via.placeholder.com/400x300/cc0000/ffffff?text=Formula+1",
      "publishedAt": "2024-09-24T07:15:00Z",
      "category": "Formula 1"
    },
    {
      "author": "David Wilson",
      "title": "Rugby World Cup: South Africa Retains Title with Victory Over New Zealand",
      "description": "South Africa became back-to-back Rugby World Cup champions with a hard-fought 15-12 victory over New Zealand in Paris. The Springboks' defense proved impenetrable.",
      "url": "http://example.com/sport/rugby/world-cup-final",
      "urlToImage": "https://via.placeholder.com/400x300/009933/ffffff?text=Rugby+World+Cup",
      "publishedAt": "2024-10-28T19:00:00Z",
      "category": "Rugby"
    },
    {
      "author": "Lisa Martinez",
      "title": "Olympics 2024: USA Tops Medal Table with 126 Total Medals",
      "description": "The United States finished top of the Olympic medal table at Paris 2024 with 40 gold, 44 silver, and 42 bronze medals. China finished second with 38 golds.",
      "url": "http://example.com/sport/olympics/medal-table",
      "urlToImage": "https://via.placeholder.com/400x300/ffcc00/000000?text=Olympics+2024",
      "publishedAt": "2024-08-11T21:30:00Z",
      "category": "Olympics"
    },
    {
      "author": "Robert Taylor",
      "title": "Cricket: India Wins T20 World Cup After Defeating Australia in Final",
      "description": "India claimed the T20 World Cup title with a 7-run victory over Australia in Barbados. Captain Rohit Sharma lifted the trophy as fans celebrated across the nation.",
      "url": "http://example.com/sport/cricket/t20-world-cup",
      "urlToImage": "https://via.placeholder.com/400x300/3366ff/ffffff?text=Cricket+World+Cup",
      "publishedAt": "2024-06-29T18:45:00Z",
      "category": "Cricket"
    },
    {
      "author": "Jennifer Lee",
      "title": "NFL Super Bowl: Kansas City Chiefs Win Third Title in Five Years",
      "description": "The Kansas City Chiefs defeated the San Francisco 49ers 27-24 in overtime to win their third Super Bowl in five years. Patrick Mahomes named Super Bowl MVP for the third time.",
      "url": "http://example.com/sport/nfl/super-bowl",
      "urlToImage": "https://via.placeholder.com/400x300/990000/ffffff?text=Super+Bowl",
      "publishedAt": "2024-02-11T23:15:00Z",
      "category": "American Football"
    },
    {
      "author": "Thomas Anderson",
      "title": "Golf: Rory McIlroy Wins Fifth Major Championship at The Open",
      "description": "Rory McIlroy ended his major championship drought by winning The Open at Royal Troon with a final round 66. The Northern Irishman finished two shots clear of the field.",
      "url": "http://example.com/sport/golf/the-open",
      "urlToImage": "https://via.placeholder.com/400x300/336600/ffffff?text=The+Open",
      "publishedAt": "2024-07-21T17:30:00Z",
      "category": "Golf"
    },
    {
      "author": "Patricia White",
      "title": "Boxing: Fury vs Usyk Rematch Set for December in Saudi Arabia",
      "description": "Tyson Fury and Oleksandr Usyk will face each other in a highly anticipated heavyweight rematch after their split decision earlier this year. The bout is scheduled for December in Riyadh.",
      "url": "http://example.com/sport/boxing/fury-usyk-rematch",
      "urlToImage": "https://via.placeholder.com/400x300/cc3300/ffffff?text=Boxing",
      "publishedAt": "2024-09-15T14:00:00Z",
      "category": "Boxing"
    }
  ]
};

export default class SportNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      searchText: "",
      loading: false,
      error: null
    }
  }

  componentDidMount() {
    try {
      // Simulate data loading
      this.setState({ loading: true });
      
      // Simulate API call delay
      setTimeout(() => {
        this.setState({ 
          articles: mockSportNewsData.articles,
          loading: false
        });
      }, 300);
    } catch (error) {
      this.setState({ 
        error: 'Failed to load sport news. Please try again later.',
        loading: false 
      });
      console.error('Error loading sport news:', error);
    }
  }

  render() {
    const { articles, searchText, loading, error } = this.state;

    const NewsWithSearch = NewsSearch(
      News,
      searchText
    );

    return (
      <DefaultLayout handleSearch={(e) => this.setState({ searchText: e.target.value })}>
        <div className="sport-news-container">
          <div className="sport-news-header">
            <h1>Sport News</h1>
            <p>Stay updated with the latest sports news from around the world</p>
          </div>

          {loading && (
            <div className="loading-message">
              <p>Loading sport news...</p>
            </div>
          )}

          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && articles.length > 0 && (
            <NewsWithSearch 
              news={articles} 
              actionNews={(article) => (
                <div className="article-meta">
                  <span className="category-badge">{article.category}</span>
                  <span className="publish-date">
                    {new Date(article.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              )}
            />
          )}

          {!loading && !error && articles.length === 0 && (
            <div className="no-articles-message">
              <p>No sport news articles available at the moment.</p>
            </div>
          )}
        </div>
      </DefaultLayout>
    );
  }
}
