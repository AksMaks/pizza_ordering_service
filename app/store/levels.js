import { makeAutoObservable } from "mobx"

class levels {
  data = [
    {
      Id: "1",
      Name: "Новичек",
      Сashback: 0,
      Border: 1000
    },
    {
      Id: "2",
      Name: "Седняк",
      Сashback: 3,
      Border: 5000
    },
    {
      Id: "3",
      Name: "Бывалый",
      Сashback: 5,
      Border: 1000
    }
  ]
  constructor() {
    makeAutoObservable(this)
  }
}

export default new levels()