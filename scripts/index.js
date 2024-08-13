// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

const cardList = document.querySelector(".places__list");

// @todo: Функция создания карточки

function createCard(card, deleteCard) {
  const cardElem = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElem.querySelector(".card__delete-button");

  cardElem.querySelector(".card__title").textContent = card.name;
  cardElem.querySelector(".card__image").src = card.link;

  deleteButton.addEventListener("click", function () {
    deleteCard(cardElem);
  });

  cardList.append(cardElem);
}

// @todo: Функция удаления карточки

function deleteCard(card) {
  const cardElem = card.closest(".places__item");
  cardElem.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function (card) {
  createCard(card, deleteCard);
});
