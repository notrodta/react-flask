import pytest
from db import db
from app import create_app
from models.store import StoreModel
from models.item import ItemModel

# @pytest.fixture(scope='module')
# def test_client():
#     flask_app = create_app()
#
#     # Create a test client using the Flask application configured for testing
#     with flask_app.test_client() as testing_client:
#         # Establish an application context
#         with flask_app.app_context():
#             yield testing_client  # this is where the testing happens!


@pytest.fixture
def test_client():
    app = create_app()

    app.config["TESTING"] = True
    app.testing = True

    # This creates an in-memory sqlite db
    # See https://martin-thoma.com/sql-connection-strings/
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite://"

    client = app.test_client()
    with app.app_context():
        db.init_app(app)
        db.create_all()
        populate_stores()
        populate_items()
        db.session.commit()
    yield client

    db.session.remove()


def populate_stores():
    store1 = StoreModel(id=1, name="My Test Store 1")
    store2 = StoreModel(id=2, name="My Test Store 2")
    # store1 = StoreModel(1, "My Test Store 1") //TODO: test this
    db.session.add(store1)
    db.session.add(store2)


def populate_items():
    item1 = ItemModel(id=1, name="Chair", price=50, store_id=1)
    db.session.add(item1)
