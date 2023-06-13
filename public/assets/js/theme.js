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
      this.initSelectedSize();
      this.initItems();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsSUFBSSxRQUFRLENBQUM7QUFDYixNQUFNLFFBQVEsQ0FBQyxTQUFTLG1CQUFtQixhQUFhLFNBQVMsR0FDN0QsU0FBUyxDQUFDLFFBQVEsUUFBUSxTQUFTLFdBQVcsT0FBTyxLQUFLLEdBQzFELFlBQVksQ0FBQyxPQUFPLE1BQU0sTUFBTSxNQUFNLE9BQU8sSUFBSTtBQUVyRCxTQUFTLGVBQWUsT0FBTztBQUMzQixTQUFPLE1BQU0sS0FBSyxNQUFNLEtBQUssT0FBTyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBQ3pEO0FBRUEsU0FBUyxJQUFJLEdBQUcsS0FBSyxJQUFJLEtBQUs7QUFDMUIsUUFBTSxLQUFLO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixVQUFVO0FBQUEsSUFDVixLQUFLLDZCQUE2QjtBQUFBLElBQ2xDLE1BQU07QUFBQSxJQUNOLE1BQU0sZUFBZSxLQUFLO0FBQUEsSUFDMUIsTUFBTSxLQUFLLE1BQU0sS0FBSyxPQUFPLEtBQUssT0FBTyxLQUFLLElBQUk7QUFBQSxJQUNsRCxPQUFPLENBQUMsZUFBZSxNQUFNLENBQUM7QUFBQSxJQUM5QixTQUFTLGVBQWUsU0FBUztBQUFBLElBQ2pDLE9BQU87QUFBQSxFQUNYLENBQUM7QUFDTDtBQUVBLElBQUksQ0FBQyxhQUFhLFFBQVEsT0FBTyxHQUFHO0FBQ2hDLGVBQWEsUUFBUSxTQUFTLEtBQUssVUFBVSxLQUFLLENBQUM7QUFDbkQsZUFBYSxRQUFRLFdBQVcsR0FBRztBQUN2Qzs7Ozs7Ozs7Ozs7Ozs7OztBQzFCZSxNQUFNLEtBQUs7QUFBQSxFQUN0QixPQUFPLGNBQWMsYUFBYSxZQUFZLElBQUksYUFBYSxNQUFNLE9BQU8sSUFBSTtBQUM1RSxRQUFJLENBQUMsWUFBWSxRQUFRO0FBQ3JCLGFBQU87QUFBQSxJQUNYO0FBRUEsUUFBSSxVQUFVLFNBQVMsY0FBYyxXQUFXO0FBRWhELFFBQUksWUFBWTtBQUNaLGVBQVMsT0FBTyxZQUFZO0FBQ3hCLGdCQUFRLGFBQWEsS0FBSyxXQUFXLEdBQUcsQ0FBQztBQUFBLE1BQzdDO0FBQUEsSUFDSjtBQUVBLFFBQUksV0FBVztBQUNYLGNBQVEsWUFBWTtBQUFBLElBQ3hCO0FBRUEsUUFBSSxNQUFNO0FBQ04sY0FBUSxZQUFZLEtBQUssV0FBVyxJQUFJLENBQUM7QUFBQSxJQUM3QztBQUVBLFdBQU87QUFBQSxFQUNYO0FBQUEsRUFFQSxPQUFPLFdBQVcsT0FBTyxNQUFNO0FBQzNCLFdBQU8sT0FBTyxTQUFTLGVBQWUsSUFBSSxJQUFJO0FBQUEsRUFDbEQ7QUFDSjs7Ozs7Ozs7Ozs7Ozs7OztBQzVCZSxNQUFNLGdCQUFnQjtBQUFBLEVBQ2pDLFlBQVksUUFBUTtBQUNoQixRQUFJLFFBQVE7QUFDUixXQUFLLFNBQVM7QUFDZCxXQUFLLGVBQWUsS0FBSyxPQUFPLGlCQUFpQiwrQkFBK0I7QUFDaEYsV0FBSyxRQUFRLEtBQUssT0FBTyxpQkFBaUIsc0JBQXNCO0FBRWhFLFdBQUssaUJBQWlCO0FBQ3RCLFdBQUssVUFBVTtBQUFBLElBQ25CO0FBQUEsRUFDSjtBQUFBLEVBRUEsWUFBWTtBQUNSLFFBQUksS0FBSyxNQUFNLFFBQVE7QUFDbkIsZUFBUyxRQUFRLEtBQUssT0FBTztBQUN6QixhQUFLLGlCQUFpQixTQUFTLFdBQVM7QUFDcEMsZ0JBQU0sU0FBUyxLQUFLLGVBQ2hCLFdBQVcsT0FBTyxjQUFjLCtCQUErQjtBQUVuRSxtQkFBUyxTQUFTLE9BQU8sVUFBVTtBQUMvQixrQkFBTSxVQUFVLE9BQU8sVUFBVTtBQUFBLFVBQ3JDO0FBRUEsZUFBSyxVQUFVLElBQUksVUFBVTtBQUM3QixtQkFBUyxjQUFjLEtBQUs7QUFDNUIsbUJBQVMsUUFBUSxRQUFRLEtBQUssUUFBUTtBQUN0QyxtQkFBUyxNQUFNO0FBQUEsUUFDbkIsQ0FBQztBQUFBLE1BQ0w7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUFBLEVBRUEsbUJBQW1CO0FBQ2YsUUFBSSxLQUFLLGFBQWEsUUFBUTtBQUMxQixlQUFTLFNBQVMsT0FBTyxLQUFLLEtBQUssWUFBWSxHQUFHO0FBQzlDLGNBQU0sU0FBUyxLQUFLLGFBQWEsS0FBSyxFQUFFLGVBQ3BDLFdBQVcsT0FBTyxjQUFjLGFBQWE7QUFFakQsYUFBSyxhQUFhLEtBQUssRUFBRSxjQUFjLFNBQVM7QUFDaEQsYUFBSyxhQUFhLEtBQUssRUFBRSxRQUFRLFFBQVEsU0FBUyxRQUFRO0FBQzFELGFBQUssYUFBYSxLQUFLLEVBQUUsaUJBQWlCLFNBQVMsTUFBTTtBQUNyRCxjQUFJLFFBQVE7QUFDUixnQkFBSSxPQUFPLFVBQVUsU0FBUyxRQUFRLEdBQUc7QUFDckMscUJBQU8sVUFBVSxPQUFPLFFBQVE7QUFDaEMscUJBQU8sTUFBTSxTQUFTLEtBQUssYUFBYSxLQUFLLEVBQUUsZUFBZTtBQUFBLFlBQ2xFLE9BQU87QUFDSCxxQkFBTyxVQUFVLElBQUksUUFBUTtBQUM3QixxQkFBTyxNQUFNLFNBQVMsS0FBSyxhQUFhLEtBQUssRUFBRSxlQUFlLE9BQU8sU0FBUyxTQUFTO0FBQUEsWUFDM0Y7QUFBQSxVQUNKO0FBQUEsUUFDSixDQUFDO0FBQUEsTUFDTDtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0RGUsTUFBTSxPQUFPO0FBQUEsRUFDeEIsY0FBYztBQUNWLFNBQUssT0FBTyxTQUFTLGNBQWMseUJBQXlCO0FBQzVELFNBQUssV0FBVyxTQUFTLGNBQWMsa0NBQWtDO0FBQ3pFLFNBQUssUUFBUSxTQUFTLGNBQWMsK0JBQStCO0FBQ25FLFNBQUssZUFBZSxTQUFTLGNBQWMsaUJBQWlCO0FBRTVELFNBQUssWUFBWTtBQUNqQixTQUFLLGdCQUFnQjtBQUNyQixTQUFLLGFBQWE7QUFBQSxFQUN0QjtBQUFBLEVBRUEsY0FBYztBQUNWLFFBQUksS0FBSyxNQUFNO0FBQ1gsV0FBSyxLQUFLLGlCQUFpQixTQUFTLE1BQU07QUFDdEMsZ0JBQVEsS0FBSztBQUFBLE1BQ2pCLENBQUM7QUFBQSxJQUNMO0FBQUEsRUFDSjtBQUFBLEVBRUEsa0JBQWtCO0FBQ2QsUUFBSSxLQUFLLFVBQVU7QUFDZixXQUFLLFNBQVMsaUJBQWlCLFNBQVMsTUFBTTtBQUMxQyxZQUFJLEtBQUssU0FBUyxVQUFVLFNBQVMsVUFBVSxHQUFHO0FBQzlDLGVBQUssU0FBUyxVQUFVLE9BQU8sVUFBVTtBQUFBLFFBQzdDLE9BQU87QUFDSCxlQUFLLFNBQVMsVUFBVSxJQUFJLFVBQVU7QUFBQSxRQUMxQztBQUVBLGFBQUssYUFBYSxNQUFNO0FBQUEsTUFDNUIsQ0FBQztBQUFBLElBQ0w7QUFBQSxFQUNKO0FBQUEsRUFFQSxlQUFlO0FBQ1gsUUFBSSxLQUFLLE9BQU87QUFDWixXQUFLLE1BQU0saUJBQWlCLFNBQVMsTUFBTTtBQUN2QyxZQUFJLEtBQUssTUFBTSxVQUFVLFNBQVMsVUFBVSxHQUFHO0FBQzNDLGVBQUssTUFBTSxVQUFVLE9BQU8sVUFBVTtBQUFBLFFBQzFDLE9BQU87QUFDSCxlQUFLLE1BQU0sVUFBVSxJQUFJLFVBQVU7QUFBQSxRQUN2QztBQUVBLGFBQUssYUFBYSxNQUFNO0FBQUEsTUFDNUIsQ0FBQztBQUFBLElBQ0w7QUFBQSxFQUNKO0FBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0NzQztBQUV2QixNQUFNLFVBQVU7QUFBQSxFQUMzQixjQUFjO0FBQ1YsU0FBSyxVQUFVLFNBQVMsYUFBYSxRQUFRLFNBQVMsQ0FBQztBQUN2RCxTQUFLLFdBQVcsS0FBSyxNQUFNLGFBQWEsUUFBUSxPQUFPLENBQUM7QUFDeEQsU0FBSyxTQUFTLFNBQVMsY0FBYyxRQUFRO0FBQUEsRUFDakQ7QUFBQSxFQUVBLFlBQVksVUFBVTtBQUNsQixTQUFLLFdBQVc7QUFBQSxFQUNwQjtBQUFBLEVBRUEsWUFBWSxPQUFPO0FBQ2YsVUFBTSxnQkFBZ0IsS0FBSyxTQUFTLE1BQU0sT0FBTyxRQUFRLEtBQUssT0FBTztBQUVyRSxRQUFJLEtBQUssUUFBUTtBQUNiLFdBQUssT0FBTyxnQkFBZ0I7QUFFNUIsZUFBUyxRQUFRLGVBQWU7QUFDNUIsWUFBSSxLQUFLLHdEQUFJLENBQUMsY0FBYyxNQUFNLGVBQWU7QUFBQSxVQUN6QyxXQUFXLEtBQUs7QUFBQSxVQUNoQixpQkFBaUIsS0FBSztBQUFBLFVBQ3RCLGNBQWMsS0FBSztBQUFBLFVBQ25CLGVBQWUsS0FBSztBQUFBLFVBQ3BCLGNBQWMsS0FBSyxNQUFNLEtBQUssR0FBRztBQUFBLFVBQ2pDLGVBQWUsS0FBSztBQUFBLFVBQ3BCLGdCQUFnQixLQUFLO0FBQUEsUUFDekIsQ0FBQyxHQUNELE1BQU0sd0RBQUksQ0FBQyxjQUFjLE9BQU8sbUJBQW1CO0FBQUEsVUFDL0MsS0FBSyxLQUFLO0FBQUEsVUFDVixLQUFLLEtBQUs7QUFBQSxVQUNWLE9BQU87QUFBQSxVQUNQLFFBQVE7QUFBQSxRQUNaLENBQUMsR0FDRCxXQUFXLHdEQUFJLENBQUMsY0FBYyxRQUFRLHdCQUF3QjtBQUFBLFVBQzFELGlCQUFpQixLQUFLO0FBQUEsUUFDMUIsQ0FBQyxHQUNELG9CQUFvQix3REFBSSxDQUFDLGNBQWMsT0FBTyx1QkFBdUIsR0FDckUsV0FBVyx3REFBSSxDQUFDLGNBQWMsTUFBTSxvQkFBb0IsQ0FBQyxHQUFHLEtBQUssSUFBSSxHQUNyRSxXQUFXLHdEQUFJLENBQUMsY0FBYyxNQUFNLG9CQUFvQixDQUFDLEdBQUcsS0FBSyxJQUFJLEdBQ3JFLFdBQVcsd0RBQUksQ0FBQyxjQUFjLFFBQVEsb0JBQW9CLENBQUMsR0FBRyxTQUFTLEdBQ3ZFLGVBQWUsd0RBQUksQ0FBQyxjQUFjLFFBQVEsSUFBSSxDQUFDLEdBQUcsS0FBSyxJQUFJLEdBQzNELFlBQVksd0RBQUksQ0FBQyxjQUFjLFFBQVEscUJBQXFCLENBQUMsR0FBRyxVQUFVLEdBQzFFLGdCQUFnQix3REFBSSxDQUFDLGNBQWMsUUFBUSxJQUFJLENBQUMsR0FBRyxLQUFLLE1BQU0sS0FBSyxHQUFHLENBQUMsR0FDdkUsY0FBYyx3REFBSSxDQUFDLGNBQWMsUUFBUSx1QkFBdUIsQ0FBQyxHQUFHLFlBQVksR0FDaEYsa0JBQWtCLHdEQUFJLENBQUMsY0FBYyxRQUFRLElBQUksQ0FBQyxHQUFHLEtBQUssT0FBTyxHQUNqRSxVQUFVLHdEQUFJLENBQUMsY0FBYyxVQUFVLG1CQUFtQjtBQUFBLFVBQ3RELE1BQU07QUFBQSxRQUNWLEdBQUcsS0FBSztBQUVaLGlCQUFTLE9BQU8sWUFBWTtBQUM1QixrQkFBVSxPQUFPLGFBQWE7QUFDOUIsb0JBQVksT0FBTyxlQUFlO0FBQ2xDLDBCQUFrQixPQUFPLFVBQVUsVUFBVSxVQUFVLFdBQVcsYUFBYSxPQUFPO0FBQ3RGLFdBQUcsT0FBTyxLQUFLLFVBQVUsaUJBQWlCO0FBQzFDLGlCQUFTLGlCQUFpQixTQUFTLE1BQU07QUFDckMsZ0JBQU0sU0FBUyxLQUFLLFdBQVcsS0FBSyxJQUFJLFVBQVU7QUFFbEQsYUFBRyxRQUFRLFdBQVcsT0FBTyxTQUFTO0FBQ3RDLG1CQUFTLFFBQVEsV0FBVyxPQUFPLFNBQVM7QUFBQSxRQUNoRCxDQUFDO0FBQ0QsZ0JBQVEsaUJBQWlCLFNBQVMsTUFBTTtBQUNwQyxnQkFBTSxTQUFTLEtBQUssV0FBVyxLQUFLLElBQUksT0FBTztBQUUvQyxhQUFHLFFBQVEsUUFBUSxPQUFPLFNBQVM7QUFDbkMsbUJBQVMsUUFBUSxRQUFRLE9BQU8sU0FBUztBQUFBLFFBQzdDLENBQUM7QUFFRixhQUFLLE9BQU8sT0FBTyxFQUFFO0FBQUEsTUFDeEI7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUFBLEVBRUEsV0FBVyxJQUFJLE1BQU07QUFDakIsVUFBTSxXQUFXLEtBQUssTUFBTSxhQUFhLFFBQVEsT0FBTyxDQUFDLEdBQ3JELFFBQVEsU0FBUyxVQUFVLFVBQVEsS0FBSyxPQUFPLEVBQUU7QUFFckQsUUFBSSxVQUFVLElBQUk7QUFDZCxZQUFNLFFBQVEsU0FBUyxVQUFVLENBQUMsU0FBUyxLQUFLLEVBQUUsSUFBSSxJQUFJO0FBRTFELGVBQVMsS0FBSyxFQUFFLElBQUksSUFBSTtBQUN4QixtQkFBYSxRQUFRLFNBQVMsS0FBSyxVQUFVLFFBQVEsQ0FBQztBQUV0RCxhQUFPO0FBQUEsSUFDWDtBQUFBLEVBQ0o7QUFDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2RnNDO0FBRXZCLE1BQU0sV0FBVztBQUFBLEVBQzVCLFlBQVksV0FBVztBQUNuQixTQUFLLGFBQWEsU0FBUyxjQUFjLGFBQWE7QUFFdEQsUUFBSSxLQUFLLFlBQVk7QUFDakIsV0FBSyxZQUFZO0FBQ2pCLFdBQUssVUFBVSxTQUFTLGFBQWEsUUFBUSxTQUFTLENBQUM7QUFDdkQsV0FBSyxpQkFBaUIsU0FBUyxLQUFLLE1BQU0sYUFBYSxRQUFRLE9BQU8sQ0FBQyxFQUFFLE1BQU07QUFDL0UsV0FBSyxZQUFZLEtBQUssS0FBSyxLQUFLLGlCQUFpQixLQUFLLE9BQU87QUFDN0QsV0FBSyxZQUFZLElBQUksZ0JBQWdCLE9BQU8sU0FBUyxNQUFNO0FBQzNELFdBQUssY0FBYyxTQUFTLEtBQUssVUFBVSxJQUFJLE1BQU0sQ0FBQyxLQUFLO0FBRTNELFdBQUssVUFBVSxZQUFZLEtBQUssa0JBQWtCLENBQUM7QUFDbkQsV0FBSyxpQkFBaUI7QUFBQSxJQUMxQjtBQUFBLEVBQ0o7QUFBQSxFQUVBLGFBQWEsV0FBVztBQUNwQixTQUFLLFlBQVk7QUFBQSxFQUNyQjtBQUFBLEVBRUEsbUJBQW1CO0FBQ2YsVUFBTSxrQkFBa0IsS0FBSyxjQUFjLEtBQUssYUFBYSxLQUFLLFNBQVM7QUFFM0UsU0FBSyxXQUFXLGdCQUFnQjtBQUNoQyxvQkFBZ0IsUUFBUSxVQUFRO0FBQzVCLFVBQUksYUFBYSx3REFBSSxDQUFDLGNBQWMsVUFBVSxvQkFBb0I7QUFBQSxRQUM5RCxjQUFjO0FBQUEsUUFDZCxjQUFjLFFBQVE7QUFBQSxNQUMxQixHQUFHLElBQUk7QUFFUCxXQUFLLGdCQUFnQixPQUFPLFdBQVcsVUFBVSxJQUFJLFVBQVUsSUFBSTtBQUVuRSxpQkFBVyxpQkFBaUIsU0FBUyxNQUFNO0FBQ3ZDLFlBQUksU0FBUyxPQUFPO0FBQ2hCLGdCQUFNLE1BQU0sT0FBTyxTQUFTLEtBQUssTUFBTSxHQUFHLEVBQUUsQ0FBQyxLQUFLLFNBQVMsSUFBSSxTQUFTLFNBQVM7QUFDakYsZUFBSyxXQUFXLGdCQUFnQjtBQUNoQyxlQUFLLGNBQWM7QUFDbkIsa0JBQVEsYUFBYSxNQUFNLElBQUksR0FBRztBQUVsQyxlQUFLLFVBQVUsWUFBWSxLQUFLLGtCQUFrQixDQUFDO0FBQ25ELGVBQUssaUJBQWlCO0FBQUEsUUFDMUI7QUFBQSxNQUNKLENBQUM7QUFFRCxXQUFLLFdBQVcsT0FBTyxVQUFVO0FBQUEsSUFDckMsQ0FBQztBQUVELFNBQUssVUFBVSxZQUFZLEtBQUssa0JBQWtCLENBQUM7QUFBQSxFQUN2RDtBQUFBLEVBRUEsY0FBYyxhQUFhLFdBQVc7QUFDbEMsUUFBSTtBQUVKLFFBQUksYUFBYSxHQUFHO0FBQ2hCLGNBQVE7QUFBQSxJQUNaLE9BQU87QUFDSCxjQUFRLGNBQWMsS0FBSyxjQUFjLFlBQVksSUFBSSxJQUFJO0FBQUEsSUFDakU7QUFFQSxVQUFNLFFBQVE7QUFBQSxNQUNWLE9BQU8sS0FBSyxNQUFNLGNBQWMsUUFBUSxDQUFDO0FBQUEsTUFDekMsS0FBSyxLQUFLLE1BQU0sY0FBYyxRQUFRLENBQUM7QUFBQSxJQUMzQztBQUVBLFFBQUksTUFBTSxRQUFRLE1BQU0sS0FBSyxNQUFNLE1BQU0sTUFBTSxXQUFXO0FBQ3RELFlBQU0sU0FBUztBQUNmLFlBQU0sT0FBTztBQUFBLElBQ2pCO0FBRUEsUUFBSSxRQUFRLGNBQWMsUUFDdEIsS0FBSyxTQUFTLEtBQUssSUFBSSxNQUFNLE9BQU8sWUFBWSxLQUFLLEdBQUcsS0FBSyxJQUFJLE1BQU0sS0FBSyxTQUFTLENBQUMsSUFDdEYsS0FBSyxTQUFTLEdBQUcsS0FBSyxJQUFJLFdBQVcsUUFBUSxDQUFDLENBQUM7QUFFbkQsVUFBTSxXQUFXLENBQUMsT0FBTyxTQUFVLE1BQU0sU0FBUyxNQUFNLFlBQVksT0FBTyxDQUFDLEtBQUs7QUFFakYsUUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHO0FBQ2hCLGNBQVEsU0FBUyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsRUFBRSxPQUFPLEtBQUs7QUFBQSxJQUNoRDtBQUVBLFFBQUksTUFBTSxNQUFNLFNBQVMsQ0FBQyxJQUFJLFdBQVc7QUFDckMsY0FBUSxNQUFNLE9BQU8sU0FBUyxXQUFXLENBQUMsT0FBTyxTQUFTLENBQUMsQ0FBQztBQUFBLElBQ2hFO0FBRUEsV0FBTztBQUFBLEVBQ1g7QUFBQSxFQUVBLFNBQVMsT0FBTyxLQUFLO0FBQ2pCLFdBQU8sTUFBTSxNQUFNLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxNQUFNLElBQUksS0FBSztBQUFBLEVBQ2hFO0FBQUEsRUFFQSxvQkFBb0I7QUFDaEIsV0FBTyxLQUFLLFdBQVcsS0FBSyxjQUFjO0FBQUEsRUFDOUM7QUFDSjs7Ozs7Ozs7Ozs7Ozs7OztBQ2hHZSxNQUFNLE9BQU87QUFBQSxFQUN4QixZQUFZLFlBQVksV0FBVztBQUMvQixTQUFLLFNBQVMsU0FBUyxjQUFjLFNBQVM7QUFDOUMsU0FBSyxXQUFXLEtBQUssTUFBTSxhQUFhLFFBQVEsT0FBTyxDQUFDO0FBQ3hELFNBQUssVUFBVSxTQUFTLGFBQWEsUUFBUSxTQUFTLENBQUM7QUFDdkQsU0FBSyxhQUFhO0FBQ2xCLFNBQUssWUFBWTtBQUNqQixTQUFLLGVBQWUsU0FBUyxjQUFjLGlCQUFpQjtBQUU1RCxRQUFJLEtBQUssUUFBUTtBQUNiLFdBQUssS0FBSztBQUNWLFdBQUssY0FBYztBQUFBLElBQ3ZCO0FBQUEsRUFDSjtBQUFBLEVBRUEsZ0JBQWdCO0FBQ1osUUFBSSxLQUFLLGNBQWM7QUFDbkIsWUFBTSxFQUFDLE9BQU0sSUFBSSxLQUFLLGFBQWE7QUFFbkMsV0FBSyxhQUFhLGlCQUFpQixTQUFTLE1BQU07QUFDOUMsWUFBSSxLQUFLLGFBQWEsTUFBTSxTQUFTLFFBQVE7QUFDekMsZUFBSyxhQUFhLG1CQUFtQixVQUFVLElBQUksT0FBTztBQUFBLFFBQzlELE9BQU87QUFDSCxlQUFLLGFBQWEsbUJBQW1CLFVBQVUsT0FBTyxPQUFPO0FBQUEsUUFDakU7QUFBQSxNQUNKLENBQUM7QUFBQSxJQUNMO0FBQUEsRUFDSjtBQUFBLEVBRUEsT0FBTztBQUNILFNBQUssT0FBTyxpQkFBaUIsVUFBVSxXQUFTO0FBQzVDLFlBQU0sZUFBZTtBQUVyQixVQUFJLE9BQU8sQ0FBQztBQUNaLFlBQU0sU0FBUyxLQUFLLE9BQU8sY0FBYyxTQUFTLEdBQzlDLFFBQVEsS0FBSyxPQUFPLGNBQWMsc0NBQXNDLEdBQ3hFLFNBQVMsS0FBSyxPQUFPLGNBQWMsdUNBQXVDLEdBQzFFLFVBQVUsS0FBSyxPQUFPLGNBQWMsd0NBQXdDLEdBQzVFLFdBQVcsU0FBUyxjQUFjLDJDQUEyQyxHQUM3RSxRQUFRLFNBQVMsY0FBYyx3Q0FBd0M7QUFFM0UsYUFBTyxRQUFRLEtBQUssS0FBSyxDQUFDLFFBQVEsT0FBTyxLQUFLLENBQUMsSUFBSTtBQUNuRCxZQUFNLFFBQVEsUUFBUSxLQUFLLEtBQUssQ0FBQyxTQUFTLE1BQU0sUUFBUSxLQUFLLENBQUMsSUFBSTtBQUNsRSxhQUFPLFFBQVEsUUFBUSxLQUFLLEtBQUssQ0FBQyxRQUFRLE9BQU8sUUFBUSxLQUFLLENBQUMsSUFBSTtBQUNuRSxjQUFRLFFBQVEsUUFBUSxLQUFLLEtBQUssQ0FBQyxXQUFXLFFBQVEsUUFBUSxLQUFLLENBQUMsSUFBSTtBQUN4RSxpQkFBVyxLQUFLLEtBQUssQ0FBQyxZQUFZLE1BQU0sQ0FBQyxJQUFJO0FBQzdDLGNBQVEsS0FBSyxLQUFLLENBQUMsU0FBUyxNQUFNLENBQUMsSUFBSTtBQUV2QyxXQUFLLGFBQWEsSUFBSTtBQUFBLElBQzFCLENBQUM7QUFBQSxFQUNMO0FBQUEsRUFFQSxhQUFhLE1BQU07QUFDZixRQUFJLFVBQVUsQ0FBQztBQUVmLFNBQUssU0FBUyxRQUFRLFVBQVE7QUFDMUIsVUFBSSxRQUFRO0FBRVosV0FBSyxRQUFRLGVBQWE7QUFDdEIsWUFBSSxTQUFTLEtBQUssVUFBVSxDQUFDLENBQUMsRUFBRSxTQUFTLEVBQUUsWUFBWTtBQUV2RCxZQUFJLE9BQU8sV0FBVyxVQUFVO0FBQzVCLG1CQUFTLE9BQU8sS0FBSyxHQUFHO0FBQUEsUUFDNUIsV0FBVyxDQUFDLE1BQU0sT0FBTyxNQUFNLENBQUMsS0FBSyxVQUFVLENBQUMsTUFBTSxRQUFRO0FBQzFELGNBQUksYUFBYSxVQUFVLENBQUMsRUFBRSxNQUFNLEdBQUc7QUFFdkMsY0FBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsR0FBRztBQUN4RDtBQUNBO0FBQUEsVUFDSjtBQUFBLFFBQ0o7QUFFQSxpQkFBUyxPQUFPLFFBQVEsVUFBVSxDQUFDLEVBQUUsWUFBWSxDQUFDLE1BQU0sS0FBSyxJQUFJO0FBQUEsTUFDckUsQ0FBQztBQUVELFVBQUksVUFBVSxLQUFLLFFBQVE7QUFDdkIsZ0JBQVEsS0FBSyxJQUFJO0FBQUEsTUFDckI7QUFBQSxJQUNKLENBQUM7QUFFRCxTQUFLLFVBQVUsWUFBWSxPQUFPO0FBQ2xDLFNBQUssV0FBVyxhQUFhLEtBQUssS0FBSyxRQUFRLFNBQVMsS0FBSyxPQUFPLEtBQUssQ0FBQztBQUMxRSxTQUFLLFdBQVcsaUJBQWlCO0FBRWpDLFFBQUksYUFBYSxTQUFTLGNBQWMsbUJBQW1CO0FBRTNELFFBQUksWUFBWTtBQUNaLGlCQUFXLE1BQU07QUFBQSxJQUNyQjtBQUFBLEVBQ0o7QUFDSjs7Ozs7OztVQzFGQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOTztBQUNxRDtBQUNYO0FBQ1I7QUFDTztBQUNQO0FBRXpDLFNBQVMsaUJBQWlCLG9CQUFvQixNQUFNO0FBQ2hELFFBQU0sWUFBWSxJQUFJLDhEQUFTLENBQUMsR0FDNUIsYUFBYSxJQUFJLDhEQUFVLENBQUMsU0FBUztBQUV6QyxNQUFJLG9FQUFlLENBQUMsU0FBUyxjQUFjLFNBQVMsQ0FBQztBQUNyRCxNQUFJLDBEQUFNLENBQUMsWUFBWSxTQUFTO0FBQ2hDLE1BQUksMERBQU0sQ0FBQztBQUVYLFdBQVMsbUJBQW1CO0FBQ3hCLFFBQUksYUFBYSxTQUFTLGlCQUFpQixrQkFBa0I7QUFFN0QsUUFBSSxXQUFXLFFBQVE7QUFDbkIsWUFBTSxhQUFhLFdBQVcsQ0FBQyxFQUFFLGNBQWMsYUFDM0MsVUFBVSxTQUFTLGdCQUFnQixjQUFjLE1BQU0sYUFBYTtBQUV4RSxpQkFBVyxRQUFRLFdBQVM7QUFDeEIsY0FBTSxhQUFhLFNBQVMsR0FBRyxXQUFXO0FBQzFDLGNBQU0sYUFBYSxVQUFVLEdBQUcsV0FBVztBQUFBLE1BQy9DLENBQUM7QUFBQSxJQUNMO0FBQUEsRUFDSjtBQUVBLG1CQUFpQjtBQUNqQixTQUFPLFdBQVc7QUFDdEIsQ0FBQzs7Ozs7Ozs7Ozs7QUMvQkQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9hZGRpdGlvbmFsL2dldC1kYXRhLXNvbmdzLmpzIiwid2VicGFjazovLy8uL2pzL2FkZGl0aW9uYWwvaHRtbC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2N1c3RvbS1zZWxlY3RvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9oZWFkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9saXN0LXNvbmdzLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvcGFnaW5hdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL3NlYXJjaC5qcyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vanMvdGhlbWUuanMiLCJ3ZWJwYWNrOi8vLy4vY3NzL3RoZW1lLnNjc3M/NmIyYiJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgc29uZ3MgPSBbXTtcbmNvbnN0IGJhbmRzID0gWydBQy9EQycsICdJbWFnaW5lIERyYWdvbnMnLCAnTWV0YWxsaWNhJywgJ1NraWxsZXQnXSxcbiAgICBnZW5yZXMgPSBbJ1JvY2snLCAnRnVuaycsICdCZWF0cycsICdIaXAgSG9wJywgJ1BvcCcsICdSYXAnXSxcbiAgICBjb3VudHJpZXMgPSBbJ1VTQScsICdVSycsICdVQScsICdQTCcsICdVQUUnLCAnSlAnXTtcblxuZnVuY3Rpb24gZ2V0UmFuZG9tVmFsdWUoYXJyYXkpIHtcbiAgICByZXR1cm4gYXJyYXlbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXJyYXkubGVuZ3RoKV07XG59XG5cbmZvciAobGV0IGkgPSAxOyBpIDw9IDQ4OyBpKyspIHtcbiAgICBzb25ncy5wdXNoKHtcbiAgICAgICAgaWQ6IGksXG4gICAgICAgIGZhdm9yaXRlOiBmYWxzZSxcbiAgICAgICAgaW1nOiBgcHVibGljL2ltZy9zb25ncy9saXN0L3Nvbmcke2l9LmpwZWdgLFxuICAgICAgICBzb25nOiAnTGV0IFRoZXJlIEJlIFJvY2snLFxuICAgICAgICBiYW5kOiBnZXRSYW5kb21WYWx1ZShiYW5kcyksXG4gICAgICAgIHllYXI6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgyMDMwIC0gMTk1MCkpICsgMTk1MCxcbiAgICAgICAgc3R5bGU6IFtnZXRSYW5kb21WYWx1ZShnZW5yZXMpXSxcbiAgICAgICAgY291bnRyeTogZ2V0UmFuZG9tVmFsdWUoY291bnRyaWVzKSxcbiAgICAgICAgYWRkZWQ6IGZhbHNlXG4gICAgfSk7XG59XG5cbmlmICghbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NvbmdzJykpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc29uZ3MnLCBKU09OLnN0cmluZ2lmeShzb25ncykpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwZXJQYWdlJywgJzYnKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBIVE1MIHtcbiAgICBzdGF0aWMgY3JlYXRlRWxlbWVudChlbGVtZW50TmFtZSwgY2xhc3NOYW1lID0gJycsIGF0dHJpYnV0ZXMgPSBudWxsLCB0ZXh0ID0gJycpIHtcbiAgICAgICAgaWYgKCFlbGVtZW50TmFtZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnROYW1lKTtcblxuICAgICAgICBpZiAoYXR0cmlidXRlcykge1xuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXNba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0ZXh0KSB7XG4gICAgICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKEhUTUwuY3JlYXRlVGV4dCh0ZXh0KSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlVGV4dCh0ZXh0ID0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdGV4dCA/IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpIDogbnVsbDtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDdXN0b21TZWxlY3RvcnMge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudCkge1xuICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtID0gdGhpcy5wYXJlbnQucXVlcnlTZWxlY3RvckFsbCgnLnNlYXJjaF9fc2VsZWN0LWl0ZW0tc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIHRoaXMuaXRlbXMgPSB0aGlzLnBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2VhcmNoX19zZWxlY3QtaXRlbScpO1xuXG4gICAgICAgICAgICB0aGlzLmluaXRTZWxlY3RlZFNpemUoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdEl0ZW1zKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0SXRlbXMoKSB7XG4gICAgICAgIGlmICh0aGlzLml0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiB0aGlzLml0ZW1zKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gaXRlbS5wYXJlbnRFbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBwYXJlbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaF9fc2VsZWN0LWl0ZW0tc2VsZWN0ZWQnKTtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBwYXJlbnQuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkLnRleHRDb250ZW50ID0gaXRlbS50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQuZGF0YXNldC52YWx1ZSA9IGl0ZW0uZGF0YXNldC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQuY2xpY2soKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXRTZWxlY3RlZFNpemUoKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkSXRlbS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4IGluIE9iamVjdC5rZXlzKHRoaXMuc2VsZWN0ZWRJdGVtKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuc2VsZWN0ZWRJdGVtW2luZGV4XS5wYXJlbnRFbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IHBhcmVudC5xdWVyeVNlbGVjdG9yKCdsaS5zZWxlY3RlZCcpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1baW5kZXhdLnRleHRDb250ZW50ID0gc2VsZWN0ZWQudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1baW5kZXhdLmRhdGFzZXQudmFsdWUgPSBzZWxlY3RlZC5kYXRhc2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtW2luZGV4XS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmVudC5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW5lZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50LmNsYXNzTGlzdC5yZW1vdmUoJ29wZW5lZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudC5zdHlsZS5oZWlnaHQgPSB0aGlzLnNlbGVjdGVkSXRlbVtpbmRleF0ub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50LmNsYXNzTGlzdC5hZGQoJ29wZW5lZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudC5zdHlsZS5oZWlnaHQgPSB0aGlzLnNlbGVjdGVkSXRlbVtpbmRleF0ub2Zmc2V0SGVpZ2h0ICogcGFyZW50LmNoaWxkcmVuLmxlbmd0aCArICdweCc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBIZWFkZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJhY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19jb250YWluZXItYmFjaycpO1xuICAgICAgICB0aGlzLmZhdm9yaXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fY29udGFpbmVyLWl0ZW0uZmF2b3JpdGUnKTtcbiAgICAgICAgdGhpcy5zYXZlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2NvbnRhaW5lci1pdGVtLnNhdmVkJyk7XG4gICAgICAgIHRoaXMuc3VibWl0U2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaF9fc3VibWl0Jyk7XG5cbiAgICAgICAgdGhpcy5vbkNsaWNrQmFjaygpO1xuICAgICAgICB0aGlzLm9uQ2xpY2tGYXZvcml0ZSgpO1xuICAgICAgICB0aGlzLm9uQ2xpY2tTYXZlZCgpO1xuICAgIH1cblxuICAgIG9uQ2xpY2tCYWNrKCkge1xuICAgICAgICBpZiAodGhpcy5iYWNrKSB7XG4gICAgICAgICAgICB0aGlzLmJhY2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaGlzdG9yeS5iYWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ2xpY2tGYXZvcml0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZmF2b3JpdGUpIHtcbiAgICAgICAgICAgIHRoaXMuZmF2b3JpdGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmF2b3JpdGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3RlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmF2b3JpdGUuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZhdm9yaXRlLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5zdWJtaXRTZWFyY2guY2xpY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25DbGlja1NhdmVkKCkge1xuICAgICAgICBpZiAodGhpcy5zYXZlZCkge1xuICAgICAgICAgICAgdGhpcy5zYXZlZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zYXZlZC5jbGFzc0xpc3QuY29udGFpbnMoJ3NlbGVjdGVkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXZlZC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2F2ZWQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnN1Ym1pdFNlYXJjaC5jbGljaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IEhUTUwgZnJvbSBcIi4uL2FkZGl0aW9uYWwvaHRtbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0U29uZ3Mge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnBlclBhZ2UgPSBwYXJzZUludChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGVyUGFnZScpKTtcbiAgICAgICAgdGhpcy5hbGxTb25ncyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NvbmdzJykpO1xuICAgICAgICB0aGlzLnBhcmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zb25ncycpO1xuICAgIH1cblxuICAgIHNldEFsbFNvbmdzKGFsbFNvbmdzKSB7XG4gICAgICAgIHRoaXMuYWxsU29uZ3MgPSBhbGxTb25ncztcbiAgICB9XG5cbiAgICByZW5kZXJTb25ncyhzdGFydCkge1xuICAgICAgICBjb25zdCBzb25nc1RvUmVuZGVyID0gdGhpcy5hbGxTb25ncy5zbGljZShzdGFydCwgc3RhcnQgKyB0aGlzLnBlclBhZ2UpO1xuXG4gICAgICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQucmVwbGFjZUNoaWxkcmVuKCk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IHNvbmcgb2Ygc29uZ3NUb1JlbmRlcikge1xuICAgICAgICAgICAgICAgIGxldCBsaSA9IEhUTUwuY3JlYXRlRWxlbWVudCgnbGknLCAnc29uZ3NfX2l0ZW0nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnZGF0YS1pZCc6IHNvbmcuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGF0YS1mYXZvcml0ZSc6IHNvbmcuZmF2b3JpdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGF0YS1zYXZlZCc6IHNvbmcuYWRkZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGF0YS1hcnRpc3QnOiBzb25nLmJhbmQsXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGF0YS1nZW5yZSc6IHNvbmcuc3R5bGUuam9pbignLCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEtZGVjYWRlJzogc29uZy55ZWFyLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEtY291bnRyeSc6IHNvbmcuY291bnRyeSxcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIGltZyA9IEhUTUwuY3JlYXRlRWxlbWVudCgnaW1nJywgJ3NvbmdzX19pdGVtLWltZycsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogc29uZy5pbWcsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbHQ6IHNvbmcuc29uZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMTY5cHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAnMTY5cHgnXG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZSA9IEhUTUwuY3JlYXRlRWxlbWVudCgnc3BhbicsICdzb25nc19faXRlbS1mYXZvcml0ZScsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhLWZhdm9yaXRlJzogc29uZy5mYXZvcml0ZVxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgc29uZ0RhdGFDb250YWluZXIgPSBIVE1MLmNyZWF0ZUVsZW1lbnQoJ2RpdicsICdzb25nc19faXRlbS1jb250YWluZXInKSxcbiAgICAgICAgICAgICAgICAgICAgc29uZ05hbWUgPSBIVE1MLmNyZWF0ZUVsZW1lbnQoJ2gyJywgJ3NvbmdzX19pdGVtLXNvbmcnLCB7fSwgc29uZy5zb25nKSxcbiAgICAgICAgICAgICAgICAgICAgc29uZ0JhbmQgPSBIVE1MLmNyZWF0ZUVsZW1lbnQoJ2gzJywgJ3NvbmdzX19pdGVtLWJhbmQnLCB7fSwgc29uZy5iYW5kKSxcbiAgICAgICAgICAgICAgICAgICAgc29uZ1llYXIgPSBIVE1MLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCAnc29uZ3NfX2l0ZW0teWVhcicsIHt9LCAnWWVhciA6ICcpLFxuICAgICAgICAgICAgICAgICAgICBzb25nWWVhckJhbmQgPSBIVE1MLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCAnJywge30sIHNvbmcueWVhciksXG4gICAgICAgICAgICAgICAgICAgIHNvbmdTdHlsZSA9IEhUTUwuY3JlYXRlRWxlbWVudCgnc3BhbicsICdzb25nc19faXRlbS1zdHlsZScsIHt9LCAnU3R5bGUgOiAnKSxcbiAgICAgICAgICAgICAgICAgICAgc29uZ1N0eWxlQmFuZCA9IEhUTUwuY3JlYXRlRWxlbWVudCgnc3BhbicsICcnLCB7fSwgc29uZy5zdHlsZS5qb2luKCcsJykpLFxuICAgICAgICAgICAgICAgICAgICBzb25nQ291bnRyeSA9IEhUTUwuY3JlYXRlRWxlbWVudCgnc3BhbicsICdzb25nc19faXRlbS1jb3VudHJ5Jywge30sICdDb3VudHJ5IDogJyksXG4gICAgICAgICAgICAgICAgICAgIHNvbmdDb3VudHJ5QmFuZCA9IEhUTUwuY3JlYXRlRWxlbWVudCgnc3BhbicsICcnLCB7fSwgc29uZy5jb3VudHJ5KSxcbiAgICAgICAgICAgICAgICAgICAgc29uZ0FkZCA9IEhUTUwuY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgJ3NvbmdzX19pdGVtLWFkZCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdidXR0b24nXG4gICAgICAgICAgICAgICAgICAgIH0sICdBZGQnKTtcblxuICAgICAgICAgICAgICAgIHNvbmdZZWFyLmFwcGVuZChzb25nWWVhckJhbmQpO1xuICAgICAgICAgICAgICAgIHNvbmdTdHlsZS5hcHBlbmQoc29uZ1N0eWxlQmFuZCk7XG4gICAgICAgICAgICAgICAgc29uZ0NvdW50cnkuYXBwZW5kKHNvbmdDb3VudHJ5QmFuZCk7XG4gICAgICAgICAgICAgICAgc29uZ0RhdGFDb250YWluZXIuYXBwZW5kKHNvbmdOYW1lLCBzb25nQmFuZCwgc29uZ1llYXIsIHNvbmdTdHlsZSwgc29uZ0NvdW50cnksIHNvbmdBZGQpXG4gICAgICAgICAgICAgICAgbGkuYXBwZW5kKGltZywgZmF2b3JpdGUsIHNvbmdEYXRhQ29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICBmYXZvcml0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5jaGFuZ2VEYXRhKHNvbmcuaWQsICdmYXZvcml0ZScpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxpLmRhdGFzZXQuZmF2b3JpdGUgPSByZXN1bHQudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGUuZGF0YXNldC5mYXZvcml0ZSA9IHJlc3VsdC50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHNvbmdBZGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuY2hhbmdlRGF0YShzb25nLmlkLCAnYWRkZWQnKTtcblxuICAgICAgICAgICAgICAgICAgICBsaS5kYXRhc2V0LmFkZGVkID0gcmVzdWx0LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlLmRhdGFzZXQuYWRkZWQgPSByZXN1bHQudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgdGhpcy5wYXJlbnQuYXBwZW5kKGxpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoYW5nZURhdGEoaWQsIG5hbWUpIHtcbiAgICAgICAgY29uc3QgYWxsU29uZ3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzb25ncycpKSxcbiAgICAgICAgICAgIGluZGV4ID0gYWxsU29uZ3MuZmluZEluZGV4KHNvbmcgPT4gc29uZy5pZCA9PT0gaWQpO1xuXG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gbmFtZSAhPT0gJ2FkZGVkJyA/ICFhbGxTb25nc1tpbmRleF1bbmFtZV0gOiB0cnVlO1xuXG4gICAgICAgICAgICBhbGxTb25nc1tpbmRleF1bbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzb25ncycsIEpTT04uc3RyaW5naWZ5KGFsbFNvbmdzKSk7XG5cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgSFRNTCBmcm9tIFwiLi4vYWRkaXRpb25hbC9odG1sXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZ2luYXRpb24ge1xuICAgIGNvbnN0cnVjdG9yKGxpc3RTb25ncykge1xuICAgICAgICB0aGlzLnBhZ2luYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnaW5hdGlvbicpO1xuXG4gICAgICAgIGlmICh0aGlzLnBhZ2luYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMubGlzdFNvbmdzID0gbGlzdFNvbmdzO1xuICAgICAgICAgICAgdGhpcy5wZXJQYWdlID0gcGFyc2VJbnQobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BlclBhZ2UnKSk7XG4gICAgICAgICAgICB0aGlzLmFsbFNvbmdzTGVuZ3RoID0gcGFyc2VJbnQoSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc29uZ3MnKSkubGVuZ3RoKTtcbiAgICAgICAgICAgIHRoaXMucGFnZUNvdW50ID0gTWF0aC5jZWlsKHRoaXMuYWxsU29uZ3NMZW5ndGggLyB0aGlzLnBlclBhZ2UpO1xuICAgICAgICAgICAgdGhpcy51cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IHBhcnNlSW50KHRoaXMudXJsUGFyYW1zLmdldCgncGFnZScpKSB8fCAxO1xuXG4gICAgICAgICAgICB0aGlzLmxpc3RTb25ncy5yZW5kZXJTb25ncyh0aGlzLmdldFN0YXJ0TGlzdFNvbmdzKCkpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJQYWdpbmF0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRQYWdlQ291bnQocGFnZUNvdW50KSB7XG4gICAgICAgIHRoaXMucGFnZUNvdW50ID0gcGFnZUNvdW50O1xuICAgIH1cblxuICAgIHJlbmRlclBhZ2luYXRpb24oKSB7XG4gICAgICAgIGNvbnN0IGFycmF5UGFnaW5hdGlvbiA9IHRoaXMuZ2V0UGFnaW5hdGlvbih0aGlzLmN1cnJlbnRQYWdlLCB0aGlzLnBhZ2VDb3VudCk7XG5cbiAgICAgICAgdGhpcy5wYWdpbmF0aW9uLnJlcGxhY2VDaGlsZHJlbigpO1xuICAgICAgICBhcnJheVBhZ2luYXRpb24uZm9yRWFjaChwYWdlID0+IHtcbiAgICAgICAgICAgIGxldCBwYWdlQnV0dG9uID0gSFRNTC5jcmVhdGVFbGVtZW50KCdidXR0b24nLCAncGFnaW5hdGlvbl9fcGFnZScsIHtcbiAgICAgICAgICAgICAgICAnZGF0YS1pbmRleCc6IHBhZ2UsXG4gICAgICAgICAgICAgICAgJ2FyaWEtbGFiZWwnOiBgUGFnZSAke3BhZ2V9YFxuICAgICAgICAgICAgfSwgcGFnZSk7XG5cbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPT09IHBhZ2UgPyBwYWdlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJykgOiAnJztcblxuICAgICAgICAgICAgcGFnZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocGFnZSAhPT0gJy4uLicpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoJz8nKVswXSArIChwYWdlICE9PSAxID8gYD9wYWdlPSR7cGFnZX1gIDogJycpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2luYXRpb24ucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBwYWdlO1xuICAgICAgICAgICAgICAgICAgICBoaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCBcIlwiLCB1cmwpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdFNvbmdzLnJlbmRlclNvbmdzKHRoaXMuZ2V0U3RhcnRMaXN0U29uZ3MoKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyUGFnaW5hdGlvbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnBhZ2luYXRpb24uYXBwZW5kKHBhZ2VCdXR0b24pO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmxpc3RTb25ncy5yZW5kZXJTb25ncyh0aGlzLmdldFN0YXJ0TGlzdFNvbmdzKCkpO1xuICAgIH1cblxuICAgIGdldFBhZ2luYXRpb24oY3VycmVudFBhZ2UsIHBhZ2VDb3VudCkge1xuICAgICAgICBsZXQgZGVsdGE7XG5cbiAgICAgICAgaWYgKHBhZ2VDb3VudCA8PSA3KSB7XG4gICAgICAgICAgICBkZWx0YSA9IDc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWx0YSA9IGN1cnJlbnRQYWdlID4gNCAmJiBjdXJyZW50UGFnZSA8IHBhZ2VDb3VudCAtIDMgPyAyIDogNDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJhbmdlID0ge1xuICAgICAgICAgICAgc3RhcnQ6IE1hdGgucm91bmQoY3VycmVudFBhZ2UgLSBkZWx0YSAvIDIpLFxuICAgICAgICAgICAgZW5kOiBNYXRoLnJvdW5kKGN1cnJlbnRQYWdlICsgZGVsdGEgLyAyKVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChyYW5nZS5zdGFydCAtIDEgPT09IDEgfHwgcmFuZ2UuZW5kICsgMSA9PT0gcGFnZUNvdW50KSB7XG4gICAgICAgICAgICByYW5nZS5zdGFydCArPSAxO1xuICAgICAgICAgICAgcmFuZ2UuZW5kICs9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcGFnZXMgPSBjdXJyZW50UGFnZSA+IGRlbHRhID9cbiAgICAgICAgICAgIHRoaXMuZ2V0UmFuZ2UoTWF0aC5taW4ocmFuZ2Uuc3RhcnQsIHBhZ2VDb3VudCAtIGRlbHRhKSwgTWF0aC5taW4ocmFuZ2UuZW5kLCBwYWdlQ291bnQpKSA6XG4gICAgICAgICAgICB0aGlzLmdldFJhbmdlKDEsIE1hdGgubWluKHBhZ2VDb3VudCwgZGVsdGEgKyAxKSk7XG5cbiAgICAgICAgY29uc3Qgd2l0aERvdHMgPSAodmFsdWUsIHBhaXIpID0+IChwYWdlcy5sZW5ndGggKyAxICE9PSBwYWdlQ291bnQgPyBwYWlyIDogW3ZhbHVlXSk7XG5cbiAgICAgICAgaWYgKHBhZ2VzWzBdICE9PSAxKSB7XG4gICAgICAgICAgICBwYWdlcyA9IHdpdGhEb3RzKDEsIFsxLCAnLi4uJ10pLmNvbmNhdChwYWdlcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFnZXNbcGFnZXMubGVuZ3RoIC0gMV0gPCBwYWdlQ291bnQpIHtcbiAgICAgICAgICAgIHBhZ2VzID0gcGFnZXMuY29uY2F0KHdpdGhEb3RzKHBhZ2VDb3VudCwgWycuLi4nLCBwYWdlQ291bnRdKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGFnZXM7XG4gICAgfVxuXG4gICAgZ2V0UmFuZ2Uoc3RhcnQsIGVuZCkge1xuICAgICAgICByZXR1cm4gQXJyYXkoZW5kIC0gc3RhcnQgKyAxKS5maWxsKCkubWFwKCh2LCBpKSA9PiBpICsgc3RhcnQpO1xuICAgIH1cblxuICAgIGdldFN0YXJ0TGlzdFNvbmdzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wZXJQYWdlICogKHRoaXMuY3VycmVudFBhZ2UgLSAxKTtcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VhcmNoIHtcbiAgICBjb25zdHJ1Y3RvcihwYWdpbmF0aW9uLCBsaXN0U29uZ3MpIHtcbiAgICAgICAgdGhpcy5zZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoJyk7XG4gICAgICAgIHRoaXMuYWxsU29uZ3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzb25ncycpKTtcbiAgICAgICAgdGhpcy5wZXJQYWdlID0gcGFyc2VJbnQobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BlclBhZ2UnKSk7XG4gICAgICAgIHRoaXMucGFnaW5hdGlvbiA9IHBhZ2luYXRpb247XG4gICAgICAgIHRoaXMubGlzdFNvbmdzID0gbGlzdFNvbmdzO1xuICAgICAgICB0aGlzLnNlYXJjaEFydGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfX2FydGlzdCcpO1xuXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaCkge1xuICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgICAgICB0aGlzLm9uSW5wdXRBcnRpc3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSW5wdXRBcnRpc3QoKSB7XG4gICAgICAgIGlmICh0aGlzLnNlYXJjaEFydGlzdCkge1xuICAgICAgICAgICAgY29uc3Qge2xlbmd0aH0gPSB0aGlzLnNlYXJjaEFydGlzdC5kYXRhc2V0O1xuXG4gICAgICAgICAgICB0aGlzLnNlYXJjaEFydGlzdC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWFyY2hBcnRpc3QudmFsdWUubGVuZ3RoID4gbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoQXJ0aXN0Lm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QuYWRkKCdzaG93bicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoQXJ0aXN0Lm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QucmVtb3ZlKCdzaG93bicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5zZWFyY2guYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgbGV0IGRhdGEgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IGFydGlzdCA9IHRoaXMuc2VhcmNoLnF1ZXJ5U2VsZWN0b3IoJyNhcnRpc3QnKSxcbiAgICAgICAgICAgICAgICBnZW5yZSA9IHRoaXMuc2VhcmNoLnF1ZXJ5U2VsZWN0b3IoJyNnZW5yZSAuc2VhcmNoX19zZWxlY3QtaXRlbS1zZWxlY3RlZCcpLFxuICAgICAgICAgICAgICAgIGRlY2FkZSA9IHRoaXMuc2VhcmNoLnF1ZXJ5U2VsZWN0b3IoJyNkZWNhZGUgLnNlYXJjaF9fc2VsZWN0LWl0ZW0tc2VsZWN0ZWQnKSxcbiAgICAgICAgICAgICAgICBjb3VudHJ5ID0gdGhpcy5zZWFyY2gucXVlcnlTZWxlY3RvcignI2NvdW50cnkgLnNlYXJjaF9fc2VsZWN0LWl0ZW0tc2VsZWN0ZWQnKSxcbiAgICAgICAgICAgICAgICBmYXZvcml0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2NvbnRhaW5lci1pdGVtLmZhdm9yaXRlLnNlbGVjdGVkJyksXG4gICAgICAgICAgICAgICAgc2F2ZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19jb250YWluZXItaXRlbS5zYXZlZC5zZWxlY3RlZCcpO1xuXG4gICAgICAgICAgICBhcnRpc3QudmFsdWUgPyBkYXRhLnB1c2goWydiYW5kJywgYXJ0aXN0LnZhbHVlXSkgOiAnJztcbiAgICAgICAgICAgIGdlbnJlLmRhdGFzZXQudmFsdWUgPyBkYXRhLnB1c2goWydzdHlsZScsIGdlbnJlLmRhdGFzZXQudmFsdWVdKSA6ICcnO1xuICAgICAgICAgICAgZGVjYWRlLmRhdGFzZXQudmFsdWUgPyBkYXRhLnB1c2goWyd5ZWFyJywgZGVjYWRlLmRhdGFzZXQudmFsdWVdKSA6ICcnO1xuICAgICAgICAgICAgY291bnRyeS5kYXRhc2V0LnZhbHVlID8gZGF0YS5wdXNoKFsnY291bnRyeScsIGNvdW50cnkuZGF0YXNldC52YWx1ZV0pIDogJyc7XG4gICAgICAgICAgICBmYXZvcml0ZSA/IGRhdGEucHVzaChbJ2Zhdm9yaXRlJywgJ3RydWUnXSkgOiAnJztcbiAgICAgICAgICAgIHNhdmVkID8gZGF0YS5wdXNoKFsnYWRkZWQnLCAndHJ1ZSddKSA6ICcnO1xuXG4gICAgICAgICAgICB0aGlzLnNlYXJjaEJ5RGF0YShkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2VhcmNoQnlEYXRhKGRhdGEpIHtcbiAgICAgICAgbGV0IG1hdGNoZWQgPSBbXTtcblxuICAgICAgICB0aGlzLmFsbFNvbmdzLmZvckVhY2goc29uZyA9PiB7XG4gICAgICAgICAgICBsZXQgY291bnQgPSAwO1xuXG4gICAgICAgICAgICBkYXRhLmZvckVhY2goc2VhcmNoaW5nID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgc2VhcmNoID0gc29uZ1tzZWFyY2hpbmdbMF1dLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc2VhcmNoID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaCA9IHNlYXJjaC5qb2luKCcsJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghaXNOYU4oTnVtYmVyKHNlYXJjaCkpICYmIHNlYXJjaGluZ1swXSA9PT0gJ3llYXInKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhcnJheVllYXJzID0gc2VhcmNoaW5nWzFdLnNwbGl0KCctJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCtzZWFyY2ggPj0gK2FycmF5WWVhcnNbMF0gJiYgK3NlYXJjaCA8PSArYXJyYXlZZWFyc1sxXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvdW50ICs9IHNlYXJjaC5pbmRleE9mKHNlYXJjaGluZ1sxXS50b0xvd2VyQ2FzZSgpKSAhPT0gLTEgPyAxIDogMDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoY291bnQgPT09IGRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbWF0Y2hlZC5wdXNoKHNvbmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmxpc3RTb25ncy5zZXRBbGxTb25ncyhtYXRjaGVkKTtcbiAgICAgICAgdGhpcy5wYWdpbmF0aW9uLnNldFBhZ2VDb3VudChNYXRoLmNlaWwobWF0Y2hlZC5sZW5ndGggLyB0aGlzLnBlclBhZ2UpIHx8IDEpO1xuICAgICAgICB0aGlzLnBhZ2luYXRpb24ucmVuZGVyUGFnaW5hdGlvbigpO1xuXG4gICAgICAgIGxldCBwYWdpbmF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2luYXRpb25fX3BhZ2UnKTtcblxuICAgICAgICBpZiAocGFnaW5hdGlvbikge1xuICAgICAgICAgICAgcGFnaW5hdGlvbi5jbGljaygpO1xuICAgICAgICB9XG4gICAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4vYWRkaXRpb25hbC9nZXQtZGF0YS1zb25ncyc7XG5pbXBvcnQgQ3VzdG9tU2VsZWN0b3JzIGZyb20gXCIuL2NvbXBvbmVudHMvY3VzdG9tLXNlbGVjdG9yc1wiO1xuaW1wb3J0IFBhZ2luYXRpb24gZnJvbSBcIi4vY29tcG9uZW50cy9wYWdpbmF0aW9uXCI7XG5pbXBvcnQgU2VhcmNoIGZyb20gXCIuL2NvbXBvbmVudHMvc2VhcmNoXCI7XG5pbXBvcnQgTGlzdFNvbmdzIGZyb20gXCIuL2NvbXBvbmVudHMvbGlzdC1zb25nc1wiO1xuaW1wb3J0IEhlYWRlciBmcm9tIFwiLi9jb21wb25lbnRzL2hlYWRlclwiO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gICAgY29uc3QgbGlzdFNvbmdzID0gbmV3IExpc3RTb25ncygpLFxuICAgICAgICBwYWdpbmF0aW9uID0gbmV3IFBhZ2luYXRpb24obGlzdFNvbmdzKTtcblxuICAgIG5ldyBDdXN0b21TZWxlY3RvcnMoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaCcpKTtcbiAgICBuZXcgU2VhcmNoKHBhZ2luYXRpb24sIGxpc3RTb25ncyk7XG4gICAgbmV3IEhlYWRlcigpO1xuXG4gICAgZnVuY3Rpb24gY2hhbmdlU2l6ZUltYWdlcygpIHtcbiAgICAgICAgbGV0IGxpc3RJbWFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc29uZ3NfX2l0ZW0taW1nJyk7XG5cbiAgICAgICAgaWYgKGxpc3RJbWFnZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBwYXJlbnRTaXplID0gbGlzdEltYWdlc1swXS5wYXJlbnRFbGVtZW50Lm9mZnNldFdpZHRoLFxuICAgICAgICAgICAgICAgIG5ld1NpemUgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggPCAzOTAgPyBwYXJlbnRTaXplIDogMTY5O1xuXG4gICAgICAgICAgICBsaXN0SW1hZ2VzLmZvckVhY2goaW1hZ2UgPT4ge1xuICAgICAgICAgICAgICAgIGltYWdlLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBgJHtuZXdTaXplfXB4YCk7XG4gICAgICAgICAgICAgICAgaW1hZ2Uuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBgJHtuZXdTaXplfXB4YCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoYW5nZVNpemVJbWFnZXMoKTtcbiAgICB3aW5kb3cub25yZXNpemUgPSBjaGFuZ2VTaXplSW1hZ2VzO1xufSk7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9