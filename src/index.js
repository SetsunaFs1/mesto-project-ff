import "./pages/index.css";
import { initialCards } from "./components/cards";
import { createCard, deleteCard, likeCard } from "./components/card";
import { openModal, closeModal, closeOnOverlay, closeOnEsc } from "./components/modal";

const cardList = document.querySelector(".places__list");
const img = document.querySelector(".popup__image");
const imgPopupText = document.querySelector(".popup__caption");

const popupImg = document.querySelector(".popup_type_image");
const popupCard = document.querySelector(".popup_type_new-card");
const popupProfile = document.querySelector(".popup_type_edit");

const btnImgClose = popupImg.querySelector(".popup__close");
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__description');

btnImgClose.addEventListener("click", closeCardPopup);

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
  popupProfile.classList.add("popup_is-animated");

  function openEditPopup() {
    openModal(popupProfile, "popup_is-opened");

    btnEditClose.addEventListener("click", closeEditPopup);

    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
  }
  function closeEditPopup() {
    btnEditClose.removeEventListener("click", closeEditPopup);
    closeModal(popupProfile, "popup_is-opened");
  }

  function submitEditProfileForm(event) {
    event.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closeModal(popupProfile, "popup_is-opened");
  }
  btnEditOpen.addEventListener("click", openEditPopup);
  formEditProfile.addEventListener('submit', submitEditProfileForm);
}

//открытие и закрытие окна добавления карточек
function createCardPopupListeners() {
  const popupCard = document.querySelector(".popup_type_new-card");
  const btnCardAdd = document.querySelector(".profile__add-button");
  const btnCardClose = popupCard.querySelector(".popup__close");
  const formCreateCard = document.forms["new-place"];
  const nameInput = formCreateCard.elements["place-name"];
  const linkInput = formCreateCard.elements.link;
  popupCard.classList.add("popup_is-animated");
  

  function openCreateCardPopup() {
    openModal(popupCard, "popup_is-opened");
    btnCardClose.addEventListener("click", closeCardPopup);
    
    
  }
  function closeCardPopup() {
    btnCardClose.removeEventListener("click", closeCardPopup);
    popupCard.removeEventListener("click", closeOnOverlay);
    window.removeEventListener("keydown", closeOnEsc);
    closeModal(popupCard, "popup_is-opened");
  }

  function submitAddCardForm(event) {
    event.preventDefault();

    const newCard = {
      name: nameInput.value,
      link: linkInput.value
    }

    const cardElem = createCard(newCard, deleteCard, likeCard, openCardPopup);
    cardList.prepend(cardElem);
    formCreateCard.reset();
    closeModal(popupCard, "popup_is-opened");
  }
  btnCardAdd.addEventListener("click", openCreateCardPopup);
  formCreateCard.addEventListener('submit', submitAddCardForm);
}

function openCardPopup(card) {
  openModalImg(popupImg, "popup_is-opened", card.link, card.name, card.name);
}
function closeCardPopup() {
  btnImgClose.removeEventListener("click", closeCardPopup);
  closeModal(popupImg, "popup_is-opened");
}

function openModalImg(elem, className, imgLink, imgName, textName) {
  openModal(elem, className);
  
  img.src = imgLink;
  img.alt = imgName;
  imgPopupText.textContent = textName;
}

createEditPopupListeners();
createCardPopupListeners();