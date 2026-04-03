import "./style.css";
import axios from "axios";
import { fetchProducts } from "./products.js";
import { createOrder } from "./order.js";
import { renderNavbar, showAlert } from "./helpers.js";
import { getToken } from "./auth.js";

axios.defaults.baseURL = "https://api.zaferayan.com";

const app = document.getElementById("app");

app.innerHTML = `
<div class="min-h-screen bg-base-200">
  <div class="navbar bg-base-100 shadow-sm px-4">
    <div class="flex-1">
      <a href="/index.html" class="btn btn-ghost text-xl">EfsaneBurada</a>
    </div>
    <div class="flex-none" id="navArea"></div>
  </div>

  <main class="p-6">
    <div id="productList" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"></div>
  </main>
</div>
`;

const navArea = document.getElementById("navArea");

renderNavbar(navArea);

function renderProducts(products) {
  const productList = document.getElementById("productList");

  const html = products
    .map(
      (v) => `
        <div class="card bg-base-100 shadow-xl overflow-hidden">
          <figure class="bg-orange-300 px-2 py-2">
            <img
              src="https://picsum.photos/500/320?random=${v.id}"
              alt="${v.name}"
              class="h-48 w-full rounded-xl object-cover"
            />
          </figure>

          <div class="card-body gap-4">
            <div class="flex items-start gap-3">
              <div>
                <h2 class="card-title text-xl font-bold">${v.name}</h2>
              </div>
              <span class="badge ml-auto">${v.stock} stok</span>
            </div>

            <div>
              <p class="text-2xl font-extrabold">${v.price} TL</p>
              <p class="text-sm text-base-content/60">KDV dahil</p>
            </div>

            <div class="card-actions items-center justify-between">
              <div class="badge badge-outline">${v.category}</div>
              <button class="btn btn-success order-btn" product-id="${v.id}">
                Sipariş Ver
              </button>
            </div>
          </div>
        </div>
      `,
    )
    .join("");

  productList.innerHTML = html;

  const orderButtons = document.querySelectorAll(".order-btn");

  for (let i = 0; i < orderButtons.length; i++) {
    orderButtons[i].addEventListener("click", function () {
      const productId = this.getAttribute("product-id");
      orderProduct(productId);
    });
  }
}

function loadProducts() {
  fetchProducts()
    .then((res) => {
      renderProducts(res.data);
    })
    .catch(() => {
      const productList = document.getElementById("productList");

      productList.innerHTML = `
        <div class="alert alert-error">
          <span>Ürünler yüklenemedi.</span>
        </div>
      `;
    });
}

function orderProduct(productId) {
  const token = getToken();

  if (!token) {
    showAlert("Sipariş vermek için giriş yapın!");
    window.location.href = "/login.html";
    return;
  }

  createOrder(productId)
    .then(() => {
      showAlert("Sipariş başarıyla oluşturuldu.");
    })
    .catch(() => {
      showAlert("Sipariş oluşturulamadı.");
    });
}

loadProducts();
