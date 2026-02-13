document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const [firstName, lastName, email, password] = e.target.elements;

  if (password.value.length < 8 || !/\d/.test(password.value)) {
    alert("Mot de passe invalide (8 caractères minimum + un chiffre)");
    return;
  }

  try {
    await apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
      }),
    });

    alert("Compte créé avec succès !");
    window.location.href = "login.html";
  } catch (err) {
    alert(err.message);
  }
});
