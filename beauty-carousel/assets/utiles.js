const createDOMElement = ({ classList, element, href, id, src, text}) => {
  const domElement = document.createElement(element);

  if (classList) {
    domElement.classList.add(classList);
  }
  if (id) {
    domElement.id = id;
  }
  if (href) {
    domElement.href = href;
  }
  if (text) {
    domElement.innerText = text;
  }
  if(src){
    domElement.src = src;

  }
  return domElement;
};

const getDOMElement = (element) => {
  const result = document.querySelectorAll(element);
  if (!result.length) {
    return false;
  }

  if (result.length > 1) {
    return result;
  } else {
    return result[0];
  }
};

