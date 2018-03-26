var React = require("react");
import './News.css';

export default class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (<div className='news'>
            {this.props.news.map((article, i) => {
                return <div className='news-container' key={i}>
                    <div className="title">
                        {article.title}
                    </div>

                    <img className="image" src={article.urlToImage} />

                    <div className="description">
                        {article.description}
                    </div>
                    <div className="url">

                        {this.props.actionNews(article)}

                        <a href={article.url}>{article.author}</a>
                    </div>

                </div>
            })}
        </div>);
    }
};