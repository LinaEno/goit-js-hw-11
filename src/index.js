import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import fetchImages from './js/fetchImages';
import { refs } from './js/refs';
import { markupImages } from './js/markup';
import debounce from 'lodash.debounce';

function renderMarkupImages(array) {
  refs.gallery.insertAdjacentHTML('beforeend', markupImages(array));
}

let simpLightbox = new SimpleLightbox('.photo-card a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
});

let currentPage = 1;
let currentHits = 0;
let searchQuery = '';

refs.searchForm.addEventListener('submit', debounce(onSearchFormSubmit, 300));

async function onSearchFormSubmit(event) {
    event.preventDefault();
    searchQuery = event.target.searchQuery.value;
    currentPage = 1;

    if (searchQuery === '') {
        return;
        }

  const response = await fetchImages(searchQuery, currentPage);
  currentHits = response.hits.length;
  console.log(response);

  if (response.totalHits > 40) {
    refs.loadMoreBtn.classList.remove('is-hidden');
  } else {
    refs.loadMoreBtn.classList.add('is-hidden');
  }

  try {
    if (response.totalHits > 0) {
      Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
      refs.gallery.innerHTML = '';
      renderMarkupImages(response.hits);
      simpLightbox.refresh();
      

      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * -100,
        behavior: 'smooth',
      });
    }

    if (response.totalHits === 0) {
      refs.gallery.innerHTML = '';
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      refs.loadMoreBtn.classList.add('is-hidden');
      
    }
  } catch (error) {
    console.log(error);
  }
}

refs.loadMoreBtn.addEventListener('click', onClickLoadMoreBtn);

async function onClickLoadMoreBtn() {
    currentPage += 1;
    const response = await fetchImages(searchQuery, currentPage);
    renderMarkupImages(response.hits);
    simpLightbox.refresh();
    currentHits += response.hits.length;

    if (currentHits === response.totalHits) {
    refs.loadMoreBtn.classList.add('is-hidden');
    }
}



