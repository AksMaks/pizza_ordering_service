const bcript = require("bcryptjs")
const jwt = require("jsonwebtoken")
const fs = require("fs-extra")
let db = require("../models/index.js");

class controller{
  Get = async (data) => {
    let Response = {}
    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
          `SELECT Id, Name, Image, Weight, Price, Number FROM additive WHERE 1`,
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
    const {Name, Weight, Price, Url} = data
    
    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
        'INSERT INTO `additive`(`Name`, `Image`, `Weight`, `Price`, `Number`) VALUES (?, ?, ?, ?, ?)', 
        {
          replacements: [Name, Url, Weight, Price, 0]
        },
        {
          type: db.sequelize.QueryTypes.INSERT,
          transaction: transaction
        }
      ).then(result => {
        Response.Message = "Запись добавлена"
      }).catch(error => {
        Response.Error = true
        Response.Message = "Запись не добавлена"
      })
    })
    return Response
  }
  Update = async (data) => {
    let Response = {}
    const {Id, Name, Weight, Price, Url} = data
    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
        'UPDATE `additive` SET `Name`=?,`Image`=?,`Weight`=?,`Price`=?,`Number`=? WHERE Id=?', 
        {
          replacements: [Name, Url, Weight, Price, 0, Id]
        },
        {
          type: db.sequelize.QueryTypes.UPDATE,
          transaction: transaction
        }
      ).then(result => {
        if(data.OldImage !== Url) fs.removeSync(data.OldImage)
        
        Response.Message = "Запись изменена"
      }).catch(error => {
        Response.Error = true
        Response.Message = "Запись не изменена"
      })
    })
    return Response
  }
  Delete = async (data) => {
    let Response = {}
    const {Id} = data
    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
        'SELECT Id, Image FROM `additive` WHERE Id = ?',
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
        'DELETE FROM `additive` WHERE Id = ?',
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