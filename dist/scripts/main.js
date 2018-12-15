"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

window.addEventListener("load", function () {
  var Phone =
  /*#__PURE__*/
  function () {
    function Phone(diller, model, imageUrl, battery, description, phonesSelector) {
      _classCallCheck(this, Phone);

      this.diller = diller;
      this.model = model;
      this.imageUrl = imageUrl;
      this.battery = battery;
      this.description = description;
      this.phonesSelector = phonesSelector;
    }

    _createClass(Phone, [{
      key: "asElement",
      value: function asElement() {
        var phone = document.createElement("div");
        phone.className = "phone";
        phone.innerHTML = "\n                    <img src=\"".concat(this.imageUrl, "\" alt=\"phone\">\n                    <button class=\"detailsBtn\">details</button>\n                ");
        this.phonesSelector.appendChild(phone);
        return phone;
      }
    }]);

    return Phone;
  }();

  var Manager =
  /*#__PURE__*/
  function () {
    function Manager() {
      _classCallCheck(this, Manager);

      this.phones = [];
    }

    _createClass(Manager, [{
      key: "addPhone",
      value: function addPhone(phone) {
        this.phones.push(phone);
      }
    }, {
      key: "remove",
      value: function remove(index) {
        this.phones.splice(index, 1);
      }
    }, {
      key: "getAll",
      value: function getAll() {
        return this.phones;
      }
    }]);

    return Manager;
  }();

  var PhonesManager =
  /*#__PURE__*/
  function (_Manager) {
    _inherits(PhonesManager, _Manager);

    function PhonesManager() {
      var _this;

      _classCallCheck(this, PhonesManager);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(PhonesManager).call(this));

      _this.init();

      return _this;
    }

    _createClass(PhonesManager, [{
      key: "loadComponents",
      value: function loadComponents() {
        this.selectorList = document.querySelector(".phones");
        this.addBtn = document.querySelector(".add");
        this.inputDillerSelector = document.querySelector("#diller");
        this.inputModelSelector = document.querySelector("#model");
        this.inputImgUrlSelector = document.querySelector("#image");
        this.inputBatterySelector = document.querySelector("#battery");
        this.inputDescriptionSelector = document.querySelector("#desc");
        this.contextMenuSelector = document.querySelector(".contextMenu");
        this.contextMenuSelectorAsString = ".contextMenu";
        this.contextShow = document.querySelector(".contextShow");
        this.contextDelete = document.querySelector(".contextDelete");
        this.description = document.querySelector(".description");
      }
    }, {
      key: "init",
      value: function init() {
        this.loadComponents();
        this.addPhoneBtn();
      }
    }, {
      key: "addPhoneBtn",
      value: function addPhoneBtn() {
        var _this2 = this;

        this.addBtn.addEventListener("click", function () {
          if (_this2.inputDillerSelector.value !== "") {
            var _phone = new Phone(_this2.inputDillerSelector.value, _this2.inputModelSelector.value, _this2.inputImgUrlSelector.value, _this2.inputBatterySelector.value, _this2.inputDescriptionSelector.value, _this2.selectorList);

            _this2.addPhone(_phone); //clear inputs


            _this2.inputDillerSelector.value = "";
            _this2.inputModelSelector.value = "";
            _this2.inputImgUrlSelector.value = "";
            _this2.inputBatterySelector.value = "";
            _this2.inputDescriptionSelector.value = "";

            _this2.updateView();
          }
        });
      }
    }, {
      key: "viewPhoneBtn",
      value: function viewPhoneBtn() {
        var _this3 = this;

        this.selectorList.addEventListener("click", function (e) {
          if (e.target.closest(".detailsBtn")) {
            var index = e.target.closest(".phone").getAttribute("data-index");

            _this3.showPhone(index);
          }
        });
      }
    }, {
      key: "showPhone",
      value: function showPhone(index) {
        this.description.innerHTML = "";
        var phoneHeader = document.createElement("div");
        phoneHeader.className = "phoneHeader"; //add image

        var image = document.createElement("img");
        image.setAttribute("src", "".concat(this.phones[index].imageUrl));
        image.setAttribute("alt", "phone");
        phoneHeader.appendChild(image); //add info

        var phoneInfo = document.createElement("div");
        phoneInfo.className = "phoneInfo";
        var phoneInfoElement = "\n                    <div class=\"dillerInfo\">\n                        <p style=\"font-weight: bold\">diller: </p>\n                        <p style=\"text-align: right\">".concat(this.phones[index].diller, "</p>\n                    </div>\n                    <div class=\"modelInfo\">\n                        <p style=\"font-weight: bold\">model: </p>\n                        <p style=\"text-align: right\">").concat(this.phones[index].model, "</p>\n                    </div>\n                    <div class=\"batteryInfo\">\n                        <p style=\"font-weight: bold\">battery: </p>\n                        <p style=\"text-align: right\">").concat(this.phones[index].battery, "</p>\n                    </div>\n                </div>\n            ");
        phoneInfo.innerHTML = phoneInfoElement;
        phoneHeader.appendChild(phoneInfo); //add description

        var descriptionInfo = document.createElement("div");
        descriptionInfo.className = "descriptionInfo";
        var descriptionInfoElement = "\n                <p style=\"font-weight: bold\">description: </p>\n                <p>".concat(this.phones[index].description, "</p>\n            ");
        descriptionInfo.innerHTML = descriptionInfoElement; //add all

        this.description.appendChild(phoneHeader);
        this.description.appendChild(descriptionInfo);
      }
    }, {
      key: "updateView",
      value: function updateView() {
        var _this4 = this;

        this.selectorList.innerHTML = "";
        this.getAll().forEach(function (note, i) {
          var phoneElem = note.asElement();
          phoneElem.dataset.index = i;

          _this4.selectorList.appendChild(phoneElem);
        });
        this.viewPhoneBtn();
        this.contextMenu(this.contextMenuSelectorAsString);
      }
    }, {
      key: "contextMenu",
      value: function contextMenu(contextSelector) {
        var _this5 = this;

        this.selectorList.addEventListener("contextmenu", function (e) {
          e.preventDefault();

          if (e.target.closest(".phone")) {
            var index = e.target.closest(".phone").getAttribute("data-index");

            _this5.contextMenuSelector.classList.add("active");

            _this5.contextMenuSelector.style.left = e.clientX + "px";
            _this5.contextMenuSelector.style.top = e.clientY + "px"; //show

            _this5.contextShow.addEventListener("click", function (e) {
              _this5.showPhone(index);

              _this5.contextMenuSelector.classList.remove("active");
            }); //need to fix
            //delete


            _this5.contextDelete.addEventListener("click", function (e) {
              _this5.removePhone(index);

              _this5.contextMenuSelector.classList.remove("active");

              _this5.description.innerHTML = "";
            });

            document.addEventListener("click", function (e) {
              if (!e.target.matches(contextSelector)) {
                e.preventDefault();

                _this5.contextMenuSelector.classList.remove("active");
              }
            });
          }
        });
      }
    }, {
      key: "removePhone",
      value: function removePhone(index) {
        this.remove(index);
        this.updateView();
      }
    }]);

    return PhonesManager;
  }(Manager);

  var phonesManager = new PhonesManager(); //test

  var phone = new Phone("iPhone", "X", "./images/iPhoneX.png", "2716mAh", "The anniversary iPhone is here. The iPhone X. Or the iPhone 10. The name is as confusing as the product itself is game-changing. Tim Cook's vision finally overwhelmed Steve Jobs ideological remnants. A new dawn for the iPhones has begun, free of the iconic Home key and the notorious screen bezels.", document.querySelector(".phones"));
  phonesManager.addPhone(phone);
  phonesManager.updateView();
  phonesManager.showPhone(0); //////
});