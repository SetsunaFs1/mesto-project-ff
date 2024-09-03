import "./pages/index.css";
import { initialCards } from "./components/cards";
import { createCard, deleteCard, likeCard } from "./components/card";
import { openModal, closeModal } from "./components/modal";

const cardList = document.querySelector(".places__list");
const img = document.querySelector(".popup__image");
const imgPopupText = document.querySelector(".popup__caption");
const popupImg = document.querySelector(".popup_type_image");
const popupCard = document.querySelector(".popup_type_new-card");
const popupProfile = document.querySelector(".popup_type_edit");
const btnImgClose = popupImg.querySelector(".popup__close");
const nameProfile = document.querySelector(".profile__title");
const jobProfile = document.querySelector(".profile__description");

btnImgClose.addEventListener("click", () => {
  closeModal(popupImg);
});

popupImg.classList.add("popup_is-animated");
popupCard.classList.add("popup_is-animated");
popupProfile.classList.add("popup_is-animated");

//добавление карточек из массива
initialCards.forEach(function (card) {
  const cardElem = createCard(card, deleteCard, likeCard, openCardPopup);
  cardList.append(cardElem);
});

//открытие и закрытие окна ред профиля
function createEditPopupListeners() {
  const popupProfile = document.querySelector(".popup_type_edit");
  const btnEditOpen = document.querySelector(".profile__edit-button");
  const btnEditClose = popupProfile.querySelector(".popup__close");
  const formEditProfile = document.forms["edit-profile"];
  const nameInput = formEditProfile.elements.name;
  const jobInput = formEditProfile.elements.description;

  btnEditClose.addEventListener("click", () => {
    closeModal(popupProfile);
  });

  function openEditPopup() {
    openModal(popupProfile);
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
  }

  function submitEditProfileForm(event) {
    event.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closeModal(popupProfile);
  }
  btnEditOpen.addEventListener("click", openEditPopup);
  formEditProfile.addEventListener("submit", submitEditProfileForm);
}

//открытие и закрытие окна добавления карточек
function createCardPopupListeners() {
  const popupCard = document.querySelector(".popup_type_new-card");
  const btnCardAdd = document.querySelector(".profile__add-button");
  const btnCardClose = popupCard.querySelector(".popup__close");
  const formCreateCard = document.forms["new-place"];
  const nameInput = formCreateCard.elements["place-name"];
  const linkInput = formCreateCard.elements.link;

  btnCardClose.addEventListener("click", () => {
    closeModal(popupCard);
  });

  function openCreateCardPopup() {
    openModal(popupCard);
  }

  function submitAddCardForm(event) {
    event.preventDefault();

    const newCard = {
      name: nameInput.value,
      link: linkInput.value,
    };

    const cardElem = createCard(newCard, deleteCard, likeCard, openCardPopup);
    cardList.prepend(cardElem);
    formCreateCard.reset();
    closeModal(popupCard);
  }
  btnCardAdd.addEventListener("click", openCreateCardPopup);
  formCreateCard.addEventListener("submit", submitAddCardForm);
}

function openCardPopup(card) {
  openModalImg(popupImg, card.link, card.name, card.name);
}

function openModalImg(elem, imgLink, imgName, textName) {
  openModal(elem);
  img.src = imgLink;
  img.alt = imgName;
  imgPopupText.textContent = textName;
}

createEditPopupListeners();
createCardPopupListeners();
