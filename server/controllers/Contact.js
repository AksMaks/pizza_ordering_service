const bcript = require("bcryptjs")
const jwt = require("jsonwebtoken")
const fs = require("fs-extra")
let db = require("../models/index.js");

class controller{
  Get = async (data) => {
    let Response = {}
    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
        'SELECT `Id`, `Icon`, `Text`, `Link`, `Description` FROM `contact` WHERE 1',
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
    const {Url, Text, Link, Description} = data
    
    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
        'INSERT INTO `contact` (`Icon`, `Text`, `Link`, `Description`) VALUES (?, ?, ?, ?)', 
        {
          replacements: [Url, Text, Link, Description]
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
    const {Id, Url, Text, Link, Description} = data

    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
        'UPDATE `contact` SET `Icon`=?,`Text`=?,`Link`=?,`Description`=? WHERE Id=?', 
        {
          replacements: [Url, Text, Link, Description, Id]
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
        'SELECT Id, Icon FROM `contact` WHERE Id = ?',
        {
          replacements: [Id]
        },
        {
          type: db.sequelize.QueryTypes.SELECT,
          transaction: transaction
        }
      ).then(result => {
        fs.removeSync(result[0][0]["Icon"])
      })
      await db.sequelize.query(
        'DELETE FROM `contact` WHERE Id = ?',
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