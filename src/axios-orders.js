import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-app-36a5c-default-rtdb.firebaseio.com/'
})

export default instance;