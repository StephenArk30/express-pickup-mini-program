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
