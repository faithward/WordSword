from flask_sqlalchemy import SQLAlchemy
import os
import sys
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship



db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(20), unique=False, nullable=False)
    lastName = db.Column(db.String(20), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "firstName" : self.firstName,
            "email": self.email
            # do not serialize the password, its a security breach
        }
class Info(db.Model):
    __tablename__ = 'info'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(20), unique=True, nullable=False)
    user_id = db.Column(db.Integer, ForeignKey('user.id'))
    new_text = db.Column(db.Text, unique=False, nullable=False)

    def __repr__(self):
        return f'<Info {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "user_id" : self.user_id,
            "new_text": self.new_text
        }

class FileUpload(db.Model):
    __tablename__ = 'fileupload'
    id = db.Column(db.Integer, primary_key=True)
    bin = db.Column(db.LargeBinary, nullable=False)
    name = db.Column(db.String(50), unique=False, nullable=True)

    def __repr__(self):
        return f'<FileUpload {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "bin": self.bin,
            "name" : self.name,
        }