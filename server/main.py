from flask import Flask, request, json
import requests
import sys
from time import localtime, strftime
from ext import db
from model import User, Express
import config

app = Flask(__name__)
app.config.from_object(config)
db.init_app(app)


# 获取用户open_id
@app.route('/get_user_id', methods=['GET'])
def get_user_id():
    appid = 'wx93c782b99fb516ed'  # 填写微信小程序appid
    secret = '6fe6b1ac666adfd7aafb4862512f002e'  # 填写微信小程序secretKey
    code = request.args.get('code')
    # print(code)
    url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid\
          + '&secret=' + secret + '&js_code=' + code\
          + '&grant_type=authorization_code'  # 访问这个url，可以获取用户信息
    res = requests.get(url).json()
    # print(res)
    openid = res['openid']
    # print(openid, type(openid))

    if User.query.filter(User.wechat_id == openid).first():
        user = User.query.filter(User.wechat_id == openid).first()
        user_id = user.id
    else:
        user_id = -1
    # print(user_id)
    res = {
        'user_id': user_id,
        'open_id': openid
    }
    return json.dumps(res)


# 获取全部的快递（首页的简略信息）
@app.route('/get_express', methods=['GET'])
def get_express():
    expresses = Express.query.all()
    exp = []
    # print('expresses: ', expresses)

    for i in expresses:
        if i.state == 0:
            temp = {
                'id': i.id,
                'name': i.ownername,
                'starting':  i.starting,
                'dest':  i.destination,
                'pay':  i.payment,
                'tips':  i.tips,
            }
            exp.append(temp)  # json.dumps(temp)
    # print(exp)
    return json.dumps(exp)


# 获取与用户有关的快递
@app.route('/get_my_express', methods=['GET'])
def get_my_express():
    user_id = request.args.get('user_id')
    if user_id == '':
        return 'failed'
    user = User.query.filter(User.id == user_id).first()
    if not user:
        return 'failed'
    express = user.expresses
    express_publish = []
    express_take = []
    for e in express:
        temp = {
            'id': e.id,
            'e_id': e.express_id,
            'pay': e.payment,
            'start': e.starting,
            'dest': e.destination,
            'dest_d': e.destination_detail,
            'time_p': e.time_publish
        }
        if e.owner_id == user.id:
            express_publish.append(temp)
        if e.taker_id == user.id:
            temp['time_t'] = e.time_take
            express_take.append(temp)
    eps = {
        'express_publish': express_publish,
        'express_take': express_take
    }
    print(eps)
    return json.dumps(eps)


# 获取快递详细信息
@app.route('/get_express_d', methods=['GET'])
def get_express_d():
    express = Express.query.filter(Express.id == request.args.get('id')).first()
    print(express)
    eps = {
        'id': express.id,
        'owner_id': express.owner_id,
        'name': express.ownername,
        'starting': express.starting,
        'dest': express.destination,
        'dest_d': express.destination_detail,
        'pay': express.payment,
        'exp_id': express.express_id,
        'weight': express.weight,
        'size': express.size,
        'tips': express.tips,
        'tips_d': express.tips_detail,
        'tele': express.tele_o,
        'wechat': express.wechat_o,
        'qq': express.qq_o,
        'state': express.state
    }
    if User.query.filter(User.id == express.taker_id).first():
        user = User.query.filter(User.id == express.taker_id).first()
        taker = {
            'card_id': user.card_id,
            'tele': express.tele_t,
            'wechat': express.wechat_t,
            'qq': express.qq_t,
            'time': express.time_handover
        }
        eps['taker'] = taker
    return json.dumps(eps)


# 代拿此快递，修改快递状态
@app.route('/take_express', methods=['POST'])
def take_express():
    form = request.json
    express = Express.query.filter(Express.id == form['id']).first()
    user = User.query.filter(User.id == form['taker_id']).first()
    express.taker_id = user.id
    express.tele_t = form['tele']
    express.wechat_t = form['wechat']
    express.qq_t = form['qq']
    express.time_handover = form['time_handover']
    express.time_take = strftime("%H:%M:%S", localtime())
    express.state = 1
    user.expresses.append(express)
    db.session.commit()

    return '200'


