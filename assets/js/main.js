document.addEventListener('DOMContentLoaded', () => {
  // ======= Mobile Menu Toggle =======
  const mobileMenu = document.getElementById('mobile-menu');
  window.toggleMenu = () => {
    mobileMenu.classList.toggle('hidden');
  };
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });

  // ======= Active Nav Highlight =======
  const currentPath = window.location.pathname.replace(/\/$/, '');
  document.querySelectorAll('.nav-link').forEach(link => {
    const linkPath = new URL(link.href).pathname.replace(/\/$/, '');
    if (currentPath === linkPath) {
      link.classList.add('active'); // your CSS should style .active
    }
  });

  // ======= About SlotFrenzy Games Slider =======
  let currentSlide = 0;
  const slider = document.getElementById('slider');
  if (slider) {
    const slides = slider.children.length;
    function updateSlider() {
      slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    window.nextSlide = () => {
      currentSlide = (currentSlide + 1) % slides;
      updateSlider();
    };
    window.prevSlide = () => {
      currentSlide = (currentSlide - 1 + slides) % slides;
      updateSlider();
    };
    setInterval(nextSlide, 6000);
  }

  // ======= Testimonials =======
  const testimonials = [
    {
      title: "Daily Slot Bliss!",
      text: "I love spinning every evening — graphics & daily coins keep it exciting.",
      extra: "Started last month, already unlocked special badges!"
    },
    {
      title: "Streaming SlotFrenzy is a blast!",
      text: "My followers love watching the colorful spins, and the free bonuses let me play longer on stream.",
      extra: "New games every week keep content fresh and my viewers excited."
    },
    {
      title: "Leaderboard Fun!",
      text: "Chasing top spots is thrilling, and the glowing theme makes it addictively fun.",
      extra: "Won the weekly tournament twice!"
    }
  ];

  const userCards = document.querySelectorAll('.user-card');
  const titleEl = document.getElementById('testimonialTitle');
  const textEl = document.getElementById('testimonialText');
  const extraEl = document.getElementById('testimonialExtra');

  if (userCards.length > 0) {
    userCards[0].classList.add('active-user');
    titleEl.textContent = testimonials[0].title;
    textEl.textContent = testimonials[0].text;
    extraEl.textContent = testimonials[0].extra;
    userCards.forEach((card, index) => {
      card.addEventListener('click', () => {
        userCards.forEach(c => c.classList.remove('active-user'));
        card.classList.add('active-user');
        titleEl.textContent = testimonials[index].title;
        textEl.textContent = testimonials[index].text;
        extraEl.textContent = testimonials[index].extra;
      });
    });
  }

  // ======= Login State & Coins =======
  const username = localStorage.getItem('username');
  const coins = parseInt(localStorage.getItem('coins')) || 0;

  const loginLink = document.getElementById('loginLink');
  const userInfo = document.getElementById('userInfo');
  const welcomeText = document.getElementById('welcomeText');
  const coinCounter = document.getElementById('coinCounter');

  const mobileLoginLink = document.getElementById('mobileLoginLink');
  const mobileUserInfo = document.getElementById('mobileUserInfo');
  const mobileWelcomeText = document.getElementById('mobileWelcomeText');
  const mobileCoinCounter = document.getElementById('mobileCoinCounter');

  if (username) {
    // Hide login links
    if (loginLink) loginLink.classList.add('hidden');
    if (mobileLoginLink) mobileLoginLink.classList.add('hidden');

    // Show user info boxes
    if (userInfo) userInfo.classList.remove('hidden');
    if (mobileUserInfo) mobileUserInfo.classList.remove('hidden');

    // Update welcome texts
    if (welcomeText) welcomeText.textContent = `Welcome, ${username}`;
    if (mobileWelcomeText) mobileWelcomeText.textContent = `Welcome, ${username}`;

    // Animate coins
    if (coinCounter) animateCoins(coinCounter, coins);
    if (mobileCoinCounter) animateCoins(mobileCoinCounter, coins);

    // Hide register actions globally
    document.querySelectorAll('.register-action').forEach(el => {
      el.classList.add('hidden');
    });
  }

  // ======= Logout handling =======
const logoutBtn = document.getElementById('logoutBtn');
const mobileLogoutBtn = document.getElementById('mobileLogoutBtn');

function logout() {
  // Clear all relevant localStorage items
  localStorage.removeItem('username');
  localStorage.removeItem('email');
  localStorage.removeItem('password');
  localStorage.removeItem('coins');
  localStorage.removeItem('demoPlayCount');
  localStorage.removeItem('isRegistered');
  localStorage.removeItem('ageVerified');
  localStorage.removeItem('cookiesConsent');

  // Clear sessionStorage for last played game
  sessionStorage.removeItem('lastGameTitle');
  sessionStorage.removeItem('lastGameSrc');
  sessionStorage.removeItem('lastGameBack');

  // Redirect to home or login page
  window.location.href = '/';
}

if (logoutBtn) logoutBtn.addEventListener('click', logout);
if (mobileLogoutBtn) mobileLogoutBtn.addEventListener('click', logout);

  // ======= Smooth Scroll for # links =======
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href'))
        .scrollIntoView({ behavior: 'smooth' });
    });
  });
});

