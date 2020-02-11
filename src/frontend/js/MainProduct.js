window.addEventListener('onload', () => {
    main();
});

window.onload = main;

let api;
let loginComponent;

function main() {
    api = new API();

    // Render the login header
    loginComponent = new Login(api.isAuthenticated);
    document.getElementById("header").append(loginComponent.render());

    let form = document.getElementById("addProduct");
    form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        let form = document.getElementById("addProduct");
        let formData = new FormData(form);
        for(let p of formData) {
            console.log(p);
        }
        api.addProduct(formData);
    }, true);

    // Check with the api if there is already al auth token.
    if(api.isAuthenticated) {
        // Get the logged in user
        api.getUser()
            // If succeded render name at all the current-user locations by class
            .then((userData) => {
                let userElements = document.getElementsByClassName('current-user');
                for (let element of userElements) {
                    element.innerText = userData.name;
                }
            })
            // Log the error if you can't connect to api
            .catch((err) => {
                console.log(err)
                api.logoutUser();
                window.location = '/';
            });
    }
}