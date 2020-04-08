class RegisterPage extends Component {
    constructor(){
        super("div");
        this.rootElement.id = "register-form";
        this.initView();
    }

    initView(){
        this.rootElement.innerHTML = `
            <form class="register-div" id="addUser" name="register" action="/action_page.php">
            <h2>Register:</h2>
            <!-- Name -->
            <br><label class="register" for="name">Name:</label>
            <input type="text" id="name" name="name">

            <!-- email -->
            <br><label class="register" for="email">E-mail:</label>
            <input type="text" id="email" name="email">

            <!-- password -->
            <br><label class="register" for="password">Password:</label>
            <input type="password" type="text" id="password" name="password">

            <input type="submit" value="Submit" class="button">
        </form> 
        `;
    }  
}