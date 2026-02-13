// ================================
// AUTH FRONTEND – Maison Épouvante
// ================================

const API_URL = "http://localhost:3000/api";

// -------------------------------
// LOGIN
// -------------------------------
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = loginForm.querySelector("input[type='email']").value;
    const password = loginForm.querySelector("input[type='password']").value;

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Erreur de connexion");
        return;
      }

      // 🔐 Sauvegarde du token
      localStorage.setItem("token", data.token);

      // 🔁 Redirection vers les annonces
      window.location.href = "index.html";
    } catch (err) {
      alert("Erreur serveur");
      console.error(err);
    }
  });
}

// -------------------------------
// REGISTER
// -------------------------------
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const inputs = registerForm.querySelectorAll("input");

    const userData = {
      lastname: inputs[0].value,
      firstname: inputs[1].value,
      email: inputs[2].value,
      password: inputs[3].value,
    };

    if (userData.password.length < 8) {
      alert("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Erreur d'inscription");
        return;
      }

      alert("Inscription réussie ! Vous pouvez vous connecter.");
      registerForm.reset();

      // Revenir à l'onglet connexion
      document
        .querySelector("[data-bs-target='#login']")
        .click();
    } catch (err) {
      alert("Erreur serveur");
      console.error(err);
    }
  });
}

// -------------------------------
// LOGOUT (utilisable plus tard)
// -------------------------------
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}
