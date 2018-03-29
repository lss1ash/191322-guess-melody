(() => {

  const KEYCODE = {
    ARROW_LEFT: 37,
    ARROW_RIGHT: 39
  };

  const pageTemplates = document.getElementById(`templates`);
  const mainSection = document.querySelector(`.app .main`);
  const pages = pageTemplates.content.children;

  let currentPage = 0;

  const getPageByIndex = function (index) {
    if (index >= 0 && index < pages.length) {
      return pages[index].cloneNode(true);
    }
    return false;
  };

  const replacePage = function (pageContent) {
    if (pageContent) {
      if (mainSection.children.length === 0) {
        mainSection.appendChild(pageContent);
      } else {
        mainSection.replaceChild(pageContent, mainSection.firstElementChild);
      }
    }
  };

  const reducePageNum = () => {
    if (currentPage > 0) {
      currentPage--;
      return true;
    }
    return false;
  };

  const increasePageNum = () => {
    if (currentPage < pages.length - 1) {
      currentPage++;
      return true;
    }
    return false;
  };

  const keyDownHandler = function (e) {
    if (e.altKey) {
      switch (e.keyCode) {
        case KEYCODE.ARROW_LEFT:
          if (reducePageNum()) {
            replacePage(getPageByIndex(currentPage));
          }
          break;
        case KEYCODE.ARROW_RIGHT:
          if (increasePageNum()) {
            replacePage(getPageByIndex(currentPage));
          }
          break;
      }
    }
  };

  replacePage(getPageByIndex(currentPage));

  document.addEventListener(`keydown`, keyDownHandler);
})();
