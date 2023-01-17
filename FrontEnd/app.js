let modal = null;

const openModal = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));
  target.style.display = null;
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modal", "true");
  modal = target;
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};

const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
  modal = null;
};

const stopPropagation = function (e) {
  e.stopPropagation();
};

document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

/* Afficher les works 

async function getWorks() {
  return await fetch("http://localhost:5678/api/works")
    .then((data) => data.json())
    .then((works) => works)
    .catch((error) => {
      console.log("Les données n'ont pas chargé" + error);
    });
}
function displayWorks(works) {
  let gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  for (const work of works) {
    let image = document.createElement("img");
    let figure = document.createElement("figure");
    let figCaption = document.createElement("figCaption");

    image.src = work.imageUrl;
    image.setAttribute("crossorigin", "anonymous");
    figCaption.innerText = work.title;
    gallery.appendChild(figure);
    figure.appendChild(image);
    figure.appendChild(figCaption);
  }
}
async function index() {
  const works = await getWorks();

  displayWorks(works);
  console.log(works);

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

index();

*/
