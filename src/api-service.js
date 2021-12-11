export default class NewsApiService{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
  fetchGalleryCards() {
      const BASE_URL = 'https://pixabay.com/api'
        return  fetch(`${BASE_URL}/?key=24753082-868cb2bb63826684a408e0cdf&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`)
      .then(response => response.json())
          .then(({hits}) => {
      
        this.incrementPage();
        

      return hits;
  });
    }

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
