const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const [firstname, lastname, email, password] = e.target.elements;

    if (password.value.length < 8 || !/\d/.test(password.value)) {
      alert("Mot de passe invalide (8 caracteres minimum + un chiffre)");
      return;
    }

    try {
      await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          firstname: firstname.value.trim(),
          lastname: lastname.value.trim(),
          email: email.value.trim(),
          password: password.value,
        }),
      });

      alert("Compte cree avec succes.");
      window.location.href = "login.html";
    } catch (err) {
      alert(err.message);
    }
  });
}
