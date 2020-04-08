load('top10');
load('last10');
load('newest10');

async function load(type) {

    let carousel;
    if (type === 'top10') carousel = document.getElementById('aanbevolen-carousel');
    else if (type === 'last10') carousel = document.getElementById('laatstbekeken-carousel');
    else if (type === 'newest10') carousel = document.getElementById('laatsttoegevoegd-carousel');
    else return;

    //get products
    let response = await fetch((`./api/products?limit=100000`), {
        method: 'GET',
        headers: {
            'Content-type': 'json/application',
        }
    })
    //get the json
    response = (await response.json()).products;

    //laad de carousel in
    for (let i = 0; i < 10; i++) {
        const data = response[i];
        if (!data) break;
        data['type'] = type;
        const newdiv = new Product(data);
        newdiv.rootElement.className = 'carousel-cell'
        carousel.appendChild(newdiv.rootElement);
    }

    //laad de carousel code in 
    if (type === 'newest10') {
        let scr  = document.createElement('script'),
        head = document.head || document.getElementsByTagName('head')[0];
        scr.src = "js/other/flickity.pkgd.js";
        head.insertBefore(scr, head.firstChild);
    }
}