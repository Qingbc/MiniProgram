// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  try{
    return await db.collection('wantread').where({
      bookIsbn: event.bookISBN
    }).update({
      data: {
        count: _.inc(1)
      },
    })

  }catch(e){
    console.error(e);
  }
}