async function getWorks() {
  return await fetch("http://localhost:5678/api/works")
    .then((data) => data.json())
    .then((works) => works)
    .catch((error) => {
      console.log("Les données n'ont pas chargé" + error);
    });
}

async function getCategories() {
  return await fetch("http://localhost:5678/api/categories")
    .then((data) => data.json())
    .then((categories) => categories)
    .catch((error) => {
      console.log("Les données n'ont pas chargé : " + error);
    });
}

/* WORKS */

function displayWorks(works) {
  let gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  let galleryModal = document.getElementById("modal_projet");
  gallery.innerHTML = "";

  /* BOUCLE */

  for (const work of works) {
    /* POUR PAGE WEB */
    let image = document.createElement("img");
    let figure = document.createElement("figure");
    let figCaption = document.createElement("figCaption");

    /*  POUR MODALE */
    let figureModal = document.createElement("figure");
    let imageModal = document.createElement("div");
    let textGalleryModal = document.createElement("p");
    textGalleryModal.innerHTML = "éditer";
    const icons = document.createElement("div");
    const deleteButton = document.createElement("a");
    deleteButton.setAttribute("id", work.id);
    deleteButton.classList.add("fa-solid", "fa-trash-can", "delete_button");
    const arrow = document.createElement("a");
    arrow.classList.add(
      "fa-solid",
      "fa-arrows-up-down-left-right",
      "arrow_button"
    ); /*   POUR PAGE WEB */

    image.src = work.imageUrl;
    image.setAttribute("crossorigin", "anonymous");
    figCaption.innerText = work.title;
    figure.appendChild(image);
    gallery.appendChild(figure);
    figure.appendChild(figCaption);
    imageModal.appendChild(image.cloneNode(true));

    /* POUR MODALE */

    galleryModal.appendChild(figureModal);
    figureModal.appendChild(imageModal);
    figureModal.appendChild(textGalleryModal);
    figureModal.appendChild(icons);
    icons.appendChild(deleteButton);
    icons.appendChild(arrow);
  }

  const deleteButtons = document.querySelectorAll(".delete_button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      if (confirm("Êtes-vous sûr de vouloir supprimer ce fichier?")) {
        deleteWork(button.getAttribute("id"));
      }
    });
  });
}

/* CATEGORIES */

async function displayCategories(categories) {
  let filter = document.querySelector(".filter");
  filter.innerHTML = "";

  let all = document.createElement("button");
  all.id = "all";
  all.innerHTML = "Tous";
  all.className = "filter_element";

  filter.appendChild(all);

  let select_input = document.getElementById("category-input");

  for (const category of categories) {
    let filter_element = document.createElement("button");
    let option_input = new Option(category.name, category.id);

    filter_element.id = category.id;
    filter_element.innerHTML = category.name;
    filter_element.className = "filter_element";
    filter.appendChild(filter_element);

    select_input.add(option_input, undefined);
  }
}

async function indexLogout() {
  const categories = await getCategories();
  const works = await getWorks();

  displayCategories(categories);
  displayWorks(works);
  console.log(categories, works);

  let filters = document.querySelectorAll(".filter_element");
  let [all, ...rest] = filters;

  for (const filter of rest) {
    filter.addEventListener("click", () => {
      const newWorks = works.filter((work) => work.category.id == filter.id);
      displayWorks(newWorks);
    });
  }

  all.addEventListener("click", () => {
    displayWorks(works);
  });

  for (const filter of filters) {
    filter.addEventListener("click", () => {
      let active = document.querySelector(".filter_element.active");
      if (active) {
        active.classList.remove("active");
      }
      filter.classList.add("active");
    });
  }
}

indexLogout();

if (localStorage.token) {
  let logout = document.querySelector(".login");
  logout.innerHTML = "logout";
  logout.addEventListener("click", () => {
    localStorage.removeItem("token");
  });

  let edition = document.querySelectorAll(".edition");
  /* POUR BOUTONS MODIER ET BANNER */
  edition.forEach((element) => {
    element.hidden = false;
  });
}
const token = localStorage.token;

async function deleteWork(workId) {
  const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
    method: "DELETE",
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  });
  try {
    if (response.ok) {
      const figmodal = document.getElementById(workId).parentNode.parentNode;
      figmodal.style.display = "none";
    }
  } catch (error) {
    console.log(error);
  }
}

/* FORM ADD IMAGE */

const form = document.querySelector("#image-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData();
  const image = document.querySelector("#image-input").files[0];
  const title = document.getElementById("title-input").value;
  const category = document.getElementById("category-input").value;
  formData.append("image", image);
  formData.append("title", title);
  formData.append("category", category);

  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formData,
  };

  await fetch("http://localhost:5678/api/works/", requestOptions)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
});

let previewDiv = document.querySelector(".preview");

document.getElementById("image-input").addEventListener("change", function (e) {
  if (e.target.files[0]) {
    previewDiv.style.display = "flex";
  }
});

form.addEventListener("input", function (event) {
  let isValid = form.checkValidity();
  if (isValid) {
    document.querySelector(".button_send_new_work").disabled = false;
    document.querySelector(".button_send_new_work").style.background =
      "#1D6154";
  } else {
    document.querySelector(".button_send_new_work").style.background = "grey";
  }
});
