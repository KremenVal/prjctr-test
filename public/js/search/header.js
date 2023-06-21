export default class Header {
	constructor() {
		this.back = document.querySelector('.header__container-back');
		this.favorite = document.querySelector('.header__container-item.favorite');
		this.saved = document.querySelector('.header__container-item.saved');
		this.submitSearch = document.querySelector('.search__submit');

		this.onClickBack();
		this.onClickFavorite();
		this.onClickSaved();
	}

	onClickBack() {
		if (this.back) {
			this.back.addEventListener('click', () => {
				history.back();
			});
		}
	}

	onClickFavorite() {
		if (this.favorite) {
			this.favorite.addEventListener('click', () => {
				if (this.favorite.classList.contains('selected')) {
					this.favorite.classList.remove('selected');
				} else {
					this.favorite.classList.add('selected');
				}

				this.submitSearch.click();
			});
		}
	}

	onClickSaved() {
		if (this.saved) {
			this.saved.addEventListener('click', () => {
				if (this.saved.classList.contains('selected')) {
					this.saved.classList.remove('selected');
				} else {
					this.saved.classList.add('selected');
				}

				this.submitSearch.click();
			});
		}
	}
}