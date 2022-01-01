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

export async function getPosts(offset, tag) {
    const resp = await axios.get(config.baseUrl + config.topPosts, {
        params: {
            offset: offset,
            tag: tag
        },
        headers: await getToken()
    });

    return resp.data;
}

export async function likePost(postId) {
    const resp = await axios.patch(config.baseUrl + config.patchPosts, {
        patchType: "Like",
        requestBody: {
            postId: postId
        }
    }, { headers: await getToken() });
}

export async function unlikePost(postId) {
    const resp = await axios.patch(config.baseUrl + config.patchPosts, {
        patchType: "Unlike",
        requestBody: {
            postId: postId
        }
    }, { headers: await getToken() });
}