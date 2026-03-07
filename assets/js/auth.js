const supabaseClient = supabase.createClient(
"https://imoubtvtadgzaxkbuils.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imltb3VidHZ0YWRnemF4a2J1aWxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5MDE2MTEsImV4cCI6MjA4ODQ3NzYxMX0.1vcQI1LwcuT9ssxdfnnAuHJJiMNig2hMZCs-efJWP0E"
);

async function loadUser(){

const box = document.getElementById("userBox");

const { data } = await supabaseClient.auth.getUser();

const user = data.user;

if(user){

const avatar = user.user_metadata.avatar_url;
const name = user.user_metadata.full_name;

box.innerHTML = `
<img src="${avatar}" style="width:32px;height:32px;border-radius:50%;">
<span>${name}</span>
<button onclick="logout()">Logout</button>
`;

}else{

box.innerHTML = `
<button onclick="login()" class="login-btn">Discord</button>
`;

}

}

async function login(){

await supabaseClient.auth.signInWithOAuth({
provider:"discord",
options:{
redirectTo: window.location.origin
}
});

}

async function logout(){

await supabaseClient.auth.signOut();
location.reload();

}

window.addEventListener("load", loadUser);