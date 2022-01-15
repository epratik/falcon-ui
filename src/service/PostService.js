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

export async function getPostsForAList(listId) {
    // console.log(listId)
    const resp = await axios.get(config.baseUrl + config.getPostsForAList.replace('id', listId.toString()), {
        headers: await getToken()
    });

    return resp.data;
}

export async function likePost(postId) {
    const resp = await axios.patch(config.baseUrl + config.patchPosts, {
        patchType: "Like",
        requestBody: {
            postId: Number(postId)
        }
    }, { headers: await getToken() });
}

export async function unlikePost(postId) {
    const resp = await axios.patch(config.baseUrl + config.patchPosts, {
        patchType: "Unlike",
        requestBody: {
            postId: Number(postId)
        }
    }, { headers: await getToken() });
}


export async function deactivatePost(postId) {
    console.log('axios called')
    const resp = await axios.patch(config.baseUrl + config.patchPosts, {
        patchType: "Deactivate",
        requestBody: {
            postId: Number(postId)
        }
    }, { headers: await getToken() });
    console.log('out of axios')
}

export async function postAUrl(postRecord) {
    const resp = await axios.post(config.baseUrl + config.createPost, postRecord,
        { headers: await getToken() }
    );

    return resp.status;
}