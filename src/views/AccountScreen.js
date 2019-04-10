import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Avatar, Button, ListItem } from 'react-native-elements'
import MyHeader from './../components/MyHeader'
import Icon from 'react-native-vector-icons/FontAwesome'

const BASE_WIDTH = Dimensions.get('window').width
const BASE_HEIGHT = Dimensions.get('window').height

class AccountScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: 'Account',
            username: 'bxie41',
            star: 1,
            time: 480,
            allstar: 301,
            city: 3,
            postcard: 20,
            charity: 4
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <MyHeader {...this.props} title={this.state.title} />
                <View style={styles.contentContainer}>
                    <View style={styles.avatarContainer}>
                        <Avatar 
                            rounded 
                            source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' }}
                            size={BASE_HEIGHT / 6}
                            containerStyle={{marginTop: 20}}
                        />
                        <Text style={{fontSize: 20, marginVertical: 10}}>{this.state.username}</Text>
                        <Text style={styles.starText}>
                            {this.state.star + ' '}
                            <Icon name='star' size={18} color={'#C5AFDD'} />
                        </Text>
                    </View>
                    <View style={styles.listContainer}>
                        <ListItem 
                            containerStyle={styles.listItemContainer}
                            titleStyle={styles.listTitle}
                            rightTitleStyle={styles.rightTitle}
                            leftIcon={{ name: 'av-timer', size: 28, color: '#A57AD4' }}
                            title={'Total time: '}
                            rightTitle={Math.floor(this.state.time / 1440) + 'd' + Math.floor(this.state.time % 1440 / 60) + 'h' + Math.floor(this.state.time % 1440 % 60) + 'm'}
                        />
                        <ListItem 
                            containerStyle={styles.listItemContainer}
                            titleStyle={styles.listTitle}
                            rightTitleStyle={styles.rightTitle}
                            title='Total stars:'
                            leftIcon={{ name: 'star', size: 28, color: '#A57AD4' }}
                            rightTitle={this.state.allstar}
                        />
                        <ListItem 
                            containerStyle={styles.listItemContainer}
                            titleStyle={styles.listTitle}
                            rightTitleStyle={styles.rightTitle}
                            title='Visited City:'
                            leftIcon={{ name: 'flight-takeoff', size: 28, color: '#A57AD4' }}
                            rightTitle={this.state.city}
                        />
                        <ListItem 
                            containerStyle={styles.listItemContainer}
                            titleStyle={styles.listTitle}
                            rightTitleStyle={styles.rightTitle}
                            title='Acquired Postcards:'
                            leftIcon={{ name: 'collections', size: 28, color: '#A57AD4' }}
                            rightTitle={this.state.postcard}
                        />
                        <ListItem 
                            containerStyle={[styles.listItemContainer, {borderBottomWidth: 1}]}
                            titleStyle={styles.listTitle}
                            rightTitleStyle={styles.rightTitle}
                            title='Charity Goal:'
                            leftIcon={{ name: 'filter-vintage', size: 28, color: '#A57AD4' }}
                            rightTitle={this.state.charity}
                        />
                    </View>
                    <View style={styles.btnContainer}>
                        <Button 
                            buttonStyle={styles.button} 
                            titleStyle={styles.btnFont} 
                            title={'LOG OUT'} 
                            onPress={()=>{}} 
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
    },
    contentContainer: {
        height: BASE_HEIGHT - 90,
        justifyContent: 'space-between',
        alignItems: "center"
    },
    avatarContainer: {
        alignItems: 'center'
    },
    listContainer: {
        alignItems: 'center'
    },
    listItemContainer: {
        width: BASE_WIDTH - 30,
        borderTopWidth: 1,
    },
    listTitle: {
        color: '#000',
        fontSize: 18
    },
    rightTitle: {
        fontSize: 18
    },
    starText: {
        color: '#000', 
        height: 25,
        fontSize: 18,
        backgroundColor: '#F0F0F0',
        paddingTop: 2,
        paddingLeft: 25,
        paddingRight: 25,
        borderRadius: 10,
        overflow: 'hidden'
    },
    btnContainer: {
        alignItems: 'center'
    },
    button: {
        width: BASE_WIDTH / 3,
        backgroundColor: '#A57AD4'
    },
    btnFont: {
        color: '#FFF',
        fontSize: 15
    }
});

export default AccountScreen