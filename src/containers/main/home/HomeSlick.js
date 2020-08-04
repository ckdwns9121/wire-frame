import React, { Component } from "react";
import styles from './HomeSlick.module.scss';
import Slider from "react-slick";



function SampleNextArrow(props) {
	const { className, style, onClick } = props;
	return (
	  <div
		className={className}
		style={{ ...style, display: "block", background: "red" }}
		onClick={onClick}
	  />
	);
  }
  
  function SamplePrevArrow(props) {
	  console.log(props);
	const { className, style, onClick } = props;
	return (
	  <div
		className="slick-arrow slick-prev"
		style={{ ...style, display: "block", background: "green" }}
		onClick={onClick}
	  />
	);
  }
  


class HomeSlick extends React.Component {
	state = {
		oldSlide: 0,
		activeSlide: 1,
		end: 3
	};

	render() {

		const settings = {
			dots: true,
			infinite: true,
			autoplay: true,
			speed: 1000,
			slidesToShow: 1,
			slidesToScroll: 1,
			nextArrow: <SampleNextArrow />,
			prevArrow: <SamplePrevArrow />,
			appendDots: dots => <ul>{dots}</ul>,
 			beforeChange: (current, next) =>
				this.setState({ oldSlide: current, activeSlide: next + 1 }),
		};


		const cssstyle = `
		.slick-next, .slick-prev {
			color: #000;
		}`

		return (
			<div className={styles['container']}>
            <style>{cssstyle}</style>
				<Slider {...settings} className={styles['test']}>
				<div className={styles['item']}>
						<div className={styles['count']}>
							<span>
								{this.state.activeSlide}
							</span>
							<span>
								{this.state.end}
							</span>
						</div>
					</div>
					<div className={styles['item2']}>
						<div className={styles['count']}>
							<span>
								{this.state.activeSlide}
							</span>
							<span>
								{this.state.end}
							</span>
						</div>
					</div>
					<div className={styles['item3']}>
						<div className={styles['count']}>
							<span>
								{this.state.activeSlide}
							</span>
							<span>
								{this.state.end}
							</span>
						</div>
					</div>

				</Slider>
			</div>
		);
	}
}




	const cssstyle = `
	.slick-next:before, .slick-prev:before {
		color: #000;
	}
	`
export default HomeSlick;