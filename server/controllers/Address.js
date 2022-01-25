const bcript = require("bcryptjs")
const jwt = require("jsonwebtoken")
let db = require("../models/index.js");

class controller {
  GetAll = async (data) => {
    let Response = {}
    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
          `
          SELECT * 
          FROM user_address 
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
  Get = async (data) => {
    let Response = {}
    const {IdUser} = data
    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
          `
          SELECT Id, IdUser, Address, Name 
          FROM user_address 
          WHERE IdUser = ?`,
          {
            replacements: [IdUser]
          },
          {
          type: db.sequelize.QueryTypes.SELECT,
          transaction: transaction
        }
      ).then(result => {
        Response.Data = result[0]
      })
    })
    return Response
  }
  Insert = async (data) => {
    let Response = {}
    const {IdUser, Address, Name} = data

    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
        'INSERT INTO `user_address` (`IdUser`, `Address`, `Name`) VALUES (?, ?, ?)', 
        {
          replacements: [IdUser, Address, Name]
        },
        {
          type: db.sequelize.QueryTypes.INSERT,
          transaction: transaction
        }
      )
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
    const {Id, Address, Name} = data

    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
        'UPDATE `user_address` SET `Address`=?, `Name`=? WHERE Id = ?', 
        {
          replacements: [Address, Name, Id]
        },
        {
          type: db.sequelize.QueryTypes.UPDATE,
          transaction: transaction
        }
      )
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
        'DELETE FROM `user_address` WHERE Id = ?',
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