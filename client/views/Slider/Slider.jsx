import React from 'react';
import './Slider.css';
// const pathToCat = require('./image-slider-2.jpg');
// <img src={require('./image-slider-2.jpg')}>
const pathToSlides = require.context('./', true);
// true here is for use subdirectories, you can also specify regex as third param

const slides = [
    './1.jpg',
    './2.jpg',
    './3.jpg',
];

export default class Slider extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            index: 1,
            img: pathToSlides(slides[1], true),
        };

    }

    next() {
        const { index, img } = this.state;
        let len = slides.length;
        let nextIndex = index === (len - 1) ? 0 : (index + 1);
        this.setState({ index: nextIndex, img: pathToSlides(slides[nextIndex], true) });
    }

    prev() {
        const { index, img } = this.state;
        let len = slides.length;
        let prevIndex = index === 0 ? len - 1 : (index - 1);
        this.setState({ index: prevIndex, img: pathToSlides(slides[prevIndex], true) });
    }

    render() {
        return <div className="slider">
            <div className="slider-wrapper">
                <div className="slider-body">
                    <div className="left-button" onClick={() => this.prev()}></div>
                    <img className="slider-content" src={this.state.img} />
                    <div className="right-button" onClick={() => this.next()}></div>
                </div>
                <div className="bottom-slider">
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
        </div>;
    }
}