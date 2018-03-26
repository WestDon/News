
import React from 'react';
import DefaultLayout from '../Layout/Default';
import Slider from '../Slider/Slider';
import NewsAdd from '../News/NewsAdd';
import actions from '../../actions';
var connect = require("react-redux").connect;

var data = {
    "status": "ok",
    "source": "bbc-sport",
    "sortBy": "top",
    "articles": [
      {
        "author": "BBC Sport",
        "title": "Jamie Carragher: Former Liverpool defender suspended by Sky Sports after 'spitting incident'",
        "description": "Jamie Carragher is suspended by Sky after a video shows the former footballer spitting towards a girl in a car from his own vehicle.",
        "url": "http://www.bbc.co.uk/sport/football/43376262",
        "urlToImage": "https://ichef.bbci.co.uk/onesport/cps/624/cpsprodpb/13590/production/_97584297_breaking_news.png",
        "publishedAt": "2018-03-12T14:08:33Z"
      },
      {
        "author": "BBC Sport",
        "title": "Six Nations 2018: Jeremy Guscott on questions facing England",
        "description": "England's attack is plodding, they aren't certain what they're doing at the breakdown and Eddie Jones' messages aren't getting across, says Jeremy Guscott.",
        "url": "http://www.bbc.co.uk/sport/rugby-union/43366501",
        "urlToImage": "https://ichef.bbci.co.uk/onesport/cps/624/cpsprodpb/4337/production/_100370271_wigglesworth.jpg",
        "publishedAt": "2018-03-12T11:56:35Z"
      },
      {
        "author": "BBC News",
        "title": "Cricketer Stokes denies affray charge",
        "description": "The England all-rounder, who is accused of fighting outside a nightclub, appears at court via video link.",
        "url": "http://www.bbc.co.uk/news/uk-england-bristol-43370325",
        "urlToImage": "https://ichef-1.bbci.co.uk/news/1024/branded_news/14744/production/_100008738_ben_stokes_getty.jpg",
        "publishedAt": null
      },
      {
        "author": "BBC Sport",
        "title": "Tiger Woods' resurgence sends bolt of electricity through golf",
        "description": "Tiger Woods' comeback has lit up the game and with the Masters just around the corner, Iain Carter believes he has every chance to contend at Augusta.",
        "url": "http://www.bbc.co.uk/sport/golf/43375079",
        "urlToImage": "https://ichef.bbci.co.uk/onesport/cps/624/cpsprodpb/16B9F/production/_100378039_hi045483650.jpg",
        "publishedAt": "2018-03-12T14:03:09Z"
      },
      {
        "author": "BBC Sport",
        "title": "Michael Carrick: Manchester United midfielder to retire at end of season",
        "description": "Manchester United midfielder Michael Carrick announces he will retire at the end of the season.",
        "url": "http://www.bbc.co.uk/sport/football/43203679",
        "urlToImage": "https://ichef.bbci.co.uk/onesport/cps/624/cpsprodpb/13590/production/_97584297_breaking_news.png",
        "publishedAt": "2018-03-12T14:28:22Z"
      },
      {
        "author": "BBC News",
        "title": "Jamie Carragher caught on camera 'spitting' from his car",
        "description": "Jamie Carragher has apologised after this video emerged of him spitting towards a car from his vehicle.",
        "url": "http://www.bbc.co.uk/news/uk-43378493",
        "urlToImage": "https://ichef-1.bbci.co.uk/news/1024/branded_news/D793/production/_100378155_p060xc8h.jpg",
        "publishedAt": null
      },
      {
        "author": "BBC Sport",
        "title": "World sport: 10 photos we liked this week",
        "description": "A selection of some of the most visual sport photographs taken from around the world this week.",
        "url": "http://www.bbc.co.uk/sport/43374911",
        "urlToImage": "https://ichef.bbci.co.uk/onesport/cps/624/cpsprodpb/109F8/production/_100388086_darnell_foreman_basketball_getty.jpg",
        "publishedAt": "2018-03-12T17:07:39Z"
      },
      {
        "author": "BBC Sport",
        "title": "England cricket national selector James Whitaker to step down in overhaul",
        "description": "James Whitaker will step down as English cricket's national selector at the end of March as part of an overhaul into how the country selects players.",
        "url": "http://www.bbc.co.uk/sport/cricket/43373702",
        "urlToImage": "https://ichef.bbci.co.uk/onesport/cps/624/cpsprodpb/13590/production/_97584297_breaking_news.png",
        "publishedAt": "2018-03-12T12:42:26Z"
      },
      {
        "author": "BBC Sport",
        "title": "Six new faces in Alex McLeish's Scotland squad for March friendlies",
        "description": "Scotland manager Alex McLeish calls up six new faces in a 27-man squad for friendlies with Costa Rica and Hungary.",
        "url": "http://www.bbc.co.uk/sport/football/43369364",
        "urlToImage": "https://ichef.bbci.co.uk/onesport/cps/624/cpsprodpb/E5CB/production/_100372885_barryd.jpg",
        "publishedAt": "2018-03-12T11:55:24Z"
      },
      {
        "author": "BBC Sport",
        "title": "Winter Paralympics: Matti Suur-Hamari suffers celebration fail after winning snowboard gold",
        "description": "Matti Suur-Hamari's celebrations do not not ago according to plan after he wins gold in the men's snowboard cross SB-LL2 at the Winter Paralympics in Pyeongchang.",
        "url": "http://www.bbc.co.uk/sport/disability-sport/43371361",
        "urlToImage": "https://ichef.bbci.co.uk/onesport/cps/624/cpsprodpb/517A/production/_100385802_mmparadownhillfinal1203.mp4.00_00_37_17.still002.jpg",
        "publishedAt": "2018-03-12T14:55:39Z"
      }
    ]
  };

  
export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          articles: [],
        }
      }



      componentWillMount() {
        // axios.get('https://newsapi.org/v1/articles?source=bbc-sport&sortBy=top&apiKey=6f7c85381a5c44deb7e024cd02c60e31')
        //   .then((res) => {
        //     debugger;
        this.setState({ articles: data.articles });
        // });
      }

    render() {
        return (
            <DefaultLayout>
                <div className="welcome">
                    <div>
                        <Slider />
                    </div>
                </div>
                <div>
                    <NewsAdd news={data.articles} addToCart={this.props.addArticle} />
                </div>
            </DefaultLayout>
        );
    }
}
module.exports = connect(null, actions)(Home);