import React from 'react';
import News from './News';

export default class NewsRemove extends React.Component {

    getType(article) {
        return (
            <div className="remove-article" onClick={() => this.props.removeFromCart(article)}>

            </div>);
    };
    
    render() {
        return (
            <News actionNews={(article) => this.getType(article)} {...this.props} />
        );
    }
}