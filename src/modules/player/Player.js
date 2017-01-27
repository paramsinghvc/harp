import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Slider from 'material-ui/Slider';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import bindThis from '../../shared/bindThis';
import { setVolume, setAudio, playAudio, pauseAudio, togglePlayPause, setAudioDuration, setCurrentPosition, playNextAudio, playPrevAudio, clearPlayerQueue } from './PlayerActions';

require('./Player.scss');

@connect((state) => {
    return {
        player: state.player
    }
}, (dispatch) => {
    return bindActionCreators({ setVolume, setAudio, playAudio, pauseAudio, togglePlayPause, setAudioDuration, setCurrentPosition, playNextAudio, playPrevAudio, clearPlayerQueue }, dispatch)
})
export default class Player extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.audioElem = ReactDOM.findDOMNode(this.refs.audioElem);

        this.audioElem.addEventListener('ended', function(e) {
            this.endAudio();
        }.bind(this), false);

        this.audioElem.addEventListener('loadeddata', function() {
            if (this.audioElem.readyState >= 2) {
                this.audioElem.play();
            }
        }.bind(this));

        this.audioElem.addEventListener('durationchange', function(e) {
            console.log(this.audioElem.duration);
            this.props.setAudioDuration(this.audioElem.duration);
        }.bind(this), false);

        this.audioElem.addEventListener('timeupdate', function(e) {
            !this.audioElem.ended && this.props.setCurrentPosition(this.audioElem.currentTime);
        }.bind(this), false);
    }

    @bindThis
    getVolumeClass(volume) {
        let vClass = '';
        if (volume > 0)
            if (volume > 3)
                vClass = 'up';
            else
                vClass = 'down';
        else
            vClass = 'off';

        return `material-icons volume ${vClass}`;
    }

    @bindThis
    playPauseAudio() {
        this.props.togglePlayPause();
    }

    endAudio() {
        this.props.pauseAudio();
        this.props.setCurrentPosition(0);
        this.audioElem.currentTime = 0;
        this.props.playNextAudio();
    }

    @bindThis
    changeVolume(vol) {
        this.props.setVolume(vol);
        this.setAudioElementVolume(vol);
    }

    @bindThis
    toggleMuteVolume(currentVolume) {
        if (currentVolume > 0) {
            this.props.setVolume(0);
            this.setAudioElementVolume(0);
        } else {
            this.props.setVolume(3);
            this.setAudioElementVolume(3);
        }
    }

    @bindThis
    setAudioElementVolume(vol) {
        let volume = (1 / 5) * vol;
        this.audioElem.volume = volume;
    }

    @bindThis
    seekAudioToPosition(e, pos) {
        this.audioElem.currentTime = pos;
    }

    @bindThis
    playPauseStateCheck(isPlaying) {
        if (this.audioElem) {
            if (isPlaying && this.audioElem.paused) {
                this.audioElem.play();
            }
            if (!isPlaying && !this.audioElem.paused) {
                this.audioElem.pause();
            }
        }
    }

    @bindThis
    playNext() {
        this.props.playNextAudio();
    }

    @bindThis
    playPrevious() {
        this.props.playPrevAudio();
    }

    render() {

        this.playPauseStateCheck(this.props.player.get('isPlaying'));
        return (
            <section id="s-player">                             
                <div className="audio-info">
                    <p className="audio-name">{this.props.player.getIn(['audioInfo', 'name'])}</p>
                    <p className="audio-artists">{this.props.player.getIn(['audioInfo', 'artists'])}</p>
                </div>
                <div className="audio-controls">
                    <audio id="audio-elem" ref="audioElem" src={this.props.player.getIn(['audioInfo', 'url'])} />                    
                    <section className="seek-controls">
                        <i className="material-icons prev" onClick={this.playPrevious}>&#xE045;</i>
                        <i className={this.props.player.get('isPlaying') ? `material-icons pause-btn`: `material-icons play-btn`}
                        onClick={this.playPauseAudio}></i>
                        <i className="material-icons next"  onClick={this.playNext}>&#xE044;</i>                        
                    </section>
                    <i className="material-icons clear-queue" title="Clear Queue" onClick={this.props.clearPlayerQueue}>&#xE0B8;</i>
                    <Slider style={{width: '100%'}} sliderStyle={{marginTop: 5}}
                    max={this.props.player.get('audioDuration')} min={0} value={this.props.player.get('currentPosition')}
                    onChange={this.seekAudioToPosition}
                    />
                </div>
                <div className="audio-volume">
                    <i className={this.getVolumeClass(this.props.player.get('volume'))} onClick={() => {this.toggleMuteVolume(this.props.player.get('volume'))}}></i>
                    <Slider style={{width: '100%'}} 
                    sliderStyle={{marginTop: 0, marginBottom: 0}} 
                    value={this.props.player.get('volume')} min={0} max={5}
                    onChange={(e, volume) => {this.changeVolume(volume)}}
                    />
                </div>
                
            </section>
        )
    }
}
