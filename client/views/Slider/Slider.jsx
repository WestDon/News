import React from 'react';
import './Slider.css';
// const pathToCat = require('./image-slider-2.jpg');
// <img src={require('./image-slider-2.jpg')}>
const pathToSlides = require.context('./', true);
// true here is for use subdirectories, you can also specify regex as third param

const slides = [
    pathToSlides('./News/1.jpg'),
    pathToSlides('./News/2.jpg', true),
    pathToSlides('./News/3.jpg', true),
];

export default class Slider extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            img: slides[1],
            slides: slides,
        };

    }

    next() {
        const { img } = this.state;
        let len = slides.length;
        let index = slides.indexOf(img);
        let nextIndex = index === (len - 1) ? 0 : (index + 1);
        this.setState({ img: slides[nextIndex] });
    }

    prev() {
        const { img } = this.state;
        let len = slides.length;
        let index = slides.indexOf(img);
        let prevIndex = index === 0 ? len - 1 : (index - 1);
        this.setState({ img: slides[prevIndex] });
    }

    goTo(index) {
        this.setState({ img: slides[index] });
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
                        {
                            this.state.slides.map((slide, index) => {
                                let img = slides[index];
                                let className = this.state.img===img ? "active": "";

                                return <li key={index} className = {className} onClick={()=> this.goTo(index)}></li>
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>;
    }
}