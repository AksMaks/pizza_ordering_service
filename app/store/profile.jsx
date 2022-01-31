import { makeAutoObservable } from "mobx"
import { Profile } from "../api/api"

class profile {
  constructor() {
    makeAutoObservable(this)
  }
  User = true
  data = {
    Id: 33,
    Name: "Вася Попов",
    Phone: "+7-999-999-9999",
    Password: "asd",
    Birthday: "03.10.2021",
    IdRole: "2",
    IdLevel: "1",
    LevelName: "Начальный",
    Сashback: "10",
    Points: "10",
  }
  Addresses = [
    {
      Id: 1,
      Address: {
        Street: "г. Пермь, ул. Калинина",
        House: "47", 
        Apartment: "5", 
        Entrance: "5", 
        Floor: "1"
      },
      Comment: "Хата"
    },
    {
      Id: 2,
      Address: {
        Street: "г. Пермь, ул. asdasd",
        House: "123", 
        Apartment: "123", 
        Entrance: "123", 
        Floor: "123"
      },
      Comment: "123"
    }
  ]
  test = () => {
    Profile.GetOne({Id: 33}).then((response2) => {
      console.log(response2.Data.Users)
      if(!!response2.Data.Users){
        setUser(true)
      }
    })
  }
  //для выбора нужного адреса
  CurrentAddress = null
  //получить код
  GetCode = (phone) => {
    Profile.GetCode({Phone:phone}).then((response) => {})
  }
  //авторизация
  Auth = (phone, pass) => {
    Profile.Auth({Phone:phone, Password: pass}).then((response1) => {
      Profile.GetOne({Id: response1.Id}).then((response2) => {
        console.log(response2)
      })
    })
  }
  setCurrentAddress = (newCurrentAddress) => {
    this.CurrentAddress = newCurrentAddress
  }
  setData = (data) => {
   this.data = data
  }
  seUser = (data) => {
    this.User = data
   }
  ChangeNamePhone = (newName, newPhone) => {
    this.data.Name = newName
    this.data.Phone = newPhone
  }
  addAddress = (newAddress, Comment) => {
    
  }
  changeAddress = (newAddress, Comment) => {
    this.Addresses.forEach(el => {
      if(el.Id == this.CurrentAddress.Id){
        el.Address = newAddress
        el.Comment = Comment
      }
    })
  }
  deleteAddress = (Id) => {
    this.Addresses = this.Addresses.filter(el => el.Id != Id)
  }
}

export default new profile()