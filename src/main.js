const cartIcon = document.querySelector("#icon-cart");
const cart = document.querySelector(".cart");
const cartClose =document.querySelector("#cart-close");
cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));


  // <img src="${product.image}" alt="${product.title}">
                    // <h4>${product.title}</h4>
                    // <p><strong>$${product.price}</strong></p>


//  fetch image

{/* <h2>Product Store</h2>
    <input type="text" id="searchInput" placeholder="Search product...">
    <button onclick="searchProducts()">Search</button>

    <div class="products" id="productsContainer"></div> */}

        async function fetchProducts() {
            try {
                let response = await fetch('https://fakestoreapi.com/products');
                return await response.json();
            } catch (error) {
                console.error('Error fetching products:', error);
                return [];
            }
        }
        

        async function searchProducts() {
            let query = document.getElementById('Search-input').value.toLowerCase();
            let products = await fetchProducts();
            let filteredProducts = products.filter(product => 
                product.title.toLowerCase().includes(query)
            );
            console.log(filteredProducts)
            displayProducts(filteredProducts);
        }

        function displayProducts(products) {
            let container = document.getElementById('productsContainer');
            container.innerHTML = ""; // Clear previous results

            if (products.length === 0) {
                container.innerHTML = "<p>No products found</p>";
                return;
            }

            products.forEach(product => {
                let productDiv = document.createElement('div');
                productDiv.classList.add('product');
                productDiv.innerHTML = `
                  <div class="product-box" >
                    <div class="img-box">
                      <img src="${product.image}" alt="${product.title}">
                    </div>
                    <h2 class="product-title">${product.title}</h2>
                    <div class="price-cart">
                       <span class="price">$${product.price}</span>
                       <i class="ri-shopping-bag-line add-cart" onclick="hello()"></i>
                    </div>
                  </div>
                `;
                container.appendChild(productDiv);
            });
        }

        // Fetch and display all products initially
        window.onload = searchProducts;
    










function hello(){
  const productBox = event.target.closest(".product-box");
        addToCart(productBox)
}


// const addCartButtons = document.querySelectorAll(".add-cart");
// addCartButtons.forEach(button => {
//     button.addEventListener("click", (event) => {
//       console.log("hello")
//         const productBox = event.target.closest(".product-box");
//         addToCart(productBox)
//     });
// });


const cartContent = document.querySelector(".cart-content");


const addToCart = productBox => {
    const productImgSrc = productBox.querySelector("img").src;
    const productTitle = productBox.querySelector(".product-title").textContent;
    const productPrice = productBox.querySelector(".price").textContent;
 

    const cartItems = cartContent.querySelectorAll(".product-title");
    for (let item of cartItems) {
      if(item.textContent === productTitle){
        alert("This item is already in the cart.");
        return;
      }
    }


    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML = `
    <img src="${productImgSrc}" class="cart-img" alt="">
        <div class="cart-detail">
          <h2 class="cart-product-title">${productTitle}</h2>
          <span class="cart-price">${productPrice}</span>
          <div class="cart-quantity">
            <button id="decrement">-</button>
            <span class="number">1</span>
            <button id="increment">+</button>
          </div>
        </div>
        <i class="ri-delete-bin-line cart-remove"></i>
      `;

      cartContent.appendChild(cartBox);

      cartBox.querySelector(".cart-remove").addEventListener("click", () => {
        cartBox.remove();

        updateCartCount(-1);

        updateTotalPrice();
      });



      cartBox.querySelector(".cart-quantity").addEventListener("click", event => {
        const numberElement = cartBox.querySelector(".number");
        const decrementButton = cartBox.querySelector("#decrement");
        let quantity = numberElement.textContent;
        
        
        if (event.target.id === "decrement" && quantity > 1) {
          quantity--;
          if (quantity === 1) {
            decrementButton.style.color = "#999";
          }
        } else if (event.target.id === "increment") {
          quantity++;
          decrementButton.style.color = "#333";
        }
        numberElement.textContent = quantity;

        updateTotalPrice();
      });

      updateCartCount(1);

      updateTotalPrice();
};


const updateTotalPrice = () => {
  const totalPriceElement = document.querySelector(".total-price");
  const cartBoxes = cartContent.querySelectorAll(".cart-box");
  let total = 0;
  cartBoxes.forEach(cartBox => {
    const priceElement = cartBox.querySelector(".cart-price");
    const quantityElement = cartBox.querySelector(".number");
    const price = priceElement.textContent.replace("$", "");
    const quantity = quantityElement.textContent;
    total += price * quantity;
  });
  totalPriceElement.textContent = `$${total}`;
};


let cartItemCount = 0;
const updateCartCount = change => {
  const cartItemCountBadge = document.querySelector(".cart-count");
  cartItemCount += change;
  if (cartItemCount > 0) {
    cartItemCountBadge.style.visibility = "visible";
    cartItemCountBadge.textContent = cartItemCount;
  }
  else {
    cartItemCountBadge.style.visibility = "hidden";
    cartItemCountBadge.textContent = "";
  }
};



const buyNowButton = document.querySelector(".btn-buy");
buyNowButton.addEventListener("click", () => {
  const cartBoxes = cartContent.querySelectorAll(".cart-box");
  if (cartBoxes.length === 0) {
    alert("Your cart is empty. Please add items to your cart before buying.");
    return;
  }
  cartBoxes.forEach(cartBox => cartBox.remove());

  cartItemCount = 0;
  updateCartCount(0);

  updateTotalPrice();

  alert("Thank you for your purchase");
});