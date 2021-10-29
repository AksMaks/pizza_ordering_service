import { makeAutoObservable } from "mobx"

class comments {
  list = [

  ]
  currentAddress = null
  paymentMethod = "Наличными"
  constructor() {
    makeAutoObservable(this)
  }

  addProduct(newProduct){
    delete newProduct.Options
    let temp = this.list.find((el, ind) => {
      if(Number(el.Id) == Number(newProduct.Id) && Number(el.Option.Id) == Number(newProduct.Option.Id)){
        let asd = true
        el.Option.Additives.forEach((element, index) => {
          if(Number(element.Id) == Number(newProduct.Option.Additives[index].Id) && Number(element.Number) == Number(newProduct.Option.Additives[index].Number)){
            asd = asd && true
          }else{
            asd = asd && false
          }
        });
        return asd
      }else{
        return false
      }
    })
    if(temp){
      this.list.find(el => el.Id == newProduct.Id).Number ++
    }else{
      this.list.push({...newProduct, Number: 1})
    }
  }

  changeNumber(ind, change){
    if(this.list[ind].Number == 1 && change == -1){
      this.list.splice(ind, 1)
    }else{
      this.list[ind].Number += change
    }
  }
  setAddress = (newAddress) => {
    this.currentAddress = newAddress
  }

  setPaymentMethod = (newPaymentMethod) => {
    this.paymentMethod = newPaymentMethod
  }
}

export default new comments()