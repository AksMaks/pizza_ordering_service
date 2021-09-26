import { makeAutoObservable } from "mobx"

class cooperation {
  data = [
    {
      "Id": 3,
      "Image": "uploads\\Cooperation\\24092021-121752_649.jpeg",
      "Link": "123"
    }
  ]
  constructor() {
    makeAutoObservable(this)
  }
}

export default new cooperation()