import { makeAutoObservable } from "mobx"
import { Contacts } from "../api/api"

class contacts {
  data = [
    {
      "Id": 5,
      "Image": "https://sun9-39.userapi.com/impg/TFoGPMxwVD5Ige-fR2i7W7oFJjHjaikQ6AiYZQ/PRESMDWsOr4.jpg?size=292x292&quality=96&sign=d3f8e0440f94de30ad0bfd06ac80a528&type=album",
      "Text": "Instagram",
      "Link": "Test",
      "Description": "Test"
    },
    {
      "Id": 5,
      "Image": "https://sun9-39.userapi.com/impg/TFoGPMxwVD5Ige-fR2i7W7oFJjHjaikQ6AiYZQ/PRESMDWsOr4.jpg?size=292x292&quality=96&sign=d3f8e0440f94de30ad0bfd06ac80a528&type=album",
      "Text": "Вконтакте",
      "Link": "Test",
      "Description": "Test"
    },
    {
      "Id": 5,
      "Image": "https://sun9-39.userapi.com/impg/TFoGPMxwVD5Ige-fR2i7W7oFJjHjaikQ6AiYZQ/PRESMDWsOr4.jpg?size=292x292&quality=96&sign=d3f8e0440f94de30ad0bfd06ac80a528&type=album",
      "Text": "Написать основателю",
      "Link": "Test",
      "Description": "Test"
    },
    {
      "Id": 5,
      "Image": "https://sun9-39.userapi.com/impg/TFoGPMxwVD5Ige-fR2i7W7oFJjHjaikQ6AiYZQ/PRESMDWsOr4.jpg?size=292x292&quality=96&sign=d3f8e0440f94de30ad0bfd06ac80a528&type=album",
      "Text": "Написать разработчику",
      "Link": "Test",
      "Description": "Test"
    },
  ]
  constructor() {
    makeAutoObservable(this)
  }
  GetData = () => {
    Contacts.GetContact().then((response) => {
      this.setContacts(response.Data.reverse().map(el => {
        return {
          ...el,
          Image: response.UrlServer+el.Icon
        }
      })
      )
    })
  }
  //записать контакты
  setContacts(data){
    this.data = data
    console.log("Запись новых контактов")
  }
  //Получить контакты
  getContacts(){
    return this.data
  }
}

export default new contacts()