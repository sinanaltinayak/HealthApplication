
import json


def getResult():

    dict = {
        'symptoms': "cough",
        "diagnosis": "flu"
    }
    result = json.dumps(dict, indent=4)
    return result