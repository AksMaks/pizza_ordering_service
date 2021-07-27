const bcript = require("bcryptjs")
const jwt = require("jsonwebtoken")
let db = require("../models/index.js");

class controller {
  Get = async (data) => {
    let Response = {}
    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
          'SELECT `Id`, `Address`, `DeliveryArea`, `Begin`, `End` FROM `branch` WHERE 1',
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
    const {Address, DeliveryArea, Begin, End} = data

    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
        'INSERT INTO `branch`(`Address`, `DeliveryArea`, `Begin`, `End`) VALUES (?, ?, ?, ?)', 
        {
          replacements: [Address, DeliveryArea, Begin, End]
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
    const {Id, Address, DeliveryArea, Begin, End} = data

    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
        'UPDATE `branch` SET `Address`=?,`DeliveryArea`=?,`Begin`=?,`End`=? WHERE Id = ?', 
        {
          replacements: [Address, DeliveryArea, Begin, End, Id]
        },
        {
          type: db.sequelize.QueryTypes.UPDATE,
          transaction: transaction
        }
      ).then(result => {
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
        'DELETE FROM `branch` WHERE Id = ?',
        {
          replacements: [Id]
        },
        {
          type: db.sequelize.QueryTypes.DELETE,
        }
      ).then(result => {
        Response.Message = "Запись удалена"
      }).catch(error => {
        Response.Error = true
        Response.Message = "Запись не удалена"
      })
    })
    return Response
  }
}

module.exports = new controller()