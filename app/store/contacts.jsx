import { makeAutoObservable } from "mobx"
class contacts {
  data = [
    {
      "Id": 5,
      "Image": "https://rozetked.me/images/uploads/dwoilp3BVjlE.jpg",
      "Text": "Test",
      "Link": "Test",
      "Description": "Test"
    },
    {
      "Id": 5,
      "Image": "https://rozetked.me/images/uploads/dwoilp3BVjlE.jpg",
      "Text": "Test",
      "Link": "Test",
      "Description": "Test"
    },
    {
      "Id": 5,
      "Image": "https://rozetked.me/images/uploads/dwoilp3BVjlE.jpg",
      "Text": "Test",
      "Link": "Test",
      "Description": "Test"
    },
    {
      "Id": 5,
      "Image": "https://rozetked.me/images/uploads/dwoilp3BVjlE.jpg",
      "Text": "Test",
      "Link": "Test",
      "Description": "Test"
    },
    {
      "Id": 5,
      "Image": "https://rozetked.me/images/uploads/dwoilp3BVjlE.jpg",
      "Text": "Test",
      "Link": "Test",
      "Description": "Test"
    }
  ]
  constructor() {
    makeAutoObservable(this)
  }
  //записать контакты
  setContacts(data){
    this.data = data
    Console.log("Запись новых контактов")
  }
  //Получить контакты
  getContacts(){
    return this.data
  }
}

export default new contacts()