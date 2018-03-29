var React = require("react");
var connect = require("react-redux").connect;
var actions = require("../actions");

import Banner from './Banner/Banner';
import Slider from './Slider/Slider';
import NewsRemove from './News/NewsRemove';
import NewsSerach from './News/NewsSearch';
import Menu from './Menu/Menu';
import axios from 'axios';
import DefaultLayout from './Layout/Default';


class NewsView extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            articles: [],
            searchText: "",
        }
    }

 

    render() { 
        const NewsWithSearch = NewsSerach(
            NewsRemove,
            this.state.searchText
          );

        return (
            <DefaultLayout handleSearch={(e) => this.setState({ searchText: e.target.value })}>
                <NewsWithSearch news={this.props.articles} removeFromCart={this.props.removeArticle}/>
            </DefaultLayout>
        );               
    }
};

function mapStateToProps(state) {
    
    return {
        articles: state.articles,
    };
}

module.exports = connect(mapStateToProps, actions)(NewsView);

