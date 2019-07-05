// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  console.log(context)

  try {
    return await db.collection('user').add({
      data: {
        userid: event.userid,
        username: event.username,
        studentNumber: '',
        studentPassword: '',
        status: 0
      }
    })
  } catch (e) {
    console.log(e)
  }
}