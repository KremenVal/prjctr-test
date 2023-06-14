export default class CustomSelectors {
    constructor(parent) {
        if (parent) {
            this.parent = parent;
            this.selectedItem = this.parent.querySelectorAll('.search__select-item-selected');
            this.items = this.parent.querySelectorAll('.search__select-item');
            this.body = document.querySelector('body');

            this.initSelectedSize();
            this.initItems();
            this.onClickBody();
        }
    }

    initItems() {
        if (this.items.length) {
            for (let item of this.items) {
                item.addEventListener('click', event => {
                    const parent = item.parentElement,
                        selected = parent.querySelector('.search__select-item-selected');

                    for (let child of parent.children) {
                        child.classList.remove('selected');
                    }

                    item.classList.add('selected');
                    selected.textContent = item.textContent;
                    selected.dataset.value = item.dataset.value;
                    selected.click();
                });
            }
        }
    }

    initSelectedSize() {
        if (this.selectedItem.length) {
            for (let index in Object.keys(this.selectedItem)) {
                const parent = this.selectedItem[index].parentElement,
                    selected = parent.querySelector('li.selected');

                this.selectedItem[index].textContent = selected.textContent;
                this.selectedItem[index].dataset.value = selected.dataset.value;
                this.selectedItem[index].addEventListener('click', () => {
                    this.selectedItem.forEach(select => {
                        if (select != this.selectedItem[index] && select.parentElement.classList.contains('opened')) {
                            select.click();
                        }
                    });

                    if (parent) {
                        if (parent.classList.contains('opened')) {
                            parent.classList.remove('opened');
                            parent.style.height = this.selectedItem[index].offsetHeight + 'px';
                        } else {
                            parent.classList.add('opened');
                            parent.style.height = this.selectedItem[index].offsetHeight * parent.children.length + 'px';
                        }
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
                        !target.matches('.search__select-item') && !target.matches('.search__select')) {
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