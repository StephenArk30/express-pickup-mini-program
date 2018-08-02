'''python manage.py  db init
第一次执行，创建环境；之后不用执行

python manage.py db migrate
python manage.py db upgrade
都需要执行'''

from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

from main import app
from ext import db
from model import User, Express

manager = Manager(app)

migrate = Migrate(app, db)
manager.add_command('db',MigrateCommand)

if __name__ == '__main__':
    manager.run()