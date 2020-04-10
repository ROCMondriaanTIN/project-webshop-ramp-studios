class Reviews extends Component {
    constructor(){
        super("div");
        this.rootElement.id = "reviewDiv";
        this.initView();
    }

    initView(){
        this.rootElement.innerHTML = `
        <h2>Schrijf een review</h2>
        <form id="addReview" name="review" action="/action_page.php" onsubmit="myFunction()">
            Rating:
            <input type="radio" id="1" name="rating" value="1" required>
            <label for="1">1</label>
            <input type="radio" id="2" name="rating" value="2">
            <label for="2">2</label>
            <input type="radio" id="3" name="rating" value="3">
            <label for="3">3</label>
            <input type="radio" id="4" name="rating" value="4">
            <label for="4">4</label>
            <input type="radio" id="5" name="rating" value="5">
            <label for="5">5</label>
        
            <br><label for="review">Review:</label><br>
            <input type="text" id="text" name="text"><br><br>
            <input type="submit" value="Submit">
        </form>`;
    }  
}