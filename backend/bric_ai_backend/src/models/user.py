from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Campos específicos do BRIC AI
    level = db.Column(db.Integer, default=1)
    emeralds = db.Column(db.Integer, default=0)
    study_streak = db.Column(db.Integer, default=0)
    learning_style = db.Column(db.String(50), default='visual')  # visual, auditory, kinesthetic, reading

    def __repr__(self):
        return f'<User {self.username}>'

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'level': self.level,
            'emeralds': self.emeralds,
            'study_streak': self.study_streak,
            'learning_style': self.learning_style,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
