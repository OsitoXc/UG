function toggleMenu(){
  const menu = document.getElementById("menu");
  if(menu){
    menu.classList.toggle("active");
  }
}

document.addEventListener("DOMContentLoaded", function(){
  const loader = document.getElementById("loader");
  if(loader){
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
  }
});