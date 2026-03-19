// 🔗 WEBHOOKS
const LOG_WEBHOOK = "https://discord.com/api/webhooks/1482438491517489183/Uidjpcbq-ftTrFmEBsDBQqi3O8JYsQs3nh9-ICP5mXJyoQrrHTyMoYYo1Q9dtIewP5ES";
const REQUEST_WEBHOOK = "https://discord.com/api/webhooks/1450886959953350777/A49F0KxLzV5Hfc9PSlLmWu55JSelEIWlqvEAEc6BElSlyasHp-aGhI_8c_9v_JyOSP46";

// 👤 OBTENER USUARIO
async function getUser(){
  const { data } = await supabaseClient.auth.getUser();
  const user = data.user;

  if(!user) return null;

  const name = user.user_metadata.full_name;
  const discord = user.user_metadata.name;
  const avatar = user.user_metadata.avatar_url;
  const id = user.id;

  document.querySelectorAll(".auto-name").forEach(e=>e.value=name);
  document.querySelectorAll(".auto-discord").forEach(e=>e.value=discord);

  return {name,discord,avatar,id};
}

// 🚀 AL CARGAR
window.addEventListener("load", getUser);

async function checkSpam(user_id){

const now = new Date();
const lastHour = new Date(now.getTime() - (60 * 60 * 1000)); // 1 hora

const { data, error } = await supabaseClient
.from("ug_requests")
.select("*")
.eq("user_id", user_id)
.gte("created_at", lastHour.toISOString());

if(error){
console.error(error);
return false;
}

if(data.length >= 2){ // máximo 2 solicitudes por hora
showPopup("Espera antes de enviar otra solicitud ⏳");
return false;
}

return true;

}

// 📩 ENVIAR SOLICITUD
async function sendRequest(type,data){

  const user = await getUser();

  if(!user){
    showPopup("Debes iniciar sesión con Discord");
    return;
  }

  showLoader(true);

  const now = new Date().toLocaleString();

  const { data:insert, error } = await supabaseClient
  .from("ug_requests")
  .insert({
    user_id:user.id,
    type:type,
    data:data
  })
  .select();

  if(error){
console.error(error);
showPopup("Error: " + error.message);
return;
}

  const number = insert[0].id;

  // 📤 WEBHOOK SOLICITUD
  await fetch(REQUEST_WEBHOOK,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      username:"United Glory",
      embeds:[{
        title:`Solicitud #${number}`,
        color:16711680,
        thumbnail:{ url:user.avatar },
        fields:[
          {name:"Usuario",value:user.discord,inline:true},
          {name:"Tipo",value:type,inline:true},
          {name:"Fecha",value:now},
          {name:"Información",value:data}
        ]
      }]
    })
  });

  // 📊 LOG GLOBAL
  await fetch(LOG_WEBHOOK,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      username:"UG Logs",
      embeds:[{
        title:`Nueva solicitud (#${number})`,
        color:5763719,
        thumbnail:{url:user.avatar},
        fields:[
          {name:"Usuario",value:user.discord},
          {name:"Fecha",value:now}
        ]
      }]
    })
  });

  showLoader(false);
  showPopup("Solicitud enviada correctamente ✔");
}

// 🟣 CLAN
function sendClan(){

  const nombre = document.querySelector(".auto-name").value;
  const discord = document.querySelector(".auto-discord").value;
  const id = document.getElementById("clanID").value;
  const numero = document.getElementById("clanNumero").value;

  if(!nombre || !discord || !id || !numero){
    showPopup("Completa todos los campos");
    return;
  }

  const data =
`Nombre: ${nombre}
ID: ${id}
Número: ${numero}
Discord: ${discord}`;

  sendRequest("Clan",data);
}

// 🔴 ESPORT
async function sendEsport(){

  const user = await getUser();

  if(!user){
    showPopup("Debes iniciar sesión con Discord");
    return;
  }

  const nombre = document.querySelector(".auto-name").value;
  const discord = document.querySelector(".auto-discord").value;
  const edad = document.getElementById("edad").value;
  const pais = document.getElementById("pais").value;
  const id = document.getElementById("gameID").value;
  const numero = document.getElementById("numero").value;
  const disp = document.getElementById("disponibilidad").value;
  const exp = document.getElementById("exp").value;
  const redes = document.getElementById("redes")?.value || "";

  if(!nombre || !discord || !edad || !pais || !id || !numero || !selectedRol || !disp || !exp){
    showPopup("Completa todos los campos obligatorios");
    return;
  }

  const data =
`Nombre: ${nombre}
Discord: ${discord}
Número: ${numero}
ID: ${id}
Edad: ${edad}
País: ${pais}
Rol: ${selectedRol}
Disponibilidad: ${disp}
Experiencia: ${exp}
Redes: ${redes || "N/A"}`;

  sendRequest("Esport",data);
}

// 🎯 POPUP BONITO
function showPopup(msg){
  document.getElementById("popupText").innerText = msg;
  document.getElementById("popupMessage").style.display="flex";
}

function closePopup(){
  document.getElementById("popupMessage").style.display="none";
}

// ⏳ LOADER
function showLoader(state){
  const loader = document.getElementById("loader");
  loader.style.display = state ? "flex" : "none";
}

// 🎮 SELECTOR DE ROL BONITO
let selectedRol = "";

function toggleRol(){
  const menu = document.getElementById("rolOptions");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function setRol(rol){
  selectedRol = rol;
  document.getElementById("rolText").innerText = rol;
  document.getElementById("rolOptions").style.display="none";
}

let selectedType = "";

function toggleType(){
  const menu = document.getElementById("typeOptions");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function selectType(type){

  selectedType = type;

  document.getElementById("typeText").innerText =
    type === "clan" ? "Clan" : "Esport";

  document.getElementById("typeOptions").style.display = "none";

  document.getElementById("clanForm").style.display = "none";
  document.getElementById("esportForm").style.display = "none";

  if(type === "clan"){
    document.getElementById("clanForm").style.display = "block";
  }

  if(type === "esport"){
    document.getElementById("esportForm").style.display = "block";
  }
}