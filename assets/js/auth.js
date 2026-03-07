const supabaseClient = supabase.createClient(
"https://imoubtvtadgzaxkbuils.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imltb3VidHZ0YWRnemF4a2J1aWxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5MDE2MTEsImV4cCI6MjA4ODQ3NzYxMX0.1vcQI1LwcuT9ssxdfnnAuHJJiMNig2hMZCs-efJWP0E"
);

/* LOGIN DISCORD */

async function loginDiscord(){

await supabaseClient.auth.signInWithOAuth({
provider:"discord"
});

}

/* LOGOUT */

async function logout(){

await supabaseClient.auth.signOut();
location.reload();

}

/* CARGAR USUARIO */

async function loadUser(){

const { data: { session } } = await supabaseClient.auth.getSession();

const box = document.getElementById("userBox");

if(!box) return;

if(session){

const user = session.user;

let avatar = user.user_metadata.avatar_url;
let name = user.user_metadata.full_name || user.user_metadata.name;

box.innerHTML = `
<img src="${avatar}">
<span>${name}</span>
<button class="logout-btn" onclick="logout()">Logout</button>
`;

}else{

box.innerHTML = `
<button class="login-btn" onclick="loginDiscord()">Discord</button>
`;

}

}

/* CUANDO CAMBIA LA SESIÓN */

supabaseClient.auth.onAuthStateChange(() => {
loadUser();
});

/* LIMPIAR TOKEN DE URL */

if(window.location.hash.includes("access_token")){
history.replaceState({}, document.title, window.location.pathname);
}

/* INICIAR */

window.addEventListener("load", () => {
loadUser();
});