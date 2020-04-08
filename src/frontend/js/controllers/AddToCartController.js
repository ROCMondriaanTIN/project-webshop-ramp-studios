window.addEventListener('load', () => {
    let addToCart = new AddToCart();
    addToCart.init();
});

class AddToCart {
    constructor() {
        this.loginComponent = new Login(api.isAuthenticated);
    }
    init(){
        this.loadproductsincart();
        this.checkpage();
    }

    //Load the products all once
    async loadproductsincart() {
        if (api.hasToken()) {
            let cart = await api.getCart(localStorage.getItem('token'));

            if (cart == !("You don't have anything in your cart yet")) { //Items nodig in cart voordat je kan laden hoevel item je erin heb
                for (let i = 0; i < cart.products.length; i++) {
                    productsincartrefresh += cart.products[i].amount
                }
            }
        }
    }

    async checkpage() {
        let cart = await api.getCart(localStorage.getItem('token'));
        let productsincartrefresh = 0;

        for(let i = 0; i < cart.products.length; i++){
            productsincartrefresh += cart.products[i].amount
        }

        const Searchbar = window.location.search;
        const ProductIDSearch = Searchbar.replace("?product=a", "");

        if (window.location.pathname == "/" || window.location.pathname == "/index.html" || window.location.pathname == '/productlist.html') {
            if (api.hasToken()) {
                setTimeout(() => {
                    let product = document.getElementsByClassName("product-add-to-ww")
                    for (let i = 0; i < product.length; i++) {
                        product[i].addEventListener("click", async (evt) => {
                            evt.preventDefault();
                            try {
                                await api.addToCart(product[i].name.slice(1), localStorage.getItem('token'));
                                //addproduct()
                                productsincartrefresh += 1;
                                setTimeout(() => { //Changes the number next to cart +1 when clicking once
                                    let cartitems = document.getElementById("cart-items")
                                    cartitems.innerHTML = `
                                        <i id="cart-items" href='/checkout.html'>${productsincartrefresh} items<i>
                                    `
                                }, 60);
                            }
                            catch (err) {
                                console.error(err);
                            }
                        });
                    }
                }, 1000);
            }
        } else {
            if (api.hasToken()) {
                let Button = document.getElementById("product-add-to-ww");
                Button.addEventListener("click", async (evt) => {
                    evt.preventDefault();
                    try {
                        await api.addToCart(ProductIDSearch, token);
                        
                        productsincartrefresh += 1;
                        //addproduct()
                        setTimeout(() => { //Changes the number next to cart +1 when clicking once
                            let cartitems = document.getElementById("cart-items")
                            cartitems.innerHTML = `
                                <i id="cart-items" href='/checkout.html'>${productsincartrefresh} items<i>
                            `
                        }, 60);
                    }
                    catch (err) {
                        console.error(err);
                    }
                });
            }
        }
    }
}
