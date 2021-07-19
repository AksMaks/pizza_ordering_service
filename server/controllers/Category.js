const bcript = require("bcryptjs")
const jwt = require("jsonwebtoken")
let db = require("../models/index.js");

class controller{
  Get = async (data) => {
    let Response = {}
    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
          `
          SELECT * 
          FROM category 
          WHERE 1`,
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
    const {Name} = data

    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
        'INSERT INTO `category` (`Name`) VALUES (?)', 
        {
          replacements: [Name]
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
    const {Id, Name} = data

    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
        'UPDATE `category` SET `Name`=? WHERE Id = ?', 
        {
          replacements: [Name, Id]
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
        'DELETE FROM `category` WHERE Id = ?',
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