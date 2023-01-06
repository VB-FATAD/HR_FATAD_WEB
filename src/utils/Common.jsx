import axios from 'axios'


export function  storeTokenInLocalStorage(token){
    localStorage.setItem('diskusToken', token)
}

export function getTokenFromLocalStorage(){
    return localStorage.getItem('diskusToken')
}

export async function getAuthenticatedUser(){
    const defaultReturnObject = {
        authenticated: false, user:  null}
    try {
        const token = getTokenFromLocalStorage();
        if (!token){
            return defaultReturnObject
        }
        const response = await axios({
            method: 'GET',
            url: API_ROUTES.GET_USER,
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        const { authenticated = false} = response.data
        return authenticated ? response.data : false
    }
    catch (err){
        console.log('getAuthenticated User, Something Went wrong', err)
        return defaultReturnObject
    }
    }
