class MainPage {
  constructor() {
    const body = document.querySelector("body");
    const mainContainer = document.createElement("div");
    const main = document.createElement("main");
    const side = new SideBar();
    main.classList.add("main");
    mainContainer.classList.add("container");
    body.appendChild(mainContainer);
    mainContainer.appendChild(main);
    mainContainer.appendChild(side.sidebar);
  }
}

class SideBar {
  constructor() {
    const side = document.createElement("div");
    this.sideWrapper = document.createElement("aside");
    side.classList.add("side");
    this.sideWrapper.classList.add("side-wrapper");

    this.sideWrapper.addEventListener("mouseover", this.handleSideBar);

    this.sideWrapper.addEventListener("mouseout", this.handleSideBar);

    this.sideWrapper.appendChild(side);
    new Icons(side);
  }

  get sidebar() {
    return this.sideWrapper;
  }

  handleSideBar() {
    const main = document.querySelector(".main");
    const side = document.querySelector(".side");
    main.classList.toggle("main-animation");
    side.classList.toggle("show-side");
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
