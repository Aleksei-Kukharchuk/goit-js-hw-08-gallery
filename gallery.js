import images from './gallery-items.js';

const refs = {
    gallery: document.querySelector('.js-gallery'),
    galleryIt: document.querySelector('.gallery__item'),
  lightbox: document.querySelector('.js-lightbox'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
  lightboxImg: document.querySelector('.lightbox__image'),
  lightboxBtn: document.querySelector('[data-action="close-lightbox"]')
};

console.log(refs.galleryIt);

const createGallery = ({ preview, original, description }) => {
  const galleryItem = document.createElement('li');
  galleryItem.classList.add('gallery__item');
    
  const galleryLink = document.createElement('a');
  galleryLink.href = original;
  galleryLink.classList.add('gallery__link');

  const galleryImg = document.createElement('img');
  galleryImg.src = preview;
  galleryImg.dataset.source = original;
  galleryImg.alt = description;
  galleryImg.classList.add('gallery__image');

  galleryLink.append(galleryImg);
  galleryItem.append(galleryLink);

  return galleryItem;
};

const gallery = images.map(createGallery);

refs.gallery.append(...gallery);

refs.gallery.addEventListener('click', onOpenModal);
refs.lightboxBtn.addEventListener('click', onCloseModal)
refs.lightboxOverlay.addEventListener('click', onLightboxClick);


function onOpenModal(event) { 
    window.addEventListener('keydown', onEscKeyPress);
    window.addEventListener('keydown', keyboardPress);
  event.preventDefault();
  refs.lightbox.classList.add('is-open');
  refs.lightboxImg.src = event.target.dataset.source;
  refs.lightboxImg.alt = event.target.alt;
};

function onCloseModal() { 
    window.removeEventListener('keydown', onEscKeyPress)
    window.removeEventListener('keydown', keyboardPress);
  refs.lightbox.classList.remove('is-open');
  refs.lightboxImg.removeAttribute("src");
  refs.lightboxImg.removeAttribute("alt");
};

function onLightboxClick(event) { 
  if (event.currentTarget === event.target) { 
    onCloseModal();
  }
};

function onEscKeyPress(event) { 
  const ESC_KEY_CODE = 'Escape';

  if (event.code === ESC_KEY_CODE) { 
    onCloseModal();
  };
};

const imgUrlArr = images.map((el) => el.original);

function keyboardPress(event) {
  if (event.code === "ArrowRight") {
    for (let i = 0; i < imgUrlArr.length; i += 1) {
      if (refs.lightboxImg.src === imgUrlArr[8]) {
        refs.lightboxImg.src = `${imgUrlArr[0]}`;
        return;
      } else if (refs.lightboxImg.src === imgUrlArr[i]) {
        refs.lightboxImg.src = `${imgUrlArr[i + 1]}`;
        return;
      }
    }
  } else if (event.code === "ArrowLeft") {
    for (let i = 0; i < imgUrlArr.length; i += 1) {
      if (refs.lightboxImg.src === imgUrlArr[0]) {
        refs.lightboxImg.src = `${imgUrlArr[8]}`;
        return;
      } else if (refs.lightboxImg.src === imgUrlArr[i]) {
        refs.lightboxImg.src = `${imgUrlArr[i - 1]}`;
        return;
      }
    }
  }
}