// ======= Animate Coins Counter (outside DOMContentLoaded) =======
function animateCoins(element, target) {
  let count = 0;
  const step = Math.ceil(target / 50);
  const interval = setInterval(() => {
    count += step;
    if (count >= target) {
      count = target;
      clearInterval(interval);
    }
    element.textContent = `${count} Coins`;
  }, 20);
}

// =========== Age Verification Modal ======= //

// Age verification logic
function acceptAge(){
  localStorage.setItem('ageVerified', 'true');
  document.getElementById('ageModal').classList.add('hidden');
}

function denyAge(){
  window.location.href = 'https://google.com';
}

document.addEventListener('DOMContentLoaded', () => {
  // Show modal if not verified yet
  if(localStorage.getItem('ageVerified') !== 'true'){
    document.getElementById('ageModal').classList.remove('hidden');
  }

  // Add button click listeners
  const acceptBtn = document.getElementById('acceptAgeBtn');
  const denyBtn = document.getElementById('denyAgeBtn');
  
  if (acceptBtn) acceptBtn.addEventListener('click', acceptAge);
  if (denyBtn) denyBtn.addEventListener('click', denyAge);
});



/*
  Slot 2 Games Registration Gate
  - Shows a registration modal when a user tries to play a demo game without being registered.
  - Limits the number of demo plays before requiring registration.
  - Redirects to registration page with game info if user exceeds the demo limit.
*/
// /assets/js/main.js  (games listing page)
// document.addEventListener('DOMContentLoaded', () => {
//   /* =========================
//    * Config & DOM
//    * ========================= */
//   const DEMO_LIMIT = 2;

//   const registerGateModal    = document.getElementById('registerGateModal');
//   const registerGateBackdrop = document.getElementById('registerGateBackdrop');
//   const confirmRegisterBtn   = document.getElementById('confirmRegister');
//   const closeRegisterBtn     = document.getElementById('closeRegisterModal');

//   /* =========================
//    * Helpers (auth + storage)
//    * ========================= */
// // ===== Utility functions for login and demo count =====
// function isLoggedIn() {
//   return !!localStorage.getItem('username') || localStorage.getItem('isRegistered') === 'true';
// }

// function getDemoCount() {
//   return parseInt(localStorage.getItem('demoPlayCount') || '0', 10);
// }

// function incrementDemoCount() {
//   const next = getDemoCount() + 1;
//   localStorage.setItem('demoPlayCount', String(next));
//   return next;
// }

// // ===== Game click handler with short URL and demo limit =====
// document.querySelectorAll(".play-demo-btn").forEach(btn => {
//   btn.addEventListener("click", () => {
//     const gameId = btn.dataset.gameId || btn.dataset.gameTitle; // fallback
//     const gameUrl = btn.dataset.src;
//     const backUrl = btn.dataset.returnUrl || "/games/";

//     if (!isLoggedIn()) {
//       if (getDemoCount() >= 2) {
//         alert("You’ve reached your free play limit. Please register to continue.");
//         localStorage.setItem("gameRedirect", JSON.stringify({ gameId, gameUrl, backUrl }));
//         window.location.href = "/register/";
//         return;
//       } else {
//         incrementDemoCount();
//       }
//     }

