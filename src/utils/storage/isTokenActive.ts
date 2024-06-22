import {jwtDecode} from "jwt-decode";

export const isTokenActive = (token : string | null) => {
    if(!token) {
        return false;
    }

    try {
        const decodedToken = jwtDecode(token) as any;
        console.log("test token ", decodedToken)
        if(decodedToken.exp) {
            const expirationTime = decodedToken.exp * 1000;
            return expirationTime > Date.now();
        } else {
            return true;
        }
    } catch (error) {
        console.error('Error decoding token: ', error);
        return false;
    }
};