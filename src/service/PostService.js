import axios from 'axios'
import config from '../config/config.json'

export async function getPosts(offset, tag) {
    const resp = await axios.get(config.baseUrl + config.getPosts, {
        params: {
            offset: offset,
            tag: tag
        }
    });

    return resp.data;
}

export async function likePost(postId) {
    const resp = await axios.patch(config.baseUrl + config.patchPosts, {
        patchType: "Like",
        requestBody: {
            postId: postId
        }
    });
}