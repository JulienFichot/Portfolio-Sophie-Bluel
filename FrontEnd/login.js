function login() {
  let button = document.querySelector("#login-submit");
  let error = document.querySelector("#login-error");
  let userInfo = {
    email: document.getElementById("signin-email"),
    password: document.getElementById("signin-password"),
  };
  function createDiv() {
    // Création de la div
    var div = document.createElement("div");
    div.style.backgroundColor = "black";
    div.style.color = "white";
    div.style.padding = "20px";

    // Ajout de texte à la div
    var text = document.createTextNode("Bienvenue sur mon site web !");
    div.appendChild(text);

    // Ajout d'un bouton
    var button = document.createElement("button");
    button.innerHTML = "Cliquez ici";
    div.appendChild(button);

    // Ajout de la div au document
    document.body.appendChild(div);
  }

  button.addEventListener("click", (e) => {
    createDiv;

    e.preventDefault();

    //localhost:5678/api/works/IDPROJET

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
          return response.json();
        } else if (response.status === 404) {
          error.innerHTML = "Cette adresse mail est inconnue.";
          error.removeAttribute("hidden");
        } else if (response.status === 401) {
          error.innerHTML = "Veuillez vérifier votre mot de passe.";
          error.removeAttribute("hidden");
        }
        return false;
      })
      .then((data) => {
        if (data) {
          localStorage.setItem("token", data.token);
          window.location = "index.html";
          console.log(data.token);
        }
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

login();
