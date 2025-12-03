from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your_default_secret_key')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///blog.db')
db = SQLAlchemy(app)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f"Post('{self.title}', '{self.content}')"

with app.app_context():
    db.create_all()
    # Initialize with a default post if the database is empty
    if not Post.query.first():
        default_post = Post(title="Welcome to the Blog!", content="This is the first post.  Feel free to add more!")
        db.session.add(default_post)
        db.session.commit()


@app.route('/')
def index():
    posts = Post.query.all()
    return render_template('index.html', posts=posts)

@app.route('/post/<int:post_id>')
def post(post_id):
    # VULNERABILITY: SQL Injection - post_id is directly used in the query.
    post = Post.query.filter(Post.id == post_id).first()
    if not post:
        return "Post not found", 404
    return render_template('post.html', post=post)

@app.route('/new_post', methods=['GET', 'POST'])
def new_post():
    if request.method == 'POST':
        title = request.form['title']
        content = request.form['content']
        new_post = Post(title=title, content=content)
        db.session.add(new_post)
        db.session.commit()
        return redirect(url_for('index'))
    return render_template('new_post.html')

@app.route('/edit_post/<int:post_id>', methods=['GET', 'POST'])
def edit_post(post_id):
    post = Post.query.get_or_404(post_id)
    if request.method == 'POST':
        #VULNERABILITY: SQL Injection - post_id is directly used in the query.
        post.title = request.form['title']
        post.content = request.form['content']
        db.session.commit()
        return redirect(url_for('post', post_id=post.id))
    return render_template('edit_post.html', post=post)


@app.route('/delete_post/<int:post_id>')
def delete_post(post_id):
  # VULNERABILITY: SQL Injection - post_id is directly used in the query
  post = Post.query.filter(Post.id == post_id).first()
  if not post:
    return "Post not found", 404

  db.session.delete(post)
  db.session.commit()
  return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
