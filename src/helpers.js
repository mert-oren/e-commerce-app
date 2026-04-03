import axios from "axios";
import { getToken, logout, getAuthHeaders } from "./auth.js";

export function showAlert(message) {
  alert(message);
}

export function renderGuestNavbar(navArea) {
  navArea.innerHTML = `
    <div class="flex gap-2">
      <a href="/login.html" class="btn btn-outline btn-sm">Giriş Yap</a>
      <a href="/register.html" class="btn btn-primary btn-sm">Kayıt Ol</a>
    </div>
  `;
}

export function renderUserNavbar(navArea, userName) {
  navArea.innerHTML = `
    <div class="flex items-center gap-2">
      <span> Hoş geldin,</span>
      <a href="/profile.html" class="underline mr-4">${userName}</a>

      <button id="logoutBtn" class="btn btn-error text-white btn-sm">Logout</button>
    </div>
  `;

  const logoutBtn = document.getElementById("logoutBtn");

  logoutBtn.addEventListener("click", () => {
    logout();
  });
}

export function renderNavbar(navArea) {
  const token = getToken();

  if (!token) {
    renderGuestNavbar(navArea);
    return;
  }

  axios
    .get("/auth/me", getAuthHeaders())
    .then((res) => {
      const userName = res.data.username;
      renderUserNavbar(navArea, userName);
    })
    .catch(() => {
      localStorage.removeItem("token");
      renderGuestNavbar(navArea);
    });
}
