/* ===== Product data: [name, category, icon, price, description, badge?] ===== */
const products = [
  ["Bot Discord theo yêu cầu", "discord", "👑", "80k", "Setup - Made theo yêu cầu.", "HOT"],
  ["Bot Quản Lý Role", "discord", "🎛️", "100k", "Gán/gỡ role tự động theo điều kiện bạn đặt ra."],
  ["Bot Chống Spam & Raid", "discord", "🛡️", "40k", "Giám sát tin nhắn, tự động lọc spam và chặn raid."],
  ["Tool Messengers - Zalo", "file", "🎫", "100k", "Hệ thống ticket hỗ trợ thành viên gọn gàng."],
  ["Bot cho thuê các loại - treo", "discord", "🐉", "20k", "Bot spam đa app."],
  ["Bot Nuke - Raid", "discord", "📊", "50k", "Phá hủy server."],
  ["Tool Discord & Spam", "tool", "⚽", "90k", "Join + Spam."],
  ["Tool Dame / TTC", "tool", "📩", "50k", "Dame - Tương tác chéo Facebook 🗒."],
  ["Seftbot Pro V13", "file", "📁", "200k", "Mã nguồn bot Discord viết bằng Node.js, dễ tuỳ biến."],
  ["File - Tool", "file", "🧩", "50k / 1", "Tool - Bot - Files."],
  ["Tool Scan Via", "file", "🍭", "150k", "Scan acc via."],
  ["Tool Reg Clone Facebook", "file", "💢", "400k", "Reg acc clone facebook."],
  ["Tool Spam SMS", "file", "☃️", "50k", "Spam sms - call"],
  ["Bot Marketing Zalo", "file", "⛈️", "250k", "Bot zalo auto"],
  ["Tools Auto Dame FB Zl Dis v.v (Đt và PC)", "discord", "🔰", "600k", "Tut dame đa app."],
  ["Tool War Các App + 35 App", "file", "✴️", "300k", "Tool war đa app."],
  ["Tool Check Info FB TIK v.v IG", "file", "📖", "100k", "Check acc."],
  ["Tool reg mail", "file", "🛑", "150k", "Reg mail."],
  ["Bot auto dame - zl mess dis.", "file", "🎭", "1tr", "Bot dame đa app."],
  ["Gói Hosting Bot 24/7", "tool", "🌐", "70k / tháng", "Duy trì bot chạy ổn định, uptime 24/7."]
];


/* ===== In-session auth store ===== */
const users = []; // { username, email, pass }

let currentUser = null;
let pendingAfterLogin = null;


/* ===== Current category ===== */
let cat = "all";


/* ===== Category filter ===== */
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


/* ===== Render products ===== */
function render() {

  // Tìm khu vực hiển thị sản phẩm
  const container =
    document.querySelector("#products") ||
    document.querySelector(".products") ||
    document.querySelector("#productGrid") ||
    document.querySelector(".product-grid");

  if (!container) {
    console.error(
      "Không tìm thấy container sản phẩm. Hãy kiểm tra HTML có #products hoặc .products."
    );
    return;
  }


  // Lọc sản phẩm theo category
  const filteredProducts =
    cat === "all"
      ? products
      : products.filter(product => product[1] === cat);


  // Không có sản phẩm
  if (filteredProducts.length === 0) {
    container.innerHTML = `
      <div class="empty-products">
        <div class="empty-icon">📦</div>
        <h3>Không có sản phẩm</h3>
        <p>Hiện chưa có sản phẩm trong danh mục này.</p>
      </div>
    `;
    return;
  }


  // Render danh sách
  container.innerHTML = filteredProducts.map((product, index) => {

    const [
      name,
      category,
      icon,
      price,
      description,
      badge
    ] = product;


    return `
      <article class="product-card" data-category="${category}">

        <div class="product-top">

          <div class="product-icon">
            ${icon}
          </div>

          ${
            badge
              ? `<span class="product-badge">${badge}</span>`
              : ""
          }

        </div>


        <div class="product-content">

          <div class="product-category">
            ${category.toUpperCase()}
          </div>

          <h3 class="product-name">
            ${name}
          </h3>

          <p class="product-description">
            ${description}
          </p>

        </div>


        <div class="product-bottom">

          <div class="product-price">
            ${price}
          </div>

          <button
            class="product-buy"
            type="button"
            onclick="buyProduct(${products.indexOf(product)})"
          >
            Xem sản phẩm
            <span>→</span>
          </button>

        </div>

      </article>
    `;

  }).join("");
}


/* ===== Product click ===== */
function buyProduct(index) {

  const product = products[index];

  if (!product) return;

  const [
    name,
    category,
    icon,
    price,
    description
  ] = product;


  // Nếu web của bạn có modal thì mở modal tại đây
  if (typeof openProductModal === "function") {
    openProductModal(product);
    return;
  }


  // Fallback nếu chưa có modal
  alert(
    `${name}\n\n` +
    `Giá: ${price}\n` +
    `Danh mục: ${category}\n\n` +
    `${description}`
  );
}


/* ===== Initial render ===== */
document.addEventListener("DOMContentLoaded", () => {
  render();
});
