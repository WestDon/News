var React = require("react");
import './Menu.css';

const menuemail = 0;

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
        };
    }

    openMenu(e) {
        this.setState({ showMenu: !this.state.showMenu });
        e.stopPropagation();
    }

    render() {
        return <ul className="nav">
            <li><a href="#">home</a></li>
            <li><a href="#">about us</a></li>
            <li onClick={(e) => { this.openMenu(e) }} className="sub-menu">
                <a href="#">sub</a>
            <SubMenu showMenu={this.state.showMenu} />
            </li>
            <li><a href="#">contact</a></li>
        </ul>
    }
};


class SubMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
    }

    showMenu(e) {
        this.setState({ show: !this.state.show });
        e.stopPropagation();
    }

    componentWillReceiveProps(props) {
        if (props.showMenu !== this.props.showMenu) {
            if (!this.state.showMenu) {
                this.setState({ show: false });
            }
        }
    }

    close() {
    }

    render() {
        return this.props.showMenu ? <ul className="sub-drop">
            <li onClick={(e) => this.showMenu(e)}><a href="#">inne11r</a>
                <SubMenu showMenu={this.state.show} close={() => { }} />
            </li>
            <li><a href="#">inner</a></li>
            <li><a href="#">inner</a></li>
        </ul>
            : null
    }
};