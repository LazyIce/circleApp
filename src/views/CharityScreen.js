import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, Dimensions, Share } from 'react-native'
import { Button, Card } from 'react-native-elements'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import MyHeader from './../components/MyHeader'
import {rectBuilding} from './../img_path'

const BASE_WIDTH = Dimensions.get('window').width
const BASE_HEIGHT = Dimensions.get('window').height

class CharityScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Charity',
            index: 0,
            routes: [
                { key: 'first', title: 'COMPLETED' },
                { key: 'second', title: 'IN PROGRESS' }
            ],
            cities: [
                {
                    city: 'Atlanta',
                    completed: true,
                    title: 'APR 4th, 2019',
                    img: {rectBuilding},
                    content: "COCA COLA has donated 20k to the Atlanta Children's Hospital"
                },
                {
                    city: 'Chicago',
                    completed: false,
                    title: '2320/200k',
                    img: {rectBuilding},
                    content: "Once this goal is completed, Blue Cross Blue Shield Association will donate 20k to the Chicago Children's Hospital" 
                },
                {
                    city: 'New York',
                    completed: true,
                    title: 'Jun 1st, 2018',
                    img: {rectBuilding},
                    content: "Cidental has donated 20k to the New York Children's Hospital" 
                },
                {
                    city: 'Seattle',
                    completed: false,
                    title: '6670/300k',
                    img: {rectBuilding},
                    content: "Once this goal is completed, Amazon will donate 30k to the Seattle Red Cross Organization" 
                }
            ]
        }
    }

    sharePost() {
        Share.share({
            message: 'I have succeeded in Atlanta Charity Goal',
            url: 'https://s3.amazonaws.com/beauty-images/fox.pngwww.google.com',
            title: 'Circle'
        }, {
            dialogTitle: 'Achieved Charity Goal',
            tintColor: 'green'
        })
        .then(this.showResult)
        .catch((error) => this.setState({result: 'error: ' + error.message}));
    }

    showResult(result) {
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                this.setState({result: 'shared with an activityType: ' + result.activityType});
            } else {
                this.setState({result: 'shared'});
            }
        } else if (result.action === Share.dismissedAction) {
            this.setState({result: 'dismissed'});
        }
    }

    CompletedRoute = () => {
        return (
            <ScrollView style={styles.scene} >
                {this.state.cities.filter(city => {return city.completed === true})
                    .map(city => {
                        return (
                            <Card 
                                image={rectBuilding}
                                imageProps={{resizeMode: "strech"}} 
                                imageStyle={{height: BASE_HEIGHT / 3}}
                            >  
                                <Text style={styles.title}>{city.city}</Text>
                                <Text style={styles.subtitle}>Compeleted on {city.title}</Text>
                                <Text style={styles.content}>{city.content}</Text>
                                <View style={styles.btnContainer}>
                                    <Button 
                                        buttonStyle={styles.button} 
                                        titleStyle={styles.btnFont} 
                                        title={'SHARE'} 
                                        onPress={()=>{this.sharePost()}} 
                                    />
                                </View>
                            </Card>
                        );
                    })
                }
            </ScrollView>
        )
    }

    ProgressedRoute = () => {
        return (
            <ScrollView style={styles.scene} >
                {this.state.cities.filter(city => {return city.completed === false})
                    .map(city => {
                        return (
                            <Card 
                                image={rectBuilding}
                                imageProps={{resizeMode: "strech"}} 
                                imageStyle={{height: BASE_HEIGHT / 3}}
                            >   
                                <Text style={styles.title}>{city.city}</Text>
                                <Text style={styles.subtitle}>{city.title} charity goal</Text>
                                <Text style={styles.content}>{city.content}</Text>
                                <View style={styles.btnContainer}>
                                    <Button 
                                        buttonStyle={styles.button} 
                                        titleStyle={styles.btnFont} 
                                        title={'TRAVEL'} 
                                        onPress={()=>{this.props.navigation.navigate('Home')}} 
                                    />
                                </View>
                            </Card>
                        );
                    })
                }
            </ScrollView>
        )
    }

    renderTabBar(props) {
        return (
            <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: '#BC4FF5' }}
                style={{ backgroundColor: '#FFF'}}
                labelStyle={{ color: '#000'}}
            />
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <MyHeader {...this.props} title={this.state.title} />
                <View style={styles.container}>
                    <TabView
                        navigationState={this.state}
                        renderScene={SceneMap({
                            first: this.CompletedRoute,
                            second: this.ProgressedRoute
                        })}
                        renderTabBar={this.renderTabBar}
                        onIndexChange={index => this.setState({ index })}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 10
    },
    title: {
        fontSize: 25
    },
    subtitle: {

    },
    content: {
        paddingVertical: 10
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        width: BASE_WIDTH / 4,
        height: 30,
        backgroundColor: '#A57AD4',
        padding: 5
    },
    btnFont: {
        color: '#FFF',
        fontSize: 15
    }
});

export default CharityScreen