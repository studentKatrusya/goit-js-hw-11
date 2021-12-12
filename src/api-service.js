import axios from "axios";


export default class NewsApiService{
    constructor() {
        this.searchQuery = '';
      this.page = 1;
     
      
    }
  async fetchGalleryCards() {
    const axiosOptions = {
        method: 'get',
    url: 'https://pixabay.com/api/',
      params: {
          key: '24753082-868cb2bb63826684a408e0cdf',
           q: `${this.searchQuery}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: `${this.page}`,
        per_page: 40,
      },
      
    };
     try {
        const response = await axios( axiosOptions );
        
        const data = response.data;
        // console.log(data)
        this.incrementPage();
         return data;
    }
    catch (error) {
      console.error(error)
}

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