/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/additional/get-data-songs.js":
/*!*****************************************!*\
  !*** ./js/additional/get-data-songs.js ***!
  \*****************************************/
/***/ (() => {

let songs = [];
const bands = ["AC/DC", "Imagine Dragons", "Metallica", "Skillet"], genres = ["Rock", "Funk", "Beats", "Hip Hop", "Pop", "Rap"], countries = ["USA", "UK", "UA", "PL", "UAE", "JP"];
function getRandomValue(array) {
  return array[Math.floor(Math.random() * array.length)];
}
for (let i = 1; i <= 48; i++) {
  songs.push({
    id: i,
    favorite: false,
    img: `public/img/songs/list/song${i}.jpeg`,
    song: "Let There Be Rock",
    band: getRandomValue(bands),
    year: Math.floor(Math.random() * (2030 - 1950)) + 1950,
    style: [getRandomValue(genres)],
    country: getRandomValue(countries),
    added: false
  });
}
if (!localStorage.getItem("songs")) {
  localStorage.setItem("songs", JSON.stringify(songs));
  localStorage.setItem("perPage", "6");
}


/***/ }),

/***/ "./js/additional/html.js":
/*!*******************************!*\
  !*** ./js/additional/html.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HTML)
/* harmony export */ });
class HTML {
  static createElement(elementName, className = "", attributes = null, text = "") {
    if (!elementName.length) {
      return null;
    }
    let element = document.createElement(elementName);
    if (attributes) {
      for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
      }
    }
    if (className) {
      element.className = className;
    }
    if (text) {
      element.appendChild(HTML.createText(text));
    }
    return element;
  }
  static createText(text = null) {
    return text ? document.createTextNode(text) : null;
  }
}


/***/ }),

/***/ "./js/components/custom-selectors.js":
/*!*******************************************!*\
  !*** ./js/components/custom-selectors.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CustomSelectors)
/* harmony export */ });
class CustomSelectors {
  constructor(parent) {
    if (parent) {
      this.parent = parent;
      this.selectedItem = this.parent.querySelectorAll(".search__select-item-selected");
      this.items = this.parent.querySelectorAll(".search__select-item");
      this.body = document.querySelector("body");
      this.initSelectedSize();
      this.initItems();
      this.onClickBody();
    }
  }
  initItems() {
    if (this.items.length) {
      for (let item of this.items) {
        item.addEventListener("click", (event) => {
          const parent = item.parentElement, selected = parent.querySelector(".search__select-item-selected");
          for (let child of parent.children) {
            child.classList.remove("selected");
          }
          item.classList.add("selected");
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
        const parent = this.selectedItem[index].parentElement, selected = parent.querySelector("li.selected");
        this.selectedItem[index].textContent = selected.textContent;
        this.selectedItem[index].dataset.value = selected.dataset.value;
        this.selectedItem[index].addEventListener("click", () => {
          this.selectedItem.forEach((select) => {
            if (select != this.selectedItem[index] && select.parentElement.classList.contains("opened")) {
              select.click();
            }
          });
          if (parent) {
            if (parent.classList.contains("opened")) {
              parent.classList.remove("opened");
              parent.style.height = this.selectedItem[index].offsetHeight + "px";
            } else {
              parent.classList.add("opened");
              parent.style.height = this.selectedItem[index].offsetHeight * parent.children.length + "px";
            }
          }
        });
      }
    }
  }
  onClickBody() {
    if (this.body) {
      this.body.addEventListener("click", (event) => {
        const { target } = event;
        if (target) {
          if (!target.matches(".search__select-item-selected") && !target.matches(".search__select-item") && !target.matches(".search__select")) {
            this.selectedItem.forEach((select) => {
              if (select.parentElement.classList.contains("opened")) {
                select.click();
              }
            });
          }
        }
      });
    }
  }
}


/***/ }),

/***/ "./js/components/header.js":
/*!*********************************!*\
  !*** ./js/components/header.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Header)
/* harmony export */ });
class Header {
  constructor() {
    this.back = document.querySelector(".header__container-back");
    this.favorite = document.querySelector(".header__container-item.favorite");
    this.saved = document.querySelector(".header__container-item.saved");
    this.submitSearch = document.querySelector(".search__submit");
    this.onClickBack();
    this.onClickFavorite();
    this.onClickSaved();
  }
  onClickBack() {
    if (this.back) {
      this.back.addEventListener("click", () => {
        history.back();
      });
    }
  }
  onClickFavorite() {
    if (this.favorite) {
      this.favorite.addEventListener("click", () => {
        if (this.favorite.classList.contains("selected")) {
          this.favorite.classList.remove("selected");
        } else {
          this.favorite.classList.add("selected");
        }
        this.submitSearch.click();
      });
    }
  }
  onClickSaved() {
    if (this.saved) {
      this.saved.addEventListener("click", () => {
        if (this.saved.classList.contains("selected")) {
          this.saved.classList.remove("selected");
        } else {
          this.saved.classList.add("selected");
        }
        this.submitSearch.click();
      });
    }
  }
}


/***/ }),

/***/ "./js/components/list-songs.js":
/*!*************************************!*\
  !*** ./js/components/list-songs.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ListSongs)
/* harmony export */ });
/* harmony import */ var _additional_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../additional/html */ "./js/additional/html.js");

