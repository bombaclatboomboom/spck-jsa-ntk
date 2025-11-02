function getID(id) {
  return document.getElementById(id);
}

const btnRegister = getID("btnRegister");

btnRegister.onclick = function(e) {
  e.preventDefault();   // ngăn không cho load lại trang

  // lấy giá trị các ô input
  const registerUsername = getID("registerUsername").value;
  const registerEmail = getID("registerEmail").value;
  const registerPassword = getID("registerPassword").value;
  const registerConfirmPassword = getID("registerConfirmPassword").value;
  

  
  // kiểm tra xác thực password
  if (registerPassword === registerConfirmPassword) {
    const account = {   // tạo tài khoản
      username : registerUsername,
      email : registerEmail,
      password : registerPassword
    }
    // lấy danh sách tài khoản từ LocalStorage về
    const data = localStorage.getItem("accounts");
    let accounts = JSON.parse(data); // ép kiểu sang JSON

    // đẩy tài khoản mới vào danh sách
    accounts.push(account);

    // đẩy ngược danh sách tài khoản về LocalStorage
    localStorage.setItem("accounts", JSON.stringify(accounts));


  }
  else {
    alert("Mật khẩu không trùng nhau!");
  }
}