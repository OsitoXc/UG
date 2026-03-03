function toggleMenu(){
  const menu = document.getElementById("menu");
  menu.classList.toggle("active");
}

window.addEventListener("load", function(){
  const loader = document.getElementById("loader");

  if(loader){
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 700);
  }
});