class ListSongs {
  constructor() {
    this.perPage = parseInt(localStorage.getItem("perPage"));
    this.allSongs = JSON.parse(localStorage.getItem("songs"));
    this.parent = document.querySelector(".songs");
  }
  setAllSongs(allSongs) {
    this.allSongs = allSongs;
  }
  renderSongs(start) {
    const songsToRender = this.allSongs.slice(start, start + this.perPage);
    if (this.parent) {
      this.parent.replaceChildren();
      for (let song of songsToRender) {
        let li = _additional_html__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("li", "songs__item", {
          "data-id": song.id,
          "data-favorite": song.favorite,
          "data-saved": song.added,
          "data-artist": song.band,
          "data-genre": song.style.join(","),
          "data-decade": song.year,
          "data-country": song.country
        }), img = _additional_html__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("img", "songs__item-img", {
          src: song.img,
          alt: song.song,
          width: "169px",
          height: "169px"
        }), favorite = _additional_html__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", "songs__item-favorite", {
          "data-favorite": song.favorite
        }), songDataContainer = _additional_html__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", "songs__item-container"), songName = _additional_html__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("h2", "songs__item-song", {}, song.song), songBand = _additional_html__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("h3", "songs__item-band", {}, song.band), songYear = _additional_html__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", "songs__item-year", {}, "Year : "), songYearBand = _additional_html__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", "", {}, song.year), songStyle = _additional_html__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", "songs__item-style", {}, "Style : "), songStyleBand = _additional_html__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", "", {}, song.style.join(",")), songCountry = _additional_html__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", "songs__item-country", {}, "Country : "), songCountryBand = _additional_html__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", "", {}, song.country), songAdd = _additional_html__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("button", "songs__item-add", {
          type: "button"
        }, "Add");
        songYear.append(songYearBand);
        songStyle.append(songStyleBand);
        songCountry.append(songCountryBand);
        songDataContainer.append(songName, songBand, songYear, songStyle, songCountry, songAdd);
        li.append(img, favorite, songDataContainer);
        favorite.addEventListener("click", () => {
          const result = this.changeData(song.id, "favorite");
          li.dataset.favorite = result.toString();
          favorite.dataset.favorite = result.toString();
        });
        songAdd.addEventListener("click", () => {
          const result = this.changeData(song.id, "added");
          li.dataset.added = result.toString();
          favorite.dataset.added = result.toString();
        });
        this.parent.append(li);
      }
    }
  }
  changeData(id, name) {
    const allSongs = JSON.parse(localStorage.getItem("songs")), index = allSongs.findIndex((song) => song.id === id);
    if (index !== -1) {
      const value = name !== "added" ? !allSongs[index][name] : true;
      allSongs[index][name] = value;
      localStorage.setItem("songs", JSON.stringify(allSongs));
      return value;
    }
  }
}


/***/ }),

/***/ "./js/components/pagination.js":
/*!*************************************!*\
  !*** ./js/components/pagination.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Pagination)
/* harmony export */ });
/* harmony import */ var _additional_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../additional/html */ "./js/additional/html.js");

