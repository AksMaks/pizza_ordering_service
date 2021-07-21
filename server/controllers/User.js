const bcript = require("bcryptjs")
const jwt = require("jsonwebtoken")
let db = require("../models/index.js");
const {jwtSecret} = require("config")

const createAccessToken = (Id, IdRole) => {
  let  payload = {
    Id: Id,
    IdRole: IdRole
  }
  return jwt.sign(payload, jwtSecret, {expiresIn: "24h"})
}

class controller{
  Get = async (data) => {
    let Response = {}
    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
        'SELECT `Id`, `IdUser`, `Address`, `Name` FROM `user_address` WHERE 1',
        {
          type: db.sequelize.QueryTypes.SELECT,
          transaction: transaction
        }
      ).then(result => {
        Response.Data = {}
        Response.Data.address = result
      })
      await db.sequelize.query(
        'SELECT `Id`, `Name`, `Phone`, `Password`, `IdRole`, `RoleName`, `IdLevel`, `LevelName`, `Сashback`, `Points` FROM `view_user` WHERE 1',
        {
          type: db.sequelize.QueryTypes.SELECT,
          transaction: transaction
        }
      ).then(result => {
        Response.Data.user = result
      })
    })
    return Response
  }
  GetOne = async (data) => {
    let Response = {}
    const {Id} = data.user
    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
        'SELECT `Id`, `IdUser`, `Address`, `Name` FROM `user_address` WHERE IdUser=?',
        {
          replacements: [Id]
        },
        {
          type: db.sequelize.QueryTypes.SELECT,
          transaction: transaction
        }
      ).then(result => {
        Response.Data = {}
        Response.Data.address = result[0][0]
      })
      await db.sequelize.query(
        'SELECT `Id`, `Name`, `Phone`, `Password`, `IdRole`, `RoleName`, `IdLevel`, `LevelName`, `Сashback`, `Points` FROM `view_user` WHERE Id=?',
        {
          replacements: [Id]
        },
        {
          type: db.sequelize.QueryTypes.SELECT,
          transaction: transaction
        }
      ).then(result => {
        Response.Data.user = result[0][0]
      })
    })
    return Response
  }
  Auth = async (data) => {
    let Response = {}
    const {Phone, Password} = data
    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
        'SELECT `Id`, `Name`, `Phone`, `Password`, `IdRole`, `IdLevel`, `Points` FROM `user` WHERE Phone=? LIMIT 1',
        {
          replacements: [Phone]
        },
        {
          transaction: transaction
        }
      ).then(result => {
        console.log(result[0])
        if(result[0][0]["Password"]){
          if(bcript.compareSync(Password, result[0][0]["Password"])){
            Response.Token = createAccessToken(result[0][0]["Id"], result[0][0]["IdRole"])
            Response.UserName = result[0][0]["Name"]
            Response.Message = "Авторизация прошла успешно"
          }else{
            Response.Error = true
            Response.Message = "Неверный пароль"
          }
        }else{
          Response.Error = true
          Response.Message = "Нет такого акаунта"
        }
      })
    })
    return Response
  }
  Insert = async (data) => {
    let Response = {}
    const {Name, Phone, Password, IdRole, IdLevel, Addresses} = data
    let hashPassword = bcript.hashSync(Password, 5)

    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
        'INSERT INTO `user`(`Name`, `Phone`, `Password`, `IdRole`, `IdLevel`, `Points`) VALUES (?, ?, ?, ?, ?, ?)', 
        {
          replacements: [Name, Phone, hashPassword, IdRole, IdLevel, 0]
        },
        {
          type: db.sequelize.QueryTypes.INSERT,
          transaction: transaction
        }
      )
      await db.sequelize.query(
        'SELECT Id FROM user ORDER BY Id DESC LIMIT 1',
        {
          type: db.sequelize.QueryTypes.SELECT,
          transaction: transaction
        }
      ).then(result => {
        let query = "INSERT INTO `user_address`(`IdUser`, `Address`, `Name`) VALUES ";
        Addresses.forEach(el => {
          query += `('${result[0]["Id"]}', '${el.Address}', '${el.Name}'),`
        });
        db.sequelize.query(query.slice(0, -1),
          {
            type: db.sequelize.QueryTypes.Insert,
            transaction: transaction
          }
        ).then(() => {
          Response.Message = "Запись добавлена"
        })
      })
    })
    return Response
  }
  Update = async (data) => {
    let Response = {}
    const {Id, Name, Phone, Password, IdRole, IdLevel, Points, Addresses} = data

    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
        'UPDATE `user` SET `Name`=?,`Phone`=?,`Password`=?,`IdRole`=?,`IdLevel`=?,`Points`=? WHERE Id=?', 
        {
          replacements: [Name, Phone, Password, IdRole, IdLevel, Points, Id]
        },
        {
          type: db.sequelize.QueryTypes.UPDATE,
          transaction: transaction
        }
      )
      let query = `DELETE FROM user_address WHERE IdUser = ${Id}; INSERT INTO user_address (IdUser, Address, Name) VALUES `;
      Addresses.forEach(el => {
        query += `('${Id}', '${el.Address}', '${el.Name}'),`
      });
      await db.sequelize.query(query.slice(0, -1),
        {
          type: db.sequelize.QueryTypes.Insert,
          transaction: transaction
        }
      ).then(() => {
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
        'DELETE FROM `user` WHERE Id = ?',
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