const Container = document.querySelector(".root");
let state = {};
const selectedColors = [];
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

const fetchAPI = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/photos");
  const result = await response.json();
  return result.slice(0, 10);
};

const createHeader = () => {
  const header = document.createElement("header");
  header.classList = "header-wrapper";
  Container.appendChild(header);
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
  const navCount = document.createElement("h3");
  navCount.classList = "nav-count";
  navCount.innerText = "Count of selected cards : 0";

  const navSelectedColor = document.createElement("h3");
  navSelectedColor.classList = "nav-selected-color";
  navSelectedColor.innerText = "Selected colors : none";

  nav.appendChild(navTitle);
  nav.appendChild(navBody);
  navBody.appendChild(navCount);
  navBody.appendChild(navSelectedColor);
};

const createMain = () => {
  const main = document.createElement("main");
  main.classList = "cards-wrapper";
  Container.appendChild(main);
  createCard();
};

const createCard = () => {
  const main = document.querySelector(".cards-wrapper");
  const cardsContainer = document.createElement("div");
  cardsContainer.classList = "cards-container";
  main.appendChild(cardsContainer);
  state.data.forEach((card, i) => {
    const cardWrapper = document.createElement("section");
    const cardColor = document.createElement("div");
    const cardBodyWrapper = document.createElement("section");
    cardBodyWrapper.classList = "card-body";
    const cardTitle = document.createElement("h3");
    cardTitle.innerText = card.title;
    const cardBody = document.createElement("p");
    cardBody.innerText = card.title;
    const cardButton = document.createElement("button");
    cardButton.innerText = "Select";
    cardButton.classList = "card-btn";
    cardWrapper.classList = `card`;
    let colorHex = card.url.slice(32);
    cardButton.id = `card${colorHex}`;
    cardColor.style.backgroundColor = `#${colorHex}`;
    cardsContainer.appendChild(cardWrapper);
    cardWrapper.appendChild(cardColor);
    cardBodyWrapper.appendChild(cardTitle);
    cardBodyWrapper.appendChild(cardBody);
    cardBodyWrapper.appendChild(cardButton);
    cardWrapper.appendChild(cardBodyWrapper);
  });
  buttonsSelector();
};

const buttonsSelector = () => {
  const buttons = document.querySelectorAll(".card-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      selectColor(e, button);
    });
    button.removeEventListener("click", (e) => {
      selectColor(e);
    });
  });
};

const selectColor = (e, button) => {
  const navCount = document.querySelector(".nav-count");
  const navSelected = document.querySelector(".nav-selected-color");
  const isSelected = selectedColors.indexOf(colors[`#${e.target.id.slice(4)}`]);
  if (isSelected == -1) {
    selectedColors.push(colors[`#${e.target.id.slice(4)}`]);
    navCount.innerText = `Count of selected cards : ${selectedColors.length}`;
    button.style.backgroundColor = "red";
  } else {
    selectedColors.splice(isSelected, 1);
    navCount.innerText = `Count of selected cards : ${selectedColors.length}`;
    button.style.backgroundColor = "royalblue";
  }
  if (!selectedColors.length) {
    navSelected.innerText = `Selected colors : none`;
  } else {
    navSelected.innerText = `Selected colors : ${selectedColors.join(", ")}`;
  }
};
const buildlUI = async () => {
  state.data = await fetchAPI();
  createHeader();
  createMain();
};
buildlUI();
