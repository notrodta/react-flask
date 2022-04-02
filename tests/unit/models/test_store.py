from models.store import StoreModel
from db import db

# remove this, just used for testing right now
class Person():
    def __init__(self, name, age):
        self.name = name
        self.age = age

#
# def test_new_store():
#     """
#       GIVEN a Store model
#       WHEN a new Store is created
#       THEN check the name and items fields are defined correctly
#     """
#     # store = StoreModel()
#     # assert store.name == 'store1'
#     person = Person('name', 12)
#     assert person.name == 'name'
#     assert 1 == 1
