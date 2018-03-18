var React = require("react");
import './Banner.css';

export default class Banner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
        };
        this.setBanner();
    }

    setBanner() {

        var date = new Date(new Date().getTime() + this.props.time * 1000);
        document.cookie = "name=value; path=/; expires=" + date.toUTCString();

        const interval = setInterval(() => {
            let cookie = document.cookie;
            if (!cookie) {
                clearInterval(interval);
                this.setState({ show: false });
            }
        }, 200);
    }

    render() {
        return this.state.show ? <div className="banner-container">
            Banner
        </div> : null
    }
};