let products = [];
let customerDetails = [];


// Load existing products
async function loadProducts() {

    const productsContainer = document.getElementById("products");

    try {

        const response = await fetch("/api/products");

        if (!response.ok) {
            throw new Error("Unable to load products");
        }

        products = await response.json();

        displayProducts();

    } catch (error) {

        productsContainer.innerHTML =
            "<p>Unable to load products.</p>";

        console.error(error);
    }
}


// Display products
function displayProducts() {

    const productsContainer =
        document.getElementById("products");

    productsContainer.innerHTML = "";

    products.forEach(product => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <h3>${product.name}</h3>

            <p>
                <strong>Product ID:</strong>
                ${product.id}
            </p>

            <p class="price">
                ₹${product.price}
            </p>
        `;

        productsContainer.appendChild(card);

    });


    // Display customer information added from form
    customerDetails.forEach(customer => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <h3>${customer.productName}</h3>

            <p>
                <strong>Customer No:</strong>
                ${customer.customerNumber}
            </p>

            <p>
                <strong>Quantity:</strong>
                ${customer.quantity}
            </p>

            <p class="price">
                ₹${customer.price}
            </p>
        `;

        productsContainer.appendChild(card);

    });
}


// Load existing orders
async function loadOrders() {

    const ordersContainer =
        document.getElementById("orders");

    try {

        const response =
            await fetch("/api/orders");

        if (!response.ok) {
            throw new Error("Unable to load orders");
        }

        const orders = await response.json();

        ordersContainer.innerHTML = "";

        orders.forEach(order => {

            const card = document.createElement("div");

            card.className = "order-card";

            card.innerHTML = `
                <h3>Order #${order.order_id}</h3>

                <p>
                    <strong>Product:</strong>
                    ${order.product}
                </p>

                <p>
                    <strong>Product ID:</strong>
                    ${order.product_id}
                </p>

                <p>
                    <strong>Price:</strong>
                    ₹${order.price}
                </p>

                <p>
                    <strong>Quantity:</strong>
                    ${order.quantity}
                </p>
            `;

            ordersContainer.appendChild(card);

        });

    } catch (error) {

        ordersContainer.innerHTML =
            "<p>Unable to load orders.</p>";

        console.error(error);
    }
}


// Add Product Form
document
    .getElementById("productForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();


        const productName =
            document.getElementById("productName").value;

        const price =
            Number(document.getElementById("price").value);

        const customerNumber =
            document.getElementById("customerNumber").value;

        const quantity =
            Number(document.getElementById("quantity").value);


        // Generate a new product ID
        const productId =
            products.length > 0
                ? Math.max(...products.map(product => product.id)) + 1
                : 1;


        const newProduct = {

            id: productId,

            name: productName,

            price: price

        };


        try {

            // Send product to Product Service
            const response = await fetch("/api/products", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(newProduct)

            });


            if (!response.ok) {
                throw new Error("Failed to add product");
            }


            const savedProduct =
                await response.json();


            // Store customer information in frontend
            customerDetails.push({

                productName:
                    savedProduct.name,

                price:
                    savedProduct.price,

                customerNumber:
                    customerNumber,

                quantity:
                    quantity

            });


            // Add product to frontend list
            products.push(savedProduct);


            displayProducts();


            const newOrder = {
    order_id: 102,
    product_id: savedProduct.id,
    product: savedProduct.name,
    price: savedProduct.price,
    quantity: quantity,
    customer_number: customerNumber
};

displayCustomerOrder(newOrder);
            // Success message
            document.getElementById("message").innerText =
                "Product added successfully!";


            // Clear form
            document.getElementById("productForm").reset();

            document.getElementById("quantity").value = 1;


        } catch (error) {

            document.getElementById("message").innerText =
                "Unable to add product.";

            console.error(error);

        }

    });

function displayCustomerOrder(order) {

    const ordersContainer =
        document.getElementById("orders");

    const card = document.createElement("div");

    card.className = "order-card";

    card.innerHTML = `
        <h3>New Customer Order</h3>

        <p>
            <strong>Order ID:</strong>
            ${order.order_id}
        </p>

        <p>
            <strong>Customer Number:</strong>
            ${order.customer_number}
        </p>

        <p>
            <strong>Product:</strong>
            ${order.product}
        </p>

        <p>
            <strong>Price:</strong>
            ₹${order.price}
        </p>

        <p>
            <strong>Quantity:</strong>
            ${order.quantity}
        </p>
    `;

    ordersContainer.appendChild(card);
}

// Start application
loadProducts();
loadOrders();