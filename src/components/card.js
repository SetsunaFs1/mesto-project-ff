function getCardTemplate() {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElem = cardTemplate.querySelector(".card").cloneNode(true);
  return cardElem;
}

function createCard(card, deleteCard, likeCard, openCardPopup) {
  const cardElem = getCardTemplate();
  const deleteButton = cardElem.querySelector(".card__delete-button");
  const likeButton = cardElem.querySelector(".card__like-button");
  const cardImg = cardElem.querySelector(".card__image");

  cardElem.querySelector(".card__title").textContent = card.name;
  cardImg.alt = card.name;
  cardImg.src = card.link;

  cardElem.addEventListener("click", () => openCardPopup(card));
  deleteButton.addEventListener("click", deleteCard);
  likeButton.addEventListener("click", (event) => likeCard(event, likeButton));

  return cardElem;
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

export { createCard, deleteCard, likeCard };
