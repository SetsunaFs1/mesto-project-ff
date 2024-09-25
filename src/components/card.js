import { deleteDataCard, addLike, deleteLike } from "./api";

function getCardTemplate() {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElem = cardTemplate.querySelector(".card").cloneNode(true);
  return cardElem;
}

function createCard(
  card,
  userData,
  openModalDelete,
  deleteCard,
  likeCard,
  openCardPopup
) {
  const cardElem = getCardTemplate();
  const deleteButton = cardElem.querySelector(".card__delete-button");
  const likeButton = cardElem.querySelector(".card__like-button");
  const cardImg = cardElem.querySelector(".card__image");
  const popupDelete = cardElem.querySelector(".popup_type_delete");
  const btnDeleteInPopup = cardElem.querySelector(".popup__button");
  const buttonLikeCount = cardElem.querySelector(".like_count");
  const likeCount = card.likes.length;
  buttonLikeCount.textContent = likeCount;

  const isMine = card.owner._id === userData._id;
  if (!isMine) {
    deleteButton.classList.add("card__delete-button-inactive");
    popupDelete.remove();
  }

  const hasMyLike = card.likes.map((x) => x._id).includes(userData._id);
  if (hasMyLike) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }

  cardElem.querySelector(".card__title").textContent = card.name;
  cardImg.alt = card.name;
  cardImg.src = card.link;
  deleteButton.addEventListener("click", (event) =>
    openModalDelete(event, popupDelete)
  );
  btnDeleteInPopup.addEventListener("click", (event) =>
    deleteCard(event, cardElem, card._id)
  );
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
  const hasMyLike = card.likes.map((x) => x._id).includes(userData._id);
  if (!hasMyLike) {
    addLike(id)
      .then((cardResponse) => {
        likeButton.classList.add("card__like-button_is-active");
        card.likes.push(userData);
        buttonLikeCount.textContent = cardResponse.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    deleteLike(id)
      .then((cardResponse) => {
        likeButton.classList.remove("card__like-button_is-active");
        card.likes = card.likes.filter((x) => x._id !== userData._id);
        buttonLikeCount.textContent = cardResponse.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export { createCard, deleteCard, likeCard };
