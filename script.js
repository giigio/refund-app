const amount = document.getElementById("amount");

amount.oninput = function () {
  let value = amount.value.replace(/[^0-9]/g, "");
  //transforma em centavos para formatar corretamente.
  amount.value = formatCurrency(Number(value) / 100);
};

function formatCurrency(value) {
  value = value.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
  return value;
}
