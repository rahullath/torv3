import axios from 'axios';

export default axios.create({
    baseURL: `http://192.168.113.216:5000/api/`,
    withCredentials: true
});
