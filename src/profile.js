import "./style.css";
import axios from "axios";
import { getToken, getAuthHeaders } from "./auth.js";
import { renderNavbar } from "./helpers.js";

axios.defaults.baseURL = "https://api.zaferayan.com/";

const container = document.getElementById("container");
const token = getToken();

if (!token) {
  window.location.href = "/login.html";
}

container.innerHTML = `
<div class="min-h-screen bg-base-200">
  <div class="navbar bg-base-100 shadow-sm px-4">
    <div class="flex-1">
      <a href="/index.html" class="btn btn-ghost text-xl">EfsaneBurada</a>
    </div>
    <div class="flex-none" id="navArea"></div>
  </div>

  <div class="flex items-center justify-center p-6">
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title justify-center">Profil</h2>
        <div id="profileInfo"></div>
      </div>
    </div>
  </div>
</div>
`;

const navArea = document.getElementById("navArea");
renderNavbar(navArea);

axios
  .get("/auth/me", getAuthHeaders())
  .then((res) => {
    const profileInfo = document.getElementById("profileInfo");

    profileInfo.innerHTML = `
      <p><strong>Kullanıcı Adı:</strong> ${res.data.username}</p>
      <p><strong>Email:</strong> ${res.data.email || "-"}</p>
    `;
  })
  .catch(() => {
    alert("Profil bilgileri alınamadı.");
    window.location.href = "/login.html";
  });
