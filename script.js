const inputEls = document.querySelectorAll(".inputs__input");
const initialInputEl = document.querySelector(".inputs__input--initial");
const daysInputEl = document.querySelector(".inputs__input--days");
const percentageInputEl = document.querySelector(".inputs__input--percentage");
const buttonSubmitEl = document.querySelector(".inputs__button--submit");
const tableBodyEl = document.querySelector(".results__tableBody");
const errorEl = document.querySelector(".results__error");
const emptyRowEl = document.querySelector(".results__emptyRow");

const numberWithCommas = x =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const setTableRow = (daysElText, casesElText) => {
  const tableRowEl = document.createElement("tr");
  const tableDataDaysEl = document.createElement("td");
  const tableDataCasesEl = document.createElement("td");
  tableDataDaysEl.innerHTML = daysElText;
  tableDataCasesEl.innerHTML = casesElText;
  tableRowEl.append(tableDataDaysEl);
  tableRowEl.append(tableDataCasesEl);
  tableBodyEl.append(tableRowEl);
};

buttonSubmitEl.addEventListener("click", () => {
  let n = parseInt(initialInputEl.value, 10);
  const days = parseInt(daysInputEl.value, 10);
  const percentage = parseInt(percentageInputEl.value, 10);

  tableBodyEl.innerHTML = null;

  if (!n || !days || !percentage) {
    errorEl.classList.remove("results__error--hide");

    setTableRow("-", "-");
    return;
  }

  for (let i = 0; i < days; i++) {
    n += (n * percentage) / 100;

    errorEl.classList.add("results__error--hide");

    const daysElText = i + 1;
    const casesElText = numberWithCommas(Math.round(n));
    setTableRow(daysElText, casesElText);
  }
});

inputEls.forEach(inputEl => {
  inputEl.addEventListener("keydown", ev => {
    if (ev.keyCode === 13) {
      buttonSubmitEl.click();
    }
  });
});
