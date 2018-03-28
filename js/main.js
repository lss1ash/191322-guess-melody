// 'use strict';
// Линтер ругается на use strict

(function () {

  const pageTemplates = document.getElementById(`templates`);
  const appDiv = document.querySelector(`.app`);
  const mainSection = appDiv.querySelector(`.main`);
  const pages = pageTemplates.content.children;

  const getPageByIndex = function (index) {
    if (index >= 0 && index < pages.length) {
      return pages[index].cloneNode(true);
    }
    return false;
  };

  const replacePage = function (pageContent) {
    if (mainSection.children.length === 0) {
      mainSection.appendChild(pageContent);
    } else {
      mainSection.replaceChild(mainSection.firstElementChild, pageContent);
    }
  };

  replacePage(getPageByIndex(0));

}());
