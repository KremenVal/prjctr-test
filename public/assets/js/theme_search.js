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
              searching.push(item.textContent.replace(/(\r\n|\n|\r|\t)/gm, "").replaceAll(" ", ""));
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
      window.dispatchEvent(new Event("resize"));
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
      if (this.list.children.length === 0) {
        this.reset.click();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05PO0FBQ2lEO0FBQ1g7QUFDUjtBQUNPO0FBQ1A7QUFDRTtBQUV2QyxTQUFTLGlCQUFpQixvQkFBb0IsTUFBTTtBQUNuRCxRQUFNLFlBQVksSUFBSSwwREFBUyxDQUFDLEdBQy9CLGFBQWEsSUFBSSwwREFBVSxDQUFDLFNBQVMsR0FDckMsU0FBUyxJQUFJLHNEQUFNLENBQUMsWUFBWSxTQUFTLEdBQ3pDLFVBQVUsSUFBSSx1REFBTyxDQUFDO0FBRXZCLE1BQUksZ0VBQWUsQ0FBQyxTQUFTLGNBQWMsU0FBUyxDQUFDO0FBQ3JELE1BQUksc0RBQU0sQ0FBQztBQUVYLFNBQU8sVUFBVSxPQUFPO0FBQ3hCLFVBQVEsVUFBVSxNQUFNO0FBRXhCLFdBQVMsbUJBQW1CO0FBQzNCLFFBQUksYUFBYSxTQUFTLGlCQUFpQixrQkFBa0I7QUFFN0QsUUFBSSxXQUFXLFFBQVE7QUFDdEIsWUFBTSxhQUFhLFdBQVcsQ0FBQyxFQUFFLGNBQWMsYUFDOUMsVUFBVSxTQUFTLGdCQUFnQixjQUFjLE1BQU0sYUFBYTtBQUVyRSxpQkFBVyxRQUFRLFdBQVM7QUFDM0IsY0FBTSxhQUFhLFNBQVMsR0FBRyxXQUFXO0FBQzFDLGNBQU0sYUFBYSxVQUFVLEdBQUcsV0FBVztBQUFBLE1BQzVDLENBQUM7QUFBQSxJQUNGO0FBQUEsRUFDRDtBQUVBLG1CQUFpQjtBQUNqQixTQUFPLFdBQVc7QUFDbkIsQ0FBQzs7Ozs7Ozs7Ozs7QUNwQ0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9hZGRpdGlvbmFsL2dldC1kYXRhLXNvbmdzLmpzIiwid2VicGFjazovLy8uL2pzL2FkZGl0aW9uYWwvaHRtbC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9zZWFyY2gvY3VzdG9tLXNlbGVjdG9ycy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9zZWFyY2gvaGVhZGVyLmpzIiwid2VicGFjazovLy8uL2pzL3NlYXJjaC9saXN0LXNvbmdzLmpzIiwid2VicGFjazovLy8uL2pzL3NlYXJjaC9wYWdpbmF0aW9uLmpzIiwid2VicGFjazovLy8uL2pzL3NlYXJjaC9yZXN1bHRzLmpzIiwid2VicGFjazovLy8uL2pzL3NlYXJjaC9zZWFyY2guanMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL2pzL3RoZW1lLXNlYXJjaC5qcyIsIndlYnBhY2s6Ly8vLi9jc3MvdGhlbWUtc2VhcmNoLnNjc3MiXSwic291cmNlc0NvbnRlbnQiOlsibGV0IHNvbmdzID0gW107XG5jb25zdCBiYW5kcyA9IFsnQUMvREMnLCAnSW1hZ2luZSBEcmFnb25zJywgJ01ldGFsbGljYScsICdTa2lsbGV0J10sXG5cdGdlbnJlcyA9IFsnUm9jaycsICdGdW5rJywgJ0JlYXRzJywgJ0hpcCBIb3AnLCAnUG9wJywgJ1JhcCddLFxuXHRzb25nc0xpc3QgPSBbJ09uZSBNb3JlIFRpbWUnLCAnQWVyb2R5bmFtaWMnLCAnRGlnaXRhbCBMb3ZlJywgJ0xldCBUaGVyZSBCZSBSb2NrJ10sXG5cdGNvdW50cmllcyA9IFsnVVNBJywgJ1VLJywgJ1VBJywgJ1BMJywgJ1VBRScsICdKUCddO1xuXG5mdW5jdGlvbiBnZXRSYW5kb21WYWx1ZShhcnJheSkge1xuXHRyZXR1cm4gYXJyYXlbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXJyYXkubGVuZ3RoKV07XG59XG5cbmZvciAobGV0IGkgPSAxOyBpIDw9IDQ4OyBpKyspIHtcblx0c29uZ3MucHVzaCh7XG5cdFx0aWQ6IGksXG5cdFx0ZmF2b3JpdGU6IGZhbHNlLFxuXHRcdGltZzogYHB1YmxpYy9pbWcvc29uZ3MvbGlzdC9zb25nJHtpfS5qcGVnYCxcblx0XHRzb25nOiBnZXRSYW5kb21WYWx1ZShzb25nc0xpc3QpLFxuXHRcdGJhbmQ6IGdldFJhbmRvbVZhbHVlKGJhbmRzKSxcblx0XHR5ZWFyOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMjAzMCAtIDE5NTApKSArIDE5NTAsXG5cdFx0c3R5bGU6IFtnZXRSYW5kb21WYWx1ZShnZW5yZXMpXSxcblx0XHRjb3VudHJ5OiBnZXRSYW5kb21WYWx1ZShjb3VudHJpZXMpLFxuXHRcdGFkZGVkOiBmYWxzZVxuXHR9KTtcbn1cblxuaWYgKCFsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc29uZ3MnKSkge1xuXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc29uZ3MnLCBKU09OLnN0cmluZ2lmeShzb25ncykpO1xuXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncGVyUGFnZScsICc2Jyk7XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgSFRNTCB7XG5cdHN0YXRpYyBjcmVhdGVFbGVtZW50KGVsZW1lbnROYW1lLCBjbGFzc05hbWUgPSAnJywgYXR0cmlidXRlcyA9IG51bGwsIHRleHQgPSAnJykge1xuXHRcdGlmICghZWxlbWVudE5hbWUubGVuZ3RoKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cblx0XHRsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudE5hbWUpO1xuXG5cdFx0aWYgKGF0dHJpYnV0ZXMpIHtcblx0XHRcdGZvciAobGV0IGtleSBpbiBhdHRyaWJ1dGVzKSB7XG5cdFx0XHRcdGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgYXR0cmlidXRlc1trZXldKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoY2xhc3NOYW1lKSB7XG5cdFx0XHRlbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcblx0XHR9XG5cblx0XHRpZiAodGV4dCkge1xuXHRcdFx0ZWxlbWVudC5hcHBlbmRDaGlsZChIVE1MLmNyZWF0ZVRleHQodGV4dCkpO1xuXHRcdH1cblxuXHRcdHJldHVybiBlbGVtZW50O1xuXHR9XG5cblx0c3RhdGljIGNyZWF0ZVRleHQodGV4dCA9IG51bGwpIHtcblx0XHRyZXR1cm4gdGV4dCA/IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpIDogbnVsbDtcblx0fVxufVxuIiwiaW1wb3J0IEhUTUwgZnJvbSBcIi4uL2FkZGl0aW9uYWwvaHRtbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdXN0b21TZWxlY3RvcnMge1xuXHRjb25zdHJ1Y3RvcihwYXJlbnQpIHtcblx0XHRpZiAocGFyZW50KSB7XG5cdFx0XHR0aGlzLnBhcmVudCA9IHBhcmVudDtcblx0XHRcdHRoaXMuc2VsZWN0ZWRJdGVtID0gdGhpcy5wYXJlbnQucXVlcnlTZWxlY3RvckFsbCgnLnNlYXJjaF9fc2VsZWN0LWl0ZW0tc2VsZWN0ZWQnKTtcblx0XHRcdHRoaXMuaXRlbXMgPSB0aGlzLnBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2VhcmNoX19zZWxlY3QtaXRlbScpO1xuXHRcdFx0dGhpcy5ib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuXHRcdFx0dGhpcy5jb21ib2JveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfX2NvbWJvYm94Jyk7XG5cdFx0XHR0aGlzLmFsbFNvbmdzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc29uZ3MnKSk7XG5cdFx0XHR0aGlzLmFydGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfX2FydGlzdCcpO1xuXG5cdFx0XHR0aGlzLmluaXRJbnB1dEFydGlzdCgpO1xuXHRcdFx0dGhpcy5pbml0Q29tYm9ib3goKTtcblx0XHRcdHRoaXMuaW5pdFNlbGVjdGVkSXRlbXMoKTtcblx0XHRcdHRoaXMuaW5pdEl0ZW1zKCk7XG5cdFx0XHR0aGlzLm9uQ2xpY2tCb2R5KCk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdElucHV0QXJ0aXN0KCkge1xuXHRcdGlmICh0aGlzLmFydGlzdCkge1xuXHRcdFx0dGhpcy5hcnRpc3QuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoKSA9PiB7XG5cdFx0XHRcdGxldCBzZWFyY2hpbmcgPSB0aGlzLmFydGlzdC52YWx1ZS50b1VwcGVyQ2FzZSgpLFxuXHRcdFx0XHRcdHNlYXJjaCA9IHRoaXMuY29tYm9ib3gucXVlcnlTZWxlY3RvckFsbCgnLnNlYXJjaF9fY29tYm9ib3gtaXRlbScpO1xuXG5cdFx0XHRcdGlmIChzZWFyY2hpbmcgPT09ICcnKSB7XG5cdFx0XHRcdFx0dGhpcy5jb21ib2JveC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93bicpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuY29tYm9ib3guY2xhc3NMaXN0LmFkZCgnc2hvd24nKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGZvciAobGV0IHJlc3VsdCBvZiBzZWFyY2gpIHtcblx0XHRcdFx0XHRsZXQgdGV4dCA9IHJlc3VsdC50ZXh0Q29udGVudCB8fCByZXN1bHQuaW5uZXJUZXh0O1xuXG5cdFx0XHRcdFx0aWYgKHRleHQudG9VcHBlckNhc2UoKS5pbmRleE9mKHNlYXJjaGluZykgPiAtMSkge1xuXHRcdFx0XHRcdFx0cmVzdWx0LnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXN1bHQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0aW5pdENvbWJvYm94KCkge1xuXHRcdGlmICh0aGlzLmNvbWJvYm94KSB7XG5cdFx0XHRsZXQgZGF0YSA9IFtdO1xuXG5cdFx0XHRmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXModGhpcy5hbGxTb25ncykpIHtcblx0XHRcdFx0ZGF0YS5wdXNoKHRoaXMuYWxsU29uZ3Nba2V5XS5iYW5kLCB0aGlzLmFsbFNvbmdzW2tleV0uc29uZyk7XG5cdFx0XHR9XG5cblx0XHRcdGRhdGEgPSBkYXRhLmZpbHRlcigodmFsdWUsIGluZGV4LCBhcnJheSkgPT4gYXJyYXkuaW5kZXhPZih2YWx1ZSkgPT09IGluZGV4KTtcblxuXHRcdFx0Zm9yIChsZXQgaXRlbSBvZiBkYXRhKSB7XG5cdFx0XHRcdGxldCBzcGFuID0gSFRNTC5jcmVhdGVFbGVtZW50KCdzcGFuJywgJ3NlYXJjaF9fY29tYm9ib3gtaXRlbScsIHtcblx0XHRcdFx0XHQnZGF0YS12YWx1ZSc6IGl0ZW1cblx0XHRcdFx0fSwgaXRlbSk7XG5cblx0XHRcdFx0c3Bhbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRcdFx0XHR0aGlzLmFydGlzdC52YWx1ZSA9IGl0ZW07XG5cdFx0XHRcdFx0dGhpcy5jb21ib2JveC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93bicpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHR0aGlzLmNvbWJvYm94LmFwcGVuZChzcGFuKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRpbml0SXRlbXMoKSB7XG5cdFx0aWYgKHRoaXMuaXRlbXMubGVuZ3RoKSB7XG5cdFx0XHRmb3IgKGxldCBpdGVtIG9mIHRoaXMuaXRlbXMpIHtcblx0XHRcdFx0aXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRcdFx0Y29uc3QgcGFyZW50ID0gaXRlbS5wYXJlbnRFbGVtZW50LFxuXHRcdFx0XHRcdFx0c2VsZWN0ZWQgPSBwYXJlbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaF9fc2VsZWN0LWl0ZW0tc2VsZWN0ZWQnKSxcblx0XHRcdFx0XHRcdGlucHV0ID0gaXRlbS5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xuXG5cdFx0XHRcdFx0Zm9yIChsZXQgY2hpbGQgb2YgcGFyZW50LmNoaWxkcmVuKSB7XG5cdFx0XHRcdFx0XHRjaGlsZC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGl0ZW0uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcblxuXHRcdFx0XHRcdGlmIChwYXJlbnQuaWQgPT09ICdnZW5yZScpIHtcblx0XHRcdFx0XHRcdGlucHV0LmNoZWNrZWQgPSAhaW5wdXQuY2hlY2tlZDtcblxuXHRcdFx0XHRcdFx0bGV0IHNlYXJjaGluZyA9IHNlbGVjdGVkLmRhdGFzZXQudmFsdWUuc3BsaXQoJywnKS5maWx0ZXIoZ2VucmUgPT4gZ2VucmUgIT09ICcnKSxcblx0XHRcdFx0XHRcdFx0aW5kZXggPSBzZWFyY2hpbmcuZmluZEluZGV4KHZhbHVlID0+IHZhbHVlLnRvTG93ZXJDYXNlKCkgPT09IGl0ZW0uZGF0YXNldC52YWx1ZS50b0xvd2VyQ2FzZSgpKTtcblxuXHRcdFx0XHRcdFx0aWYgKGluZGV4ICE9PSAtMSkge1xuXHRcdFx0XHRcdFx0XHRzZWFyY2hpbmcuc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHNlYXJjaGluZy5wdXNoKGl0ZW0udGV4dENvbnRlbnQucmVwbGFjZSgvKFxcclxcbnxcXG58XFxyfFxcdCkvZ20sIFwiXCIpLnJlcGxhY2VBbGwoJyAnLCAnJykpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRzZWxlY3RlZC50ZXh0Q29udGVudCA9ICFzZWFyY2hpbmcubGVuZ3RoID8gc2VsZWN0ZWQuZGF0YXNldC5kZWZhdWx0IDogc2VhcmNoaW5nLmpvaW4oJywnKTtcblx0XHRcdFx0XHRcdHNlbGVjdGVkLmRhdGFzZXQudmFsdWUgPSBzZWFyY2hpbmcuam9pbignLCcpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRzZWxlY3RlZC50ZXh0Q29udGVudCA9IGl0ZW0udGV4dENvbnRlbnQ7XG5cdFx0XHRcdFx0XHRzZWxlY3RlZC5kYXRhc2V0LnZhbHVlID0gaXRlbS5kYXRhc2V0LnZhbHVlO1xuXHRcdFx0XHRcdFx0c2VsZWN0ZWQuY2xpY2soKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGluaXRTZWxlY3RlZEl0ZW1zKCkge1xuXHRcdGlmICh0aGlzLnNlbGVjdGVkSXRlbS5sZW5ndGgpIHtcblx0XHRcdGZvciAobGV0IGluZGV4IGluIE9iamVjdC5rZXlzKHRoaXMuc2VsZWN0ZWRJdGVtKSkge1xuXHRcdFx0XHRjb25zdCBwYXJlbnQgPSB0aGlzLnNlbGVjdGVkSXRlbVtpbmRleF0ucGFyZW50RWxlbWVudCxcblx0XHRcdFx0XHRzZWxlY3RlZCA9IHBhcmVudC5xdWVyeVNlbGVjdG9yKCdsaS5zZWxlY3RlZCcpO1xuXG5cdFx0XHRcdGlmIChzZWxlY3RlZCkge1xuXHRcdFx0XHRcdHRoaXMuc2VsZWN0ZWRJdGVtW2luZGV4XS50ZXh0Q29udGVudCA9IHNlbGVjdGVkLnRleHRDb250ZW50O1xuXHRcdFx0XHRcdHRoaXMuc2VsZWN0ZWRJdGVtW2luZGV4XS5kYXRhc2V0LnZhbHVlID0gc2VsZWN0ZWQuZGF0YXNldC52YWx1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuc2VsZWN0ZWRJdGVtW2luZGV4XS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRcdFx0XHR0aGlzLnNlbGVjdGVkSXRlbS5mb3JFYWNoKHNlbGVjdCA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoc2VsZWN0ICE9IHRoaXMuc2VsZWN0ZWRJdGVtW2luZGV4XSAmJiBzZWxlY3QucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW5lZCcpKSB7XG5cdFx0XHRcdFx0XHRcdHNlbGVjdC5jbGljaygpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0cGFyZW50LnNjcm9sbFRvKHtcblx0XHRcdFx0XHRcdHRvcDogMCxcblx0XHRcdFx0XHRcdGJlaGF2aW9yOiAnc21vb3RoJ1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0aWYgKHBhcmVudCAmJiAhcGFyZW50LmNsYXNzTGlzdC5jb250YWlucygnb3BlbmVkJykpIHtcblx0XHRcdFx0XHRcdHBhcmVudC5jbGFzc0xpc3QuYWRkKCdvcGVuZWQnKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cGFyZW50LmNsYXNzTGlzdC5yZW1vdmUoJ29wZW5lZCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0b25DbGlja0JvZHkoKSB7XG5cdFx0aWYgKHRoaXMuYm9keSkge1xuXHRcdFx0dGhpcy5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuXHRcdFx0XHRjb25zdCB7dGFyZ2V0fSA9IGV2ZW50O1xuXG5cdFx0XHRcdGlmICh0YXJnZXQpIHtcblx0XHRcdFx0XHRpZiAoIXRhcmdldC5tYXRjaGVzKCcuc2VhcmNoX19zZWxlY3QtaXRlbS1zZWxlY3RlZCcpICYmXG5cdFx0XHRcdFx0XHQhdGFyZ2V0Lm1hdGNoZXMoJy5zZWFyY2hfX3NlbGVjdC1pdGVtJykgJiYgIXRhcmdldC5tYXRjaGVzKCcuc2VhcmNoX19zZWxlY3QnKSAmJlxuXHRcdFx0XHRcdFx0IXRhcmdldC5tYXRjaGVzKCcuc2VhcmNoX19zZWxlY3QtY2hlY2ttYXJrJykgJiZcblx0XHRcdFx0XHRcdCF0YXJnZXQubWF0Y2hlcygnLnNlYXJjaF9fc2VsZWN0LWxhYmVsJykpIHtcblx0XHRcdFx0XHRcdHRoaXMuc2VsZWN0ZWRJdGVtLmZvckVhY2goc2VsZWN0ID0+IHtcblx0XHRcdFx0XHRcdFx0aWYgKHNlbGVjdC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnb3BlbmVkJykpIHtcblx0XHRcdFx0XHRcdFx0XHRzZWxlY3QuY2xpY2soKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBIZWFkZXIge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmJhY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19jb250YWluZXItYmFjaycpO1xuXHRcdHRoaXMuZmF2b3JpdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19jb250YWluZXItaXRlbS5mYXZvcml0ZScpO1xuXHRcdHRoaXMuc2F2ZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19jb250YWluZXItaXRlbS5zYXZlZCcpO1xuXHRcdHRoaXMuc3VibWl0U2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaF9fc3VibWl0Jyk7XG5cblx0XHR0aGlzLm9uQ2xpY2tCYWNrKCk7XG5cdFx0dGhpcy5vbkNsaWNrRmF2b3JpdGUoKTtcblx0XHR0aGlzLm9uQ2xpY2tTYXZlZCgpO1xuXHR9XG5cblx0b25DbGlja0JhY2soKSB7XG5cdFx0aWYgKHRoaXMuYmFjaykge1xuXHRcdFx0dGhpcy5iYWNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0XHRoaXN0b3J5LmJhY2soKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdG9uQ2xpY2tGYXZvcml0ZSgpIHtcblx0XHRpZiAodGhpcy5mYXZvcml0ZSkge1xuXHRcdFx0dGhpcy5mYXZvcml0ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRcdFx0aWYgKHRoaXMuZmF2b3JpdGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3RlZCcpKSB7XG5cdFx0XHRcdFx0dGhpcy5mYXZvcml0ZS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuZmF2b3JpdGUuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuc3VibWl0U2VhcmNoLmNsaWNrKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRvbkNsaWNrU2F2ZWQoKSB7XG5cdFx0aWYgKHRoaXMuc2F2ZWQpIHtcblx0XHRcdHRoaXMuc2F2ZWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0XHRcdGlmICh0aGlzLnNhdmVkLmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0ZWQnKSkge1xuXHRcdFx0XHRcdHRoaXMuc2F2ZWQuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLnNhdmVkLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLnN1Ym1pdFNlYXJjaC5jbGljaygpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG59IiwiaW1wb3J0IEhUTUwgZnJvbSBcIi4uL2FkZGl0aW9uYWwvaHRtbFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0U29uZ3Mge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLnBlclBhZ2UgPSBwYXJzZUludChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGVyUGFnZScpKTtcblx0XHR0aGlzLmFsbFNvbmdzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc29uZ3MnKSk7XG5cdFx0dGhpcy5wYXJlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc29uZ3MnKTtcblx0fVxuXG5cdHNldEFsbFNvbmdzKGFsbFNvbmdzKSB7XG5cdFx0dGhpcy5hbGxTb25ncyA9IGFsbFNvbmdzO1xuXHR9XG5cblx0cmVuZGVyU29uZ3Moc3RhcnQpIHtcblx0XHRjb25zdCBzb25nc1RvUmVuZGVyID0gdGhpcy5hbGxTb25ncy5zbGljZShzdGFydCwgc3RhcnQgKyB0aGlzLnBlclBhZ2UpO1xuXG5cdFx0aWYgKHRoaXMucGFyZW50KSB7XG5cdFx0XHR0aGlzLnBhcmVudC5yZXBsYWNlQ2hpbGRyZW4oKTtcblxuXHRcdFx0Zm9yIChsZXQgc29uZyBvZiBzb25nc1RvUmVuZGVyKSB7XG5cdFx0XHRcdGxldCBsaSA9IEhUTUwuY3JlYXRlRWxlbWVudCgnbGknLCAnc29uZ3NfX2l0ZW0nLCB7XG5cdFx0XHRcdFx0XHQnZGF0YS1pZCc6IHNvbmcuaWQsXG5cdFx0XHRcdFx0XHQnZGF0YS1mYXZvcml0ZSc6IHNvbmcuZmF2b3JpdGUsXG5cdFx0XHRcdFx0XHQnZGF0YS1zYXZlZCc6IHNvbmcuYWRkZWQsXG5cdFx0XHRcdFx0XHQnZGF0YS1hcnRpc3QnOiBzb25nLmJhbmQsXG5cdFx0XHRcdFx0XHQnZGF0YS1nZW5yZSc6IHNvbmcuc3R5bGUuam9pbignLCcpLFxuXHRcdFx0XHRcdFx0J2RhdGEtZGVjYWRlJzogc29uZy55ZWFyLFxuXHRcdFx0XHRcdFx0J2RhdGEtY291bnRyeSc6IHNvbmcuY291bnRyeSxcblx0XHRcdFx0XHR9KSxcblx0XHRcdFx0XHRpbWcgPSBIVE1MLmNyZWF0ZUVsZW1lbnQoJ2ltZycsICdzb25nc19faXRlbS1pbWcnLCB7XG5cdFx0XHRcdFx0XHRzcmM6IGAuLi8ke3NvbmcuaW1nfWAsXG5cdFx0XHRcdFx0XHRhbHQ6IHNvbmcuc29uZyxcblx0XHRcdFx0XHRcdHdpZHRoOiAnMTY5cHgnLFxuXHRcdFx0XHRcdFx0aGVpZ2h0OiAnMTY5cHgnXG5cdFx0XHRcdFx0fSksXG5cdFx0XHRcdFx0ZmF2b3JpdGUgPSBIVE1MLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCAnc29uZ3NfX2l0ZW0tZmF2b3JpdGUnLCB7XG5cdFx0XHRcdFx0XHQnZGF0YS1mYXZvcml0ZSc6IHNvbmcuZmF2b3JpdGVcblx0XHRcdFx0XHR9KSxcblx0XHRcdFx0XHRzb25nRGF0YUNvbnRhaW5lciA9IEhUTUwuY3JlYXRlRWxlbWVudCgnZGl2JywgJ3NvbmdzX19pdGVtLWNvbnRhaW5lcicpLFxuXHRcdFx0XHRcdHNvbmdOYW1lID0gSFRNTC5jcmVhdGVFbGVtZW50KCdoMicsICdzb25nc19faXRlbS1zb25nJywge30sIHNvbmcuc29uZyksXG5cdFx0XHRcdFx0c29uZ0JhbmQgPSBIVE1MLmNyZWF0ZUVsZW1lbnQoJ2gzJywgJ3NvbmdzX19pdGVtLWJhbmQnLCB7fSwgc29uZy5iYW5kKSxcblx0XHRcdFx0XHRzb25nWWVhciA9IEhUTUwuY3JlYXRlRWxlbWVudCgnc3BhbicsICdzb25nc19faXRlbS15ZWFyJywge30sICdZZWFyIDogJyksXG5cdFx0XHRcdFx0c29uZ1llYXJCYW5kID0gSFRNTC5jcmVhdGVFbGVtZW50KCdzcGFuJywgJycsIHt9LCBzb25nLnllYXIpLFxuXHRcdFx0XHRcdHNvbmdTdHlsZSA9IEhUTUwuY3JlYXRlRWxlbWVudCgnc3BhbicsICdzb25nc19faXRlbS1zdHlsZScsIHt9LCAnU3R5bGUgOiAnKSxcblx0XHRcdFx0XHRzb25nU3R5bGVCYW5kID0gSFRNTC5jcmVhdGVFbGVtZW50KCdzcGFuJywgJycsIHt9LCBzb25nLnN0eWxlLmpvaW4oJywnKSksXG5cdFx0XHRcdFx0c29uZ0NvdW50cnkgPSBIVE1MLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCAnc29uZ3NfX2l0ZW0tY291bnRyeScsIHt9LCAnQ291bnRyeSA6ICcpLFxuXHRcdFx0XHRcdHNvbmdDb3VudHJ5QmFuZCA9IEhUTUwuY3JlYXRlRWxlbWVudCgnc3BhbicsICcnLCB7fSwgc29uZy5jb3VudHJ5KSxcblx0XHRcdFx0XHRzb25nQWRkID0gSFRNTC5jcmVhdGVFbGVtZW50KCdidXR0b24nLCAnc29uZ3NfX2l0ZW0tYWRkJywge1xuXHRcdFx0XHRcdFx0dHlwZTogJ2J1dHRvbidcblx0XHRcdFx0XHR9LCAnQWRkJyk7XG5cblx0XHRcdFx0c29uZ1llYXIuYXBwZW5kKHNvbmdZZWFyQmFuZCk7XG5cdFx0XHRcdHNvbmdTdHlsZS5hcHBlbmQoc29uZ1N0eWxlQmFuZCk7XG5cdFx0XHRcdHNvbmdDb3VudHJ5LmFwcGVuZChzb25nQ291bnRyeUJhbmQpO1xuXHRcdFx0XHRzb25nRGF0YUNvbnRhaW5lci5hcHBlbmQoc29uZ05hbWUsIHNvbmdCYW5kLCBzb25nWWVhciwgc29uZ1N0eWxlLCBzb25nQ291bnRyeSwgc29uZ0FkZClcblx0XHRcdFx0bGkuYXBwZW5kKGltZywgZmF2b3JpdGUsIHNvbmdEYXRhQ29udGFpbmVyKTtcblx0XHRcdFx0ZmF2b3JpdGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0XHRcdFx0Y29uc3QgcmVzdWx0ID0gdGhpcy5jaGFuZ2VEYXRhKHNvbmcuaWQsICdmYXZvcml0ZScpO1xuXG5cdFx0XHRcdFx0bGkuZGF0YXNldC5mYXZvcml0ZSA9IHJlc3VsdC50b1N0cmluZygpO1xuXHRcdFx0XHRcdGZhdm9yaXRlLmRhdGFzZXQuZmF2b3JpdGUgPSByZXN1bHQudG9TdHJpbmcoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHNvbmdBZGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0XHRcdFx0Y29uc3QgcmVzdWx0ID0gdGhpcy5jaGFuZ2VEYXRhKHNvbmcuaWQsICdhZGRlZCcpO1xuXG5cdFx0XHRcdFx0bGkuZGF0YXNldC5hZGRlZCA9IHJlc3VsdC50b1N0cmluZygpO1xuXHRcdFx0XHRcdGZhdm9yaXRlLmRhdGFzZXQuYWRkZWQgPSByZXN1bHQudG9TdHJpbmcoKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0dGhpcy5wYXJlbnQuYXBwZW5kKGxpKTtcblx0XHRcdH1cblxuXHRcdFx0d2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdyZXNpemUnKSk7XG5cdFx0fVxuXHR9XG5cblx0Y2hhbmdlRGF0YShpZCwgbmFtZSkge1xuXHRcdGNvbnN0IGFsbFNvbmdzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc29uZ3MnKSksXG5cdFx0XHRpbmRleCA9IGFsbFNvbmdzLmZpbmRJbmRleChzb25nID0+IHNvbmcuaWQgPT09IGlkKTtcblxuXHRcdGlmIChpbmRleCAhPT0gLTEpIHtcblx0XHRcdGNvbnN0IHZhbHVlID0gbmFtZSAhPT0gJ2FkZGVkJyA/ICFhbGxTb25nc1tpbmRleF1bbmFtZV0gOiB0cnVlO1xuXG5cdFx0XHRhbGxTb25nc1tpbmRleF1bbmFtZV0gPSB2YWx1ZTtcblx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzb25ncycsIEpTT04uc3RyaW5naWZ5KGFsbFNvbmdzKSk7XG5cblx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHR9XG5cdH1cbn0iLCJpbXBvcnQgSFRNTCBmcm9tIFwiLi4vYWRkaXRpb25hbC9odG1sXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZ2luYXRpb24ge1xuXHRjb25zdHJ1Y3RvcihsaXN0U29uZ3MpIHtcblx0XHR0aGlzLnBhZ2luYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnaW5hdGlvbicpO1xuXG5cdFx0aWYgKHRoaXMucGFnaW5hdGlvbikge1xuXHRcdFx0dGhpcy5saXN0U29uZ3MgPSBsaXN0U29uZ3M7XG5cdFx0XHR0aGlzLnBlclBhZ2UgPSBwYXJzZUludChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGVyUGFnZScpKTtcblx0XHRcdHRoaXMuYWxsU29uZ3NMZW5ndGggPSBwYXJzZUludChKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzb25ncycpKS5sZW5ndGgpO1xuXHRcdFx0dGhpcy5wYWdlQ291bnQgPSBNYXRoLmNlaWwodGhpcy5hbGxTb25nc0xlbmd0aCAvIHRoaXMucGVyUGFnZSk7XG5cdFx0XHR0aGlzLnVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG5cdFx0XHR0aGlzLmN1cnJlbnRQYWdlID0gcGFyc2VJbnQodGhpcy51cmxQYXJhbXMuZ2V0KCdwYWdlJykpIHx8IDE7XG5cblx0XHRcdHRoaXMubGlzdFNvbmdzLnJlbmRlclNvbmdzKHRoaXMuZ2V0U3RhcnRMaXN0U29uZ3MoKSk7XG5cdFx0XHR0aGlzLnJlbmRlclBhZ2luYXRpb24oKTtcblx0XHR9XG5cdH1cblxuXHRzZXRQYWdlQ291bnQocGFnZUNvdW50KSB7XG5cdFx0dGhpcy5wYWdlQ291bnQgPSBwYWdlQ291bnQ7XG5cdH1cblxuXHRyZW5kZXJQYWdpbmF0aW9uKCkge1xuXHRcdGNvbnN0IGFycmF5UGFnaW5hdGlvbiA9IHRoaXMuZ2V0UGFnaW5hdGlvbih0aGlzLmN1cnJlbnRQYWdlLCB0aGlzLnBhZ2VDb3VudCk7XG5cblx0XHR0aGlzLnBhZ2luYXRpb24ucmVwbGFjZUNoaWxkcmVuKCk7XG5cblx0XHRpZiAoYXJyYXlQYWdpbmF0aW9uLmxlbmd0aCA+IDEpIHtcblx0XHRcdGFycmF5UGFnaW5hdGlvbi5mb3JFYWNoKHBhZ2UgPT4ge1xuXHRcdFx0XHRsZXQgcGFnZUJ1dHRvbiA9IEhUTUwuY3JlYXRlRWxlbWVudCgnYnV0dG9uJywgJ3BhZ2luYXRpb25fX3BhZ2UnLCB7XG5cdFx0XHRcdFx0J2RhdGEtaW5kZXgnOiBwYWdlLFxuXHRcdFx0XHRcdCdhcmlhLWxhYmVsJzogYFBhZ2UgJHtwYWdlfWBcblx0XHRcdFx0fSwgcGFnZSk7XG5cblx0XHRcdFx0dGhpcy5jdXJyZW50UGFnZSA9PT0gcGFnZSA/IHBhZ2VCdXR0b24uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKSA6ICcnO1xuXG5cdFx0XHRcdHBhZ2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0XHRcdFx0aWYgKHBhZ2UgIT09ICcuLi4nKSB7XG5cdFx0XHRcdFx0XHRjb25zdCB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdCgnPycpWzBdICsgKHBhZ2UgIT09IDEgPyBgP3BhZ2U9JHtwYWdlfWAgOiAnJyk7XG5cdFx0XHRcdFx0XHR0aGlzLnBhZ2luYXRpb24ucmVwbGFjZUNoaWxkcmVuKCk7XG5cdFx0XHRcdFx0XHR0aGlzLmN1cnJlbnRQYWdlID0gcGFnZTtcblx0XHRcdFx0XHRcdGhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIFwiXCIsIHVybCk7XG5cblx0XHRcdFx0XHRcdHRoaXMubGlzdFNvbmdzLnJlbmRlclNvbmdzKHRoaXMuZ2V0U3RhcnRMaXN0U29uZ3MoKSk7XG5cdFx0XHRcdFx0XHR0aGlzLnJlbmRlclBhZ2luYXRpb24oKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHRoaXMucGFnaW5hdGlvbi5hcHBlbmQocGFnZUJ1dHRvbik7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHR0aGlzLmxpc3RTb25ncy5yZW5kZXJTb25ncyh0aGlzLmdldFN0YXJ0TGlzdFNvbmdzKCkpO1xuXHR9XG5cblx0Z2V0UGFnaW5hdGlvbihjdXJyZW50UGFnZSwgcGFnZUNvdW50KSB7XG5cdFx0bGV0IGRlbHRhO1xuXG5cdFx0aWYgKHBhZ2VDb3VudCA8PSA3KSB7XG5cdFx0XHRkZWx0YSA9IDc7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRlbHRhID0gY3VycmVudFBhZ2UgPiA0ICYmIGN1cnJlbnRQYWdlIDwgcGFnZUNvdW50IC0gMyA/IDIgOiA0O1xuXHRcdH1cblxuXHRcdGNvbnN0IHJhbmdlID0ge1xuXHRcdFx0c3RhcnQ6IE1hdGgucm91bmQoY3VycmVudFBhZ2UgLSBkZWx0YSAvIDIpLFxuXHRcdFx0ZW5kOiBNYXRoLnJvdW5kKGN1cnJlbnRQYWdlICsgZGVsdGEgLyAyKVxuXHRcdH07XG5cblx0XHRpZiAocmFuZ2Uuc3RhcnQgLSAxID09PSAxIHx8IHJhbmdlLmVuZCArIDEgPT09IHBhZ2VDb3VudCkge1xuXHRcdFx0cmFuZ2Uuc3RhcnQgKz0gMTtcblx0XHRcdHJhbmdlLmVuZCArPSAxO1xuXHRcdH1cblxuXHRcdGxldCBwYWdlcyA9IGN1cnJlbnRQYWdlID4gZGVsdGEgP1xuXHRcdFx0dGhpcy5nZXRSYW5nZShNYXRoLm1pbihyYW5nZS5zdGFydCwgcGFnZUNvdW50IC0gZGVsdGEpLCBNYXRoLm1pbihyYW5nZS5lbmQsIHBhZ2VDb3VudCkpIDpcblx0XHRcdHRoaXMuZ2V0UmFuZ2UoMSwgTWF0aC5taW4ocGFnZUNvdW50LCBkZWx0YSArIDEpKTtcblxuXHRcdGNvbnN0IHdpdGhEb3RzID0gKHZhbHVlLCBwYWlyKSA9PiAocGFnZXMubGVuZ3RoICsgMSAhPT0gcGFnZUNvdW50ID8gcGFpciA6IFt2YWx1ZV0pO1xuXG5cdFx0aWYgKHBhZ2VzWzBdICE9PSAxKSB7XG5cdFx0XHRwYWdlcyA9IHdpdGhEb3RzKDEsIFsxLCAnLi4uJ10pLmNvbmNhdChwYWdlcyk7XG5cdFx0fVxuXG5cdFx0aWYgKHBhZ2VzW3BhZ2VzLmxlbmd0aCAtIDFdIDwgcGFnZUNvdW50KSB7XG5cdFx0XHRwYWdlcyA9IHBhZ2VzLmNvbmNhdCh3aXRoRG90cyhwYWdlQ291bnQsIFsnLi4uJywgcGFnZUNvdW50XSkpO1xuXHRcdH1cblxuXHRcdHJldHVybiBwYWdlcztcblx0fVxuXG5cdGdldFJhbmdlKHN0YXJ0LCBlbmQpIHtcblx0XHRyZXR1cm4gQXJyYXkoZW5kIC0gc3RhcnQgKyAxKS5maWxsKCkubWFwKCh2LCBpKSA9PiBpICsgc3RhcnQpO1xuXHR9XG5cblx0Z2V0U3RhcnRMaXN0U29uZ3MoKSB7XG5cdFx0cmV0dXJuIHRoaXMucGVyUGFnZSAqICh0aGlzLmN1cnJlbnRQYWdlIC0gMSk7XG5cdH1cbn0iLCJpbXBvcnQgSFRNTCBmcm9tIFwiLi4vYWRkaXRpb25hbC9odG1sXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc3VsdHMge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLnJlc3VsdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVzdWx0cycpO1xuXHRcdHRoaXMubGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXN1bHRzX19saXN0Jyk7XG5cdFx0dGhpcy5yZXNldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXN1bHRzX19vcHRpb25zLXJlc2V0Jyk7XG5cdFx0dGhpcy5zZWFyY2g7XG5cblx0XHRpZiAodGhpcy5yZXNldCkge1xuXHRcdFx0dGhpcy5vbkNsaWNrUmVzZXQoKTtcblx0XHR9XG5cdH1cblxuXHRvbkNsaWNrUmVzZXQoKSB7XG5cdFx0dGhpcy5yZXNldC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRcdGxldCBhcnRpc3QgPSB0aGlzLnNlYXJjaC5zZWFyY2gucXVlcnlTZWxlY3RvcignI2FydGlzdCcpLFxuXHRcdFx0XHRnZW5yZSA9IHRoaXMuc2VhcmNoLnNlYXJjaC5xdWVyeVNlbGVjdG9yKCcjZ2VucmUgLnNlYXJjaF9fc2VsZWN0LWl0ZW0tc2VsZWN0ZWQnKSxcblx0XHRcdFx0ZGVjYWRlID0gdGhpcy5zZWFyY2guc2VhcmNoLnF1ZXJ5U2VsZWN0b3IoJyNkZWNhZGUgLnNlYXJjaF9fc2VsZWN0LWl0ZW0tc2VsZWN0ZWQnKSxcblx0XHRcdFx0Y291bnRyeSA9IHRoaXMuc2VhcmNoLnNlYXJjaC5xdWVyeVNlbGVjdG9yKCcjY291bnRyeSAuc2VhcmNoX19zZWxlY3QtaXRlbS1zZWxlY3RlZCcpO1xuXHRcdFx0dGhpcy5saXN0LnJlcGxhY2VDaGlsZHJlbigpO1xuXHRcdFx0dGhpcy5yZXN1bHRzLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3duJyk7XG5cblx0XHRcdGlmIChhcnRpc3QpIHtcblx0XHRcdFx0YXJ0aXN0LnZhbHVlID0gJyc7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChnZW5yZSkge1xuXHRcdFx0XHRnZW5yZS5kYXRhc2V0LnZhbHVlID0gZ2VucmUuZGF0YXNldC5kZWZhdWx0O1xuXHRcdFx0XHRnZW5yZS50ZXh0Q29udGVudCA9IGdlbnJlLmRhdGFzZXQuZGVmYXVsdDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGRlY2FkZSkge1xuXHRcdFx0XHRkZWNhZGUuZGF0YXNldC52YWx1ZSA9IGRlY2FkZS5kYXRhc2V0LmRlZmF1bHQ7XG5cdFx0XHRcdGRlY2FkZS50ZXh0Q29udGVudCA9IGRlY2FkZS5kYXRhc2V0LmRlZmF1bHQ7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChjb3VudHJ5KSB7XG5cdFx0XHRcdGNvdW50cnkuZGF0YXNldC52YWx1ZSA9IGNvdW50cnkuZGF0YXNldC5kZWZhdWx0O1xuXHRcdFx0XHRjb3VudHJ5LnRleHRDb250ZW50ID0gY291bnRyeS5kYXRhc2V0LmRlZmF1bHQ7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuc2VhcmNoLnNlYXJjaC5jbGFzc0xpc3QuYWRkKCdzaG93bicpO1xuXHRcdFx0dGhpcy5zZWFyY2guc2VhcmNoLnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfX3N1Ym1pdCcpLmNsaWNrKCk7XG5cdFx0fSk7XG5cdH1cblxuXHRzZXRTZWFyY2goc2VhcmNoKSB7XG5cdFx0dGhpcy5zZWFyY2ggPSBzZWFyY2g7XG5cdH1cblxuXHRyZW5kZXJSZXN1bHRzKGRhdGEpIHtcblx0XHRpZiAodGhpcy5yZXN1bHRzKSB7XG5cdFx0XHR0aGlzLnJlc3VsdHMuY2xhc3NMaXN0LmFkZCgnc2hvd24nKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5saXN0KSB7XG5cdFx0XHR0aGlzLmxpc3QucmVwbGFjZUNoaWxkcmVuKCk7XG5cblx0XHRcdGZvciAobGV0IHZhbHVlIG9mIGRhdGEpIHtcblx0XHRcdFx0bGV0IHNwbGl0RGF0YSA9IHZhbHVlWzFdLnNwbGl0KCcsJykuZmlsdGVyKHBhcmFtID0+IHBhcmFtICE9PSAnJyk7XG5cblx0XHRcdFx0Zm9yIChsZXQgc2VhcmNoaW5nIG9mIHNwbGl0RGF0YSkge1xuXHRcdFx0XHRcdGxldCBsaSA9IEhUTUwuY3JlYXRlRWxlbWVudCgnbGknLCAncmVzdWx0c19fbGlzdC1pdGVtJywge1xuXHRcdFx0XHRcdFx0J2RhdGEtdmFsdWUnOiBzZWFyY2hpbmcsXG5cdFx0XHRcdFx0XHQnZGF0YS1mb3JtJzogdmFsdWVbMF1cblx0XHRcdFx0XHR9LCBzZWFyY2hpbmcpO1xuXG5cdFx0XHRcdFx0bGkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpID0+IHtcblx0XHRcdFx0XHRcdGxpLnJlbW92ZSgpO1xuXG5cdFx0XHRcdFx0XHRsZXQgb2xkSXRlbXMgPSB0aGlzLmxpc3QucXVlcnlTZWxlY3RvckFsbCgnbGknKSxcblx0XHRcdFx0XHRcdFx0bmV3RGF0YSA9IHt9LFxuXHRcdFx0XHRcdFx0XHRzZW5kRGF0YSA9IFtdO1xuXG5cdFx0XHRcdFx0XHRmb3IgKGxldCBpdGVtIG9mIG9sZEl0ZW1zKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHt2YWx1ZSwgZm9ybX0gPSBpdGVtLmRhdGFzZXQ7XG5cblx0XHRcdFx0XHRcdFx0aWYgKCFuZXdEYXRhW2Zvcm1dKSB7XG5cdFx0XHRcdFx0XHRcdFx0bmV3RGF0YVtmb3JtXSA9IFtdO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0bmV3RGF0YVtmb3JtXS5wdXNoKHZhbHVlKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Zm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKG5ld0RhdGEpKSB7XG5cdFx0XHRcdFx0XHRcdHNlbmREYXRhLnB1c2goW2tleSwgbmV3RGF0YVtrZXldLmpvaW4oJywnKV0pO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR0aGlzLnNlYXJjaC5zZWFyY2hCeURhdGEoc2VuZERhdGEpO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0dGhpcy5saXN0LmFwcGVuZChsaSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMubGlzdC5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0dGhpcy5yZXNldC5jbGljaygpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaCB7XG5cdGNvbnN0cnVjdG9yKHBhZ2luYXRpb24sIGxpc3RTb25ncykge1xuXHRcdHRoaXMuc2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaCcpO1xuXHRcdHRoaXMuYWxsU29uZ3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzb25ncycpKTtcblx0XHR0aGlzLnBlclBhZ2UgPSBwYXJzZUludChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncGVyUGFnZScpKTtcblx0XHR0aGlzLnBhZ2luYXRpb24gPSBwYWdpbmF0aW9uO1xuXHRcdHRoaXMubGlzdFNvbmdzID0gbGlzdFNvbmdzO1xuXHRcdHRoaXMuc2VhcmNoQXJ0aXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaF9fYXJ0aXN0Jyk7XG5cdFx0dGhpcy5yZXN1bHRzO1xuXG5cdFx0aWYgKHRoaXMuc2VhcmNoKSB7XG5cdFx0XHR0aGlzLmluaXQoKTtcblx0XHRcdHRoaXMub25JbnB1dEFydGlzdCgpO1xuXHRcdH1cblx0fVxuXG5cdHNldFJlc3VsdChyZXN1bHQpIHtcblx0XHR0aGlzLnJlc3VsdHMgPSByZXN1bHQ7XG5cdH1cblxuXHRvbklucHV0QXJ0aXN0KCkge1xuXHRcdGlmICh0aGlzLnNlYXJjaEFydGlzdCkge1xuXHRcdFx0Y29uc3Qge2xlbmd0aH0gPSB0aGlzLnNlYXJjaEFydGlzdC5kYXRhc2V0O1xuXG5cdFx0XHR0aGlzLnNlYXJjaEFydGlzdC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcblx0XHRcdFx0aWYgKHRoaXMuc2VhcmNoQXJ0aXN0LnZhbHVlLmxlbmd0aCA+IGxlbmd0aCkge1xuXHRcdFx0XHRcdHRoaXMuc2VhcmNoQXJ0aXN0Lm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QuYWRkKCdzaG93bicpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuc2VhcmNoQXJ0aXN0Lm5leHRFbGVtZW50U2libGluZy5jbGFzc0xpc3QucmVtb3ZlKCdzaG93bicpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRpbml0KCkge1xuXHRcdHRoaXMuc2VhcmNoLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGV2ZW50ID0+IHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdGxldCBkYXRhID0gW107XG5cdFx0XHRjb25zdCBhcnRpc3QgPSB0aGlzLnNlYXJjaC5xdWVyeVNlbGVjdG9yKCcjYXJ0aXN0JyksXG5cdFx0XHRcdGdlbnJlID0gdGhpcy5zZWFyY2gucXVlcnlTZWxlY3RvcignI2dlbnJlIC5zZWFyY2hfX3NlbGVjdC1pdGVtLXNlbGVjdGVkJyksXG5cdFx0XHRcdGRlY2FkZSA9IHRoaXMuc2VhcmNoLnF1ZXJ5U2VsZWN0b3IoJyNkZWNhZGUgLnNlYXJjaF9fc2VsZWN0LWl0ZW0tc2VsZWN0ZWQnKSxcblx0XHRcdFx0Y291bnRyeSA9IHRoaXMuc2VhcmNoLnF1ZXJ5U2VsZWN0b3IoJyNjb3VudHJ5IC5zZWFyY2hfX3NlbGVjdC1pdGVtLXNlbGVjdGVkJyksXG5cdFx0XHRcdGZhdm9yaXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fY29udGFpbmVyLWl0ZW0uZmF2b3JpdGUuc2VsZWN0ZWQnKSxcblx0XHRcdFx0c2F2ZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19jb250YWluZXItaXRlbS5zYXZlZC5zZWxlY3RlZCcpO1xuXG5cdFx0XHRhcnRpc3QudmFsdWUgPyBkYXRhLnB1c2goWydiYW5kJywgYXJ0aXN0LnZhbHVlXSkgOiAnJztcblx0XHRcdGdlbnJlLmRhdGFzZXQudmFsdWUgPyBkYXRhLnB1c2goWydzdHlsZScsIGdlbnJlLmRhdGFzZXQudmFsdWVdKSA6ICcnO1xuXHRcdFx0ZGVjYWRlLmRhdGFzZXQudmFsdWUgPyBkYXRhLnB1c2goWyd5ZWFyJywgZGVjYWRlLmRhdGFzZXQudmFsdWVdKSA6ICcnO1xuXHRcdFx0Y291bnRyeS5kYXRhc2V0LnZhbHVlID8gZGF0YS5wdXNoKFsnY291bnRyeScsIGNvdW50cnkuZGF0YXNldC52YWx1ZV0pIDogJyc7XG5cdFx0XHRmYXZvcml0ZSA/IGRhdGEucHVzaChbJ2Zhdm9yaXRlJywgJ3RydWUnXSkgOiAnJztcblx0XHRcdHNhdmVkID8gZGF0YS5wdXNoKFsnYWRkZWQnLCAndHJ1ZSddKSA6ICcnO1xuXG5cdFx0XHR0aGlzLnNlYXJjaEJ5RGF0YShkYXRhKTtcblx0XHR9KTtcblx0fVxuXG5cdHNlYXJjaEJ5RGF0YShkYXRhKSB7XG5cdFx0bGV0IG1hdGNoZWQgPSBbXTtcblx0XHR0aGlzLnJlc3VsdHMucmVzdWx0cy5jbGFzc0xpc3QucmVtb3ZlKCdzaG93bicpO1xuXHRcdHRoaXMuc2VhcmNoLmNsYXNzTGlzdC5hZGQoJ3Nob3duJyk7XG5cblx0XHR0aGlzLmFsbFNvbmdzLmZvckVhY2goc29uZyA9PiB7XG5cdFx0XHRsZXQgY291bnQgPSAwO1xuXG5cdFx0XHRkYXRhLmZvckVhY2goc2VhcmNoaW5nID0+IHtcblx0XHRcdFx0bGV0IHNlYXJjaCA9IHNvbmdbc2VhcmNoaW5nWzBdXS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCk7XG5cblx0XHRcdFx0aWYgKHR5cGVvZiBzZWFyY2ggPT09IFwib2JqZWN0XCIpIHtcblx0XHRcdFx0XHRzZWFyY2ggPSBzZWFyY2guam9pbignLCcpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCFpc05hTihOdW1iZXIoc2VhcmNoKSkgJiYgc2VhcmNoaW5nWzBdID09PSAneWVhcicpIHtcblx0XHRcdFx0XHRsZXQgYXJyYXlZZWFycyA9IHNlYXJjaGluZ1sxXS5zcGxpdCgnLScpO1xuXG5cdFx0XHRcdFx0aWYgKCtzZWFyY2ggPj0gK2FycmF5WWVhcnNbMF0gJiYgK3NlYXJjaCA8PSArYXJyYXlZZWFyc1sxXSkge1xuXHRcdFx0XHRcdFx0Y291bnQrKztcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoc2VhcmNoaW5nWzFdLmluZGV4T2YoJywnKSAhPT0gLTEgfHwgc2VhcmNoLmluZGV4T2YoJywnKSAhPT0gLTEpIHtcblx0XHRcdFx0XHRjb25zdCBhcnJheVNlYXJjaCA9IHNlYXJjaC5zcGxpdCgnLCcpLmZpbHRlcih2YWx1ZSA9PiB2YWx1ZSAhPT0gJycpLFxuXHRcdFx0XHRcdFx0YXJyYXlTZWFyY2hpbmcgPSBzZWFyY2hpbmdbMV0udG9Mb3dlckNhc2UoKS5zcGxpdCgnLCcpLmZpbHRlcih2YWx1ZSA9PiB2YWx1ZSAhPT0gJycpLFxuXHRcdFx0XHRcdFx0aW50ZXJzZWN0aW9uID0gYXJyYXlTZWFyY2guZmlsdGVyKGVsZW1lbnQgPT4gYXJyYXlTZWFyY2hpbmcuaW5jbHVkZXMoZWxlbWVudCkpO1xuXG5cdFx0XHRcdFx0Y291bnQgKz0gaW50ZXJzZWN0aW9uLmxlbmd0aCA+IDAgPyAxIDogMDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjb3VudCArPSBzZWFyY2guaW5kZXhPZihzZWFyY2hpbmdbMV0udG9Mb3dlckNhc2UoKSkgIT09IC0xID8gMSA6IDA7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAoY291bnQgPT09IGRhdGEubGVuZ3RoKSB7XG5cdFx0XHRcdG1hdGNoZWQucHVzaChzb25nKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGlmICghbWF0Y2hlZC5sZW5ndGgpIHtcblx0XHRcdG1hdGNoZWQgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzb25ncycpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZWFyY2guY2xhc3NMaXN0LnJlbW92ZSgnc2hvd24nKTtcblx0XHRcdHRoaXMucmVzdWx0cy5yZW5kZXJSZXN1bHRzKGRhdGEpO1xuXHRcdH1cblxuXHRcdHRoaXMubGlzdFNvbmdzLnNldEFsbFNvbmdzKG1hdGNoZWQpO1xuXHRcdHRoaXMucGFnaW5hdGlvbi5zZXRQYWdlQ291bnQoTWF0aC5jZWlsKG1hdGNoZWQubGVuZ3RoIC8gdGhpcy5wZXJQYWdlKSB8fCAxKTtcblx0XHR0aGlzLnBhZ2luYXRpb24ucmVuZGVyUGFnaW5hdGlvbigpO1xuXG5cdFx0bGV0IHBhZ2luYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnaW5hdGlvbl9fcGFnZScpO1xuXG5cdFx0aWYgKHBhZ2luYXRpb24pIHtcblx0XHRcdHBhZ2luYXRpb24uY2xpY2soKTtcblx0XHR9XG5cdH1cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuL2FkZGl0aW9uYWwvZ2V0LWRhdGEtc29uZ3MnO1xuaW1wb3J0IEN1c3RvbVNlbGVjdG9ycyBmcm9tIFwiLi9zZWFyY2gvY3VzdG9tLXNlbGVjdG9yc1wiO1xuaW1wb3J0IFBhZ2luYXRpb24gZnJvbSBcIi4vc2VhcmNoL3BhZ2luYXRpb25cIjtcbmltcG9ydCBTZWFyY2ggZnJvbSBcIi4vc2VhcmNoL3NlYXJjaFwiO1xuaW1wb3J0IExpc3RTb25ncyBmcm9tIFwiLi9zZWFyY2gvbGlzdC1zb25nc1wiO1xuaW1wb3J0IEhlYWRlciBmcm9tIFwiLi9zZWFyY2gvaGVhZGVyXCI7XG5pbXBvcnQgUmVzdWx0cyBmcm9tIFwiLi9zZWFyY2gvcmVzdWx0c1wiO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG5cdGNvbnN0IGxpc3RTb25ncyA9IG5ldyBMaXN0U29uZ3MoKSxcblx0XHRwYWdpbmF0aW9uID0gbmV3IFBhZ2luYXRpb24obGlzdFNvbmdzKSxcblx0XHRzZWFyY2ggPSBuZXcgU2VhcmNoKHBhZ2luYXRpb24sIGxpc3RTb25ncyksXG5cdFx0cmVzdWx0cyA9IG5ldyBSZXN1bHRzKCk7XG5cblx0bmV3IEN1c3RvbVNlbGVjdG9ycyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoJykpO1xuXHRuZXcgSGVhZGVyKCk7XG5cblx0c2VhcmNoLnNldFJlc3VsdChyZXN1bHRzKTtcblx0cmVzdWx0cy5zZXRTZWFyY2goc2VhcmNoKTtcblxuXHRmdW5jdGlvbiBjaGFuZ2VTaXplSW1hZ2VzKCkge1xuXHRcdGxldCBsaXN0SW1hZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNvbmdzX19pdGVtLWltZycpO1xuXG5cdFx0aWYgKGxpc3RJbWFnZXMubGVuZ3RoKSB7XG5cdFx0XHRjb25zdCBwYXJlbnRTaXplID0gbGlzdEltYWdlc1swXS5wYXJlbnRFbGVtZW50Lm9mZnNldFdpZHRoLFxuXHRcdFx0XHRuZXdTaXplID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIDwgMzkwID8gcGFyZW50U2l6ZSA6IDE2OTtcblxuXHRcdFx0bGlzdEltYWdlcy5mb3JFYWNoKGltYWdlID0+IHtcblx0XHRcdFx0aW1hZ2Uuc2V0QXR0cmlidXRlKCd3aWR0aCcsIGAke25ld1NpemV9cHhgKTtcblx0XHRcdFx0aW1hZ2Uuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBgJHtuZXdTaXplfXB4YCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRjaGFuZ2VTaXplSW1hZ2VzKCk7XG5cdHdpbmRvdy5vbnJlc2l6ZSA9IGNoYW5nZVNpemVJbWFnZXM7XG59KTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOlsidmFsdWUiXSwic291cmNlUm9vdCI6IiJ9