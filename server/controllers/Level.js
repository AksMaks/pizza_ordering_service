const bcript = require("bcryptjs")
const jwt = require("jsonwebtoken")
let db = require("../models/index.js");

class controller{
  Get = async (data) => {
    let Response = {}
    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
        'SELECT `Id`, `Name`, `Сashback`, `Border` FROM `level` WHERE 1',
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
    const {Name, Сashback, Border} = data

    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
        'INSERT INTO `level`(`Name`, `Сashback`, `Border`) VALUES (?, ?, ?)', 
        {
          replacements: [Name, Сashback, Border]
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
    const {Id, Name, Сashback, Border} = data

    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
        'UPDATE `level` SET `Name`=?,`Сashback`=?,`Border`=? WHERE Id = ?', 
        {
          replacements: [Name, Сashback, Border, Id]
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
        'DELETE FROM `level` WHERE Id = ?',
        {
          replacements: [Id]
        },
        {
          type: db.sequelize.QueryTypes.DELETE,
        }
      ).then(result => {
        console.log(result)
        Response.Message = "Запись удалена"
      })
    })
    return Response
  }
}
module.exports = new controller()