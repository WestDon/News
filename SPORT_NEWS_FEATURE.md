# Sport News Feature Documentation

## Overview
The Sport News feature provides real-time sports news from NewsAPI with advanced filtering, search, and pagination capabilities. This document covers implementation details, architecture decisions, and usage guidelines.

## Architecture

### Component Structure
```
client/
├── services/
│   └── sportNewsService.js      # API integration & caching logic
├── views/
│   └── SportNews/
│       ├── SportNews.jsx        # Main component
│       └── SportNews.css        # Styling
```

### Data Flow
1. **Component Mount**: SportNews component calls `fetchSportNews()` on mount
2. **API Request**: Service makes HTTP request to NewsAPI
3. **Cache Check**: Service checks localStorage for cached data (5-minute TTL)
4. **Data Transform**: API response transformed to internal data structure
5. **State Update**: Component updates state with fetched articles
6. **Render**: Component renders articles with News component

## Features

### 1. Real-Time API Integration
- **API Provider**: NewsAPI (newsapi.org)
- **Endpoint**: `/v2/top-headlines` for category-based news
- **Endpoint**: `/v2/everything` for search queries
- **Request Rate**: Cached for 5 minutes to minimize API calls
- **Fallback**: Mocked data used when API fails

### 2. Category Filtering
- **Available Categories**: All Sports, Football, Basketball, Tennis, Formula 1, Boxing
- **Implementation**: Filters applied at API level
- **UI**: Button group with active state indication
- **Behavior**: Resets to page 1 when category changes

### 3. Search Functionality
- **Type**: Real-time search with 500ms debounce
- **Scope**: Searches titles and descriptions
- **API Integration**: Uses `/everything` endpoint with sports context
- **Case Sensitivity**: Case-insensitive matching

### 4. Pagination
- **Type**: Load More button pattern
- **Page Size**: 20 articles per page
- **Implementation**: Appends new articles to existing array
- **State**: Tracks current page and hasMore flag
- **UX**: Disabled during loading, hidden when no more results

### 5. Caching Strategy
- **Storage**: localStorage
- **TTL**: 5 minutes (300,000ms)
- **Keys**: 
  - `sportNewsCache`: Cached data
  - `sportNewsCacheExpiry`: Expiry timestamp
- **Invalidation**: Manual via retry button or automatic after TTL
- **Scope**: Only first page without search query

### 6. Error Handling
- **Network Errors**: Caught and displayed with retry option
- **API Errors**: Fallback to mocked data
- **Rate Limiting**: Uses cached data when available
- **User Feedback**: Clear error messages with retry button

### 7. Loading States
- **Initial Load**: Full-screen spinner with message
- **Pagination**: Button shows "Loading..." text
- **Debounced Search**: No loading state (seamless)

## API Configuration

### Getting API Key
1. Visit https://newsapi.org/register
2. Sign up for free account
3. Copy API key from dashboard
4. Add to environment variables

### Environment Variables
```bash
# .env file
NEWS_API_KEY=your_actual_api_key_here
```

### API Limits (Free Tier)
- **Requests**: 100 requests/day
- **Data**: Up to 100 results per request
- **Delay**: 24-hour delay for historical data
- **Commercial Use**: Requires paid plan

## Code Structure

### sportNewsService.js

#### Key Functions

**`fetchSportNews(options)`**
```javascript
options = {
  category: 'all',      // Sport category filter
  pageSize: 20,         // Articles per page
  page: 1,              // Current page number
  searchQuery: ''       // Search term
}
```
- Returns: `{ articles, totalResults, page, pageSize }`
- Implements caching logic
- Transforms API response
- Handles errors with fallback

**`clearCache()`**
- Clears cached data from localStorage
- Called on retry button click

**`getCachedData()`** (internal)
- Checks cache validity
- Returns cached data or null

**`setCachedData(data)`** (internal)
- Stores data with expiry timestamp

**`transformArticle(article, index)`** (internal)
- Normalizes API response
- Adds default values for missing fields
- Returns standardized article object

**`getFallbackData()`** (internal)
- Returns 10 mocked articles
- Used when API fails
- Covers diverse sport categories

### SportNews.jsx

#### State Management
```javascript
state = {
  articles: [],              // All loaded articles
  filteredArticles: [],      // Display articles
  searchText: "",            // Current search term
  loading: true,             // Loading indicator
  error: null,               // Error message
  selectedCategory: 'all',   // Active category filter
  page: 1,                   // Current page
  hasMore: true              // Pagination flag
}
```

#### Key Methods

**`loadSportNews(options)`**
- Main data fetching method
- Handles loading state
- Updates articles state
- Supports load more

**`handleSearch(e)`**
- Debounced search handler (500ms)
- Triggers API call with search query

**`handleCategoryChange(category)`**
- Updates selected category
- Reloads data from page 1

**`handleLoadMore()`**
- Increments page number
- Appends new results

**`handleRetry()`**
- Clears cache
- Reloads from page 1

**`renderActionButton(article)`**
- Returns "Read Full Article" link
- Opens in new tab

## Styling

