/* ===== Product data: [name, category, icon, price, description, badge?] ===== */
const products = [
  ["Bot Discord theo yêu cầu","discord","👑","80k","Setup - Made theo yêu cầu.","HOT"],
  ["Bot Quản Lý Role","discord","🎛️","100k","Gán/gỡ role tự động theo điều kiện bạn đặt ra."],
  ["Bot Chống Spam & Raid","discord","🛡️","40k","Giám sát tin nhắn, tự động lọc spam và chặn raid."],
  ["Tool Messengers - Zalo","file","🎫","100k","Hệ thống ticket hỗ trợ thành viên gọn gàng."],
  ["Bot cho thuê các loại - treo","discord","🐉","20k","Bot spam đa app."],
  ["Bot Nuke - Raid","discord","📊","50k","Phá hủy server."],
  ["Tool Discord & Spam","tool","⚽","90k","Join + Spam."],
  ["Tool Dame / TTC","tool","📩","50k","Dame - Tương tác chéo Facebook 🗒."],
  ["Seftbot Pro V13","file","📁","200k","Mã nguồn bot Discord viết bằng Node.js, dễ tuỳ biến."],
  ["File - Tool","file","🧩","50k / 1","Tool - Bot - Files."],
  ["Tool Scan Via","file","🍭","150k","Scan acc via."],
  ["Tool Reg Clone Facebook","file","💢","400k","Reg acc clone facebook."],
  ["Tool Spam SMS","file","☃️","50k","Spam sms - call"],
  ["Bot Marketing Zalo","file","⛈️","250k","Bot zalo auto"],
  ["Tools Auto Dame FB Zl Dis v.v (Đt và PC)","discord","🔰","600k","Tut dame đa app."],
  ["Tool War Các App + 35 App","file","✴️","300k","Tool war đa app."],
  ["Tool Check Info FB TIK v.v IG","file","📖","100k","Check acc."],
  ["Tool reg mail","file","🛑","150k","Reg mail."],
  ["Bot auto dame - zl mess dis.","file","🎭","1tr","Bot dame đa app."],
  ["Gói Hosting Bot 24/7","tool","🌐","70k / tháng","Duy trì bot chạy ổn định, uptime 24/7."]
];

/* ===== In-session auth store ===== */
const users = [];
let currentUser = null;
let pendingAfterLogin = null;
let cat = "all";

/* ===== Helpers ===== */
function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function priceNumber(price) {
  const text = String(price).toLowerCase().replace(/\s/g, "");
  if (text.includes("1tr")) return 1000000;
  const match = text.match(/[\d.]+/);
  if (!match) return 0;
  return Number(match[0].replace(/\./g, "")) || 0;
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

/* ===== Category filter ===== */
function setupCategoryButtons() {
  document.querySelectorAll("#chips button").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll("#chips button").forEach(btn => {
        btn.classList.remove("active");
      });

      button.classList.add("active");
      cat = button.dataset.cat || "all";
      render();
    });
  });
}

/* ===== Render products ===== */
function render() {
  const grid = document.getElementById("productGrid");

  if (!grid) {
    console.error("Không tìm thấy #productGrid trong index.html.");
    return;
  }

  const searchInput = document.getElementById("search");
  const sortSelect = document.getElementById("sort");

  const keyword = (searchInput?.value || "").trim().toLowerCase();
  const sort = sortSelect?.value || "default";

  let list = products.filter(product => {
    const [name, category, icon, price, description] = product;

    const categoryOK = cat === "all" || category === cat;
    const searchOK =
      !keyword ||
      `${name} ${description} ${category} ${price}`
        .toLowerCase()
        .includes(keyword);

    return categoryOK && searchOK;
  });

  if (sort === "asc") {
    list.sort((a, b) => priceNumber(a[3]) - priceNumber(b[3]));
  } else if (sort === "desc") {
    list.sort((a, b) => priceNumber(b[3]) - priceNumber(a[3]));
  }

  if (!list.length) {
    grid.innerHTML = `
      <div class="no-results">
        Không tìm thấy sản phẩm phù hợp.
      </div>
    `;
    return;
  }

  grid.innerHTML = list.map(product => {
    const [name, category, icon, price, description, badge] = product;

    return `
      <article class="card">
        ${badge ? `<span class="badge">${escapeHTML(badge)}</span>` : ""}

        <div class="card-img" aria-hidden="true">
          ${escapeHTML(icon)}
        </div>

        <h3>${escapeHTML(name)}</h3>
        <p>${escapeHTML(description)}</p>

        <div class="price-row">
          <div class="price">${escapeHTML(price)}</div>

          <button
            class="buy"
            type="button"
            data-product="${products.indexOf(product)}"
          >
            Mua / hỏi
          </button>
        </div>
      </article>
    `;
  }).join("");

  grid.querySelectorAll(".buy").forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.product);
      const product = products[index];
      if (!product) return;

      const [name, category, icon, price, description] = product;

      showToast(`${name} — ${price}`);

      /* Nếu sau này muốn nối Discord/Zalo/checkout,
         có thể thay phần này bằng link mua hàng. */
      console.log("Product selected:", {
        name, category, icon, price, description
      });
    });
  });
}

