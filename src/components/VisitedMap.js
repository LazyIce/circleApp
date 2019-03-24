import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

/**
 * this class is used to mark the cities one user has visited
 */
class VisitedMap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mapStyle: {
                position: 'absolute',
                top: props.top || 0,
                left: props.left || 0,
                right: props.right || 0,
                bottom: props.bottom || 0,
            },
            region: this.getScreenRegion(props.markers),
            markers: props.markers || [],
        }
    }

    getScreenRegion(markerList) {
        // find the four bounary indexes
        let left = 180, right = -180, top = -90, bottom = 90
        // if there is no marker, just display the american map
        if (!Array.isArray(markerList) || !markerList.length) {
            return {
                latitude: 37.0902,
                longitude: -95.7129,
                latitudeDelta: 20.0,
                longitudeDelta: 45.0,
            }
        }

        // boundary of the markers
        markerList.forEach(marker => {
            left = Math.min(left, marker.longitude)
            right = Math.max(right, marker.longitude)
            top = Math.max(top, marker.latitude)
            bottom = Math.min(bottom, marker.latitude)
        })

        // if there is one marker, return one bigger region containing the marker
        if (markerList.length === 1) {
            return {
                latitude: (top + bottom) / 2.0,
                longitude: (left + right) / 2.0,
                latitudeDelta: 0.4,
                longitudeDelta: 0.2,
            }
        }

        // if there are more than one markers, return one bigger region containing all the markers
        return {
            latitude: (top + bottom) / 2.0,
            longitude: (left + right) / 2.0,
            latitudeDelta: (top - bottom) * 3,
            longitudeDelta: (right - left) * 3,
        }
    }

    getMapStyle() {
        return this.state.mapStyle
    }

    getMapContainerStyle() {
        return  {
            position: 'absolute',
            top: this.state.mapStyle.top,
            left: this.state.mapStyle.left,
            right: this.state.mapStyle.right,
            bottom: this.state.mapStyle.bottom,
            justifyContent: 'flex-end',
            alignItems: 'center',
        }
    }

    render() {
        return (
            <View style={this.getMapContainerStyle()}>
                <MapView
                    style={this.getMapStyle()}
                    region={this.state.region}
                >
                    {this.state.markers.map(marker => (
                        <Marker
                            coordinate={marker}
                        />
                    ))}
                </MapView>


            </View>
        )
    }
}

const styles = StyleSheet.create({

})

export default VisitedMap