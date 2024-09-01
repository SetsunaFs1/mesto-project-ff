import { openModalImg, closeModal } from "./modal";

const cardTemplate = document.querySelector("#card-template").content;

function createCard(card, deleteCard, likeCard, openCardPopup) {
  const cardElem = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElem.querySelector(".card__delete-button");
  const likeButton = cardElem.querySelector(".card__like-button");

  cardElem.querySelector(".card__title").textContent = card.name;
  cardElem.querySelector(".card__image").alt = card.name;
  cardElem.querySelector(".card__image").src = card.link;
  document.querySelector(".popup_type_image").classList.add("popup_is-animated");
  cardElem.addEventListener("click", () => openCardPopup(card));
  deleteButton.addEventListener("click", deleteCard);
  likeButton.addEventListener("click", (event) => likeCard(event, likeButton));

  return cardElem;
}

function openCardPopup(card) {
  const popupImg = document.querySelector(".popup_type_image");
  const btnImgClose = popupImg.querySelector(".popup__close");
  openModalImg(popupImg, "popup_is-opened", card.link, card.name, card.name);
  btnImgClose.addEventListener("click", closeCardPopup);
  popupImg.addEventListener("click", closeOnOverlay);
  window.addEventListener("keydown", closeOnEsc);
}
function closeCardPopup() {
  const popupImg = document.querySelector(".popup_type_image");
  const btnImgClose = popupImg.querySelector(".popup__close");
  btnImgClose.removeEventListener("click", closeCardPopup);
  popupImg.removeEventListener("click", closeOnOverlay);
  window.removeEventListener("keydown", closeOnEsc);
  closeModal(popupImg, "popup_is-opened");
}
function closeOnOverlay(event) {
  if (event.target.classList.contains("popup")) {
    closeCardPopup();
  }
}
function closeOnEsc(event) {
  const popupImg = document.querySelector(".popup_type_image");
  if (
    popupImg.classList.contains("popup_is-opened") &&
    event.key === "Escape"
  ) {
    closeCardPopup();
  }
}

function deleteCard(event) {
  event.stopPropagation();
  const cardElem = event.target.closest(".places__item");
  cardElem.remove();
}

function likeCard(event, likeButton) {
  event.stopPropagation();
  likeButton.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, likeCard, openCardPopup };
