from flask import Flask, render_template, redirect, url_for, session, request, g
from ext import db
from model import User
import config

app = Flask(__name__)
app.config.from_object(config)
db.init_app(app)

@app.route('/get_express', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        if hasattr(g, 'username'):

        else:
            return redirect(url_for('login'))
    else:
        session.pop('username', None)
        return  redirect(url_for('login'))

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return render_template('register.html',check = '')
    else:
        username = request.form.get('username')
        password = request.form.get('password1')
        name = request.form.get('name')

        if username == '':
            return render_template('register.html', check='请输入用户名！')
        elif User.query.filter(User.username == username).first():
            return render_template('register.html', check = '用户名已存在！')
        else:
            if password == '':
                return render_template('register.html', check='请输入密码！')
            elif password != request.form.get('password2'):
                return render_template('register.html', check = '前后密码不一致！')
            else:
                if name == '':
                    name = username
                user = User(username = username, password = password, name = name)
                db.session.add(user)
                db.session.commit()
                return redirect(url_for('login'))

@app.route('/login/',methods=['GET','POST'])
def login():
    if request.method == 'GET':
        return  render_template('login.html', check = '')
    else:
        g.username = request.form.get('username')
        password = request.form.get('password')
        if User.query.filter(User.username == g.username).first() and password == User.query.filter(User.username == g.username).first().password:
            session['username'] = g.username
            return  redirect(url_for('index'))
        else:
            return render_template('login.html', check = '用户名或密码错误')

@app.before_request
def b_r():
    if session.get('username'):
        g.username = session.get('username')

#@app.context_processor
#def c_p():
#     pass


if __name__ == '__main__':
    app.run()