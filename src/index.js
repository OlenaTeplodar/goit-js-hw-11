import UrlSearchParams from './js/fetchAPI';
import renderMarkup from './js/renderMarkup';
import LoadMoreBTN from './js/load-more-btn';
// import { searchQuery } from './js/dataSearchQuery';

import Notiflix from "notiflix";
import 'notiflix/dist/notiflix-3.2.5.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { error } from "jquery";
import { entries } from "lodash";

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
});

Notiflix.Notify.init({
    timeout: 2000,
});

// let totalPage = 1;

const urlSearchParams = new UrlSearchParams();
const refs = {
  formEl: document.querySelector('.search-form'),
    galleryEl: document.querySelector('.gallery'),
  buttonSearch: document.querySelector('button-search'),
};

const loadMoreBTN = new LoadMoreBTN({
    selector: '.load-more',
    hidden: true,
})

refs.formEl.addEventListener('submit', onSearchFormSubmit);

loadMoreBTN.refs.button.addEventListener('click', onLoadMoreBTN);

async function onSearchFormSubmit(event) {
    event.preventDefault();
    loadMoreBTN.hide();

    urlSearchParams.query = event.target.elements.searchQuery.value.trim();
    if (!urlSearchParams.query) {
        return;
    }
    urlSearchParams.resetPage();
    clearMarkup();

    await loadContent();

}

async function onLoadMoreBTN() {
    await loadContent();
}

function clearMarkup() {
    refs.galleryEl.innerHTML = '';
}

async function loadContent() {
    await urlSearchParams
        .getApi()
        .then(data => {
            if (data.hits.length === 0) {
                Notiflix.Notify.failure(
                    `Sorry, there are no images matching your search query. Please try again.`
                );
                return;
            }
            Notiflix.Notify.success(
                `Hooray! We found ${data.totalHits} images.`
            );
            addPicture(data);
            urlSearchParams.incrementPage();
            lightbox.refresh();
            loadMoreBTN.show();
        })
        .then(data => {
            const totalPage = data.totalHits / this.per_page;
            if (this.page >= totalPage) {
                loadMoreBTN.hide();
                Notiflix.Notify.info(
                    `We're sorry, but you've reached the end of search results.`
                );
                return;
            }
        })
        .catch(error => {
            return error;
        })
}
    
function addPicture(data) {
    refs.galleryEl.insertAdjacentHTML('beforeend', renderMarkup(data.hits));
}