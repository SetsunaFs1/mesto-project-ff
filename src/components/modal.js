function openModal(elem, className) {
  elem.classList.add(className);
}

function closeModal(elem, className) {
  elem.classList.remove(className);
}

function openModalImg(elem, className, imgLink, imgName, textName) {
  elem.classList.add(className);
  const img = document.querySelector(".popup__image");
  const imgPopupText = document.querySelector(".popup__caption");
  img.src = imgLink;
  img.alt = imgName;
  imgPopupText.textContent = textName;
}

export { openModal, closeModal, openModalImg };
