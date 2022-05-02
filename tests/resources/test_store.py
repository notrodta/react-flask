import pytest
from tests.contest import test_client


def test_get_all_stores(test_client):
    result = test_client.get('/api/stores')
    assert result.status_code == 200
    stores = result.json
    assert len(stores) == 1



def test_get_store_by_name(test_client):
    result = test_client.get('/api/store/My Test Store 1')
    assert result.status_code == 200
    store = result.json
    assert store["name"] == "My Test Store 1"
    assert len(store["items"]) == 1
    assert store["items"][0]["name"] == "Chair"


def test_get_store_by_name_404_error(test_client):
    result = test_client.get('/api/store/NotExist')
    assert result.status_code == 404


def test_post_store_by_name(test_client):
    result = test_client.post('/api/store/My New Store')
    assert result.status_code == 201
    store = result.json
    assert store["name"] == "My New Store"


def test_post_store_by_name_400_error(test_client):
    result = test_client.post('/api/store/My Test Store 1')
    assert result.status_code == 400
    assert result.json["message"] == "A store with name 'My Test Store 1' already exists."


def test_post_store_by_name_500_error(test_client):
    with pytest.raises(Exception):
        result = test_client.post('/api/store/BadStore')
        assert result.status_code == 500


def test_delete_store_by_name(test_client):
    result = test_client.delete('/api/store/My Test Store 2')
    assert result.status_code == 200


def test_delete_store_by_name_404_error(test_client):
    result = test_client.delete('/api/store/My New Store')
    assert result.status_code == 404






