from flask import Flask, jsonify
import requests

app = Flask(__name__)


@app.route("/orders", methods=["GET"])
def get_orders():

    product_response = requests.get(
        "http://localhost:5002/products"
    )

    products = product_response.json()

    orders = [
        {
            "order_id": 101,
            "product_id": 1,
            "product": products[0]["name"],
            "price": products[0]["price"],
            "quantity": 2
        }
    ]

    return jsonify(orders)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)