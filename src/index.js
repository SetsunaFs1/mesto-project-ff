import "./pages/index.css";
import { initialCards } from "./components/cards";
import { createCard, deleteCard, likeCard, openCardPopup } from "./components/card";
import { openModal, closeModal } from "./components/modal";

const cardList = document.querySelector(".places__list");

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
  const formElement = document.forms["edit-profile"];
  const nameInput = formElement.elements.name;
  const jobInput = formElement.elements.description;

  function openEditPopup() {
    
    openModal(popupProfile, "popup_is-opened");
    
    btnEditClose.addEventListener("click", closeEditPopup);
    popupProfile.addEventListener("click", closeOnOverlay);
    window.addEventListener("keydown", closeOnEsc);

    nameInput.value = document.querySelector('.profile__title').textContent;
    jobInput.value = document.querySelector('.profile__description').textContent;
    formElement.addEventListener('submit', handleFormSubmit);
  }
  function closeEditPopup() {
    btnEditClose.removeEventListener("click", closeEditPopup);
    popupProfile.removeEventListener("click", closeOnOverlay);
    window.removeEventListener("keydown", closeOnEsc);
    closeModal(popupProfile, "popup_is-opened");
  }

  function handleFormSubmit(evt) {
    evt.preventDefault();
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;
    closeModal(popupProfile, "popup_is-opened");
  }
  openModal(popupProfile, "popup_is-animated");
  btnEditOpen.addEventListener("click", openEditPopup);

  function closeOnOverlay(event) {
    if (event.target.classList.contains("popup")) {
      closeEditPopup();
    }
  }

  function closeOnEsc(event) {
    if (popupProfile.classList.contains("popup_is-opened") && event.key === "Escape"){
      closeEditPopup();
    }
  }
}

//открытие и закрытие окна добавления карточек
function createCardPopupListeners() {
  const popupCard = document.querySelector(".popup_type_new-card");
  const btnCardAdd = document.querySelector(".profile__add-button");
  const btnCardClose = popupCard.querySelector(".popup__close");
  const formCreateCard = document.forms["new-place"];
  const nameInput = formCreateCard.elements["place-name"];
  const linkInput = formCreateCard.elements.link;
  

  function openCreateCardPopup() {
    openModal(popupCard, "popup_is-opened");
    btnCardClose.addEventListener("click", closeCardPopup);
    popupCard.addEventListener("click", closeOnOverlay);
    window.addEventListener("keydown", closeOnEsc);
    
    formCreateCard.addEventListener('submit', handleFormSubmit);
  }
  function closeCardPopup() {
    btnCardClose.removeEventListener("click", closeCardPopup);
    popupCard.removeEventListener("click", closeOnOverlay);
    window.removeEventListener("keydown", closeOnEsc);
    closeModal(popupCard, "popup_is-opened");
  }

  function handleFormSubmit(evt) {
    evt.preventDefault();

    const newCard = {
      name: nameInput.value,
      link: linkInput.value
    }

    const cardElem = createCard(newCard, deleteCard, likeCard, openCardPopup);
    cardList.prepend(cardElem);

    closeModal(popupCard, "popup_is-opened");
  }
  openModal(popupCard, "popup_is-animated");
  btnCardAdd.addEventListener("click", openCreateCardPopup);

  function closeOnOverlay(event) {
    if (event.target.classList.contains("popup")) {
      closeCardPopup();
    }
  }
  function closeOnEsc(event) {
    if (popupCard.classList.contains("popup_is-opened") && event.key === "Escape"){
      closeCardPopup();
    }
  }
}

createEditPopupListeners();
createCardPopupListeners();
