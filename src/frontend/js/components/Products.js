class Products extends Component{
  constructor(products = this.getData()){
    suoer("article");
  }


  async getData() {
    let response = await this.getData(this.url + '/products');
    if (response.ok) {
        let data = await response.json();
        return data;
    }
    else {
        throw `Error: ${response.status} ${response.statusText}`;
    }
  }

  initView(){
    
  }

  getView(){

  }

}