function getID(id) {
  return document.getElementById(id);
}

function getIDAccount(email) {
    const data = localStorage.getItem("accounts");
    let accounts = JSON.parse(data); // ép kiểu sang JSON

    // kiểm tra đăng nhập
    for (let i = 0; i < accounts.length; i++) {
      const account = accounts[i];
      if (accounts[i].email === email) {   
        return account[i].password;
        }
    }
    return -1; // không tìm thấy tài khoản
}

const btnLogin = getID("btnLogin");

btnLogin.onclick = function() {
    const loginEmail = getID("loginEmail").value;
    const loginPassword = getID("loginPassword").value;

    // tìm account và trả về password
    const password = getIDAccount(loginEmail);

    // xác thực password
    if (password == -1) {
        alert("Tài khoản không tồn tại");
    } else if (password !== loginPassword) {
        alert("Mật khẩu không chính xác");
    } else if (password === loginPassword) {
        alert("Đăng nhập thành công!");
        // chuyển sang trang chủ nếu đăng nhập ok
        window.location.href = "dashboard.html";
    }
}