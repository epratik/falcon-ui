import axios from 'axios'
import config from '../config/config.json'

export async function getLists() {
    const resp = await axios.get(config.baseUrl + config.getLists);

    return resp.data;
}

export async function postList(data) {
    const resp = await axios.post(config.baseUrl + config.postList, data
    );

    return resp.data;
}
