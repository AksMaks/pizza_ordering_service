const bcript = require("bcryptjs")
const jwt = require("jsonwebtoken")
const fs = require("fs-extra")
let db = require("../models/index.js");

class controller{
  Get = async (data) => {
    let Response = {}
    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
          `SELECT Id, Address FROM branch WHERE 1`,
        {
          type: db.sequelize.QueryTypes.SELECT,
          transaction: transaction
        }
      ).then(result => {
        Response.Data = {}
        Response.Data.Branches = result
      })
      await db.sequelize.query(
          `SELECT Id, Name FROM category WHERE 1`,
        {
          type: db.sequelize.QueryTypes.SELECT,
          transaction: transaction
        }
      ).then(result => {
        Response.Data.Category = result
      })
      await db.sequelize.query(
          `SELECT bp.IdProduct, bp.IdBranch, b.Address  FROM branch_product bp LEFT JOIN branch b ON b.Id = bp.IdBranch WHERE 1`,
        {
          type: db.sequelize.QueryTypes.SELECT,
          transaction: transaction
        }
      ).then(result => {
        Response.Data.BranchProducts = result
      })
      await db.sequelize.query(
          `SELECT p.Id, p.Name, p.Description, p.IdCategory, c.Name AS CategoryName, p.Image FROM product p INNER JOIN category c ON c.Id = p.IdCategory WHERE 1`,
        {
          type: db.sequelize.QueryTypes.SELECT,
          transaction: transaction
        }
      ).then(result => {
        Response.Data.Products = result
      })
    })
    return Response
  }
  Insert = async (data) => {
    let Response = {}
    const {Name, Description, IdCategory, Url, Branches} = data
    
    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
        'INSERT INTO `product`(`Name`, `Description`, `IdCategory`, `Image`, `Number`) VALUES (?, ?, ?, ?, ?)', 
        {
          replacements: [Name, Description, IdCategory, Url, 0]
        },
        {
          type: db.sequelize.QueryTypes.INSERT,
          transaction: transaction
        }
      )
      await db.sequelize.query(
        'SELECT Id FROM product ORDER BY Id DESC LIMIT 1',
        {
          type: db.sequelize.QueryTypes.SELECT,
          transaction: transaction
        }
      ).then(result => {
        console.log("asd", result)
        let query = "INSERT INTO `branch_product`(`IdProduct`, `IdBranch`) VALUES ";
        JSON.parse(Branches).forEach(el => {
          query += `('${result[0]["Id"]}', '${el}'),`
        });
        db.sequelize.query(query.slice(0, -1),
          {
            type: db.sequelize.QueryTypes.Insert,
            transaction: transaction
          }
        )
      })
    }).then(result => {
      Response.Message = "Запись добавлена"
    }).catch(error => {
      Response.Error = true
      Response.Message = "Запись не добавлена"
    })
    return Response
  }
  Update = async (data) => {
    let Response = {}
    const {Id, Name, Description, IdCategory, Url, Branches} = data

    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
        'UPDATE `product` SET `Name`=?,`Description`=?,`IdCategory`=?,`Image`=?,`Number`=? WHERE Id=?', 
        {
          replacements: [Name, Description, IdCategory, Url, 0, Id]
        },
        {
          type: db.sequelize.QueryTypes.INSERT,
          transaction: transaction
        }
      )
      await db.sequelize.query(
        'DELETE FROM `branch_product` WHERE IdProduct = ?',
        {
          replacements: [Id]
        },
        {
          type: db.sequelize.QueryTypes.SELECT,
          transaction: transaction
        }
      ).then(result => {
        let query = "INSERT INTO `branch_product`(`IdProduct`, `IdBranch`) VALUES ";
        JSON.parse(Branches).forEach(el => {
          query += `('${Id}', '${el}'),`
        });
        db.sequelize.query(query.slice(0, -1),
          {
            type: db.sequelize.QueryTypes.Insert,
            transaction: transaction
          }
        )
      })
    }).then(result => {
      if(data.OldImage !== Url) fs.removeSync(data.OldImage)
      Response.Message = "Запись изменена"
    }).catch(error => {
      Response.Error = true
      Response.Message = "Запись не изменена"
    })
    return Response
  }
  Delete = async (data) => {
    let Response = {}
    const {Id} = data
    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
        'SELECT Id, Image FROM `product` WHERE Id = ?',
        {
          replacements: [Id]
        },
        {
          type: db.sequelize.QueryTypes.SELECT,
          transaction: transaction
        }
      ).then(result => {
        fs.removeSync(result[0][0]["Image"])
      })
      await db.sequelize.query(
        'DELETE FROM `product` WHERE Id = ?',
        {
          replacements: [Id]
        },
        {
          type: db.sequelize.QueryTypes.DELETE,
        }
      )
    }).then(result => {
      Response.Message = "Запись удалена"
    }).catch(error => {
      Response.Error = true
      Response.Message = "Запись не удалена"
    })
    return Response
  }
}

module.exports = new controller()