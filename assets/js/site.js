(function () {
  var toc = document.getElementById("toc-panel");
  var toggle = document.getElementById("toc-toggle");
  if (toggle && toc) {
    toggle.addEventListener("click", function () {
      toc.classList.toggle("open");
      var open = toc.classList.contains("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Close contents" : "Contents";
    });
  }

  var links = document.querySelectorAll(".toc-panel a[href^='#']");
  if (!links.length || !("IntersectionObserver" in window)) return;

  var map = {};
  links.forEach(function (a) {
    var id = a.getAttribute("href").slice(1);
    map[id] = a;
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        links.forEach(function (a) {
          a.classList.remove("active");
        });
        if (map[id]) map[id].classList.add("active");
      });
    },
    { rootMargin: "-20% 0px -70% 0px", threshold: 0.01 }
  );

  Object.keys(map).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) observer.observe(el);
  });
})();
