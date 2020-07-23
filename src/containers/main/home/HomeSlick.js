import React, { Component } from "react";
import Slider from "react-slick";


class HomeSlick extends React.Component {
	render() {
		const settings = {
		  dots: true,
		  infinite: true,
		  speed: 500,
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  autoplay:true,
		  autoplaySpeed:3000
		};
		return (
		  <div className="container">
					<link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
					<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
					<style>{cssstyle}</style>
			<Slider {...settings}>
			  <div>
				<h3>1</h3>
			  </div>
			  <div>
				<h3>2</h3>
			  </div>
			  <div>
				<h3>3</h3>
			  </div>
			</Slider>
		  </div>
		);
	  }
	}
	
	const cssstyle = `
	.container {

	  width: 90%;
	}
	h3 {
		background: #5f9ea0;
		color: #fff;
		font-size: 36px;
		line-height: 100px;
		margin: 10px;
		padding: 2%;
		height:20vh;
		text-align: center;
	}
	.slick-next:before, .slick-prev:before {
		color: #000;
	}
	`
export default HomeSlick;