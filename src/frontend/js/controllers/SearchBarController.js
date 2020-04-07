window.addEventListener('load', () => {
    let searchbarcontroller = new SearchBarController();
    searchbarcontroller.init();
});

class SearchBarController {
    constructor() {
        this.loginComponent = new Login(api.isAuthenticated);
    }

    async init() {
        //nav
        let nav = new Nav();
        document.querySelector("body").prepend(nav.getView());

        //search bar 
        let searchbar = document.getElementById('search');
        //hou oude search terms
        function getParameterByName(name, split) {
            const url = window.location.href;
            name = name.replace(/[\[\]]/g, '\\$&');
            const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            if (!split) return decodeURIComponent(results[2].replace(/\+/g, ' '));
            else return decodeURIComponent(results[2])
        }
        const currentSearch = getParameterByName('q');
        searchbar.children.search.value = currentSearch;
        //hou oude search categories
        let currentCategories = getParameterByName('c', true)
        if (currentCategories) {
            currentCategories = currentCategories.split("+");
            const categories = document.getElementById('search-categories').childNodes;
            categories.forEach((c) => {
                if (c.childNodes && c.childNodes[0]) {
                    if (currentCategories.includes(c.innerText.trim().toLowerCase())) {
                        c.childNodes[1].checked = true;
                    }
                }
            })
        }
        //search functionality
        searchbar.addEventListener('submit', event => {
            event.preventDefault()
            const searchterm = searchbar.children.search.value;
            const categories = (document.getElementById('search-categories')).children
            let enabledcats = [];
            for (let cat of categories) {
                if (cat.control.checked) {
                    enabledcats.push(cat.children[1].text.toLowerCase());
                }
            }
            if (searchterm && enabledcats && enabledcats[0]) window.location.href = `productlist.html?q=${searchterm}&c=${enabledcats.join("+")}`;
            else if (searchterm) window.location.href = `productlist.html?q=${searchterm}`;
            else if (enabledcats && enabledcats[0]) window.location.href = `productlist.html?c=${enabledcats.join("+")}`;
            else window.location.href = `productlist.html`; 
        });
    }
}
