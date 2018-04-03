export default (str) => {
  const element = document.createElement(`section`);
  element.innerHTML = str;
  return element.firstElementChild ? element.firstElementChild : false;
};
