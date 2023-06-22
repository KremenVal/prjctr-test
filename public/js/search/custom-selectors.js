import HTML from "../additional/html";

export default class CustomSelectors {
	constructor(parent) {
		if (parent) {
			this.parent = parent;
			this.selectedItem = this.parent.querySelectorAll('.search__select-item-selected');
			this.items = this.parent.querySelectorAll('.search__select-item');
			this.body = document.querySelector('body');
			this.combobox = document.querySelector('.search__combobox');
			this.allSongs = JSON.parse(localStorage.getItem('songs'));
			this.artist = document.querySelector('.search__artist');

			this.initInputArtist();
			this.initCombobox();
			this.initSelectedItems();
			this.initItems();
			this.onClickBody();
		}
	}

	initInputArtist() {
		if (this.artist) {
			this.artist.addEventListener('keyup', () => {
				let searching = this.artist.value.toUpperCase(),
					search = this.combobox.querySelectorAll('.search__combobox-item');

				if (searching === '') {
					this.combobox.classList.remove('shown');
				} else {
					this.combobox.classList.add('shown');
				}

				for (let result of search) {
					let text = result.textContent || result.innerText;

					if (text.toUpperCase().indexOf(searching) > -1) {
						result.style.display = "";
					} else {
						result.style.display = "none";
					}
				}
			});
		}
	}

	initCombobox() {
		if (this.combobox) {
			let data = [];

			for (let key of Object.keys(this.allSongs)) {
				data.push(this.allSongs[key].band, this.allSongs[key].song);
			}

			data = data.filter((value, index, array) => array.indexOf(value) === index);

			for (let item of data) {
				let span = HTML.createElement('span', 'search__combobox-item', {
					'data-value': item
				}, item);

				span.addEventListener('click', () => {
					this.artist.value = item;
					this.combobox.classList.remove('shown');
				});

				this.combobox.append(span);
			}
		}
	}

	initItems() {
		if (this.items.length) {
			for (let item of this.items) {
				item.addEventListener('click', event => {
					event.preventDefault();

					const parent = item.parentElement,
						selected = parent.querySelector('.search__select-item-selected'),
						input = item.querySelector('input');

					for (let child of parent.children) {
						child.classList.remove('selected');
					}

					item.classList.add('selected');

					if (parent.id === 'genre') {
						input.checked = !input.checked;

						let searching = selected.dataset.value.split(',').filter(genre => genre !== ''),
							index = searching.findIndex(value => value.toLowerCase() === item.dataset.value.toLowerCase());

						if (index !== -1) {
							searching.splice(index, 1);
						} else {
							searching.push(item.textContent.replace(/(\r\n|\n|\r|\t)/gm, "").replaceAll(' ', ''));
						}

						selected.textContent = !searching.length ? selected.dataset.default : searching.join(',');
						selected.dataset.value = searching.join(',');
					} else {
						selected.textContent = item.textContent;
						selected.dataset.value = item.dataset.value;
						selected.click();
					}
				});
			}
		}
	}

	initSelectedItems() {
		if (this.selectedItem.length) {
			for (let index in Object.keys(this.selectedItem)) {
				const parent = this.selectedItem[index].parentElement,
					selected = parent.querySelector('li.selected');

				if (selected) {
					this.selectedItem[index].textContent = selected.textContent;
					this.selectedItem[index].dataset.value = selected.dataset.value;
				}

				this.selectedItem[index].addEventListener('click', () => {
					this.selectedItem.forEach(select => {
						if (select != this.selectedItem[index] && select.parentElement.classList.contains('opened')) {
							select.click();
						}
					});

					parent.scrollTo({
						top: 0,
						behavior: 'smooth'
					});

					if (parent && !parent.classList.contains('opened')) {
						parent.classList.add('opened');
					} else {
						parent.classList.remove('opened');
					}
				});
			}
		}
	}

	onClickBody() {
		if (this.body) {
			this.body.addEventListener('click', event => {
				const {target} = event;

				if (target) {
					if (!target.matches('.search__select-item-selected') &&
						!target.matches('.search__select-item') && !target.matches('.search__select') &&
						!target.matches('.search__select-checkmark') &&
						!target.matches('.search__select-label')) {
						this.selectedItem.forEach(select => {
							if (select.parentElement.classList.contains('opened')) {
								select.click();
							}
						});
					}
				}
			});
		}
	}
}