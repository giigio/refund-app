const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");
const expenseList = document.querySelector("ul");
const expenseQty = document.querySelector("aside header p span");
const expenseTotal = document.querySelector("aside header h2");

amount.oninput = function () {
  let value = amount.value.replace(/[^0-9]/g, "");
  //transforma em centavos para formatar corretamente.
  amount.value = formatCurrency(Number(value) / 100);
};

function formatCurrency(value) {
  value = value.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
  return value;
}

form.onsubmit = function (e) {
  e.preventDefault();

  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  };

  expenseAdd(newExpense);
};

function expenseAdd(newExpense) {
  try {
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `./img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);

    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;

    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;

    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
      .toUpperCase()
      .replace("R$", "")}`;

    const expenseRemove = document.createElement("img");
    expenseRemove.classList.add("remove-icon");
    expenseRemove.setAttribute("src", "./img/remove.svg");
    expenseRemove.setAttribute("alt", "remover");

    expenseInfo.append(expenseName, expenseCategory);
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, expenseRemove);
    expenseList.append(expenseItem);

    updateTotal();
  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas");
    console.log(error);
  }
}

function updateTotal() {
  try {
    const items = expenseList.children;

    expenseQty.textContent = `${items.length} ${
      items.length > 1 ? "despesas" : "despesa"
    }`;

    let total = 0;
    for (let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector(".expense-amount");
      let value = itemAmount.textContent
        .replace(/[^\d,]/g, "")
        .replace(",", ".");

      value = parseFloat(value);

      if (isNaN(value)) {
        return alert(
          "Não foi possível calcular o total. O valor não é um número."
        );
      }

      total += Number(value);
    }

    const totalSymbol = document.createElement("small");
    totalSymbol.textContent = "R$";

    expenseTotal.innerHTML = "";
    expenseTotal.append(
      totalSymbol,
      formatCurrency(total).toUpperCase().replace("R$", "")
    );
  } catch (error) {
    alert("Não foi possível atualizar o total de despesas");
    console.log(error);
  }
}

expenseList.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("remove-icon")) {
    e.target.closest(".expense").remove();
    updateTotal();
  }
});
