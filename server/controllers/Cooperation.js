const bcript = require("bcryptjs")
const jwt = require("jsonwebtoken")
const fs = require("fs-extra")
let db = require("../models/index.js");

class controller{
  Get = async (data) => {
    let Response = {}
    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
        'SELECT `Id`, `Image`, `Link` FROM `cooperation` WHERE 1',
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
    const {Url, Link} = data
    
    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
        'INSERT INTO `cooperation` (`Image`, `Link`) VALUES (?, ?)', 
        {
          replacements: [Url, Link]
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
    const {Id, Url, Link} = data

    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
        'UPDATE `cooperation` SET `Image`=?,`Link`=? WHERE Id=?', 
        {
          replacements: [Url, Link, Id]
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
        'SELECT Id, Image FROM `cooperation` WHERE Id = ?',
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
        'DELETE FROM `cooperation` WHERE Id = ?',
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