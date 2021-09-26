import { makeAutoObservable } from "mobx"

class profile {
  data = {

  }
  constructor() {
    makeAutoObservable(this)
  }
}

export default new profile()