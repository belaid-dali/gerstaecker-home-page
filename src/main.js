import "./style.css";

document.addEventListener("DOMContentLoaded", function () {
  const produkteBtn = document.getElementById("showProdMenu");
  const prodMenu = document.getElementById("prodMenu");
  const menuNav = prodMenu.querySelector(".menu-nav");

  produkteBtn.addEventListener("click", function (event) {
    event.preventDefault();
    if (menuNav.classList.contains("active")) {
      closeAllMenus();
    } else {
      openMenu();
    }
  });

  document.querySelectorAll(".menu-nav > li.hasSubCats > a").forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const parentLi = this.closest("li");
      const subcatLevel1 = parentLi.querySelector(".subcat.level-1");

      if (subcatLevel1) {
        closeSubcatsAtLevel(".subcat.level-1");
        closeSubcatsAtLevel(".subcat.level-2");
        subcatLevel1.classList.add("active");
        toggleLevel1CloseIcon(subcatLevel1, true); // Ensure it's visible
      }
    });
  });

  document
    .querySelectorAll(".subcat.level-1 > ul > li.hasSubCats > a")
    .forEach((link) => {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        const parentLi = this.closest("li");
        const subcatLevel2 = parentLi.querySelector(".subcat.level-2");
        const subcatLevel1 = parentLi.closest(".subcat.level-1");

        if (subcatLevel2) {
          closeSubcatsAtLevel(".subcat.level-2");
          subcatLevel2.classList.add("active");
          toggleLevel1CloseIcon(subcatLevel1, false); // Hide Level-1 close icon
        }
      });
    });

  document.querySelectorAll(".close-icon").forEach((closeBtn) => {
    closeBtn.addEventListener("click", function (event) {
      event.stopPropagation();
      const parentSubcat = this.closest(".subcat");

      if (parentSubcat.classList.contains("level-2")) {
        closeSubcatsAtLevel(".subcat.level-2");
        toggleLevel1CloseIcon(parentSubcat.closest(".subcat.level-1"), true); // Show Level-1 close icon
      } else if (parentSubcat.classList.contains("level-1")) {
        closeSubcatsAtLevel(".subcat.level-1");
      }
    });
  });

  function openMenu() {
    menuNav.classList.add("active");
    menuNav.classList.remove("closing");
    document.addEventListener("click", outsideClickHandler);
  }

  function closeAllMenus() {
    closeSubcatsAtLevel(".subcat.level-2");
    closeSubcatsAtLevel(".subcat.level-1");

    menuNav.classList.add("closing");
    setTimeout(() => {
      menuNav.classList.remove("active", "closing");
    }, 300);

    document.removeEventListener("click", outsideClickHandler);
  }

  function closeSubcatsAtLevel(selector) {
    document.querySelectorAll(selector).forEach((subcat) => {
      subcat.classList.remove("active");
    });
  }

  function outsideClickHandler(event) {
    if (prodMenu.contains(event.target) || produkteBtn.contains(event.target)) {
      return;
    }

    const subcatLevel2 = document.querySelector(".subcat.level-2.active");
    const subcatLevel1 = document.querySelector(".subcat.level-1.active");

    if (subcatLevel2) {
      closeSubcatsAtLevel(".subcat.level-2");
      toggleLevel1CloseIcon(subcatLevel1, true); // Show Level-1 close icon when Level-2 closes
    } else if (subcatLevel1) {
      closeSubcatsAtLevel(".subcat.level-1");
    } else {
      closeAllMenus();
    }
  }

  function toggleLevel1CloseIcon(subcatLevel1, isVisible) {
    if (subcatLevel1) {
      const closeIcon = subcatLevel1.querySelector(".close-icon");
      if (closeIcon) {
        closeIcon.style.display = isVisible ? "block" : "none";
      }
    }
  }
});
