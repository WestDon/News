var React = require("react");
import Banner from '../Banner/Banner';
import Menu from '../Menu/Menu';

import './Default.css';

export default class DefaultLayout extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <nav className="navbar navbar-light bg-light justify-content-between">
                    <a className="navbar-brand">News Portal</a>
                    <form className="form-inline">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </nav>
                <div className="menu-container"><Menu /></div>

                <div>
                    {this.props.children}
                </div>

                <Banner time={1} />
            </div>);
    }
};

