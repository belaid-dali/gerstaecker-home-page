import './style.css';

async function loadPartials() {
	const headerContainer = document.getElementById('header');
	const contentContainer = document.getElementById('content');

	if (!headerContainer || !contentContainer) {
		console.error('⚠️ #header or #content not found in DOM!');
		return;
	}

	const headerPartials = [
		'partials/header.html',
		'partials/bottomHeader.html',
		'partials/submenu.html',
	];

	const contentPartials = [
		'partials/swiper.html',
		'partials/products.html',
		'partials/cards.html',
		'partials/categories.html',
		'partials/sales.html',
		'partials/cards2.html',
		'partials/boutiques.html',
		'partials/seo.html',
		'partials/footer.html',
	];

	// Load header partials
	for (const file of headerPartials) {
		try {
			const response = await fetch(file);
			if (!response.ok) {
				console.error(`⚠️ Error loading ${file}: ${response.statusText}`);
				continue;
			}

			const html = await response.text();
			headerContainer.insertAdjacentHTML('beforeend', html);
		} catch (error) {
			console.error(`⚠️ Fetch error for ${file}:`, error);
		}
	}

	// Load content partials
	for (const file of contentPartials) {
		try {
			const response = await fetch(file);
			if (!response.ok) {
				console.error(`⚠️ Error loading ${file}: ${response.statusText}`);
				continue;
			}

			const html = await response.text();
			contentContainer.insertAdjacentHTML('beforeend', html);
		} catch (error) {
			console.error(`⚠️ Fetch error for ${file}:`, error);
		}
	}

	// console.log('✅ Partials loaded successfully.');
}

document.addEventListener('DOMContentLoaded', async function () {
	await loadPartials(); // Load partials before initializing the menu

	// Wait until the content is fully loaded before attaching event listeners
	setTimeout(() => {
		initMenuLogic();
		initMobileMenuLogic();
		initSwiper();
		initFooterToggle();
	}, 500);
});

// ✅ Move menu logic into a separate function
function initMenuLogic() {
	const produkteBtn = document.getElementById('showProdMenu');
	const prodMenu = document.getElementById('prodMenu');
	const contentContainer = document.getElementById('content'); // Get the content container

	if (!produkteBtn || !prodMenu || !contentContainer) {
		console.warn(
			'⚠️ Menu or content elements not found, skipping event listeners.',
		);
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
		produkteBtn.classList.add('active'); // Add active class to #showProdMenu
		contentContainer.classList.add('blur-effect'); // Add blur effect
		document.addEventListener('click', outsideClickHandler);
	}

	function closeAllMenus() {
		closeSubcatsAtLevel('.subcat.level-2');
		closeSubcatsAtLevel('.subcat.level-1');

		// Add closing class to trigger animation
		menuNav.classList.add('closing');
		menuNav.classList.remove('active');
		produkteBtn.classList.remove('active'); // Remove active class from #showProdMenu
		contentContainer.classList.remove('blur-effect'); // Remove blur effect

		// After animation completes, remove closing class
		setTimeout(() => {
			menuNav.classList.remove('closing');
		}, 300);

		document.removeEventListener('click', outsideClickHandler);
	}

	// UPDATED: Modified to handle animations properly
	function closeSubcatsAtLevel(selector) {
		document.querySelectorAll(selector + '.active').forEach((subcat) => {
			// Add closing class to trigger animation
			subcat.classList.add('closing');
			subcat.classList.remove('active');

			// After animation completes, remove closing class
			setTimeout(() => {
				subcat.classList.remove('closing');
			}, 300);
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
}

// ✅ Swiper Initialization Function
function initSwiper() {
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
}

// ✅ **Mobile Menu Toggle Logic**
function initMobileMenuLogic() {
	// Cache DOM elements
	const menuBtn = document.getElementById('menu-btn');
	const closeMenuBtn = document.getElementById('closeMenuBtn');
	const mobileMenu = document.getElementById('mobileMenu');
	const menuOverlay = document.getElementById('menuOverlay');

	// Check if all required elements exist
	if (!menuBtn || !closeMenuBtn || !mobileMenu || !menuOverlay) {
		console.warn(
			'⚠️ Mobile menu elements not found, skipping event listeners.',
		);
		return; // Exit early if elements are missing
	}

	// Function to open the mobile menu
	const openMenu = () => {
		mobileMenu.classList.remove('-translate-x-full');
		menuOverlay.classList.remove('opacity-0', 'pointer-events-none');
		menuOverlay.classList.add('opacity-100', 'pointer-events-auto');
	};

	// Function to close the mobile menu
	const closeMenu = () => {
		mobileMenu.classList.add('-translate-x-full');
		menuOverlay.classList.remove('opacity-100', 'pointer-events-auto');
		menuOverlay.classList.add('opacity-0', 'pointer-events-none');
	};

	// Event listeners
	menuBtn.addEventListener('click', openMenu);
	closeMenuBtn.addEventListener('click', closeMenu);
	menuOverlay.addEventListener('click', closeMenu);

	// Nested Dropdown Functionality
	document.querySelectorAll('.hasSubCats > a').forEach((item) => {
		item.addEventListener('click', (e) => {
			e.preventDefault();
			const parentLi = item.closest('li');
			const submenu = parentLi.querySelector('.subcat');

			if (submenu) {
				submenu.classList.toggle('hidden');
			}
		});
	});
}

function toggleContent(element) {
	if (!element) {
		console.error('Element is undefined!');
		return;
	}

	const content = element.nextElementSibling;
	const icon = element.querySelector('i');

	if (!content || !icon) {
		console.error('Content or icon not found!');
		return;
	}

	content.classList.toggle('open');
	icon.classList.toggle('open');

	// Toggle between fa-chevron-down and fa-chevron-up
	if (icon.classList.contains('fa-chevron-down')) {
		icon.classList.remove('fa-chevron-down');
		icon.classList.add('fa-chevron-up');
	} else {
		icon.classList.remove('fa-chevron-up');
		icon.classList.add('fa-chevron-down');
	}
}

function initFooterToggle() {
	// Only attach event listeners on small screens
	if (window.innerWidth < 980) {
		document.querySelectorAll('.footer-box-title').forEach((title) => {
			title.addEventListener('click', function () {
				toggleContent(this);
			});
		});
	}
}
