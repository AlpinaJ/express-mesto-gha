
class Auth {
    constructor(url, headers) {
        this._url = url;
        this._headers = headers;
    }

//     _handleResponse(res) {
//         if (res.ok) {
//             return res.json();
//         } else {
//             return Promise.reject(`Ошибка: ${res.status}`);
//         }
//     }
//
//     register(email, password) {
//         return fetch(`${this._url}signup`, {
//             method: 'POST',
//             headers: this._headers,
//             body: JSON.stringify({email, password})
//         }).then((res) => {
//             return res.json();
//         }).catch((err) => console.log(err));
//     }
//
//     authorize(email, password) {
//         console.log("authorize", this._url, email, password, this._headers);
//         return fetch(`${this._url}signin`, {
//             method: 'POST',
//             headers: this._headers,
//             body: JSON.stringify({email, password}),
//             credentials: 'include',
//         }).then((res) => {
//             return res.json();
//         }).catch((err) => console.log(err));
//     }
//
//     getMain(token) {
//         console.log("getMain");
//         return fetch(`${this._url}users/me`, {
//             method: 'Get',
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${token}`
//             }
//         }).then((res) => {
//             console.log("ok", res.json())
//             return res.json();
//         }).catch((err) => console.log("not ok", err));
//     }
 }

const auth = new Auth("https://api.mesto-julia.nomoredomains.xyz/", {"Content-Type": "application/json"});
export default auth;