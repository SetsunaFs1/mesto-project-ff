"use strict";
import "./pages/index.css";
// import { initialCards } from "./components/cards";
import { createCard, deleteCard, likeCard } from "./components/card";
import { openModal, closeModal, openModalDelete } from "./components/modal";
import { enableValidation, clearValidation } from "./components/validation";
import {
  getUserData,
  getInitialCards,
  newUserData,
  createNewCard,
  updateAvatar,
  checkAvatarSource,
} from "./components/api";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "button__submit_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const cardList = document.querySelector(".places__list");
const img = document.querySelector(".popup__image");
const imgPopupText = document.querySelector(".popup__caption");
const popupImg = document.querySelector(".popup_type_image");
const btnImgClose = popupImg.querySelector(".popup__close");
const nameProfile = document.querySelector(".profile__title");
const jobProfile = document.querySelector(".profile__description");
const avatar = document.querySelector(".avatar");
let userData = null;

btnImgClose.addEventListener("click", (event) => {
  closeModal(event, popupImg);
});

Promise.all([getUserData(), getInitialCards()])
  .then((data) => {
    const userDataValue = data[0];
    userData = { ...userDataValue };
    nameProfile.textContent = userDataValue.name;
    jobProfile.textContent = userDataValue.about;
    avatar.src = userDataValue.avatar;
    const cards = data[1];
    cards.forEach((card) => {
      const cardElem = createCard(
        card,
        userDataValue,
        openModalDelete,
        deleteCard,
        likeCard,
        openCardPopup
      );
      cardList.append(cardElem);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//открытие и закрытие окна ред профиля
function createEditPopupListeners() {
  const popupProfile = document.querySelector(".popup_type_edit");
  const btnEditOpen = document.querySelector(".profile__edit-button");
  const btnEditClose = popupProfile.querySelector(".popup__close");
  const formEditProfile = document.forms["edit-profile"];
  const nameInput = formEditProfile.elements.name;
  const jobInput = formEditProfile.elements.description;
  const submitButton = popupProfile.querySelector(".popup__button");

  btnEditClose.addEventListener("click", (event) => {
    closeModal(event, popupProfile);
  });

  function openEditPopup() {
    openModal(popupProfile);
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    clearValidation(formEditProfile, validationConfig);
  }

  function submitEditProfileForm(event) {
    event.preventDefault();

    submitButton.textContent = "Сохранение...";

    newUserData(nameInput.value, jobInput.value)
      .then((data) => {
        nameProfile.textContent = data.name;
        jobProfile.textContent = data.about;
        submitButton.textContent = "Сохранить";
        closeModal(event, popupProfile);
      })
      .catch(() => {
        submitButton.textContent = "Сохранить";
      });
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
  const submitButton = popupCard.querySelector(".popup__button");

  btnCardClose.addEventListener("click", (event) => {
    closeModal(event, popupCard);
  });

  function openCreateCardPopup() {
    clearValidation(formCreateCard, validationConfig);
    openModal(popupCard);
    nameInput.value = "";
    linkInput.value = "";
  }

  function submitAddCardForm(event) {
    event.preventDefault();

    submitButton.textContent = "Сохранение...";

    const newCard = {
      name: nameInput.value,
      link: linkInput.value,
    };

    createNewCard(newCard.name, newCard.link)
      .then((data) => {
        const cardElem = createCard(
          data,
          userData,
          openModalDelete,
          deleteCard,
          likeCard,
          openCardPopup
        );
        cardList.prepend(cardElem);
        formCreateCard.reset();
        submitButton.textContent = "Сохранить";
        closeModal(event, popupCard);
      })
      .catch(() => {
        submitButton.textContent = "Сохранить";
      });
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

//открытие и закрытие окна обновления аватара
function createAvatarPopupListeners() {
  const popupUpdateAvatar = document.querySelector(".popup_type_new-avatar");
  const btnUpdateAvatar = document.querySelector(".profile__update-avatar");
  const btnCardClose = popupUpdateAvatar.querySelector(".popup__close");
  const spanError = popupUpdateAvatar.querySelector(
    ".link__input-avatar-error"
  );
  const formUpdateAvatar = document.forms["new-avatar"];
  const linkInput = formUpdateAvatar.elements.link;
  const submitButton = popupUpdateAvatar.querySelector(".popup__button");
  const avatar = document.querySelector(".avatar");

  btnCardClose.addEventListener("click", (event) => {
    closeModal(event, popupUpdateAvatar);
  });

  function openUpdateAvatarPopup() {
    clearValidation(formUpdateAvatar, validationConfig);
    openModal(popupUpdateAvatar);
    linkInput.value = "";
  }

  function addNewAvatar(event) {
    event.preventDefault();

    submitButton.textContent = "Сохранение...";

    checkAvatarSource(linkInput.value)
      .then(() => {
        updateAvatar(linkInput.value).then((data) => {
          formUpdateAvatar.reset();
          avatar.src = data.avatar;
          submitButton.textContent = "Сохранить";
          closeModal(event, popupUpdateAvatar);
        });
      })
      .catch((err) => {
        submitButton.textContent = "Сохранить";
        linkInput.classList.add("popup__input_type_error");
        spanError.classList.add("popup__input-error_active");
        spanError.textContent = err;
      });
  }

  btnUpdateAvatar.addEventListener("click", openUpdateAvatarPopup);
  formUpdateAvatar.addEventListener("submit", addNewAvatar);
}

createEditPopupListeners();
createCardPopupListeners();
createAvatarPopupListeners();
enableValidation(validationConfig);
