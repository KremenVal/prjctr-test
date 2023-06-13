export default class Search {
    constructor(pagination, listSongs) {
        this.search = document.querySelector('.search');
        this.allSongs = JSON.parse(localStorage.getItem('songs'));
        this.perPage = parseInt(localStorage.getItem('perPage'));
        this.pagination = pagination;
        this.listSongs = listSongs;
        this.searchArtist = document.querySelector('.search__artist');

        if (this.search) {
            this.init();
            this.onInputArtist();
        }
    }

    onInputArtist() {
        if (this.searchArtist) {
            const {length} = this.searchArtist.dataset;

            this.searchArtist.addEventListener('input', () => {
                if (this.searchArtist.value.length > length) {
                    this.searchArtist.nextElementSibling.classList.add('shown');
                } else {
                    this.searchArtist.nextElementSibling.classList.remove('shown');
                }
            });
        }
    }

    init() {
        this.search.addEventListener('submit', event => {
            event.preventDefault();

            let data = [];
            const artist = this.search.querySelector('#artist'),
                genre = this.search.querySelector('#genre .search__select-item-selected'),
                decade = this.search.querySelector('#decade .search__select-item-selected'),
                country = this.search.querySelector('#country .search__select-item-selected'),
                favorite = document.querySelector('.header__container-item.favorite.selected'),
                saved = document.querySelector('.header__container-item.saved.selected');

            artist.value ? data.push(['band', artist.value]) : '';
            genre.dataset.value ? data.push(['style', genre.dataset.value]) : '';
            decade.dataset.value ? data.push(['year', decade.dataset.value]) : '';
            country.dataset.value ? data.push(['country', country.dataset.value]) : '';
            favorite ? data.push(['favorite', 'true']) : '';
            saved ? data.push(['added', 'true']) : '';

            this.searchByData(data);
        });
    }

    searchByData(data) {
        let matched = [];

        this.allSongs.forEach(song => {
            let count = 0;

            data.forEach(searching => {
                let search = song[searching[0]].toString().toLowerCase();

                if (typeof search === "object") {
                    search = search.join(',');
                } else if (!isNaN(Number(search)) && searching[0] === 'year') {
                    let arrayYears = searching[1].split('-');

                    if (+search >= +arrayYears[0] && +search <= +arrayYears[1]) {
                        count++;
                        return;
                    }
                }

                count += search.indexOf(searching[1].toLowerCase()) !== -1 ? 1 : 0;
            });

            if (count === data.length) {
                matched.push(song);
            }
        });

        this.listSongs.setAllSongs(matched);
        this.pagination.setPageCount(Math.ceil(matched.length / this.perPage) || 1);
        this.pagination.renderPagination();

        let pagination = document.querySelector('.pagination__page');

        if (pagination) {
            pagination.click();
        }
    }
}