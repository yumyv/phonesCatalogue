window.addEventListener("load", function () {
    class Phone {
        constructor(diller, model, imageUrl, battery, description, phonesSelector) {
            this.diller = diller;
            this.model = model;
            this.imageUrl = imageUrl;
            this.battery = battery;
            this.description = description;
            this.phonesSelector = phonesSelector;
        }

        asElement() {
            let phone = document.createElement("div");
            phone.className = "phone";
            phone.innerHTML = `
                    <img src="${this.imageUrl}" alt="phone">
                    <button class="detailsBtn">Details</button>
                `;
            this.phonesSelector.appendChild(phone);
            return phone;
        }
    }

    class Manager {
        constructor() {
            this.phones = [];
        }

        addPhone(phone) {
            this.phones.push(phone);
        }

        remove(index) {
            this.phones.splice(index, 1);
        }

        getAll() {
            return this.phones
        }
    }

    class PhonesManager extends Manager {
        constructor() {
            super();
            this.init();
        }

        loadComponents() {
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

        init() {
            this.loadComponents();
            this.addPhoneBtn();
        }

        addPhoneBtn() {
            this.addBtn.addEventListener("click", () => {
                if (this.inputDillerSelector.value !== "") {
                    let phone = new Phone(
                        this.inputDillerSelector.value, this.inputModelSelector.value, this.inputImgUrlSelector.value, this.inputBatterySelector.value, this.inputDescriptionSelector.value, this.selectorList);
                    this.addPhone(phone);
                    //clear inputs
                    this.inputDillerSelector.value = "";
                    this.inputModelSelector.value = "";
                    this.inputImgUrlSelector.value = "";
                    this.inputBatterySelector.value = "";
                    this.inputDescriptionSelector.value = "";

                    this.updateView();
                }
            })
        }

        viewPhoneBtn() {
            this.selectorList.addEventListener("click", (e) => {
                if (e.target.closest(".detailsBtn")) {
                    let index = e.target.closest(".phone").getAttribute("data-index");
                    this.showPhone(index);
                }
            })
        }

        showPhone(index) {
            this.description.innerHTML = "";

            let phoneHeader = document.createElement("div");
            phoneHeader.className = "phoneHeader";
            //add image
            let image = document.createElement("img");
            image.setAttribute("src", `${this.phones[index].imageUrl}`);
            image.setAttribute("alt", "phone");
            phoneHeader.appendChild(image);
            //add info
            let phoneInfo = document.createElement("div");
            phoneInfo.className = "phoneInfo";
            let phoneInfoElement = `
                    <div class="dillerInfo">
                        <p style="font-weight: bold">Diller: </p>
                        <p style="text-align: right">${this.phones[index].diller}</p>
                    </div>
                    <div class="modelInfo">
                        <p style="font-weight: bold">Model: </p>
                        <p style="text-align: right">${this.phones[index].model}</p>
                    </div>
                    <div class="batteryInfo">
                        <p style="font-weight: bold">Battery: </p>
                        <p style="text-align: right">${this.phones[index].battery}</p>
                    </div>
                </div>
            `;
            phoneInfo.innerHTML = phoneInfoElement;
            phoneHeader.appendChild(phoneInfo);
            //add description
            let descriptionInfo = document.createElement("div");
            descriptionInfo.className = "descriptionInfo";
            let descriptionInfoElement = `
                <p style="font-weight: bold">Description: </p>
                <p>${this.phones[index].description}</p>
            `;
            descriptionInfo.innerHTML = descriptionInfoElement;
            //add all
            this.description.appendChild(phoneHeader);
            this.description.appendChild(descriptionInfo);
        }

        updateView() {
            this.selectorList.innerHTML = "";
            this.getAll().forEach((note, i) => {
                let phoneElem = note.asElement();
                phoneElem.dataset.index = i;
                this.selectorList.appendChild(phoneElem);
            });
            this.viewPhoneBtn();
            this.contextMenu(this.contextMenuSelectorAsString);
        }

        contextMenu(contextSelector) {
            this.selectorList.addEventListener("contextmenu", (e)=> {
                e.preventDefault();
                if (e.target.closest(".phone")) {
                    let index = e.target.closest(".phone").getAttribute("data-index");

                    this.contextMenuSelector.classList.add("active");
                    this.contextMenuSelector.style.left = e.clientX + "px";
                    this.contextMenuSelector.style.top = e.clientY + "px";
                    //show
                    this.contextShow.addEventListener("click" , (e) => {
                        this.showPhone(index);
                        this.contextMenuSelector.classList.remove("active");
                    });
                    //need to fix
                    //delete
                    this.contextDelete.addEventListener("click", (e)=> {
                        this.removePhone(index);
                        this.contextMenuSelector.classList.remove("active");
                        this.description.innerHTML = "";
                    });

                    document.addEventListener("click", (e)=> {
                        if (!e.target.matches(contextSelector)) {
                            e.preventDefault();
                            this.contextMenuSelector.classList.remove("active");
                        }
                    });


                }
            })
        }

        removePhone(index) {
            this.remove(index);
            this.updateView();
        }

    }

    let phonesManager = new PhonesManager;

    //test
    let phone = new Phone(
        "iPhone", "X", "./images/iPhoneX.png", "2716mAh", "The anniversary iPhone is here. The iPhone X. Or the iPhone 10. The name is as confusing as the product itself is game-changing. Tim Cook's vision finally overwhelmed Steve Jobs ideological remnants. A new dawn for the iPhones has begun, free of the iconic Home key and the notorious screen bezels.", document.querySelector(".phones"));
    phonesManager.addPhone(phone);
    phonesManager.updateView();
    phonesManager.showPhone(0);
    //////

});