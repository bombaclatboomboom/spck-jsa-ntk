let Computers = [
  {
    name: "Macbook Pro M4",
    price: 1000,
    img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook_4__7.png",
  },
  {
    name: "Macbook Air M4",
    price: 1500,
    img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook_4__7.png",
  },
  {
    name: "Asus TUF Gaming",
    price: 2000,
    img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook_4__7.png",
  },
  {
    name: "Thinkpad Carboon",
    price: 3000,
    img: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook_4__7.png",
  },
];

const computerList = document.getElementById("computerList");
for (let i = 0; i < Computers.length; i++) {
  const cp = Computers[i];
  let element = document.createElement("div");
  element.className = "card";
  element.innerHTML = `
      <img src="${cp.img}" alt="" width="200"> 
      <p class="name">${cp.name}</p>
      <p class="price">Giá: $${cp.price}</p>
      <button onclick="deleteComputer(${i})">Xóa</button>
    `;
  computerList.appendChild(element); //thêm element là con của computerList
}

function addComputer() {
  const name = document.getElementById("nameInput").value;
  const price = document.getElementById("priceInput").value;
  const img = document.getElementById("imgInput").value;
  const length =Computers.length;
  newComputer =   {
    name: name,
    price: price,
    img: img,
  },
  Computers.push(newComputer);
  let element = document.createElement("div");
  element.className = "card";
  element.innerHTML = `
      <img src="${newComputer.img}" alt="" width="200"> 
      <p class="name">${newComputer.name}</p>
      <p class="price">Giá: $${newComputer.price}</p>
      <button onclick="deleteComputer(${length})">Xóa</button>
      <button onclick="changeComputer(${length})">Sửa</button>
    `;
  computerList.appendChild(element); //thêm element là con của computerList
}

function deleteComputer(i) {
  Computers.splice(i, 1);
  
  renderComputer();
  }

function changeComputer(i) {
  const cp = Computers[i];
  const name = prompt("Nhập tên mới:");
  const price = prompt("Nhập giá mới:");
  const img = prompt("Nhập link ảnh mới:");
  if (name) cp.name = name;
  if (price) cp.price = price;
  if (img) cp.img = img;
  renderComputer();
}

renderComputer();
function renderComputer() {
  computerList.innerHTML = "";
  for (let i = 0; i < Computers.length; i++) {
    const cp = Computers[i];
    let element = document.createElement("div");
    element.className = "card";
    element.innerHTML = `
        <img src="${cp.img}" alt="" width="200"> 
        <p class="name">${cp.name}</p>
        <p class="price">Giá: $${cp.price}</p>
        <button onclick="deleteComputer(${i})">Xóa</button>
        <button onclick="changeComputer(${i})">Sửa</button>

      `;
    computerList.appendChild(element); //thêm element là con của computerList
  }
}
