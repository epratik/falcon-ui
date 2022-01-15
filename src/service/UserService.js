import axios from 'axios'
import config from '../config/config.json'
import { Auth } from 'aws-amplify';

async function getToken() {
    const cognitoUser = await Auth.currentSession();
    const jwtToken = cognitoUser.getIdToken().getJwtToken();
    const reqHeaders = {
        'authorization': jwtToken
    };
    return reqHeaders;
}

export async function follow(userId) {
    const resp = await axios.patch(config.baseUrl + config.patchUsers, {
        patchType: "Follow",
        requestBody: {
            userToFollowUnfollow: Number(userId)
        }
    }, { headers: await getToken() });
}
export async function unfollow(userId) {
    const resp = await axios.patch(config.baseUrl + config.patchUsers, {
        patchType: "Unfollow",
        requestBody: {
            userToFollowUnfollow: Number(userId)
        }
    }, { headers: await getToken() });
}
