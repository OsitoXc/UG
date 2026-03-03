function toggleMenu(){
  const menu = document.getElementById("menu");
  menu.classList.toggle("active");
}

<script>
  window.addEventListener("load", function(){
    const loader = document.getElementById("loader");

    // Evita parpadeo si carga demasiado rápido
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 700);
  });
</script>
