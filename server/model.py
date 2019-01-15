"""
user: 用户;
express: 快递;
"""

from ext import db


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    school = db.Column(db.Integer, nullable=False)
    card_id = db.Column(db.String(12), nullable=False)
    wechat_id = db.Column(db.String(50), nullable=False)

    # 常用信息
    name = db.Column(db.String(15), nullable=True)  # 收件人
    station = db.Column(db.Integer, nullable=True)  # 快递站
    destination = db.Column(db.Integer, nullable=True)  # 目的地
    tele = db.Column(db.String(15), nullable=True)  # 电话
    wechat = db.Column(db.String(20), nullable=True)  # 微信
    qq = db.Column(db.String(15), nullable=True)  # QQ


    # 认证方式
    # 0：实名认证；1：交押金
    # identified = db.Column(db.Integer, nullable=False)
    # credit = db.Column(db.Integer, nullable=False)  # 信用分


express_user = db.Table('express_user',
                        db.Column('express_id',db.Integer,db.ForeignKey('express.id'), primary_key=True),
                        db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True)
        )


class Express(db.Model):
    __tablename__ = 'express'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    owner_id = db.Column(db.Integer, nullable=False)  # 此快递的主人
    taker_id = db.Column(db.Integer, nullable=True)  # 此快递的代拿人
    users = db.relationship('User', secondary=express_user, backref=db.backref('expresses'))  # 此快递有关的用户

    # 首页显示内容
    ownername = db.Column(db.String(20), nullable=False)
    starting = db.Column(db.String(20), nullable=False)
    destination = db.Column(db.String(30), nullable=False)
    payment = db.Column(db.Integer, nullable=False)
    tips = db.Column(db.String(15), nullable=False)

    # 详情页显示内容
    express_id = db.Column(db.String(20), nullable=False)  # 快递单号
    destination_detail = db.Column(db.String(20), nullable=True)  # 详细地址，选填
    weight = db.Column(db.String(20), nullable=True)  # 重量，选填
    size = db.Column(db.String(20), nullable=True)  # 大小，选填
    tips_detail = db.Column(db.Text, nullable=True)  # 备注，选填

    # 确认代拿后显示
    # 联系方式
    #  owner:
    tele_o = db.Column(db.String(11), nullable=True)
    wechat_o = db.Column(db.String(20), nullable=True)
    qq_o = db.Column(db.String(20), nullable=True)
    #  taker:
    tele_t = db.Column(db.String(11), nullable=True)
    wechat_t = db.Column(db.String(20), nullable=True)
    qq_t = db.Column(db.String(20), nullable=True)

    # 发布、代拿、预计送达时间
    time_publish = db.Column(db.String(20), nullable=False)
    time_take = db.Column(db.String(20), nullable=True)
    time_handover = db.Column(db.String(20), nullable=True)

    # 状态：0：等待代拿；1：在路上；2：等待支付
    state = db.Column(db.Integer, nullable=False)
