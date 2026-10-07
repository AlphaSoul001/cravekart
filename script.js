/* ================= FOOD DATA ================= */

const foodItems = [

    {
        id: 1,
        name: "Butter Chicken",
        category: "Indian",
        price: 280,
        isVeg: false,
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&q=80",
        desc: "Creamy tomato-based chicken curry with Indian spices."
    },

    {
        id: 2,
        name: "Paneer Tikka",
        category: "Indian",
        price: 220,
        isVeg: true,
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=500&q=80",
        desc: "Grilled paneer cubes marinated with spices and yogurt."
    },

    {
        id: 3,
        name: "Veg Hakka Noodles",
        category: "Chinese",
        price: 150,
        isVeg: true,
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=80",
        desc: "Stir-fried noodles with fresh vegetables and sauces."
    },

    {
        id: 4,
        name: "Chicken Fried Rice",
        category: "Chinese",
        price: 190,
        isVeg: false,
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=500&q=80",
        desc: "Fried rice with chicken, vegetables and oriental sauces."
    },

    {
        id: 5,
        name: "Veg Burger",
        category: "Fast Food",
        price: 99,
        isVeg: true,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80",
        desc: "Crispy veg patty with cheese, lettuce and tangy sauce."
    },

    {
        id: 6,
        name: "Margherita Pizza",
        category: "Fast Food",
        price: 299,
        isVeg: true,
        image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=500&q=80",
        desc: "Classic pizza with tomato sauce, mozzarella and basil."
    },

    {
        id: 7,
        name: "Gulab Jamun",
        category: "Desserts",
        price: 90,
        isVeg: true,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80",
        desc: "Soft milk-solid balls soaked in warm sugar syrup."
    },

    {
        id: 8,
        name: "Mango Lassi",
        category: "Beverages",
        price: 80,
        isVeg: true,
        image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=500&q=80",
        desc: "Refreshing yogurt drink blended with sweet mango."
    },

    {
        id: 9,
        name: "Garlic Naan",
        category: "Indian",
        price: 50,
        isVeg: true,
        image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=500&q=80",
        desc: "Soft naan topped with garlic and butter."
    },

    {
        id: 10,
        name: "Chole Bhature",
        category: "Indian",
        price: 160,
        isVeg: true,
        image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80",
        desc: "Spiced chickpea curry served with fluffy bhature."
    },

    {
        id: 11,
        name: "Cold Coffee",
        category: "Beverages",
        price: 110,
        isVeg: true,
        image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=500&q=80",
        desc: "Cold coffee blended with milk and chocolate syrup."
    },

    {
        id: 12,
        name: "Veg Manchurian",
        category: "Chinese",
        price: 170,
        isVeg: true,
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=500&q=80",
        desc: "Crispy vegetable balls served in spicy Manchurian sauce."
    }

];


/* ================= VARIABLES ================= */

let cart = JSON.parse(localStorage.getItem("cravekart_cart")) || [];

let orderHistory =
    JSON.parse(localStorage.getItem("cravekart_orders")) || [];

let activeCategory = "All";
let searchText = "";
let sortType = "default";

const deliveryFee = 45;


/* ================= PAGE START ================= */

document.addEventListener("DOMContentLoaded", function () {

    setupEvents();

    showPage();

    displayFeaturedFood();

    displayMenu();

    updateCartCount();

});


/* ================= NAVIGATION ================= */

window.addEventListener("hashchange", showPage);


function showPage() {

    let page = window.location.hash || "#home";

    const views = document.querySelectorAll(".view");

    views.forEach(function (view) {

        if ("#" + view.id === page) {
            view.classList.add("active");
        } else {
            view.classList.remove("active");
        }

    });


    const links = document.querySelectorAll(".nav-link");

    links.forEach(function (link) {

        if (link.getAttribute("href") === page) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }

    });


    window.scrollTo(0, 0);


    if (page === "#cart") {
        displayCart();
    }

    if (page === "#checkout") {
        displayCheckout();
    }

    if (page === "#orders") {
        displayOrders();
    }

}


