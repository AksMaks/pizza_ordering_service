import { makeAutoObservable } from "mobx"

class stories {
  stock = [
    {
      "Id": 1,
      "Name": "Акция 228",
      "DateBegin": "29.09.2021",
      "DateEnd": "29.09.2021",
      "Image": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      "PromoCode": ""
    },
    {
      "Id": 1,
      "Name": "Акция 228",
      "DateBegin": "29.09.2021",
      "DateEnd": "29.09.2021",
      "Image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
      "PromoCode": ""
    }
  ]
  comments = [
    {
      "Id": 8,
      "Image": "https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg",
      "Date": "2021-01-02"
    },
    {
      "Id": 9,
      "Image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
      "Date": "2021-01-03"
    },
    {
      "Id": 11,
      "Image": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      "Date": "2021-09-23"
    }
  ]
  cooperation = [
    {
      "Id": 3,
      "Image": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      "Link": "123"
    },
    {
      "Id": 3,
      "Image": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
      "Link": "123"
    }
  ]
  Actual = {
    stock: true,
    comments: true,
    cooperation: true
  }
  constructor() {
    makeAutoObservable(this)
  }

  changeActual(block){
    this.Actual[block] = false
  }
}

export default new stories()