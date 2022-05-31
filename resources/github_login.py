import os
from flask import Flask, jsonify, request
import requests
from flask_jwt_extended import create_access_token, create_refresh_token
from flask_restful import Resource


from models.user import UserModel


class Github_Login(Resource):
    @classmethod
    def get(cls):
        return 'tes213t'

    @classmethod
    def post(cls, code: str):
        if code:
            data = {
                'client_id': os.getenv("GITHUB_CONSUMER_KEY"),
                'client_secret': os.getenv("GITHUB_CONSUMER_SECRET"),
                'code': code
            }
            # exchange the 'code' for an access token
            res = requests.post(
                url='https://github.com/login/oauth/access_token',
                data=data,
                headers={'Accept': 'application/json'}
            )

            if res.status_code != 200:
                print('error')

            res_json = res.json()
            access_token = res_json['access_token']

            # get the user details using the access token
            res = requests.get(
                url='https://api.github.com/user',
                headers={
                    'Accept': 'application/json',
                    'Authorization': 'token {}'.format(access_token)
                }
            )
            if res.status_code != 200:
                print('error')

            res_json = res.json()

            names = res_json['name'].split()
            first_name = names[0]
            last_name = names[1]
            login = res_json['login'] or res_json['email']
            avatar = res_json['avatar_url']

            # create the user
            user = UserModel(username=first_name, password="")
            access_token = create_access_token(identity=user.json(), fresh=True)
            # refresh_token = create_refresh_token(user.id)

            return jsonify({'access_token': access_token})


# class Github_Login(Resource):
#     @classmethod
#     def post(cls, code: str):
#         return 'test'
#         # req_data = request.get_json()
#         # code = req_data.get('code')
#
#         if code:
#             data = {
#                 'client_id': os.getenv("GITHUB_CONSUMER_KEY"),
#                 'client_secret': os.getenv("GITHUB_CONSUMER_SECRET"),
#                 'code': code
#             }
#             # exchange the 'code' for an access token
#             res = requests.post(
#                 url='https://github.com/login/oauth/access_token',
#                 data=data,
#                 headers={'Accept': 'application/json'}
#             )
#
#             if res.status_code != 200:
#                 print('error')
#
#             res_json = res.json()
#             access_token = res_json['access_token']
#
#             # get the user details using the access token
#             res = requests.get(
#                 url='https://api.github.com/user',
#                 headers={
#                     'Accept': 'application/json',
#                     'Authorization': 'token {}'.format(access_token)
#                 }
#             )
#             if res.status_code != 200:
#                 print('error')
#
#             res_json = res.json()
#
#             names = res_json['name'].split()
#             first_name = names[0]
#             last_name = names[1]
#             login = res_json['login'] or res_json['email']
#             avatar = res_json['avatar_url']
#
#             # create the user
#             user = UserModel(first_name)
#             access_token = create_access_token(identity=user.json())
#
#         return jsonify(
#             access_token=access_token
#         ), 200