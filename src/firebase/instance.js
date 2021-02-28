import axios from 'axios';

export default axios.create({
    baseURL: "https://trans-ae8e2.firebaseio.com/"
})