/* ================= EVENT LISTENERS ================= */

function setupEvents() {

    const search =
        document.getElementById("menu-search-input");

    search.addEventListener("input", function () {

        searchText = search.value.toLowerCase();

        displayMenu();

    });


    const filterButtons =
        document.querySelectorAll(".filter-btn");

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            activeCategory =
                button.getAttribute("data-cat");

            displayMenu();

        });

    });


    const sort =
        document.getElementById("price-sort-select");

    sort.addEventListener("change", function () {

        sortType = sort.value;

        displayMenu();

    });


    const mobileButton =
        document.getElementById("mobile-toggle-btn");

    mobileButton.addEventListener("click", function () {

        document
            .getElementById("nav-links")
            .classList.toggle("open");

    });

}


/* ================= FOOD CARDS ================= */

function createFoodCard(item) {

    let vegText = item.isVeg ? "• Veg" : "• Non-Veg";

    let vegClass = item.isVeg
        ? "tag-veg"
        : "tag-nonveg";


    return `

        <div class="food-card">

            <div class="food-img-wrapper">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    class="food-img"
                    onerror="this.src='https://placehold.co/500x300?text=Food'"
                >

                <span class="food-tag ${vegClass}">
                    ${vegText}
                </span>

            </div>


            <div class="food-content">

                <h3 class="food-title">
                    ${item.name}
                </h3>

                <p class="food-desc">
                    ${item.desc}
                </p>


                <div class="food-footer">

                    <span class="food-price">
                        ₹${item.price}
                    </span>

                    <button
                        class="add-cart-btn"
                        onclick="addToCart(${item.id})">

                        <i class="fa-solid fa-plus"></i>
                        Add

                    </button>

                </div>

            </div>

        </div>

    `;

}


/* ================= HOME FOOD ================= */

function displayFeaturedFood() {

    const container =
        document.getElementById("home-featured-grid");

    let featured = foodItems.slice(0, 4);

    container.innerHTML =
        featured.map(createFoodCard).join("");

}


/* ================= MENU ================= */

function displayMenu() {

    const menu =
        document.getElementById("full-menu-grid");

    const noResults =
        document.getElementById("no-results-msg");


    let filteredFood = foodItems.filter(function (item) {

        let categoryMatch =
            activeCategory === "All" ||
            item.category === activeCategory;


        let searchMatch =
            item.name.toLowerCase().includes(searchText) ||
            item.desc.toLowerCase().includes(searchText);


        return categoryMatch && searchMatch;

    });


    if (sortType === "low-high") {

        filteredFood.sort(function (a, b) {
            return a.price - b.price;
        });

    }

    if (sortType === "high-low") {

        filteredFood.sort(function (a, b) {
            return b.price - a.price;
        });

    }


    if (filteredFood.length === 0) {

        menu.innerHTML = "";

        noResults.style.display = "block";

        return;

    }


    noResults.style.display = "none";

    menu.innerHTML =
        filteredFood.map(createFoodCard).join("");

}


/* ================= CATEGORY FROM HOME ================= */

function selectCategoryFilter(category) {

    activeCategory = category;


    const buttons =
        document.querySelectorAll(".filter-btn");


    buttons.forEach(function (button) {

        if (button.getAttribute("data-cat") === category) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }

    });


    window.location.hash = "#menu";

    displayMenu();

}


/* ================= CART ================= */

function addToCart(id) {

    let item =
        foodItems.find(function (food) {
            return food.id === id;
        });


    if (!item) {
        return;
    }


    let existing =
        cart.find(function (food) {
            return food.id === id;
        });


    if (existing) {

        existing.qty++;

    } else {

        cart.push({
            ...item,
            qty: 1
        });

    }


    saveCart();

    updateCartCount();

    showToast(item.name + " added to cart!");

}


function updateQuantity(id, change) {

    let item =
        cart.find(function (food) {
            return food.id === id;
        });


    if (!item) {
        return;
    }


    item.qty += change;


    if (item.qty <= 0) {

        cart =
            cart.filter(function (food) {
                return food.id !== id;
            });

    }


    saveCart();

    updateCartCount();

    displayCart();

}


