import axios from 'axios'
import {BASE_URL} from './apiPath'

const axiosInstance= axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers:{
        'Content-Type' :"application/json",
        Accept: "application/json"
    }
})


axiosInstance.interceptors.request.use(
    (config)=>{
        const accessToken = localStorage.getItem('token')
        if(accessToken){
            config.headers.Authorization= `Bearer ${accessToken}`
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error)
    }
)


axiosInstance.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error)=>{
        if(error.response){
        if(error.response.status===401 && !error.config.url.includes('login')){
            localStorage.removeItem('token')
            if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
                window.location.href='/login'
            }
        }
        else if(error.response.status===500){
            console.log('Server error');
        }
    }
        else if(error.code=== "ECONNABORTED"){
            console.log('Request timeout') ;
        }
        return Promise.reject(error)
    }
)

export default axiosInstance