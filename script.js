const itemForm = document.getElementById('itemForm');
const itemName = document.getElementById('itemName');
const itemPrice = document.getElementById('itemPrice');
const menuTable = document.getElementById('menuTable');

let menuItems = [];

itemForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = itemName.value;
  const price = itemPrice.value;

  if (name && price) {
    menuItems.push({ name, price });
    updateTable();
    itemName.value = "";
    itemPrice.value = "";
  }
});

function updateTable() {
  let rows = '<tr><th>Item</th><th>Price (₹)</th></tr>';
  menuItems.forEach(item => {
    rows += `<tr><td>${item.name}</td><td>${item.price}</td></tr>`;
  });
  menuTable.innerHTML = rows;
}

document.getElementById('generateQR').addEventListener('click', () => {
  const menuText = menuItems.map(i => `${i.name}: ₹${i.price}`).join('\n');
  const encoded = encodeURIComponent(menuText);
  const qrUrl = `https://quickchart.io/qr?text=${encoded}&size=200`;

  document.getElementById('qrContainer').innerHTML = `
    <img src="${qrUrl}" alt="QR Code">
    <p>Right-click to save or print</p>
  `;
});