function removeFromCart(id) {

    cart =
        cart.filter(function (item) {
            return item.id !== id;
        });


    saveCart();

    updateCartCount();

    displayCart();

    showToast("Item removed from cart.");

}


/* ================= CLEAR CART ================= */

function promptClearCart() {

    if (cart.length === 0) {
        return;
    }

    document
        .getElementById("clear-cart-modal")
        .classList.add("active");

}


function closeClearCartModal() {

    document
        .getElementById("clear-cart-modal")
        .classList.remove("active");

}


function confirmClearCart() {

    cart = [];

    saveCart();

    updateCartCount();

    displayCart();

    closeClearCartModal();

    showToast("Cart cleared.");

}


/* ================= LOCAL STORAGE ================= */

function saveCart() {

    localStorage.setItem(
        "cravekart_cart",
        JSON.stringify(cart)
    );

}


function updateCartCount() {

    let count = 0;

    cart.forEach(function (item) {
        count += item.qty;
    });


    document.getElementById(
        "cart-badge-count"
    ).innerText = count;

}


/* ================= CART PAGE ================= */

function displayCart() {

    const wrapper =
        document.getElementById("cart-content-wrapper");

    const empty =
        document.getElementById("cart-empty-state");

    const list =
        document.getElementById("cart-items-list");


    if (cart.length === 0) {

        wrapper.style.display = "none";

        empty.style.display = "block";

        return;

    }


    wrapper.style.display = "grid";

    empty.style.display = "none";


    let subtotal = 0;


    list.innerHTML =
        cart.map(function (item) {

            let total =
                item.price * item.qty;

            subtotal += total;


            return `

                <div class="cart-item">

                    <img
                        src="${item.image}"
                        class="cart-item-img"
                        alt="${item.name}"
                    >

                    <div class="cart-item-details">

                        <div class="cart-item-title">
                            ${item.name}
                        </div>

                        <div class="cart-item-price">
                            ₹${item.price} × ${item.qty}
                            = ₹${total}
                        </div>

                    </div>


                    <div class="qty-controls">

                        <button
                            class="qty-btn"
                            onclick="updateQuantity(${item.id}, -1)">
                            -
                        </button>

                        <span>${item.qty}</span>

                        <button
                            class="qty-btn"
                            onclick="updateQuantity(${item.id}, 1)">
                            +
                        </button>

                    </div>


                    <button
                        class="remove-item-btn"
                        onclick="removeFromCart(${item.id})">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            `;

        }).join("");


    let tax = Math.round(subtotal * 0.05);

    let total = subtotal + deliveryFee + tax;


    document.getElementById("summary-subtotal")
        .innerText = "₹" + subtotal;

    document.getElementById("summary-tax")
        .innerText = "₹" + tax;

    document.getElementById("summary-total")
        .innerText = "₹" + total;

}


/* ================= CHECKOUT ================= */

function displayCheckout() {

    if (cart.length === 0) {

        window.location.hash = "#cart";

        return;

    }


    const preview =
        document.getElementById(
            "checkout-items-preview"
        );


    let subtotal = 0;


    preview.innerHTML =
        cart.map(function (item) {

            let total =
                item.price * item.qty;

            subtotal += total;


            return `

                <div class="summary-row">

                    <span>
                        ${item.name} × ${item.qty}
                    </span>

                    <b>
                        ₹${total}
                    </b>

                </div>

            `;

        }).join("");


    let tax = Math.round(subtotal * 0.05);

    let total =
        subtotal + deliveryFee + tax;


    document.getElementById("checkout-subtotal")
        .innerText = "₹" + subtotal;

    document.getElementById("checkout-tax")
        .innerText = "₹" + tax;

    document.getElementById("checkout-total")
        .innerText = "₹" + total;

}


/* ================= PLACE ORDER ================= */

