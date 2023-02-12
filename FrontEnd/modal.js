const openModal = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));
  console.log("modal :", target, e.target);
  target.style.display = null;

  target.addEventListener("click", function eventModal(e) {
    closeModal(e, target);
    this.removeEventListener("click", eventModal);
  });

  target
    .querySelector(".js-modal-close")
    .addEventListener("click", function eventModal(e) {
      closeModal(e, target);
      this.removeEventListener("click", eventModal);
    });

  target
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};

const closeModal = function (e, target) {
  e.stopPropagation();
  e.preventDefault();

  let modal = target;
  console.log("closemodal :", modal);

  modal.style.display = "none";

  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
};

const stopPropagation = function (e) {
  e.stopPropagation();
};

document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

/* BUTTON POUR PASSER D'UNE MODALE À L'AUTRE */

const modalButtonAdd = document.querySelector(".modal_button_add");
modalButtonAdd.addEventListener("click", (e) => {
  closeModal(e, document.querySelector("#modal1"));
});

/* ARROW LEFT */

const modalArrowLeft = document.querySelector(".arrow_left");
modalArrowLeft.addEventListener("click", (e) => {
  closeModal(e, document.querySelector("#modal2"));
  document.getElementById("edit_projects").click();
});
