// import "./style.css";

// document.addEventListener("DOMContentLoaded", function () {
//   const produkteBtn = document.getElementById("showProdMenu");
//   const prodMenu = document.getElementById("prodMenu");
//   const menuNav = prodMenu.querySelector(".menu-nav");

//   produkteBtn.addEventListener("click", function (event) {
//     event.preventDefault();
//     if (menuNav.classList.contains("active")) {
//       closeAllMenus();
//     } else {
//       openMenu();
//     }
//   });

//   document.querySelectorAll(".menu-nav > li.hasSubCats > a").forEach((link) => {
//     link.addEventListener("click", function (event) {
//       event.preventDefault();
//       const parentLi = this.closest("li");
//       const subcatLevel1 = parentLi.querySelector(".subcat.level-1");

//       if (subcatLevel1) {
//         closeSubcatsAtLevel(".subcat.level-1");
//         closeSubcatsAtLevel(".subcat.level-2");
//         subcatLevel1.classList.add("active");
//         toggleLevel1CloseIcon(subcatLevel1, true); // Ensure it's visible
//       }
//     });
//   });

//   document
//     .querySelectorAll(".subcat.level-1 > ul > li.hasSubCats > a")
//     .forEach((link) => {
//       link.addEventListener("click", function (event) {
//         event.preventDefault();
//         const parentLi = this.closest("li");
//         const subcatLevel2 = parentLi.querySelector(".subcat.level-2");
//         const subcatLevel1 = parentLi.closest(".subcat.level-1");

//         if (subcatLevel2) {
//           closeSubcatsAtLevel(".subcat.level-2");
//           subcatLevel2.classList.add("active");
//           toggleLevel1CloseIcon(subcatLevel1, false); // Hide Level-1 close icon
//         }
//       });
//     });

//   document.querySelectorAll(".close-icon").forEach((closeBtn) => {
//     closeBtn.addEventListener("click", function (event) {
//       event.stopPropagation();
//       const parentSubcat = this.closest(".subcat");

//       if (parentSubcat.classList.contains("level-2")) {
//         closeSubcatsAtLevel(".subcat.level-2");
//         toggleLevel1CloseIcon(parentSubcat.closest(".subcat.level-1"), true); // Show Level-1 close icon
//       } else if (parentSubcat.classList.contains("level-1")) {
//         closeSubcatsAtLevel(".subcat.level-1");
//       }
//     });
//   });

//   function openMenu() {
//     menuNav.classList.add("active");
//     menuNav.classList.remove("closing");
//     document.addEventListener("click", outsideClickHandler);
//   }

//   function closeAllMenus() {
//     closeSubcatsAtLevel(".subcat.level-2");
//     closeSubcatsAtLevel(".subcat.level-1");

//     menuNav.classList.add("closing");
//     setTimeout(() => {
//       menuNav.classList.remove("active", "closing");
//     }, 300);

//     document.removeEventListener("click", outsideClickHandler);
//   }

//   function closeSubcatsAtLevel(selector) {
//     document.querySelectorAll(selector).forEach((subcat) => {
//       subcat.classList.remove("active");
//     });
//   }

//   function outsideClickHandler(event) {
//     if (prodMenu.contains(event.target) || produkteBtn.contains(event.target)) {
//       return;
//     }

//     const subcatLevel2 = document.querySelector(".subcat.level-2.active");
//     const subcatLevel1 = document.querySelector(".subcat.level-1.active");

//     if (subcatLevel2) {
//       closeSubcatsAtLevel(".subcat.level-2");
//       toggleLevel1CloseIcon(subcatLevel1, true); // Show Level-1 close icon when Level-2 closes
//     } else if (subcatLevel1) {
//       closeSubcatsAtLevel(".subcat.level-1");
//     } else {
//       closeAllMenus();
//     }
//   }

