class MainPage {
  constructor() {
    const body = document.querySelector("body");
    const mainContainer = document.createElement("div");
    const main = document.createElement("main");
    const side = new SideBar();
    main.classList = "main";
    mainContainer.classList.add("main-container");
    body.appendChild(mainContainer);
    mainContainer.appendChild(main);
    mainContainer.appendChild(side.sidebar);
  }
}

class SideBar {
  constructor() {
    const side = document.createElement("div");
    this.sideWrapper = document.createElement("aside");
    side.classList = "side";
    this.sideWrapper.classList = "side-wrapper";

    this.sideWrapper.addEventListener("mouseover", this.handleShowSideBar);

    this.sideWrapper.addEventListener("mouseout", this.handleHideSideBar);

    this.sideWrapper.appendChild(side);
    new Icons(side);
  }

  get sidebar() {
    return this.sideWrapper;
  }

  handleShowSideBar() {
    const main = document.querySelector(".main");
    const side = document.querySelector(".side");
    main.classList.add("main-animation");
    side.classList.add("show-side");
  }

  handleHideSideBar() {
    const main = document.querySelector(".main");
    const side = document.querySelector(".side");
    main.classList.remove("main-animation");
    side.classList.remove("show-side");
  }
}

class Icons {
  constructor(side) {
    this.side = side;
    this.icons = {
      download: "./assets/download.png",
      heart: "./assets/heart.png",
      bookmark: "./assets/bookmark.png",
    };
    for (const key in this.icons) {
      this.side.appendChild(this.createIcon(this.icons[key]));
    }
  }

  createIcon(data) {
    const icon = document.createElement("img");
    icon.src = data;
    return icon;
  }
}

const pageUI = new MainPage();
