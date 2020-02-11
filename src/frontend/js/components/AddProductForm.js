class AddProductForm extends Component{
  constructor(){
    super("form");
    this.formId = "product_form";
    this.formName = "formProductName";
    this.formBrand = "formProductBrand";
    this.formImages = "formProductImages";
    this.formDescription = "formProductDescription";
    this.fromPrice = "fromProductPrice";
    this.formQuantity = "formProductQuantity";
    this.initView();

    this.rootElement.addEventListener('submit', (e) => {
      this.addProduct(e);
    });
  }

  initView(){
    this.rootElement.innerHTML = `
      <style scoped>
      div{
        width:500px;
        display:flex;
        justify-content: center;
        flex-direction: column;
        background:#f1f2f2;
        padding: 29px;
      }
      </style>
    `;

    this.rootElement.id = this.formId;
    this.rootElement.innerHTML = `
      <input id="${this.formName}" type="text" placeholder="productname" name="name">
      <input id="${this.formBrand}"type="text" placeholder="brand" name="brand">
      <input id="${this.formImages}"type="text" placeholder="img" name="images">
      <textarea id="${this.formDescription}"name="description" id="" cols="30" rows="10" placeholder="beschrijving"></textarea>
      <input id="${this.fromPrice}" type="number" step="0.01" placeholder="price" name="price">
      <input id="${this.formQuantity}"type="number" placeholder="quantity in stock" name="quantityInStock">
      <input type="submit" value="Add">
    `;

    // this.rootElement.append(this.form);
  }

  addProduct(e) {
    e.preventDefault();
    // let formData = new FormData(this.getElementById(this.formId));
    let product = {
      name: this.getElementById(this.formName).value,
      brand: this.getElementById(this.formBrand).value,
      images: [this.getElementById(this.formImages).value],
      description: this.getElementById(this.formDescription).value,
      price: this.getElementById(this.fromPrice).value,
      quantityInStock: this.getElementById(this.formQuantity).value,
    } 

   let api =  new API();
   console.log(api)
    api.addProduct(product);

    // console.log(API.getProducts());
    // console.log(product);
    // api = new API();
    // api.postData(product);
  }



}
