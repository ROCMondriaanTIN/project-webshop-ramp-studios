window.addEventListener('load', () => {
    let index = new Index();
    index.init();
});

class Index {
    constructor() {
        this.loginComponent = new Login(api.isAuthenticated);
    }

    async init() {
        //footer
        let footer = new Footer();
        document.querySelector("footer").append(footer.getView());

        //aside
        if (!(window.location.pathname == "/register.html")) {
            let aside = new Aside();
            document.querySelector("main").append(aside.getView());
        }

        //login
        document.getElementById("login").append(this.loginComponent.getView());
        //document.querySelector("main").append(this.productsComponent.getView());

        // Check with the api if there is already al auth token.
        if (api.isAuthenticated) {
            // Get the logged in user
            try {
                let userData = await api.getUser()
                let userElements = document.getElementsByClassName('current-user');
                // If succeded render name at all the current-user locations by class
                for (let element of userElements) {
                    element.innerText = userData.name;
                }
            }
            catch (err) {
                api.logoutUser();
                console.log(err)
                window.location = '/';
            }
        }
    }
}
