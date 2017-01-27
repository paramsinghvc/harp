import React, { Component } from 'react';

require('./About.scss');
export default class About extends Component {
    render() {
        return (
        	<div className="about">
        		<h2>About Me</h2>
        		<section className="me-section">
	        		<img src="/assets/images/me.jpg" />
	        		<p>
	        			Hola Mundo! <br />
	        			This is Parminder Singh (aka Param Singh). A passionate coder and JS enthusiast. I love creating rich 
	        			friendly User Interfaces and making the most out of the Modern Front End Development practices.        			
	        		</p>
        		</section>
        	</div>
        )
    }
}
