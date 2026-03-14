const LOG_WEBHOOK = "https://discord.com/api/webhooks/1482438491517489183/Uidjpcbq-ftTrFmEBsDBQqi3O8JYsQs3nh9-ICP5mXJyoQrrHTyMoYYo1Q9dtIewP5ES";

const REQUEST_WEBHOOK = "https://discord.com/api/webhooks/1450886959953350777/A49F0KxLzV5Hfc9PSlLmWu55JSelEIWlqvEAEc6BElSlyasHp-aGhI_8c_9v_JyOSP46";


async function getUser(){

const { data } = await supabaseClient.auth.getUser();
const user = data.user;

if(!user){
alert("Debes iniciar sesión con Discord");
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


async function checkSpam(user_id){

const yesterday = new Date();
yesterday.setDate(yesterday.getDate()-1);

const { data } = await supabaseClient
.from("ug_requests")
.select("*")
.eq("user_id",user_id)
.gte("created_at",yesterday.toISOString());

if(data.length > 0){

alert("Solo puedes enviar una solicitud cada 24h");

return false;

}

return true;

}

async function sendRequest(type,data){

const user = await getUser();

if(!await checkSpam(user.id)) return;

const now = new Date().toLocaleString();

const { data:insert } = await supabaseClient
.from("ug_requests")
.insert({
user_id:user.id,
type:type,
data:data
})
.select();

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


const log = {

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

};

await fetch(LOG_WEBHOOK,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(log)
});

alert("Solicitud enviada correctamente");

}

function sendClan(){

const id = clanID.value;
const numero = clanNumero.value;

if(!id || !numero){
alert("Completa todos los campos");
return;
}

const data =
`Nombre: ${document.querySelector(".auto-name").value}
ID: ${id}
Número: ${numero}
Discord: ${document.querySelector(".auto-discord").value}`;

sendRequest("Clan",data);

}