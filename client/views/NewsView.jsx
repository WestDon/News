var React = require("react");
var connect = require("react-redux").connect;
var actions = require("../actions");

import Banner from './Banner/Banner';
import Slider from './Slider/Slider';
import News from './News/News';
import Menu from './Menu/Menu';
import axios from 'axios';

class NewsView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
        }
    }

    componentWillMount() {
        //this.setState({ articles: data.articles });
    }

    render() {
        return <div>

            <nav className="navbar navbar-light bg-light justify-content-between">
                <a className="navbar-brand">News Portal</a>
                <form className="form-inline">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </nav>

            <div>
                 <News news={this.props.articles} />
            </div>
        </div >
    }
};

function mapStateToProps(state) {
    return {
        articles: state.articles,
    };
}

module.exports = connect(mapStateToProps, actions)(NewsView);

