
// script.js
document.addEventListener('DOMContentLoaded', function() {
    const cart = document.querySelector('.cart');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;

    // Sample data for items (replace with your actual data)
    const itemsData = [
        { id: 1, name: 'Watermellon', image: 'watermellon.webp', price: 10 },
        { id: 2, name: 'Apple', image: 'apple.jpg', price: 15 },
        { id: 3, name: 'Grapes', image: 'grapes.jpg', price: 20 }
    ];

    // Initialize cart with items
    itemsData.forEach(itemData => {
        addItemToCart(itemData);
    });

    // Function to add item to cart
    function addItemToCart(itemData) {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');

        itemElement.innerHTML = `
            <img src="${itemData.image}" alt="${itemData.name}">
            <div class="item-info">
                <h3>${itemData.name}</h3>
                <div class="controls">
                    <button class="quantity-btn minus">-</button>
                    <span class="quantity">1</span>
                    <button class="quantity-btn plus">+</button>
                    <button class="delete-btn">Delete</button>
                    <button class="like-btn">Like</button>
                </div>
                <span class="price">$${itemData.price.toFixed(2)}</span>
            </div>
        `;

        // Event listeners for quantity buttons
        const minusBtn = itemElement.querySelector('.minus');
        const plusBtn = itemElement.querySelector('.plus');
        const quantityElement = itemElement.querySelector('.quantity');
        const priceElement = itemElement.querySelector('.price');

        minusBtn.addEventListener('click', function() {
            let quantity = parseInt(quantityElement.textContent);
            if (quantity > 1) {
                quantity--;
                quantityElement.textContent = quantity;
                updateTotalPrice();
            }
        });

        plusBtn.addEventListener('click', function() {
            let quantity = parseInt(quantityElement.textContent);
            quantity++;
            quantityElement.textContent = quantity;
            updateTotalPrice();
        });

        // Event listener for delete button
        const deleteBtn = itemElement.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function() {
            itemElement.remove();
            updateTotalPrice();
        });

        // Event listener for like button
        const likeBtn = itemElement.querySelector('.like-btn');
        likeBtn.addEventListener('click', function() {
            likeBtn.classList.toggle('active');
        });

        // Append item to cart
        cart.appendChild(itemElement);
        updateTotalPrice();
    }

    // Function to update total price
    function updateTotalPrice() {
        totalPrice = 0;
        const items = document.querySelectorAll('.item');
        items.forEach(item => {
            const price = parseFloat(item.querySelector('.price').textContent.replace('$', ''));
            const quantity = parseInt(item.querySelector('.quantity').textContent);
            totalPrice += price * quantity;
        });
        totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
    }
});
