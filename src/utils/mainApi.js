class mainApi {
    constructor ({baseUrl, authorization}){
        this._baseUrl = baseUrl;
        this._authorization = authorization
    }

    _checkResponse(res){
        if(res.ok){
            return res.json();
        }
        return Promise.reject(res.status);
    }

    getMe(){
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            credentials: 'include',
            headers:{
                authorization: `Bearer ${this._authorization}`,
                "Content-Type": "application/json",
            }
        })
        .then(this._checkResponse);
    }

    editProfile(patchInquiry) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                authorization: `Bearer ${this._authorization}`,
                'Content-Type': 'application/json'
            },
            body: patchInquiry
        })
        .then(this._checkResponse); 
    }

    getMovies(){
        return fetch(`${this._baseUrl}/movies`, {
            method: 'GET',
            credentials: 'include',
            headers:{
                authorization: `Bearer ${this._authorization}`,
                "Content-Type": "application/json",
            }
        })
        .then(this._checkResponse);
    }

    addMovie(postInquiry) {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                authorization: `Bearer ${this._authorization}`,
                'Content-Type': 'application/json'
            },
            body: postInquiry
        })
        .then(this._checkResponse);
    }

    deleteMovie(delInquiry){
        return fetch(`${this._baseUrl}/movies/${delInquiry}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                authorization: `Bearer ${this._authorization}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(this._checkResponse);
    }

    registration(postInquiry){
        return fetch(`${this._baseUrl}/signup`, {
                method: 'POST',
                credentials: 'include',
                headers:{
                    "Content-Type": "application/json"
                },
                body:postInquiry,
            }
        )
        .then(this._checkResponse);
    }

    authorization(postInquiry){
        return fetch(`${this._baseUrl}/signin`, {
                method: 'POST',
                credentials: 'include',
                headers:{
                    "Content-Type": "application/json"
                },
                body:postInquiry,
            }
        )
        .then(this._checkResponse);
    }

    tokenCheck(token){
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            credentials: 'include',
            headers:{
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`
            }
        }
    )
    .then(this._checkResponse);
}

}

export default mainApi;