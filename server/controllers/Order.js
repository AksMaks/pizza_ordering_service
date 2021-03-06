const bcript = require("bcryptjs")
const jwt = require("jsonwebtoken")
let db = require("../models/index.js");

class controller{IdUser
  GetAll = async (data) => {
    let Response = {}
    const {IdUser} = data

    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
        `SELECT Id, IdUser, Date, Points, Payment, Sum FROM order_data WHERE 1`,
        {
          type: db.sequelize.QueryTypes.SELECT,
          transaction: transaction
        }
      ).then(result => {
        Response.Data = {}
        Response.Data.Orders = result
      })
      await db.sequelize.query(
        `SELECT Id, IdOrder, Name, Additives, Number, Price FROM composition_order WHERE 1`,
        {
          type: db.sequelize.QueryTypes.SELECT,
          transaction: transaction
        }
      ).then(result => {
        Response.Data.Composition = result
      })
    })
    return Response
  }
  Get = async (data) => {
    let Response = {}
    const {IdUser} = data

    await db.sequelize.transaction(async  transaction => {
      await db.sequelize.query(
        `SELECT Id, IdUser, Date, Points, Payment, Sum FROM order_data WHERE IdUser = ?`,
        {
          replacements: [IdUser]
        },
        {
          type: db.sequelize.QueryTypes.SELECT,
          transaction: transaction
        }
      ).then(result => {
        Response.Data = {}
        Response.Data.Orders = result[0]
      })
      await db.sequelize.query(
        `SELECT Id, IdOrder, Name, Additives, Number, Price FROM composition_order WHERE 1`,
        {
          type: db.sequelize.QueryTypes.SELECT,
          transaction: transaction
        }
      ).then(result => {
        Response.Data.Composition = result
      })
    })
    return Response
  }
  Insert = async (data) => {
    let Response = {}
    const {IdUser, Date, Address, Type, Comment, Phone, Status, Points, Payment, Sum, Composition} = data
    
    await db.sequelize.transaction(async  transaction => {
    
      await db.sequelize.query(
        'INSERT INTO `order_data`(`IdUser`, `Date`, `Points`, `Payment`, `Sum`) VALUES (?, ?, ?, ?, ?)', 
        {
          replacements: [IdUser, Date, Points, Payment, Sum]
        },
        {
          type: db.sequelize.QueryTypes.INSERT,
          transaction: transaction
        }
      )
      await db.sequelize.query(
        'UPDATE `user` SET `Points`=`Points` + ? WHERE `Id` = ?', 
        {
          replacements: [Points, IdUser]
        },
        {
          type: db.sequelize.QueryTypes.UPDATE,
          transaction: transaction
        }
      ).then(() => {
        let points, level;
        db.sequelize.query(`
          SELECT SUM(Sum) AS SUM FROM order_data WHERE IdUser = ?; 
          SELECT user.IdLevel, user.Points, level.Border
            FROM user 
            LEFT JOIN level on level.Id = user.IdLevel   
            WHERE user.Id = ?; 
          SELECT Id, Border FROM level WHERE 1`, 
          {
            replacements: [IdUser, IdUser]
          },
          {
            type: db.sequelize.QueryTypes.SELECT,
            transaction: transaction
          }
        ).then((res) => {
          let SUM = res[0][0][0].SUM
          let user = res[0][1][0]
          let level = res[0][2]

          if(Number(SUM) > Number(user.Border)){
            let ind = level.findIndex(el => user.IdLevel == el.Id)
            if(ind < level.length-1){
              db.sequelize.query(
                'UPDATE `user` SET `IdLevel`= ? WHERE `Id` = ?', 
                {
                  replacements: [level[ind+1].Id, IdUser]
                },
                {
                  type: db.sequelize.QueryTypes.UPDATE,
                  transaction: transaction
                }
              )
              console.log("up level")
            }
          }
        })
      })
      await db.sequelize.query(
        'SELECT Id FROM order_data ORDER BY Id DESC LIMIT 1',
        {
          type: db.sequelize.QueryTypes.SELECT,
          transaction: transaction
        }
      ).then(result => {
        let query = "INSERT INTO `composition_order`(`IdOrder`, `Name`, `Additives`, `Number`, `Price`) VALUES ";
        Composition.forEach(el => {
          query += `('${result[0]["Id"]}', '${el.Name}', '${el.Additives}', '${el.Number}', '${el.Price}'),`
        });
        db.sequelize.query(query.slice(0, -1),
          {
            type: db.sequelize.QueryTypes.Insert,
            transaction: transaction
          }
        )
      })
    }).then(result => {
      var axios = require('axios');
      var data = JSON.stringify({
        "chat_id": "-730580921",
        "parse_mode": "html",
        "text": `
?????????? ?????????? ?????????? ????????????????????:
??????????: ${Type}
??????????: ${Address.Street}
??????: ${Address.House}
????????????????: ${Address.Apartment}
??????????????: ${Address.Entrance}
????????: ${Address.Floor}
??????????????: ${Phone}
??????????????????????: ${Comment}

??????????: 
${Composition.map(el => `${el.Number} ${el.Name} ${el.Additives == ""? "":`\n+ ??????. ??????????????: \n${el.Additives}`}`).join("\n\n")}

???????? ????????????: ${Sum} ????????????
${Type == "????????????????", "???????? ????????????????: 55 ????????????"}
???????????? ????????????: ${Status}
`
      });

      var config = {
        method: 'post',
        url: 'https://api.telegram.org/bot5236545440:AAGRpJVDCz2XDObJbiHJ8kNb0U3JkNCpq6E/sendMessage',
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

      Response.Message = "???????????? ??????????????????"
    }).catch(error => {
      Response.Error = true
      Response.Message = "???????????? ???? ??????????????????"
    })

    return Response
  }
}
module.exports = new controller()