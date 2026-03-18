const supabaseClient = supabase.createClient(
"https://imoubtvtadgzaxkbuils.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imltb3VidHZ0YWRnemF4a2J1aWxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5MDE2MTEsImV4cCI6MjA4ODQ3NzYxMX0.1vcQI1LwcuT9ssxdfnnAuHJJiMNig2hMZCs-efJWP0E"
);

async function loadUser(){

const box = document.getElementById("userBox");

const { data } = await supabaseClient.auth.getUser();
const user = data.user;

if(user){

const name = user.user_metadata.full_name;
const avatar = user.user_metadata.avatar_url;

box.innerHTML = `
<div class="user-info" onclick="toggleUserMenu()">
<img src="${avatar}">
<span>${name}</span>
<span class="arrow">▼</span>
</div>

<div id="userDropdown" class="user-dropdown">
<button onclick="logout()">🚪 Cerrar sesión</button>
</div>
`;

}else{

box.innerHTML = `
<button onclick="login()" class="login-btn">Login</button>
`;

}

}

function toggleUserMenu(){

const menu = document.getElementById("userDropdown");
const box = document.getElementById("userBox");

if(!menu) return;

if(menu.style.display === "flex"){
menu.style.display = "none";
box.classList.remove("active");
}else{
menu.style.display = "flex";
box.classList.add("active");
}

}

async function login(){

await supabaseClient.auth.signInWithOAuth({
provider:"discord",
options:{
redirectTo: window.location.origin + "/"
}
});

}

async function logout(){

await supabaseClient.auth.signOut();
location.reload();

}

/* cerrar menú al tocar fuera */
document.addEventListener("click",function(e){

const box = document.getElementById("userBox");
const menu = document.getElementById("userDropdown");

if(menu && !box.contains(e.target)){
menu.style.display="none";
box.classList.remove("active");
}

});

window.addEventListener("load",loadUser);