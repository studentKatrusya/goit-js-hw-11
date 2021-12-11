
import Notiflix from 'notiflix';
import axios from "axios";
import NewsApiService from "./api-service";
import galleryCards from './templates/galleryCards.hbs';
// Описан в документации
import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";

// axios.get('/users')
//   .then(res => {
//     console.log(res.data);
//   });

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more')
};

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener("submit", onSearch);
refs.loadMoreBtn.addEventListener("click", onLoadMore);


function onSearch(e) {
  e.preventDefault();

  newsApiService.query = e.currentTarget.elements.searchQuery.value;


  newsApiService.resetPage();

  console.log(e.currentTarget.elements.searchQuery.value)
  newsApiService.fetchGalleryCards().then(hits => {
    onClearGallery();
    onRenderGallery(hits);
    refs.loadMoreBtn.classList.remove('is-hidden')
      if (newsApiService.query === '') {
 
   Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.") 
  }
  });
}


function onLoadMore() {
   newsApiService.fetchGalleryCards().then(onRenderGallery)
}

function onRenderGallery(hits) {
  refs.galleryContainer.insertAdjacentHTML("beforeend", galleryCards(hits));
}

function onClearGallery() {
  refs.galleryContainer.innerHTML = '';
}


  // 'https://pixabay.com/api/?key=24753082-868cb2bb63826684a408e0cdf&q=yellow+flowers&image_type=photo'

  // const options = {
//   headers: {
//     Authorization: "24753082-868cb2bb63826684a408e0cdf",
//   },
// };

// const url =
//   'https://pixabay.com/api/?q=yellow+flowers&image_type=photo';

  const Lightbox = new SimpleLightbox(".gallery a", 
  {
    // captionSelector: "img", 
    captionsData: "alt", 
    // captionPosition: "bottom", 
    captionDelay: 250, 
    // showCounter: false, 
    // scrollZoom: false,     
  }); 