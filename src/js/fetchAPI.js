import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32211604-d2703e4dbac144834055a08da';
export default class UrlSearchParams {
    constructor() {
        this.searchQuery = '';
        this.per_page = 40;
        this.page = 1;
    }

    async getApi() {
        const response = await axios.get(
            `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.per_page}&page=${this.page}`
        );
        const data = response.data;

        if (response.status !== 200) {
            throw new Error(response.status);
        }

        return data;
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }
    
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}




// export default async function getApi({
//     url,
//     key,
//     q,
//     imageType,
//     orientation,
//     safesearch,
//     perPage,
//     page,
// }) {
//     try {
//         const response = await axios.get(
//             url + '?key=' + key + '&q=' + encodeURIComponent(q) + '&image_type=' + imageType + '&orientation=' + orientation + '&safesearch=' + safesearch + '&per_page=' + perPage + '&page=' + page
//         );

//         return response.data;
//     } catch (error) {
//         // Notiflix.Notify.failure(error.message);
//     }
// }