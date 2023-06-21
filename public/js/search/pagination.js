import HTML from "../additional/html";

export default class Pagination {
    constructor(listSongs) {
        this.pagination = document.querySelector('.pagination');

        if (this.pagination) {
            this.listSongs = listSongs;
            this.perPage = parseInt(localStorage.getItem('perPage'));
            this.allSongsLength = parseInt(JSON.parse(localStorage.getItem('songs')).length);
            this.pageCount = Math.ceil(this.allSongsLength / this.perPage);
            this.urlParams = new URLSearchParams(window.location.search);
            this.currentPage = parseInt(this.urlParams.get('page')) || 1;

            this.listSongs.renderSongs(this.getStartListSongs());
            this.renderPagination();
        }
    }

    setPageCount(pageCount) {
        this.pageCount = pageCount;
    }

    renderPagination() {
        const arrayPagination = this.getPagination(this.currentPage, this.pageCount);

        this.pagination.replaceChildren();

        if (arrayPagination.length > 1) {
            arrayPagination.forEach(page => {
                let pageButton = HTML.createElement('button', 'pagination__page', {
                    'data-index': page,
                    'aria-label': `Page ${page}`
                }, page);

                this.currentPage === page ? pageButton.classList.add('selected') : '';

                pageButton.addEventListener('click', () => {
                    if (page !== '...') {
                        const url = window.location.href.split('?')[0] + (page !== 1 ? `?page=${page}` : '');
                        this.pagination.replaceChildren();
                        this.currentPage = page;
                        history.replaceState(null, "", url);

                        this.listSongs.renderSongs(this.getStartListSongs());
                        this.renderPagination();
                    }
                });

                this.pagination.append(pageButton);
            });
        }

        this.listSongs.renderSongs(this.getStartListSongs());
    }

    getPagination(currentPage, pageCount) {
        let delta;

        if (pageCount <= 7) {
            delta = 7;
        } else {
            delta = currentPage > 4 && currentPage < pageCount - 3 ? 2 : 4;
        }

        const range = {
            start: Math.round(currentPage - delta / 2),
            end: Math.round(currentPage + delta / 2)
        };

        if (range.start - 1 === 1 || range.end + 1 === pageCount) {
            range.start += 1;
            range.end += 1;
        }

        let pages = currentPage > delta ?
            this.getRange(Math.min(range.start, pageCount - delta), Math.min(range.end, pageCount)) :
            this.getRange(1, Math.min(pageCount, delta + 1));

        const withDots = (value, pair) => (pages.length + 1 !== pageCount ? pair : [value]);

        if (pages[0] !== 1) {
            pages = withDots(1, [1, '...']).concat(pages);
        }

        if (pages[pages.length - 1] < pageCount) {
            pages = pages.concat(withDots(pageCount, ['...', pageCount]));
        }

        return pages;
    }

    getRange(start, end) {
        return Array(end - start + 1).fill().map((v, i) => i + start);
    }

    getStartListSongs() {
        return this.perPage * (this.currentPage - 1);
    }
}