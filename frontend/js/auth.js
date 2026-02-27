const loginForm = document.getElementById("loginForm");
const registerFormInline = document.getElementById("registerForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = loginForm.querySelector("input[type='email']").value.trim();
    const password = loginForm.querySelector("input[type='password']").value;

    try {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      localStorage.setItem("token", data.token);
      window.location.href = "index.html";
    } catch (err) {
      alert(err.message || "Erreur de connexion");
    }
  });
}

if (registerFormInline) {
  registerFormInline.addEventListener("submit", async (e) => {
    e.preventDefault();

    const inputs = registerFormInline.querySelectorAll("input");
    const lastname = inputs[0].value.trim();
    const firstname = inputs[1].value.trim();
    const email = inputs[2].value.trim();
    const password = inputs[3].value;

    if (password.length < 8) {
      alert("Le mot de passe doit contenir au moins 8 caracteres");
      return;
    }

    try {
      await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({ firstname, lastname, email, password }),
      });

      alert("Inscription reussie. Vous pouvez vous connecter.");
      registerFormInline.reset();

      const loginTabButton = document.querySelector("[data-bs-target='#login']");
      if (loginTabButton) {
        loginTabButton.click();
      }
    } catch (err) {
      alert(err.message || "Erreur d'inscription");
    }
  });
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}
