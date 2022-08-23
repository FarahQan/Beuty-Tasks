const container = document.querySelector(".main");
const colors = {
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
const colorsHex = {
  0: "#92c952",
  1: "#771796",
  2: "#24f355",
  3: "#d32776",
  4: "#f66b97",
  5: "#56a8c2",
  6: "#b0f7cc",
  7: "#54176f",
  8: "#51aa97",
  9: "#810b14",
};
const selectedColors = [];
let countMessage = "Count of selected cards : ";
let selectedMessage = "Selected colors : ";
let state = {};

const fetchAPI = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/photos");
  const result = await response.json();
  return result.slice(0, 10);
};

const createHeader = () => {
  const header = document.createElement("header");
  header.classList = "header-wrapper";
  container.appendChild(header);
  createNav();
};

const createNav = () => {
  const nav = document.createElement("nav");
  nav.classList = "nav-wrapper";
  const header = document.querySelector(".header-wrapper");
  header.appendChild(nav);
  createNavList();
};

const createNavList = () => {
  const nav = document.querySelector(".nav-wrapper");

  const navTitle = document.createElement("h1");
  navTitle.classList = "nav-title";
  navTitle.innerText = "Lorem ipsum";

  const navBody = document.createElement("div");
  const navCount = document.createElement("h4");
  navCount.classList = "nav-count";
  navCount.innerText = countMessage + "0";

  const navSelectedColor = document.createElement("h4");
  navSelectedColor.classList = "nav-selected-color";
  navSelectedColor.innerText = selectedMessage + "none";

  nav.appendChild(navTitle);
  nav.appendChild(navBody);
  navBody.appendChild(navCount);
  navBody.appendChild(navSelectedColor);
};

const createMain = () => {
  const main = document.createElement("main");
  main.classList = "cards-wrapper";
  container.appendChild(main);
  createCard(state.data);
};

const createCard = (data) => {
  const main = document.querySelector(".cards-wrapper");
  const cardsContainer = document.createElement("div");
  cardsContainer.classList = "cards-container";
  main.appendChild(cardsContainer);
  data.length &&
    data.forEach((card, i) => {
      const cardBody = document.createElement("p");
      const cardBodyWrapper = document.createElement("section");
      const cardButton = document.createElement("button");
      const cardColor = document.createElement("div");
      const cardTitle = document.createElement("h3");
      const cardWrapper = document.createElement("section");
      cardBodyWrapper.classList = "card-body";
      cardButton.classList = "card-btn";
      cardWrapper.classList = `card`;
      cardBody.innerText = card.title;
      cardButton.innerText = "Select";
      cardTitle.innerText = card.title;
      cardButton.id = colorsHex[i];
      cardButton.addEventListener("click", (e) => {
        selectColor(e, cardButton);
      });
      cardButton.removeEventListener("click", (e) => {
        selectColor(e);
      });

      cardColor.style.background = colorsHex[i];
      cardsContainer.appendChild(cardWrapper);
      cardWrapper.appendChild(cardColor);
      cardBodyWrapper.appendChild(cardTitle);
      cardBodyWrapper.appendChild(cardBody);
      cardBodyWrapper.appendChild(cardButton);
      cardWrapper.appendChild(cardBodyWrapper);
    });
};

const selectColor = (e, button) => {
  const navCount = document.querySelector(".nav-count");
  const navSelected = document.querySelector(".nav-selected-color");
  let color = colors[e.target.id];
  const isSelected = selectedColors.indexOf(color);
  if (isSelected == -1) {
    selectedColors.push(color);
    navCount.innerText = `${countMessage} ${selectedColors.length}`;
    button.classList.add("selected");
  } else {
    selectedColors.splice(isSelected, 1);
    navCount.innerText = `${countMessage} ${selectedColors.length}`;
    button.classList.remove("selected");
  }
  if (!selectedColors.length) {
    navSelected.innerText = `${selectedMessage} none`;
  } else {
    navSelected.innerText = `${selectedMessage} ${selectedColors.join(", ")}`;
  }
};

const buildlUI = async () => {
  state.data = await fetchAPI();
  createHeader();
  createMain();
};
buildlUI();
