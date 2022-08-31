class MainPage {
  constructor() {
    const body = document.querySelector("body");
    const container = document.createElement("div");
    const main = document.createElement("main");

    container.classList.add("container");
    main.classList.add("main");

    body.appendChild(container);
    container.appendChild(main);

    new Numbers(main);
    new ClockComponents(main);
  }
}

class Numbers {
  constructor(main) {
    const clockNumbers = [3, 6, 9, 12];

    clockNumbers.forEach((el) => {
      main.appendChild(this.createNumbersSlots(el));
    });
  }

  createNumbersSlots(value) {
    const number = document.createElement("p");
    number.innerText = value;
    number.classList.add(`number${value}`);
    return number;
  }
}

class ClockComponents {
  constructor(main) {
    const components = ["dot", "minute-stick", "hour-stick", "pointer-stick"];
    const componentsWrapper = document.createElement("div");

    componentsWrapper.classList.add("components-wrapper");

    main.appendChild(componentsWrapper);

    components.forEach((el, i) => {
      componentsWrapper.appendChild(this.createClockComponents(el));
      if (i == components.length - 1) {
        new Timer();
        // // console.log(el);
        // console.log(document.querySelector(".dot"));
      }
    });
  }
  createClockComponents(value) {
    const component = document.createElement("div");

    if (value !== "dot") {
      component.classList.add(value);
      component.classList.add("stick");
    } else {
      component.classList.add(value);
    }

    return component;
  }

  moveMinutesStick() {}
}

class Timer {
  constructor() {
    let minutesCounter = 0;
    let hoursCounter = 0;
    let minuteTransform = document.querySelector(".minute-stick");
    minuteTransform.style.transform = "rotate(0.1deg)";
    let hourTransform = document.querySelector(".hour-stick");
    hourTransform.style.transform = "rotate(0.1deg)";
    setInterval(() => {
      if (minutesCounter == 60) {
        let currentMinutesDegree = parseFloat(
          minuteTransform.style.transform.match(/[0-9.]/g).join("")
        );
        let currentHoursDegree = parseFloat(
          hourTransform.style.transform.match(/[0-9.]/g).join("")
        );

        minuteTransform.style.transform = `rotate(${
          currentMinutesDegree ? currentMinutesDegree + 10 : 0.1
        }deg)`;

        if (hoursCounter == 60) {
          hourTransform.style.transform = `rotate(${
            currentHoursDegree ? currentHoursDegree + 10 : 0.1
          }deg)`;
          hoursCounter = 0;
        }

        hoursCounter += 1;
        minutesCounter = 0;
      }
      minutesCounter += 1;
    }, 1000);
  }
}

const pageUI = new MainPage();
