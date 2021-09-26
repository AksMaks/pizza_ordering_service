import { makeAutoObservable } from "mobx"

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
    },
    {
        "IdProduct": 11,
        "IdBranch": 10,
        "Address": "perm 2"
    },
    {
        "IdProduct": 12,
        "IdBranch": 10,
        "Address": "perm 2"
    },
    {
        "IdProduct": 13,
        "IdBranch": 9,
        "Address": "popova 1"
    },
    {
        "IdProduct": 13,
        "IdBranch": 10,
        "Address": "perm 2"
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
    },
    {
      "Id": 2,
      "Name": "Пиццы"
    },
    {
      "Id": 3,
      "Name": "Напитки1"
    },
    {
      "Id": 4,
      "Name": "Пиццы2"
    },
    {
      "Id": 5,
      "Name": "Напитки2"
    },
    {
      "Id": 6,
      "Name": "Пиццы2"
    }
  ]
  Products = [
    {
      "Id": 10,
      "Name": "Кола1",
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
    },
    {
      "Id": 11,
      "Name": "Пицца сырная",
      "Description": 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.',
      "IdCategory": 2,
      "CategoryName": "Пиццы",
      "Image": "https://rozetked.me/images/uploads/dwoilp3BVjlE.jpg",
      Options: [
        {
          "Id": 13,
          "Name": "Средняя",
          "Weight": 350,
          "Size": 25,
          "Price": 150,
          "Additive": 3,
          Additives: [
            {
              "Id": 9,
              "Name": "Лук",
              "Image": "https://rozetked.me/images/uploads/dwoilp3BVjlE.jpg",
              "Weight": 10,
              "Price": 10,
              "Number": 0
            },
            {
              "Id": 10,
              "Name": "Мясо",
              "Image": "https://rozetked.me/images/uploads/dwoilp3BVjlE.jpg",
              "Weight": 20,
              "Price": 20,
              "Number": 0
            },
            {
              "Id": 11,
              "Name": "Мясо1",
              "Image": "https://rozetked.me/images/uploads/dwoilp3BVjlE.jpg",
              "Weight": 20,
              "Price": 20,
              "Number": 0
            },
            {
              "Id": 12,
              "Name": "Мясо2",
              "Image": "https://rozetked.me/images/uploads/dwoilp3BVjlE.jpg",
              "Weight": 20,
              "Price": 20,
              "Number": 0
            },
            {
              "Id": 13,
              "Name": "Мясо3",
              "Image": "https://rozetked.me/images/uploads/dwoilp3BVjlE.jpg",
              "Weight": 20,
              "Price": 20,
              "Number": 0
            }
          ]
        },
        {
          "Id": 14,
          "Name": "Малая",
          "Weight": 200,
          "Size": 20,
          "Price": 100,
          "Additive": 2,
          Additives: [
            {
              "Id": 9,
              "Name": "Лук",
              "Image": "https://rozetked.me/images/uploads/dwoilp3BVjlE.jpg",
              "Weight": 10,
              "Price": 10,
              "Number": 1
            }
          ]
        }
      ]
    },
    {
      "Id": 12,
      "Name": "Картофель по-деревенски",
      "Description": null,
      "IdCategory": 2,
      "CategoryName": "Пиццы",
      "Image": "https://rozetked.me/images/uploads/dwoilp3BVjlE.jpg"
    }
  ]

  constructor() {
    makeAutoObservable(this)
  }
}

export default new menu()