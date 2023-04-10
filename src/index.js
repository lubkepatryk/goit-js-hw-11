import './sass/index.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './js/fetch-images';
import { renderGallery } from './js/render-gallery';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const per_page = 40;
let query = '';
let page = 1;

searchForm.addEventListener('submit', onSearchForm);
loadMoreBtn.addEventListener('click', onLoadMoreBtn);

function onSearchForm(e) {
  e.preventDefault();
  page = 1;
  query = e.currentTarget.searchQuery.value.trim();
  gallery.innerHTML = '';
  loadMoreBtn.classList.add('is-hidden');

  if (query === '') {
    alertNoEmptySearch();
    return;
  }

  fetchImages(query, page, per_page)
    .then(({ data }) => {
      if (data.totalHits === 0) {
        alertNoImagesFound();
      } else {
        renderGallery(data.hits);
        SimpleLightbox = new SimpleLightbox('.gallery a').refresh();
        alertImagesFound(data);

        if (data.totalHits > per_page) {
          loadMoreBtn.classList.remove('is-hidden');
        }
      }
    })
    .catch(error => console.log(error))
    .finally(() => {
      searchForm.reset();
    });
}

function onLoadMoreBtn() {
  page += 1;
  SimpleLightbox.destroy();

  fetchImages(query, page, per_page)
    .then(({ data }) => {
      renderGallery(data.hits);
      SimpleLightbox = new SimpleLightbox('.gallery a').refresh();

      const totalPages = Math.ceil(data.totalHits / per_page);

      if (page > totalPages) {
        loadMoreBtn.classList.add('is-hidden');
        alertEndOfSearch();
      }
    })
    .catch(error => console.log(error));
}

function alertImagesFound(data) {
  Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
}

function alertNoEmptySearch() {
  Notiflix.Notify.failure(
    'The search string cannot be empty. Please specify your search query.'
  );
}

function alertNoImagesFound() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function alertEndOfSearch() {
  Notiflix.Notify.failure(
    "We're sorry, but you've reached the end of search results."
  );
}
