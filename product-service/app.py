from flask import Flask, jsonify, request

app = Flask(__name__)

products = [
    {
        "id": 1,
        "name": "Laptop",
        "price": 55000
    },
    {
        "id": 2,
        "name": "Keyboard",
        "price": 1500
    },
    {
        "id": 3,
        "name": "Mouse",
        "price": 800
    }
]


@app.route("/products", methods=["GET"])
def get_products():
    return jsonify(products)


@app.route("/products/<int:product_id>", methods=["GET"])
def get_product(product_id):

    for product in products:
        if product["id"] == product_id:
            return jsonify(product)

    return jsonify({"error": "Product not found"}), 404


@app.route("/products", methods=["POST"])
def add_product():

    new_product = request.get_json()

    products.append(new_product)

    return jsonify(new_product), 201


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002, debug=True)
    