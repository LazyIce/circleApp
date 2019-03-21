import React, { Component } from 'react'
import { PanResponder, View, Text, Dimensions, Alert, StyleSheet, AppState } from 'react-native'
import { Button, Avatar } from 'react-native-elements'
import Svg, { Path, Circle, G, Defs, LinearGradient, Stop} from 'react-native-svg'
import {building} from './../img_path'

const BASE_WIDTH = Dimensions.get('window').width
const BASE_HEIGHT = Dimensions.get('window').height - 25

export default class CircleSlider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            angle: this.props.value,
            xCenter: 0,
            yCenter: 0,
            seconds: 0,
            btnTitle: 'Travel',
            starVal: 1,
            appstate: AppState.currentState
        };
    }

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gs) => true,
            onStartShouldSetPanResponderCapture: (e, gs) => true,
            onMoveShouldSetPanResponder: (e, gs) => true,
            onMoveShouldSetPanResponderCapture: (e, gs) => true,
            onPanResponderMove: (e, gs) => {
                let xOrigin = this.state.xCenter - (this.props.dialRadius + this.props.btnRadius);
                let yOrigin = this.state.yCenter - (this.props.dialRadius + this.props.btnRadius);
                let a = this.cartesianToPolar(gs.moveX - xOrigin, gs.moveY - yOrigin);
                this.setState({angle: a, starVal: a});
            }
        });
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState === 'active' && nextAppState === 'background' || nextAppState === 'inactive') {
            this.backgroundTime = new Date().getTime()
        }
        if (this.state.appState === 'inactive' || this.state.appState === 'background' && nextAppState === 'active') {
            if (this.state.btnTitle === 'GiveUp' && Math.round(new Date().getTime() - this.backgroundTime) > 8000) {
                this._timer&&clearInterval(this._timer);
                Alert.alert('You failed!');
                this.setState({btnTitle: 'Travel', starVal: 1, angle: this.props.startCoord, seconds: 0});
            }
        }
        this.setState({appState: nextAppState});
      }

    polarToCartesian(angle) {
        let r = this.props.dialRadius;
        let hC = this.props.dialRadius + this.props.btnRadius;
        let a = ((angle - 90) * Math.PI) / 180.0;

        let x = hC + r * Math.cos(a);
        let y = hC + r * Math.sin(a);
        return {x, y};
    }

    cartesianToPolar(x, y) {
        let hC = this.props.dialRadius + this.props.btnRadius;

        if (x === 0) {
            return y > hC ? 0 : 180;
        } else if (y === 0) {
            return x > hC ? 90 : 270;
        } else {
            return (
                Math.round((Math.atan((y - hC) / (x - hC)) * 180) / Math.PI) +
                (x > hC ? 90 : 270)
            );
        }
    }

    handleMeasure = (ox, oy, width, height, px, py) => {
        this.setState({
            xCenter: px + (this.props.dialRadius + this.props.btnRadius),
            yCenter: py + (this.props.dialRadius + this.props.btnRadius)
        });
    }

    doStuff = () => {
        this.refs.circleslider.measure(this.handleMeasure);
    }

    get_minutes() {
        let mt = this.state.angle;
        if (mt > 0) { 
            mt--; 
            this.setState({angle: mt});
            return 1; 
        }
        else if (mt == 0) { 
            this.setState({angle: 0});
            return 0;
        }
    }

    countTime() {
        if (this.state.btnTitle === 'Travel') {
            this.setState({btnTitle: 'GiveUp'});
            this._timer=setInterval(()=>{
                let ct = this.state.seconds;
                if (ct > 0) { 
                  ct--;
                  this.setState({seconds:ct});
                }
                else if (ct == 0) { 
                  var get_mt = this.get_minutes();
                  if (get_mt == 1) { 
                    ct = 59;
                    this.setState({seconds:ct}); 
                  }
                  else if (get_mt == 0) {
                    this._timer&&clearInterval(this._timer);
                    Alert.alert('You succeed!', `You get ${this.state.starVal} stars!`);
                    this.setState({btnTitle: 'Travel', starVal: 1, angle: this.props.startCoord});
                  }
                }
            }, 1000);
        }
        else {
            Alert.alert('Are you sure you want to give up?', 'You will not receive the stars for this session', [
                {text: 'OK', onPress: () => {
                    this._timer&&clearInterval(this._timer);
                    this.setState({btnTitle: 'Travel', starVal: 1, angle: this.props.startCoord, seconds: 0});
                }},
                {
                    text: 'Cancel',
                    onPress: () => { return },
                    style: 'cancel',
                }
            ]);
        }
    }

    render() {
        let width = (this.props.dialRadius + this.props.btnRadius) * 2;
        let bR = this.props.btnRadius;
        let dR = this.props.dialRadius;
        let startCoord = this.polarToCartesian(this.props.startCoord);
        let endCoord = this.polarToCartesian(this.state.angle);

        return (
            <View style={styles.sliderConatainer}>
                <Avatar
                    size={214}
                    rounded
                    source={building}
                    containerStyle={{position: 'absolute', top: 33}}
                />
                <Svg onLayout={this.doStuff} ref="circleslider" width={width} height={width}>
                    <Defs>
                        <LinearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <Stop offset="0%" stopColor={this.props.startGradient}/>
                            <Stop offset="100%" stopColor={this.props.endGradient}/>
                        </LinearGradient>
                    </Defs>
                    <Circle
                        r={dR}
                        cx={width / 2}
                        cy={width / 2}
                        stroke={this.props.backgroundColor}
                        strokeWidth={25}
                        fill='none'
                    />
                    <Path
                        stroke={'url(#gradient1)'}
                        strokeWidth={this.props.dialWidth}
                        fill='none'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d={`M${startCoord.x} ${startCoord.y} A ${dR} ${dR} 0 ${(this.props.startCoord + 180) % 360 > this.state.angle ? 0 : 1} 1 ${endCoord.x} ${endCoord.y}`}
                    />
                    <G x={endCoord.x - bR} y={endCoord.y - bR}>
                        <Circle
                            r={bR}
                            cx={bR}
                            cy={bR}
                            fill={'#FF6347'}
                            {...this._panResponder.panHandlers}
                        />
                    </G>
                </Svg>
                <Text style={styles.timeText}>
                    {this.props.onValueChange(this.state.angle)}:{this.state.seconds < 10 ? '0' + this.state.seconds : this.state.seconds}
                </Text>
                <Text style={styles.starText}>
                    You will get {Math.round(this.state.starVal)} stars
                </Text>
                <Button buttonStyle={styles.button} color='#FFFFFF' title={this.state.btnTitle} onPress={this.countTime.bind(this)} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    sliderConatainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    timeText: {
        fontSize: 80,
        fontWeight: '400',
        color: '#FFFFFF'
    },
    starText: {
        fontSize: 22,
        color: '#FFFFFF'
    },
    button: {
        width: BASE_WIDTH / 3,
        backgroundColor: '#FF9900',
        marginTop: 30
    }
})

CircleSlider.defaultProps = {
    btnRadius: 20,
    dialRadius: 120,
    dialWidth: 25,
    value: 1,
    maxValue: 360,
    xCenter: BASE_WIDTH / 2,
    yCenter: BASE_HEIGHT / 2,
    startGradient: '#3CB371',
    endGradient: '#90EE90',
    backgroundColor: '#FFD700',
    startCoord: 1,
    onValueChange: x => x
}
