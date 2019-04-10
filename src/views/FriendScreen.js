import React, { Component } from 'react'
import { FlatList, View, Text, StyleSheet, Dimensions } from 'react-native'
import { Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import MyHeader from './../components/MyHeader'

const BASE_WIDTH = Dimensions.get('window').width
const BASE_HEIGHT = Dimensions.get('window').height

class FriendScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Friend',
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
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
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
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    star: 30
                }
            ],
            user: {
                name: 'bxie41',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                star: 200,
                index: 6
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <MyHeader {...this.props} title={this.state.title} />
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
                    style={{marginBottom: 10}}
                    data={this.state.list}
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
    }
});

export default FriendScreen