// Product Data
const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 99.99,
    oldPrice: 129.99,
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    name: "Smartphone X Pro",
    description: "Latest smartphone with advanced camera features",
    price: 899.99,
    oldPrice: 999.99,
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    name: "Men's Casual T-Shirt",
    description: "Comfortable cotton t-shirt for everyday wear",
    price: 24.99,
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 4,
    name: "Women's Running Shoes",
    description: "Lightweight running shoes with cushioned soles",
    price: 79.99,
    oldPrice: 89.99,
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 5,
    name: "Stainless Steel Cookware Set",
    description: "10-piece cookware set for your kitchen",
    price: 149.99,
    category: "home",
    image:
      "https://images.unsplash.com/photo-1583778176475-6a92a2365a0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 6,
    name: "Smart Watch Series 5",
    description: "Track your fitness and stay connected",
    price: 199.99,
    oldPrice: 249.99,
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 7,
    name: "Denim Jeans",
    description: "Classic fit jeans for men",
    price: 49.99,
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 8,
    name: "Air Fryer",
    description: "Healthy cooking with less oil",
    price: 89.99,
    category: "home",
    image:
      "https://images.unsplash.com/photo-1611791484672-3d0c994bd4e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
];

// DOM Elements
const productGrid = document.querySelector(".product-grid");
const filterButtons = document.querySelectorAll(".filter-btn");
const cartIcon = document.querySelector(".cart-icon");
const cartCount = document.querySelector(".cart-count");
const cartSidebar = document.querySelector(".cart-sidebar");
const closeCart = document.querySelector(".close-cart");
const overlay = document.querySelector(".overlay");
const cartItemsContainer = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".total-price");
const checkoutBtn = document.querySelector(".checkout-btn");
const navLinks = document.querySelectorAll(".nav-link");

// Cart State
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Initialize the app
function init() {
  renderProducts(products);
  setupEventListeners();
  updateCartCount();
  setupScrollSpy();
}

// Render products to the DOM
function renderProducts(productsToRender) {
  productGrid.innerHTML = "";

  productsToRender.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.dataset.category = product.category;

    productCard.innerHTML = `
                  <div class="product-image">
                      <img src="${product.image}" alt="${product.name}">
                  </div>
                  <div class="product-info">
                      <h3>${product.name}</h3>
                      <p>${product.description}</p>
                      <div class="product-price">
                          <div>
                              ${product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : ""}
                              <span class="price">$${product.price.toFixed(2)}</span>
                          </div>
                          <button class="add-to-cart" data-id="${product.id}">
                              <i class="fas fa-plus"></i>
                          </button>
                      </div>
                  </div>
              `;

    productGrid.appendChild(productCard);
  });

  // Add event listeners to the new add to cart buttons
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", addToCart);
  });
}

// Setup event listeners
function setupEventListeners() {
  // Filter buttons
  filterButtons.forEach((button) => {
    button.addEventListener("click", filterProducts);
  });

  // Cart icon
  cartIcon.addEventListener("click", toggleCart);

  // Close cart
  closeCart.addEventListener("click", toggleCart);
  overlay.addEventListener("click", toggleCart);

  // Checkout button
  checkoutBtn.addEventListener("click", checkout);

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });
}

// Setup scroll spy for active nav links
function setupScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const heroSection = document.querySelector(".hero");

  function onScroll() {
    let scrollPosition = window.scrollY + 100;

    // Check hero section first
    if (scrollPosition < heroSection.offsetHeight) {
      navLinks.forEach((link) => link.classList.remove("active"));
      document.querySelector('a[href="#home"]').classList.add("active");
      return;
    }

    // Check other sections
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", onScroll);
  window.addEventListener("load", onScroll);
}

// Filter products by category
function filterProducts(e) {
  const filter = e.target.dataset.filter;

  // Update active button
  filterButtons.forEach((button) => {
    button.classList.remove("active");
  });
  e.target.classList.add("active");

  if (filter === "all") {
    renderProducts(products);
  } else {
    const filteredProducts = products.filter(
      (product) => product.category === filter
    );
    renderProducts(filteredProducts);
  }
}

// Add to cart
function addToCart(e) {
  const productId = parseInt(e.target.closest(".add-to-cart").dataset.id);
  const product = products.find((p) => p.id === productId);

  // Check if product is already in cart
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  updateCart();
  showAddToCartFeedback(e.target);
}

// Show feedback when adding to cart
function showAddToCartFeedback(button) {
  button.innerHTML = '<i class="fas fa-check"></i>';
  button.style.backgroundColor = "var(--success-color)";

  setTimeout(() => {
    button.innerHTML = '<i class="fas fa-plus"></i>';
    button.style.backgroundColor = "var(--primary-color)";
  }, 1000);
}

// Toggle cart visibility
function toggleCart() {
  cartSidebar.classList.toggle("active");
  overlay.classList.toggle("active");

  if (cartSidebar.classList.contains("active")) {
    renderCartItems();
  }
}

// Render cart items
function renderCartItems() {
  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<p class="empty-cart">Your cart is empty</p>';
    return;
  }

  cartItemsContainer.innerHTML = "";

  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    cartItem.innerHTML = `
                  <div class="cart-item-img">
                      <img src="${item.image}" alt="${item.name}">
                  </div>
                  <div class="cart-item-details">
                      <h4>${item.name}</h4>
                      <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                      <div class="cart-item-actions">
                          <div class="quantity-control">
                              <button class="quantity-btn minus" data-id="${item.id}">-</button>
                              <input type="text" class="quantity" value="${item.quantity}" readonly>
                              <button class="quantity-btn plus" data-id="${item.id}">+</button>
                          </div>
                          <button class="remove-item" data-id="${item.id}">
                              <i class="fas fa-trash"></i>
                          </button>
                      </div>
                  </div>
              `;

    cartItemsContainer.appendChild(cartItem);
  });

  // Add event listeners to quantity controls and remove buttons
  document.querySelectorAll(".quantity-btn.minus").forEach((button) => {
    button.addEventListener("click", decreaseQuantity);
  });

  document.querySelectorAll(".quantity-btn.plus").forEach((button) => {
    button.addEventListener("click", increaseQuantity);
  });

  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", removeItem);
  });

  // Update total
  updateCartTotal();
}

// Update cart total
function updateCartTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Update cart count
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = count;
}

// Update cart in localStorage and UI
function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();

  if (cartSidebar.classList.contains("active")) {
    renderCartItems();
  }
}

// Decrease item quantity
function decreaseQuantity(e) {
  const productId = parseInt(e.target.dataset.id);
  const item = cart.find((item) => item.id === productId);

  if (item.quantity > 1) {
    item.quantity -= 1;
  } else {
    cart = cart.filter((item) => item.id !== productId);
  }

  updateCart();
}

// Increase item quantity
function increaseQuantity(e) {
  const productId = parseInt(e.target.dataset.id);
  const item = cart.find((item) => item.id === productId);
  item.quantity += 1;
  updateCart();
}

// Remove item from cart
function removeItem(e) {
  const productId = parseInt(e.target.closest(".remove-item").dataset.id);
  cart = cart.filter((item) => item.id !== productId);
  updateCart();
}

// Checkout
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  alert(
    `Thank you for your purchase! Total: $${cart
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2)}`
  );
  cart = [];
  updateCart();
  toggleCart();
}

// Initialize the app
init();
