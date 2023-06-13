import HTML from "../additional/html";

export default class ListSongs {
    constructor() {
        this.perPage = parseInt(localStorage.getItem('perPage'));
        this.allSongs = JSON.parse(localStorage.getItem('songs'));
        this.parent = document.querySelector('.songs');
    }

    setAllSongs(allSongs) {
        this.allSongs = allSongs;
    }

    renderSongs(start) {
        const songsToRender = this.allSongs.slice(start, start + this.perPage);

        if (this.parent) {
            this.parent.replaceChildren();

            for (let song of songsToRender) {
                let li = HTML.createElement('li', 'songs__item', {
                        'data-id': song.id,
                        'data-favorite': song.favorite,
                        'data-saved': song.added,
                        'data-artist': song.band,
                        'data-genre': song.style.join(','),
                        'data-decade': song.year,
                        'data-country': song.country,
                    }),
                    img = HTML.createElement('img', 'songs__item-img', {
                        src: song.img,
                        alt: song.song,
                        width: '169px',
                        height: '169px'
                    }),
                    favorite = HTML.createElement('span', 'songs__item-favorite', {
                        'data-favorite': song.favorite
                    }),
                    songDataContainer = HTML.createElement('div', 'songs__item-container'),
                    songName = HTML.createElement('h2', 'songs__item-song', {}, song.song),
                    songBand = HTML.createElement('h3', 'songs__item-band', {}, song.band),
                    songYear = HTML.createElement('span', 'songs__item-year', {}, 'Year : '),
                    songYearBand = HTML.createElement('span', '', {}, song.year),
                    songStyle = HTML.createElement('span', 'songs__item-style', {}, 'Style : '),
                    songStyleBand = HTML.createElement('span', '', {}, song.style.join(',')),
                    songCountry = HTML.createElement('span', 'songs__item-country', {}, 'Country : '),
                    songCountryBand = HTML.createElement('span', '', {}, song.country),
                    songAdd = HTML.createElement('button', 'songs__item-add', {
                        type: 'button'
                    }, 'Add');

                songYear.append(songYearBand);
                songStyle.append(songStyleBand);
                songCountry.append(songCountryBand);
                songDataContainer.append(songName, songBand, songYear, songStyle, songCountry, songAdd)
                li.append(img, favorite, songDataContainer);
                favorite.addEventListener('click', () => {
                    const result = this.changeData(song.id, 'favorite');

                    li.dataset.favorite = result.toString();
                    favorite.dataset.favorite = result.toString();
                });
                songAdd.addEventListener('click', () => {
                    const result = this.changeData(song.id, 'added');

                    li.dataset.added = result.toString();
                    favorite.dataset.added = result.toString();
                });

               this.parent.append(li);
            }
        }
    }

    changeData(id, name) {
        const allSongs = JSON.parse(localStorage.getItem('songs')),
            index = allSongs.findIndex(song => song.id === id);

        if (index !== -1) {
            const value = name !== 'added' ? !allSongs[index][name] : true;

            allSongs[index][name] = value;
            localStorage.setItem('songs', JSON.stringify(allSongs));

            return value;
        }
    }
}