class Pagination {
  constructor(listSongs) {
    this.pagination = document.querySelector(".pagination");
    if (this.pagination) {
      this.listSongs = listSongs;
      this.perPage = parseInt(localStorage.getItem("perPage"));
      this.allSongsLength = parseInt(JSON.parse(localStorage.getItem("songs")).length);
      this.pageCount = Math.ceil(this.allSongsLength / this.perPage);
      this.urlParams = new URLSearchParams(window.location.search);
      this.currentPage = parseInt(this.urlParams.get("page")) || 1;
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
    arrayPagination.forEach((page) => {
      let pageButton = _additional_html__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("button", "pagination__page", {
        "data-index": page,
        "aria-label": `Page ${page}`
      }, page);
      this.currentPage === page ? pageButton.classList.add("selected") : "";
      pageButton.addEventListener("click", () => {
        if (page !== "...") {
          const url = window.location.href.split("?")[0] + (page !== 1 ? `?page=${page}` : "");
          this.pagination.replaceChildren();
          this.currentPage = page;
          history.replaceState(null, "", url);
          this.listSongs.renderSongs(this.getStartListSongs());
          this.renderPagination();
        }
      });
      this.pagination.append(pageButton);
    });
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
    let pages = currentPage > delta ? this.getRange(Math.min(range.start, pageCount - delta), Math.min(range.end, pageCount)) : this.getRange(1, Math.min(pageCount, delta + 1));
    const withDots = (value, pair) => pages.length + 1 !== pageCount ? pair : [value];
    if (pages[0] !== 1) {
      pages = withDots(1, [1, "..."]).concat(pages);
    }
    if (pages[pages.length - 1] < pageCount) {
      pages = pages.concat(withDots(pageCount, ["...", pageCount]));
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


/***/ }),

/***/ "./js/components/search.js":
/*!*********************************!*\
  !*** ./js/components/search.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Search)
/* harmony export */ });
class Search {
  constructor(pagination, listSongs) {
    this.search = document.querySelector(".search");
    this.allSongs = JSON.parse(localStorage.getItem("songs"));
    this.perPage = parseInt(localStorage.getItem("perPage"));
    this.pagination = pagination;
    this.listSongs = listSongs;
    this.searchArtist = document.querySelector(".search__artist");
    if (this.search) {
      this.init();
      this.onInputArtist();
    }
  }
  onInputArtist() {
    if (this.searchArtist) {
      const { length } = this.searchArtist.dataset;
      this.searchArtist.addEventListener("input", () => {
        if (this.searchArtist.value.length > length) {
          this.searchArtist.nextElementSibling.classList.add("shown");
        } else {
          this.searchArtist.nextElementSibling.classList.remove("shown");
        }
      });
    }
  }
  init() {
    this.search.addEventListener("submit", (event) => {
      event.preventDefault();
      let data = [];
      const artist = this.search.querySelector("#artist"), genre = this.search.querySelector("#genre .search__select-item-selected"), decade = this.search.querySelector("#decade .search__select-item-selected"), country = this.search.querySelector("#country .search__select-item-selected"), favorite = document.querySelector(".header__container-item.favorite.selected"), saved = document.querySelector(".header__container-item.saved.selected");
      artist.value ? data.push(["band", artist.value]) : "";
      genre.dataset.value ? data.push(["style", genre.dataset.value]) : "";
      decade.dataset.value ? data.push(["year", decade.dataset.value]) : "";
      country.dataset.value ? data.push(["country", country.dataset.value]) : "";
      favorite ? data.push(["favorite", "true"]) : "";
      saved ? data.push(["added", "true"]) : "";
      this.searchByData(data);
    });
  }
  searchByData(data) {
    let matched = [];
    this.allSongs.forEach((song) => {
      let count = 0;
      data.forEach((searching) => {
        let search = song[searching[0]].toString().toLowerCase();
        if (typeof search === "object") {
          search = search.join(",");
        } else if (!isNaN(Number(search)) && searching[0] === "year") {
          let arrayYears = searching[1].split("-");
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
    let pagination = document.querySelector(".pagination__page");
    if (pagination) {
      pagination.click();
    }
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var __webpack_exports__ = {};
/*!*********************!*\
  !*** ./js/theme.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _additional_get_data_songs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./additional/get-data-songs */ "./js/additional/get-data-songs.js");
/* harmony import */ var _additional_get_data_songs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_additional_get_data_songs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_custom_selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/custom-selectors */ "./js/components/custom-selectors.js");
/* harmony import */ var _components_pagination__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/pagination */ "./js/components/pagination.js");
/* harmony import */ var _components_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/search */ "./js/components/search.js");
/* harmony import */ var _components_list_songs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/list-songs */ "./js/components/list-songs.js");
/* harmony import */ var _components_header__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/header */ "./js/components/header.js");






document.addEventListener("DOMContentLoaded", () => {
  const listSongs = new _components_list_songs__WEBPACK_IMPORTED_MODULE_4__["default"](), pagination = new _components_pagination__WEBPACK_IMPORTED_MODULE_2__["default"](listSongs);
  new _components_custom_selectors__WEBPACK_IMPORTED_MODULE_1__["default"](document.querySelector(".search"));
  new _components_search__WEBPACK_IMPORTED_MODULE_3__["default"](pagination, listSongs);
  new _components_header__WEBPACK_IMPORTED_MODULE_5__["default"]();
  function changeSizeImages() {
    let listImages = document.querySelectorAll(".songs__item-img");
    if (listImages.length) {
      const parentSize = listImages[0].parentElement.offsetWidth, newSize = document.documentElement.clientWidth < 390 ? parentSize : 169;
      listImages.forEach((image) => {
        image.setAttribute("width", `${newSize}px`);
        image.setAttribute("height", `${newSize}px`);
      });
    }
  }
  changeSizeImages();
  window.onresize = changeSizeImages;
});

})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!************************!*\
  !*** ./css/theme.scss ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFDSjtBQUVBLG1CQUFpQjtBQUNqQixTQUFPLFdBQVc7QUFDdEIsQ0FBQzs7Ozs7Ozs7Ozs7QUMvQkQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9hZGRpdGlvbmFsL2dldC1kYXRhLXNvbmdzLmpzIiwid2VicGFjazovLy8uL2pzL2FkZGl0aW9uYWwvaHRtbC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2N1c3RvbS1zZWxlY3RvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9oZWFkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9saXN0LXNvbmdzLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvcGFnaW5hdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL3NlYXJjaC5qcyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vanMvdGhlbWUuanMiLCJ3ZWJwYWNrOi8vLy4vY3NzL3RoZW1lLnNjc3MiXSwic291cmNlc0NvbnRlbnQiOlsibGV0IHNvbmdzID0gW107XG5jb25zdCBiYW5kcyA9IFsnQUMvREMnLCAnSW1hZ2luZSBEcmFnb25zJywgJ01ldGFsbGljYScsICdTa2lsbGV0J10sXG4gICAgZ2VucmVzID0gWydSb2NrJywgJ0Z1bmsnLCAnQmVhdHMnLCAnSGlwIEhvcCcsICdQb3AnLCAnUmFwJ10sXG4gICAgY291bnRyaWVzID0gWydVU0EnLCAnVUsnLCAnVUEnLCAnUEwnLCAnVUFFJywgJ0pQJ107XG5cbmZ1bmN0aW9uIGdldFJhbmRvbVZhbHVlKGFycmF5KSB7XG4gICAgcmV0dXJuIGFycmF5W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFycmF5Lmxlbmd0aCldO1xufVxuXG5mb3IgKGxldCBpID0gMTsgaSA8PSA0ODsgaSsrKSB7XG4gICAgc29uZ3MucHVzaCh7XG4gICAgICAgIGlkOiBpLFxuICAgICAgICBmYXZvcml0ZTogZmFsc2UsXG4gICAgICAgIGltZzogYHB1YmxpYy9pbWcvc29uZ3MvbGlzdC9zb25nJHtpfS5qcGVnYCxcbiAgICAgICAgc29uZzogJ0xldCBUaGVyZSBCZSBSb2NrJyxcbiAgICAgICAgYmFuZDogZ2V0UmFuZG9tVmFsdWUoYmFuZHMpLFxuICAgICAgICB5ZWFyOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMjAzMCAtIDE5NTApKSArIDE5NTAsXG4gICAgICAgIHN0eWxlOiBbZ2V0UmFuZG9tVmFsdWUoZ2VucmVzKV0sXG4gICAgICAgIGNvdW50cnk6IGdldFJhbmRvbVZhbHVlKGNvdW50cmllcyksXG4gICAgICAgIGFkZGVkOiBmYWxzZVxuICAgIH0pO1xufVxuXG5pZiAoIWxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzb25ncycpKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3NvbmdzJywgSlNPTi5zdHJpbmdpZnkoc29uZ3MpKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncGVyUGFnZScsICc2Jyk7XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSFRNTCB7XG4gICAgc3RhdGljIGNyZWF0ZUVsZW1lbnQoZWxlbWVudE5hbWUsIGNsYXNzTmFtZSA9ICcnLCBhdHRyaWJ1dGVzID0gbnVsbCwgdGV4dCA9ICcnKSB7XG4gICAgICAgIGlmICghZWxlbWVudE5hbWUubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50TmFtZSk7XG5cbiAgICAgICAgaWYgKGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyaWJ1dGVzW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGV4dCkge1xuICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChIVE1MLmNyZWF0ZVRleHQodGV4dCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZVRleHQodGV4dCA9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRleHQgPyBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KSA6IG51bGw7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3VzdG9tU2VsZWN0b3JzIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnQpIHtcbiAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbSA9IHRoaXMucGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWFyY2hfX3NlbGVjdC1pdGVtLXNlbGVjdGVkJyk7XG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gdGhpcy5wYXJlbnQucXVlcnlTZWxlY3RvckFsbCgnLnNlYXJjaF9fc2VsZWN0LWl0ZW0nKTtcbiAgICAgICAgICAgIHRoaXMuYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcblxuICAgICAgICAgICAgdGhpcy5pbml0U2VsZWN0ZWRTaXplKCk7XG4gICAgICAgICAgICB0aGlzLmluaXRJdGVtcygpO1xuICAgICAgICAgICAgdGhpcy5vbkNsaWNrQm9keSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdEl0ZW1zKCkge1xuICAgICAgICBpZiAodGhpcy5pdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2YgdGhpcy5pdGVtcykge1xuICAgICAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudCA9IGl0ZW0ucGFyZW50RWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfX3NlbGVjdC1pdGVtLXNlbGVjdGVkJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgY2hpbGQgb2YgcGFyZW50LmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZC50ZXh0Q29udGVudCA9IGl0ZW0udGV4dENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkLmRhdGFzZXQudmFsdWUgPSBpdGVtLmRhdGFzZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0U2VsZWN0ZWRTaXplKCkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZEl0ZW0ubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCBpbiBPYmplY3Qua2V5cyh0aGlzLnNlbGVjdGVkSXRlbSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLnNlbGVjdGVkSXRlbVtpbmRleF0ucGFyZW50RWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBwYXJlbnQucXVlcnlTZWxlY3RvcignbGkuc2VsZWN0ZWQnKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtW2luZGV4XS50ZXh0Q29udGVudCA9IHNlbGVjdGVkLnRleHRDb250ZW50O1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtW2luZGV4XS5kYXRhc2V0LnZhbHVlID0gc2VsZWN0ZWQuZGF0YXNldC52YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbVtpbmRleF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtLmZvckVhY2goc2VsZWN0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3QgIT0gdGhpcy5zZWxlY3RlZEl0ZW1baW5kZXhdICYmIHNlbGVjdC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnb3BlbmVkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3QuY2xpY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmVudC5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW5lZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50LmNsYXNzTGlzdC5yZW1vdmUoJ29wZW5lZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudC5zdHlsZS5oZWlnaHQgPSB0aGlzLnNlbGVjdGVkSXRlbVtpbmRleF0ub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50LmNsYXNzTGlzdC5hZGQoJ29wZW5lZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudC5zdHlsZS5oZWlnaHQgPSB0aGlzLnNlbGVjdGVkSXRlbVtpbmRleF0ub2Zmc2V0SGVpZ2h0ICogcGFyZW50LmNoaWxkcmVuLmxlbmd0aCArICdweCc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ2xpY2tCb2R5KCkge1xuICAgICAgICBpZiAodGhpcy5ib2R5KSB7XG4gICAgICAgICAgICB0aGlzLmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qge3RhcmdldH0gPSBldmVudDtcblxuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0YXJnZXQubWF0Y2hlcygnLnNlYXJjaF9fc2VsZWN0LWl0ZW0tc2VsZWN0ZWQnKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgIXRhcmdldC5tYXRjaGVzKCcuc2VhcmNoX19zZWxlY3QtaXRlbScpICYmICF0YXJnZXQubWF0Y2hlcygnLnNlYXJjaF9fc2VsZWN0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtLmZvckVhY2goc2VsZWN0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdvcGVuZWQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3QuY2xpY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYWRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYmFjayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2NvbnRhaW5lci1iYWNrJyk7XG4gICAgICAgIHRoaXMuZmF2b3JpdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19jb250YWluZXItaXRlbS5mYXZvcml0ZScpO1xuICAgICAgICB0aGlzLnNhdmVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fY29udGFpbmVyLWl0ZW0uc2F2ZWQnKTtcbiAgICAgICAgdGhpcy5zdWJtaXRTZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoX19zdWJtaXQnKTtcblxuICAgICAgICB0aGlzLm9uQ2xpY2tCYWNrKCk7XG4gICAgICAgIHRoaXMub25DbGlja0Zhdm9yaXRlKCk7XG4gICAgICAgIHRoaXMub25DbGlja1NhdmVkKCk7XG4gICAgfVxuXG4gICAgb25DbGlja0JhY2soKSB7XG4gICAgICAgIGlmICh0aGlzLmJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuYmFjay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBoaXN0b3J5LmJhY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25DbGlja0Zhdm9yaXRlKCkge1xuICAgICAgICBpZiAodGhpcy5mYXZvcml0ZSkge1xuICAgICAgICAgICAgdGhpcy5mYXZvcml0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mYXZvcml0ZS5jbGFzc0xpc3QuY29udGFpbnMoJ3NlbGVjdGVkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mYXZvcml0ZS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmF2b3JpdGUuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnN1Ym1pdFNlYXJjaC5jbGljaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkNsaWNrU2F2ZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLnNhdmVkKSB7XG4gICAgICAgICAgICB0aGlzLnNhdmVkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNhdmVkLmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0ZWQnKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdmVkLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXZlZC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuc3VibWl0U2VhcmNoLmNsaWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgSFRNTCBmcm9tIFwiLi4vYWRkaXRpb25hbC9odG1sXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpc3RTb25ncyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucGVyUGFnZSA9IHBhcnNlSW50KGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwZXJQYWdlJykpO1xuICAgICAgICB0aGlzLmFsbFNvbmdzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc29uZ3MnKSk7XG4gICAgICAgIHRoaXMucGFyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNvbmdzJyk7XG4gICAgfVxuXG4gICAgc2V0QWxsU29uZ3MoYWxsU29uZ3MpIHtcbiAgICAgICAgdGhpcy5hbGxTb25ncyA9IGFsbFNvbmdzO1xuICAgIH1cblxuICAgIHJlbmRlclNvbmdzKHN0YXJ0KSB7XG4gICAgICAgIGNvbnN0IHNvbmdzVG9SZW5kZXIgPSB0aGlzLmFsbFNvbmdzLnNsaWNlKHN0YXJ0LCBzdGFydCArIHRoaXMucGVyUGFnZSk7XG5cbiAgICAgICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICAgICAgICB0aGlzLnBhcmVudC5yZXBsYWNlQ2hpbGRyZW4oKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgc29uZyBvZiBzb25nc1RvUmVuZGVyKSB7XG4gICAgICAgICAgICAgICAgbGV0IGxpID0gSFRNTC5jcmVhdGVFbGVtZW50KCdsaScsICdzb25nc19faXRlbScsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhLWlkJzogc29uZy5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhLWZhdm9yaXRlJzogc29uZy5mYXZvcml0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhLXNhdmVkJzogc29uZy5hZGRlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhLWFydGlzdCc6IHNvbmcuYmFuZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhLWdlbnJlJzogc29uZy5zdHlsZS5qb2luKCcsJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGF0YS1kZWNhZGUnOiBzb25nLnllYXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGF0YS1jb3VudHJ5Jzogc29uZy5jb3VudHJ5LFxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgaW1nID0gSFRNTC5jcmVhdGVFbGVtZW50KCdpbWcnLCAnc29uZ3NfX2l0ZW0taW1nJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBzb25nLmltZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsdDogc29uZy5zb25nLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxNjlweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcxNjlweCdcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlID0gSFRNTC5jcmVhdGVFbGVtZW50KCdzcGFuJywgJ3NvbmdzX19pdGVtLWZhdm9yaXRlJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEtZmF2b3JpdGUnOiBzb25nLmZhdm9yaXRlXG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICBzb25nRGF0YUNvbnRhaW5lciA9IEhUTUwuY3JlYXRlRWxlbWVudCgnZGl2JywgJ3NvbmdzX19pdGVtLWNvbnRhaW5lcicpLFxuICAgICAgICAgICAgICAgICAgICBzb25nTmFtZSA9IEhUTUwuY3JlYXRlRWxlbWVudCgnaDInLCAnc29uZ3NfX2l0ZW0tc29uZycsIHt9LCBzb25nLnNvbmcpLFxuICAgICAgICAgICAgICAgICAgICBzb25nQmFuZCA9IEhUTUwuY3JlYXRlRWxlbWVudCgnaDMnLCAnc29uZ3NfX2l0ZW0tYmFuZCcsIHt9LCBzb25nLmJhbmQpLFxuICAgICAgICAgICAgICAgICAgICBzb25nWWVhciA9IEhUTUwuY3JlYXRlRWxlbWVudCgnc3BhbicsICdzb25nc19faXRlbS15ZWFyJywge30sICdZZWFyIDogJyksXG4gICAgICAgICAgICAgICAgICAgIHNvbmdZZWFyQmFuZCA9IEhUTUwuY3JlYXRlRWxlbWVudCgnc3BhbicsICcnLCB7fSwgc29uZy55ZWFyKSxcbiAgICAgICAgICAgICAgICAgICAgc29uZ1N0eWxlID0gSFRNTC5jcmVhdGVFbGVtZW50KCdzcGFuJywgJ3NvbmdzX19pdGVtLXN0eWxlJywge30sICdTdHlsZSA6ICcpLFxuICAgICAgICAgICAgICAgICAgICBzb25nU3R5bGVCYW5kID0gSFRNTC5jcmVhdGVFbGVtZW50KCdzcGFuJywgJycsIHt9LCBzb25nLnN0eWxlLmpvaW4oJywnKSksXG4gICAgICAgICAgICAgICAgICAgIHNvbmdDb3VudHJ5ID0gSFRNTC5jcmVhdGVFbGVtZW50KCdzcGFuJywgJ3NvbmdzX19pdGVtLWNvdW50cnknLCB7fSwgJ0NvdW50cnkgOiAnKSxcbiAgICAgICAgICAgICAgICAgICAgc29uZ0NvdW50cnlCYW5kID0gSFRNTC5jcmVhdGVFbGVtZW50KCdzcGFuJywgJycsIHt9LCBzb25nLmNvdW50cnkpLFxuICAgICAgICAgICAgICAgICAgICBzb25nQWRkID0gSFRNTC5jcmVhdGVFbGVtZW50KCdidXR0b24nLCAnc29uZ3NfX2l0ZW0tYWRkJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2J1dHRvbidcbiAgICAgICAgICAgICAgICAgICAgfSwgJ0FkZCcpO1xuXG4gICAgICAgICAgICAgICAgc29uZ1llYXIuYXBwZW5kKHNvbmdZZWFyQmFuZCk7XG4gICAgICAgICAgICAgICAgc29uZ1N0eWxlLmFwcGVuZChzb25nU3R5bGVCYW5kKTtcbiAgICAgICAgICAgICAgICBzb25nQ291bnRyeS5hcHBlbmQoc29uZ0NvdW50cnlCYW5kKTtcbiAgICAgICAgICAgICAgICBzb25nRGF0YUNvbnRhaW5lci5hcHBlbmQoc29uZ05hbWUsIHNvbmdCYW5kLCBzb25nWWVhciwgc29uZ1N0eWxlLCBzb25nQ291bnRyeSwgc29uZ0FkZClcbiAgICAgICAgICAgICAgICBsaS5hcHBlbmQoaW1nLCBmYXZvcml0ZSwgc29uZ0RhdGFDb250YWluZXIpO1xuICAgICAgICAgICAgICAgIGZhdm9yaXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmNoYW5nZURhdGEoc29uZy5pZCwgJ2Zhdm9yaXRlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGkuZGF0YXNldC5mYXZvcml0ZSA9IHJlc3VsdC50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZS5kYXRhc2V0LmZhdm9yaXRlID0gcmVzdWx0LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc29uZ0FkZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5jaGFuZ2VEYXRhKHNvbmcuaWQsICdhZGRlZCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxpLmRhdGFzZXQuYWRkZWQgPSByZXN1bHQudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGUuZGF0YXNldC5hZGRlZCA9IHJlc3VsdC50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICB0aGlzLnBhcmVudC5hcHBlbmQobGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hhbmdlRGF0YShpZCwgbmFtZSkge1xuICAgICAgICBjb25zdCBhbGxTb25ncyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NvbmdzJykpLFxuICAgICAgICAgICAgaW5kZXggPSBhbGxTb25ncy5maW5kSW5kZXgoc29uZyA9PiBzb25nLmlkID09PSBpZCk7XG5cbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBuYW1lICE9PSAnYWRkZWQnID8gIWFsbFNvbmdzW2luZGV4XVtuYW1lXSA6IHRydWU7XG5cbiAgICAgICAgICAgIGFsbFNvbmdzW2luZGV4XVtuYW1lXSA9IHZhbHVlO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3NvbmdzJywgSlNPTi5zdHJpbmdpZnkoYWxsU29uZ3MpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCBIVE1MIGZyb20gXCIuLi9hZGRpdGlvbmFsL2h0bWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFnaW5hdGlvbiB7XG4gICAgY29uc3RydWN0b3IobGlzdFNvbmdzKSB7XG4gICAgICAgIHRoaXMucGFnaW5hdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdpbmF0aW9uJyk7XG5cbiAgICAgICAgaWYgKHRoaXMucGFnaW5hdGlvbikge1xuICAgICAgICAgICAgdGhpcy5saXN0U29uZ3MgPSBsaXN0U29uZ3M7XG4gICAgICAgICAgICB0aGlzLnBlclBhZ2UgPSBwYXJzZUludChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGVyUGFnZScpKTtcbiAgICAgICAgICAgIHRoaXMuYWxsU29uZ3NMZW5ndGggPSBwYXJzZUludChKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzb25ncycpKS5sZW5ndGgpO1xuICAgICAgICAgICAgdGhpcy5wYWdlQ291bnQgPSBNYXRoLmNlaWwodGhpcy5hbGxTb25nc0xlbmd0aCAvIHRoaXMucGVyUGFnZSk7XG4gICAgICAgICAgICB0aGlzLnVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gcGFyc2VJbnQodGhpcy51cmxQYXJhbXMuZ2V0KCdwYWdlJykpIHx8IDE7XG5cbiAgICAgICAgICAgIHRoaXMubGlzdFNvbmdzLnJlbmRlclNvbmdzKHRoaXMuZ2V0U3RhcnRMaXN0U29uZ3MoKSk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclBhZ2luYXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFBhZ2VDb3VudChwYWdlQ291bnQpIHtcbiAgICAgICAgdGhpcy5wYWdlQ291bnQgPSBwYWdlQ291bnQ7XG4gICAgfVxuXG4gICAgcmVuZGVyUGFnaW5hdGlvbigpIHtcbiAgICAgICAgY29uc3QgYXJyYXlQYWdpbmF0aW9uID0gdGhpcy5nZXRQYWdpbmF0aW9uKHRoaXMuY3VycmVudFBhZ2UsIHRoaXMucGFnZUNvdW50KTtcblxuICAgICAgICB0aGlzLnBhZ2luYXRpb24ucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgICAgIGFycmF5UGFnaW5hdGlvbi5mb3JFYWNoKHBhZ2UgPT4ge1xuICAgICAgICAgICAgbGV0IHBhZ2VCdXR0b24gPSBIVE1MLmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicsICdwYWdpbmF0aW9uX19wYWdlJywge1xuICAgICAgICAgICAgICAgICdkYXRhLWluZGV4JzogcGFnZSxcbiAgICAgICAgICAgICAgICAnYXJpYS1sYWJlbCc6IGBQYWdlICR7cGFnZX1gXG4gICAgICAgICAgICB9LCBwYWdlKTtcblxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9PT0gcGFnZSA/IHBhZ2VCdXR0b24uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKSA6ICcnO1xuXG4gICAgICAgICAgICBwYWdlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwYWdlICE9PSAnLi4uJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdCgnPycpWzBdICsgKHBhZ2UgIT09IDEgPyBgP3BhZ2U9JHtwYWdlfWAgOiAnJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFnaW5hdGlvbi5yZXBsYWNlQ2hpbGRyZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IHBhZ2U7XG4gICAgICAgICAgICAgICAgICAgIGhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIFwiXCIsIHVybCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0U29uZ3MucmVuZGVyU29uZ3ModGhpcy5nZXRTdGFydExpc3RTb25ncygpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJQYWdpbmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMucGFnaW5hdGlvbi5hcHBlbmQocGFnZUJ1dHRvbik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubGlzdFNvbmdzLnJlbmRlclNvbmdzKHRoaXMuZ2V0U3RhcnRMaXN0U29uZ3MoKSk7XG4gICAgfVxuXG4gICAgZ2V0UGFnaW5hdGlvbihjdXJyZW50UGFnZSwgcGFnZUNvdW50KSB7XG4gICAgICAgIGxldCBkZWx0YTtcblxuICAgICAgICBpZiAocGFnZUNvdW50IDw9IDcpIHtcbiAgICAgICAgICAgIGRlbHRhID0gNztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbHRhID0gY3VycmVudFBhZ2UgPiA0ICYmIGN1cnJlbnRQYWdlIDwgcGFnZUNvdW50IC0gMyA/IDIgOiA0O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmFuZ2UgPSB7XG4gICAgICAgICAgICBzdGFydDogTWF0aC5yb3VuZChjdXJyZW50UGFnZSAtIGRlbHRhIC8gMiksXG4gICAgICAgICAgICBlbmQ6IE1hdGgucm91bmQoY3VycmVudFBhZ2UgKyBkZWx0YSAvIDIpXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHJhbmdlLnN0YXJ0IC0gMSA9PT0gMSB8fCByYW5nZS5lbmQgKyAxID09PSBwYWdlQ291bnQpIHtcbiAgICAgICAgICAgIHJhbmdlLnN0YXJ0ICs9IDE7XG4gICAgICAgICAgICByYW5nZS5lbmQgKz0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwYWdlcyA9IGN1cnJlbnRQYWdlID4gZGVsdGEgP1xuICAgICAgICAgICAgdGhpcy5nZXRSYW5nZShNYXRoLm1pbihyYW5nZS5zdGFydCwgcGFnZUNvdW50IC0gZGVsdGEpLCBNYXRoLm1pbihyYW5nZS5lbmQsIHBhZ2VDb3VudCkpIDpcbiAgICAgICAgICAgIHRoaXMuZ2V0UmFuZ2UoMSwgTWF0aC5taW4ocGFnZUNvdW50LCBkZWx0YSArIDEpKTtcblxuICAgICAgICBjb25zdCB3aXRoRG90cyA9ICh2YWx1ZSwgcGFpcikgPT4gKHBhZ2VzLmxlbmd0aCArIDEgIT09IHBhZ2VDb3VudCA/IHBhaXIgOiBbdmFsdWVdKTtcblxuICAgICAgICBpZiAocGFnZXNbMF0gIT09IDEpIHtcbiAgICAgICAgICAgIHBhZ2VzID0gd2l0aERvdHMoMSwgWzEsICcuLi4nXSkuY29uY2F0KHBhZ2VzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYWdlc1twYWdlcy5sZW5ndGggLSAxXSA8IHBhZ2VDb3VudCkge1xuICAgICAgICAgICAgcGFnZXMgPSBwYWdlcy5jb25jYXQod2l0aERvdHMocGFnZUNvdW50LCBbJy4uLicsIHBhZ2VDb3VudF0pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYWdlcztcbiAgICB9XG5cbiAgICBnZXRSYW5nZShzdGFydCwgZW5kKSB7XG4gICAgICAgIHJldHVybiBBcnJheShlbmQgLSBzdGFydCArIDEpLmZpbGwoKS5tYXAoKHYsIGkpID0+IGkgKyBzdGFydCk7XG4gICAgfVxuXG4gICAgZ2V0U3RhcnRMaXN0U29uZ3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBlclBhZ2UgKiAodGhpcy5jdXJyZW50UGFnZSAtIDEpO1xuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTZWFyY2gge1xuICAgIGNvbnN0cnVjdG9yKHBhZ2luYXRpb24sIGxpc3RTb25ncykge1xuICAgICAgICB0aGlzLnNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gnKTtcbiAgICAgICAgdGhpcy5hbGxTb25ncyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NvbmdzJykpO1xuICAgICAgICB0aGlzLnBlclBhZ2UgPSBwYXJzZUludChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGVyUGFnZScpKTtcbiAgICAgICAgdGhpcy5wYWdpbmF0aW9uID0gcGFnaW5hdGlvbjtcbiAgICAgICAgdGhpcy5saXN0U29uZ3MgPSBsaXN0U29uZ3M7XG4gICAgICAgIHRoaXMuc2VhcmNoQXJ0aXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaF9fYXJ0aXN0Jyk7XG5cbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoKSB7XG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgICAgIHRoaXMub25JbnB1dEFydGlzdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25JbnB1dEFydGlzdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoQXJ0aXN0KSB7XG4gICAgICAgICAgICBjb25zdCB7bGVuZ3RofSA9IHRoaXMuc2VhcmNoQXJ0aXN0LmRhdGFzZXQ7XG5cbiAgICAgICAgICAgIHRoaXMuc2VhcmNoQXJ0aXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlYXJjaEFydGlzdC52YWx1ZS5sZW5ndGggPiBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hBcnRpc3QubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC5hZGQoJ3Nob3duJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hBcnRpc3QubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3duJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLnNlYXJjaC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBsZXQgZGF0YSA9IFtdO1xuICAgICAgICAgICAgY29uc3QgYXJ0aXN0ID0gdGhpcy5zZWFyY2gucXVlcnlTZWxlY3RvcignI2FydGlzdCcpLFxuICAgICAgICAgICAgICAgIGdlbnJlID0gdGhpcy5zZWFyY2gucXVlcnlTZWxlY3RvcignI2dlbnJlIC5zZWFyY2hfX3NlbGVjdC1pdGVtLXNlbGVjdGVkJyksXG4gICAgICAgICAgICAgICAgZGVjYWRlID0gdGhpcy5zZWFyY2gucXVlcnlTZWxlY3RvcignI2RlY2FkZSAuc2VhcmNoX19zZWxlY3QtaXRlbS1zZWxlY3RlZCcpLFxuICAgICAgICAgICAgICAgIGNvdW50cnkgPSB0aGlzLnNlYXJjaC5xdWVyeVNlbGVjdG9yKCcjY291bnRyeSAuc2VhcmNoX19zZWxlY3QtaXRlbS1zZWxlY3RlZCcpLFxuICAgICAgICAgICAgICAgIGZhdm9yaXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fY29udGFpbmVyLWl0ZW0uZmF2b3JpdGUuc2VsZWN0ZWQnKSxcbiAgICAgICAgICAgICAgICBzYXZlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2NvbnRhaW5lci1pdGVtLnNhdmVkLnNlbGVjdGVkJyk7XG5cbiAgICAgICAgICAgIGFydGlzdC52YWx1ZSA/IGRhdGEucHVzaChbJ2JhbmQnLCBhcnRpc3QudmFsdWVdKSA6ICcnO1xuICAgICAgICAgICAgZ2VucmUuZGF0YXNldC52YWx1ZSA/IGRhdGEucHVzaChbJ3N0eWxlJywgZ2VucmUuZGF0YXNldC52YWx1ZV0pIDogJyc7XG4gICAgICAgICAgICBkZWNhZGUuZGF0YXNldC52YWx1ZSA/IGRhdGEucHVzaChbJ3llYXInLCBkZWNhZGUuZGF0YXNldC52YWx1ZV0pIDogJyc7XG4gICAgICAgICAgICBjb3VudHJ5LmRhdGFzZXQudmFsdWUgPyBkYXRhLnB1c2goWydjb3VudHJ5JywgY291bnRyeS5kYXRhc2V0LnZhbHVlXSkgOiAnJztcbiAgICAgICAgICAgIGZhdm9yaXRlID8gZGF0YS5wdXNoKFsnZmF2b3JpdGUnLCAndHJ1ZSddKSA6ICcnO1xuICAgICAgICAgICAgc2F2ZWQgPyBkYXRhLnB1c2goWydhZGRlZCcsICd0cnVlJ10pIDogJyc7XG5cbiAgICAgICAgICAgIHRoaXMuc2VhcmNoQnlEYXRhKGRhdGEpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZWFyY2hCeURhdGEoZGF0YSkge1xuICAgICAgICBsZXQgbWF0Y2hlZCA9IFtdO1xuXG4gICAgICAgIHRoaXMuYWxsU29uZ3MuZm9yRWFjaChzb25nID0+IHtcbiAgICAgICAgICAgIGxldCBjb3VudCA9IDA7XG5cbiAgICAgICAgICAgIGRhdGEuZm9yRWFjaChzZWFyY2hpbmcgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBzZWFyY2ggPSBzb25nW3NlYXJjaGluZ1swXV0udG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWFyY2ggPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoID0gc2VhcmNoLmpvaW4oJywnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFpc05hTihOdW1iZXIoc2VhcmNoKSkgJiYgc2VhcmNoaW5nWzBdID09PSAneWVhcicpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFycmF5WWVhcnMgPSBzZWFyY2hpbmdbMV0uc3BsaXQoJy0nKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoK3NlYXJjaCA+PSArYXJyYXlZZWFyc1swXSAmJiArc2VhcmNoIDw9ICthcnJheVllYXJzWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY291bnQgKz0gc2VhcmNoLmluZGV4T2Yoc2VhcmNoaW5nWzFdLnRvTG93ZXJDYXNlKCkpICE9PSAtMSA/IDEgOiAwO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChjb3VudCA9PT0gZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBtYXRjaGVkLnB1c2goc29uZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubGlzdFNvbmdzLnNldEFsbFNvbmdzKG1hdGNoZWQpO1xuICAgICAgICB0aGlzLnBhZ2luYXRpb24uc2V0UGFnZUNvdW50KE1hdGguY2VpbChtYXRjaGVkLmxlbmd0aCAvIHRoaXMucGVyUGFnZSkgfHwgMSk7XG4gICAgICAgIHRoaXMucGFnaW5hdGlvbi5yZW5kZXJQYWdpbmF0aW9uKCk7XG5cbiAgICAgICAgbGV0IHBhZ2luYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnaW5hdGlvbl9fcGFnZScpO1xuXG4gICAgICAgIGlmIChwYWdpbmF0aW9uKSB7XG4gICAgICAgICAgICBwYWdpbmF0aW9uLmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi9hZGRpdGlvbmFsL2dldC1kYXRhLXNvbmdzJztcbmltcG9ydCBDdXN0b21TZWxlY3RvcnMgZnJvbSBcIi4vY29tcG9uZW50cy9jdXN0b20tc2VsZWN0b3JzXCI7XG5pbXBvcnQgUGFnaW5hdGlvbiBmcm9tIFwiLi9jb21wb25lbnRzL3BhZ2luYXRpb25cIjtcbmltcG9ydCBTZWFyY2ggZnJvbSBcIi4vY29tcG9uZW50cy9zZWFyY2hcIjtcbmltcG9ydCBMaXN0U29uZ3MgZnJvbSBcIi4vY29tcG9uZW50cy9saXN0LXNvbmdzXCI7XG5pbXBvcnQgSGVhZGVyIGZyb20gXCIuL2NvbXBvbmVudHMvaGVhZGVyXCI7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgICBjb25zdCBsaXN0U29uZ3MgPSBuZXcgTGlzdFNvbmdzKCksXG4gICAgICAgIHBhZ2luYXRpb24gPSBuZXcgUGFnaW5hdGlvbihsaXN0U29uZ3MpO1xuXG4gICAgbmV3IEN1c3RvbVNlbGVjdG9ycyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoJykpO1xuICAgIG5ldyBTZWFyY2gocGFnaW5hdGlvbiwgbGlzdFNvbmdzKTtcbiAgICBuZXcgSGVhZGVyKCk7XG5cbiAgICBmdW5jdGlvbiBjaGFuZ2VTaXplSW1hZ2VzKCkge1xuICAgICAgICBsZXQgbGlzdEltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zb25nc19faXRlbS1pbWcnKTtcblxuICAgICAgICBpZiAobGlzdEltYWdlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcmVudFNpemUgPSBsaXN0SW1hZ2VzWzBdLnBhcmVudEVsZW1lbnQub2Zmc2V0V2lkdGgsXG4gICAgICAgICAgICAgICAgbmV3U2l6ZSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCA8IDM5MCA/IHBhcmVudFNpemUgOiAxNjk7XG5cbiAgICAgICAgICAgIGxpc3RJbWFnZXMuZm9yRWFjaChpbWFnZSA9PiB7XG4gICAgICAgICAgICAgICAgaW1hZ2Uuc2V0QXR0cmlidXRlKCd3aWR0aCcsIGAke25ld1NpemV9cHhgKTtcbiAgICAgICAgICAgICAgICBpbWFnZS5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGAke25ld1NpemV9cHhgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hhbmdlU2l6ZUltYWdlcygpO1xuICAgIHdpbmRvdy5vbnJlc2l6ZSA9IGNoYW5nZVNpemVJbWFnZXM7XG59KTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=