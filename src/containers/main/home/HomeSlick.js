import React, { Component } from 'react';
import styles from './HomeSlick.module.scss';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { Paths } from '../../../paths';

class HomeSlick extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            autoplay: true,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1,
        };
        return (
            <div className={styles['container']}>
                <Slider {...settings}>
                    <Link className={styles['item']} to={Paths.ajoonamu.event + '/1'}></Link>
                    <Link className={styles['item']} to={Paths.ajoonamu.event + '/1'}></Link>
                    <Link className={styles['item']} to={Paths.ajoonamu.event + '/1'}></Link>
                </Slider>
            </div>
        );
    };
};

export default HomeSlick;
