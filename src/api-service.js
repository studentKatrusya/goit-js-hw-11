import axios from "axios";
import Notiflix from 'notiflix';

export default class NewsApiService{
    constructor() {
        this.searchQuery = '';
      this.page = 1;
      
    }
  fetchGalleryCards() {
      const BASE_URL = 'https://pixabay.com/api'
        return  fetch(`${BASE_URL}/?key=24753082-868cb2bb63826684a408e0cdf&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`)
          .then(response =>
            response.json())
          // .then(({ totalHits }) => {
          //   console.log(totalHits)
          //   // return totalHits
          // }
          // )
          .then(({hits}) => {
     
        this.incrementPage();
         
            return hits;
  });
    }

  //   async fetchGalleryCards() {
  //   this.incrementPage();
  //     return await axios({
  //       method: 'get',
  //       url: 'https://pixabay.com/api/',
  //       params: {
  //         key: '24753082-868cb2bb63826684a408e0cdf',
  //         q: `${this.searchQuery}`,
  //         page: `${this.page}`,
  //         image_type: 'photo',
  //         orientation: 'horizontal',
  //         safesearch: 'true',
  //         per_page: 40,
  //       },
  //     });
  // }
  
  
  incrementPage() {
    this.page +=1;
  }

  resetPage() {
    this.page = 1;
  }

    get query() {
        return this.searchQuery;
    };

    set query(newQuery) {
        this.searchQuery = newQuery;
    };
}
