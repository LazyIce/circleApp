import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import Swiper from './../components/Swiper';
import { board1, board2, board3, board4, board5 } from './../img_path';

const WIDTH = Dimensions.get('window').width;

export default class OnboardScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[styles.slide, { backgroundColor: '#fff' }]}>
                 <Swiper {...this.props}>
                    <View style={[styles.slide, { backgroundColor: '#fff' }]}>
                        <Text style={styles.text}>Pick a place to start your journey</Text>
                        <Image source={board1} style={styles.img} />
                    </View>
                    <View style={[styles.slide, { backgroundColor: '#fff' }]}>
                        <Text style={styles.text}>Put down your phone,</Text>
                        <Text style={styles.text}>focus on real world and be effective</Text>
                        <Image source={board2} style={styles.img} />
                    </View>
                    <View style={[styles.slide, { backgroundColor: '#fff' }]}>
                        <Text style={styles.text}>Earn stars and unlock new places</Text>
                        <Image source={board3} style={styles.img} />
                    </View>
                    <View style={[styles.slide, { backgroundColor: '#fff' }]}>
                        <Text style={styles.text}>Achieve charity goal, we will donate really money</Text>
                        <Image source={board4} style={styles.img} />
                    </View>
                    <View style={[styles.slide, { backgroundColor: '#fff' }]}>
                        <Text style={styles.text}>Be present, focus on what matters to you</Text>
                        <Image source={board5} style={styles.img} />
                    </View>    
                </Swiper>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    slide: {
        flex: 1,                  
        justifyContent: 'center',   
        alignItems: 'center',     
    },
    text: {
        color: '#8947D2',
        fontFamily: 'Avenir',
        fontSize: 25,
        textAlign: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    img: {
        width: WIDTH / 3 * 2,
        height: WIDTH / 2 * 2,
        resizeMode: 'center'
    },
    button: {
        width: WIDTH / 3
    }
});