//   function toggleLevel1CloseIcon(subcatLevel1, isVisible) {
//     if (subcatLevel1) {
//       const closeIcon = subcatLevel1.querySelector(".close-icon");
//       if (closeIcon) {
//         closeIcon.style.display = isVisible ? "block" : "none";
//       }
//     }
//   }
// });

import './style.css';

async function loadPartials() {
	const headerContainer = document.getElementById('header');

	if (!headerContainer) {
		console.error('⚠️ #header not found in DOM!');
		return;
	}

	const partials = [
		'header.html',
		'bottomHeader.html',
		'submenu.html',
		'swiper.html',
		'products.html',
		'cards.html',
		'categories.html',
		'sales.html',
	];

	for (const file of partials) {
		try {
			const response = await fetch(`/homepage/partials/${file}`);
			if (!response.ok) {
				console.error(`⚠️ Error loading ${file}: ${response.statusText}`);
				continue;
			}

			const html = await response.text();
			headerContainer.innerHTML += html; // Append HTML safely
		} catch (error) {
			console.error(`⚠️ Fetch error for ${file}:`, error);
		}
	}

	console.log('✅ Partials loaded successfully.');
}

// ✅ Ensure `DOMContentLoaded` waits for Partials to Load before running scripts
document.addEventListener('DOMContentLoaded', async function () {
	await loadPartials(); // Load partials before initializing the menu

	// Wait until the content is fully loaded before attaching event listeners
	setTimeout(() => {
		initMenuLogic();
		initMobileMenuLogic();
		initSwiper();
	}, 500);
});

// ✅ Move menu logic into a separate function
function initMenuLogic() {
	console.log('✅ Initializing menu logic...');

	const produkteBtn = document.getElementById('showProdMenu');
	const prodMenu = document.getElementById('prodMenu');

	if (!produkteBtn || !prodMenu) {
		console.warn('⚠️ Menu elements not found, skipping event listeners.');
		return;
	}

	const menuNav = prodMenu.querySelector('.menu-nav');

	produkteBtn.addEventListener('click', function (event) {
		event.preventDefault();
		if (menuNav.classList.contains('active')) {
			closeAllMenus();
		} else {
			openMenu();
		}
	});

	document.querySelectorAll('.menu-nav > li.hasSubCats > a').forEach((link) => {
		link.addEventListener('click', function (event) {
			event.preventDefault();
			const parentLi = this.closest('li');
			const subcatLevel1 = parentLi.querySelector('.subcat.level-1');

			if (subcatLevel1) {
				closeSubcatsAtLevel('.subcat.level-1');
				closeSubcatsAtLevel('.subcat.level-2');
				subcatLevel1.classList.add('active');
				toggleLevel1CloseIcon(subcatLevel1, true);
			}
		});
	});

	document
		.querySelectorAll('.subcat.level-1 > ul > li.hasSubCats > a')
		.forEach((link) => {
			link.addEventListener('click', function (event) {
				event.preventDefault();
				const parentLi = this.closest('li');
				const subcatLevel2 = parentLi.querySelector('.subcat.level-2');
				const subcatLevel1 = parentLi.closest('.subcat.level-1');

				if (subcatLevel2) {
					closeSubcatsAtLevel('.subcat.level-2');
					subcatLevel2.classList.add('active');
					toggleLevel1CloseIcon(subcatLevel1, false);
				}
			});
		});

	document.querySelectorAll('.close-icon').forEach((closeBtn) => {
		closeBtn.addEventListener('click', function (event) {
			event.stopPropagation();
			const parentSubcat = this.closest('.subcat');

			if (parentSubcat.classList.contains('level-2')) {
				closeSubcatsAtLevel('.subcat.level-2');
				toggleLevel1CloseIcon(parentSubcat.closest('.subcat.level-1'), true);
			} else if (parentSubcat.classList.contains('level-1')) {
				closeSubcatsAtLevel('.subcat.level-1');
			}
		});
	});

	function openMenu() {
		menuNav.classList.add('active');
		menuNav.classList.remove('closing');
		document.addEventListener('click', outsideClickHandler);
	}

	function closeAllMenus() {
		closeSubcatsAtLevel('.subcat.level-2');
		closeSubcatsAtLevel('.subcat.level-1');

		menuNav.classList.add('closing');
		setTimeout(() => {
			menuNav.classList.remove('active', 'closing');
		}, 300);

		document.removeEventListener('click', outsideClickHandler);
	}

	function closeSubcatsAtLevel(selector) {
		document.querySelectorAll(selector).forEach((subcat) => {
			subcat.classList.remove('active');
		});
	}

	function outsideClickHandler(event) {
		if (prodMenu.contains(event.target) || produkteBtn.contains(event.target)) {
			return;
		}

		const subcatLevel2 = document.querySelector('.subcat.level-2.active');
		const subcatLevel1 = document.querySelector('.subcat.level-1.active');

		if (subcatLevel2) {
			closeSubcatsAtLevel('.subcat.level-2');
			toggleLevel1CloseIcon(subcatLevel1, true);
		} else if (subcatLevel1) {
			closeSubcatsAtLevel('.subcat.level-1');
		} else {
			closeAllMenus();
		}
	}

	function toggleLevel1CloseIcon(subcatLevel1, isVisible) {
		if (subcatLevel1) {
			const closeIcon = subcatLevel1.querySelector('.close-icon');
			if (closeIcon) {
				closeIcon.style.display = isVisible ? 'block' : 'none';
			}
		}
	}

	console.log('✅ Menu logic initialized.');
}

