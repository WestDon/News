var React = require("react");
var connect = require("react-redux").connect;
var actions = require("../actions");

import Banner from './Banner/Banner';
import Slider from './Slider/Slider';
import NewsRemove from './News/NewsRemove';
import Menu from './Menu/Menu';
import axios from 'axios';
import DefaultLayout from './Layout/Default';

class NewsView extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            articles: [],
        }
    }

 

    render() {
        return (
            <DefaultLayout>
                <NewsRemove news={this.props.articles} removeFromCart={this.props.removeArticle}/>
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

