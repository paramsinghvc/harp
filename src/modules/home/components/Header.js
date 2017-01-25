import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { Link } from 'react-router';

class Header extends Component {
    render() {
        return (
        	<header>
        		<AppBar
				    title={this.props.title}
				    iconClassNameRight="muidocs-icon-navigation-expand-more"
				     onLeftIconButtonTouchTap={this.props.toggleAppDrawer}
				 />
        		<Drawer open={this.props.appDrawerOpen} docked={false} onRequestChange={this.props.toggleAppDrawer}>
        			<AppBar
				    	title={this.props.title}
				    	iconElementLeft={<IconButton><NavigationClose /></IconButton>}
				    	onLeftIconButtonTouchTap={this.props.toggleAppDrawer}
				  	/>				  	
				  	<Link to="/" onClick={this.props.toggleAppDrawer}><MenuItem>Home</MenuItem></Link>
		          	<Link to="/about" onClick={this.props.toggleAppDrawer}><MenuItem>About</MenuItem></Link>
		          	<Link to="/login" onClick={this.props.toggleAppDrawer}><MenuItem>Login</MenuItem></Link>
		        </Drawer>		        	        	
			 </header>
        )
    }
}

Header.propTypes = {
	title: React.PropTypes.string,
	appDrawerOpen: React.PropTypes.bool,
	toggleAppDrawer: React.PropTypes.func
}

export default Header;