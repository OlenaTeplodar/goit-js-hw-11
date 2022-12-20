import axios from "axios";
import Notiflix from "notiflix";
import 'notiflix/dist/notiflix-3.2.5.min.css';

Notiflix.Notify.init({
    timeout: 2000,
});

export default async function getAPI({
    url,
    key,
    q,
    imageType,
    orientation,
    safesearch,
    perPage,
    page,
}) {
    try {
        const responsce = await axios.get(
            url + '?key=' + key + '&q=' + encodeURIComponent(q) + '&image_type=' + imageType + '&orientation=' + orientation + '&safesearch=' + safesearch + '&per_page=' + perPage + '&page=' + page
        );

        return responsce.data;
    } catch (error) {
        Notiflix.Notify.failure(error.message);
    }
}