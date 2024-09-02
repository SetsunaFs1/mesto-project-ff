function openModal(elem, className) {
  elem.classList.add(className);
  elem.addEventListener("click", (event) =>
    closeOnOverlay(event, elem, className)
  );
  window.addEventListener("keydown", (event) =>
    closeOnEsc(event, elem, className)
  );
}

function closeModal(elem, className) {
  elem.removeEventListener("click", closeOnOverlay);
  window.removeEventListener("keydown", closeOnEsc);
  elem.classList.remove(className);
}

function closeOnOverlay(event, elem, className) {
  if (event.target.classList.contains("popup")) {
    closeModal(elem, className);
  }
}

function closeOnEsc(event, elem, className) {
  if (elem.classList.contains("popup_is-opened") && event.key === "Escape") {
    closeModal(elem, className);
  }
}

export { openModal, closeModal, closeOnOverlay, closeOnEsc };
