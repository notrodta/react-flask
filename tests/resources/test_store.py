from tests.contest import test_client

def test_store_get(test_client):
    response = test_client.get('/api/stores')
    assert response.status_code == 200
