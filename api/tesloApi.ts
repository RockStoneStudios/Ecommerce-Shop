import axios from 'axios';

const tesloUrl = axios.create({
    baseURL: '/api'
});



export default tesloUrl;