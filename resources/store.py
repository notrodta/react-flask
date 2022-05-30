from flask_restful import Resource
from models.store import StoreModel
from schemas.store import StoreSchema
from flask_apispec.views import MethodResource
from flask_apispec import marshal_with, doc, use_kwargs
from marshmallow import Schema, fields
from flask_jwt_extended import jwt_required
from logger import logger

NAME_ALREADY_EXISTS = "A store with name '{}' already exists."
ERROR_INSERTING = "An error occurred while inserting the store."
STORE_NOT_FOUND = "Store not found."
STORE_DELETED = "Store deleted."

store_schema = StoreSchema()
store_list_schema = StoreSchema(many=True)


class Store(MethodResource, Resource):
    @doc(description='Get store by name', tags=['Store'])
    @jwt_required()
    def get(self, name: str):
        store = StoreModel.find_by_name(name)
        if store:
            return store_schema.dump(store), 200

        return {"message": STORE_NOT_FOUND}, 404

    @doc(description='Create new store', tags=['Store'])
    @jwt_required(fresh=True)
    def post(self, name: str):
        if StoreModel.find_by_name(name):
            return {"message": NAME_ALREADY_EXISTS.format(name)}, 400

        store = StoreModel(name=name)
        try:
            store.save_to_db()
        except:
            return {"message": ERROR_INSERTING}, 500

        return store_schema.dump(store), 201

    @doc(description='Delete an existing store', tags=['Store'])
    def delete(self, name: str):
        store = StoreModel.find_by_name(name)
        if store:
            store.delete_from_db()
            return {"message": STORE_DELETED}, 200

        return {"message": STORE_NOT_FOUND}, 404


class StoreList(MethodResource, Resource):
    @doc(description='Get list of all stores', tags=['Store'])
    def get(self):
        logger.info("Get all stores")
        return {"stores": store_list_schema.dump(StoreModel.find_all())}, 200
