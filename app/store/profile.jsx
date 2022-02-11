import { makeAutoObservable } from "mobx"
import { AsyncStorage } from 'react-native';
import { Profile, Address } from "../api/api"

class profile {
  constructor() {
    makeAutoObservable(this)
  }
  User = false
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
    Points: "0",
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
    return Profile.GetCode({Phone:phone})
  }
  //авторизация
  Auth = (phone, pass) => {
    return Profile.Auth({Phone:phone, Password: pass})
  }
  GetOne = (Id) => {
    return Profile.GetOne({Id: Id})
  }
  //регистрация
  Reg = (phone, phoneRef) => {
    return Profile.RegRef({Phone:phone, PhoneRef: phoneRef})
  }
  setCurrentAddress = (newCurrentAddress) => {
    this.CurrentAddress = newCurrentAddress
  }
  setData = (data) => {
    console.log(data)
    this.data = data
  }
  seUser = (data) => {
    this.User = data
   }
  ChangeNamePhone = (newName, newPhone) => {
    this.data.Name = newName
    this.data.Phone = newPhone
    Profile.Change(this.data)
  }
  SetAddresses = (IdUser) => {
    Address.Get({IdUser: IdUser}).then(res => {
      this.Addresses = res.Data.map(el => {return {...el, Address: JSON.parse(el.Address), Comment: el.Name}})
    })
  }
  addAddress = (IdUser, newAddress, Comment) => {
    Address.Insert({IdUser: IdUser, Address: JSON.stringify(newAddress), Name: Comment})
    this.SetAddresses(IdUser)
  }
  changeAddress = (newAddress, Comment) => {
    this.Addresses.forEach(el => {
      if(el.Id == this.CurrentAddress.Id){
        el.Address = newAddress
        el.Comment = Comment
      }
    })
    Address.Change({Id: this.CurrentAddress.Id, Address: JSON.stringify(newAddress), Name: Comment})
  }
  deleteAddress = (Id) => {
    this.Addresses = this.Addresses.filter(el => el.Id != Id)
    Address.Delete({Id: Id})
  }
  Exit = () => {
    AsyncStorage.removeItem("user")
    this.seUser(false)
  }
}

export default new profile()