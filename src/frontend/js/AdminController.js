const api = new API();

window.addEventListener('load', () => {
    let admin = new Admin();
    admin.init();
});

class Admin{
    constructor(){
        this.loginComponent = new Login(api.isAuthenticated);
    }
    
    async init(){
        document.getElementById("header").append(this.loginComponent.getView());
        
        let form = document.getElementById("addProduct");
        form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            let form = document.getElementById("addProduct");
            let formData = new FormData(form);
            for(let p of formData) {
                console.log(p);
            }
            api.addProduct(formData);
        });
        
        // Check with the api if there is already al auth token.
        if(api.isAuthenticated) {
            // Get the logged in user
            try{
                let userData = await api.getUser()
                let userElements = document.getElementsByClassName('current-user');
                // If succeded render name at all the current-user locations by class
                for (let element of userElements) {
                    element.innerText = userData.name;
                }
            }catch(err){
                api.logoutUser();
                console.log(err)
                window.location = '/';
            }
        }
    }
}
