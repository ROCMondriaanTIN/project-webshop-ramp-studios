window.addEventListener('load', () => {
    let register = new Register();
    register.init();
});

class Register {
    constructor() {
        this.loginComponent = new Login(api.isAuthenticated);
    }

    async init() {
        let registerpage = new RegisterPage();
        document.querySelector("#register").append(registerpage.getView());

        let formAddUser = document.getElementById("addUser");
        formAddUser.addEventListener("submit", async (evt) => {
            evt.preventDefault();
            let form = document.getElementById("addUser");
            let formData = new FormData(form);
            try {
                const name = document.forms["register"]["name"].value;
                const email = document.forms["register"]["email"].value;
                const password = document.forms["register"]["password"].value;
                try {
                    const response = await api.createUser(name, email, password);
                    if (response.errors && response.errors[0]) {
                        alert(response.errors[0].msg)
                    } else{
                        window.location.href = "/";
                    }
                    //alert(response);
                    return response;
                    } catch (e) {
                    console.log(e);
                }
            }
            catch (err) {
                console.log(err);
                formAddUser.setAttribute("class", "error");
            }
        });
    }
}
