const bcript = require("bcryptjs")
const jwt = require("jsonwebtoken")
const fs = require("fs-extra")
let db = require("../models/index.js");

class controller{
  Get = async (data) => {
    let Response = {}
    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
          `SELECT Id, Name FROM product WHERE 1`,
        {
          type: db.sequelize.QueryTypes.SELECT,
          transaction: transaction
        }
      ).then(result => {
        Response.Data = {}
        Response.Data.Products = result
      })
      await db.sequelize.query(
          `SELECT Id, Name FROM additive WHERE 1`,
        {
          type: db.sequelize.QueryTypes.SELECT,
          transaction: transaction
        }
      ).then(result => {
        Response.Data.Additives = result
      })
      await db.sequelize.query(
          `SELECT po.Id, po.IdProduct, p.Name AS Product, po.Name, po.Weight, po.Size, po.Price, po.Additive 
          FROM product_option po
          INNER JOIN product p ON p.Id = po.IdProduct
          WHERE 1
          `,
        {
          type: db.sequelize.QueryTypes.SELECT,
          transaction: transaction
        }
      ).then(result => {
        Response.Data.ProductOption = result
      })
      await db.sequelize.query(
          `SELECT la.Id, la.IdProductOption, la.IdAdditive, a.Name AS AdditiveName FROM 
          list_additives la 
          INNER JOIN Additive a ON a.Id = la.IdAdditive 
          WHERE 1`,
        {
          type: db.sequelize.QueryTypes.SELECT,
          transaction: transaction
        }
      ).then(result => {
        Response.Data.ListAdditives = result
      })
    })
    return Response
  }
  Insert = async (data) => {
    let Response = {}
    const {IdProduct, Name, Weight, Size, Price, Additive, Additives} = data
    
    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
        'INSERT INTO `product_option`(`IdProduct`, `Name`, `Weight`, `Size`, `Price`, `Image`, `Additive`) VALUES (?, ?, ?, ?, ?, ?, ?)', 
        {
          replacements: [IdProduct, Name, Weight, Size, Price, "", Additive]
        },
        {
          type: db.sequelize.QueryTypes.INSERT,
          transaction: transaction
        }
      )
      await db.sequelize.query(
        'SELECT Id FROM product_option ORDER BY Id DESC LIMIT 1',
        {
          type: db.sequelize.QueryTypes.SELECT,
          transaction: transaction
        }
      ).then(result => {
        let query = "INSERT INTO `list_additives`(`IdProductOption`, `IdAdditive`) VALUES ";
        Additives.forEach(el => {
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
    const {Id, IdProduct, Name, Weight, Size, Price, Additive, Additives} = data

    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
        'UPDATE `product_option` SET `IdProduct`=?,`Name`=?,`Weight`=?,`Size`=?,`Price`=?,`Image`=?,`Additive`=? WHERE Id=?', 
        {
          replacements: [IdProduct, Name, Weight, Size, Price, "", Additive, Id]
        },
        {
          type: db.sequelize.QueryTypes.INSERT,
          transaction: transaction
        }
      )
      await db.sequelize.query(
        'DELETE FROM `list_additives` WHERE IdProductOption = ?',
        {
          replacements: [Id]
        },
        {
          type: db.sequelize.QueryTypes.SELECT,
          transaction: transaction
        }
      ).then(result => {
        let query = "INSERT INTO `list_additives`(`IdProductOption`, `IdAdditive`) VALUES ";
        Additives.forEach(el => {
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
        'DELETE FROM `product_option` WHERE Id = ?',
        {
          replacements: [Id]
        },
        {
          type: db.sequelize.QueryTypes.DELETE,
          transaction: transaction
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