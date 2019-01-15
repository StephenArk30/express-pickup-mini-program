from datetime import timedelta

DEBUG = True

#DIALECT = 'mysql'
#DRIVER = 'pymysql'
#USERNAME = 'root'
#PASSWORD = '19981114'
#HOST = '127.0.0.1'
#PORT = '3306'
#DATABASE = 'express_pick'

SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:19981114@localhost:3306/express_pick?charset=utf8"

SECRET_KEY = 'abcdefghijklmnopqrstuvwxyz'
PERMANENT_SESSION_LIFETIME = timedelta(hours=1)  # days, seconds, microseconds, milliseconds, minutes, hours, weeks

SQLALCHEMY_TRACK_MODIFICATIONS = True