import React, { Component } from 'react';
import styles from './HomeSlick.module.scss';
import Slider from 'react-slick';

class HomeSlick extends React.Component {
    state = {
        oldSlide: 0,
        activeSlide: 1,
        end: 3,
    };

    render() {
        const settings = {
            dots: true,
            infinite: true,
            autoplay: true,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1,
            appendDots: (dots) => <ul>{dots}</ul>,
            beforeChange: (current, next) =>
                this.setState({ oldSlide: current, activeSlide: next + 1 }),
        };
        return (
            <div className={styles['container']}>
                <Slider {...settings} className={styles['test']}>
                    <div className={styles['item']}>
                        <div className={styles['count']}>
                            <span>{this.state.activeSlide}</span>
                            <span>{this.state.end}</span>
                        </div>
                    </div>
                    <div className={styles['item']}>
                        <div className={styles['count']}>
                            <span>{this.state.activeSlide}</span>
                            <span>{this.state.end}</span>
                        </div>
                    </div>
                    <div className={styles['item']}>
                        <div className={styles['count']}>
                            <span>{this.state.activeSlide}</span>
                            <span>{this.state.end}</span>
                        </div>
                    </div>
                </Slider>
            </div>
        );
    };
};

export default HomeSlick;
