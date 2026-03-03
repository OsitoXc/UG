function toggleMenu(){
  const menu = document.getElementById("menu");
  if(menu){
    menu.classList.toggle("active");
  }
}

  window.addEventListener("load", function(){

    const loader = document.getElementById("loader");
    const minTime = 1500; // 1.5 segundos
    const startTime = Date.now();

    function hideLoader(){
      const elapsed = Date.now() - startTime;
      const remaining = minTime - elapsed;

      setTimeout(() => {
        loader.classList.add("hidden");
      }, remaining > 0 ? remaining : 0);
    }

    hideLoader();
  });