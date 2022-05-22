class Api {
    constructor(url, headers) {
        this._url = url;
        this._headers = headers;
    }

    _handleResponse(res) {
        if (!res.ok) {
            return Promise.reject(`Error while fetching data: ${res.status}`);
        }
        return res.json();
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
            credentials: 'include',
        }).then((res) =>{return this._handleResponse(res)});
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
            credentials: 'include',
        }).then((res) => this._handleResponse(res));
    }

    patchUserInfo(input) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: input.name,
                about: input.about
            }),
            credentials: 'include',
        }).then((res) => this._handleResponse(res));
    }

    setUserAvatar(input) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({avatar: input}),
            credentials: 'include',
        })
            .then((res) => this._handleResponse(res));
    }

    postCard(input) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: input.place,
                link: input.link
            }),
            credentials: 'include',
        }).then((res) => this._handleResponse(res));
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
            credentials: 'include',
        })
            .then((res) => this._handleResponse(res));
    }

    changeLikeCardStatus(cardId, isLiked) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: isLiked ? 'PUT' : "DELETE",
            headers: this._headers,
            credentials: 'include',
        })
            .then((res) => this._handleResponse(res));
    }

    // putLike(cardId) {
    //     return fetch(`${this._url}/cards/${cardId}/likes`, {
    //         method: 'PUT',
    //         headers: this._headers
    //     })
    //         .then((res) => this._handleResponse(res));
    // }
    //
    // deleteLike(cardId) {
    //     return fetch(`${this._url}/cards/${cardId}/likes`, {
    //         method: 'DELETE',
    //         headers: this._headers
    //     })
    //         .then((res) => this._handleResponse(res));
    // }

    changeAvatar(avatar) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(
                {avatar: avatar}),
            credentials: 'include',
        })
            .then((res) => this._handleResponse(res));
    }

    signup({email, password}) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({email, password}),
            credentials: 'include',
        })
            .then((res) => this._handleResponse(res));
    }

    signin({email, password}) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({email, password}),
            credentials: 'include',
        })
            .then((res) => this._handleResponse(res));
    }

    signout() {
        return fetch(`${this._url}/signout`, {
            method: 'POST',
            // credentials: 'include',
        });
    }


}

const api = new Api('https://api.mesto-julia.nomoredomains.xyz',
    {
        // authorization: 'ed992258-c9b2-4aaa-a5d2-85fccb4ac919',
        'Content-Type': 'application/json'
    });


export default api;