export default class DialogView {
  constructor(node) {
    this.node = node;
    this.header = this.node.querySelector(`.dialog__header`);
    this.paragraph = this.node.querySelector(`.dialog__paragraph`);
  }

  show(header, paragraph) {
    if (header && paragraph) {
      this.header.innerText = header;
      this.paragraph.innerText = paragraph;
      this.node.classList.remove(`dialog--hidden`);
    }
  }
}
