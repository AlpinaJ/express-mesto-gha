export const BASE_URL = 'https://auth.nomoreparties.co';

class Auth {
    constructor(url, headers) {
        this._url = url;
        this._headers = headers;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    register(email, password) {
        return fetch(`${this._url}signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({email, password})
        }).then((res) => {
            return res.json();
        }).catch((err) => console.log(err));
    }

    authorize(email, password) {
        return fetch(`${this._url}signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({password, email})
        }).then((res) => {
            return res.json();
        }).then((res)=>{
            localStorage.setItem('token',res.token);
            return res;
        }).catch((err) => console.log(err));
    }

    getMain(token) {
        return fetch(`${this._url}users/me`, {
            method: 'Get',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then((res) => {
            return res.json();
        }).catch((err) => console.log(err));
    }
}

const auth = new Auth("https://auth.nomoreparties.co/", {"Content-Type": "application/json"});
export default auth;