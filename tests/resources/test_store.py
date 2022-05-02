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
