const porductsListEl = document.querySelector(".products-list");
const seeMoreBtn = document.querySelector(".see-more-btn");
const productsEl = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const cartTotal = document.querySelector(".total-items-in-cart");
const checkOut = document.getElementById("checkoutBtn");

checkOut.addEventListener("click", () => {
  if (cartTotal.innerHTML < 1) {
    alert("Your cart is empty!");
  } else {
    alert("Thank you for your order!");
  }
});

seeMoreBtn.addEventListener("click", () => {
  porductsListEl.scrollIntoView({ behavior: "smooth" });
});

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
                    <div class="add-to-cart" onclick="addToCart(${product.id})">
                        <img src="./icons/bag-plus.png" alt="add to cart">
                    </div>
                </div>
            </div>
        `;
  });
}
renderProducts();

//Transfering the cart to JSON or an empty array if there is nothing in it
let cart = JSON.parse(localStorage.getItem("Cart")) || [];
updateCart();

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
  renderSubtotal();

  //Save cart in the local storage
  localStorage.setItem("Cart", JSON.stringify(cart));
}

function renderSubtotal() {
  let totalPrice = 0;
  let totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });
  subtotalEl.innerHTML = `Subtotal (${totalItems} items): $${totalPrice.toFixed(
    2
  )}`;
  cartTotal.innerHTML = `${totalItems}`;
}

function renderCartItems() {
  cartItemsEl.innerHTML = ""; //clear cart items;
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `
    <div class="cart-item">
               <div class="item-info" onclick="removeItem(${item.id})">
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

function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);

  updateCart();
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