# 添加快递
@app.route('/add_express', methods=['GET', 'POST'])
def add_express():
    if request.method == 'GET':
        user_id = request.args.get('user_id')
        user = User.query.filter(User.id == user_id).first()
        usr = {
            'stat': user.station,
            'dest': user.destination,
            'name': user.name,
            'tele': user.tele,
            'wechat': user.wechat,
            'qq': user.qq
        }
        print(usr)
        return json.dumps(usr)
    else:
        form = request.json
        print('form: ', type(form), form)
        owner_id = form['owner_id']
        user = User.query.filter(User.id == owner_id).first()
        print(type(user), user)
        anoy = form['anoy']
        owner = form['owner']
        if anoy:
            owner = owner[0] + '同学'
            print(owner)

        express = Express(owner_id=owner_id,
                          starting=form['start'],
                          destination=form['dest'], destination_detail=form['dest_d'],
                          payment=form['pay'],
                          ownername=owner,
                          express_id=form['e_id'],
                          tips=form['tips'], tips_detail=form['tips_d'],
                          size=form['size'],
                          weight=form['weight'],
                          tele_o=form['tele'], wechat_o=form['wechat'], qq_o=form['qq'],
                          time_publish=strftime("%H:%M:%S", localtime()),
                          state=0
                          )
        user.expresses.append(express)
        db.session.add(express)
        db.session.commit()
        return '200'


# 修改快递
@app.route('/edit_express', methods=['POST'])
def edit_express():
    form = request.json
    print('form: ', type(form), form)
    id = form['id']
    exp = Express.query.filter(Express.id == id).first()
    print(type(exp), exp)
    anoy = form['anoy']
    owner = form['owner']
    if anoy:
        owner = owner[0] + '同学'
        print(owner)

    exp.starting = form['start']
    exp.destination = form['dest']
    exp.destination_detail = form['dest_d']
    exp.payment = form['pay']
    exp.ownername = owner
    exp.express_id = form['e_id']
    exp.tips = form['tips']
    exp.tips_detail = form['tips_d']
    exp.size = form['size']
    exp.weight = form['weight']
    exp.tele_o = form['tele']
    exp.wechat_o = form['wechat']
    exp.qq_o = form['qq']

    db.session.commit()
    return '200'


# 确认收到快递，修改快递状态
@app.route('/express_confirm', methods=['GET'])
def express_confirm():
    eps_id = request.args.get('id')
    eps = Express.query.filter(Express.id == eps_id).first()
    print(eps)
    eps.state += 1
    if eps.state == 3:
        db.session.delete(eps)
    db.session.commit()
    return '200'


# 删除快递
@app.route('/express_del', methods=['GET'])
def express_del():
    eps_id = request.args.get('id')
    eps = Express.query.filter(Express.id == eps_id).first()
    print(eps)
    db.session.delete(eps)
    db.session.commit()
    return '200'


# 注册
@app.route('/register', methods=['POST'])
def register():
    form = request.json
    print(form, type(form))
    wechat_id = form['wechat_id']
    school = form['school']
    card_id = form['card_id']
    print(sys.getsizeof(wechat_id))

    have_res = 0
    user_id = -1
    if User.query.filter(User.card_id == card_id).first():
        have_res = 1
    else:
        user = User(wechat_id=wechat_id, school=school, card_id=card_id)
        db.session.add(user)
        db.session.commit()
        user_id = User.query.filter(User.wechat_id == wechat_id).first().id

    res = {
        'user_id': user_id,
        'have_res': have_res
    }

    return json.dumps(res)


# 获取用户默认信息
@app.route('/get_user', methods=['GET'])
def get_user():
    user_id = request.args.get('user_id')
    print('user\'s id: ', user_id)
    user = User.query.filter(User.id == user_id).first()
    print(user)
    usr = {
        'id': user_id,
        'school': user.school,
        'tele': user.tele,
        'card_id': user.card_id,
        'name': user.name,
        'station': user.station,
        'destination': user.destination,
        'wechat': user.wechat,
        'qq': user.qq
    }
    print(usr)
    return json.dumps(usr)


# 编辑用户信息
@app.route('/edit_user', methods=['POST'])
def edit_user():
    form = request.json
    print(form, type(form))

    user = User.query.filter(User.id == form['user_id']).first()
    user.name = form['name']
    user.school = form['school']
    user.card_id = form['card_id']
    user.tele = form['tele']
    user.wechat = form['wechat']
    user.qq = form['qq']
    user.station = form['stat']
    user.destination = form['dest']
    db.session.commit()

    return '200'


if __name__ == '__main__':
    app.run()
