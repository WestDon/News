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
        return <ul className="nav-bar-my">
            <li><div>home</div></li>
            <li><div>about us</div></li>
            <li onClick={(e) => { this.openMenu(e) }} className="sub-menu">
                <div>sub</div>
                <SubMenu showMenu={this.state.showMenu} />
            </li>
            <li><div>contact</div></li>
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
            <li onClick={(e) => this.showMenu(e)}>inne11r
                <SubMenu showMenu={this.state.show} close={() => { }} />
            </li>
            <li>inner</li>
            <li>inner</li>
        </ul>
            : null
    }
};