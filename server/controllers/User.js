const bcript = require("bcryptjs")
const jwt = require("jsonwebtoken")
let db = require("../models/index.js");
const {jwtSecret} = require("config");
const axios = require("axios")

const REFPOINTS = 500

const createAccessToken = (Id, IdRole) => {
  let  payload = {
    Id: Id,
    IdRole: IdRole
  }
  return jwt.sign(payload, jwtSecret, {expiresIn: "24h"})
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
const GoCode = (Phone, code) => {
  var axios = require('axios');
  var data = JSON.stringify({
    "apiKey": "VXA3Pjf9wM4rtbwR4L8Doftq4atfKbKB5iPIZqMbbetYoZppoToJseyeapEv",
    "sms": [
      {
        "channel": "char",
        "phone": Phone,
        "text": "Код подтверждения: "+code+". Никому его не сообщайте.",
        "sender": "VIRTA"
      }
    ]
  });

  var config = {
    method: 'post',
    url: 'https://admin.p1sms.ru/apiSms/create',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };

  axios(config)
  .then(function (response) {
  })
  .catch(function (error) {
  });
}

class controller{
  Get = async (data) => {
    let Response = {}
    const {user} = data
    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
        'SELECT `Id`, `IdUser`, `Address`, `Name` FROM `user_address` WHERE 1',
        {
          type: db.sequelize.QueryTypes.SELECT,
          transaction: transaction
        }
      ).then(result => {
        Response.Data = {}
        Response.Data.Address = result
      })
      await db.sequelize.query(
        `SELECT user.Id AS Id,
                user.Name AS Name,
                user.Phone AS Phone,
                user.Password AS Password,
                user.IdRole AS IdRole,
                role.Name AS RoleName,
                user.IdLevel AS IdLevel,
                level.Name AS LevelName,
                level.Сashback AS Сashback,
                user.Points AS Points 
          FROM user 
          LEFT JOIN role on role.Id = user.IdRole 
          LEFT JOIN level on level.Id = user.IdLevel 
          where user.Id != ?`,
        {
          replacements: [user.Id],
          type: db.sequelize.QueryTypes.SELECT,
          transaction: transaction
        }
      ).then(result => {
        console.log({result: result})
        Response.Data.Users = result
      })
    })
    return Response
  }
  GetOne = async (data) => {
    let Response = {}
    const {Id} = data
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
        Response.Data.Address = result[0][0]
      })
      await db.sequelize.query(
        'SELECT `Id`, `Name`, `Phone`, `Password`, `IdRole`, `IdLevel`, `Points` FROM `user` WHERE Id=?',
        {
          replacements: [Id]
        },
        {
          type: db.sequelize.QueryTypes.SELECT,
          transaction: transaction
        }
      ).then(result => {
        Response.Data.Users = result[0][0]
      })
    })
    return Response
  }
  GetCode = async (data) => {
    let Response = {}
    const {Phone} = data
    //let code = Math.round(Math.random() * (9999 - 1000) + 1000).toString()
    let code = 1234
    let hashPassword = bcript.hashSync(code, 5)
    
    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
        'UPDATE `user` SET `Password`=? WHERE Phone=?',
        {
          replacements: [hashPassword, Phone]
        },
        {
          type: db.sequelize.QueryTypes.UPDATE,
          transaction: transaction
        }
      ).then(result => {
        if(result[0]["changedRows"] == 0){
          this.Insert(
            {
              Name: "Name", 
              Phone: Phone, 
              Password: hashPassword
            }
          )
          GoCode()
        }
      })
    }).then(result => {
      Response.Message = "Запись изменена"
      GoCode(Phone, code)
    }).catch(error => {
      Response.Error = true
      Response.Message = "Запись изменена"
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
            Response.Id = result[0][0]["Id"]
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
  RefReg = async (data) => {
    let Response = {}
    const {Phone, PhoneRef} = data
    const IdRole = 1
    let code = Math.round(Math.random() * (9999 - 1000) + 1000).toString()
    let hashPassword = bcript.hashSync(code, 5)

    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
        'SELECT `Id` FROM `user` WHERE Phone = ?', 
        {
          replacements: [PhoneRef]
        },
        {
          type: db.sequelize.QueryTypes.SELECT,
          transaction: transaction
        }
      ).then(res => {
        console.log(res[0][0]["Id"])
        if(!!res[0][0]["Id"]){
          db.sequelize.query(
            'INSERT INTO `user`(`Name`, `Phone`, `Password`, `IdRole`, `IdLevel`, `Points`) VALUES (?, ?, ?, ?, ?, ?); UPDATE `user` SET `Points`=`Points` + ? WHERE Id = ?', 
            {
              replacements: ["Name", Phone, hashPassword, IdRole, 1, REFPOINTS, REFPOINTS, res[0][0]["Id"]]
            },
            {
              type: db.sequelize.QueryTypes.INSERT,
              transaction: transaction
            }
          )
        }
      })
    }).then(result => {
      Response.Message = "Запись добавлена"
      GoCode(Phone, code)
    }).catch(error => {
      Response.Error = true
      Response.Message = "Запись не добавлена"
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
          replacements: [Name, Phone, hashPassword, IdRole, 1, 0]
        },
        {
          type: db.sequelize.QueryTypes.INSERT,
          transaction: transaction
        }
      )
    }).then(result => {
      Response.Message = "Запись добавлена"
      GoCode(Phone, Password)
    }).catch(error => {
      Response.Error = true
      Response.Message = "Запись не добавлена"
    })
    
    return Response
  }
  Update = async (data) => {
    let Response = {}
    const {Id, Name, Phone, Password, IdRole, IdLevel, Points, Addresses} = data
    let hashPassword = bcript.hashSync(Password, 5)

    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
        'UPDATE `user` SET `Name`=?,`Phone`=?,`Password`=?,`IdRole`=?,`IdLevel`=?,`Points`=? WHERE Id=?', 
        {
          replacements: [Name, Phone, hashPassword, IdRole, IdLevel, Points, Id]
        },
        {
          type: db.sequelize.QueryTypes.UPDATE,
          transaction: transaction
        }
      )
      /*
      let query = `DELETE FROM user_address WHERE IdUser = ${Id}; INSERT INTO user_address (IdUser, Address, Name) VALUES `;
      Addresses.forEach(el => {
        query += `('${Id}', '${el.Address}', '${el.Name}'),`
      });
      await db.sequelize.query(query.slice(0, -1),
        {
          type: db.sequelize.QueryTypes.Insert,
          transaction: transaction
        }
      )
      */
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
        'DELETE FROM `user` WHERE Id = ?',
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