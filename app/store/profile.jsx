import { makeAutoObservable } from "mobx"

class profile {
  constructor() {
    makeAutoObservable(this)
  }
  User = false

  Id = 1 
  Name = "Вася Попов"
  Phone = "+7-999-999-9999" 
  Password = "asd" 
  Birthday = "03.10.2021"
  IdRole = "2" 
  IdLevel = "1"
  LevelName = "Начальный"
  Сashback = "10"
  Points= "100"
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
  //для выбора нужного адреса
  CurrentAddress = null
  
  setCurrentAddress = (newCurrentAddress) => {
    this.CurrentAddress = newCurrentAddress
  }

  ChangeNamePhone = (newName, newPhone) => {
    this.Name = newName
    this.Phone = newPhone
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