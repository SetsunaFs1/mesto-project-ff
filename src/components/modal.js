function openModal(elem) {
  elem.classList.add("popup_is-opened");
  elem.addEventListener("click", closeOnOverlay);
  window.addEventListener("keydown", closeOnEsc);
}

function openModalDelete(event, elem) {
  event.stopPropagation();
  elem.classList.add("popup_is-opened");
  elem.addEventListener("click", closeOnOverlay);
  window.addEventListener("keydown", closeOnEsc);
  const closePopup = elem.querySelector(".popup__close");
  closePopup.addEventListener("click", (event) => closeModal(event, elem));
}

function closeModal(event, elem) {
  event.stopPropagation();
  elem.removeEventListener("click", closeOnOverlay);
  window.removeEventListener("keydown", closeOnEsc);
  elem.classList.remove("popup_is-opened");
}

function closeOnOverlay(event) {
  if (event.target.classList.contains("popup")) {
    closeModal(event, event.target);
  }
}

function closeOnEsc(event) {
  const elem = document.querySelector(".popup_is-opened");
  if (elem && event.key === "Escape") {
    closeModal(event, elem);
  }
}

export { openModal, closeModal, openModalDelete };
