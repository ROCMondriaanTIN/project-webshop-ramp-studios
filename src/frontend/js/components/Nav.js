class Nav extends Component {
    constructor() {
        super("nav");
        this.rootElement.id = "nav";
        this.initView();
    }

    initView() {
        this.rootElement.innerHTML = `
        <div class="dropdown">
            <button class="dropbtn"><i aria-hidden="true" class="fas fa-bars"></i></button>
            <div class="dropdown-content">
                <a href="../">Homepage</a>
                <a href="../productlist.html?c=elektronika">Elektronika</a>
                <a href="../productlist.html?c=elektronika%20kits">Elektronika kits</a>
                <a href="../productlist.html?c=boeken">Boeken</a>
                <a href="../productlist.html?c=robotica">Robotica</a>
                <a href="../productlist.html?c=gereedschap">Gereedschap</a>
    
            </div>
        </div>
        <a href="/"><img src="https://i.imgur.com/MhpCHIj.png"></a>
        <div class="search-container">
            <div class="dropdown">
                <button class="dropbtn"><i aria-hidden="true" class="fas fa-sliders-h"></i></button>
                <div class="dropdown-content" id="search-categories">
                    <label class="container">
                        <input type="checkbox"><a>Elektronika</a>
                        <span class="checkmark"></span>
                    </label>
                    <label class="container">
                        <input type="checkbox"><a>Elektronika Kits</a>
                        <span class="checkmark"></span>
                    </label>
                    <label class="container">
                        <input type="checkbox"><a>Boeken</a>
                        <span class="checkmark"></span>
                    </label>
                    <label class="container">
                        <input type="checkbox"><a>Robotica</a>
                        <span class="checkmark"></span>
                    </label>
                    <label class="container">
                        <input type="checkbox"><a>Gereedschap</a>
                        <span class="checkmark"></span>
                    </label>
                </div>
            </div>
            <form id="search">
                <input type="text" placeholder=" Search.." name="search">
            </form>
        </div>
        <p id="username"></p>
        <div style="flex-grow: 0.5;" id="login"></div>
        <div id="ww"></div>`
    }

    async getusername(){
        if(api.hasToken()){
            let user = await api.getUser(localStorage.getItem('token'));
            let userelement = document.getElementById("username")
            userelement.innerHTML = `Logged in as: ${user.name}`
        }
    }
}
