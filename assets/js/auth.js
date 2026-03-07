document.addEventListener("DOMContentLoaded", async () => {

const { createClient } = supabase;

const supabaseClient = createClient(
"https://imoubtvtadgzaxkbuils.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imltb3VidHZ0YWRnemF4a2J1aWxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5MDE2MTEsImV4cCI6MjA4ODQ3NzYxMX0.1vcQI1LwcuT9ssxdfnnAuHJJiMNig2hMZCs-efJWP0E"
);

const box = document.getElementById("userBox");

async function updateUser(){

const { data: { user } } = await supabaseClient.auth.getUser();

if(user){

const avatar = user.user_metadata.avatar_url;
const name = user.user_metadata.full_name || user.user_metadata.name;

box.innerHTML = `
<img src="${avatar}">
<span>${name}</span>
<button class="logout-btn" id="logoutBtn">Logout</button>
`;

document.getElementById("logoutBtn").onclick = async () => {
await supabaseClient.auth.signOut();
location.reload();
};

}else{

box.innerHTML = `
<button class="login-btn" id="loginBtn">Discord</button>
`;

document.getElementById("loginBtn").onclick = async () => {
await supabaseClient.auth.signInWithOAuth({
provider: "discord"
});
};

}

}

/* detectar cambios de sesión */

supabaseClient.auth.onAuthStateChange(() => {
updateUser();
});

/* cargar usuario */

updateUser();

/* limpiar token de URL */

if(window.location.hash.includes("access_token")){
history.replaceState({}, document.title, window.location.pathname);
}

});