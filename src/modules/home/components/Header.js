import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { Link, browserHistory } from 'react-router';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import bindThis from '../../../shared/bindThis';
import LoginService from '../../login/LoginService';

class Header extends Component {

    @bindThis
    refreshPage() {
        window.location.reload();
    }

    @bindThis
    logoutApp() {
    	LoginService.logout();
    	browserHistory.push('/login');
    }

    render() {
        return (
            <header>
        		<AppBar
				    title={this.props.title}
				     onLeftIconButtonTouchTap={this.props.toggleAppDrawer}
				     iconElementRight={(<IconMenu
						    iconButtonElement={
						      <IconButton ><MoreVertIcon color="white"/></IconButton>
						    }
						    targetOrigin={{horizontal: 'right', vertical: 'top'}}
						    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
						  >
						    <MenuItem primaryText="Refresh" onClick={this.refreshPage} />
						    <MenuItem primaryText="Sign out" onClick={this.logoutApp} />
						  </IconMenu>)}
				 />
        		<Drawer open={this.props.appDrawerOpen} docked={false} onRequestChange={this.props.toggleAppDrawer}
        			// style={{display: (this.props.appDrawerOpen ? 'block': 'none')}}
        			>
        			<AppBar
				    	title={this.props.title}
				    	iconElementLeft={<IconButton><NavigationClose /></IconButton>}
				    	onLeftIconButtonTouchTap={this.props.toggleAppDrawer}
				  	/>				  	
				  	<Link to="/" aria-labelledby="top-categories" onClick={this.props.toggleAppDrawer}>
				  		<MenuItem id="top-categories">Top Categories</MenuItem>
				  	</Link>
				  	<Link to="/new-releases" aria-labelledby="new-releases" onClick={this.props.toggleAppDrawer}>
				  		<MenuItem id="new-releases">New Releases</MenuItem>
				  	</Link>
				  	<Link to="/featured-playlists" aria-labelledby="featured-playlists" onClick={this.props.toggleAppDrawer}>
				  		<MenuItem id="featured-playlists">Featured Playlists</MenuItem>
				  	</Link>
		          	<Link to="/about" aria-labelledby="about" onClick={this.props.toggleAppDrawer}>
		          		<MenuItem id="about">About</MenuItem>
		          	</Link>
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
