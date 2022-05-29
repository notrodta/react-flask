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
from resources.item import Item, ItemList
from resources.store import Store, StoreList

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
    # app.secret_key = "jose"  # could do app.config['JWT_SECRET_KEY'] if we prefer
    api = Api(app)
    migrate = Migrate(app, db)

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

    api.add_resource(Store, "/api/store/<string:name>")
    api.add_resource(StoreList, "/api/stores")
    api.add_resource(Item, "/api/item/<string:name>")
    api.add_resource(ItemList, "/api/items")

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
