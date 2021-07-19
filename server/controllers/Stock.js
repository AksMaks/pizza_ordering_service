const bcript = require("bcryptjs")
const jwt = require("jsonwebtoken")
const fs = require("fs-extra")
let db = require("../models/index.js");

class controller{
  Get = async (data) => {
    let Response = {}
    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
          'SELECT `Id`, `Name`, `DateBegin`, `DateEnd`, `Image`, `PromoCode`, `Uses` FROM `stock` WHERE 1',
        {
          type: db.sequelize.QueryTypes.SELECT,
          transaction: transaction
        }
      ).then(result => {
        Response.Data = result
      })
    })
    return Response
  }
  Insert = async (data) => {
    let Response = {}
    const {Name, DateBegin, DateEnd, Url, PromoCode} = data
    
    
    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
        'INSERT INTO `stock`(`Name`, `DateBegin`, `DateEnd`, `Image`, `PromoCode`) VALUES (?, ?, ?, ?, ?)', 
        {
          replacements: [Name, DateBegin, DateEnd, Url, PromoCode]
        },
        {
          type: db.sequelize.QueryTypes.INSERT,
          transaction: transaction
        }
      ).then(result => {
        Response.Message = "Запись добавлена"
      })
    })
    return Response
  }
  Update = async (data) => {
    let Response = {}
    const {Id, Name, DateBegin, DateEnd, Url, PromoCode} = data

    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
        'UPDATE `stock` SET `Name`=?,`DateBegin`=?,`DateEnd`=?,`Image`=?,`PromoCode`=? WHERE Id=?', 
        {
          replacements: [Name, DateBegin, DateEnd, Url, PromoCode, Id]
        },
        {
          type: db.sequelize.QueryTypes.UPDATE,
          transaction: transaction
        }
      ).then(result => {
        Response.Message = "Запись изменена"
      })
    })
    return Response
  }
  Delete = async (data) => {
    let Response = {}
    const {Id} = data
    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
        'SELECT Id, Image FROM `stock` WHERE Id = ?',
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
        'DELETE FROM `stock` WHERE Id = ?',
        {
          replacements: [Id]
        },
        {
          type: db.sequelize.QueryTypes.DELETE,
        }
      ).then(result => {
        Response.Message = "Запись удалена"
      })
    })
    return Response
  }
}

module.exports = new controller()