function handleOrderSubmission(event) {

    event.preventDefault();


    if (cart.length === 0) {
        return;
    }


    let name =
        document.getElementById("cust-name").value.trim();

    let phone =
        document.getElementById("cust-phone").value.trim();

    let email =
        document.getElementById("cust-email").value.trim();

    let address =
        document.getElementById("cust-address").value.trim();

    let city =
        document.getElementById("cust-city").value.trim();

    let pincode =
        document.getElementById("cust-pincode").value.trim();


    let payment =
        document.querySelector(
            'input[name="paymentMethod"]:checked'
        ).value;


    let subtotal = 0;


    cart.forEach(function (item) {

        subtotal +=
            item.price * item.qty;

    });


    let tax =
        Math.round(subtotal * 0.05);


    let total =
        subtotal + deliveryFee + tax;


    let orderId =
        "CK-" +
        Math.floor(
            100000 + Math.random() * 900000
        );


    let date =
        new Date().toLocaleString();


    let order = {

        id: orderId,

        date: date,

        customer: {
            name: name,
            phone: phone,
            email: email,
            address: address,
            city: city,
            pincode: pincode
        },

        items: [...cart],

        paymentMethod: payment,

        totalPaid: total,

        status: "Order Placed"

    };


    /* Save order */

    orderHistory.unshift(order);


    localStorage.setItem(
        "cravekart_orders",
        JSON.stringify(orderHistory)
    );


    /* Show confirmation */

    document.getElementById("conf-order-id")
        .innerText = orderId;

    document.getElementById("conf-date-time")
        .innerText = date;

    document.getElementById("conf-payment-method")
        .innerText = payment;

    document.getElementById("conf-total-paid")
        .innerText = "₹" + total;


    let itemsList =
        document.getElementById(
            "conf-items-list"
        );


    itemsList.innerHTML =
        cart.map(function (item) {

            return `

                <div class="receipt-row">

                    <span>
                        ${item.name} × ${item.qty}
                    </span>

                    <span>
                        ₹${item.price * item.qty}
                    </span>

                </div>

            `;

        }).join("");


    /* Empty cart */

    cart = [];

    saveCart();

    updateCartCount();


    /* Open confirmation page */

    window.location.hash = "#confirmation";

    showToast("Order placed successfully!");

}


/* ================= ORDER HISTORY ================= */

function displayOrders() {

    const container =
        document.getElementById(
            "order-history-container"
        );

    const empty =
        document.getElementById(
            "orders-empty-state"
        );


    if (orderHistory.length === 0) {

        container.style.display = "none";

        empty.style.display = "block";

        return;

    }


    container.style.display = "block";

    empty.style.display = "none";


    container.innerHTML =
        orderHistory.map(function (order) {

            let items = order.items.map(function (item) {

                return `
                    <div>
                        ${item.qty} × ${item.name}
                    </div>
                `;

            }).join("");


            return `

                <div class="order-history-card">

                    <div class="order-history-header">

                        <div>

                            <strong>
                                Order #${order.id}
                            </strong>

                            <div>
                                ${order.date}
                            </div>

                        </div>

                        <span class="status-chip">
                            ${order.status}
                        </span>

                    </div>


                    <div>
                        ${items}
                    </div>


                    <div class="summary-row">

                        <span>
                            Payment:
                            <b>${order.paymentMethod}</b>
                        </span>

                        <strong>
                            Total: ₹${order.totalPaid}
                        </strong>

                    </div>

                </div>

            `;

        }).join("");

}


/* ================= PRINT RECEIPT ================= */

function triggerPrintReceipt() {

    window.print();

}


/* ================= TOAST MESSAGE ================= */

function showToast(message) {

    const container =
        document.getElementById(
            "toast-container"
        );


    const toast =
        document.createElement("div");


    toast.className = "toast";


    toast.innerHTML = `

        <i class="fa-solid fa-circle-check"></i>

        <span>${message}</span>

    `;


    container.appendChild(toast);


    setTimeout(function () {

        toast.remove();

    }, 3000);

}
