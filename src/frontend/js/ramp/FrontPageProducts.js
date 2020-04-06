load('top10');
load('last10');
load('newest10');

async function load(soort) {
    let data = await api.getProducts();
    data = data.products;

    let done = 0;
    let carousel;
    if (soort === 'top10') carousel = document.getElementById('aanbevolen-carousel').children;
    else if (soort === 'last10') carousel = document.getElementById('laatstbekeken-carousel').children;
    else if (soort === 'newest10') carousel = document.getElementById('laatsttoegevoegd-carousel').children;
    else return;
    for (let element in data) {
        //getting item and section
        const item = data[element]
        let ratings = item.ratings || 0;
        let stars = item.rating || 3;

        const section = carousel[done]
        //making image
        const image = section.appendChild(document.createElement('img'))
        image.src = item.images[0] || `../../img/productplaceholder.jpg`;
        //making div for text
        const div = section.appendChild(document.createElement('div'))
        //making name
        const name = div.appendChild(document.createElement('a'))
        name.setAttribute('href', `/product.html?product=${item.name}`)
        name.innerHTML = item.name;
        //making description
        const desc = div.appendChild(document.createElement('span'))
        if (item.description.length >= (soort === 'last10' ? 65 : 105)) {
            desc.innerHTML = item.description.slice(0, (soort === 'last10' ? 65 : 105)) + '... '
            const leesmeer = desc.appendChild(document.createElement('a'));
            leesmeer.innerHTML = 'Lees meer'
            leesmeer.setAttribute("href", `/product.html?product=${item.name}`)
        } else {
            desc.innerHTML = item.description;
        }
        //making price
        const price = div.appendChild(document.createElement('span'))
        price.innerHTML = '€' + item.price;
        //making review
        const rating = div.appendChild(document.createElement('div'))
        //adding stars inside the rating
        let i = 1;
        while (i <= 5) {
            const star = rating.appendChild(document.createElement('span'))
            star.innerHTML = '⋆'
            if (stars >= i) star.style.color = '#ffe100';
            else star.style.color = '#333';
            i++;
        }
        const amountofratings = rating.appendChild(document.createElement('span'))
        amountofratings.innerHTML = `(${ratings})`
        //making button
        const button = div.appendChild(document.createElement('button'))
        button.innerHTML = '🛒 Add to cart'
        done ++;
    }
}