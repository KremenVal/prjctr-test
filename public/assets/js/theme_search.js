/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/additional/get-data-songs.js":
/*!*****************************************!*\
  !*** ./js/additional/get-data-songs.js ***!
  \*****************************************/
/***/ (() => {

let songs = [];
const bands = ["AC/DC", "Imagine Dragons", "Metallica", "Skillet"], genres = ["Rock", "Funk", "Beats", "Hip Hop", "Pop", "Rap"], songsList = ["One More Time", "Aerodynamic", "Digital Love", "Let There Be Rock"], countries = ["USA", "UK", "UA", "PL", "UAE", "JP"];
function getRandomValue(array) {
  return array[Math.floor(Math.random() * array.length)];
}
for (let i = 1; i <= 48; i++) {
  songs.push({
    id: i,
    favorite: false,
    img: `public/img/songs/list/song${i}.jpeg`,
    song: getRandomValue(songsList),
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
/* harmony import */ var _additional_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../additional/html */ "./js/additional/html.js");

class CustomSelectors {
  constructor(parent) {
    if (parent) {
      this.parent = parent;
      this.selectedItem = this.parent.querySelectorAll(".search__select-item-selected");
      this.items = this.parent.querySelectorAll(".search__select-item");
      this.body = document.querySelector("body");
      this.combobox = document.querySelector(".search__combobox");
      this.allSongs = JSON.parse(localStorage.getItem("songs"));
      this.artist = document.querySelector(".search__artist");
      this.initInputArtist();
      this.initCombobox();
      this.initSelectedItems();
      this.initItems();
      this.onClickBody();
    }
  }
  initInputArtist() {
    if (this.artist) {
      this.artist.addEventListener("keyup", () => {
        let searching = this.artist.value.toUpperCase(), search = this.combobox.querySelectorAll(".search__combobox-item");
        if (searching === "") {
          this.combobox.classList.remove("shown");
        } else {
          this.combobox.classList.add("shown");
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
        let span = _additional_html__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", "search__combobox-item", {
          "data-value": item
        }, item);
        span.addEventListener("click", () => {
          this.artist.value = item;
          this.combobox.classList.remove("shown");
        });
        this.combobox.append(span);
      }
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
  initSelectedItems() {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDaUQ7QUFDWDtBQUNSO0FBQ087QUFDUDtBQUNFO0FBRXZDLFNBQVMsaUJBQWlCLG9CQUFvQixNQUFNO0FBQ25ELFFBQU0sWUFBWSxJQUFJLDBEQUFTLENBQUMsR0FDL0IsYUFBYSxJQUFJLDBEQUFVLENBQUMsU0FBUyxHQUNyQyxTQUFTLElBQUksc0RBQU0sQ0FBQyxZQUFZLFNBQVMsR0FDekMsVUFBVSxJQUFJLHVEQUFPLENBQUM7QUFFdkIsTUFBSSxnRUFBZSxDQUFDLFNBQVMsY0FBYyxTQUFTLENBQUM7QUFDckQsTUFBSSxzREFBTSxDQUFDO0FBRVgsU0FBTyxVQUFVLE9BQU87QUFDeEIsVUFBUSxVQUFVLE1BQU07QUFFeEIsV0FBUyxtQkFBbUI7QUFDM0IsUUFBSSxhQUFhLFNBQVMsaUJBQWlCLGtCQUFrQjtBQUU3RCxRQUFJLFdBQVcsUUFBUTtBQUN0QixZQUFNLGFBQWEsV0FBVyxDQUFDLEVBQUUsY0FBYyxhQUM5QyxVQUFVLFNBQVMsZ0JBQWdCLGNBQWMsTUFBTSxhQUFhO0FBRXJFLGlCQUFXLFFBQVEsV0FBUztBQUMzQixjQUFNLGFBQWEsU0FBUyxHQUFHLFdBQVc7QUFDMUMsY0FBTSxhQUFhLFVBQVUsR0FBRyxXQUFXO0FBQUEsTUFDNUMsQ0FBQztBQUFBLElBQ0Y7QUFBQSxFQUNEO0FBRUEsbUJBQWlCO0FBQ2pCLFNBQU8sV0FBVztBQUNuQixDQUFDOzs7Ozs7Ozs7OztBQ3BDRCIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2pzL2FkZGl0aW9uYWwvZ2V0LWRhdGEtc29uZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vanMvYWRkaXRpb25hbC9odG1sLmpzIiwid2VicGFjazovLy8uL2pzL3NlYXJjaC9jdXN0b20tc2VsZWN0b3JzLmpzIiwid2VicGFjazovLy8uL2pzL3NlYXJjaC9oZWFkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vanMvc2VhcmNoL2xpc3Qtc29uZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vanMvc2VhcmNoL3BhZ2luYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vanMvc2VhcmNoL3Jlc3VsdHMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvc2VhcmNoL3NlYXJjaC5qcyIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vLy4vanMvdGhlbWUtc2VhcmNoLmpzIiwid2VicGFjazovLy8uL2Nzcy90aGVtZS1zZWFyY2guc2NzcyJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgc29uZ3MgPSBbXTtcbmNvbnN0IGJhbmRzID0gWydBQy9EQycsICdJbWFnaW5lIERyYWdvbnMnLCAnTWV0YWxsaWNhJywgJ1NraWxsZXQnXSxcblx0Z2VucmVzID0gWydSb2NrJywgJ0Z1bmsnLCAnQmVhdHMnLCAnSGlwIEhvcCcsICdQb3AnLCAnUmFwJ10sXG5cdHNvbmdzTGlzdCA9IFsnT25lIE1vcmUgVGltZScsICdBZXJvZHluYW1pYycsICdEaWdpdGFsIExvdmUnLCAnTGV0IFRoZXJlIEJlIFJvY2snXSxcblx0Y291bnRyaWVzID0gWydVU0EnLCAnVUsnLCAnVUEnLCAnUEwnLCAnVUFFJywgJ0pQJ107XG5cbmZ1bmN0aW9uIGdldFJhbmRvbVZhbHVlKGFycmF5KSB7XG5cdHJldHVybiBhcnJheVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhcnJheS5sZW5ndGgpXTtcbn1cblxuZm9yIChsZXQgaSA9IDE7IGkgPD0gNDg7IGkrKykge1xuXHRzb25ncy5wdXNoKHtcblx0XHRpZDogaSxcblx0XHRmYXZvcml0ZTogZmFsc2UsXG5cdFx0aW1nOiBgcHVibGljL2ltZy9zb25ncy9saXN0L3Nvbmcke2l9LmpwZWdgLFxuXHRcdHNvbmc6IGdldFJhbmRvbVZhbHVlKHNvbmdzTGlzdCksXG5cdFx0YmFuZDogZ2V0UmFuZG9tVmFsdWUoYmFuZHMpLFxuXHRcdHllYXI6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgyMDMwIC0gMTk1MCkpICsgMTk1MCxcblx0XHRzdHlsZTogW2dldFJhbmRvbVZhbHVlKGdlbnJlcyldLFxuXHRcdGNvdW50cnk6IGdldFJhbmRvbVZhbHVlKGNvdW50cmllcyksXG5cdFx0YWRkZWQ6IGZhbHNlXG5cdH0pO1xufVxuXG5pZiAoIWxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzb25ncycpKSB7XG5cdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzb25ncycsIEpTT04uc3RyaW5naWZ5KHNvbmdzKSk7XG5cdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwZXJQYWdlJywgJzYnKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBIVE1MIHtcblx0c3RhdGljIGNyZWF0ZUVsZW1lbnQoZWxlbWVudE5hbWUsIGNsYXNzTmFtZSA9ICcnLCBhdHRyaWJ1dGVzID0gbnVsbCwgdGV4dCA9ICcnKSB7XG5cdFx0aWYgKCFlbGVtZW50TmFtZS5sZW5ndGgpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblxuXHRcdGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50TmFtZSk7XG5cblx0XHRpZiAoYXR0cmlidXRlcykge1xuXHRcdFx0Zm9yIChsZXQga2V5IGluIGF0dHJpYnV0ZXMpIHtcblx0XHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyaWJ1dGVzW2tleV0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChjbGFzc05hbWUpIHtcblx0XHRcdGVsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuXHRcdH1cblxuXHRcdGlmICh0ZXh0KSB7XG5cdFx0XHRlbGVtZW50LmFwcGVuZENoaWxkKEhUTUwuY3JlYXRlVGV4dCh0ZXh0KSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XG5cdH1cblxuXHRzdGF0aWMgY3JlYXRlVGV4dCh0ZXh0ID0gbnVsbCkge1xuXHRcdHJldHVybiB0ZXh0ID8gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCkgOiBudWxsO1xuXHR9XG59XG4iLCJpbXBvcnQgSFRNTCBmcm9tIFwiLi4vYWRkaXRpb25hbC9odG1sXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1c3RvbVNlbGVjdG9ycyB7XG5cdGNvbnN0cnVjdG9yKHBhcmVudCkge1xuXHRcdGlmIChwYXJlbnQpIHtcblx0XHRcdHRoaXMucGFyZW50ID0gcGFyZW50O1xuXHRcdFx0dGhpcy5zZWxlY3RlZEl0ZW0gPSB0aGlzLnBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2VhcmNoX19zZWxlY3QtaXRlbS1zZWxlY3RlZCcpO1xuXHRcdFx0dGhpcy5pdGVtcyA9IHRoaXMucGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWFyY2hfX3NlbGVjdC1pdGVtJyk7XG5cdFx0XHR0aGlzLmJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG5cdFx0XHR0aGlzLmNvbWJvYm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaF9fY29tYm9ib3gnKTtcblx0XHRcdHRoaXMuYWxsU29uZ3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzb25ncycpKTtcblx0XHRcdHRoaXMuYXJ0aXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaF9fYXJ0aXN0Jyk7XG5cblx0XHRcdHRoaXMuaW5pdElucHV0QXJ0aXN0KCk7XG5cdFx0XHR0aGlzLmluaXRDb21ib2JveCgpO1xuXHRcdFx0dGhpcy5pbml0U2VsZWN0ZWRJdGVtcygpO1xuXHRcdFx0dGhpcy5pbml0SXRlbXMoKTtcblx0XHRcdHRoaXMub25DbGlja0JvZHkoKTtcblx0XHR9XG5cdH1cblxuXHRpbml0SW5wdXRBcnRpc3QoKSB7XG5cdFx0aWYgKHRoaXMuYXJ0aXN0KSB7XG5cdFx0XHR0aGlzLmFydGlzdC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsICgpID0+IHtcblx0XHRcdFx0bGV0IHNlYXJjaGluZyA9IHRoaXMuYXJ0aXN0LnZhbHVlLnRvVXBwZXJDYXNlKCksXG5cdFx0XHRcdFx0c2VhcmNoID0gdGhpcy5jb21ib2JveC5xdWVyeVNlbGVjdG9yQWxsKCcuc2VhcmNoX19jb21ib2JveC1pdGVtJyk7XG5cblx0XHRcdFx0aWYgKHNlYXJjaGluZyA9PT0gJycpIHtcblx0XHRcdFx0XHR0aGlzLmNvbWJvYm94LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3duJyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5jb21ib2JveC5jbGFzc0xpc3QuYWRkKCdzaG93bicpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yIChsZXQgcmVzdWx0IG9mIHNlYXJjaCkge1xuXHRcdFx0XHRcdGxldCB0ZXh0ID0gcmVzdWx0LnRleHRDb250ZW50IHx8IHJlc3VsdC5pbm5lclRleHQ7XG5cblx0XHRcdFx0XHRpZiAodGV4dC50b1VwcGVyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoaW5nKSA+IC0xKSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQuc3R5bGUuZGlzcGxheSA9IFwiXCI7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJlc3VsdC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRpbml0Q29tYm9ib3goKSB7XG5cdFx0aWYgKHRoaXMuY29tYm9ib3gpIHtcblx0XHRcdGxldCBkYXRhID0gW107XG5cblx0XHRcdGZvciAobGV0IGtleSBvZiBPYmplY3Qua2V5cyh0aGlzLmFsbFNvbmdzKSkge1xuXHRcdFx0XHRkYXRhLnB1c2godGhpcy5hbGxTb25nc1trZXldLmJhbmQsIHRoaXMuYWxsU29uZ3Nba2V5XS5zb25nKTtcblx0XHRcdH1cblxuXHRcdFx0ZGF0YSA9IGRhdGEuZmlsdGVyKCh2YWx1ZSwgaW5kZXgsIGFycmF5KSA9PiBhcnJheS5pbmRleE9mKHZhbHVlKSA9PT0gaW5kZXgpO1xuXG5cdFx0XHRmb3IgKGxldCBpdGVtIG9mIGRhdGEpIHtcblx0XHRcdFx0bGV0IHNwYW4gPSBIVE1MLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCAnc2VhcmNoX19jb21ib2JveC1pdGVtJywge1xuXHRcdFx0XHRcdCdkYXRhLXZhbHVlJzogaXRlbVxuXHRcdFx0XHR9LCBpdGVtKTtcblxuXHRcdFx0XHRzcGFuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMuYXJ0aXN0LnZhbHVlID0gaXRlbTtcblx0XHRcdFx0XHR0aGlzLmNvbWJvYm94LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3duJyk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHRoaXMuY29tYm9ib3guYXBwZW5kKHNwYW4pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGluaXRJdGVtcygpIHtcblx0XHRpZiAodGhpcy5pdGVtcy5sZW5ndGgpIHtcblx0XHRcdGZvciAobGV0IGl0ZW0gb2YgdGhpcy5pdGVtcykge1xuXHRcdFx0XHRpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdFx0XHRjb25zdCBwYXJlbnQgPSBpdGVtLnBhcmVudEVsZW1lbnQsXG5cdFx0XHRcdFx0XHRzZWxlY3RlZCA9IHBhcmVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoX19zZWxlY3QtaXRlbS1zZWxlY3RlZCcpLFxuXHRcdFx0XHRcdFx0aW5wdXQgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7XG5cblx0XHRcdFx0XHRmb3IgKGxldCBjaGlsZCBvZiBwYXJlbnQuY2hpbGRyZW4pIHtcblx0XHRcdFx0XHRcdGNoaWxkLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aXRlbS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuXG5cdFx0XHRcdFx0aWYgKHBhcmVudC5pZCA9PT0gJ2dlbnJlJykge1xuXHRcdFx0XHRcdFx0aW5wdXQuY2hlY2tlZCA9ICFpbnB1dC5jaGVja2VkO1xuXG5cdFx0XHRcdFx0XHRsZXQgc2VhcmNoaW5nID0gc2VsZWN0ZWQuZGF0YXNldC52YWx1ZS5zcGxpdCgnLCcpLmZpbHRlcihnZW5yZSA9PiBnZW5yZSAhPT0gJycpLFxuXHRcdFx0XHRcdFx0XHRpbmRleCA9IHNlYXJjaGluZy5maW5kSW5kZXgodmFsdWUgPT4gdmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gaXRlbS5kYXRhc2V0LnZhbHVlLnRvTG93ZXJDYXNlKCkpO1xuXG5cdFx0XHRcdFx0XHRpZiAoaW5kZXggIT09IC0xKSB7XG5cdFx0XHRcdFx0XHRcdHNlYXJjaGluZy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0c2VhcmNoaW5nLnB1c2goaXRlbS50ZXh0Q29udGVudC5yZXBsYWNlKC8oXFxyXFxufFxcbnxcXHIpL2dtLCBcIlwiKS5yZXBsYWNlQWxsKCcgJywgJycpKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0c2VsZWN0ZWQudGV4dENvbnRlbnQgPSAhc2VhcmNoaW5nLmxlbmd0aCA/IHNlbGVjdGVkLmRhdGFzZXQuZGVmYXVsdCA6IHNlYXJjaGluZy5qb2luKCcsJyk7XG5cdFx0XHRcdFx0XHRzZWxlY3RlZC5kYXRhc2V0LnZhbHVlID0gc2VhcmNoaW5nLmpvaW4oJywnKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0c2VsZWN0ZWQudGV4dENvbnRlbnQgPSBpdGVtLnRleHRDb250ZW50O1xuXHRcdFx0XHRcdFx0c2VsZWN0ZWQuZGF0YXNldC52YWx1ZSA9IGl0ZW0uZGF0YXNldC52YWx1ZTtcblx0XHRcdFx0XHRcdHNlbGVjdGVkLmNsaWNrKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRpbml0U2VsZWN0ZWRJdGVtcygpIHtcblx0XHRpZiAodGhpcy5zZWxlY3RlZEl0ZW0ubGVuZ3RoKSB7XG5cdFx0XHRmb3IgKGxldCBpbmRleCBpbiBPYmplY3Qua2V5cyh0aGlzLnNlbGVjdGVkSXRlbSkpIHtcblx0XHRcdFx0Y29uc3QgcGFyZW50ID0gdGhpcy5zZWxlY3RlZEl0ZW1baW5kZXhdLnBhcmVudEVsZW1lbnQsXG5cdFx0XHRcdFx0c2VsZWN0ZWQgPSBwYXJlbnQucXVlcnlTZWxlY3RvcignbGkuc2VsZWN0ZWQnKTtcblxuXHRcdFx0XHRpZiAoc2VsZWN0ZWQpIHtcblx0XHRcdFx0XHR0aGlzLnNlbGVjdGVkSXRlbVtpbmRleF0udGV4dENvbnRlbnQgPSBzZWxlY3RlZC50ZXh0Q29udGVudDtcblx0XHRcdFx0XHR0aGlzLnNlbGVjdGVkSXRlbVtpbmRleF0uZGF0YXNldC52YWx1ZSA9IHNlbGVjdGVkLmRhdGFzZXQudmFsdWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLnNlbGVjdGVkSXRlbVtpbmRleF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5zZWxlY3RlZEl0ZW0uZm9yRWFjaChzZWxlY3QgPT4ge1xuXHRcdFx0XHRcdFx0aWYgKHNlbGVjdCAhPSB0aGlzLnNlbGVjdGVkSXRlbVtpbmRleF0gJiYgc2VsZWN0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdvcGVuZWQnKSkge1xuXHRcdFx0XHRcdFx0XHRzZWxlY3QuY2xpY2soKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdHBhcmVudC5zY3JvbGxUbyh7XG5cdFx0XHRcdFx0XHR0b3A6IDAsXG5cdFx0XHRcdFx0XHRiZWhhdmlvcjogJ3Ntb290aCdcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdGlmIChwYXJlbnQgJiYgIXBhcmVudC5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW5lZCcpKSB7XG5cdFx0XHRcdFx0XHRwYXJlbnQuY2xhc3NMaXN0LmFkZCgnb3BlbmVkJyk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuZWQnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdG9uQ2xpY2tCb2R5KCkge1xuXHRcdGlmICh0aGlzLmJvZHkpIHtcblx0XHRcdHRoaXMuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcblx0XHRcdFx0Y29uc3Qge3RhcmdldH0gPSBldmVudDtcblxuXHRcdFx0XHRpZiAodGFyZ2V0KSB7XG5cdFx0XHRcdFx0aWYgKCF0YXJnZXQubWF0Y2hlcygnLnNlYXJjaF9fc2VsZWN0LWl0ZW0tc2VsZWN0ZWQnKSAmJlxuXHRcdFx0XHRcdFx0IXRhcmdldC5tYXRjaGVzKCcuc2VhcmNoX19zZWxlY3QtaXRlbScpICYmICF0YXJnZXQubWF0Y2hlcygnLnNlYXJjaF9fc2VsZWN0JykgJiZcblx0XHRcdFx0XHRcdCF0YXJnZXQubWF0Y2hlcygnLnNlYXJjaF9fc2VsZWN0LWNoZWNrbWFyaycpICYmXG5cdFx0XHRcdFx0XHQhdGFyZ2V0Lm1hdGNoZXMoJy5zZWFyY2hfX3NlbGVjdC1sYWJlbCcpKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnNlbGVjdGVkSXRlbS5mb3JFYWNoKHNlbGVjdCA9PiB7XG5cdFx0XHRcdFx0XHRcdGlmIChzZWxlY3QucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW5lZCcpKSB7XG5cdFx0XHRcdFx0XHRcdFx0c2VsZWN0LmNsaWNrKCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVhZGVyIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5iYWNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fY29udGFpbmVyLWJhY2snKTtcblx0XHR0aGlzLmZhdm9yaXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fY29udGFpbmVyLWl0ZW0uZmF2b3JpdGUnKTtcblx0XHR0aGlzLnNhdmVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fY29udGFpbmVyLWl0ZW0uc2F2ZWQnKTtcblx0XHR0aGlzLnN1Ym1pdFNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfX3N1Ym1pdCcpO1xuXG5cdFx0dGhpcy5vbkNsaWNrQmFjaygpO1xuXHRcdHRoaXMub25DbGlja0Zhdm9yaXRlKCk7XG5cdFx0dGhpcy5vbkNsaWNrU2F2ZWQoKTtcblx0fVxuXG5cdG9uQ2xpY2tCYWNrKCkge1xuXHRcdGlmICh0aGlzLmJhY2spIHtcblx0XHRcdHRoaXMuYmFjay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRcdFx0aGlzdG9yeS5iYWNrKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRvbkNsaWNrRmF2b3JpdGUoKSB7XG5cdFx0aWYgKHRoaXMuZmF2b3JpdGUpIHtcblx0XHRcdHRoaXMuZmF2b3JpdGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0XHRcdGlmICh0aGlzLmZhdm9yaXRlLmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0ZWQnKSkge1xuXHRcdFx0XHRcdHRoaXMuZmF2b3JpdGUuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmZhdm9yaXRlLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLnN1Ym1pdFNlYXJjaC5jbGljaygpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0b25DbGlja1NhdmVkKCkge1xuXHRcdGlmICh0aGlzLnNhdmVkKSB7XG5cdFx0XHR0aGlzLnNhdmVkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0XHRpZiAodGhpcy5zYXZlZC5jbGFzc0xpc3QuY29udGFpbnMoJ3NlbGVjdGVkJykpIHtcblx0XHRcdFx0XHR0aGlzLnNhdmVkLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5zYXZlZC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5zdWJtaXRTZWFyY2guY2xpY2soKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxufSIsImltcG9ydCBIVE1MIGZyb20gXCIuLi9hZGRpdGlvbmFsL2h0bWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdFNvbmdzIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5wZXJQYWdlID0gcGFyc2VJbnQobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BlclBhZ2UnKSk7XG5cdFx0dGhpcy5hbGxTb25ncyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NvbmdzJykpO1xuXHRcdHRoaXMucGFyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNvbmdzJyk7XG5cdH1cblxuXHRzZXRBbGxTb25ncyhhbGxTb25ncykge1xuXHRcdHRoaXMuYWxsU29uZ3MgPSBhbGxTb25ncztcblx0fVxuXG5cdHJlbmRlclNvbmdzKHN0YXJ0KSB7XG5cdFx0Y29uc3Qgc29uZ3NUb1JlbmRlciA9IHRoaXMuYWxsU29uZ3Muc2xpY2Uoc3RhcnQsIHN0YXJ0ICsgdGhpcy5wZXJQYWdlKTtcblxuXHRcdGlmICh0aGlzLnBhcmVudCkge1xuXHRcdFx0dGhpcy5wYXJlbnQucmVwbGFjZUNoaWxkcmVuKCk7XG5cblx0XHRcdGZvciAobGV0IHNvbmcgb2Ygc29uZ3NUb1JlbmRlcikge1xuXHRcdFx0XHRsZXQgbGkgPSBIVE1MLmNyZWF0ZUVsZW1lbnQoJ2xpJywgJ3NvbmdzX19pdGVtJywge1xuXHRcdFx0XHRcdFx0J2RhdGEtaWQnOiBzb25nLmlkLFxuXHRcdFx0XHRcdFx0J2RhdGEtZmF2b3JpdGUnOiBzb25nLmZhdm9yaXRlLFxuXHRcdFx0XHRcdFx0J2RhdGEtc2F2ZWQnOiBzb25nLmFkZGVkLFxuXHRcdFx0XHRcdFx0J2RhdGEtYXJ0aXN0Jzogc29uZy5iYW5kLFxuXHRcdFx0XHRcdFx0J2RhdGEtZ2VucmUnOiBzb25nLnN0eWxlLmpvaW4oJywnKSxcblx0XHRcdFx0XHRcdCdkYXRhLWRlY2FkZSc6IHNvbmcueWVhcixcblx0XHRcdFx0XHRcdCdkYXRhLWNvdW50cnknOiBzb25nLmNvdW50cnksXG5cdFx0XHRcdFx0fSksXG5cdFx0XHRcdFx0aW1nID0gSFRNTC5jcmVhdGVFbGVtZW50KCdpbWcnLCAnc29uZ3NfX2l0ZW0taW1nJywge1xuXHRcdFx0XHRcdFx0c3JjOiBgLi4vJHtzb25nLmltZ31gLFxuXHRcdFx0XHRcdFx0YWx0OiBzb25nLnNvbmcsXG5cdFx0XHRcdFx0XHR3aWR0aDogJzE2OXB4Jyxcblx0XHRcdFx0XHRcdGhlaWdodDogJzE2OXB4J1xuXHRcdFx0XHRcdH0pLFxuXHRcdFx0XHRcdGZhdm9yaXRlID0gSFRNTC5jcmVhdGVFbGVtZW50KCdzcGFuJywgJ3NvbmdzX19pdGVtLWZhdm9yaXRlJywge1xuXHRcdFx0XHRcdFx0J2RhdGEtZmF2b3JpdGUnOiBzb25nLmZhdm9yaXRlXG5cdFx0XHRcdFx0fSksXG5cdFx0XHRcdFx0c29uZ0RhdGFDb250YWluZXIgPSBIVE1MLmNyZWF0ZUVsZW1lbnQoJ2RpdicsICdzb25nc19faXRlbS1jb250YWluZXInKSxcblx0XHRcdFx0XHRzb25nTmFtZSA9IEhUTUwuY3JlYXRlRWxlbWVudCgnaDInLCAnc29uZ3NfX2l0ZW0tc29uZycsIHt9LCBzb25nLnNvbmcpLFxuXHRcdFx0XHRcdHNvbmdCYW5kID0gSFRNTC5jcmVhdGVFbGVtZW50KCdoMycsICdzb25nc19faXRlbS1iYW5kJywge30sIHNvbmcuYmFuZCksXG5cdFx0XHRcdFx0c29uZ1llYXIgPSBIVE1MLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCAnc29uZ3NfX2l0ZW0teWVhcicsIHt9LCAnWWVhciA6ICcpLFxuXHRcdFx0XHRcdHNvbmdZZWFyQmFuZCA9IEhUTUwuY3JlYXRlRWxlbWVudCgnc3BhbicsICcnLCB7fSwgc29uZy55ZWFyKSxcblx0XHRcdFx0XHRzb25nU3R5bGUgPSBIVE1MLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCAnc29uZ3NfX2l0ZW0tc3R5bGUnLCB7fSwgJ1N0eWxlIDogJyksXG5cdFx0XHRcdFx0c29uZ1N0eWxlQmFuZCA9IEhUTUwuY3JlYXRlRWxlbWVudCgnc3BhbicsICcnLCB7fSwgc29uZy5zdHlsZS5qb2luKCcsJykpLFxuXHRcdFx0XHRcdHNvbmdDb3VudHJ5ID0gSFRNTC5jcmVhdGVFbGVtZW50KCdzcGFuJywgJ3NvbmdzX19pdGVtLWNvdW50cnknLCB7fSwgJ0NvdW50cnkgOiAnKSxcblx0XHRcdFx0XHRzb25nQ291bnRyeUJhbmQgPSBIVE1MLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCAnJywge30sIHNvbmcuY291bnRyeSksXG5cdFx0XHRcdFx0c29uZ0FkZCA9IEhUTUwuY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgJ3NvbmdzX19pdGVtLWFkZCcsIHtcblx0XHRcdFx0XHRcdHR5cGU6ICdidXR0b24nXG5cdFx0XHRcdFx0fSwgJ0FkZCcpO1xuXG5cdFx0XHRcdHNvbmdZZWFyLmFwcGVuZChzb25nWWVhckJhbmQpO1xuXHRcdFx0XHRzb25nU3R5bGUuYXBwZW5kKHNvbmdTdHlsZUJhbmQpO1xuXHRcdFx0XHRzb25nQ291bnRyeS5hcHBlbmQoc29uZ0NvdW50cnlCYW5kKTtcblx0XHRcdFx0c29uZ0RhdGFDb250YWluZXIuYXBwZW5kKHNvbmdOYW1lLCBzb25nQmFuZCwgc29uZ1llYXIsIHNvbmdTdHlsZSwgc29uZ0NvdW50cnksIHNvbmdBZGQpXG5cdFx0XHRcdGxpLmFwcGVuZChpbWcsIGZhdm9yaXRlLCBzb25nRGF0YUNvbnRhaW5lcik7XG5cdFx0XHRcdGZhdm9yaXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IHJlc3VsdCA9IHRoaXMuY2hhbmdlRGF0YShzb25nLmlkLCAnZmF2b3JpdGUnKTtcblxuXHRcdFx0XHRcdGxpLmRhdGFzZXQuZmF2b3JpdGUgPSByZXN1bHQudG9TdHJpbmcoKTtcblx0XHRcdFx0XHRmYXZvcml0ZS5kYXRhc2V0LmZhdm9yaXRlID0gcmVzdWx0LnRvU3RyaW5nKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRzb25nQWRkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IHJlc3VsdCA9IHRoaXMuY2hhbmdlRGF0YShzb25nLmlkLCAnYWRkZWQnKTtcblxuXHRcdFx0XHRcdGxpLmRhdGFzZXQuYWRkZWQgPSByZXN1bHQudG9TdHJpbmcoKTtcblx0XHRcdFx0XHRmYXZvcml0ZS5kYXRhc2V0LmFkZGVkID0gcmVzdWx0LnRvU3RyaW5nKCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHRoaXMucGFyZW50LmFwcGVuZChsaSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Y2hhbmdlRGF0YShpZCwgbmFtZSkge1xuXHRcdGNvbnN0IGFsbFNvbmdzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc29uZ3MnKSksXG5cdFx0XHRpbmRleCA9IGFsbFNvbmdzLmZpbmRJbmRleChzb25nID0+IHNvbmcuaWQgPT09IGlkKTtcblxuXHRcdGlmIChpbmRleCAhPT0gLTEpIHtcblx0XHRcdGNvbnN0IHZhbHVlID0gbmFtZSAhPT0gJ2FkZGVkJyA/ICFhbGxTb25nc1tpbmRleF1bbmFtZV0gOiB0cnVlO1xuXG5cdFx0XHRhbGxTb25nc1tpbmRleF1bbmFtZV0gPSB2YWx1ZTtcblx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzb25ncycsIEpTT04uc3RyaW5naWZ5KGFsbFNvbmdzKSk7XG5cblx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHR9XG5cdH1cbn0iLCJpbXBvcnQgSFRNTCBmcm9tIFwiLi4vYWRkaXRpb25hbC9odG1sXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZ2luYXRpb24ge1xuXHRjb25zdHJ1Y3RvcihsaXN0U29uZ3MpIHtcblx0XHR0aGlzLnBhZ2luYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnaW5hdGlvbicpO1xuXG5cdFx0aWYgKHRoaXMucGFnaW5hdGlvbikge1xuXHRcdFx0dGhpcy5saXN0U29uZ3MgPSBsaXN0U29uZ3M7XG5cdFx0XHR0aGlzLnBlclBhZ2UgPSBwYXJzZUludChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGVyUGFnZScpKTtcblx0XHRcdHRoaXMuYWxsU29uZ3NMZW5ndGggPSBwYXJzZUludChKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzb25ncycpKS5sZW5ndGgpO1xuXHRcdFx0dGhpcy5wYWdlQ291bnQgPSBNYXRoLmNlaWwodGhpcy5hbGxTb25nc0xlbmd0aCAvIHRoaXMucGVyUGFnZSk7XG5cdFx0XHR0aGlzLnVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG5cdFx0XHR0aGlzLmN1cnJlbnRQYWdlID0gcGFyc2VJbnQodGhpcy51cmxQYXJhbXMuZ2V0KCdwYWdlJykpIHx8IDE7XG5cblx0XHRcdHRoaXMubGlzdFNvbmdzLnJlbmRlclNvbmdzKHRoaXMuZ2V0U3RhcnRMaXN0U29uZ3MoKSk7XG5cdFx0XHR0aGlzLnJlbmRlclBhZ2luYXRpb24oKTtcblx0XHR9XG5cdH1cblxuXHRzZXRQYWdlQ291bnQocGFnZUNvdW50KSB7XG5cdFx0dGhpcy5wYWdlQ291bnQgPSBwYWdlQ291bnQ7XG5cdH1cblxuXHRyZW5kZXJQYWdpbmF0aW9uKCkge1xuXHRcdGNvbnN0IGFycmF5UGFnaW5hdGlvbiA9IHRoaXMuZ2V0UGFnaW5hdGlvbih0aGlzLmN1cnJlbnRQYWdlLCB0aGlzLnBhZ2VDb3VudCk7XG5cblx0XHR0aGlzLnBhZ2luYXRpb24ucmVwbGFjZUNoaWxkcmVuKCk7XG5cblx0XHRpZiAoYXJyYXlQYWdpbmF0aW9uLmxlbmd0aCA+IDEpIHtcblx0XHRcdGFycmF5UGFnaW5hdGlvbi5mb3JFYWNoKHBhZ2UgPT4ge1xuXHRcdFx0XHRsZXQgcGFnZUJ1dHRvbiA9IEhUTUwuY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgJ3BhZ2luYXRpb25fX3BhZ2UnLCB7XG5cdFx0XHRcdFx0J2RhdGEtaW5kZXgnOiBwYWdlLFxuXHRcdFx0XHRcdCdhcmlhLWxhYmVsJzogYFBhZ2UgJHtwYWdlfWBcblx0XHRcdFx0fSwgcGFnZSk7XG5cblx0XHRcdFx0dGhpcy5jdXJyZW50UGFnZSA9PT0gcGFnZSA/IHBhZ2VCdXR0b24uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKSA6ICcnO1xuXG5cdFx0XHRcdHBhZ2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0XHRcdFx0aWYgKHBhZ2UgIT09ICcuLi4nKSB7XG5cdFx0XHRcdFx0XHRjb25zdCB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdCgnPycpWzBdICsgKHBhZ2UgIT09IDEgPyBgP3BhZ2U9JHtwYWdlfWAgOiAnJyk7XG5cdFx0XHRcdFx0XHR0aGlzLnBhZ2luYXRpb24ucmVwbGFjZUNoaWxkcmVuKCk7XG5cdFx0XHRcdFx0XHR0aGlzLmN1cnJlbnRQYWdlID0gcGFnZTtcblx0XHRcdFx0XHRcdGhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIFwiXCIsIHVybCk7XG5cblx0XHRcdFx0XHRcdHRoaXMubGlzdFNvbmdzLnJlbmRlclNvbmdzKHRoaXMuZ2V0U3RhcnRMaXN0U29uZ3MoKSk7XG5cdFx0XHRcdFx0XHR0aGlzLnJlbmRlclBhZ2luYXRpb24oKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHRoaXMucGFnaW5hdGlvbi5hcHBlbmQocGFnZUJ1dHRvbik7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHR0aGlzLmxpc3RTb25ncy5yZW5kZXJTb25ncyh0aGlzLmdldFN0YXJ0TGlzdFNvbmdzKCkpO1xuXHR9XG5cblx0Z2V0UGFnaW5hdGlvbihjdXJyZW50UGFnZSwgcGFnZUNvdW50KSB7XG5cdFx0bGV0IGRlbHRhO1xuXG5cdFx0aWYgKHBhZ2VDb3VudCA8PSA3KSB7XG5cdFx0XHRkZWx0YSA9IDc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRlbHRhID0gY3VycmVudFBhZ2UgPiA0ICYmIGN1cnJlbnRQYWdlIDwgcGFnZUNvdW50IC0gMyA/IDIgOiA0O1xuXHRcdH1cblxuXHRcdGNvbnN0IHJhbmdlID0ge1xuXHRcdFx0c3RhcnQ6IE1hdGgucm91bmQoY3VycmVudFBhZ2UgLSBkZWx0YSAvIDIpLFxuXHRcdFx0ZW5kOiBNYXRoLnJvdW5kKGN1cnJlbnRQYWdlICsgZGVsdGEgLyAyKVxuXHRcdH07XG5cblx0XHRpZiAocmFuZ2Uuc3RhcnQgLSAxID09PSAxIHx8IHJhbmdlLmVuZCArIDEgPT09IHBhZ2VDb3VudCkge1xuXHRcdFx0cmFuZ2Uuc3RhcnQgKz0gMTtcblx0XHRcdHJhbmdlLmVuZCArPSAxO1xuXHRcdH1cblxuXHRcdGxldCBwYWdlcyA9IGN1cnJlbnRQYWdlID4gZGVsdGEgP1xuXHRcdFx0dGhpcy5nZXRSYW5nZShNYXRoLm1pbihyYW5nZS5zdGFydCwgcGFnZUNvdW50IC0gZGVsdGEpLCBNYXRoLm1pbihyYW5nZS5lbmQsIHBhZ2VDb3VudCkpIDpcblx0XHRcdHRoaXMuZ2V0UmFuZ2UoMSwgTWF0aC5taW4ocGFnZUNvdW50LCBkZWx0YSArIDEpKTtcblxuXHRcdGNvbnN0IHdpdGhEb3RzID0gKHZhbHVlLCBwYWlyKSA9PiAocGFnZXMubGVuZ3RoICsgMSAhPT0gcGFnZUNvdW50ID8gcGFpciA6IFt2YWx1ZV0pO1xuXG5cdFx0aWYgKHBhZ2VzWzBdICE9PSAxKSB7XG5cdFx0XHRwYWdlcyA9IHdpdGhEb3RzKDEsIFsxLCAnLi4uJ10pLmNvbmNhdChwYWdlcyk7XG5cdFx0fVxuXG5cdFx0aWYgKHBhZ2VzW3BhZ2VzLmxlbmd0aCAtIDFdIDwgcGFnZUNvdW50KSB7XG5cdFx0XHRwYWdlcyA9IHBhZ2VzLmNvbmNhdCh3aXRoRG90cyhwYWdlQ291bnQsIFsnLi4uJywgcGFnZUNvdW50XSkpO1xuXHRcdH1cblxuXHRcdHJldHVybiBwYWdlcztcblx0fVxuXG5cdGdldFJhbmdlKHN0YXJ0LCBlbmQpIHtcblx0XHRyZXR1cm4gQXJyYXkoZW5kIC0gc3RhcnQgKyAxKS5maWxsKCkubWFwKCh2LCBpKSA9PiBpICsgc3RhcnQpO1xuXHR9XG5cblx0Z2V0U3RhcnRMaXN0U29uZ3MoKSB7XG5cdFx0cmV0dXJuIHRoaXMucGVyUGFnZSAqICh0aGlzLmN1cnJlbnRQYWdlIC0gMSk7XG5cdH1cbn0iLCJpbXBvcnQgSFRNTCBmcm9tIFwiLi4vYWRkaXRpb25hbC9odG1sXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc3VsdHMge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLnJlc3VsdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzdWx0cycpO1xuXHRcdHRoaXMubGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXN1bHRzX19saXN0Jyk7XG5cdFx0dGhpcy5yZXNldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXN1bHRzX19vcHRpb25zLXJlc2V0Jyk7XG5cdFx0dGhpcy5zZWFyY2g7XG5cblx0XHRpZiAodGhpcy5yZXNldCkge1xuXHRcdFx0dGhpcy5vbkNsaWNrUmVzZXQoKTtcblx0XHR9XG5cdH1cblxuXHRvbkNsaWNrUmVzZXQoKSB7XG5cdFx0dGhpcy5yZXNldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRcdGxldCBhcnRpc3QgPSB0aGlzLnNlYXJjaC5zZWFyY2gucXVlcnlTZWxlY3RvcignI2FydGlzdCcpLFxuXHRcdFx0XHRnZW5yZSA9IHRoaXMuc2VhcmNoLnNlYXJjaC5xdWVyeVNlbGVjdG9yKCcjZ2VucmUgLnNlYXJjaF9fc2VsZWN0LWl0ZW0tc2VsZWN0ZWQnKSxcblx0XHRcdFx0ZGVjYWRlID0gdGhpcy5zZWFyY2guc2VhcmNoLnF1ZXJ5U2VsZWN0b3IoJyNkZWNhZGUgLnNlYXJjaF9fc2VsZWN0LWl0ZW0tc2VsZWN0ZWQnKSxcblx0XHRcdFx0Y291bnRyeSA9IHRoaXMuc2VhcmNoLnNlYXJjaC5xdWVyeVNlbGVjdG9yKCcjY291bnRyeSAuc2VhcmNoX19zZWxlY3QtaXRlbS1zZWxlY3RlZCcpO1xuXHRcdFx0dGhpcy5saXN0LnJlcGxhY2VDaGlsZHJlbigpO1xuXHRcdFx0dGhpcy5yZXN1bHRzLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3duJyk7XG5cblx0XHRcdGlmIChhcnRpc3QpIHtcblx0XHRcdFx0YXJ0aXN0LnZhbHVlID0gJyc7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChnZW5yZSkge1xuXHRcdFx0XHRnZW5yZS5kYXRhc2V0LnZhbHVlID0gZ2VucmUuZGF0YXNldC5kZWZhdWx0O1xuXHRcdFx0XHRnZW5yZS50ZXh0Q29udGVudCA9IGdlbnJlLmRhdGFzZXQuZGVmYXVsdDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGRlY2FkZSkge1xuXHRcdFx0XHRkZWNhZGUuZGF0YXNldC52YWx1ZSA9IGRlY2FkZS5kYXRhc2V0LmRlZmF1bHQ7XG5cdFx0XHRcdGRlY2FkZS50ZXh0Q29udGVudCA9IGRlY2FkZS5kYXRhc2V0LmRlZmF1bHQ7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChjb3VudHJ5KSB7XG5cdFx0XHRcdGNvdW50cnkuZGF0YXNldC52YWx1ZSA9IGNvdW50cnkuZGF0YXNldC5kZWZhdWx0O1xuXHRcdFx0XHRjb3VudHJ5LnRleHRDb250ZW50ID0gY291bnRyeS5kYXRhc2V0LmRlZmF1bHQ7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuc2VhcmNoLnNlYXJjaC5jbGFzc0xpc3QuYWRkKCdzaG93bicpO1xuXHRcdFx0dGhpcy5zZWFyY2guc2VhcmNoLnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfX3N1Ym1pdCcpLmNsaWNrKCk7XG5cdFx0fSk7XG5cdH1cblxuXHRzZXRTZWFyY2goc2VhcmNoKSB7XG5cdFx0dGhpcy5zZWFyY2ggPSBzZWFyY2g7XG5cdH1cblxuXHRyZW5kZXJSZXN1bHRzKGRhdGEpIHtcblx0XHRpZiAodGhpcy5yZXN1bHRzKSB7XG5cdFx0XHR0aGlzLnJlc3VsdHMuY2xhc3NMaXN0LmFkZCgnc2hvd24nKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5saXN0KSB7XG5cdFx0XHR0aGlzLmxpc3QucmVwbGFjZUNoaWxkcmVuKCk7XG5cblx0XHRcdGZvciAobGV0IHZhbHVlIG9mIGRhdGEpIHtcblx0XHRcdFx0bGV0IHNwbGl0RGF0YSA9IHZhbHVlWzFdLnNwbGl0KCcsJykuZmlsdGVyKHBhcmFtID0+IHBhcmFtICE9PSAnJyk7XG5cblx0XHRcdFx0Zm9yIChsZXQgc2VhcmNoaW5nIG9mIHNwbGl0RGF0YSkge1xuXHRcdFx0XHRcdGxldCBsaSA9IEhUTUwuY3JlYXRlRWxlbWVudCgnbGknLCAncmVzdWx0c19fbGlzdC1pdGVtJywge1xuXHRcdFx0XHRcdFx0J2RhdGEtdmFsdWUnOiBzZWFyY2hpbmcsXG5cdFx0XHRcdFx0XHQnZGF0YS1mb3JtJzogdmFsdWVbMF1cblx0XHRcdFx0XHR9LCBzZWFyY2hpbmcpO1xuXG5cdFx0XHRcdFx0bGkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpID0+IHtcblx0XHRcdFx0XHRcdGxpLnJlbW92ZSgpO1xuXG5cdFx0XHRcdFx0XHRsZXQgb2xkSXRlbXMgPSB0aGlzLmxpc3QucXVlcnlTZWxlY3RvckFsbCgnbGknKSxcblx0XHRcdFx0XHRcdFx0bmV3RGF0YSA9IHt9LFxuXHRcdFx0XHRcdFx0XHRzZW5kRGF0YSA9IFtdO1xuXG5cdFx0XHRcdFx0XHRmb3IgKGxldCBpdGVtIG9mIG9sZEl0ZW1zKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHt2YWx1ZSwgZm9ybX0gPSBpdGVtLmRhdGFzZXQ7XG5cblx0XHRcdFx0XHRcdFx0aWYgKCFuZXdEYXRhW2Zvcm1dKSB7XG5cdFx0XHRcdFx0XHRcdFx0bmV3RGF0YVtmb3JtXSA9IFtdO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0bmV3RGF0YVtmb3JtXS5wdXNoKHZhbHVlKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Zm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKG5ld0RhdGEpKSB7XG5cdFx0XHRcdFx0XHRcdHNlbmREYXRhLnB1c2goW2tleSwgbmV3RGF0YVtrZXldLmpvaW4oJywnKV0pO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR0aGlzLnNlYXJjaC5zZWFyY2hCeURhdGEoc2VuZERhdGEpO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0dGhpcy5saXN0LmFwcGVuZChsaSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTZWFyY2gge1xuXHRjb25zdHJ1Y3RvcihwYWdpbmF0aW9uLCBsaXN0U29uZ3MpIHtcblx0XHR0aGlzLnNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gnKTtcblx0XHR0aGlzLmFsbFNvbmdzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc29uZ3MnKSk7XG5cdFx0dGhpcy5wZXJQYWdlID0gcGFyc2VJbnQobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BlclBhZ2UnKSk7XG5cdFx0dGhpcy5wYWdpbmF0aW9uID0gcGFnaW5hdGlvbjtcblx0XHR0aGlzLmxpc3RTb25ncyA9IGxpc3RTb25ncztcblx0XHR0aGlzLnNlYXJjaEFydGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfX2FydGlzdCcpO1xuXHRcdHRoaXMucmVzdWx0cztcblxuXHRcdGlmICh0aGlzLnNlYXJjaCkge1xuXHRcdFx0dGhpcy5pbml0KCk7XG5cdFx0XHR0aGlzLm9uSW5wdXRBcnRpc3QoKTtcblx0XHR9XG5cdH1cblxuXHRzZXRSZXN1bHQocmVzdWx0KSB7XG5cdFx0dGhpcy5yZXN1bHRzID0gcmVzdWx0O1xuXHR9XG5cblx0b25JbnB1dEFydGlzdCgpIHtcblx0XHRpZiAodGhpcy5zZWFyY2hBcnRpc3QpIHtcblx0XHRcdGNvbnN0IHtsZW5ndGh9ID0gdGhpcy5zZWFyY2hBcnRpc3QuZGF0YXNldDtcblxuXHRcdFx0dGhpcy5zZWFyY2hBcnRpc3QuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG5cdFx0XHRcdGlmICh0aGlzLnNlYXJjaEFydGlzdC52YWx1ZS5sZW5ndGggPiBsZW5ndGgpIHtcblx0XHRcdFx0XHR0aGlzLnNlYXJjaEFydGlzdC5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LmFkZCgnc2hvd24nKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLnNlYXJjaEFydGlzdC5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LnJlbW92ZSgnc2hvd24nKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdCgpIHtcblx0XHR0aGlzLnNlYXJjaC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBldmVudCA9PiB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRsZXQgZGF0YSA9IFtdO1xuXHRcdFx0Y29uc3QgYXJ0aXN0ID0gdGhpcy5zZWFyY2gucXVlcnlTZWxlY3RvcignI2FydGlzdCcpLFxuXHRcdFx0XHRnZW5yZSA9IHRoaXMuc2VhcmNoLnF1ZXJ5U2VsZWN0b3IoJyNnZW5yZSAuc2VhcmNoX19zZWxlY3QtaXRlbS1zZWxlY3RlZCcpLFxuXHRcdFx0XHRkZWNhZGUgPSB0aGlzLnNlYXJjaC5xdWVyeVNlbGVjdG9yKCcjZGVjYWRlIC5zZWFyY2hfX3NlbGVjdC1pdGVtLXNlbGVjdGVkJyksXG5cdFx0XHRcdGNvdW50cnkgPSB0aGlzLnNlYXJjaC5xdWVyeVNlbGVjdG9yKCcjY291bnRyeSAuc2VhcmNoX19zZWxlY3QtaXRlbS1zZWxlY3RlZCcpLFxuXHRcdFx0XHRmYXZvcml0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2NvbnRhaW5lci1pdGVtLmZhdm9yaXRlLnNlbGVjdGVkJyksXG5cdFx0XHRcdHNhdmVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fY29udGFpbmVyLWl0ZW0uc2F2ZWQuc2VsZWN0ZWQnKTtcblxuXHRcdFx0YXJ0aXN0LnZhbHVlID8gZGF0YS5wdXNoKFsnYmFuZCcsIGFydGlzdC52YWx1ZV0pIDogJyc7XG5cdFx0XHRnZW5yZS5kYXRhc2V0LnZhbHVlID8gZGF0YS5wdXNoKFsnc3R5bGUnLCBnZW5yZS5kYXRhc2V0LnZhbHVlXSkgOiAnJztcblx0XHRcdGRlY2FkZS5kYXRhc2V0LnZhbHVlID8gZGF0YS5wdXNoKFsneWVhcicsIGRlY2FkZS5kYXRhc2V0LnZhbHVlXSkgOiAnJztcblx0XHRcdGNvdW50cnkuZGF0YXNldC52YWx1ZSA/IGRhdGEucHVzaChbJ2NvdW50cnknLCBjb3VudHJ5LmRhdGFzZXQudmFsdWVdKSA6ICcnO1xuXHRcdFx0ZmF2b3JpdGUgPyBkYXRhLnB1c2goWydmYXZvcml0ZScsICd0cnVlJ10pIDogJyc7XG5cdFx0XHRzYXZlZCA/IGRhdGEucHVzaChbJ2FkZGVkJywgJ3RydWUnXSkgOiAnJztcblxuXHRcdFx0dGhpcy5zZWFyY2hCeURhdGEoZGF0YSk7XG5cdFx0fSk7XG5cdH1cblxuXHRzZWFyY2hCeURhdGEoZGF0YSkge1xuXHRcdGxldCBtYXRjaGVkID0gW107XG5cdFx0dGhpcy5yZXN1bHRzLnJlc3VsdHMuY2xhc3NMaXN0LnJlbW92ZSgnc2hvd24nKTtcblx0XHR0aGlzLnNlYXJjaC5jbGFzc0xpc3QuYWRkKCdzaG93bicpO1xuXG5cdFx0dGhpcy5hbGxTb25ncy5mb3JFYWNoKHNvbmcgPT4ge1xuXHRcdFx0bGV0IGNvdW50ID0gMDtcblxuXHRcdFx0ZGF0YS5mb3JFYWNoKHNlYXJjaGluZyA9PiB7XG5cdFx0XHRcdGxldCBzZWFyY2ggPSBzb25nW3NlYXJjaGluZ1swXV0udG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpO1xuXG5cdFx0XHRcdGlmICh0eXBlb2Ygc2VhcmNoID09PSBcIm9iamVjdFwiKSB7XG5cdFx0XHRcdFx0c2VhcmNoID0gc2VhcmNoLmpvaW4oJywnKTtcblx0XHRcdFx0fSBlbHNlIGlmICghaXNOYU4oTnVtYmVyKHNlYXJjaCkpICYmIHNlYXJjaGluZ1swXSA9PT0gJ3llYXInKSB7XG5cdFx0XHRcdFx0bGV0IGFycmF5WWVhcnMgPSBzZWFyY2hpbmdbMV0uc3BsaXQoJy0nKTtcblxuXHRcdFx0XHRcdGlmICgrc2VhcmNoID49ICthcnJheVllYXJzWzBdICYmICtzZWFyY2ggPD0gK2FycmF5WWVhcnNbMV0pIHtcblx0XHRcdFx0XHRcdGNvdW50Kys7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHNlYXJjaGluZ1sxXS5pbmRleE9mKCcsJykgIT09IC0xIHx8IHNlYXJjaC5pbmRleE9mKCcsJykgIT09IC0xKSB7XG5cdFx0XHRcdFx0Y29uc3QgYXJyYXlTZWFyY2ggPSBzZWFyY2guc3BsaXQoJywnKS5maWx0ZXIodmFsdWUgPT4gdmFsdWUgIT09ICcnKSxcblx0XHRcdFx0XHRcdGFycmF5U2VhcmNoaW5nID0gc2VhcmNoaW5nWzFdLnRvTG93ZXJDYXNlKCkuc3BsaXQoJywnKS5maWx0ZXIodmFsdWUgPT4gdmFsdWUgIT09ICcnKSxcblx0XHRcdFx0XHRcdGludGVyc2VjdGlvbiA9IGFycmF5U2VhcmNoLmZpbHRlcihlbGVtZW50ID0+IGFycmF5U2VhcmNoaW5nLmluY2x1ZGVzKGVsZW1lbnQpKTtcblxuXHRcdFx0XHRcdGNvdW50ICs9IGludGVyc2VjdGlvbi5sZW5ndGggPiAwID8gMSA6IDA7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y291bnQgKz0gc2VhcmNoLmluZGV4T2Yoc2VhcmNoaW5nWzFdLnRvTG93ZXJDYXNlKCkpICE9PSAtMSA/IDEgOiAwO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKGNvdW50ID09PSBkYXRhLmxlbmd0aCkge1xuXHRcdFx0XHRtYXRjaGVkLnB1c2goc29uZyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRpZiAoIW1hdGNoZWQubGVuZ3RoKSB7XG5cdFx0XHRtYXRjaGVkID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc29uZ3MnKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuc2VhcmNoLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3duJyk7XG5cdFx0XHR0aGlzLnJlc3VsdHMucmVuZGVyUmVzdWx0cyhkYXRhKTtcblx0XHR9XG5cblx0XHR0aGlzLmxpc3RTb25ncy5zZXRBbGxTb25ncyhtYXRjaGVkKTtcblx0XHR0aGlzLnBhZ2luYXRpb24uc2V0UGFnZUNvdW50KE1hdGguY2VpbChtYXRjaGVkLmxlbmd0aCAvIHRoaXMucGVyUGFnZSkgfHwgMSk7XG5cdFx0dGhpcy5wYWdpbmF0aW9uLnJlbmRlclBhZ2luYXRpb24oKTtcblxuXHRcdGxldCBwYWdpbmF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2luYXRpb25fX3BhZ2UnKTtcblxuXHRcdGlmIChwYWdpbmF0aW9uKSB7XG5cdFx0XHRwYWdpbmF0aW9uLmNsaWNrKCk7XG5cdFx0fVxuXHR9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi9hZGRpdGlvbmFsL2dldC1kYXRhLXNvbmdzJztcbmltcG9ydCBDdXN0b21TZWxlY3RvcnMgZnJvbSBcIi4vc2VhcmNoL2N1c3RvbS1zZWxlY3RvcnNcIjtcbmltcG9ydCBQYWdpbmF0aW9uIGZyb20gXCIuL3NlYXJjaC9wYWdpbmF0aW9uXCI7XG5pbXBvcnQgU2VhcmNoIGZyb20gXCIuL3NlYXJjaC9zZWFyY2hcIjtcbmltcG9ydCBMaXN0U29uZ3MgZnJvbSBcIi4vc2VhcmNoL2xpc3Qtc29uZ3NcIjtcbmltcG9ydCBIZWFkZXIgZnJvbSBcIi4vc2VhcmNoL2hlYWRlclwiO1xuaW1wb3J0IFJlc3VsdHMgZnJvbSBcIi4vc2VhcmNoL3Jlc3VsdHNcIjtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuXHRjb25zdCBsaXN0U29uZ3MgPSBuZXcgTGlzdFNvbmdzKCksXG5cdFx0cGFnaW5hdGlvbiA9IG5ldyBQYWdpbmF0aW9uKGxpc3RTb25ncyksXG5cdFx0c2VhcmNoID0gbmV3IFNlYXJjaChwYWdpbmF0aW9uLCBsaXN0U29uZ3MpLFxuXHRcdHJlc3VsdHMgPSBuZXcgUmVzdWx0cygpO1xuXG5cdG5ldyBDdXN0b21TZWxlY3RvcnMoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaCcpKTtcblx0bmV3IEhlYWRlcigpO1xuXG5cdHNlYXJjaC5zZXRSZXN1bHQocmVzdWx0cyk7XG5cdHJlc3VsdHMuc2V0U2VhcmNoKHNlYXJjaCk7XG5cblx0ZnVuY3Rpb24gY2hhbmdlU2l6ZUltYWdlcygpIHtcblx0XHRsZXQgbGlzdEltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zb25nc19faXRlbS1pbWcnKTtcblxuXHRcdGlmIChsaXN0SW1hZ2VzLmxlbmd0aCkge1xuXHRcdFx0Y29uc3QgcGFyZW50U2l6ZSA9IGxpc3RJbWFnZXNbMF0ucGFyZW50RWxlbWVudC5vZmZzZXRXaWR0aCxcblx0XHRcdFx0bmV3U2l6ZSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCA8IDM5MCA/IHBhcmVudFNpemUgOiAxNjk7XG5cblx0XHRcdGxpc3RJbWFnZXMuZm9yRWFjaChpbWFnZSA9PiB7XG5cdFx0XHRcdGltYWdlLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBgJHtuZXdTaXplfXB4YCk7XG5cdFx0XHRcdGltYWdlLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgYCR7bmV3U2l6ZX1weGApO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0Y2hhbmdlU2l6ZUltYWdlcygpO1xuXHR3aW5kb3cub25yZXNpemUgPSBjaGFuZ2VTaXplSW1hZ2VzO1xufSk7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbInZhbHVlIl0sInNvdXJjZVJvb3QiOiIifQ==