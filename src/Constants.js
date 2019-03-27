export const colors = {
    'black': '#000000',
    'white': '#FFFFFF',
    'lightBlack': 'rgba(0, 0, 0, 0.87)',
    'gray': 'rgba(52, 52, 52, 0.87)',
    'purple': '#A57AD5',
    'green': '#62A04C',
    'charityListBorder': '#A4A4A4',
    'journeyHeader': '#4A4A4A',
    'journeyBackground': '#D8D8D8',
    'journeyButtonBackground': '#CACACA',
    'journeyBackButton': '#717171',
    'starCountContainerBackground': '#5A5A5A',
    'starColor': '#D8D8D8',
    'starTextColor': '#E9E9E9',
    'chartDivider': '#D8D8D8',
    'chartBottomLine': '#A6A6A6',
    'chartBar': '#C5AFDD',
    'chartTitle': '#A6A6A6',
    'subTitle': 'rgba(0, 0, 0, 0.6)',
    'cityButton': '#3F4850',
}

export const keys = {
    'flickr': '1da35bb5f8888aca46cb54dca008a6f6',
}

export const endpoints = {
    'getInfo': '/info/object/:userId'
}

export const objToQueryString = (obj) => {
    const keyValuePairs = [];
    for(const key in obj) {
        keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
    }

    return keyValuePairs.join('&')
}

export const defaultMapRegion = {
    latitude: 37.0902,
    longitude: -95.7129,
    latitudeDelta: 20.0,
    longitudeDelta: 45.0,
}

// given cities return the region in the map to display them
export const getScreenRegion = (markerList) => {
    // find the four bounary indexes
    let left = 180, right = -180, top = -90, bottom = 90
    // if there is no marker, just display the american map
    if (!Array.isArray(markerList) || !markerList.length) {
        return defaultMapRegion
    }

    // boundary of the markers
    markerList.forEach(marker => {
        left = Math.min(left, marker.latlng.longitude)
        right = Math.max(right, marker.latlng.longitude)
        top = Math.max(top, marker.latlng.latitude)
        bottom = Math.min(bottom, marker.latlng.latitude)
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
        latitudeDelta: Math.max((top - bottom) * 1.5, 89),
        longitudeDelta: Math.max((right - left) * 1.5, 179),
    }
}