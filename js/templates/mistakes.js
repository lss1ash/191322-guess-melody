// import

export default (notes) => {
  const singleNote = `<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`;
  return `<div class="main-mistakes">
    ${singleNote.repeat(notes)}
  </div>`;
};
