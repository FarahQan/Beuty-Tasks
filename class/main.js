class Colors {
  constructor() {
    this.selectedColors = [];
    this.colors = {
      "#92c952": "Mantis",
      "#771796": "Seance",
      "#24f355": "Malachite",
      "#d32776": "Cerise",
      "#f66b97": "Froly",
      "#56a8c2": "Fountain Blue",
      "#b0f7cc": "Ice Cold",
      "#54176f": "Honey Flower",
      "#51aa97": "Tradewind",
      "#810b14": "Monarch",
    };
  }
  checkColor = (color) => {
    return this.selectedColors.indexOf(color);
  };

  addColor = (color) => {
    this.selectedColors.push(color);
  };

  removeColor = (index) => {
    this.selectedColors.splice(index, 1);
  };

  getSelectedColors = () => {
    return this.selectedColors;
  };

  getCountMessage = () => {
    return "Count of selected cards : ";
  };

  getSelectedMessage = () => {
    return "Selected colors : ";
  };
}
const colorControl = new Colors();

class MainPage {
  constructor() {
    const mainContainer = document.createElement("div");

    mainContainer.classList = "main-container";

    const body = document.querySelector("body");

    const main = new Main();

    body.appendChild(mainContainer);
    mainContainer.appendChild(new Header().getHeader());
    mainContainer.appendChild(main.getMain());
    main.fetchAPI();
  }
}
class Header {
  constructor() {
    const colorCount = document.createElement("h4");
    const colorSelected = document.createElement("h4");
    const nav = document.createElement("nav");
    const navBody = document.createElement("div");
    const title = document.createElement("h1");
    this.header = document.createElement("header");

    colorCount.classList = "nav-count";
    colorCount.innerText = colorControl.getCountMessage() + 0;
    colorSelected.classList = "nav-selected-color";
    colorSelected.innerText = colorControl.getSelectedMessage() + "none";
    nav.classList = "nav";
    navBody.classList = "nav-body";
    this.header.classList = "header";
    title.innerText = "Lorem Ipsum";

    this.header.appendChild(nav);
    nav.appendChild(title);
    nav.appendChild(navBody);
    navBody.appendChild(colorCount);
    navBody.appendChild(colorSelected);
  }

  getHeader = () => {
    return this.header;
  };
}
class Main {
  constructor() {
    this.main = document.createElement("main");
    this.main.classList = "main";
  }

  getMain = () => {
    return this.main;
  };

  fetchAPI = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/photos");
    let result = await response.json();
    result = result.slice(0, 10);
    this.createCard(result);
  };

  createCard = (data) => {
    data.forEach((card, i) => {
      this.main.appendChild(
        new Card(card.title, Object.keys(colorControl.colors)[i]).getCard()
      );
    });
  };
}
class Card {
  constructor(title, id) {
    const cardBodyWrapper = document.createElement("section");
    const cardDescription = document.createElement("p");
    const cardHeader = document.createElement("div");
    const cardTitle = document.createElement("h3");
    this.card = document.createElement("div");
    this.cardButton = document.createElement("button");

    cardBodyWrapper.classList = "card-body";
    this.card.classList = "card";
    this.cardButton.classList = "card-btn";
    this.cardButton.id = id;

    cardDescription.innerText = title;
    cardHeader.style.backgroundColor = id;
    cardTitle.innerText = title;
    this.cardButton.innerText = "Select";

    this.cardButton.addEventListener("click", this.selectColor);
    this.cardButton.removeEventListener("mouseout", this.selectColor);

    this.card.appendChild(cardHeader);
    cardBodyWrapper.appendChild(cardTitle);
    cardBodyWrapper.appendChild(cardDescription);
    cardBodyWrapper.appendChild(this.cardButton);
    this.card.appendChild(cardBodyWrapper);
  }

  getCard = () => {
    return this.card;
  };

  selectColor = (e) => {
    const color = colorControl.colors[e.target.id];
    const countMessage = colorControl.getCountMessage();
    const isSelected = colorControl.checkColor(color);
    const navCount = document.querySelector(".nav-count");
    const navSelected = document.querySelector(".nav-selected-color");
    const selectedColors = colorControl.getSelectedColors();
    const selectedMessage = colorControl.getSelectedMessage();

    if (isSelected == -1) {
      colorControl.addColor(color);
      navCount.innerText = `${countMessage} ${selectedColors.length}`;
      this.cardButton.classList.add("selected");
    } else {
      colorControl.removeColor(isSelected);
      navCount.innerText = `${countMessage} ${selectedColors.length}`;
      this.cardButton.classList.remove("selected");
    }

    if (!selectedColors.length) {
      navSelected.innerText = `${selectedMessage} none`;
    } else {
      navSelected.innerText = `${selectedMessage} ${selectedColors}`;
    }
  };
}

const pageUI = new MainPage();
