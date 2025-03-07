// header

document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.querySelector(".menu-ic");
  const closeIcon = document.querySelector(".close-ic");
  const navbar = document.getElementById("navbar");
  const menuItems = document.querySelectorAll("#navbar ul li a");

  const closeMenu = () => {
    navbar.classList.add("closing");
    const menuIcon = document.querySelector("#header nav.menu > .close-ic");
    if (menuIcon) {
      menuIcon.style.display = "none";
    }
    setTimeout(() => {
      navbar.classList.remove("menu", "closing");
    }, 300);
  };

  menuIcon.addEventListener("click", function () {
    navbar.classList.add("menu");
    setTimeout(() => {
      document.querySelector("#header nav.menu > .close-ic").style.display =
        "block";
    }, 300);
  });

  closeIcon.addEventListener("click", closeMenu);

  menuItems.forEach((item) => {
    item.addEventListener("click", closeMenu);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section.container");
  const navItems = document.querySelectorAll("#navbar ul li");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let activeId = entry.target.getAttribute("id");

          navItems.forEach((item) => item.classList.remove("nav-active"));

          let activeNavItem = document.querySelector(
            `#navbar ul li a[href="#${activeId}"]`
          );
          if (activeNavItem) {
            activeNavItem.parentElement.classList.add("nav-active");
          }
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((section) => observer.observe(section));
});
