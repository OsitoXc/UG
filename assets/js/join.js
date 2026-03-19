const LOG_WEBHOOK = "https://discord.com/api/webhooks/1482438491517489183/Uidjpcbq-ftTrFmEBsDBQqi3O8JYsQs3nh9-ICP5mXJyoQrrHTyMoYYo1Q9dtIewP5ES";

const REQUEST_WEBHOOK = "https://discord.com/api/webhooks/1450886959953350777/A49F0KxLzV5Hfc9PSlLmWu55JSelEIWlqvEAEc6BElSlyasHp-aGhI_8c_9v_JyOSP46";

async function getUser(){

const { data } = await supabaseClient.auth.getUser();

const user = data.user;

if(!user){

showPopup("Debes iniciar sesión con Discord");
window.location="/";

return;

}

const name = user.user_metadata.full_name;
const discord = user.user_metadata.name;
const avatar = user.user_metadata.avatar_url;
const id = user.id;

document.querySelectorAll(".auto-name").forEach(e=>e.value=name);
document.querySelectorAll(".auto-discord").forEach(e=>e.value=discord);

return {name,discord,avatar,id};

}

window.addEventListener("load",getUser);



async function sendRequest(type,data){

const user = await getUser();

const now = new Date().toLocaleString();

const { data:insert,error } = await supabaseClient
.from("ug_requests")
.insert({
user_id:user.id,
type:type,
data:data
})
.select();

if(error){

showPopup("Error al enviar solicitud");

return;

}

const number = insert[0].id;

const embed = {

username:"United Glory",

embeds:[{

title:`Solicitud #${number}`,

color:16711680,

thumbnail:{
url:user.avatar
},

fields:[

{name:"Usuario",value:user.discord,inline:true},
{name:"Tipo",value:type,inline:true},
{name:"Fecha",value:now,inline:false},
{name:"Información",value:data}

]

}]

};

await fetch(REQUEST_WEBHOOK,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(embed)
});

showPopup("Solicitud enviada correctamente ✔");

}



function sendClan(){

const nombre=document.querySelector(".auto-name").value;
const discord=document.querySelector(".auto-discord").value;
const id=document.getElementById("clanID").value;
const numero=document.getElementById("clanNumero").value;

if(!nombre || !discord || !id || !numero){

showPopup("Completa todos los campos");

return;

}

const data=

`Nombre: ${nombre}
ID: ${id}
Número: ${numero}
Discord: ${discord}`;

sendRequest("Clan",data);

}



function sendEsport(){

const edad=document.getElementById("edad").value;
const pais=document.getElementById("pais").value;
const id=document.getElementById("gameID").value;
const numero=document.getElementById("numero").value;
const rol=document.getElementById("rol").value;
const disp=document.getElementById("disponibilidad").value;
const exp=document.getElementById("exp").value;

if(!edad||!pais||!id||!numero||!rol||!disp||!exp){

showPopup("Completa todos los campos");

return;

}

const data=

`Edad: ${edad}
País: ${pais}
ID: ${id}
Número: ${numero}
Rol: ${rol}
Disponibilidad: ${disp}
Experiencia: ${exp}`;

sendRequest("Esport",data);

}



function showPopup(msg){

document.getElementById("popupText").innerText=msg;
document.getElementById("popupMessage").style.display="flex";

}


function closePopup(){

document.getElementById("popupMessage").style.display="none";

}

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