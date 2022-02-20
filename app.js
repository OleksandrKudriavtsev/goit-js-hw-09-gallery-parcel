import galleryItems from "./js/images.js";
import {
  galleryList,
  overlayDiv,
  lightboxOverlay,
  image,
  btnClose,
} from "./js/variables.js";

////////////////////////////////////// СОЗАНИЕ РАЗМЕТКИ ГАЛЛЕРЕИ ///////////////////////////////////////

const itemEl = ({ preview, original, description }) => {
  return `<li class="gallery__item">
            <a href="" class="gallery__link"> 
              <img class="gallery__image" src=${preview} alt=${description} data-source=${original} width="100%" heigth="100%">
            </a>
          </li>`;
};

const listEl = galleryItems.map(itemEl).join("");

galleryList.insertAdjacentHTML("beforeend", listEl);

////////////////////////////////////// ОТКРЫТИЕ МОДАЛКИ ////////////////////////////////////////////////

galleryList.addEventListener("click", onGalleryOpen);

function onGalleryOpen(evt) {
  evt.preventDefault();
  overlayDiv.classList.add("is-open");
  image.src = evt.target.dataset.source;
  image.alt = evt.target.dataset.alt;

  window.addEventListener("keydown", onEscBtnPress);
  window.addEventListener("keydown", arrowSlider);
}

////////////////////////////////////// ЗАКРЫТИЕ МОДАЛКИ ////////////////////////////////////////////////

btnClose.addEventListener("click", onGalleryClose);

function onGalleryClose() {
  overlayDiv.classList.remove("is-open");
  image.src = "";

  window.removeEventListener("keydown", onEscBtnPress);
  window.removeEventListener("keydown", arrowSlider);
}

////////////////////////////////////// ЗАКРЫТИЕ ЭСКЕЙПОМ ///////////////////////////////////////////////

function onEscBtnPress(evt) {
  const ESC = "Escape";
  if (evt.code === ESC) {
    onGalleryClose();
  }
}

////////////////////////////////////// ЗАКРЫТИЕ МИСКЛИКОМ /////////////////////////////////////////////

lightboxOverlay.addEventListener("click", onGalleryMissClick);

function onGalleryMissClick() {
  if (lightboxOverlay) {
    onGalleryClose();
  }
}

////////////////////////////////////// СКРОЛЛ СТРЕЛКАМИ //////////////////////////////////////////////

function arrowSlider(evt) {
  let nextIndex = 0;

  const currentIndex = galleryItems.indexOf(
    galleryItems.find((item) => item.description === image.alt)
  );

  if (evt.key === "ArrowRight") {
    nextIndex = currentIndex < galleryItems.length - 1 ? currentIndex + 1 : 0;
  }
  if (evt.key === "ArrowLeft") {
    nextIndex = currentIndex > 0 ? currentIndex - 1 : galleryItems.length - 1;
  }

  image.src = galleryItems[nextIndex].original;
  image.alt = galleryItems[nextIndex].description;
}
