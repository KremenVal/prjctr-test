import HTML from "../additional/html";

export default class Results {
	constructor() {
		this.results = document.querySelector('.results');
		this.list = document.querySelector('.results__list');
		this.reset = document.querySelector('.results__options-reset');
		this.search;

		if (this.reset) {
			this.onClickReset();
		}
	}

	onClickReset() {
		this.reset.addEventListener('click', () => {
			let artist = this.search.search.querySelector('#artist'),
				genre = this.search.search.querySelector('#genre .search__select-item-selected'),
				decade = this.search.search.querySelector('#decade .search__select-item-selected'),
				country = this.search.search.querySelector('#country .search__select-item-selected');
			this.list.replaceChildren();
			this.results.classList.remove('shown');

			if (artist) {
				artist.value = '';
			}

			if (genre) {
				genre.dataset.value = genre.dataset.default;
				genre.textContent = genre.dataset.default;
			}

			if (decade) {
				decade.dataset.value = decade.dataset.default;
				decade.textContent = decade.dataset.default;
			}

			if (country) {
				country.dataset.value = country.dataset.default;
				country.textContent = country.dataset.default;
			}

			this.search.search.classList.add('shown');
			this.search.search.querySelector('.search__submit').click();
		});
	}

	setSearch(search) {
		this.search = search;
	}

	renderResults(data) {
		if (this.results) {
			this.results.classList.add('shown');
		}

		if (this.list) {
			this.list.replaceChildren();

			for (let value of data) {
				let splitData = value[1].split(',').filter(param => param !== '');

				for (let searching of splitData) {
					let li = HTML.createElement('li', 'results__list-item', {
						'data-value': searching,
						'data-form': value[0]
					}, searching);

					li.addEventListener('click',() => {
						li.remove();

						let oldItems = this.list.querySelectorAll('li'),
							newData = {},
							sendData = [];

						for (let item of oldItems) {
							const {value, form} = item.dataset;

							if (!newData[form]) {
								newData[form] = [];
							}

							newData[form].push(value);
						}

						for (let key of Object.keys(newData)) {
							sendData.push([key, newData[key].join(',')]);
						}

						this.search.searchByData(sendData);
					});

					this.list.append(li);
				}
			}
		}
	}
}