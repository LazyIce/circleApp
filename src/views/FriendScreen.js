import React, { Component } from 'react'
import { FlatList, View, Text, StyleSheet, Dimensions, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Avatar, Input, Button, Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import FriendHeader from './../components/FriendHeader'

const BASE_WIDTH = Dimensions.get('window').width
const BASE_HEIGHT = Dimensions.get('window').height

class FriendScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Friend',
            addFriendModal: false,
            requestModal: false,
            requestNumber: 0,
            list: [
                {
                    name: 'Brette Bayne',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    star: 430
                },
                {
                    name: 'Joe Lee',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    star: 420
                },
                {
                    name: 'Yuki Iwashita',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    star: 360
                    
                },
                {
                    name: 'Samathon Flam',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    star: 320
                },
                {
                    name: 'Sam Mohanmod',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    star: 220
                },
                {
                    name: 'bxie41',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    star: 200
                },
                {
                    name: 'Nancy Hsi',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    star: 160
                },
                {
                    name: 'Eric Burke',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    star: 150
                },
                {
                    name: 'Li Zhang',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    star: 100
                },
                {
                    name: 'Lily Wolf',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    star: 30
                }
            ],
            requestlist: [
                {
                    name: 'Brette Bayne',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    star: 430
                },
                {
                    name: 'Joe Lee',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    star: 420
                },
                {
                    name: 'Yuki Iwashita',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    star: 360
                    
                },
                {
                    name: 'Samathon Flam',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    star: 320
                },
                {
                    name: 'Sam Mohanmod',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    star: 220
                },
                {
                    name: 'bxie41',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    star: 200
                },
                {
                    name: 'Nancy Hsi',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    star: 160
                },
                {
                    name: 'Eric Burke',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    star: 150
                },
                {
                    name: 'Li Zhang',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    star: 100
                },
                {
                    name: 'Lily Wolf',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    star: 30
                }
            ],
            user: {
                name: 'bxie41',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                star: 200,
                index: 6
            }
        }
    }

    popAddFriend(addFriendModal) {
        this.setState({
            addFriendModal: addFriendModal
        })
    }

    accecptRequest(index) {
        let requestlist = this.state.requestlist;
        requestlist.splice(index, 1);
        this.setState({
            requestlist: requestlist
        })
    }

    rejectRequest(index) {
        let requestlist = this.state.requestlist;
        requestlist.splice(index, 1);
        this.setState({
            requestlist: requestlist
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <FriendHeader {...this.props} title={this.state.title} popAddFriend={addFriendModal => this.popAddFriend(addFriendModal)}/>
                <Modal  
                    animationType={'fade'}
                    transparent={true}
                    visible={this.state.addFriendModal}
                    onRequestClose={()=>{}}
                >
                    <View style={styles.modal}>
                        <View style={styles.content}>
                            <View style={styles.title}>
                                <Text style={{fontSize: 20}}>Add your friend by his/her Circle account</Text>
                            </View>
                            <View style={styles.search}>
                                <Input 
                                    placeholder='Username'  
                                    leftIcon={{ type: 'font-awesome', name: 'user', size: 25, color: '#d7d7d7' }}
                                    inputContainerStyle={{borderRadius: 5, borderWidth: 1, borderColor: '#d6d6d6'}}
                                    containerStyle={{marginHorizontal: 15}}
                                    leftIconContainerStyle={{marginRight: 5}}
                                />
                            </View>
                            <View style={styles.btnGroup}>
                                <Button title="Cancel" buttonStyle={styles.button} onPress={() => {this.popAddFriend(false)}} />
                                <Button title="Add" buttonStyle={styles.button} onPress={()=> {
                                    // send request
                                    this.popAddFriend(false);
                                }} />
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal  
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.requestModal}
                    onRequestClose={()=>{}}
                >
                    <Header 
                        leftComponent={ 
                            <TouchableOpacity onPress={() => {
                                this.setState({requestModal: false});
                            }}>
                                <Icon name='times' size={25} color={'#4E4E4E'} />
                            </TouchableOpacity> 
                        }
                        centerComponent={ <Text style={{color: '#000', fontSize: 25}}>Friend Requests</Text> }
                        containerStyle={{backgroundColor: '#FFF', shadowColor: 'transparent', borderBottomWidth: 1}}
                    />
                    <FlatList
                        data={this.state.requestlist}
                        extraData={this.state}
                        renderItem={({item, index})=>{
                            return(
                                <View style={styles.itemContainer}>
                                    <Avatar rounded source={{uri: item.avatar_url }} size={BASE_HEIGHT / 10 - 20} />
                                    <Text style={{ width: BASE_WIDTH / 3, fontSize: 20}}>{item.name}</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: BASE_WIDTH / 4}}>
                                        <TouchableOpacity onPress={() => {this.accecptRequest(index)}} >
                                            <Icon name='check-circle' size={30} color={'#6dc030'} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {this.rejectRequest(index)}}>
                                            <Icon name='times-circle' size={30} color={'#ff3b30'} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }}
                        keyExtractor={(item) => {return item.name}}
                    />
                </Modal>
                <View style={styles.userContainer}>
                    <Avatar rounded source={{uri: this.state.user.avatar_url }} size={BASE_HEIGHT / 5 - 20} containerStyle={{position: 'absolute', top: -30}}/>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={{fontSize: 22.5, marginRight: BASE_WIDTH / 2}}>{this.state.user.name}</Text>
                        <Text style={{fontSize: 18, color: '#000', height: 25, backgroundColor: '#F0F0F0', paddingTop: 2, paddingHorizontal: 10, borderRadius: 10, overflow: 'hidden'}}>
                            {this.state.user.star+ ' '}
                            <Icon name='star' size={18} color={'#C5AFDD'} />
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={{ fontSize: 20}}>You are in </Text>
                        <Text style={{ color: '#7F22FD', fontSize: 30, fontWeight: '600'}}>{this.state.user.index}</Text>
                        <Text style={{ fontSize: 20}}> place</Text>
                    </View>
                </View>
                <FlatList
                    data={this.state.list}
                    extraData={this.state}
                    renderItem={({item, index})=>{
                        return(
                            <View style={styles.itemContainer}>
                                <Text style={{ color: '#7F22FD', fontSize: 25, fontWeight: '600'}}>{index+1}</Text>
                                <Avatar rounded source={{uri: item.avatar_url }} size={BASE_HEIGHT / 10 - 20} />
                                <Text style={{ width: BASE_WIDTH / 3, fontSize: 20}}>{item.name}</Text>
                                <Text style={{ width: BASE_WIDTH / 6, fontSize: 15, color: '#000', height: 25, backgroundColor: '#F0F0F0', paddingTop: 4, paddingHorizontal: 10, borderRadius: 10, overflow: 'hidden'}}>
                                    {item.star+ ' '}
                                    <Icon name='star' size={15} color={'#C5AFDD'} />
                                </Text>
                            </View>
                        )
                    }}
                    keyExtractor={(item) => {return item.name}}
                />
                <TouchableWithoutFeedback onPress={() => {this.setState({ requestModal: true })}}>
                    <View style={styles.request}>
                        <Text style={{fontSize: 23, color: '#A57AD4'}}>Friend Requests</Text>
                        <View style={{width: 30, height: 30, borderRadius: 30, backgroundColor: '#A57AD4', justifyContent: 'center', alignItems: 'center', marginLeft: 10}}>
                            <Text style={{color: '#FFF', fontSize: 18}}>{this.state.requestNumber}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    userContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        height: BASE_HEIGHT / 5,
        marginHorizontal: 10,
        marginTop: 40,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#EFEFEF',
        borderRadius: 5
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: BASE_HEIGHT / 10,
        marginHorizontal: 10,
        marginTop: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#EFEFEF',
        borderRadius: 5
    },
    modal: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        width: BASE_WIDTH - 60,
        height: BASE_HEIGHT / 2.5,
        backgroundColor: '#FFF',
        borderRadius: 5,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    search: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnGroup: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: "center"
    },
    button: {
        width: BASE_WIDTH / 4,
        backgroundColor: '#A57AD4',
    },
    request: {
        borderTopWidth: 1,
        borderColor: '#A57AD4',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default FriendScreen