/* ===== Auth ===== */
function openAuth(tab = "login") {
  const overlay = document.getElementById("authOverlay");
  if (!overlay) return;

  overlay.classList.add("show");
  switchTab(tab);
}

function closeAuth() {
  document.getElementById("authOverlay")?.classList.remove("show");
}

function switchTab(tab) {
  document.querySelectorAll(".auth-tabs .tab").forEach(button => {
    button.classList.toggle("active", button.dataset.tab === tab);
  });

  document.getElementById("loginForm")?.classList.toggle("active", tab === "login");
  document.getElementById("registerForm")?.classList.toggle("active", tab === "register");

  const loginError = document.getElementById("loginError");
  const registerError = document.getElementById("registerError");

  if (loginError) loginError.textContent = "";
  if (registerError) registerError.textContent = "";
}

function handleRegister(event) {
  event.preventDefault();

  const username = document.getElementById("regUser")?.value.trim();
  const email = document.getElementById("regEmail")?.value.trim();
  const pass = document.getElementById("regPass")?.value;
  const pass2 = document.getElementById("regPass2")?.value;
  const error = document.getElementById("registerError");

  if (!username || !email || !pass || !pass2) return false;

  if (pass !== pass2) {
    if (error) error.textContent = "Mật khẩu nhập lại không khớp.";
    return false;
  }

  if (users.some(user => user.username.toLowerCase() === username.toLowerCase())) {
    if (error) error.textContent = "Tên đăng nhập đã tồn tại.";
    return false;
  }

  if (users.some(user => user.email.toLowerCase() === email.toLowerCase())) {
    if (error) error.textContent = "Email đã được sử dụng.";
    return false;
  }

  users.push({ username, email, pass });

  currentUser = { username, email };
  closeAuth();
  updateAuthUI();
  showToast(`Đăng ký thành công, ${username}!`);

  return false;
}

function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById("loginUser")?.value.trim();
  const pass = document.getElementById("loginPass")?.value;
  const error = document.getElementById("loginError");

  const user = users.find(
    item =>
      item.username.toLowerCase() === username.toLowerCase() &&
      item.pass === pass
  );

  if (!user) {
    if (error) error.textContent = "Sai tên đăng nhập hoặc mật khẩu.";
    return false;
  }

  currentUser = {
    username: user.username,
    email: user.email
  };

  closeAuth();
  updateAuthUI();
  showToast(`Xin chào ${user.username}!`);

  if (typeof pendingAfterLogin === "function") {
    const callback = pendingAfterLogin;
    pendingAfterLogin = null;
    callback();
  }

  return false;
}

function logout() {
  currentUser = null;
  updateAuthUI();
  showToast("Đã đăng xuất.");
}

function updateAuthUI() {
  const area = document.getElementById("authArea");
  if (!area) return;

  if (!currentUser) {
    area.innerHTML = `
      <button class="btn-ghost" id="loginBtn" onclick="openAuth('login')">
        Đăng nhập
      </button>
      <button class="btn-glow" id="registerBtn" onclick="openAuth('register')">
        Đăng ký
      </button>
    `;
    return;
  }

  const initial = escapeHTML(currentUser.username.charAt(0).toUpperCase());

  area.innerHTML = `
    <div class="user-chip">
      <div class="avatar">${initial}</div>
      <span>${escapeHTML(currentUser.username)}</span>
      <button class="logout-btn" type="button" onclick="logout()">Thoát</button>
    </div>
  `;
}

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

/* ===== Close modal by clicking outside / Escape ===== */
function setupModalEvents() {
  const overlay = document.getElementById("authOverlay");

  if (overlay) {
    overlay.addEventListener("click", event => {
      if (event.target === overlay) closeAuth();
    });
  }

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeAuth();
  });
}

/* ===== Start ===== */
document.addEventListener("DOMContentLoaded", () => {
  setupCategoryButtons();
  setupModalEvents();
  updateAuthUI();
  render();
});
