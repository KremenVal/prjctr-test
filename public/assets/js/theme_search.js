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

/***/ "./js/search/custom-selectors.js":
/*!***************************************!*\
  !*** ./js/search/custom-selectors.js ***!
  \***************************************/
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
          event.preventDefault();
          const parent = item.parentElement, selected = parent.querySelector(".search__select-item-selected"), input = item.querySelector("input");
          for (let child of parent.children) {
            child.classList.remove("selected");
          }
          item.classList.add("selected");
          if (parent.id === "genre") {
            input.checked = !input.checked;
            let searching = selected.dataset.value.split(",").filter((genre) => genre !== ""), index = searching.findIndex((value) => value.toLowerCase() === item.dataset.value.toLowerCase());
            if (index !== -1) {
              searching.splice(index, 1);
            } else {
              searching.push(item.textContent.replace(/(\r\n|\n|\r)/gm, "").replaceAll(" ", ""));
            }
            selected.textContent = !searching.length ? selected.dataset.default : searching.join(",");
            selected.dataset.value = searching.join(",");
          } else {
            selected.textContent = item.textContent;
            selected.dataset.value = item.dataset.value;
            selected.click();
          }
        });
      }
    }
  }
  initSelectedSize() {
    if (this.selectedItem.length) {
      for (let index in Object.keys(this.selectedItem)) {
        const parent = this.selectedItem[index].parentElement, selected = parent.querySelector("li.selected");
        if (selected) {
          this.selectedItem[index].textContent = selected.textContent;
          this.selectedItem[index].dataset.value = selected.dataset.value;
        }
        this.selectedItem[index].addEventListener("click", () => {
          this.selectedItem.forEach((select) => {
            if (select != this.selectedItem[index] && select.parentElement.classList.contains("opened")) {
              select.click();
            }
          });
          parent.scrollTo({
            top: 0,
            behavior: "smooth"
          });
          if (parent && !parent.classList.contains("opened")) {
            parent.classList.add("opened");
          } else {
            parent.classList.remove("opened");
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
          if (!target.matches(".search__select-item-selected") && !target.matches(".search__select-item") && !target.matches(".search__select") && !target.matches(".search__select-checkmark") && !target.matches(".search__select-label")) {
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

/***/ "./js/search/header.js":
/*!*****************************!*\
  !*** ./js/search/header.js ***!
  \*****************************/
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

/***/ "./js/search/list-songs.js":
/*!*********************************!*\
  !*** ./js/search/list-songs.js ***!
  \*********************************/
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
          src: `../${song.img}`,
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

/***/ "./js/search/pagination.js":
/*!*********************************!*\
  !*** ./js/search/pagination.js ***!
  \*********************************/
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
    if (arrayPagination.length > 1) {
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

/***/ "./js/search/results.js":
/*!******************************!*\
  !*** ./js/search/results.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Results)
/* harmony export */ });
/* harmony import */ var _additional_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../additional/html */ "./js/additional/html.js");

class Results {
  constructor() {
    this.results = document.querySelector(".results");
    this.list = document.querySelector(".results__list");
    this.reset = document.querySelector(".results__options-reset");
    this.search;
    if (this.reset) {
      this.onClickReset();
    }
  }
  onClickReset() {
    this.reset.addEventListener("click", () => {
      let artist = this.search.search.querySelector("#artist"), genre = this.search.search.querySelector("#genre .search__select-item-selected"), decade = this.search.search.querySelector("#decade .search__select-item-selected"), country = this.search.search.querySelector("#country .search__select-item-selected");
      this.list.replaceChildren();
      this.results.classList.remove("shown");
      if (artist) {
        artist.value = "";
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
      this.search.search.classList.add("shown");
      this.search.search.querySelector(".search__submit").click();
    });
  }
  setSearch(search) {
    this.search = search;
  }
  renderResults(data) {
    if (this.results) {
      this.results.classList.add("shown");
    }
    if (this.list) {
      this.list.replaceChildren();
      for (let value of data) {
        let splitData = value[1].split(",").filter((param) => param !== "");
        for (let searching of splitData) {
          let li = _additional_html__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("li", "results__list-item", {
            "data-value": searching,
            "data-form": value[0]
          }, searching);
          li.addEventListener("click", () => {
            li.remove();
            let oldItems = this.list.querySelectorAll("li"), newData = {}, sendData = [];
            for (let item of oldItems) {
              const { value: value2, form } = item.dataset;
              if (!newData[form]) {
                newData[form] = [];
              }
              newData[form].push(value2);
            }
            for (let key of Object.keys(newData)) {
              sendData.push([key, newData[key].join(",")]);
            }
            this.search.searchByData(sendData);
          });
          this.list.append(li);
        }
      }
    }
  }
}


/***/ }),

/***/ "./js/search/search.js":
/*!*****************************!*\
  !*** ./js/search/search.js ***!
  \*****************************/
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
    this.results;
    if (this.search) {
      this.init();
      this.onInputArtist();
    }
  }
  setResult(result) {
    this.results = result;
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
    this.results.results.classList.remove("shown");
    this.search.classList.add("shown");
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
        if (searching[1].indexOf(",") !== -1 || search.indexOf(",") !== -1) {
          const arraySearch = search.split(",").filter((value) => value !== ""), arraySearching = searching[1].toLowerCase().split(",").filter((value) => value !== ""), intersection = arraySearch.filter((element) => arraySearching.includes(element));
          count += intersection.length > 0 ? 1 : 0;
        } else {
          count += search.indexOf(searching[1].toLowerCase()) !== -1 ? 1 : 0;
        }
      });
      if (count === data.length) {
        matched.push(song);
      }
    });
    if (!matched.length) {
      matched = JSON.parse(localStorage.getItem("songs"));
    } else {
      this.search.classList.remove("shown");
      this.results.renderResults(data);
    }
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
/*!****************************!*\
  !*** ./js/theme-search.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _additional_get_data_songs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./additional/get-data-songs */ "./js/additional/get-data-songs.js");
/* harmony import */ var _additional_get_data_songs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_additional_get_data_songs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _search_custom_selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./search/custom-selectors */ "./js/search/custom-selectors.js");
/* harmony import */ var _search_pagination__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./search/pagination */ "./js/search/pagination.js");
/* harmony import */ var _search_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./search/search */ "./js/search/search.js");
/* harmony import */ var _search_list_songs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./search/list-songs */ "./js/search/list-songs.js");
/* harmony import */ var _search_header__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./search/header */ "./js/search/header.js");
/* harmony import */ var _search_results__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./search/results */ "./js/search/results.js");