//     // Redirect to iframe game page with short params
//     window.location.href = `/games/game/index.html?id=${encodeURIComponent(gameId)}&src=${encodeURIComponent(gameUrl)}&back=${encodeURIComponent(backUrl)}`;
//   });
// });
//   /* =========================
//    * Helpers (UI + navigation)
//    * ========================= */
//   function showRegisterGate(path, title, returnUrl) {
//     if (!registerGateModal) return;
//     registerGateModal.setAttribute('data-src', path || '');
//     registerGateModal.setAttribute('data-game-title', title || '');
//     registerGateModal.setAttribute('data-return-url', returnUrl || '/games/');
//     registerGateModal.classList.remove('hidden');
//     if (registerGateBackdrop) registerGateBackdrop.classList.remove('hidden');
//     document.body.classList.add('overflow-hidden');
//   }

//   function hideRegisterGate() {
//     if (!registerGateModal) return;
//     registerGateModal.classList.add('hidden');
//     if (registerGateBackdrop) registerGateBackdrop.classList.add('hidden');
//     document.body.classList.remove('overflow-hidden');
//   }

//   function openDemo(path, title) {
//     const returnUrl = window.location.pathname;
//     try {
//       sessionStorage.setItem('gameTitle', title || 'Game');
//       sessionStorage.setItem('gameSrc', path || '');
//       sessionStorage.setItem('gameBack', returnUrl);
//     } catch (_) {}
//     const url = `/games/game/index.html?title=${encodeURIComponent(title || 'Game')}&src=${encodeURIComponent(path || '')}&back=${encodeURIComponent(returnUrl)}`;
//     window.location.href = url;
//   }

//   // Get title/src robustly from the clicked control/card
//   function resolveGameInfo(el) {
//     let title = el.getAttribute('data-game-title');
//     let src   = el.getAttribute('data-src');

//     if ((!title || !src) && el.closest) {
//       const container = el.closest('[data-game-title],[data-game-src],article,section,div');
//       if (container) {
//         title = title || container.getAttribute('data-game-title');
//         src   = src   || container.getAttribute('data-game-src');
//       }
//     }

//     if (!title) {
//       const h2 = el.closest('article,div,li,section')?.querySelector('h2');
//       if (h2 && h2.textContent.trim()) title = h2.textContent.trim();
//     }
//     if (!title) {
//       const img = el.closest('article,div,li,section')?.querySelector('img[alt]');
//       if (img) title = img.getAttribute('alt');
//     }

//     return { title: title || 'Game', src: src || '' };
//   }

//   /* =========================
//    * Modal events
//    * ========================= */
//   if (registerGateBackdrop) registerGateBackdrop.addEventListener('click', hideRegisterGate);
//   if (closeRegisterBtn) closeRegisterBtn.addEventListener('click', hideRegisterGate);
//   if (confirmRegisterBtn) {
//     confirmRegisterBtn.addEventListener('click', () => {
//       if (!registerGateModal) {
//         window.location.href = '/register/';
//         return;
//       }
//       const path = registerGateModal.getAttribute('data-src') || '';
//       const title = registerGateModal.getAttribute('data-game-title') || 'Game';
//       const returnUrl = registerGateModal.getAttribute('data-return-url') || '/games/';
//       const registrationUrl = `/register/index.html?src=${encodeURIComponent(path)}&title=${encodeURIComponent(title)}&back=${encodeURIComponent(returnUrl)}`;
//       window.location.href = registrationUrl;
//     });
//   }

//   /* =========================
//    * Main handler (play button)
//    * ========================= */
//   function onPlayClick(event) {
//     event.preventDefault();
//     const btn = event.currentTarget;
//     const { title, src } = resolveGameInfo(btn);
//     const returnUrl = window.location.pathname;

//     if (!src) {
//       console.warn('Play button missing data-src. Title was:', title);
//       return;
//     }

//     if (isLoggedIn()) {
//       openDemo(src, title);
//       return;
//     }

//     const count = getDemoCount();
//     if (count >= DEMO_LIMIT) {
//       showRegisterGate(src, title, returnUrl);
//       return;
//     }

//     incrementDemoCount();
//     openDemo(src, title);
//   }

