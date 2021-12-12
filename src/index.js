
import Notiflix from 'notiflix';

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

// const { height: cardHeight } = document
//   .querySelector(".gallery")
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });


function onSearch(e) {
  e.preventDefault();

  newsApiService.query = e.currentTarget.elements.searchQuery.value;

  newsApiService.resetPage();

  console.log(e.currentTarget.elements.searchQuery.value)



   newsApiService.fetchGalleryCards()
    
    .then(hits => {
    onClearGallery(); 
    
    onRenderGallery(hits);
   
    refs.loadMoreBtn.classList.remove('is-hidden');

    if (!hits.length) 
    {
    Notiflix.Notify.warning(`We're sorry, but you've reached the end of search results.`);
     refs.loadMoreBtn.classList.add('is-hidden');
          return};
    

      if (newsApiService.query === '' ) {
        onClearGallery();
        refs.loadMoreBtn.classList.add('is-hidden');
   Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.") 
    };
    
  })


    }



function onLoadMore() {
   newsApiService.fetchGalleryCards().then(onRenderGallery)
}

function onRenderGallery(hits) {
  refs.galleryContainer.insertAdjacentHTML("beforeend", galleryCards(hits));
   const lightbox = new SimpleLightbox(".gallery a", 
  {
    captionsData: "alt", 
    captionDelay: 250, 
     
  }); 

}

function onClearGallery() {
  refs.galleryContainer.innerHTML = '';
}




 