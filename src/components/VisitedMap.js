import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { getScreenRegion } from '../Constants';

/**
 * this class is used to mark the cities one user has visited
 */
class VisitedMap extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const markers = this.props.markers || []
        const region = getScreenRegion(markers)
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    region={region}
                >
                    {markers.map((marker, index) => (
                        <Marker
                            key={index}
                            coordinate={marker.latlng}
                        />
                    ))}
                </MapView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
})

export default VisitedMap