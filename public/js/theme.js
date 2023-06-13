import './additional/get-data-songs';
import CustomSelectors from "./components/custom-selectors";
import Pagination from "./components/pagination";
import Search from "./components/search";
import ListSongs from "./components/list-songs";
import Header from "./components/header";

document.addEventListener("DOMContentLoaded", () => {
    const listSongs = new ListSongs(),
        pagination = new Pagination(listSongs);

    new CustomSelectors(document.querySelector('.search'));
    new Search(pagination, listSongs);
    new Header();

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