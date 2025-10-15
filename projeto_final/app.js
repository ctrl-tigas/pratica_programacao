// app.js
document.addEventListener("DOMContentLoaded", () => {
  const productsRoot = document.querySelector(".product-list");
  const cartList = document.querySelector(".cart-list");
  const cartTemplate = document.getElementById("cart-item-template");
  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("total");
  const discountRow = document.querySelector(".discount-row");
  const discountEl = document.getElementById("discount");
  const couponInput = document.getElementById("coupon-code");
  const applyCouponBtn = document.getElementById("apply-coupon");
  const announcer = document.getElementById("cart-announcer");
  let discount = 0;
  const state = {};

  // gather products from DOM and initialize cart state
  const productEls = document.querySelectorAll(".product");
  productEls.forEach((el) => {
    const id = el.dataset.id;
    const name = el.querySelector(".product-link.name").textContent.trim();
    const price = parseFloat(el.querySelector(".price").dataset.price);
    const img = el.querySelector(".product-image").getAttribute("src");
    const qtyInput = el.querySelector(".qty-input");
    const initialQty = Math.max(0, parseInt(qtyInput.value, 10) || 0);
    state[id] = { id, name, price, img, qty: initialQty };
  });

  // render cart from state
  function renderCart() {
    cartList.innerHTML = "";
    Object.values(state).forEach((item) => {
      if (item.qty <= 0) return;
      const node = cartTemplate.content.cloneNode(true);
      const li = node.querySelector(".cart-item");
      li.dataset.id = item.id;
      node.querySelector(".cart-image").src = item.img;
      node.querySelector(".cart-image").alt = item.name;
      node.querySelector(".cart-name").textContent = item.name;
      node.querySelector(".cart-name").href = `products/${item.id}.html`;
      node.querySelector(".cart-qty-input").value = item.qty;
      node.querySelector(".cart-price").textContent = `$${(item.price * item.qty).toFixed(
        2
      )}`;
      cartList.appendChild(node);
    });
    attachCartListeners();
    updateTotals();
  }

  function attachCartListeners() {
    const cartItems = cartList.querySelectorAll(".cart-item");
    cartItems.forEach((ci) => {
      const id = ci.dataset.id;
      const inc = ci.querySelector(".cart-increase");
      const dec = ci.querySelector(".cart-decrease");
      const input = ci.querySelector(".cart-qty-input");
      const remove = ci.querySelector(".cart-remove");
      inc.onclick = () => {
        state[id].qty = Math.max(0, state[id].qty + 1);
        renderCart();
        announcer.textContent = `${state[id].name} quantity increased to ${state[id].qty}`;
      };
      dec.onclick = () => {
        state[id].qty = Math.max(0, state[id].qty - 1);
        renderCart();
        announcer.textContent = `${state[id].name} quantity decreased to ${state[id].qty}`;
      };
      input.onchange = () => {
        state[id].qty = Math.max(0, parseInt(input.value, 10) || 0);
        renderCart();
        announcer.textContent = `${state[id].name} quantity set to ${state[id].qty}`;
      };
      remove.onclick = () => {
        state[id].qty = 0;
        renderCart();
        announcer.textContent = `${state[id].name} removed from cart`;
      };
    });
  }

  function updateTotals() {
    let subtotal = 0;
    Object.values(state).forEach((it) => {
      subtotal += it.price * (it.qty || 0);
    });
    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    const discountAmount = subtotal * discount;
    if (discountAmount > 0) {
      discountRow.hidden = false;
      discountEl.textContent = `-$${discountAmount.toFixed(2)}`;
    } else {
      discountRow.hidden = true;
    }
    totalEl.textContent = `$${(subtotal - discountAmount).toFixed(2)}`;
  }

  // wire product controls (in product list)
  productEls.forEach((el) => {
    const id = el.dataset.id;
    const inc = el.querySelector(".qty-increase");
    const dec = el.querySelector(".qty-decrease");
    const input = el.querySelector(".qty-input");
    const removeBtn = el.querySelector(".remove-product");
    inc.onclick = () => {
      state[id].qty = Math.max(0, state[id].qty + 1);
      input.value = state[id].qty;
      renderCart();
      announcer.textContent = `${state[id].name} quantity increased to ${state[id].qty}`;
    };
    dec.onclick = () => {
      state[id].qty = Math.max(0, state[id].qty - 1);
      input.value = state[id].qty;
      renderCart();
      announcer.textContent = `${state[id].name} quantity decreased to ${state[id].qty}`;
    };
    input.onchange = () => {
      state[id].qty = Math.max(0, parseInt(input.value, 10) || 0);
      renderCart();
      announcer.textContent = `${state[id].name} quantity set to ${state[id].qty}`;
    };
    removeBtn.onclick = () => {
      state[id].qty = 0;
      input.value = 0;
      renderCart();
      announcer.textContent = `${state[id].name} removed from cart`;
    };
  });

  applyCouponBtn.onclick = () => {
    const code = couponInput.value.trim();
    if (code === "DESCONTO") {
      discount = 0.25;
      announcer.textContent = "Coupon applied: 25% off";
    } else {
      discount = 0;
      announcer.textContent = "Coupon invalid";
    }
    updateTotals();
    renderCart();
  };

  couponInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      applyCouponBtn.click();
    }
  });

  // initial render
  renderCart();
}); // end DOMContentLoaded
