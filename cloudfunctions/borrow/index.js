// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    await db.collection('borrow').add({
      data: {
        bookIsbn: event.bookISBN,
        userId: event.userID,
        bookImg: event.bookIMG,
        bookTitle: event.bookTITLE,
        bookAuthor: event.bookAUTHOR,
        //图书状态：1表示借阅，2表示归还
        status: 1
      }
    }),

      await db.collection('book').where({
        bookIsbn: event.bookISBN
      }).update({
        data: {
          bookCanborrow: _.inc(-1)
        }
      })
  } catch (e) {
    console.error(e);
  }

  return {
    event: event
  }
}