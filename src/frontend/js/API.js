class API {

    constructor() {
        this.url = 'http://localhost:5000/api'
        this.token;
        this.isAuthenticated = false;
        this.headers = {
            'Content-Type': 'application/json'
        }
        if (this.hasToken()) {
            this.setAuthToken(localStorage.getItem('token'));
        }
    }

    hasToken() {
        return localStorage.getItem('token') !== undefined || localStorage.getItem('token') !== '';
    }

    setAuthToken(token) {
        if (token) {
            this.token = token;
            this.headers["x-auth-token"] = this.token;
            this.isAuthenticated = true;
            localStorage.setItem('token', token);
        }
        else {
            this.token = null;
            delete this.headers["x-auth-token"];
            this.isAuthenticated = false;
            localStorage.removeItem('token');
        }
    }

    async createUser(name, email, password) {
        let response = await this.postData(this.url + '/users', {
            name,
            email,
            password
        });
        if (response.ok) {
            let data = await response.json();
            console.log("Logged in");
            this.setAuthToken(data.token);
            return data;
        }
        else {
            throw `Error: ${response.status} ${response.statusText}`;
        }


    }

    async loginUser(email, password) {
        let response = await this.postData(this.url + '/auth', {
            email,
            password
        });
        if (response.ok) {
            let data = await response.json();
            console.log("Logged in");
            this.setAuthToken(data.token);
            return data;
        }
        else {
            throw `Error: ${response.status} ${response.statusText}`;
        }
    }

    logoutUser() {
        this.setAuthToken(null);
    }

    async getUser() {
        let response = await this.getData(this.url + '/auth');
        if (response.ok) {
            let data = await response.json();
            return data;
        }
        else {
            throw `Error: ${response.status} ${response.statusText}`;
        }
    }

    async addPost(text) {
        let response = await this.postData(this.url + '/posts', { text });
        if (response.ok) {
            let data = await response.json();
            return data;
        }
        else {
            throw `Error: ${response.status} ${response.statusText}`;
        }
    }

    async getPosts() {
        let response = await this.getData(this.url + '/posts');
        if (response.ok) {
            let data = await response.json();
            return data;
        }
        else {
            throw `Error: ${response.status} ${response.statusText}`;
        }
    }

    postData(url = '', data = {}) {
        // Default options are marked with *
        return fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: this.headers,
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
    }

    getData(url = '', data = {}) {
        // Default options are marked with *
        return fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: this.headers,
        });
    }

    putData(url = '', data = {}) {
        // Default options are marked with *
        return fetch(url, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: this.headers,
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
    }

    deleteData(url = '', data = {}) {
        // Default options are marked with *
        return fetch(url, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: this.headers,
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
    }
}