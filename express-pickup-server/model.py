from ext import db

'''
user: 用户;
express: 快递;
'''


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    username = db.Column(db.String(10),nullable=False)
    password = db.Column(db.String(20),nullable=False)
    card_id = db.Column(db.Integer,nullable=False)
    wechat_id = db.Column(db.String(20),nullable=False)
    tele = db.Column(db.String(15),nullable=False)
    # 认证方式
    # 0：实名认证；1：交押金
    identified = db.Column(db.Integer,nullable=False)
    credit = db.Column(db.Integer,nullable=False)  # 信用分


class Express(db.Model):
    __tablename__ = 'express'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    # 对此快递的主人和对主人发布的快递
    owner = db.relationship('User',backref=db.backref('expresses_publish'))
    # 对此快递的代拿人和对代拿人的接手的快递
    taker = db.relationship('User',backref=db.backref('expresses_taken'))

    # 首页显示内容
    username = db.Column(db.String(20),nullable=False)
    starting = db.Column(db.String(20),nullable=False)
    destination = db.Column(db.String(10),nullable=False)
    payment = db.Column(db.Integer,nullable=False)

    # 详情页显示内容
    express_id = db.Column(db.String(20),nullable=False)  # 快递单号
    destination_detail = db.Column(db.String(20),nullable=True)  # 详细地址，选填
    weight = db.Column(db.String(20),nullable=True)  # 重量，选填
    size = db.Column(db.String(20),nullable=True)  # 大小，选填
    tips_detail = db.Column(db.String(20),nullable=True)  # 备注，选填

    # 确认代拿后显示
    real_name = db.Column(db.String(20),nullable=True)  # 真实姓名，选填

    # 联系方式种类，选填
    #  0：电话；1：微信 ；2：QQ；3：其它
    contract_type = db.Column(db.Integer, nullable=True)
    contract_method = db.Column(db.String(20),nullable=True)  # 具体联系方式，选填
    time_handover = db.Column(db.String(20),nullable=True)