### Design System
- **Primary Color**: `#667eea` (Purple-Blue)
- **Secondary Color**: `#764ba2` (Purple)
- **Gradient**: Linear gradient from primary to secondary
- **Border Radius**: Rounded corners (10-30px)
- **Shadows**: Elevation with colored shadows
- **Transitions**: 0.3s ease on interactive elements

### Responsive Breakpoints
- **Desktop**: > 768px (Grid layout)
- **Tablet**: 480px - 768px (Single column)
- **Mobile**: < 480px (Compact UI)

### Component Styles

#### Header
- Gradient background
- Centered text
- Large title with emoji
- Subtitle for context

#### Category Filters
- Horizontal scroll on mobile
- Pill-shaped buttons
- Active state with gradient
- Hover effects

#### News Cards
- Grid layout (desktop)
- Single column (mobile)
- Hover lift effect
- Image with colored border
- Clear typography hierarchy

#### Loading/Error States
- Centered content
- Animated spinner
- Clear messaging
- Action buttons

## Integration with Existing Code

### Reusing Components
- **DefaultLayout**: Provides header and search bar
- **News**: Displays article list
- **NewsSearch**: Higher-order component for filtering

### Redux Integration
- Not required (component manages own state)
- Can be added later if needed

### Routing
- Added to `app.jsx` Router
- Accessible at `/SportNews`
- Added to navigation menu

## Performance Optimizations

### 1. Caching
- 5-minute cache reduces API calls
- localStorage for persistence
- Automatic invalidation

### 2. Debouncing
- 500ms debounce on search input
- Prevents excessive API calls
- Smooth user experience

### 3. Lazy Loading
- Load More pattern (vs infinite scroll)
- User-controlled loading
- Better for mobile bandwidth

### 4. Image Optimization
- Placeholder images for missing URLs
- CSS object-fit for responsive images
- Lazy loading support (future)

## Testing Scenarios

### Manual Testing Checklist

**Initial Load**
- [ ] Page loads without errors
- [ ] Loading spinner appears
- [ ] Articles display after load
- [ ] Default category is "All Sports"

**Category Filtering**
- [ ] Category buttons are clickable
- [ ] Active category is highlighted
- [ ] Articles update on category change
- [ ] Loading state shows during change

**Search Functionality**
- [ ] Search input is responsive
- [ ] Results filter after 500ms
- [ ] Empty search shows all results
- [ ] No results message appears when appropriate

**Pagination**
- [ ] Load More button appears
- [ ] New articles append to list
- [ ] Button disables during loading
- [ ] Button hides when no more results

**Error Handling**
- [ ] Invalid API key shows error
- [ ] Network error displays message
- [ ] Retry button reloads data
- [ ] Fallback data works when API fails

**Responsive Design**
- [ ] Mobile layout (< 480px)
- [ ] Tablet layout (480-768px)
- [ ] Desktop layout (> 768px)
- [ ] Category filters scroll on mobile

**Caching**
- [ ] First load fetches from API
- [ ] Second load (within 5 min) uses cache
- [ ] Cache expires after 5 minutes
- [ ] Retry clears cache

## Future Enhancements

### Phase 1 (MVP) ✅
- [x] API integration
- [x] Category filtering
- [x] Search functionality
- [x] Pagination
- [x] Caching
- [x] Error handling
- [x] Responsive design

### Phase 2 (Nice to Have)
- [ ] Infinite scroll option
- [ ] Article detail modal
- [ ] Favorite articles (localStorage)
- [ ] Share functionality
- [ ] Date range filtering
- [ ] Sort options (date, relevance)
- [ ] Backend proxy for API key security
- [ ] Server-side rendering

### Phase 3 (Advanced)
- [ ] Multiple API sources
- [ ] Real-time updates (WebSocket)
- [ ] Personalized recommendations
- [ ] User preferences
- [ ] Offline support (Service Worker)
- [ ] Push notifications
- [ ] Analytics integration

## Troubleshooting

### Issue: "Failed to load sports news"
**Cause**: API key invalid or missing  
**Solution**: Check `.env` file, verify API key from NewsAPI dashboard

### Issue: "Rate limit exceeded"
**Cause**: Too many API requests (100/day limit)  
**Solution**: Wait 24 hours or upgrade to paid plan

### Issue: Old data showing
**Cause**: Cache not expired  
**Solution**: Click retry button or wait 5 minutes

### Issue: Search not working
**Cause**: Search query too short or debounce timing  
**Solution**: Wait 500ms after typing, try longer search term

### Issue: Images not loading
**Cause**: Missing image URLs in API response  
**Solution**: Placeholder images used automatically

## Contributing

### Code Style
- Use ES6+ features
- Follow existing patterns
- Add comments for complex logic
- Keep functions small and focused

### Pull Request Guidelines
- Reference issue/task number
- Include description of changes
- Test all scenarios
- Update documentation

### Testing
- Manual testing required (no unit tests yet)
- Test on Chrome, Firefox, Safari
- Test on mobile devices
- Verify API integration

## License
This feature is part of the News Application project.

## Support
For issues or questions, contact the development team or create an issue in the repository.