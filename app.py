import os
from flask import Flask, jsonify
from flask_restful import Api
from flask_jwt_extended import JWTManager
from marshmallow import ValidationError
from flask_cors import CORS, cross_origin
from flask_migrate import Migrate
import logging

from config import Config
from db import db
from ma import ma
from blacklist import BLACKLIST
from resources.item import Item, ItemList
from resources.store import Store, StoreList
from resources.user import UserRegister, User, UserLogin, TokenRefresh, UserLogout
from resources.github_login import Github_Login

from apispec import APISpec
from apispec.ext.marshmallow import MarshmallowPlugin
from flask_apispec.extension import FlaskApiSpec

# uncomment below to get logs in log file
# logging.basicConfig(filename='logs.log', level=logging.DEBUG, filemode='w',
#                     format=f'%(asctime)s %(levelname)s %(name)s %('
#                            f'threadName)s : %(message)s')

logging.basicConfig(level=logging.DEBUG, filemode='w',
                    format=f'%(asctime)s %(levelname)s %(name)s %('
                           f'threadName)s : %(message)s')

def create_app():
    app = Flask(__name__)
    # CORS(app)
    # CORS(app, supports_credentials=True)
    # cors = CORS(app, resources={r"/*": {"origins": "*"}})
    cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
    # cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
    # cors = CORS(app , resources={r"/*": {"origins": "*", "allow_headers": "*", "expose_headers": "*"}})
    app.config['CORS_HEADERS'] = 'Content-Type'
    # app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"
    # app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    CONFIG_TYPE = os.getenv('CONFIG_TYPE', default='config.DevelopmentConfig')
    app.config.from_object(CONFIG_TYPE)
    app.config["PROPAGATE_EXCEPTIONS"] = True
    app.config['JWT_BLACKLIST_ENABLED'] = True  # enable blacklist feature
    app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']  # allow blacklisting for access and refresh tokens
    # app.secret_key = "jose"  # could do app.config['JWT_SECRET_KEY'] if we prefer
    api = Api(app)
    migrate = Migrate(app, db)
    jwt = JWTManager(app)

    app.config.update({
        'APISPEC_SPEC': APISpec(
            title='Awesome Project',
            version='v1',
            plugins=[MarshmallowPlugin()],
            openapi_version='2.0.0'
        ),
        'APISPEC_SWAGGER_URL': '/swagger/',  # URI to access API Doc JSON
        'APISPEC_SWAGGER_UI_URL': '/swagger-ui/'  # URI to access UI of API Doc
    })
    docs = FlaskApiSpec(app)

    @app.before_first_request
    def create_tables():
        db.create_all()

    @app.errorhandler(ValidationError)
    def handle_marshmallow_validation(err):
        return jsonify(err.messages), 400

    """
    `claims` are data we choose to attach to each jwt payload
    and for each jwt protected endpoint, we can retrieve these claims via `get_jwt_claims()`
    one possible use case for claims are access level control, which is shown below.
    """

    @jwt.additional_claims_loader
    def add_claims_to_jwt(identity):  # Remember identity is what we define when creating the access token
        if identity == 1:  # instead of hard-coding, we should read from a config file or database to get a list of admins instead
            return {'is_admin': True}
        return {'is_admin': False}

    # This method will check if a token is blacklisted, and will be called automatically when blacklist is enabled
    @jwt.token_in_blocklist_loader
    def check_if_token_in_blacklist(jwt_header, jwt_payload):
        return jwt_payload["jti"] in BLACKLIST  # Here we blacklist particular JWTs

    # The following callbacks are used for customizing jwt response/error messages.
    # The original ones may not be in a very pretty format (opinionated)
    @jwt.expired_token_loader
    def expired_token_callback():
        return jsonify({
            'message': 'The token has expired.',
            'error': 'token_expired'
        }), 401

    @jwt.invalid_token_loader
    def invalid_token_callback(
            error):  # we have to keep the argument here, since it's passed in by the caller internally
        return jsonify({
            'message': 'Signature verification failed.',
            'error': 'invalid_token'
        }), 401

    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return jsonify({
            "description": "Request does not contain an access token.",
            'error': 'authorization_required'
        }), 401

    @jwt.needs_fresh_token_loader
    def token_not_fresh_callback():
        return jsonify({
            "description": "The token is not fresh.",
            'error': 'fresh_token_required'
        }), 401

    @jwt.revoked_token_loader
    def revoked_token_callback():
        return jsonify({
            "description": "The token has been revoked.",
            'error': 'token_revoked'
        }), 401

    api.add_resource(Store, "/api/store/<string:name>")
    api.add_resource(StoreList, "/api/stores")
    api.add_resource(Item, "/api/item/<string:name>")
    api.add_resource(ItemList, "/api/items")
    api.add_resource(UserRegister, '/api/register')
    api.add_resource(User, '/api/user/<int:user_id>')
    api.add_resource(UserLogin, '/api/login')
    api.add_resource(TokenRefresh, '/api/refresh')
    api.add_resource(UserLogout, '/api/logout')
    # api.add_resource(Github_Login, '/api/githublogin/<string:code>')
    api.add_resource(Github_Login, '/api/github/<string:code>')


    docs.register(Store)
    docs.register(StoreList)

    ma.init_app(app)
    db.init_app(app)

    app.logger.debug("debug")
    app.logger.info("info")
    app.logger.warning("warn")
    app.logger.error("error")
    app.logger.critical("critical")

    return app


if __name__ == "__main__":
    app = create_app()
    # db.init_app(app)
    app.run(port=5000, debug=True)
