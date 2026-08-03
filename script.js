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
["Bot Auto Dame FB Zl Dis v.v (Đt và PC)","discord","🔰","600k","Tut dame đa app."],
["Tool War Các App + 35 App","file","✴️","300k","Tool war đa app."],
["Tool Check Info FB TIK v.v IG","file","📖","100k","Check acc."],
["Tool reg mail","file","🛑","150k","."],
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
  let q=document.querySelector("#search").value.toLowerCase(), sort=document.querySelector("#sort").value;
  let arr=products.filter(p=>(cat==="all"||p[1]===cat)&&p[0].toLowerCase().includes(q));
  if(sort!=="default")arr.sort((a,b)=>{let n=x=>parseInt(x[3]);return sort==="asc"?n(a)-n(b):n(b)-n(a)});
  const grid=document.querySelector("#productGrid");
  if(arr.length===0){grid.innerHTML='<div class="no-results">Không tìm thấy sản phẩm phù hợp.</div>';return}
  grid.innerHTML=arr.map((p,i)=>`<article class="card"><div class="card-img">${p[2]}</div>${p[5]?`<span class="badge">${p[5]}</span>`:""}<h3>${p[0]}</h3><p>${p[4]}</p><div class="price-row"><span class="price">${p[3]}</span><button class="buy" onclick="buy('${p[0].replaceAll("'","")}')">Mua / hỏi</button></div></article>`).join("");
}

function buy(name){
  if(!currentUser){
    pendingAfterLogin=name;
    openAuth("login");
    showToast("Đăng nhập để tiếp tục mua hàng");
    return;
  }
  showToast(`Đã chọn: ${name} — liên hệ Discord để hoàn tất mua hàng.`);
}

function showToast(msg){
  const t=document.querySelector("#toast");
  t.textContent=msg;t.classList.add("show");
  clearTimeout(t._timer);
  t._timer=setTimeout(()=>t.classList.remove("show"),2800);
}

function scrollToId(id){document.getElementById(id).scrollIntoView({behavior:"smooth"})}

/* ===== Auth modal ===== */
function openAuth(tab){
  document.querySelector("#authOverlay").classList.add("show");
  switchTab(tab||"login");
}
function closeAuth(){
  document.querySelector("#authOverlay").classList.remove("show");
  document.querySelector("#loginError").textContent="";
  document.querySelector("#registerError").textContent="";
}
function switchTab(tab){
  document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("active",t.dataset.tab===tab));
  document.querySelector("#loginForm").classList.toggle("active",tab==="login");
  document.querySelector("#registerForm").classList.toggle("active",tab==="register");
}
document.querySelector("#authOverlay").addEventListener("click",e=>{
  if(e.target.id==="authOverlay")closeAuth();
});

function handleLogin(e){
  e.preventDefault();
  const user=document.querySelector("#loginUser").value.trim();
  const pass=document.querySelector("#loginPass").value;
  const err=document.querySelector("#loginError");
  const found=users.find(u=>u.username.toLowerCase()===user.toLowerCase()&&u.pass===pass);
  if(!found){err.textContent="Sai tên đăng nhập hoặc mật khẩu.";return false}
  err.textContent="";
  loginAs(found);
  closeAuth();
  document.querySelector("#loginForm").reset();
  if(pendingAfterLogin){buy(pendingAfterLogin);pendingAfterLogin=null}
  else showToast(`Chào mừng trở lại, ${found.username}!`);
  return false;
}

function handleRegister(e){
  e.preventDefault();
  const user=document.querySelector("#regUser").value.trim();
  const email=document.querySelector("#regEmail").value.trim();
  const pass=document.querySelector("#regPass").value;
  const pass2=document.querySelector("#regPass2").value;
  const err=document.querySelector("#registerError");
  if(users.some(u=>u.username.toLowerCase()===user.toLowerCase())){err.textContent="Tên đăng nhập đã tồn tại.";return false}
  if(pass!==pass2){err.textContent="Mật khẩu nhập lại không khớp.";return false}
  if(pass.length<6){err.textContent="Mật khẩu cần tối thiểu 6 ký tự.";return false}
  err.textContent="";
  const newUser={username:user,email,pass};
  users.push(newUser);
  loginAs(newUser);
  closeAuth();
  document.querySelector("#registerForm").reset();
  if(pendingAfterLogin){buy(pendingAfterLogin);pendingAfterLogin=null}
  else showToast(`Tạo tài khoản thành công — chào mừng, ${newUser.username}!`);
  return false;
}

function loginAs(user){
  currentUser=user;
  const area=document.querySelector("#authArea");
  area.innerHTML=`<div class="user-chip"><span class="avatar">${user.username[0].toUpperCase()}</span><span>${user.username}</span></div><button class="logout-btn" onclick="logout()">Đăng xuất</button>`;
}
function logout(){
  currentUser=null;
  const area=document.querySelector("#authArea");
  area.innerHTML=`<button class="btn-ghost" onclick="openAuth('login')">Đăng nhập</button><button class="btn-glow" onclick="openAuth('register')">Đăng ký</button>`;
  showToast("Đã đăng xuất.");
}

render();
