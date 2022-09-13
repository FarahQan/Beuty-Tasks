class PageUI {
  constructor() {
    const body = getDOMElement("body");
    const container = createDOMElement({
      classList: "container",
      element: "div",
    });
    body.appendChild(container);
  }
}

class Carousel {
  #slidesWrapper;
  #container;
  #slideId;
  constructor() {
    this.#container = getDOMElement(".container");
    this.#slidesWrapper = createDOMElement({
      classList: "slides-wrapper",
      element: "div",
    });
    this.#slideId = 1;
    this.#container.appendChild(this.#slidesWrapper);
    this.createButtons();
    this.createSlides();
    this.currentSlide();
  }

  createSlides = (data) => {
    slidesData.forEach((el) => {
      const slide = createDOMElement({
        classList: el.class,
        element: "img",
        id: el.id,
        src: el.src,
      });
      this.#slidesWrapper.append(slide);
    });
  };

  createButtons = () => {
    const leftButtonWrapper = createDOMElement({
      classList: "slide-button-wrapper",
      element: "div",
    });
    const rightButtonWrapper = createDOMElement({
      classList: "slide-button-wrapper",
      element: "div",
    });
    const leftButton = createDOMElement({
      classList: "slide-button-img",
      element: "img",
      src: "./assets/right-arrow.png",
    });
    leftButtonWrapper.classList.add("left");
    leftButtonWrapper.addEventListener("click", this.prevSlide);

    const rightButton = createDOMElement({
      classList: "slide-button-img",
      element: "img",
      src: "./assets/right-arrow.png",
    });
    rightButtonWrapper.classList.add("right");
    rightButtonWrapper.addEventListener("click", this.nextSlide);
    leftButtonWrapper.appendChild(leftButton);
    rightButtonWrapper.appendChild(rightButton);
    this.#slidesWrapper.append(leftButtonWrapper, rightButtonWrapper);
  };

  currentSlide = () => {
    window.location.hash = `slide-${1}`;
  };

  nextSlide = () => {
    if (this.#slideId == slidesData.length) {
      this.currentSlide();
      this.#slideId = 1;
      return;
    }
    window.location.hash = `slide-${this.#slideId + 1}`;
    this.#slideId += 1;
  };

  prevSlide = () => {
    if (this.#slideId == 1) {
      window.location.hash = `slide-${slidesData.length}`;
      this.#slideId = slidesData.length;
      return;
    }
    window.location.hash = `slide-${this.#slideId - 1}`;
    this.#slideId -= 1;
  };
}

const pageUI = new PageUI();
const carousel = new Carousel();
