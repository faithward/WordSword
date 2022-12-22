"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Info
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager
#from nanonets import NANONETSOCR

#model = NANONETSOCR()
#model.set_token('TzFCCdgoB_1utwc15OwNepOqX0XEAn88')

api = Blueprint('api', __name__)
# generate sitemap with all your endpoints

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/info', methods=['POST', 'GET'])
def handle_info():
    if request.method == 'POST':
        body = request.get_json()
        if body == None:
            return "The request body is null", 400
        if 'user_id' not in body:
            return jsonify({"msg": "no user in body"}), 401
        if 'user_id' == None:
            return jsonify({"msg": "body return but user is blank"}), 401
        if 'new_text' == None:
            return "No new text to store", 400
        print(body)
        newInfo = Info(user_id=body["user_id"], title=body["title"], new_text=body["new_text"])
        db.session.add(newInfo)
        db.session.commit()

        return 'info has been added to DB', 200
    else:
        ##to get the info from insomnia with a get
        info = Info.query.all()
        info_list = list(map(lambda x: x.serialize(), info))

        return jsonify(info_list), 200


#we need to add more code to check if user exists and other
#degugging
@api.route('/user', methods=['POST', 'GET'])
def handle_user():
    if request.method == 'POST':
        body = request.get_json()
        if body == None:
            return "The request body is null", 400
        if 'email' not in body:
            return jsonify({"msg": "Add useremail"}), 401
        if 'password' == None:
            return jsonify({"msg": "Add user password"}), 401
        if 'is_active' not in body:
            return "Add user activity status", 400
        if 'firstName' == None:
            return "Add first Name", 400
        if 'lastName' == None:
            return "Add Last Name", 400
        print(body)
        newUser = User(firstName=body["firstName"], lastName=body["lastName"],email=body["email"], password=body["password"], is_active=body["is_active"])
        db.session.add(newUser)
        db.session.commit()

        return 'User has been created', 200
    else:
        ##to get the user list from insomnia with a get
        users = User.query.all()
        users_list = list(map(lambda x: x.serialize(), users))

        return jsonify(users_list), 200

@api.route('/token', methods=['POST'])
def create_token():
    body = request.get_json()
    email = body["email"]
    password = body["password"]

    user = User.query.filter(User.email == body["email"]).first()

    if user is None:
        return jsonify({"msg": "Email is blank"}), 401
    if password is None:
        return jsonify({"msg": "Password is blank"}), 401
    if user.password != body["password"]:
        return "Failed auth", 401
    else:
        access_token = create_access_token(user.email)
        return jsonify({"access_token":access_token}), 200
    

@api.route('/protected', methods=['GET'])
@jwt_required()
def protected():

    current_user_id = get_jwt_identity()
    #user = User.query.get(current_user_id)
    user = User.query.filter_by(email=current_user_id).first()

    return jsonify({"msg": user.serialize(), "firstName": user.firstName, "email": user.email}), 200

# @api.route('/fileupload', methods=['POST'])
# def accept_pdf():
#     print("Posted file: {}".format(request.files))
#     file = request.files
#     files = file.getlist('fileContent')
#     if (len(files) == 0):
#         return jsonify({"msg" : "failed"})
#     newFile = FileUpload(blobby = files)
#     db.session.add(newFile)
#     db.session.commit()
#     return jsonify({"msg": "ok"})
    #if file.filename != '':
    #        file.save(file.filename)
    #r = requests.post("https://3001-williamarivas-wordsword-vqez97l2r1b.ws-us78.gitpod.io/fileupload", files=files)

    #if r.ok:
    #    return "File uploaded!"
    #else:
    #    return "Error uploading file!"
    #string = model.convert_to_string(fileitem,formatting='lines and spaces') 
    #print(string)