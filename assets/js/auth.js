const supabaseClient = supabase.createClient(
"https://imoubtvtadgzaxkbuils.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imltb3VidHZ0YWRnemF4a2J1aWxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5MDE2MTEsImV4cCI6MjA4ODQ3NzYxMX0.1vcQI1LwcuT9ssxdfnnAuHJJiMNig2hMZCs-efJWP0E"
);

/* limpiar token de la URL */

if (window.location.hash.includes("access_token")) {
history.replaceState({}, document.title, window.location.pathname);
}

/* cargar usuario */

async function loadUser(){

const { data } = await supabaseClient.auth.getUser();

const box = document.getElementById("userBox");

if(!box) return;

if(data.user){

let avatar = data.user.user_metadata.avatar_url;
let name = data.user.user_metadata.full_name;

box.innerHTML = `
<img src="${avatar}">
<span>${name}</span>
<button class="logout-btn" onclick="logout()">Logout</button>
`;

}else{

box.innerHTML = `
<button class="login-btn" onclick="loginDiscord()">
Login Discord
</button>
`;

}

}

/* login */

async function loginDiscord(){

await supabaseClient.auth.signInWithOAuth({
provider:"discord"
});

}

/* logout */

async function logout(){

await supabaseClient.auth.signOut();

location.reload();

}

/* iniciar */

loadUser();