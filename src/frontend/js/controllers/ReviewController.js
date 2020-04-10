window.addEventListener('load', () => {
    let review = new Review();
    review.init();
});

class Review {
    constructor() {
        this.loginComponent = new Login(api.isAuthenticated);
    }

    async init() {
        let reviews = new Reviews();
        document.querySelector("#product-reviews").append(reviews.getView());

        if(api.hasToken()){
            let queryString = window.location.search;
            let cleanString = queryString.replace("?product=a","");
            let formAddReview = document.getElementById("addReview");
            formAddReview.addEventListener("submit", async (evt) => {
                evt.preventDefault();
                let form = document.getElementById("addReview");
                let formData = new FormData(form);
                for (let p of formData) {
                    console.log(p);
                }
                try {
                    const rating = document.forms["review"]["rating"].value;
                    const text = document.forms["review"]["text"].value;
                    const response = await api.createReview(text, rating, cleanString, localStorage.getItem('token'));
                    location.reload();
                }
                catch (err) {
                    console.error(err);
                    formAddReview.setAttribute("class", "error");
                }
            });
        }
    }
}
