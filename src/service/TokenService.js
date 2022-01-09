import { Auth } from 'aws-amplify';

export async function getTokenAttributes() {
    const { attributes } = await Auth.currentAuthenticatedUser();
    return attributes;
}