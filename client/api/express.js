/**
 * 封装快递api
 * 包括express collection的增删查改等
 * */
const cloud_api = require('cloud_api');

/**
 * 示例：新增快递
 * */
exports.addExp = function(exp) {
  console.log("adding express:", exp);
  let exp_data = {
    owner_id: exp.owner_id,
    starting: exp.start,
    destination: exp.dest,
    destination_detail: exp.dest_d,
    payment: exp.pay,
    ownername: exp.anoy ? exp.owner[0] + '同学' : exp.owner,
    express_id: exp.e_id,
    tips: exp.tips, tips_detail: exp.tips_d,
    size: exp.size,
    weight: exp.weight,
    tele_o: exp.tele, wechat_o: exp.wechat, qq_o: exp.qq,
    time_publish: new Date(),
    state: 0
  };
  return cloud_api.db_add('express', exp_data);
};

/**
 * 修改快递
 * */
exports.editExp = function (_id, exp) {
  console.log("editing express " + _id + ":", exp);
  let exp_data = {
    owner_id: exp.owner_id,
    starting: exp.start,
    destination: exp.dest,
    destination_detail: exp.dest_d,
    payment: exp.pay,
    ownername: exp.anoy ? exp.owner[0] + '同学' : exp.owner,
    express_id: exp.e_id,
    tips: exp.tips, tips_detail: exp.tips_d,
    size: exp.size,
    weight: exp.weight,
    tele_o: exp.tele, wechat_o: exp.wechat, qq_o: exp.qq,
    time_publish: new Date(),
    state: 0
  };
  return cloud_api.db_edit('express', _id, exp_data);
};

/**
 * 获取所有待代拿快递
 */
exports.getAllExp = function () {
  return cloud_api.db_get('express', { state: 0 });
}

/**
 * 根据id查找快递
 */
exports.getExpByID = function (_id) {
  return cloud_api.db_get('express', { _id });
}

/**
 * 根据userID查找发布的快递
 */
exports.getExpByOwnerID = function (user_id) {
  return cloud_api.db_get('express',
    { owner_id: user_id }
  );
}

/**
 * 根据userID查找代拿的快递
 */
exports.getExpByTakerID = function (user_id) {
  return cloud_api.db_get('express',
    { taker_id: user_id }
  );
}

/**
 * 修改快递状态
 */
exports.editExpStatus = function (_id, state) {
  return cloud_api.db_edit('express', _id, { state });
}

/**
 * 代拿快递
 */
exports.takeExp = function (_id, take_data) {
  return cloud_api.db_edit('express', _id, take_data);
}

/**
 * 删除快递
 */
exports.deleteExp = function (_id) {
  return cloud_api.db_del('express', { _id });
}