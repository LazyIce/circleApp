import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import MapView, { Marker, Polygon } from 'react-native-maps'
import { colors, objToQueryString } from './../Constants'
import { getScreenRegion } from './../Constants'

class JourneyMap extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const mapStyle = [
      {
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.neighborhood",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      }
    ]
    const locationDetails = this.props.locations || []
    const region = this.props.region || getScreenRegion(locationDetails)

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={region}
          customMapStyle={mapStyle}>
          {locationDetails &&
            locationDetails.map((locationDetail, index) => (
              <Marker key={index} coordinate={locationDetail.latlng}>
                {(locationDetail.state === 'CURRENT_CITY' || locationDetail.state === 'VISITED') &&
                  <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name='map-marker' size={18} color={colors.purple} />
                    <Text style={{}}>{locationDetail.name}</Text>
                  </View>
                }
                {locationDetail.state === 'AFFORDABLE' &&
                  <View style={{ flex: 1, flexDirectoin: 'column', justifyContent: 'center' }}>
                    <Text style={{ color: colors.purple }}>{'NEW'}</Text>
                    <Text>{locationDetail.name}</Text>
                    <View style={[styles.startCountContainer]}>
                      <Text style={styles.starCount}>
                        {locationDetail.starNeed}
                      </Text>
                      <Icon name="star" size={18} color={colors.purple} />
                    </View>
                  </View>
                }
                {locationDetail.state === 'NOT_AFFORDABLE' &&
                  <View style={{ flex: 1, flexDirectoin: 'column', justifyContent: 'center' }}>
                    <Text style={{ color: 'rgba(0, 0, 0, 0.4)' }}>{locationDetail.name}</Text>
                    <View style={[styles.startCountContainer]}>
                      <Text style={[styles.starCount, { color: 'rgba(137, 71, 210, 0.4)' }]}>
                        {locationDetail.starNeed}
                      </Text>
                      <Icon name="star" size={18} color='rgba(137, 71, 210, 0.4)' />
                    </View>
                  </View>
                }
              </Marker>
            ))
          }
        </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  startCountContainer: {
    width: 108,
    height: 23,
    borderRadius: 11.5,
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: 'center'
  },
  starCount: {
    fontSize: 16,
    fontWeight: '300',
    fontStyle: 'normal',
    color: colors.purple,
  },
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

export default JourneyMap