import { APIName, endpoints, now } from './Constants'
import { API, Auth } from 'aws-amplify'

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

        console.log(postcards);
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
        console.log(response)
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

// update the user info in the back end
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

// it is a stupid design; I agree
// but it is for getting the username by userid
export const getUsername = async(userId) => {
    try {
        let user = await API.get(APIName, endpoints.USER_GET_SINGLE, {
            queryStringParameters: {
                userId: userId
            }
        });

<<<<<<< HEAD
=======
        console.log(user);
>>>>>>> e27f32f7bf2a6ed2752eb98a0729dbb8b1a4c66e
        return user;
    } catch (e) {
        console.log(e);
        throw 'getUsername error!'
    }
}

export const getCurrentUserInfo = async () => {
    try {
        // get the current user info
        let response = await API.get(APIName, endpoints.INFO_GET_SINGLE);

        return response;
    } catch (e) {
        console.log(e);
<<<<<<< HEAD
        throw 'getCurrentUserInfo error!'
=======
>>>>>>> e27f32f7bf2a6ed2752eb98a0729dbb8b1a4c66e
    }
}

// add the seconds of timer to the current user
export const addTravelTime = async(seconds) => {
    try {
<<<<<<< HEAD
        seconds *= 1000;
        let userInfo = await getCurrentUserInfo();
        let cityId = userInfo['curCityId'];
        let city = await getCity(cityId);
=======
        let userInfo = await getCurrentUserInfo();
>>>>>>> e27f32f7bf2a6ed2752eb98a0729dbb8b1a4c66e

        // update some fields
        userInfo['curStar'] += seconds;
        userInfo['totalStar'] += seconds;
        userInfo['totalTime'] += seconds;

<<<<<<< HEAD
        // add the charity goal for the city
        city['curCharityGoal'] += seconds;
        await updateUserInfo(userInfo);
        await updateCity(city);

        return;
    } catch (e) {
        console.log(e);
        throw 'addTravelTime error!'
=======
        let response = await updateUserInfo(userInfo);
        return response;
    } catch (e) {
        console.log(e);
>>>>>>> e27f32f7bf2a6ed2752eb98a0729dbb8b1a4c66e
    }
}

// the user will start his journey from this city
export const initUser = async (cityId) => {
    try {
        // add the username and userId mapping
        let userinfo = await Auth.currentUserInfo();
        let userMapping = {username: userinfo.username};
        await API.post(APIName, endpoints.USER_ADD_MAPPING, {
            body: userMapping
        });
        // update the user info
        let userInfo = {};
        userInfo['curStar'] = 0;
        userInfo['totalStar'] = 0;
        userInfo['totalTime'] = 0;
        userInfo['curCityId'] = cityId;
        await updateUserInfo(userInfo);

        // add the visited city
        let visited = {};
        visited['cityId'] = cityId;
        visited['cityTravelTime'] = now();
        await API.post(APIName, endpoints.VISITEDCITY_POST, {
            body: visited
        });
    } catch (e) {
        console.log(e);
        throw 'initUser error!'
    }
}

// search users by the username
export const searchUser = async(username) => {
    try {
        let user = await API.get(APIName, endpoints.USER_SEARCH, {
            queryStringParameters: {
                username: username
            }
        })

        return user;
    } catch (e) {
        console.log(e);
        throw 'searchUser error!'
    }
}

// request adding one friend
export const requestFriend = async(toUserId) => {
    try {
        let currentInfo = await Auth.currentUserInfo();
        let body = {};
        body['userId'] = toUserId;
        body['state'] = 'NEW';
        body['friendUserId'] = currentInfo['id'];
        let response = await API.post(APIName, endpoints.FRIENDREQUEST_POST, {
            body: body
        });
        return;
    } catch (e) {
        console.log(e);
        throw 'requestFriend error!'
    }
}

// get the users who send the friend request to me and their infos
<<<<<<< HEAD
export const getRequestList = async() => {
    try {
        let ret = [];
        let requests = await API.get(APIName, endpoints.FRIENDREQUEST_GET_LIST);

        for (const request of requests) {
            let userInfo = await getUserInfo(request.friendUserId);
            let username = await getUsername(request.friendUserId);
            userInfo['username'] = username['username'];
            userInfo['state'] = request['state'];
=======
export const requestList = async() => {
    try {
        let ret = [];
        let requests = await API.get(APIName, endpoints.FRIENDREQUEST_GET_LIST);
        console.log(requests);

        // get the postcards related to each achievement
        for (const request of requests) {
            console.log(request.friendUserId);
            let userInfo = await getUserInfo(request.friendUserId);
            let username = await getUsername(request.friendUserId);
            userInfo['username'] = username['username'];
>>>>>>> e27f32f7bf2a6ed2752eb98a0729dbb8b1a4c66e

            ret.push(userInfo);
        }

<<<<<<< HEAD
=======
        console.log(ret);
>>>>>>> e27f32f7bf2a6ed2752eb98a0729dbb8b1a4c66e
        return ret;
    } catch (e) {
        console.log(e);
        throw 'requestList error!'
    }
}

<<<<<<< HEAD
export const rejectFriend = async(friendUserId) => {
    try {
        // change the friend request state
        let currentInfo = await Auth.currentUserInfo();
        await API.post(APIName, endpoints.FRIENDREQUEST_POST, {
            body: {
                friendUserId: friendUserId,
                userId: currentInfo['id'],
                state: 'REJECTED'
            }
        });

        return;
    } catch (e) {
        console.log(e);
        throw 'rejectFriend error!'
    }
}

=======
>>>>>>> e27f32f7bf2a6ed2752eb98a0729dbb8b1a4c66e
// add one friend
export const addFriend = async(friendUserId) => {
    try {
        // change the friend request state
        let currentInfo = await Auth.currentUserInfo();
<<<<<<< HEAD
=======
        console.log(currentInfo);
>>>>>>> e27f32f7bf2a6ed2752eb98a0729dbb8b1a4c66e
        await API.post(APIName, endpoints.FRIENDREQUEST_POST, {
            body: {
                friendUserId: friendUserId,
                userId: currentInfo['id'],
                state: 'APPROVED'
            }
        });

        // add the friend to each other
        await API.post(APIName, endpoints.FRIENDSHIP_POST, {
            body: {
                userId: currentInfo['id'],
                friendUserId: friendUserId
            }
        })
        await API.post(APIName, endpoints.FRIENDSHIP_POST, {
            body: {
                friendUserId: currentInfo['id'],
                userId: friendUserId
            }
        })

        return;
    } catch (e) {
        console.log(e);
        throw 'addFriend error!'
    }
}

// get all friends of the current user
export const getFriends = async() => {
    try {
        let ret = [];
        let friends = await API.get(APIName, endpoints.FRIENDSHIP_GET_LIST);

        // get the friend info
        for (const friend of friends) {
            let friendInfo = await getUserInfo(friend.friendUserId);
            let username = await getUsername(friend.friendUserId);
            friendInfo['username'] = username['username'];

            ret.push(friendInfo);
        }

        return ret;
    } catch (e) {
        console.log(e);
        throw 'getFriends error!'
    }
}
