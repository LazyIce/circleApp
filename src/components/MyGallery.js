import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Gallery from 'react-native-image-gallery'

export default class MyGallery extends Component {
    render() {
        return (
            <View>
                <Gallery
                    style={{ flex: 1, backgroundColor: 'black' }}
                    images={[
                        { source: { uri: 'http://i.imgur.com/6vOahbP.jpg' }, dimensions: { width: 150, height: 150 } },
                        { source: { uri: 'http://i.imgur.com/XP2BE7q.jpg' } },
                        { source: { uri: 'http://i.imgur.com/5nltiUd.jpg' } }
                    ]}
                />
            </View>
        )
    }
}