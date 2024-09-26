import { deleteDataCard, addLike, deleteLike } from "./api";

function getCardTemplate() {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElem = cardTemplate.querySelector(".card").cloneNode(true);
  return cardElem;
}

function createCard(card, userData, deleteCallback, likeCard, openCardPopup) {
  const cardElem = getCardTemplate();
  const deleteButton = cardElem.querySelector(".card__delete-button");
  const likeButton = cardElem.querySelector(".card__like-button");
  const cardImg = cardElem.querySelector(".card__image");
  const buttonLikeCount = cardElem.querySelector(".like_count");
  const likeCount = card.likes.length;
  buttonLikeCount.textContent = likeCount;

  const isMine = card.owner._id === userData._id;
  if (!isMine) {
    deleteButton.classList.add("card__delete-button-inactive");
  } else {
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteCallback(cardElem, card._id);
    });
  }

  const hasMyLike = card.likes.some((x) => x._id === userData._id);
  if (hasMyLike) {
    likeButton.classList.add("card__like-button_is-active");
  }

  cardElem.querySelector(".card__title").textContent = card.name;
  cardImg.alt = card.name;
  cardImg.src = card.link;

  cardElem.addEventListener("click", () => openCardPopup(card));

  likeButton.addEventListener("click", (event) => {
    likeCard(event, likeButton, buttonLikeCount, card, userData, card._id);
  });

  return cardElem;
}

function deleteCard(event, cardElem, id) {
  event.stopPropagation();
  deleteDataCard(id)
    .then(() => {
      cardElem.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

function likeCard(event, likeButton, buttonLikeCount, card, userData, id) {
  event.stopPropagation();
  const hasMyLike = card.likes.some((x) => x._id === userData._id);

  const likeMethod = hasMyLike ? deleteLike : addLike;
  likeMethod(id)
    .then((res) => {
      likeButton.classList.toggle("card__like-button_is-active");
      card.likes = res.likes;
      buttonLikeCount.textContent = res.likes.length;
    })
    .catch((err) => console.log(err));
}

export { createCard, deleteCard, likeCard };
