// Marquee scroll logic for product section
(function() {
  const track = document.querySelector('.product-marquee-track');
  const cards = document.querySelectorAll('.product-marquee-card');
  const leftBtn = document.querySelector('.marquee-arrow-left');
  const rightBtn = document.querySelector('.marquee-arrow-right');

  // Helper: Set active card on click/focus
  function setActive(card) {
    cards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    card.focus();
  }

  // Scroll left/right
  function scrollTrack(dir) {
    const cardWidth = cards[0]?.offsetWidth || 150;
    track.scrollBy({ left: dir * (cardWidth + 20), behavior: 'smooth' });
  }

  // Arrow button events
  leftBtn && leftBtn.addEventListener('click', () => scrollTrack(-1));
  rightBtn && rightBtn.addEventListener('click', () => scrollTrack(1));

  // Card click/focus/hover
  cards.forEach(card => {
    card.addEventListener('focus', () => setActive(card));
    card.addEventListener('mouseenter', () => setActive(card));
    card.addEventListener('click', () => setActive(card));
  });

  // Set first card active by default
  if (cards.length) setActive(cards[0]);
})();
