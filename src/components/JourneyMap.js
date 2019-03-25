import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import MapView, { Marker, Polygon } from 'react-native-maps'
import { colors, objToQueryString } from './../Constants'
import { defaultMapRegion } from './../Constants'

class JourneyMap extends Component {
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
            region: props.region || this.getScreenRegion(),
            /**
             * location format: {woe_id:, state: , name: , starNeeded: , borderCoordinates: (adding by request),}
             * place_id: the key to fetch the city border from the flickr server
             *
             * state: the state of this city, including
             * 1. CURRENT_CITY: the city you are in
             * 2. VISITED: the city you have visited but are not in
             * 3. AFFORDABLE: the city that is not visited but can be unlocked
             * 4. NOT_AFFORDABLE: not in all categories above
             */
            locations: props.locations || [],
            locationDetails: undefined
        }

    }

    getScreenRegion(locations) {
      // find the four bounary indexes
      let left = 180, right = -180, top = -90, bottom = 90
      // if there is no marker, just display the american map
      if (!Array.isArray(locations) || !locations.length) {
          return defaultMapRegion
      }

      // boundary of the markers
      locations.forEach(marker => {
          left = Math.min(left, marker.latlng.longitude)
          right = Math.max(right, marker.latlng.longitude)
          top = Math.max(top, marker.latlng.latitude)
          bottom = Math.min(bottom, marker.latlng.latitude)
      })

      // if there is one marker, return one bigger region containing the marker
      if (locations.length === 1) {
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

    componentDidMount() {
        // const queryString = objToQueryString({
        //     api_key: keys.flickr,
        //     woe_id: this.state.locations[0].woe_id,
        //     format: 'json',
        // })
        // console.log(endpoints.cityBorder + queryString)

        // return fetch(endpoints.cityBorder + queryString)
        // .then((response) => response.text())
        // .then((response) => {
        //     let jsonPart = response.slice(response.indexOf('(') + 1, response.lastIndexOf(')'))
        //     return JSON.parse(jsonPart)
        // })
        // // after transferring, {woeid: , borderCoordinates: [[{latitude: , longitude: }, ...], ...]}
        // .then((responseJson) => {
        //     console.log(responseJson)
        //     return {
        //         woe_id: responseJson.place.woeid,
        //         borderCoordinates: responseJson.place.shapedata.polylines.polyline.map(polyline => {
        //             return polyline._content.split(' ').map(coordinate => {
        //                 let cd = coordinate.split(',')
        //                 return { latitude: cd[0], longitude: cd[1] }
        //             })
        //         })
        //     }
        // })
        // .then((transferedJson) => {
        const borderCoordinates = "34.02783203125,-84.334999084473 34.056140899658,-84.317749023438 34.024967193604,-84.321998596191 34.019332885742,-84.315330505371 34.014820098877,-84.313842773438 33.999500274658,-84.284332275391 33.998832702637,-84.283500671387 33.990501403809,-84.275833129883 33.98815536499,-84.272911071777 33.983581542969,-84.261940002441 33.970695495605,-84.24715423584 33.964000701904,-84.251998901367 33.935001373291,-84.258331298828 33.933498382568,-84.258331298828 33.931148529053,-84.26131439209 33.925998687744,-84.265335083008 33.924331665039,-84.266502380371 33.892505645752,-84.25715637207 33.889938354492,-84.255523681641 33.866138458252,-84.252258300781 33.848888397217,-84.246940612793 33.832527160645,-84.260116577148 33.809150695801,-84.239601135254 33.80850982666,-84.239471435547 33.810886383057,-84.272483825684 33.803329467773,-84.278656005859 33.776187896729,-84.26806640625 33.76806640625,-84.264274597168 33.765998840332,-84.263496398926 33.752616882324,-84.268447875977 33.747375488281,-84.27725982666 33.736106872559,-84.28678894043 33.732395172119,-84.295211791992 33.722995758057,-84.309234619141 33.712207794189,-84.313362121582 33.711650848389,-84.313858032227 33.686637878418,-84.328994750977 33.671890258789,-84.33113861084 33.666721343994,-84.330444335938 33.68030166626,-84.337707519531 33.671012878418,-84.368423461914 33.647647857666,-84.358261108398 33.666721343994,-84.330444335938 33.63334274292,-84.339462280273 33.626998901367,-84.355331420898 33.620658874512,-84.364356994629 33.627056121826,-84.38117980957 33.602802276611,-84.408798217773 33.592861175537,-84.422348022461 33.591171264648,-84.447784423828 33.588523864746,-84.471076965332 33.571758270264,-84.48087310791 33.589000701904,-84.491333007812 33.591026306152,-84.506492614746 33.601554870605,-84.527717590332 33.633628845215,-84.526748657227 33.66003036499,-84.516876220703 33.6686668396,-84.554000854492 33.684711456299,-84.534561157227 33.707748413086,-84.537406921387 33.707759857178,-84.569190979004 33.711811065674,-84.592147827148 33.720233917236,-84.565330505371 33.743389129639,-84.568206787109 33.770782470703,-84.550788879395 33.785068511963,-84.54224395752 33.789993286133,-84.538375854492 33.81111907959,-84.536338806152 33.812652587891,-84.535736083984 33.816848754883,-84.50749206543 33.850601196289,-84.507965087891 33.859939575195,-84.516960144043 33.864944458008,-84.52530670166 33.889888763428,-84.53328704834 33.890972137451,-84.52082824707 33.895004272461,-84.510803222656 33.899948120117,-84.497047424316 33.909923553467,-84.484001159668 33.914455413818,-84.460998535156 33.925197601318,-84.45384979248 33.93200302124,-84.442077636719 33.940494537354,-84.437278747559 33.94979095459,-84.411758422852 33.953399658203,-84.402030944824 33.959449768066,-84.394485473633 33.961799621582,-84.391822814941 33.968482971191,-84.382873535156 33.98836517334,-84.379524230957 33.999946594238,-84.380661010742 34.001728057861,-84.378944396973 34.012203216553,-84.364349365234 34.013893127441,-84.351821899414 34.02783203125,-84.334999084473"
        .split(' ').map(coordinate => {
            let cd = coordinate.split(',')
            return {latitude: cd[0], longitude: cd[1]}
        })
        const borderCoordinates2 = "31.981182098389,-81.172492980957 31.983909606934,-81.18278503418 31.98868560791,-81.184677124023 31.988973617554,-81.18416595459 31.988731384277,-81.183616638184 31.987693786621,-81.171028137207 31.987367630005,-81.161239624023 31.993045806885,-81.142700195312 32.018993377686,-81.144203186035 32.019855499268,-81.156967163086 32.03776550293,-81.147933959961 32.048240661621,-81.165573120117 32.052169799805,-81.16527557373 32.0588722229,-81.163780212402 32.065002441406,-81.163925170898 32.078277587891,-81.157905578613 32.090553283691,-81.154243469238 32.091045379639,-81.144844055176 32.093425750732,-81.131782531738 32.115657806396,-81.132446289062 32.110931396484,-81.12467956543 32.114566802979,-81.103820800781 32.132595062256,-81.102447509766 32.138408660889,-81.105194091797 32.143058776855,-81.125793457031 32.160499572754,-81.112663269043 32.161842346191,-81.111373901367 32.156539916992,-81.097381591797 32.160007476807,-81.088592529297 32.154792785645,-81.089172363281 32.130004882812,-81.091804504395 32.128406524658,-81.091461181641 32.113395690918,-81.076644897461 32.099445343018,-81.063995361328 32.084175109863,-81.051292419434 32.083610534668,-81.04125213623 32.083736419678,-81.037902832031 32.095371246338,-81.018676757812 32.082683563232,-81.035667419434 32.066917419434,-81.024597167969 32.066082000732,-81.022369384766 32.055881500244,-81.017990112305 32.053371429443,-81.016296386719 32.038883209229,-81.014793395996 32.037185668945,-81.013229370117 32.037292480469,-81.016830444336 32.03536605835,-81.027931213379 32.036602020264,-81.037948608398 32.034782409668,-81.042152404785 32.026123046875,-81.048233032227 32.009166717529,-81.05549621582 32.000652313232,-81.063652038574 31.981906890869,-81.056739807129 31.975536346436,-81.059638977051 31.975536346436,-81.062919616699 31.978593826294,-81.066398620605 31.98148727417,-81.070495605469 31.98703956604,-81.082702636719 31.98450088501,-81.091163635254 31.970439910889,-81.102821350098 31.973051071167,-81.129791259766 31.961265563965,-81.128471374512 31.9375,-81.132667541504 31.940500259399,-81.142379760742 31.936721801758,-81.154205322266 31.941984176636,-81.156158447266 31.959665298462,-81.154327392578 31.967107772827,-81.159973144531 31.979295730591,-81.169952392578 31.981182098389,-81.172492980957"
            .split(' ').map(coordinate => {
            let cd = coordinate.split(',')
            return {latitude: cd[0], longitude: cd[1]}
        })

      let details = [{
        woe_id: '2489314',
        state: 'CURRENT_CITY',
        name: 'Atlanta',
        starNeed: '220',
        latlng: { latitude: '33.763', longitude: '-84.423' },
        borderCoordinates: borderCoordinates
      }, {
        woe_id: '2489314',
        state: 'AFFORDABLE',
        name: 'Savannah',
        starNeed: '220',
        latlng: { latitude: '32.025', longitude: '-81.135' },
        borderCoordinates: borderCoordinates2

      }]
      this.setState({
        locationDetails: details,
        region: this.getScreenRegion(details)
      })
        // }).catch((error) => {
        //     console.log(error)
        // })
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
      return (
        <View style={this.getMapContainerStyle()}>
          <MapView
            style={this.getMapStyle()}
            region={this.state.region}
            customMapStyle={mapStyle}>
            {this.state.locationDetails &&
              this.state.locationDetails.map((locationDetail, index) => (
                <Marker coordinate={locationDetail.latlng}>
                  {locationDetail.state === 'CURRENT_CITY' &&
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
    fontFamily: 'Roboto',
    fontSizes: 16,
    fontWeight: '300',
    fontStyle: 'normal',
    color: colors.purple,
  }
})

export default JourneyMap