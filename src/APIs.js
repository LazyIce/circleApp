import { APIName, endpoints, now } from './Constants'
import { API } from 'aws-amplify'

// return all the postcards achieved by the current user
export const getAchievementList = async () => {
    try {
        let ret = [];
        // get all the achievements
        let response = await API.get(APIName, endpoints.ACHIEVEMENT_GET_LIST);

        // get the postcards related to each achievement
        for (const achievement of response) {
            let postcard = await getPostcard(achievement.postcardId);

            let card = JSON.parse(JSON.stringify(postcard));
            card['achieveTime'] = achievement.achieveTime;
            ret.push(card);
        }

        return ret;
    } catch (e) {
        console.log(e);
    }
}

// get the info of one post card
export const getPostcard = async(postcardId) => {
    try {
        let postcard = API.get(APIName, endpoints.POSTCARD_GET_SINGLE, {
            queryStringParameters: {
                postcardId: postcardId
            }
        });

        return postcard;
    } catch (e) {
        console.log(e);
        throw 'getPostcard error!'
    }
}

// get all postcards for one city
export const getPostcardList = async (cityId) => {
    try {
        let postcards = await API.get(APIName, endpoints.POSTCARD_GET_LIST, {
            queryStringParameters: {
                cityId: cityId
            }
        });

        return postcards;
    } catch (e) {
        console.log(e);
    }
}

// return the info of one city
// cityId: uuid
export const getCity = async(cityId) => {
    try {
        // get the city info
        let response = await API.get(APIName, endpoints.CITY_GET_SINGLE, {
            queryStringParameters: {
                cityId: cityId
            }
        });

        return response;
    } catch (e) {
        console.log(e);
    }
}

// return cities visited by the current user
export const getVisitedCities = async() => {
    try {
        let visitedCities = await API.get(APIName, endpoints.VISITEDCITY_GET_LIST);

        return visitedCities;
    } catch (e) {
        console.log(e)
        throw 'getVisitedCities error!'
    }
}

// get all the cities state: locked/visited/unlockable
export const getCityStates = async() => {
    try {
        // get all the cities
        let cities = await API.get(APIName, endpoints.CITY_GET_LIST);
        let userInfo = await getCurrentUserInfo();
        let visitedCities = await getVisitedCities();
        let visitedCityIds = visitedCities.map(city => city.cityId);

        let ret =  [];
        for (const city of cities) {
            let newCity = JSON.parse(JSON.stringify(city));

            // whether the the city is the current visiting city
            if (newCity.cityId === userInfo.curCityId) {
                newCity['state'] = 'CURRENT_CITY';
            } else if (visitedCityIds.includes(newCity.cityId)) {
                newCity['state'] = 'VISITED';
            } else if (newCity.unlockStar <= userInfo.curStar) {
                newCity['state'] = 'AFFORDABLE';
            } else {
                newCity['state'] = 'NOT_AFFORDABLE';
            }
            newCity['latlng'] = {'latitude': newCity.latitude, 'longitude': newCity.longitude}

            ret.push(newCity);
        }

        return ret;
    } catch (e) {
        console.log(e);
        throw 'getCityStates error!';
    }
}

// unlock the city
export const unlockCity = async(cityId) => {
    try {
        // get the current user info
        let userInfo = await getCurrentUserInfo();
        let city = await getCity(cityId);

        // check whether the star count is valid
        if (userInfo.curStar < city.unlockStar) {
            throw 'star is not enough to unlock the city!';
        }

        var body = {cityId: cityId, cityTravelTime: now()};
        await API.post(APIName, endpoints.VISITEDCITY_POST, {
            body: body
        });

        // travel to the new city by default
        userInfo['curStar'] -= city.unlockStar;
        userInfo['curCityId'] = cityId;
        await updateUserInfo(userInfo);
    } catch (e) {
        console.log(e);
        throw 'unlockCity error1'
    }
}

// the current user will travel to the city specified by the cityId
export const travelToCity = async(cityId) => {
    try {
        // get the current user info
        let userInfo = await getCurrentUserInfo();
        let visitedCities = await getVisitedCities();
        let visitedCityIds = visitedCities.map(city => city.cityId);

        // check whether the star count is valid
        if (!visitedCities.includes(cityId)) {
            throw 'The specified city is not visited!';
        }

        userInfo['curCityId'] = cityId;
        await updateUserInfo(userInfo);
    } catch (e) {
        console.log(e);
        throw 'travelToCity error!';
    }
}

// get statistics data for the current user
// TODO: add different period supports
export const getStatistics = async(period) => {
    let chartData = [10, 20, 10, 20, 30, 15, 20, 10, 20, 10, 20, 30, 15, 20, 10, 20, 10, 20, 30, 15, 20, 10, 20, 10, 20, 30, 15, 20, 10, 5]

    return {
        data: chartData,
        titles: [{ x: 0, text: '1' }, { x: 10, text: '10' }, { x: 20, text: '20' }],
        verticalDividers: [0, 10, 20, 30],
    };
}

export const updateUserInfo = async(userInfo) => {
    try {
        let response = await API.post(APIName, endpoints.INFO_POST, {
            body: userInfo
        });

        return response;
    } catch (e) {
        console.log(e);
        throw 'updateUserInfo error!';
    }
}

// return:
export const getUserInfo = async(userId) => {
    try {
        // get the user info specified by the userId
        let response = await API.get(APIName, endpoints.INFO_GET_SINGLE, {
            queryStringParameters: {
                userId: userId
            }
        });

        return response;
    } catch (e) {
        console.log(e);
        throw 'getUserInfo error!';
    }
}

export const getCurrentUserInfo = async () => {
    try {
        // get the current user info
        let response = await API.get(APIName, endpoints.INFO_GET_SINGLE);

        return response;
    } catch (e) {
        console.log(e);
    }
}

// add the seconds of timer to the current user
export const addTravelTime = async(seconds) => {
    try {
        let userInfo = await getCurrentUserInfo();

        // update some fields
        userInfo['curStar'] += seconds;
        userInfo['totalStar'] += seconds;
        userInfo['totalTime'] += seconds;

        let response = await updateUserInfo(userInfo);
        return response;
    } catch (e) {
        console.log(e);
    }
}

// search users by the userName
export const searchUser = async(userName) => {

}

// request adding one friend
export const requestFriend = async(friendUserId) => {

}

// add one friend
export const addFriend = async(friendUserId) => {
    try {

    } catch (e) {
        console.log(e);
        throw 'addFriend error!'
    }
}

// get all friends of the current user
export const getFriends = async() => {
    try {
        let ret = [];

        // get all the friends

    } catch (e) {
        console.log(e);
        throw 'getFriends error!'
    }
}