//   // Expose for inline handler (if needed)
//   window.handlePlayClick = onPlayClick;

//   // Auto-bind .play-demo-btn (skip if inline onclick is present)
//   document.querySelectorAll('.play-demo-btn').forEach(btn => {
//     if (btn.dataset.listenerAttached === 'true') return;
//     if (btn.hasAttribute('onclick')) return; // prevent double firing
//     btn.addEventListener('click', onPlayClick);
//     btn.dataset.listenerAttached = 'true';
//   });
//    });

  /* =========================
   * UI tweaks for logged-in users
   * ========================= */
//   if (isLoggedIn()) {
//     document.querySelectorAll('.overlay-blocker').forEach(el => el.classList.add('hidden'));
//   }
// });

document.addEventListener('DOMContentLoaded', () => {
  const DEMO_LIMIT = 2;
  const registerGateModal = document.getElementById('registerGateModal');
  const confirmRegisterBtn = document.getElementById('confirmRegister');
  const closeRegisterBtn = document.getElementById('closeRegisterModal');

  // ===== Helpers =====
  function isLoggedIn() {
    return !!localStorage.getItem('username') || localStorage.getItem('isRegistered') === 'true';
  }

  function getDemoCount() {
    return parseInt(localStorage.getItem('demoPlayCount') || '0', 10);
  }

  function resolveGameInfo(el) {
    let title = el.getAttribute('data-game-title');
    let src = el.getAttribute('data-src');

    if ((!title || !src) && el.closest) {
      const container = el.closest('[data-game-title],[data-game-src],article,section,div');
      if (container) {
        title = title || container.getAttribute('data-game-title');
        src = src || container.getAttribute('data-game-src');
      }
    }

    if (!title) {
      const h2 = el.closest('article,div,li,section')?.querySelector('h2');
      if (h2 && h2.textContent.trim()) title = h2.textContent.trim();
    }

    return { title: title || 'Game', src: src || '' };
  }

  function openDemo(path, title) {
    const returnUrl = window.location.pathname;
    const url = `/games/game/index.html?title=${encodeURIComponent(title || 'Game')}&src=${encodeURIComponent(path || '')}&back=${encodeURIComponent(returnUrl)}`;
    window.location.href = url;
  }

  function showRegisterGate(path, title, returnUrl) {
    if (!registerGateModal) return;
    registerGateModal.setAttribute('data-src', path);
    registerGateModal.setAttribute('data-game-title', title);
    registerGateModal.setAttribute('data-return-url', returnUrl);
    registerGateModal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }

  function hideRegisterGate() {
    if (!registerGateModal) return;
    registerGateModal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  // ===== Play button handler =====
  function onPlayClick(event) {
    event.preventDefault();
    const btn = event.currentTarget;
    const { title, src } = resolveGameInfo(btn);
    const returnUrl = window.location.pathname;

    if (!src) return;

    if (isLoggedIn()) {
      openDemo(src, title);
      return;
    }

    const count = getDemoCount();

    if (count >= DEMO_LIMIT) {
      showRegisterGate(src, title, returnUrl);
      return;
    }

    // ✅ Do NOT increment here; iframe will handle it
    openDemo(src, title);
  }

  // ===== Modal buttons =====
  if (closeRegisterBtn) closeRegisterBtn.addEventListener('click', hideRegisterGate);

  if (confirmRegisterBtn) {
    confirmRegisterBtn.addEventListener('click', () => {
      const path = registerGateModal.getAttribute('data-src') || '';
      const title = registerGateModal.getAttribute('data-game-title') || 'Game';
      const returnUrl = registerGateModal.getAttribute('data-return-url') || '/games/';
      window.location.href = `/register/index.html?title=${encodeURIComponent(title)}&src=${encodeURIComponent(path)}&back=${encodeURIComponent(returnUrl)}`;
    });
  }

  // ===== Bind all play buttons =====
  document.querySelectorAll('.play-demo-btn').forEach(btn => {
    if (btn.dataset.listenerAttached === 'true') return;
    if (btn.hasAttribute('onclick')) return;
    btn.addEventListener('click', onPlayClick);
    btn.dataset.listenerAttached = 'true';
  });

  window.handlePlayClick = onPlayClick;
});


