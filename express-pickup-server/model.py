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


class Express(db.Model):
    __tablename__ = 'express'
    id = db.Column(db.Integer, primary_key = True, autoincrement=True)
    # 首页显示内容
    starting = db.Column(db.String(20),nullable=False)
    destination = db.Column(db.String(10),nullable=False)
    payment = db.Column(db.Integer,nullable=False)
    # 详情页显示内容
    
