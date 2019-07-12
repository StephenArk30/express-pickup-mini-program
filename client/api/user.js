const cloud_api = require('cloud_api');

/**
 * 根据id查找用户
 */
exports.getUserByID = function (_id) {
  return cloud_api.db_get('user', { _id });
}

/**
 * 用户注册
 */
exports.addUser = function (user) {
  return new Promise((resolve, reject) => {
    cloud_api.db_get('user', { card_id: user.card_id }).then(user => {
      console.log(user);
      reject("user exist");
    })
    .catch(err => {
      cloud_api.db_add('user', user)
        .then(res => resolve(res))
        .catch(e => reject(e));
    });
  });
}

/**
 * 修改用户信息
 */
exports.editUser = function (_id, user) {
  return cloud_api.db_edit('user', _id, user);
}

/**
 * 根据openid查找用户
 */
exports.getUserByOpenID = function (_openid) {
  return cloud_api.db_get('user', { _openid });
}