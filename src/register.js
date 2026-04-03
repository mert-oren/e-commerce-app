import axios from "axios";
import "./style.css";
axios.defaults.baseURL = "https://api.zaferayan.com/";
const container = document.getElementById("container");
container.innerHTML = `
<div class="min-h-screen flex items-center justify-center bg-base-200">
    <div class="card w-96 bg-base-100 shadow-xl">
    
        <div class="card-body">
            <h2 class="card-title justify-center">Kayit Ol</h2>
            <div class="form-control">
            <label class="label">
                <span class="label-text">Kullanici Adi</span>
            </label>
            <input id="username" type="text" placeholder="username" class="input input-bordered" />
            </div>
            <div class="form-control">
            <label class="label">
                <span class="label-text">Email</span>
            </label>
            <input id="email" type="email" placeholder="ornek@mail.com" class="input input-bordered" />
            </div>
            <div class="form-control">
                <label class="label">
                    <span class="label-text">Şifre</span>
                </label>
                <input id="password" type="password" placeholder="••••••••" class="input input-bordered" />
            </div>
            <div class="form-control mt-4 flex justify-center">
                <button id="registerBtn" class="btn btn-primary">Kayit Ol</button>
            </div>
            <p class="text-center mt-2">
                Zaten hesabin var mi? <a href="/login.html" class="link link-primary">Giris
                Yap</a>
            </p>
        </div>
    </div>
</div>
`;
const registerBtn = document.getElementById("registerBtn");
registerBtn.addEventListener("click", async () => {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await axios.post("/auth/register", {
      username,
      email,
      password,
    });

    alert("Kayıt başarılı. Şimdi giriş yapabilirsiniz.");
    window.location.href = "/login.html";
  } catch (error) {
    alert("Kayıt başarısız!");
  }
});
