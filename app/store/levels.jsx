import { makeAutoObservable } from "mobx"
import { Levels } from "../api/api"

class levels {
  data = [
    {
      Id: "1",
      Name: "Новичек",
      Сashback: 0,
      Border: 1000
    }
  ]
  constructor() {
    makeAutoObservable(this)
  }
  GetData = () => {
    Levels.GetLevel().then((response) => {
      this.setlevels(response.Data)
    })
  }
  //записать уровней
  setlevels(data){
    this.data = data
    console.log("Запись новых уровней")
  }
}

export default new levels()