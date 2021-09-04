const porductsListEl = document.querySelector(".products-list");
const seeMoreBtn = document.querySelector(".see-more-btn");

seeMoreBtn.addEventListener("click", () => {
  porductsListEl.scrollIntoView({ behavior: "smooth" });
});

// add cart on click event

const productsEl = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-items");

function renderProducts() {
  products.forEach((product) => {
    productsEl.innerHTML += `
        <div class="item">
                <div class="item-container">
                    <div class="item-img">
                        <img src="${product.imgSrc}" alt="${product.name}">
                    </div>
                    <div class="desc">
                        <h2>${product.name}</h2>
                        <h2><small>$</small>${product.price}</h2>
                        <p>
                            ${product.description}
                        </p>
                    </div>
                    <div class="add-to-wishlist">
                        <img src="./icons/heart.png" alt="add to wish list">
                    </div>
                    <div class="add-to-cart" onclick="addToCart(${product.id})">
                        <img src="./icons/bag-plus.png" alt="add to cart">
                    </div>
                </div>
            </div>
        `;
  });
}
renderProducts();

let cart = [];

function addToCart(id) {
  if (cart.some((item) => item.id === id)) {
    //Checking if the product already exists in the cart array
    changeUnits("plus", id);
  } else {
    const item = products.find((product) => product.id === id);
    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }

  updateCart();
}

//Updaring the cart
function updateCart() {
  renderCartItems();
  // renderSubtotal()
}

function renderCartItems() {
  cartItemsEl.innerHTML = ""; //clear cart items;
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `
    <div class="cart-item">
                    <div class="item-info">
                        <img src="${item.imgSrc}" alt="${item.name}">
                        <h4>${item.name}</h4>
                    </div>
                    <div class="unit-price">
                        <small>$</small>${item.price}
                    </div>
                    <div class="units">
                        <div class="btn minus" onclick="changeUnits('minus', ${item.id})">-</div>
                        <div class="number">${item.numberOfUnits}</div>
                        <div class="btn plus" onclick="changeUnits('plus', ${item.id})">+</div>           
                </div>
     </div>
     `;
  });
}

function changeUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;
    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < item.instock) {
        numberOfUnits++;
      }
    }
    return {
      ...item,
      numberOfUnits,
    };
  });
  updateCart();
}
