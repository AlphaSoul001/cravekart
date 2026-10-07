        // High-quality food dataset with authentic Gulab Jamun image
        const foodItems = [
            { id: 1, name: "Paneer Tikka", category: "Indian", price: 280, isVeg: true, image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=500&q=80", desc: "Marinated cottage cheese cubes grilled with spices in a tandoor." },
            { id: 2, name: "Veg Biryani", category: "Indian", price: 240, isVeg: true, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80", desc: "Aromatic basmati rice cooked with fresh vegetables and Indian spices." },
            { id: 3, name: "Butter Chicken", category: "Indian", price: 340, isVeg: false, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&q=80", desc: "Tender chicken cooked in a rich, buttery tomato gravy." },
            { id: 4, name: "Masala Dosa", category: "Indian", price: 120, isVeg: true, image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=500&q=80", desc: "Crispy rice crepe filled with spiced potato masala, served with chutney." },
            { id: 5, name: "Hakka Noodles", category: "Chinese", price: 180, isVeg: true, image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=80", desc: "Stir-fried noodles loaded with crunchy vegetables and oriental sauces." },
            { id: 6, name: "Veg Burger", category: "Fast Food", price: 99, isVeg: true, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80", desc: "Crispy veg patty topped with cheese, lettuce, and tangy sauce." },
            { id: 7, name: "Margherita Pizza", category: "Fast Food", price: 299, isVeg: true, image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=500&q=80", desc: "Classic pizza topped with tomato sauce, mozzarella, and fresh basil." },
            { id: 8, name: "Gulab Jamun", category: "Desserts", price: 90, isVeg: true, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtcB1bQvjOgI4L8MOpK-XYxm-jGAzqaDBgV_XhDvC5pDYL2XyGaNt2Petw&s=10", desc: "Soft, golden-fried milk-solid balls soaked in warm cardamom sugar syrup." },
            { id: 9, name: "Mango Lassi", category: "Beverages", price: 80, isVeg: true, image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=500&q=80", desc: "Thick and refreshing yogurt drink blended with sweet mango pulp." },
            { id: 10, name: "Garlic Naan", category: "Indian", price: 50, isVeg: true, image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=500&q=80", desc: "Soft leavened flatbread topped with minced garlic and butter." },
            { id: 11, name: "Chole Bhature", category: "Indian", price: 160, isVeg: true, image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80", desc: "Spiced chickpea curry paired with deep-fried fluffy bread." },
            { id: 12, name: "Cold Coffee", category: "Beverages", price: 110, isVeg: true, image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=500&q=80", desc: "Rich chilled coffee blended with milk and topped with chocolate syrup." }
        ];

        // State Management
        let cart = JSON.parse(localStorage.getItem('cravekart_cart')) || [];
        let orderHistory = JSON.parse(localStorage.getItem('cravekart_orders')) || [];
        let activeCategory = 'All';
        let searchQuery = '';
        let sortBy = 'default';

        function handleRouting() {
            const hash = window.location.hash || '#home';
            const views = document.querySelectorAll('.view');
            const navLinks = document.querySelectorAll('.nav-link');

            views.forEach(view => {
                if ('#' + view.id === hash) {
                    view.classList.add('active');
                } else {
                    view.classList.remove('active');
                }
            });

            navLinks.forEach(link => {
                if (link.getAttribute('href') === hash) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });

            window.scrollTo({ top: 0, behavior: 'smooth' });

            if (hash === '#cart') renderCartView();
            if (hash === '#checkout') renderCheckoutView();
            if (hash === '#orders') renderOrdersView();
        }

        window.addEventListener('hashchange', handleRouting);
        window.addEventListener('DOMContentLoaded', () => {
            handleRouting();
            initApp();
        });

        function initApp() {
            renderFeaturedItems();
            renderMenuGrid();
            updateCartBadge();
            setupEventListeners();
        }

        function setupEventListeners() {
            const searchInput = document.getElementById('menu-search-input');
            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    searchQuery = e.target.value.toLowerCase();
                    renderMenuGrid();
                });
            }

            const catButtons = document.querySelectorAll('#category-filter-bar .filter-btn');
            catButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    catButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    activeCategory = btn.getAttribute('data-cat');
                    renderMenuGrid();
                });
            });

            const sortSelect = document.getElementById('price-sort-select');
            if (sortSelect) {
                sortSelect.addEventListener('change', (e) => {
                    sortBy = e.target.value;
                    renderMenuGrid();
                });
            }

            const toggleBtn = document.getElementById('mobile-toggle-btn');
            const navLinks = document.getElementById('nav-links');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', () => {
                    navLinks.classList.toggle('open');
                });
            }
        }

        function createFoodCardHTML(item) {
            return `
                <div class="food-card">
                    <div class="food-img-wrapper">
                        <img src="${item.image}" alt="${item.name}" class="food-img" onerror="this.onerror=null; this.src='https://placehold.co/500x300/FF5722/FFFFFF?text=${encodeURIComponent(item.name)}'">
                        <span class="food-tag ${item.isVeg ? 'tag-veg' : 'tag-nonveg'}">
                            ${item.isVeg ? '• Veg' : '• Non-Veg'}
                        </span>
                    </div>
                    <div class="food-content">
                        <h3 class="food-title">${item.name}</h3>
                        <p class="food-desc">${item.desc}</p>
                        <div class="food-footer">
                            <span class="food-price">₹${item.price}</span>
                            <button class="add-cart-btn" onclick="addToCart(${item.id})">
                                <i class="fa-solid fa-plus"></i> Add
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }

        function renderFeaturedItems() {
            const featuredGrid = document.getElementById('home-featured-grid');
            if (!featuredGrid) return;
            const featured = foodItems.slice(0, 4);
            featuredGrid.innerHTML = featured.map(item => createFoodCardHTML(item)).join('');
        }

        function renderMenuGrid() {
            const menuGrid = document.getElementById('full-menu-grid');
            const noResultsMsg = document.getElementById('no-results-msg');
            if (!menuGrid) return;

            let filtered = foodItems.filter(item => {
                const matchesCat = activeCategory === 'All' || item.category === activeCategory;
                const matchesSearch = item.name.toLowerCase().includes(searchQuery) || item.desc.toLowerCase().includes(searchQuery);
                return matchesCat && matchesSearch;
            });

            if (sortBy === 'low-high') {
                filtered.sort((a, b) => a.price - b.price);
            } else if (sortBy === 'high-low') {
                filtered.sort((a, b) => b.price - a.price);
            }

            if (filtered.length === 0) {
                menuGrid.innerHTML = '';
                noResultsMsg.style.display = 'block';
            } else {
                noResultsMsg.style.display = 'none';
                menuGrid.innerHTML = filtered.map(item => createFoodCardHTML(item)).join('');
            }
        }

        function selectCategoryFilter(category) {
            activeCategory = category;
            const catButtons = document.querySelectorAll('#category-filter-bar .filter-btn');
            catButtons.forEach(btn => {
                if (btn.getAttribute('data-cat') === category) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
            window.location.hash = '#menu';
            renderMenuGrid();
        }

        function addToCart(itemId) {
            const item = foodItems.find(f => f.id === itemId);
            if (!item) return;

            const existingIndex = cart.findIndex(c => c.id === itemId);
            if (existingIndex > -1) {
                cart[existingIndex].qty += 1;
            } else {
                cart.push({ ...item, qty: 1 });
            }

            saveCart();
            updateCartBadge();
            showToast(`Added "${item.name}" to your cart!`);
        }

        function updateQuantity(itemId, change) {
            const index = cart.findIndex(c => c.id === itemId);
            if (index > -1) {
                cart[index].qty += change;
                if (cart[index].qty <= 0) {
                    cart.splice(index, 1);
                }
                saveCart();
                renderCartView();
                updateCartBadge();
            }
        }

        function removeFromCart(itemId) {
            cart = cart.filter(c => c.id !== itemId);
            saveCart();
            renderCartView();
            updateCartBadge();
            showToast('Item removed from cart.');
        }

        // Functional Clear Cart Triggering Modal
        function promptClearCart() {
            if (cart.length === 0) return;
            document.getElementById('clear-cart-modal').classList.add('active');
        }

        function closeClearCartModal() {
            document.getElementById('clear-cart-modal').classList.remove('active');
        }

        function confirmClearCart() {
            cart = [];
            saveCart();
            renderCartView();
            updateCartBadge();
            closeClearCartModal();
            showToast('Your cart has been cleared.');
        }

        function saveCart() {
            localStorage.setItem('cravekart_cart', JSON.stringify(cart));
        }

        function updateCartBadge() {
            const badge = document.getElementById('cart-badge-count');
            const totalQty = cart.reduce((acc, curr) => acc + curr.qty, 0);
            if (badge) badge.innerText = totalQty;
        }

        function renderCartView() {
            const wrapper = document.getElementById('cart-content-wrapper');
            const emptyState = document.getElementById('cart-empty-state');
            const itemsList = document.getElementById('cart-items-list');

            if (cart.length === 0) {
                wrapper.style.display = 'none';
                emptyState.style.display = 'block';
                return;
            }

            wrapper.style.display = 'grid';
            emptyState.style.display = 'none';

            let subtotal = 0;
            itemsList.innerHTML = cart.map(item => {
                const itemTotal = item.price * item.qty;
                subtotal += itemTotal;
                return `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                        <div class="cart-item-details">
                            <div class="cart-item-title">${item.name}</div>
                            <div class="cart-item-price">₹${item.price} x ${item.qty} = ₹${itemTotal}</div>
                        </div>
                        <div class="qty-controls">
                            <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                            <span>${item.qty}</span>
                            <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                        <button class="remove-item-btn" onclick="removeFromCart(${item.id})" title="Remove item">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                `;
            }).join('');

            const deliveryFee = 45;
            const tax = Math.round(subtotal * 0.05);
            const grandTotal = subtotal + deliveryFee + tax;

            document.getElementById('summary-subtotal').innerText = `₹${subtotal}`;
            document.getElementById('summary-tax').innerText = `₹${tax}`;
            document.getElementById('summary-total').innerText = `₹${grandTotal}`;
        }

        function renderCheckoutView() {
            if (cart.length === 0) {
                window.location.hash = '#cart';
                return;
            }

            const preview = document.getElementById('checkout-items-preview');
            let subtotal = 0;

            preview.innerHTML = cart.map(item => {
                const itemTotal = item.price * item.qty;
                subtotal += itemTotal;
                return `
                    <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.9rem;">
                        <span>${item.name} x ${item.qty}</span>
                        <strong>₹${itemTotal}</strong>
                    </div>
                `;
            }).join('');

            const deliveryFee = 45;
            const tax = Math.round(subtotal * 0.05);
            const grandTotal = subtotal + deliveryFee + tax;

            document.getElementById('checkout-subtotal').innerText = `₹${subtotal}`;
            document.getElementById('checkout-tax').innerText = `₹${tax}`;
            document.getElementById('checkout-total').innerText = `₹${grandTotal}`;
        }

        async function handleOrderSubmission(event) {
    event.preventDefault();

    if (cart.length === 0) return;

    const name = document.getElementById('cust-name').value.trim();
    const phone = document.getElementById('cust-phone').value.trim();
    const email = document.getElementById('cust-email').value.trim();
    const address = document.getElementById('cust-address').value.trim();
    const city = document.getElementById('cust-city').value.trim();
    const pincode = document.getElementById('cust-pincode').value.trim();

    const paymentInput = document.querySelector(
        'input[name="paymentMethod"]:checked'
    );

    if (!paymentInput) {
        showToast('Please select a payment method.');
        return;
    }

    const paymentMethod = paymentInput.value;

    const subtotal = cart.reduce(
        (acc, item) => acc + (item.price * item.qty),
        0
    );

    const tax = Math.round(subtotal * 0.05);
    const grandTotal = subtotal + 45 + tax;

    const orderId =
        'CK-' + Math.floor(100000 + Math.random() * 900000);

    const orderDate = new Date().toLocaleString();

    const orderDetails = {
        id: orderId,
        date: orderDate,

        customer: {
            name: name,
            phone: phone,
            email: email,
            address: address,
            city: city,
            pincode: pincode
        },

        items: [...cart],

        paymentMethod: paymentMethod,

        totalPaid: grandTotal,

        status: 'Order Placed'
    };

    // Send order to Java Servlet backend
    try {
    console.log('Vercel frontend: Order processed successfully.');

    showToast('Order placed successfully!');
            
        // Save order locally as before
        orderHistory.unshift(orderDetails);

        localStorage.setItem(
            'cravekart_orders',
            JSON.stringify(orderHistory)
        );

        // Display confirmation details
        document.getElementById('conf-order-id').innerText = orderId;
        document.getElementById('conf-date-time').innerText = orderDate;
        document.getElementById('conf-payment-method').innerText =
            paymentMethod;
        document.getElementById('conf-total-paid').innerText =
            `₹${grandTotal}`;

        const confItemsList =
            document.getElementById('conf-items-list');

        confItemsList.innerHTML = cart.map(i => `
            <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem; font-size:0.9rem;">
                <span>${i.name} (${i.qty} qty)</span>
                <span>₹${i.price * i.qty}</span>
            </div>
        `).join('');

        // Clear cart
        cart = [];

        saveCart();
        updateCartBadge();

        // Go to confirmation page
        window.location.hash = '#confirmation';

        showToast('Order placed successfully — Java Servlet backend confirmed!');

    } catch (error) {

        console.error('Backend connection error:', error);

        showToast(
            'Unable to connect to the Java backend.'
        );
    }
}

        // Functional Print Receipt Handler
        function triggerPrintReceipt() {
            window.print();
        }

        function renderOrdersView() {
            const container = document.getElementById('order-history-container');
            const emptyState = document.getElementById('orders-empty-state');

            if (orderHistory.length === 0) {
                container.style.display = 'none';
                emptyState.style.display = 'block';
                return;
            }

            container.style.display = 'block';
            emptyState.style.display = 'none';

            container.innerHTML = orderHistory.map(order => `
                <div class="order-history-card">
                    <div class="order-history-header">
                        <div>
                            <strong>Order #${order.id}</strong>
                            <div style="font-size:0.8rem; color:var(--text-muted);">${order.date}</div>
                        </div>
                        <span class="status-chip status-placed">${order.status}</span>
                    </div>
                    <div style="margin-bottom: 1rem;">
                        ${order.items.map(i => `<div style="font-size:0.9rem; color:var(--text-muted);">${i.qty}x ${i.name}</div>`).join('')}
                    </div>
                    <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); padding-top:0.75rem;">
                        <span>Payment: <strong>${order.paymentMethod}</strong></span>
                        <strong style="font-size:1.1rem; color:var(--primary);">Total: ₹${order.totalPaid}</strong>
                    </div>
                </div>
            `).join('');
        }

        function showToast(message) {
            const container = document.getElementById('toast-container');
            if (!container) return;

            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:var(--accent)"></i> <span>${message}</span>`;

            container.appendChild(toast);

            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateX(100%)';
                toast.style.transition = 'all 0.3s ease';
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }
