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

export async function getLists() {
    const resp = await axios.get(config.baseUrl + config.getLists, {
        headers: await getToken()
    });

    return resp.data;
}

export async function postList(listName, description) {
    const resp = await axios.post(config.baseUrl + config.postList,
        {
            name: listName,
            description: description
        },
        { headers: await getToken() }
    );

    return resp.data;
}

export async function updateViews(listId) {
    const resp = await axios.patch(config.baseUrl + config.patchList, {
        patchType: "Views",
        requestBody: {
            listId: Number(listId)
        }
    }, { headers: await getToken() });
}