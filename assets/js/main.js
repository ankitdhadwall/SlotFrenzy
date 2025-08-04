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
    localStorage.removeItem('username');
    localStorage.removeItem('coins');
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
