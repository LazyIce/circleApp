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
    'cityBorder': 'https://api.flickr.com/services/rest/?method=flickr.places.getInfo&',
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