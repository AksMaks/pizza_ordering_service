import { makeAutoObservable } from "mobx"
import { Product } from "../api/api"

class menu {
  /*
  Additive = [
    {
      "Id": 9,
      "Name": "Лук",
      "Image": "uploads\\Additive\\29072021-012751_553-foto2.jpg",
      "Weight": 123,
      "Price": 123,
      "Number": 0
    }
  ]
  ProductOption = [
    {
      "Id": 13,
      "IdProduct": 11,
      "Product": "Пицца сырная",
      "Name": "Средняя",
      "Weight": 350,
      "Size": 25,
      "Price": 150,
      "Additive": 3
    },
    {
      "Id": 14,
      "IdProduct": 11,
      "Product": "Пицца сырная",
      "Name": "Малая",
      "Weight": 200,
      "Size": 20,
      "Price": 100,
      "Additive": 2
    }
  ]
  ListAdditives = [
    {
      "Id": 20,
      "IdProductOption": 13,
      "IdAdditive": 9,
      "AdditiveName": "Лук"
    }
  ]
  */
  
  BranchProducts = [
    {
        "IdProduct": 11,
        "IdBranch": 9,
        "Address": "popova 1"
    }
  ]
  Branches = [
    {
      "Id": 9,
      "Address": "popova 1"
    },
    {
      "Id": 10,
      "Address": "perm 2"
    }
  ]
  Category = [
    {
      "Id": 1,
      "Name": "Напитки"
    }
  ]
  Products = [
    {
      "Id": 9,
      "Name": "Кола0",
      "Description": "Coca cola",
      "IdCategory": 1,
      "CategoryName": "Напитки",
      "Image": "https://rozetked.me/images/uploads/dwoilp3BVjlE.jpg",
      Options: [
        {
          "Id": 13,
          "Name": "1 литр",
          "Weight": 1000,
          "Size": 25,
          "Price": 100,
          "Additive": 3,
          Additives: []
        },
        {
          "Id": 14,
          "Name": "2 литка",
          "Weight": 2000,
          "Size": 50,
          "Price": 200,
          "Additive": 2,
          Additives: []
        }
      ]
    }
  ]
  Additive = []
  constructor() {
    makeAutoObservable(this)
  }
  GetData = () => {
    Product.GetProduct().then((response1) => {
      this.setBPBC(response1.Data.BranchProducts, response1.Data.Branches, response1.Data.Category)
      let tempProducts = response1.Data.Products.map(el => {return{...el, Image: response1.UrlServer+el.Image}})

      Product.GetAdditive().then((response2) => {
        this.setAdditive(
          response2.Data.map(el => {return{...el, Image: response2.UrlServer+el.Image}})
        )
        Product.GetProductOption().then((response) => {

          let temp = tempProducts.map(el => {
            let tempProductOption = response.Data.ProductOption.filter(elF => elF.IdProduct == el.Id).map(elPO => {
              let tempAdditive = response.Data.ListAdditives
                .filter(elFLA => elFLA.IdProductOption == elPO.Id)
                .map(elt1 => {
                  return this.Additive.find(elfind => elfind.Id == elt1.IdAdditive)
                })
              return {...elPO, Additives: tempAdditive}
            })
            return {...el, Options: tempProductOption}
          })
          
          temp = temp.filter(elF => elF.Options.length > 0)
          this.setProduct(temp)
        })
      })
    })
  }
  setBPBC(BranchProducts, Branches, Category){
    this.BranchProducts = BranchProducts;
    this.Branches = Branches;
    this.Category = Category;
    console.log("Запись новых категорий, отделов")
  }
  setAdditive(data){
    this.Additive = data
    console.log("Запись новых добавок")
  }
  setProduct(data){
    this.Products = data
    console.log(data)
    console.log("Запись новых продуктов")
  }
}

export default new menu()