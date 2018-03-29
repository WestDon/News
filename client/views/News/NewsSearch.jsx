import React from 'react';
import News from './News';

export default function NewsWithSearch(WrappedComponent, searchText) {
    return class NewsSearch extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                news: [],
            };

            this.search(searchText);
        }
        search(text) {
            const news = this.props.news;
            const searchedNews = news.filter((article) => {
                var text = JSON.stringify(article).toLowerCase();
                return text.includes(searchText.toLowerCase());
            });
            this.state.news = searchedNews;
        }

        render() {
            return <WrappedComponent {...this.props} news={this.state.news}/>;

        }
    }
}