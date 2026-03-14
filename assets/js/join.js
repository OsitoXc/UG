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