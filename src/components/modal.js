function openModal(elem) {
  elem.classList.add("popup_is-opened");
  elem.addEventListener("click", closeOnOverlay);
  window.addEventListener("keydown", closeOnEsc);
}

function closeModal(elem) {
  elem.removeEventListener("click", closeOnOverlay);
  window.removeEventListener("keydown", closeOnEsc);
  elem.classList.remove("popup_is-opened");
}

function closeOnOverlay(event) {
  if (event.target.classList.contains("popup")) {
    closeModal(event.target);
  }
}

function closeOnEsc(event) {
  const elem = document.querySelector(".popup_is-opened");
  if (elem && event.key === "Escape") {
    closeModal(elem);
  }
}

export { openModal, closeModal };
