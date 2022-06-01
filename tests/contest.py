import pytest
 
from db import db
from app import create_app
from config import TestingConfig

from models.store import StoreModel
from models.item import ItemModel

from tests.mock_data.static_store_data import STORES
from tests.mock_data.static_item_data import ITEMS

@pytest.fixture
def test_client():
    app = create_app()

    # app.config["TESTING"] = True
    app.testing = True

    # This creates an in-memory sqlite db
    # See https://martin-thoma.com/sql-connection-strings/
    # app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite://"
    app.config.from_object(TestingConfig)

    client = app.test_client()
    with app.app_context():
        db.init_app(app)
        db.create_all()
        populate_db()
        db.session.commit()
    yield client

    db.session.remove()


@pytest.fixture(autouse=True)
def neuter_jwt(monkeypatch):
  def no_verify(optional, fresh, refresh, locations, verify_type):
    pass

  from flask_jwt_extended import view_decorators

  monkeypatch.setattr(view_decorators, 'verify_jwt_in_request', no_verify)



def populate_db():
    db.session.add_all(StoreModel(**d) for d in STORES)
    db.session.add_all(ItemModel(**d) for d in ITEMS)

