import axios from "axios";

export const API_URL = "http://localhost:8000/api/v1";


class AppServices {
    login(body) {
        return axios.post(`${API_URL}/auth/` + "login", body);
    }

    signup(body) {
        return axios.post(`${API_URL}/auth/register/as-standard/`, body);
    }
    getAuthToken() {
        const auth_token = localStorage.getItem('auth_token');
        return auth_token ? JSON.parse(auth_token) : null;
    }
    getProducts = async () => {
        return axios.get(API_URL + '/products', {
            headers: {
                'Authorization': await getAuthToken()
            }
        })
    }



}


export const getAuthToken = async () => {
    const auth_token = localStorage.getItem('auth_token');
    return auth_token ? JSON.parse(auth_token) : null;
}

export const config = {
    headers: {
      Authorization: await getAuthToken(),
    },
};

export default new AppServices();