import os

# Find the absolute file path to the top level project directory
basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', default='A very terrible secret key.')

    FLASK_ENV = 'development'
    DEBUG = False
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False

# https://flask-sqlalchemy.palletsprojects.com/en/2.x/binds/
# need to use __bind_key__ for flask to know which db to use. By default, it will use SQLALCHEMY_DATABASE_URI
class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = "postgresql://postgres:password@localhost/react-flask"
    # For using multiple databases
    SQLALCHEMY_BINDS = {
        'db2': "sqlite:///data.db",
        # 'db3': 'mysql://user:pass@localhost/database3’
    }
    # SQLALCHEMY_DATABASE_URI = "sqlite:///data.db"
    # SQLALCHEMY_DATABASE_URI = f"postgresql+psycopg2://postgres:{os.getenv('DB_PASSWORD')}@postgres:5432/dev_db"


class TestingConfig(Config):
    # TESTING = True
    WTF_CSRF_ENABLED = False
    MAIL_SUPPRESS_SEND = True
    SQLALCHEMY_DATABASE_URI = "sqlite://"


class ProductionConfig(Config):
    FLASK_ENV = 'production'
    pass
