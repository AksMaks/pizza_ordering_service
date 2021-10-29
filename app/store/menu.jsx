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
      "Id": 3,
      "Name": "Напитки2"
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
    },
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
      "Name": "Пицца колбасная",
      "Description": 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.',
      "IdCategory": 2,
      "CategoryName": "Пиццы",
      "Image": "https://sun9-39.userapi.com/impg/TFoGPMxwVD5Ige-fR2i7W7oFJjHjaikQ6AiYZQ/PRESMDWsOr4.jpg?size=292x292&quality=96&sign=d3f8e0440f94de30ad0bfd06ac80a528&type=album",
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
              "Image": "https://w7.pngwing.com/pngs/800/247/png-transparent-onion-fortune-cookie-taco-bell-ingredient-computer-icons-onions-food-leaf-branch.png",
              "Weight": 10,
              "Price": 10,
              "Number": 0
            },
            {
              "Id": 10,
              "Name": "Мясо",
              "Image": "https://img2.freepng.ru/20180314/xoe/kisspng-ham-prosciutto-meat-clip-art-ham-radio-clipart-5aa9d37ebb3ba0.5501563715210791667669.jpg",
              "Weight": 20,
              "Price": 20,
              "Number": 0
            },
            {
              "Id": 11,
              "Name": "Мясо1",
              "Image": "https://img2.freepng.ru/20180314/xoe/kisspng-ham-prosciutto-meat-clip-art-ham-radio-clipart-5aa9d37ebb3ba0.5501563715210791667669.jpg",
              "Weight": 20,
              "Price": 20,
              "Number": 0
            },
            {
              "Id": 12,
              "Name": "Мясо2",
              "Image": "https://img2.freepng.ru/20180314/xoe/kisspng-ham-prosciutto-meat-clip-art-ham-radio-clipart-5aa9d37ebb3ba0.5501563715210791667669.jpg",
              "Weight": 20,
              "Price": 20,
              "Number": 0
            },
            {
              "Id": 13,
              "Name": "Мясо3",
              "Image": "https://img2.freepng.ru/20180314/xoe/kisspng-ham-prosciutto-meat-clip-art-ham-radio-clipart-5aa9d37ebb3ba0.5501563715210791667669.jpg",
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
          "Price": 10,
          "Additive": 2,
          Additives: [
            {
              "Id": 9,
              "Name": "Лук",
              "Image": "https://w7.pngwing.com/pngs/800/247/png-transparent-onion-fortune-cookie-taco-bell-ingredient-computer-icons-onions-food-leaf-branch.png",
              "Weight": 10,
              "Price": 10,
              "Number": 0
            }
          ]
        }
      ]
    },
    {
      "Id": 12,
      "Name": "Пицца колбасная 12" ,
      "Description": 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.',
      "IdCategory": 2,
      "CategoryName": "Пиццы",
      "Image": "https://sun9-39.userapi.com/impg/TFoGPMxwVD5Ige-fR2i7W7oFJjHjaikQ6AiYZQ/PRESMDWsOr4.jpg?size=292x292&quality=96&sign=d3f8e0440f94de30ad0bfd06ac80a528&type=album",
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
      "Id": 13,
      "Name": "Пицца колбасная 13",
      "Description": 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.',
      "IdCategory": 2,
      "CategoryName": "Пиццы",
      "Image": "https://sun9-39.userapi.com/impg/TFoGPMxwVD5Ige-fR2i7W7oFJjHjaikQ6AiYZQ/PRESMDWsOr4.jpg?size=292x292&quality=96&sign=d3f8e0440f94de30ad0bfd06ac80a528&type=album",
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
      "Id": 13,
      "Name": "Пицца колбасная 13",
      "Description": 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.',
      "IdCategory": 2,
      "CategoryName": "Пиццы",
      "Image": "https://sun9-39.userapi.com/impg/TFoGPMxwVD5Ige-fR2i7W7oFJjHjaikQ6AiYZQ/PRESMDWsOr4.jpg?size=292x292&quality=96&sign=d3f8e0440f94de30ad0bfd06ac80a528&type=album",
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
      "Id": 13,
      "Name": "Пицца колбасная 13",
      "Description": 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.',
      "IdCategory": 2,
      "CategoryName": "Пиццы",
      "Image": "https://sun9-39.userapi.com/impg/TFoGPMxwVD5Ige-fR2i7W7oFJjHjaikQ6AiYZQ/PRESMDWsOr4.jpg?size=292x292&quality=96&sign=d3f8e0440f94de30ad0bfd06ac80a528&type=album",
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
    }
  ]
  constructor() {
    makeAutoObservable(this)
  }

}

export default new menu()