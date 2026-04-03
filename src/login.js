import axios from "axios";
import "./style.css";
axios.defaults.baseURL = "https://api.zaferayan.com/";
const container = document.getElementById("container");
container.innerHTML = `
<div class="min-h-screen flex items-center justify-center bg-base-200">
<div class="card w-96 bg-base-100 shadow-xl">
<div class="card-body">
<h2 class="card-title justify-center">Giriş Yap</h2>
<div class="form-control">
<label class="label">
<span class="label-text">Email</span>
</label>
<input id="email" type="email" placeholder="ornek@mail.com" class="input
input-bordered" />
</div>
<div class="form-control">
<label class="label">
<span class="label-text">Şifre</span>
</label>
<input id="password" type="password" placeholder="••••••••" class="input
input-bordered" />
</div>
<div class="form-control mt-4 flex justify-center">
<button id="loginBtn" class="btn btn-primary">Giriş Yap</button>
</div>
<p class="text-center mt-2">
Hesabın yok mu? <a href="/register.html" class="link link-primary">Kayıt
Ol</a>
</p>
</div>
</div>
</div>
`;
const loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    const { data } = await axios.post("/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    window.location.href = "/";
  } catch (error) {
    alert("Giriş başarısız! Email veya şifre hatalı.");
  }
});
