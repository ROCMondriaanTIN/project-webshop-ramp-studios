window.onload = main;

let api;
let loginComponent;

function main() {
    api = new API();
    // update the posts
    updatePosts();

    // Render the login header
    loginComponent = new Login(api.isAuthenticated);
    document.getElementById("header").append(loginComponent.render());

    let form = document.getElementById("addPost");
    form.addEventListener("submit", function(evt) {
        evt.preventDefault();
        let textarea = document.getElementById('postText');
        if(api.isAuthenticated && textarea.value !== '') {
            api.addPost(textarea.value)
                .then(() => {
                    updatePosts();
                })
                .catch((err) => {
                    console.log(err);
                });
        }
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
    else {
        document.getElementById('postButton').classList.add('disabled');
        document.getElementById('postButton').setAttribute('disabled', 'disabled');
    }
    
    
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