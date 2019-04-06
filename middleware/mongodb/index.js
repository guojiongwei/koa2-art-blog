const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./../../config/index.js').mongodb
class Db {
  constructor() {
    this.clientDb = ''
    this.connect()
  }
  static getInstace() {
    if(!Db.instanceof) {
      Db.instanceof = new Db()
    }
    return this.instanceof
  }
  // 连接数据库
  connect() {
    return new Promise((resolve, reject) => {
      if(!this.clientDb) {
        MongoClient.connect(mongodb.dbUrl, (err, client) => {
          if(err) {
            console.log('连接数据库失败')
            reject('连接数据库失败')
          } else {
            console.log('连接数据库成功')
            this.clientDb = client.db(mongodb.dbName)
            resolve(this.clientDb)
          }
        })
      } else {
        resolve(this.clientDb)
      }
    })
  }
  /*
    简单查询数据
    @params 
  */
  find(collection, data, option) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collection).find(data, option).toArray((err, result) => {
          if(err) {
            console.log('查询失败')
            reject(err)
          } else {
            resolve(result)
          }
        })
      }).catch(err => {
        reject(err)
        console.log(err)
      })
    })
  }
  /*
    插入数据
    @parasm collection 数据库集合名称
    @params data 插入的数据
  */
  insert(collection, data) {
    this.connect().then(db => {
      db.collection(collection).insert(data, function(err, data) {
        if(err) {
          console.log('添加失败')
        } else {
          console.log(data, '添加')
        }
      })
    })
  }
}
module.exports = Db.getInstace()