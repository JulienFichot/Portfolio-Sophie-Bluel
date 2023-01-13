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

async function displayCategories(categories) {
  let filter = document.querySelector(".filter");
  filter.innerHTML = "";

  let all = document.createElement("button");
  all.id = "all";
  all.innerHTML = "Tous";
  all.className = "filter_element";

  filter.appendChild(all);

  for (const category of categories) {
    let filter_element = document.createElement("button");

    filter_element.id = category.id;
    filter_element.innerHTML = category.name;
    filter_element.className = "filter_element";
    filter.appendChild(filter_element);
  }
}

async function index() {
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

index();
