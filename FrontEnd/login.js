function login() {
  let button = document.querySelector("#login-submit");
  let error = document.querySelector("#login-error");
  let userInfo = {
    email: document.getElementById("signin-email"),
    password: document.getElementById("signin-password"),
  };

  button.addEventListener("click", (e) => {
    e.preventDefault();

    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userInfo.email.value,
        password: userInfo.password.value,
      }),
    })
      .then((response) => {
        if (response.ok) {
          window.open("index.html");
        } else if (response.status === 404) {
          error.innerHTML = "Csette adresse mail est inconnue.";
          error.removeAttribute("hidden");
        } else if (response.status === 401) {
          error.innerHTML = "Veuillez vérifier votre mot de passe.";
          error.removeAttribute("hidden");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

login();
