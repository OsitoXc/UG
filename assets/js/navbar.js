function toggleMenu(){
  const menu = document.getElementById("menu");
  if(menu){
    menu.classList.toggle("active");
  }
}

  window.addEventListener("load", function(){
    const loader = document.getElementById("loader");
    loader.classList.add("hidden");
  });