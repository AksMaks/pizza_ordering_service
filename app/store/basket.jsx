import { makeAutoObservable } from "mobx"
import { Order } from "../api/api"
import profile from "./profile"

class basket {
  list = [

  ]
  currentAddress = null
  paymentMethod = "Наличными"
  comment = ""
  type = "Доставка"
  constructor() {
    makeAutoObservable(this)
  }
  AddOrder(){
    let order = {
      IdUser: profile.data.Id,
      Date: "2022-01-25",
      Address: this.currentAddress.Address,
      Type: this.type,
      Phone: profile.data.Phone,
      Comment: this.comment,
      Points:"0",
      Payment:"0",
      Sum: this.getPrice(), 
      Status: this.paymentMethod,
      Composition: this.list.map(el => {
        return {
          Name: `${el.Name}, ${el.Option.Name}`,
          Additives: el.Option.Additives.map(elA => {return `${elA.Number} шт, ${elA.Name}`}).join("\n"), 
          Number: el.Number,
          Price: el.Option.Price
        }
      })
    }
    Order.Insert(order)
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
  setComment = (data) => {
    console.log(data)
    this.comment = data
  }
  setType = (data) => {
    this.type = data
  }
  getPrice = () => {
    let sum = 0
    this.list.forEach(el => {
      let price = el.Option.Price
      el.Option.Additives.forEach(el => {
        price += el.Price*el.Number
      })
      sum += price*el.Number
    })
    return sum
  }
}

export default new basket()