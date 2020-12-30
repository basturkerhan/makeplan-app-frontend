import CONSTANTS from "./index"

export const login = (user)=>{
    return {
        type: CONSTANTS.USER_LOGIN,
        payload: user
    }
}