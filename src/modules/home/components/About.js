import React, { Component } from 'react';

require('./About.scss');
export default class About extends Component {
    render() {
        return (
        	<div className="about" tabIndex="0" aria-labelledby="abt-me">
        		<h2 id="abt-me">About Me</h2>
        		<section className="me-section" tabIndex="0">
	        		<img src="/assets/images/me.jpg" alt="Parminder Singh (aka Param Singh)" tabIndex="0"/>
	        		<p aria-label="My Bio" aria-describedby="my-bio" id="my-bio" tabIndex="0"> 
	        			Hola Mundo!
	        			This is Parminder Singh (aka Param Singh). A passionate coder and JS enthusiast. I love creating rich 
	        			friendly User Interfaces and making the most out of the Modern Front End Development practices.        			
	        		</p>
        		</section>
        	</div>
        )
    }
}
