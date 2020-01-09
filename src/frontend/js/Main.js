window.onload = main;

let api;
let loginComponent;

function main() {
    api = new API();
    updatePosts();
    if(api.isAuthenticated) {
        api.getUser()
            .then((userData) => {
                let userElements = document.getElementsByClassName('current-user');
                console.log(userElements);
                for (let element of userElements) {
                    console.log(element);
                    console.log(userData);
                    console.log(userData.name);
                    element.innerText = userData.name;
                }
                loginComponent = new Login(api.isAuthenticated);
                document.getElementById("header").append(loginComponent.render());
            })
            .catch((err) => {
                console.log(err)
            });
    }
    else {
        loginComponent = new Login(api.isAuthenticated);
        document.getElementById("header").append(loginComponent.render());
    }
    
    let form = document.getElementById("addPost");
    form.addEventListener("submit", function(evt) {
        evt.preventDefault();
        let textarea = document.getElementById('postText');
        if(api.isAuthenticated && textarea.value !== '') {
            api.addPost(textarea.value).then(() => {
                updatePosts();
            });
        }
    }, true);
}

function updatePosts() {
    let element = document.getElementById('dynamicPosts');
    api.getPosts().then((data) => {
        element.innerHTML = '';
        for (const post of data) {
            let postComponent = new Post(post.name, post.text, post.date, post.avatar);
            element.append(postComponent.render());
        }
    })
    .catch((err) => {
        console.log(err);
    });
}