document.addEventListener("DOMContentLoaded", () => {
  const listSongs = new _search_list_songs__WEBPACK_IMPORTED_MODULE_4__["default"](), pagination = new _search_pagination__WEBPACK_IMPORTED_MODULE_2__["default"](listSongs), search = new _search_search__WEBPACK_IMPORTED_MODULE_3__["default"](pagination, listSongs), results = new _search_results__WEBPACK_IMPORTED_MODULE_6__["default"]();
  new _search_custom_selectors__WEBPACK_IMPORTED_MODULE_1__["default"](document.querySelector(".search"));
  new _search_header__WEBPACK_IMPORTED_MODULE_5__["default"]();
  search.setResult(results);
  results.setSearch(search);
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
/*!*******************************!*\
  !*** ./css/theme-search.scss ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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T0FBTztBQUN4QixVQUFRLFVBQVUsTUFBTTtBQUV4QixXQUFTLG1CQUFtQjtBQUN4QixRQUFJLGFBQWEsU0FBUyxpQkFBaUIsa0JBQWtCO0FBRTdELFFBQUksV0FBVyxRQUFRO0FBQ25CLFlBQU0sYUFBYSxXQUFXLENBQUMsRUFBRSxjQUFjLGFBQzNDLFVBQVUsU0FBUyxnQkFBZ0IsY0FBYyxNQUFNLGFBQWE7QUFFeEUsaUJBQVcsUUFBUSxXQUFTO0FBQ3hCLGNBQU0sYUFBYSxTQUFTLEdBQUcsV0FBVztBQUMxQyxjQUFNLGFBQWEsVUFBVSxHQUFHLFdBQVc7QUFBQSxNQUMvQyxDQUFDO0FBQUEsSUFDTDtBQUFBLEVBQ0o7QUFFQSxtQkFBaUI7QUFDakIsU0FBTyxXQUFXO0FBQ3RCLENBQUM7Ozs7Ozs7Ozs7O0FDcENEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vanMvYWRkaXRpb25hbC9nZXQtZGF0YS1zb25ncy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hZGRpdGlvbmFsL2h0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vanMvc2VhcmNoL2N1c3RvbS1zZWxlY3RvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvc2VhcmNoL2hlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9qcy9zZWFyY2gvbGlzdC1zb25ncy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9zZWFyY2gvcGFnaW5hdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9qcy9zZWFyY2gvcmVzdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9zZWFyY2gvc2VhcmNoLmpzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vLi9qcy90aGVtZS1zZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vY3NzL3RoZW1lLXNlYXJjaC5zY3NzIl0sInNvdXJjZXNDb250ZW50IjpbImxldCBzb25ncyA9IFtdO1xuY29uc3QgYmFuZHMgPSBbJ0FDL0RDJywgJ0ltYWdpbmUgRHJhZ29ucycsICdNZXRhbGxpY2EnLCAnU2tpbGxldCddLFxuICAgIGdlbnJlcyA9IFsnUm9jaycsICdGdW5rJywgJ0JlYXRzJywgJ0hpcCBIb3AnLCAnUG9wJywgJ1JhcCddLFxuICAgIGNvdW50cmllcyA9IFsnVVNBJywgJ1VLJywgJ1VBJywgJ1BMJywgJ1VBRScsICdKUCddO1xuXG5mdW5jdGlvbiBnZXRSYW5kb21WYWx1ZShhcnJheSkge1xuICAgIHJldHVybiBhcnJheVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhcnJheS5sZW5ndGgpXTtcbn1cblxuZm9yIChsZXQgaSA9IDE7IGkgPD0gNDg7IGkrKykge1xuICAgIHNvbmdzLnB1c2goe1xuICAgICAgICBpZDogaSxcbiAgICAgICAgZmF2b3JpdGU6IGZhbHNlLFxuICAgICAgICBpbWc6IGBwdWJsaWMvaW1nL3NvbmdzL2xpc3Qvc29uZyR7aX0uanBlZ2AsXG4gICAgICAgIHNvbmc6ICdMZXQgVGhlcmUgQmUgUm9jaycsXG4gICAgICAgIGJhbmQ6IGdldFJhbmRvbVZhbHVlKGJhbmRzKSxcbiAgICAgICAgeWVhcjogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDIwMzAgLSAxOTUwKSkgKyAxOTUwLFxuICAgICAgICBzdHlsZTogW2dldFJhbmRvbVZhbHVlKGdlbnJlcyldLFxuICAgICAgICBjb3VudHJ5OiBnZXRSYW5kb21WYWx1ZShjb3VudHJpZXMpLFxuICAgICAgICBhZGRlZDogZmFsc2VcbiAgICB9KTtcbn1cblxuaWYgKCFsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc29uZ3MnKSkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzb25ncycsIEpTT04uc3RyaW5naWZ5KHNvbmdzKSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3BlclBhZ2UnLCAnNicpO1xufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEhUTUwge1xuICAgIHN0YXRpYyBjcmVhdGVFbGVtZW50KGVsZW1lbnROYW1lLCBjbGFzc05hbWUgPSAnJywgYXR0cmlidXRlcyA9IG51bGwsIHRleHQgPSAnJykge1xuICAgICAgICBpZiAoIWVsZW1lbnROYW1lLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudE5hbWUpO1xuXG4gICAgICAgIGlmIChhdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gYXR0cmlidXRlcykge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgYXR0cmlidXRlc1trZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjbGFzc05hbWUpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRleHQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoSFRNTC5jcmVhdGVUZXh0KHRleHQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIHN0YXRpYyBjcmVhdGVUZXh0KHRleHQgPSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0ZXh0ID8gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCkgOiBudWxsO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1c3RvbVNlbGVjdG9ycyB7XG4gICAgY29uc3RydWN0b3IocGFyZW50KSB7XG4gICAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW0gPSB0aGlzLnBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2VhcmNoX19zZWxlY3QtaXRlbS1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgdGhpcy5pdGVtcyA9IHRoaXMucGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWFyY2hfX3NlbGVjdC1pdGVtJyk7XG4gICAgICAgICAgICB0aGlzLmJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG5cbiAgICAgICAgICAgIHRoaXMuaW5pdFNlbGVjdGVkU2l6ZSgpO1xuICAgICAgICAgICAgdGhpcy5pbml0SXRlbXMoKTtcbiAgICAgICAgICAgIHRoaXMub25DbGlja0JvZHkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXRJdGVtcygpIHtcbiAgICAgICAgaWYgKHRoaXMuaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIHRoaXMuaXRlbXMpIHtcbiAgICAgICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudCA9IGl0ZW0ucGFyZW50RWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfX3NlbGVjdC1pdGVtLXNlbGVjdGVkJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dCA9IGl0ZW0ucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBwYXJlbnQuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmVudC5pZCA9PT0gJ2dlbnJlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuY2hlY2tlZCA9ICFpbnB1dC5jaGVja2VkO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VhcmNoaW5nID0gc2VsZWN0ZWQuZGF0YXNldC52YWx1ZS5zcGxpdCgnLCcpLmZpbHRlcihnZW5yZSA9PiBnZW5yZSAhPT0gJycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0gc2VhcmNoaW5nLmZpbmRJbmRleCh2YWx1ZSA9PiB2YWx1ZS50b0xvd2VyQ2FzZSgpID09PSBpdGVtLmRhdGFzZXQudmFsdWUudG9Mb3dlckNhc2UoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hpbmcuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoaW5nLnB1c2goaXRlbS50ZXh0Q29udGVudC5yZXBsYWNlKC8oXFxyXFxufFxcbnxcXHIpL2dtLCBcIlwiKS5yZXBsYWNlQWxsKCcgJywgJycpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQudGV4dENvbnRlbnQgPSAhc2VhcmNoaW5nLmxlbmd0aCA/IHNlbGVjdGVkLmRhdGFzZXQuZGVmYXVsdCA6IHNlYXJjaGluZy5qb2luKCcsJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZC5kYXRhc2V0LnZhbHVlID0gc2VhcmNoaW5nLmpvaW4oJywnKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkLnRleHRDb250ZW50ID0gaXRlbS50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkLmRhdGFzZXQudmFsdWUgPSBpdGVtLmRhdGFzZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZC5jbGljaygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0U2VsZWN0ZWRTaXplKCkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZEl0ZW0ubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCBpbiBPYmplY3Qua2V5cyh0aGlzLnNlbGVjdGVkSXRlbSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLnNlbGVjdGVkSXRlbVtpbmRleF0ucGFyZW50RWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBwYXJlbnQucXVlcnlTZWxlY3RvcignbGkuc2VsZWN0ZWQnKTtcblxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbVtpbmRleF0udGV4dENvbnRlbnQgPSBzZWxlY3RlZC50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1baW5kZXhdLmRhdGFzZXQudmFsdWUgPSBzZWxlY3RlZC5kYXRhc2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtW2luZGV4XS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW0uZm9yRWFjaChzZWxlY3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdCAhPSB0aGlzLnNlbGVjdGVkSXRlbVtpbmRleF0gJiYgc2VsZWN0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdvcGVuZWQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdC5jbGljaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBwYXJlbnQuc2Nyb2xsVG8oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnQgJiYgIXBhcmVudC5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW5lZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQuY2xhc3NMaXN0LmFkZCgnb3BlbmVkJyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbmVkJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ2xpY2tCb2R5KCkge1xuICAgICAgICBpZiAodGhpcy5ib2R5KSB7XG4gICAgICAgICAgICB0aGlzLmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qge3RhcmdldH0gPSBldmVudDtcblxuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0YXJnZXQubWF0Y2hlcygnLnNlYXJjaF9fc2VsZWN0LWl0ZW0tc2VsZWN0ZWQnKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgIXRhcmdldC5tYXRjaGVzKCcuc2VhcmNoX19zZWxlY3QtaXRlbScpICYmICF0YXJnZXQubWF0Y2hlcygnLnNlYXJjaF9fc2VsZWN0JykgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICF0YXJnZXQubWF0Y2hlcygnLnNlYXJjaF9fc2VsZWN0LWNoZWNrbWFyaycpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAhdGFyZ2V0Lm1hdGNoZXMoJy5zZWFyY2hfX3NlbGVjdC1sYWJlbCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbS5mb3JFYWNoKHNlbGVjdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnb3BlbmVkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0LmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBIZWFkZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJhY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19jb250YWluZXItYmFjaycpO1xuICAgICAgICB0aGlzLmZhdm9yaXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fY29udGFpbmVyLWl0ZW0uZmF2b3JpdGUnKTtcbiAgICAgICAgdGhpcy5zYXZlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2NvbnRhaW5lci1pdGVtLnNhdmVkJyk7XG4gICAgICAgIHRoaXMuc3VibWl0U2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaF9fc3VibWl0Jyk7XG5cbiAgICAgICAgdGhpcy5vbkNsaWNrQmFjaygpO1xuICAgICAgICB0aGlzLm9uQ2xpY2tGYXZvcml0ZSgpO1xuICAgICAgICB0aGlzLm9uQ2xpY2tTYXZlZCgpO1xuICAgIH1cblxuICAgIG9uQ2xpY2tCYWNrKCkge1xuICAgICAgICBpZiAodGhpcy5iYWNrKSB7XG4gICAgICAgICAgICB0aGlzLmJhY2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaGlzdG9yeS5iYWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ2xpY2tGYXZvcml0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZmF2b3JpdGUpIHtcbiAgICAgICAgICAgIHRoaXMuZmF2b3JpdGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmF2b3JpdGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3RlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmF2b3JpdGUuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZhdm9yaXRlLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5zdWJtaXRTZWFyY2guY2xpY2soKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25DbGlja1NhdmVkKCkge1xuICAgICAgICBpZiAodGhpcy5zYXZlZCkge1xuICAgICAgICAgICAgdGhpcy5zYXZlZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zYXZlZC5jbGFzc0xpc3QuY29udGFpbnMoJ3NlbGVjdGVkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXZlZC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2F2ZWQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnN1Ym1pdFNlYXJjaC5jbGljaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IEhUTUwgZnJvbSBcIi4uL2FkZGl0aW9uYWwvaHRtbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0U29uZ3Mge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnBlclBhZ2UgPSBwYXJzZUludChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGVyUGFnZScpKTtcbiAgICAgICAgdGhpcy5hbGxTb25ncyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NvbmdzJykpO1xuICAgICAgICB0aGlzLnBhcmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zb25ncycpO1xuICAgIH1cblxuICAgIHNldEFsbFNvbmdzKGFsbFNvbmdzKSB7XG4gICAgICAgIHRoaXMuYWxsU29uZ3MgPSBhbGxTb25ncztcbiAgICB9XG5cbiAgICByZW5kZXJTb25ncyhzdGFydCkge1xuICAgICAgICBjb25zdCBzb25nc1RvUmVuZGVyID0gdGhpcy5hbGxTb25ncy5zbGljZShzdGFydCwgc3RhcnQgKyB0aGlzLnBlclBhZ2UpO1xuXG4gICAgICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQucmVwbGFjZUNoaWxkcmVuKCk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IHNvbmcgb2Ygc29uZ3NUb1JlbmRlcikge1xuICAgICAgICAgICAgICAgIGxldCBsaSA9IEhUTUwuY3JlYXRlRWxlbWVudCgnbGknLCAnc29uZ3NfX2l0ZW0nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnZGF0YS1pZCc6IHNvbmcuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGF0YS1mYXZvcml0ZSc6IHNvbmcuZmF2b3JpdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGF0YS1zYXZlZCc6IHNvbmcuYWRkZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGF0YS1hcnRpc3QnOiBzb25nLmJhbmQsXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGF0YS1nZW5yZSc6IHNvbmcuc3R5bGUuam9pbignLCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEtZGVjYWRlJzogc29uZy55ZWFyLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEtY291bnRyeSc6IHNvbmcuY291bnRyeSxcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIGltZyA9IEhUTUwuY3JlYXRlRWxlbWVudCgnaW1nJywgJ3NvbmdzX19pdGVtLWltZycsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogYC4uLyR7c29uZy5pbWd9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsdDogc29uZy5zb25nLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcxNjlweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcxNjlweCdcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlID0gSFRNTC5jcmVhdGVFbGVtZW50KCdzcGFuJywgJ3NvbmdzX19pdGVtLWZhdm9yaXRlJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEtZmF2b3JpdGUnOiBzb25nLmZhdm9yaXRlXG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICBzb25nRGF0YUNvbnRhaW5lciA9IEhUTUwuY3JlYXRlRWxlbWVudCgnZGl2JywgJ3NvbmdzX19pdGVtLWNvbnRhaW5lcicpLFxuICAgICAgICAgICAgICAgICAgICBzb25nTmFtZSA9IEhUTUwuY3JlYXRlRWxlbWVudCgnaDInLCAnc29uZ3NfX2l0ZW0tc29uZycsIHt9LCBzb25nLnNvbmcpLFxuICAgICAgICAgICAgICAgICAgICBzb25nQmFuZCA9IEhUTUwuY3JlYXRlRWxlbWVudCgnaDMnLCAnc29uZ3NfX2l0ZW0tYmFuZCcsIHt9LCBzb25nLmJhbmQpLFxuICAgICAgICAgICAgICAgICAgICBzb25nWWVhciA9IEhUTUwuY3JlYXRlRWxlbWVudCgnc3BhbicsICdzb25nc19faXRlbS15ZWFyJywge30sICdZZWFyIDogJyksXG4gICAgICAgICAgICAgICAgICAgIHNvbmdZZWFyQmFuZCA9IEhUTUwuY3JlYXRlRWxlbWVudCgnc3BhbicsICcnLCB7fSwgc29uZy55ZWFyKSxcbiAgICAgICAgICAgICAgICAgICAgc29uZ1N0eWxlID0gSFRNTC5jcmVhdGVFbGVtZW50KCdzcGFuJywgJ3NvbmdzX19pdGVtLXN0eWxlJywge30sICdTdHlsZSA6ICcpLFxuICAgICAgICAgICAgICAgICAgICBzb25nU3R5bGVCYW5kID0gSFRNTC5jcmVhdGVFbGVtZW50KCdzcGFuJywgJycsIHt9LCBzb25nLnN0eWxlLmpvaW4oJywnKSksXG4gICAgICAgICAgICAgICAgICAgIHNvbmdDb3VudHJ5ID0gSFRNTC5jcmVhdGVFbGVtZW50KCdzcGFuJywgJ3NvbmdzX19pdGVtLWNvdW50cnknLCB7fSwgJ0NvdW50cnkgOiAnKSxcbiAgICAgICAgICAgICAgICAgICAgc29uZ0NvdW50cnlCYW5kID0gSFRNTC5jcmVhdGVFbGVtZW50KCdzcGFuJywgJycsIHt9LCBzb25nLmNvdW50cnkpLFxuICAgICAgICAgICAgICAgICAgICBzb25nQWRkID0gSFRNTC5jcmVhdGVFbGVtZW50KCdidXR0b24nLCAnc29uZ3NfX2l0ZW0tYWRkJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2J1dHRvbidcbiAgICAgICAgICAgICAgICAgICAgfSwgJ0FkZCcpO1xuXG4gICAgICAgICAgICAgICAgc29uZ1llYXIuYXBwZW5kKHNvbmdZZWFyQmFuZCk7XG4gICAgICAgICAgICAgICAgc29uZ1N0eWxlLmFwcGVuZChzb25nU3R5bGVCYW5kKTtcbiAgICAgICAgICAgICAgICBzb25nQ291bnRyeS5hcHBlbmQoc29uZ0NvdW50cnlCYW5kKTtcbiAgICAgICAgICAgICAgICBzb25nRGF0YUNvbnRhaW5lci5hcHBlbmQoc29uZ05hbWUsIHNvbmdCYW5kLCBzb25nWWVhciwgc29uZ1N0eWxlLCBzb25nQ291bnRyeSwgc29uZ0FkZClcbiAgICAgICAgICAgICAgICBsaS5hcHBlbmQoaW1nLCBmYXZvcml0ZSwgc29uZ0RhdGFDb250YWluZXIpO1xuICAgICAgICAgICAgICAgIGZhdm9yaXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmNoYW5nZURhdGEoc29uZy5pZCwgJ2Zhdm9yaXRlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGkuZGF0YXNldC5mYXZvcml0ZSA9IHJlc3VsdC50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZS5kYXRhc2V0LmZhdm9yaXRlID0gcmVzdWx0LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc29uZ0FkZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5jaGFuZ2VEYXRhKHNvbmcuaWQsICdhZGRlZCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxpLmRhdGFzZXQuYWRkZWQgPSByZXN1bHQudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGUuZGF0YXNldC5hZGRlZCA9IHJlc3VsdC50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICB0aGlzLnBhcmVudC5hcHBlbmQobGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hhbmdlRGF0YShpZCwgbmFtZSkge1xuICAgICAgICBjb25zdCBhbGxTb25ncyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NvbmdzJykpLFxuICAgICAgICAgICAgaW5kZXggPSBhbGxTb25ncy5maW5kSW5kZXgoc29uZyA9PiBzb25nLmlkID09PSBpZCk7XG5cbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBuYW1lICE9PSAnYWRkZWQnID8gIWFsbFNvbmdzW2luZGV4XVtuYW1lXSA6IHRydWU7XG5cbiAgICAgICAgICAgIGFsbFNvbmdzW2luZGV4XVtuYW1lXSA9IHZhbHVlO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3NvbmdzJywgSlNPTi5zdHJpbmdpZnkoYWxsU29uZ3MpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCBIVE1MIGZyb20gXCIuLi9hZGRpdGlvbmFsL2h0bWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFnaW5hdGlvbiB7XG4gICAgY29uc3RydWN0b3IobGlzdFNvbmdzKSB7XG4gICAgICAgIHRoaXMucGFnaW5hdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdpbmF0aW9uJyk7XG5cbiAgICAgICAgaWYgKHRoaXMucGFnaW5hdGlvbikge1xuICAgICAgICAgICAgdGhpcy5saXN0U29uZ3MgPSBsaXN0U29uZ3M7XG4gICAgICAgICAgICB0aGlzLnBlclBhZ2UgPSBwYXJzZUludChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGVyUGFnZScpKTtcbiAgICAgICAgICAgIHRoaXMuYWxsU29uZ3NMZW5ndGggPSBwYXJzZUludChKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzb25ncycpKS5sZW5ndGgpO1xuICAgICAgICAgICAgdGhpcy5wYWdlQ291bnQgPSBNYXRoLmNlaWwodGhpcy5hbGxTb25nc0xlbmd0aCAvIHRoaXMucGVyUGFnZSk7XG4gICAgICAgICAgICB0aGlzLnVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gcGFyc2VJbnQodGhpcy51cmxQYXJhbXMuZ2V0KCdwYWdlJykpIHx8IDE7XG5cbiAgICAgICAgICAgIHRoaXMubGlzdFNvbmdzLnJlbmRlclNvbmdzKHRoaXMuZ2V0U3RhcnRMaXN0U29uZ3MoKSk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclBhZ2luYXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFBhZ2VDb3VudChwYWdlQ291bnQpIHtcbiAgICAgICAgdGhpcy5wYWdlQ291bnQgPSBwYWdlQ291bnQ7XG4gICAgfVxuXG4gICAgcmVuZGVyUGFnaW5hdGlvbigpIHtcbiAgICAgICAgY29uc3QgYXJyYXlQYWdpbmF0aW9uID0gdGhpcy5nZXRQYWdpbmF0aW9uKHRoaXMuY3VycmVudFBhZ2UsIHRoaXMucGFnZUNvdW50KTtcblxuICAgICAgICB0aGlzLnBhZ2luYXRpb24ucmVwbGFjZUNoaWxkcmVuKCk7XG5cbiAgICAgICAgaWYgKGFycmF5UGFnaW5hdGlvbi5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBhcnJheVBhZ2luYXRpb24uZm9yRWFjaChwYWdlID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcGFnZUJ1dHRvbiA9IEhUTUwuY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgJ3BhZ2luYXRpb25fX3BhZ2UnLCB7XG4gICAgICAgICAgICAgICAgICAgICdkYXRhLWluZGV4JzogcGFnZSxcbiAgICAgICAgICAgICAgICAgICAgJ2FyaWEtbGFiZWwnOiBgUGFnZSAke3BhZ2V9YFxuICAgICAgICAgICAgICAgIH0sIHBhZ2UpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9PT0gcGFnZSA/IHBhZ2VCdXR0b24uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKSA6ICcnO1xuXG4gICAgICAgICAgICAgICAgcGFnZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhZ2UgIT09ICcuLi4nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdCgnPycpWzBdICsgKHBhZ2UgIT09IDEgPyBgP3BhZ2U9JHtwYWdlfWAgOiAnJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2luYXRpb24ucmVwbGFjZUNoaWxkcmVuKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gcGFnZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIFwiXCIsIHVybCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdFNvbmdzLnJlbmRlclNvbmdzKHRoaXMuZ2V0U3RhcnRMaXN0U29uZ3MoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclBhZ2luYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdpbmF0aW9uLmFwcGVuZChwYWdlQnV0dG9uKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5saXN0U29uZ3MucmVuZGVyU29uZ3ModGhpcy5nZXRTdGFydExpc3RTb25ncygpKTtcbiAgICB9XG5cbiAgICBnZXRQYWdpbmF0aW9uKGN1cnJlbnRQYWdlLCBwYWdlQ291bnQpIHtcbiAgICAgICAgbGV0IGRlbHRhO1xuXG4gICAgICAgIGlmIChwYWdlQ291bnQgPD0gNykge1xuICAgICAgICAgICAgZGVsdGEgPSA3O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsdGEgPSBjdXJyZW50UGFnZSA+IDQgJiYgY3VycmVudFBhZ2UgPCBwYWdlQ291bnQgLSAzID8gMiA6IDQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByYW5nZSA9IHtcbiAgICAgICAgICAgIHN0YXJ0OiBNYXRoLnJvdW5kKGN1cnJlbnRQYWdlIC0gZGVsdGEgLyAyKSxcbiAgICAgICAgICAgIGVuZDogTWF0aC5yb3VuZChjdXJyZW50UGFnZSArIGRlbHRhIC8gMilcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAocmFuZ2Uuc3RhcnQgLSAxID09PSAxIHx8IHJhbmdlLmVuZCArIDEgPT09IHBhZ2VDb3VudCkge1xuICAgICAgICAgICAgcmFuZ2Uuc3RhcnQgKz0gMTtcbiAgICAgICAgICAgIHJhbmdlLmVuZCArPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHBhZ2VzID0gY3VycmVudFBhZ2UgPiBkZWx0YSA/XG4gICAgICAgICAgICB0aGlzLmdldFJhbmdlKE1hdGgubWluKHJhbmdlLnN0YXJ0LCBwYWdlQ291bnQgLSBkZWx0YSksIE1hdGgubWluKHJhbmdlLmVuZCwgcGFnZUNvdW50KSkgOlxuICAgICAgICAgICAgdGhpcy5nZXRSYW5nZSgxLCBNYXRoLm1pbihwYWdlQ291bnQsIGRlbHRhICsgMSkpO1xuXG4gICAgICAgIGNvbnN0IHdpdGhEb3RzID0gKHZhbHVlLCBwYWlyKSA9PiAocGFnZXMubGVuZ3RoICsgMSAhPT0gcGFnZUNvdW50ID8gcGFpciA6IFt2YWx1ZV0pO1xuXG4gICAgICAgIGlmIChwYWdlc1swXSAhPT0gMSkge1xuICAgICAgICAgICAgcGFnZXMgPSB3aXRoRG90cygxLCBbMSwgJy4uLiddKS5jb25jYXQocGFnZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhZ2VzW3BhZ2VzLmxlbmd0aCAtIDFdIDwgcGFnZUNvdW50KSB7XG4gICAgICAgICAgICBwYWdlcyA9IHBhZ2VzLmNvbmNhdCh3aXRoRG90cyhwYWdlQ291bnQsIFsnLi4uJywgcGFnZUNvdW50XSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhZ2VzO1xuICAgIH1cblxuICAgIGdldFJhbmdlKHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5KGVuZCAtIHN0YXJ0ICsgMSkuZmlsbCgpLm1hcCgodiwgaSkgPT4gaSArIHN0YXJ0KTtcbiAgICB9XG5cbiAgICBnZXRTdGFydExpc3RTb25ncygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGVyUGFnZSAqICh0aGlzLmN1cnJlbnRQYWdlIC0gMSk7XG4gICAgfVxufSIsImltcG9ydCBIVE1MIGZyb20gXCIuLi9hZGRpdGlvbmFsL2h0bWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzdWx0cyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucmVzdWx0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXN1bHRzJyk7XG4gICAgICAgIHRoaXMubGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXN1bHRzX19saXN0Jyk7XG4gICAgICAgIHRoaXMucmVzZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzdWx0c19fb3B0aW9ucy1yZXNldCcpO1xuICAgICAgICB0aGlzLnNlYXJjaDtcblxuICAgICAgICBpZiAodGhpcy5yZXNldCkge1xuICAgICAgICAgICAgdGhpcy5vbkNsaWNrUmVzZXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ2xpY2tSZXNldCgpIHtcbiAgICAgICAgdGhpcy5yZXNldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBhcnRpc3QgPSB0aGlzLnNlYXJjaC5zZWFyY2gucXVlcnlTZWxlY3RvcignI2FydGlzdCcpLFxuICAgICAgICAgICAgICAgIGdlbnJlID0gdGhpcy5zZWFyY2guc2VhcmNoLnF1ZXJ5U2VsZWN0b3IoJyNnZW5yZSAuc2VhcmNoX19zZWxlY3QtaXRlbS1zZWxlY3RlZCcpLFxuICAgICAgICAgICAgICAgIGRlY2FkZSA9IHRoaXMuc2VhcmNoLnNlYXJjaC5xdWVyeVNlbGVjdG9yKCcjZGVjYWRlIC5zZWFyY2hfX3NlbGVjdC1pdGVtLXNlbGVjdGVkJyksXG4gICAgICAgICAgICAgICAgY291bnRyeSA9IHRoaXMuc2VhcmNoLnNlYXJjaC5xdWVyeVNlbGVjdG9yKCcjY291bnRyeSAuc2VhcmNoX19zZWxlY3QtaXRlbS1zZWxlY3RlZCcpO1xuICAgICAgICAgICAgdGhpcy5saXN0LnJlcGxhY2VDaGlsZHJlbigpO1xuICAgICAgICAgICAgdGhpcy5yZXN1bHRzLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3duJyk7XG5cbiAgICAgICAgICAgIGlmIChhcnRpc3QpIHtcbiAgICAgICAgICAgICAgICBhcnRpc3QudmFsdWUgPSAnJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGdlbnJlKSB7XG4gICAgICAgICAgICAgICAgZ2VucmUuZGF0YXNldC52YWx1ZSA9IGdlbnJlLmRhdGFzZXQuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICBnZW5yZS50ZXh0Q29udGVudCA9IGdlbnJlLmRhdGFzZXQuZGVmYXVsdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRlY2FkZSkge1xuICAgICAgICAgICAgICAgIGRlY2FkZS5kYXRhc2V0LnZhbHVlID0gZGVjYWRlLmRhdGFzZXQuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICBkZWNhZGUudGV4dENvbnRlbnQgPSBkZWNhZGUuZGF0YXNldC5kZWZhdWx0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY291bnRyeSkge1xuICAgICAgICAgICAgICAgIGNvdW50cnkuZGF0YXNldC52YWx1ZSA9IGNvdW50cnkuZGF0YXNldC5kZWZhdWx0O1xuICAgICAgICAgICAgICAgIGNvdW50cnkudGV4dENvbnRlbnQgPSBjb3VudHJ5LmRhdGFzZXQuZGVmYXVsdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZWFyY2guc2VhcmNoLmNsYXNzTGlzdC5hZGQoJ3Nob3duJyk7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaC5zZWFyY2gucXVlcnlTZWxlY3RvcignLnNlYXJjaF9fc3VibWl0JykuY2xpY2soKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0U2VhcmNoKHNlYXJjaCkge1xuICAgICAgICB0aGlzLnNlYXJjaCA9IHNlYXJjaDtcbiAgICB9XG5cbiAgICByZW5kZXJSZXN1bHRzKGRhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMucmVzdWx0cykge1xuICAgICAgICAgICAgdGhpcy5yZXN1bHRzLmNsYXNzTGlzdC5hZGQoJ3Nob3duJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5saXN0KSB7XG4gICAgICAgICAgICB0aGlzLmxpc3QucmVwbGFjZUNoaWxkcmVuKCk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IHZhbHVlIG9mIGRhdGEpIHtcbiAgICAgICAgICAgICAgICBsZXQgc3BsaXREYXRhID0gdmFsdWVbMV0uc3BsaXQoJywnKS5maWx0ZXIocGFyYW0gPT4gcGFyYW0gIT09ICcnKTtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IHNlYXJjaGluZyBvZiBzcGxpdERhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxpID0gSFRNTC5jcmVhdGVFbGVtZW50KCdsaScsICdyZXN1bHRzX19saXN0LWl0ZW0nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnZGF0YS12YWx1ZSc6IHNlYXJjaGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhLWZvcm0nOiB2YWx1ZVswXVxuICAgICAgICAgICAgICAgICAgICB9LCBzZWFyY2hpbmcpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaS5yZW1vdmUoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9sZEl0ZW1zID0gdGhpcy5saXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3RGF0YSA9IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbmREYXRhID0gW107XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGl0ZW0gb2Ygb2xkSXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7dmFsdWUsIGZvcm19ID0gaXRlbS5kYXRhc2V0O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFuZXdEYXRhW2Zvcm1dKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0RhdGFbZm9ybV0gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdEYXRhW2Zvcm1dLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXMobmV3RGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZW5kRGF0YS5wdXNoKFtrZXksIG5ld0RhdGFba2V5XS5qb2luKCcsJyldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2guc2VhcmNoQnlEYXRhKHNlbmREYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0LmFwcGVuZChsaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaCB7XG4gICAgY29uc3RydWN0b3IocGFnaW5hdGlvbiwgbGlzdFNvbmdzKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaCcpO1xuICAgICAgICB0aGlzLmFsbFNvbmdzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc29uZ3MnKSk7XG4gICAgICAgIHRoaXMucGVyUGFnZSA9IHBhcnNlSW50KGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwZXJQYWdlJykpO1xuICAgICAgICB0aGlzLnBhZ2luYXRpb24gPSBwYWdpbmF0aW9uO1xuICAgICAgICB0aGlzLmxpc3RTb25ncyA9IGxpc3RTb25ncztcbiAgICAgICAgdGhpcy5zZWFyY2hBcnRpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoX19hcnRpc3QnKTtcbiAgICAgICAgdGhpcy5yZXN1bHRzO1xuXG4gICAgICAgIGlmICh0aGlzLnNlYXJjaCkge1xuICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgICAgICB0aGlzLm9uSW5wdXRBcnRpc3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFJlc3VsdChyZXN1bHQpIHtcbiAgICAgICAgdGhpcy5yZXN1bHRzID0gcmVzdWx0O1xuICAgIH1cblxuICAgIG9uSW5wdXRBcnRpc3QoKSB7XG4gICAgICAgIGlmICh0aGlzLnNlYXJjaEFydGlzdCkge1xuICAgICAgICAgICAgY29uc3Qge2xlbmd0aH0gPSB0aGlzLnNlYXJjaEFydGlzdC5kYXRhc2V0O1xuXG4gICAgICAgICAgICB0aGlzLnNlYXJjaEFydGlzdC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWFyY2hBcnRpc3QudmFsdWUubGVuZ3RoID4gbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoQXJ0aXN0Lm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QuYWRkKCdzaG93bicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoQXJ0aXN0Lm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QucmVtb3ZlKCdzaG93bicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5zZWFyY2guYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgbGV0IGRhdGEgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IGFydGlzdCA9IHRoaXMuc2VhcmNoLnF1ZXJ5U2VsZWN0b3IoJyNhcnRpc3QnKSxcbiAgICAgICAgICAgICAgICBnZW5yZSA9IHRoaXMuc2VhcmNoLnF1ZXJ5U2VsZWN0b3IoJyNnZW5yZSAuc2VhcmNoX19zZWxlY3QtaXRlbS1zZWxlY3RlZCcpLFxuICAgICAgICAgICAgICAgIGRlY2FkZSA9IHRoaXMuc2VhcmNoLnF1ZXJ5U2VsZWN0b3IoJyNkZWNhZGUgLnNlYXJjaF9fc2VsZWN0LWl0ZW0tc2VsZWN0ZWQnKSxcbiAgICAgICAgICAgICAgICBjb3VudHJ5ID0gdGhpcy5zZWFyY2gucXVlcnlTZWxlY3RvcignI2NvdW50cnkgLnNlYXJjaF9fc2VsZWN0LWl0ZW0tc2VsZWN0ZWQnKSxcbiAgICAgICAgICAgICAgICBmYXZvcml0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2NvbnRhaW5lci1pdGVtLmZhdm9yaXRlLnNlbGVjdGVkJyksXG4gICAgICAgICAgICAgICAgc2F2ZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19jb250YWluZXItaXRlbS5zYXZlZC5zZWxlY3RlZCcpO1xuXG4gICAgICAgICAgICBhcnRpc3QudmFsdWUgPyBkYXRhLnB1c2goWydiYW5kJywgYXJ0aXN0LnZhbHVlXSkgOiAnJztcbiAgICAgICAgICAgIGdlbnJlLmRhdGFzZXQudmFsdWUgPyBkYXRhLnB1c2goWydzdHlsZScsIGdlbnJlLmRhdGFzZXQudmFsdWVdKSA6ICcnO1xuICAgICAgICAgICAgZGVjYWRlLmRhdGFzZXQudmFsdWUgPyBkYXRhLnB1c2goWyd5ZWFyJywgZGVjYWRlLmRhdGFzZXQudmFsdWVdKSA6ICcnO1xuICAgICAgICAgICAgY291bnRyeS5kYXRhc2V0LnZhbHVlID8gZGF0YS5wdXNoKFsnY291bnRyeScsIGNvdW50cnkuZGF0YXNldC52YWx1ZV0pIDogJyc7XG4gICAgICAgICAgICBmYXZvcml0ZSA/IGRhdGEucHVzaChbJ2Zhdm9yaXRlJywgJ3RydWUnXSkgOiAnJztcbiAgICAgICAgICAgIHNhdmVkID8gZGF0YS5wdXNoKFsnYWRkZWQnLCAndHJ1ZSddKSA6ICcnO1xuXG4gICAgICAgICAgICB0aGlzLnNlYXJjaEJ5RGF0YShkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2VhcmNoQnlEYXRhKGRhdGEpIHtcbiAgICAgICAgbGV0IG1hdGNoZWQgPSBbXTtcbiAgICAgICAgdGhpcy5yZXN1bHRzLnJlc3VsdHMuY2xhc3NMaXN0LnJlbW92ZSgnc2hvd24nKTtcbiAgICAgICAgdGhpcy5zZWFyY2guY2xhc3NMaXN0LmFkZCgnc2hvd24nKTtcblxuICAgICAgICB0aGlzLmFsbFNvbmdzLmZvckVhY2goc29uZyA9PiB7XG4gICAgICAgICAgICBsZXQgY291bnQgPSAwO1xuXG4gICAgICAgICAgICBkYXRhLmZvckVhY2goc2VhcmNoaW5nID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgc2VhcmNoID0gc29uZ1tzZWFyY2hpbmdbMF1dLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc2VhcmNoID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaCA9IHNlYXJjaC5qb2luKCcsJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghaXNOYU4oTnVtYmVyKHNlYXJjaCkpICYmIHNlYXJjaGluZ1swXSA9PT0gJ3llYXInKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhcnJheVllYXJzID0gc2VhcmNoaW5nWzFdLnNwbGl0KCctJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCtzZWFyY2ggPj0gK2FycmF5WWVhcnNbMF0gJiYgK3NlYXJjaCA8PSArYXJyYXlZZWFyc1sxXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChzZWFyY2hpbmdbMV0uaW5kZXhPZignLCcpICE9PSAtMSB8fCBzZWFyY2guaW5kZXhPZignLCcpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhcnJheVNlYXJjaCA9IHNlYXJjaC5zcGxpdCgnLCcpLmZpbHRlcih2YWx1ZSA9PiB2YWx1ZSAhPT0gJycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyYXlTZWFyY2hpbmcgPSBzZWFyY2hpbmdbMV0udG9Mb3dlckNhc2UoKS5zcGxpdCgnLCcpLmZpbHRlcih2YWx1ZSA9PiB2YWx1ZSAhPT0gJycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJzZWN0aW9uID0gYXJyYXlTZWFyY2guZmlsdGVyKGVsZW1lbnQgPT4gYXJyYXlTZWFyY2hpbmcuaW5jbHVkZXMoZWxlbWVudCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ICs9IGludGVyc2VjdGlvbi5sZW5ndGggPiAwID8gMSA6IDA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY291bnQgKz0gc2VhcmNoLmluZGV4T2Yoc2VhcmNoaW5nWzFdLnRvTG93ZXJDYXNlKCkpICE9PSAtMSA/IDEgOiAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoY291bnQgPT09IGRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbWF0Y2hlZC5wdXNoKHNvbmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIW1hdGNoZWQubGVuZ3RoKSB7XG4gICAgICAgICAgICBtYXRjaGVkID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc29uZ3MnKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93bicpO1xuICAgICAgICAgICAgdGhpcy5yZXN1bHRzLnJlbmRlclJlc3VsdHMoZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxpc3RTb25ncy5zZXRBbGxTb25ncyhtYXRjaGVkKTtcbiAgICAgICAgdGhpcy5wYWdpbmF0aW9uLnNldFBhZ2VDb3VudChNYXRoLmNlaWwobWF0Y2hlZC5sZW5ndGggLyB0aGlzLnBlclBhZ2UpIHx8IDEpO1xuICAgICAgICB0aGlzLnBhZ2luYXRpb24ucmVuZGVyUGFnaW5hdGlvbigpO1xuXG4gICAgICAgIGxldCBwYWdpbmF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2luYXRpb25fX3BhZ2UnKTtcblxuICAgICAgICBpZiAocGFnaW5hdGlvbikge1xuICAgICAgICAgICAgcGFnaW5hdGlvbi5jbGljaygpO1xuICAgICAgICB9XG4gICAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4vYWRkaXRpb25hbC9nZXQtZGF0YS1zb25ncyc7XG5pbXBvcnQgQ3VzdG9tU2VsZWN0b3JzIGZyb20gXCIuL3NlYXJjaC9jdXN0b20tc2VsZWN0b3JzXCI7XG5pbXBvcnQgUGFnaW5hdGlvbiBmcm9tIFwiLi9zZWFyY2gvcGFnaW5hdGlvblwiO1xuaW1wb3J0IFNlYXJjaCBmcm9tIFwiLi9zZWFyY2gvc2VhcmNoXCI7XG5pbXBvcnQgTGlzdFNvbmdzIGZyb20gXCIuL3NlYXJjaC9saXN0LXNvbmdzXCI7XG5pbXBvcnQgSGVhZGVyIGZyb20gXCIuL3NlYXJjaC9oZWFkZXJcIjtcbmltcG9ydCBSZXN1bHRzIGZyb20gXCIuL3NlYXJjaC9yZXN1bHRzXCI7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgICBjb25zdCBsaXN0U29uZ3MgPSBuZXcgTGlzdFNvbmdzKCksXG4gICAgICAgIHBhZ2luYXRpb24gPSBuZXcgUGFnaW5hdGlvbihsaXN0U29uZ3MpLFxuICAgICAgICBzZWFyY2ggPSBuZXcgU2VhcmNoKHBhZ2luYXRpb24sIGxpc3RTb25ncyksXG4gICAgICAgIHJlc3VsdHMgPSBuZXcgUmVzdWx0cygpO1xuXG4gICAgbmV3IEN1c3RvbVNlbGVjdG9ycyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoJykpO1xuICAgIG5ldyBIZWFkZXIoKTtcblxuICAgIHNlYXJjaC5zZXRSZXN1bHQocmVzdWx0cyk7XG4gICAgcmVzdWx0cy5zZXRTZWFyY2goc2VhcmNoKTtcblxuICAgIGZ1bmN0aW9uIGNoYW5nZVNpemVJbWFnZXMoKSB7XG4gICAgICAgIGxldCBsaXN0SW1hZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNvbmdzX19pdGVtLWltZycpO1xuXG4gICAgICAgIGlmIChsaXN0SW1hZ2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgcGFyZW50U2l6ZSA9IGxpc3RJbWFnZXNbMF0ucGFyZW50RWxlbWVudC5vZmZzZXRXaWR0aCxcbiAgICAgICAgICAgICAgICBuZXdTaXplID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIDwgMzkwID8gcGFyZW50U2l6ZSA6IDE2OTtcblxuICAgICAgICAgICAgbGlzdEltYWdlcy5mb3JFYWNoKGltYWdlID0+IHtcbiAgICAgICAgICAgICAgICBpbWFnZS5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgYCR7bmV3U2l6ZX1weGApO1xuICAgICAgICAgICAgICAgIGltYWdlLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgYCR7bmV3U2l6ZX1weGApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGFuZ2VTaXplSW1hZ2VzKCk7XG4gICAgd2luZG93Lm9ucmVzaXplID0gY2hhbmdlU2l6ZUltYWdlcztcbn0pOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6WyJ2YWx1ZSJdLCJzb3VyY2VSb290IjoiIn0=