from flask import Flask, jsonify
from flask_restful import Api
from flask_jwt_extended import JWTManager
from marshmallow import ValidationError
from flask_cors import CORS, cross_origin

from db import db
from ma import ma
from resources.item import Item, ItemList
from resources.store import Store, StoreList

app = Flask(__name__)
# CORS(app)
# CORS(app, supports_credentials=True)
# cors = CORS(app, resources={r"/*": {"origins": "*"}})
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
# cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
# cors = CORS(app , resources={r"/*": {"origins": "*", "allow_headers": "*", "expose_headers": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["PROPAGATE_EXCEPTIONS"] = True
app.secret_key = "jose"  # could do app.config['JWT_SECRET_KEY'] if we prefer
api = Api(app)


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

if __name__ == "__main__":
    db.init_app(app)
    ma.init_app(app)
    app.run(port=5000, debug=True)
