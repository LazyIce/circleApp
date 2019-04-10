import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, Modal, FlatList, StyleSheet, Dimensions, Share } from 'react-native'
import { Card } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import MyHeader from './../components/MyHeader'
import {rectBuilding} from './../img_path'

const BASE_WIDTH = Dimensions.get('window').width
const BASE_HEIGHT = Dimensions.get('window').height

class AchievementScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Achievement',
            modalVisible: false,
            modalImage: rectBuilding,
            list:[
                {
                    img: rectBuilding,
                    name: 'Atlanta'
                },
                {
                    img: rectBuilding,
                    name: 'New York'
                },
                {
                    img: rectBuilding,
                    name: 'Seattle'
                },
                {
                    img: rectBuilding,
                    name: 'Los Angeles'
                },
                {
                    img: rectBuilding,
                    name: 'San Francisco'
                }
            ]
        }
    }

    setModalVisible(visible, key) {
        this.setState({
            modalImage: this.state.list[key]
        });
        this.setState({
            modalVisible: visible
        });
    }

    sharePost() {
        Share.share({
            message: 'I successed in focusing on my work.',
            url: 'www.google.com',
            title: 'Circle'
        }, {
            dialogTitle: 'Share postCard',
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

    render() {
        return (
            <View style={styles.container}>
                <MyHeader {...this.props} title={this.state.title} />
                <Modal  
                    animationType={'fade'}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={()=>{}}
                >
                    <View style={styles.modal}>
                        <View style={styles.content}>
                            <View style={styles.iconGroup}>
                                <Icon name='times' size={25} color={'#000'} onPress={()=> {this.setModalVisible(false)}} />
                                <Icon name='share-alt' size={25} color={'#000'} onPress={() => {this.sharePost()}} />
                            </View>
                            <View style={styles.image}>
                                <Image 
                                    source={rectBuilding} 
                                    resizeMode={'strech'} 
                                    style={{width: BASE_WIDTH - 90, height: BASE_HEIGHT - 240}}
                                />
                            </View>
                            <View style={styles.title}>
                                <Text style={{fontSize: 16}}>Atlanta - 03/11/2019</Text>
                            </View>
                        </View>
                    </View>
                </Modal>
                <FlatList 
                    numColumns={2}
                    data={this.state.list}
                    renderItem={({item})=> 
                        {
                            return (
                                <TouchableOpacity style={styles.cardContainer} activeOpacity={0.6} onPress={()=> {this.setModalVisible(true)}}>
                                    <Card 
                                        image={item.img} 
                                        imageProps={{resizeMode: "strech"}} 
                                        imageStyle={{height: BASE_HEIGHT / 3.5}}
                                    >
                                        <View style={styles.textGroup}>
                                            <Text>{item.name}</Text>
                                        </View>
                                    </Card>
                                </TouchableOpacity>
                            );
                        }
                    }
                    keyExtractor={
                        (index) => { return index }
                    }
                />
            </View>
        ) 
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cardContainer: {
        flex: 0.5
    },
    textGroup: {
        flex: 1,
        alignItems: 'center',
    },
    modal: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        width: BASE_WIDTH - 60,
        height: BASE_HEIGHT - 140,
        backgroundColor: '#FFF'
    },
    iconGroup: {
        flexDirection:'row', 
        justifyContent: "space-between",
        padding: 15
    },
    image: {
        flexDirection:'row', 
        justifyContent: 'center'
    },
    title: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15
    }
});

export default AchievementScreen