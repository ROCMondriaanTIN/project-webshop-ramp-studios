class Login {

    constructor(isLoggedIn) {
        this.showLogin = !isLoggedIn;
        this.login = document.createElement('form');
        this.login.id = "login";
        this.login.name = "myLogin";
        this.login.innerHTML = `
            <input type="text" name="email" id="email" value="">
            <input type="password" name="password" id="password" value="">
            <input class="button" type="submit" value="Login">
        `;
        this.logout = document.createElement('span');
        this.logout.id = "log-out";
        // this.logout.setAttribute('class', 'material');
        this.logout.innerText = "Log out";

        this.login.addEventListener('submit', (e) => this.onLogin(e));
        this.logout.addEventListener('click', (e) => this.onLogout(e));
    }

    onLogin(e) {
        e.preventDefault();
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        console.log(email),
        console.log(password),
        api.loginUser(email, password)
            .then((response) => {
                window.location = '/';
            })
            .catch((err) => {
                console.log(err);
                this.login.setAttribute("class", "error");
            });
    }

    onLogout(e) {
        api.logoutUser();
        window.location = '/';
    }

    render() {
        return this.showLogin ? this.login : this.logout;
    }
}