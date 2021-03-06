import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {setCredentials, logOut} from '../auth/authSlice.js'

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API || "http://localhost:3001/api",
    credentials: 'include',
    prepareHeaders: (Headers, {getState}) =>{
        const token = getState().auth.token
        if(token) {
            Headers.set("authorization", `Bearer ${token}`)
        }
        return Headers
    }
})

const baseQueryWithReauth = async (args,api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    console.log("result baseQueryWithReauth: ")
    console.log(result)
    if(result?.error?.originalStatus === 403){
        console.log('sending refresh token')
        //send refresh token to get new acces token
        const refreshResult = await baseQuery('/auth/refresh-token', api, extraOptions)
        console.log("refreshResult: ")
        console.log(refreshResult)
        if(refreshResult?.data){
            const user = api.getState().auth.user
            // store the new toekn
            api.dispatch(setCredentials({...refreshResult.data, user}))
            // retry the original query with new acces token
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})
