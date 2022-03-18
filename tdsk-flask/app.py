from flask import Flask
from flask_cors import CORS

import model

app = Flask(__name__)
CORS(app)


@app.route('/api/getResult')
def getResult():
    result = model.getResult()
    return result


if __name__ == '__main__':
    app.run()
