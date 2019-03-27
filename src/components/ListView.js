import React, { Component } from 'react'
import { View } from 'react-native'
import { ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import {building} from './../img_path'

const list = [
    {
        name: 'Atlanta',
        avatar_url: building,
        subtitle: '2 posts'
    },
    {
        name: 'Chicago',
        avatar_url: building,
        subtitle: '1 post'
    },
    {
        name: 'Los Angeles',
        avatar_url: building,
        subtitle: '1 post'
    }
]

export default class ListView extends Component {
    render() {
        return (
            <View>
                {
                    list.map((l, i) => (
                    <ListItem
                        key={i}
                        leftAvatar={{ source: l.avatar_url }}
                        title={l.name}
                        subtitle={l.subtitle}
                        chevron={
                            <Icon name='chevron-right' size={18} color={'#C5AFDD'} />
                        }
                    />
                    ))
                }
            </View>
        )
    }
}