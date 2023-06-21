import './additional/get-data-songs';
import CustomSelectors from "./search/custom-selectors";
import Pagination from "./search/pagination";
import Search from "./search/search";
import ListSongs from "./search/list-songs";
import Header from "./search/header";
import Results from "./search/results";

document.addEventListener("DOMContentLoaded", () => {
    const listSongs = new ListSongs(),
        pagination = new Pagination(listSongs),
        search = new Search(pagination, listSongs),
        results = new Results();

    new CustomSelectors(document.querySelector('.search'));
    new Header();

    search.setResult(results);
    results.setSearch(search);

    function changeSizeImages() {
        let listImages = document.querySelectorAll('.songs__item-img');

        if (listImages.length) {
            const parentSize = listImages[0].parentElement.offsetWidth,
                newSize = document.documentElement.clientWidth < 390 ? parentSize : 169;

            listImages.forEach(image => {
                image.setAttribute('width', `${newSize}px`);
                image.setAttribute('height', `${newSize}px`);
            });
        }
    }

    changeSizeImages();
    window.onresize = changeSizeImages;
});