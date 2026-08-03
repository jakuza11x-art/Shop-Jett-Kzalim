  /* ===== Product data: [name, category, icon, price, description, badge?] ===== */
const products=[
["Bot Discord theo yêu cầu","discord","👑","80k","Setup - Made theo yêu cầu.", "HOT"],
["Bot Quản Lý Role","discord","🎛️","100k","Gán/gỡ role tự động theo điều kiện bạn đặt ra."],
["Bot Chống Spam & Raid","discord","🛡️","40k","Giám sát tin nhắn, tự động lọc spam và chặn raid."],
["Tool Messengers - Zalo","file","🎫","100k","Hệ thống ticket hỗ trợ thành viên gọn gàng."],
["Bot cho thuê các loại - treo","discord","🐉","20k","Bot spam đa app."],
["Bot Nuke - Raid","discord","📊","50k","Phá hủy server."],
["Tool Discord & Spam","tool","️⚽","90k","Join + Spam."],
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
["Bot auto dame - zl mess dis.","file","🎭","1tr","Bot dame đa app."]
["Gói Hosting Bot 24/7","tool","🌐","70k / tháng","Duy trì bot chạy ổn định, uptime 24/7."]
];

/* ===== In-session auth store (reset khi tải lại trang) ===== */
const users=[]; // {username, email, pass}
let currentUser=null;
let pendingAfterLogin=null;

let cat="all";
document.querySelectorAll("#chips button").forEach(b=>b.onclick=()=>{
  document.querySelectorAll("#chips button").forEach(x=>x.classList.remove("active"));
  b.classList.add("active");cat=b.dataset.cat;render();
});

function render(){
