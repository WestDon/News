import React from 'react';
import News from './News';

export default class NewsAdd extends React.Component {

    getType(article) {
        return (
            <div className="add-article" onClick={()=>this.props.addToCart(article)}>

            </div>);
    };
    render() {

        return (
            <News actionNews={(article) => this.getType(article)} {...this.props} />
        );
    }
}

