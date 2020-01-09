class Post {

    constructor(name, text, date, avatar) {
        this.name = name;
        this.date = new Date(date).toLocaleDateString();
        this.text = text;
        this.avatar = avatar;
    }

    render() {
        let element = document.createElement('div');
        element.innerHTML = `
            <div class='post'>
            <div class="post-header">
                <img class="avatar" src="${this.avatar}"
                    width="50" height="50">
                <p class="name">${this.name}</p>
                <p class="date">Date: ${this.date}</p>
                <div class="clear"></div>
            </div>
            <p class="text">${this.text}</p>
        </div>`;
        return element;
    }
}