import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import MyHeader from './../components/MyHeader'

const BASE_WIDTH = Dimensions.get('window').width
const BASE_HEIGHT = Dimensions.get('window').height

const list = [
    {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 120,
        rightSubtitle: 480
        
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 90,
        rightSubtitle: 360
    },
    {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 60,
        rightSubtitle: 240
        
    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 30,
        rightSubtitle: 120
    }
]

class FriendScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Friend'
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <MyHeader {...this.props} title={this.state.title} />
                <View style={styles.listContainer}>
                    <View>
                        {
                            list.map((l, i) => (
                                <ListItem
                                    key={i}
                                    leftAvatar={{ source: { uri: l.avatar_url } }}
                                    title={l.name}
                                    subtitle={
                                        <Text style={styles.starText}>
                                            {l.subtitle+ ' '}
                                            <Icon name='star' size={18} color={'#C5AFDD'} />
                                        </Text>
                                    }
                                    chevron={
                                        <Icon name='chevron-right' size={18} color={'#C5AFDD'} />
                                    }
                                    rightSubtitle={l.rightSubtitle + 'mins'}
                                />
                            ))
                        }
                    </View>
                    <View style={styles.myAvatarContainer}>
                        <ListItem
                            leftAvatar={{ title: 'BX' }}
                            title={'bxie41'}
                            subtitle={
                                <Text style={styles.starText}>
                                    {21+ ' '}
                                    <Icon name='star' size={18} color={'#C5AFDD'} />
                                </Text>
                            }
                            chevron={
                                <Icon name='chevron-right' size={18} color={'#C5AFDD'} />
                            }
                            rightSubtitle={21 + 'mins'}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: BASE_HEIGHT
    },
    starText: {
        fontSize: 18,
        color: '#C5AFDD'
    },
    myAvatarContainer: {
        position: 'fixed',
        bottom: 0
    }
});

export default FriendScreen