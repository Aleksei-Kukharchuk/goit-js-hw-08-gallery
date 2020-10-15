import images from './gallery-items.js';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  galleryIt: document.querySelector('.gallery__item'),
  galleryImg: document.querySelector('.gallery__image'),
  lightbox: document.querySelector('.js-lightbox'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
  lightboxImg: document.querySelector('.lightbox__image'),
  lightboxBtn: document.querySelector('[data-action="close-lightbox"]')
};

/* Созднаие галлереи */

/* const createGallery = ({ preview, original, description }) => {
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
}; */

const galleryMarkup = ({ preview, original, description }) => { 
  return `<li class="gallery__item">
    <a class="gallery__link" href='${original}'>
      <img
      src="${preview}"
      data-source="${original}"
      alt="${description}"
      class="gallery__image"
      />
    </a>
  </li> `;
};

const gallery = images.map(galleryMarkup).join('');

refs.gallery.insertAdjacentHTML('afterbegin', gallery);

/* Работа модального окна */

refs.gallery.addEventListener('click', onOpenModal);
refs.lightboxBtn.addEventListener('click', onCloseModal)
refs.lightboxOverlay.addEventListener('click', onCloseModal);


function onOpenModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
   return
  };

  window.addEventListener('keydown', keyboardPress);
  refs.lightbox.classList.add('is-open');
  refs.lightboxImg.src = event.target.dataset.source;
  refs.lightboxImg.alt = event.target.alt;
  
};

function onCloseModal() { 
  window.removeEventListener('keydown', keyboardPress);
  refs.lightbox.classList.remove('is-open');
  refs.lightboxImg.removeAttribute("src");
  refs.lightboxImg.removeAttribute("alt");
};

/* Выбор изображения стредками и выход из модалки по ESC */

const imgUrlArr = images.map((el) => el.original);

function keyboardPress(event) {
  if (event.code === "ArrowRight") {
    for (let i = 0; i < imgUrlArr.length; i += 1) {
      if (refs.lightboxImg.src === imgUrlArr[imgUrlArr.length-1]) {
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
        refs.lightboxImg.src = `${imgUrlArr[imgUrlArr.length-1]}`;
        return;
      } else if (refs.lightboxImg.src === imgUrlArr[i]) {
        refs.lightboxImg.src = `${imgUrlArr[i - 1]}`;
        return;
      }
    }
  } else if (event.code === 'Escape') {
    onCloseModal();
  }
}