// ✅ **Mobile Menu Toggle Logic**
function initMobileMenuLogic() {
	console.log('✅ Initializing mobile menu logic...');

	const menuBtn = document.getElementById('menu-btn');
	const bottomHeader = document.getElementById('bottom-header');
	const submenu = document.querySelector('.submenu');
	const burgerIcon = menuBtn?.querySelector('.burger');
	const closeIcon = menuBtn?.querySelector('.closer');

	if (!menuBtn || !bottomHeader || !submenu) {
		console.warn('⚠️ Mobile menu elements not found. Skipping logic.');
		return;
	}

	console.log('✅ Mobile menu button, bottom-header, and submenu found!');

	menuBtn.addEventListener('click', (event) => {
		event.preventDefault();
		event.stopPropagation();

		const isHidden = bottomHeader.classList.contains('hidden');

		// Toggle visibility
		bottomHeader.classList.toggle('hidden', !isHidden);
		bottomHeader.classList.toggle('open-menu', isHidden);

		submenu.classList.toggle('hidden', !isHidden);
		submenu.classList.toggle('open-submenu', isHidden);

		// Toggle icons
		burgerIcon.classList.toggle('hidden', isHidden);
		closeIcon.classList.toggle('hidden', !isHidden);

		console.log('📢 Mobile menu toggled!', { isHidden });
	});

	// ✅ Close menu when clicking outside
	document.addEventListener('click', (event) => {
		if (
			!bottomHeader.contains(event.target) &&
			!menuBtn.contains(event.target)
		) {
			bottomHeader.classList.add('hidden');
			bottomHeader.classList.remove('open-menu');

			submenu.classList.add('hidden');
			submenu.classList.remove('open-submenu');

			// Reset icons
			burgerIcon.classList.remove('hidden');
			closeIcon.classList.add('hidden');

			console.log('❌ Mobile menu & submenu closed!');
		}
	});

	console.log('✅ Mobile menu logic initialized.');
}

// ✅ Swiper Initialization Function
function initSwiper() {
	console.log('✅ Initializing Swiper...');

	const swiperContainer = document.querySelector('.mySwiper');
	if (!swiperContainer) {
		console.warn('⚠️ Swiper container not found! Skipping initialization.');
		return;
	}

	const swiper = new Swiper('.mySwiper', {
		loop: true,
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	});

	console.log('✅ Swiper initialized.');
}
