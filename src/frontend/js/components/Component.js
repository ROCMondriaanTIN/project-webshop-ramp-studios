class Component{
  constructor(element){
    this.rootElement = document.createElement(element);
  }

  getElementById(id) {
    return this.rootElement.querySelector(`#${id}`);
  }
  

  initView(){
    this.rootElement.innerHTML = '<span> NOT IMPLEMENTED YET </span>'
  }

  getView(){
    return this.rootElement;
  }
}