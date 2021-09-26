import { makeAutoObservable } from "mobx"

class comments {
  list = [

  ]
  constructor() {
    makeAutoObservable(this)
  }

  addProduct(newProduct){
    this.list.push(newProduct)
  }
}

export default new comments()