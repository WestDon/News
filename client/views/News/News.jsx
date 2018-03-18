var React = require("react");
import './News.css';

export default class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() { 
        debugger;
        return (<div>
        {this.props.news.map((article, i)=>{
            return <div className='news-container' key={i}>
                <div>
                    {article.title}
                </div>
                <img src={article.urlToImage} />
            </div>
        })}
        </div>);
    }
};