/**
 * 封装云端的api
 * 包括数据库增删查改、文件上传下载
 * */
const envName = 'exp-test-ff1358'; // 环境名

/**
 * 示例：增
 * param:
 * collectionName: collection名
 * data: 要增加的数据
 * */

exports.db_add = function(collectionName, data) {
  wx.cloud.init({
    env: envName
  });
  const db = wx.cloud.database();
  // 为了同步需要使用Promise返回
  return new Promise((resolve, reject) => {
    // collectionName对应collection中增加data
    db.collection(collectionName).add({
      data: data,
      success(res) {
        resolve(res); // 成功返回res
      },
      fail(error) {
        reject(error); // 失败返回error
      }
    });
  });
};

exports.db_del = function() {
  // 删
};

exports.db_get = function() {
  // 查
  return new Promise((resolve, reject) => {
    wx.cloud.init({
      env: 'exp-test-ff1358'
    });
    // 1. 获取数据库引用
    const db = wx.cloud.database();
    // 2. 构造查询语句
    // collection 方法获取一个集合的引用
    // where 方法传入一个对象，数据库返回集合中字段等于指定值的 JSON 文档。API 也支持高级的查询条件（比如大于、小于、in 等），具体见文档查看支持列表
    // get 方法会触发网络请求，往数据库取数据
    db.collection('test').where({
      name: 'ark'
    }).get({
      success(res) {
        console.log(res);
        resolve(res.data);
      },
      fail(error) {
        reject(error);
      }
    })
  })
};

exports.db_edit = function () {
  // 改
};

// 上传文件
exports.upload_file = function (f) {
  // cloudPath: 上传到云后的文件名（路径）
  // filePath: 本地文件临时链接（wx.chooseImage接口提供）
  wx.cloud.uploadFile({
    cloudPath: "example2.png",
    filePath: f
  }).then(res => {
    console.log(res);
  });
};

// 下载文件
exports.download_file = function () {
  // 获取文件的临时链接
  // fileList是要获取的文件列表，内容是云上的链接
  wx.cloud.getTempFileURL ({
    fileList: [
      'cloud://exp-test-ff1358.6578-exp-test-ff1358/example.png'
    ]
  }).then(res => {
    console.log(res.fileList[0].tempFileURL);
  }).catch(err => {
    console.log(then);
  })
};