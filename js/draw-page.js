export default (pageElement) => {

  const mainSection = document.querySelector(`.app .main`);
  if (mainSection) {
    if (mainSection.firstElementChild) {
      mainSection.replaceChild(pageElement, mainSection.firstElementChild);
    } else {
      mainSection.appendChild(pageElement);
    }
  }
};
