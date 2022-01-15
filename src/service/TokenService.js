import { Auth } from 'aws-amplify';

export async function getTokenAttributes() {
    const { attributes } = await Auth.currentAuthenticatedUser();
    return attributes;
}

export async function getUserId() {
    const cognitoUser = await Auth.currentSession();
    const decoded = cognitoUser.getIdToken().decodePayload();
    return decoded.userId;
}