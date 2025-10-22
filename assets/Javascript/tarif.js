// Tarif page - Card reveal animations
document.addEventListener('DOMContentLoaded', function() {
    // Reveal hidden cards with a delay after page load
    setTimeout(() => {
        const hiddenCards = document.querySelectorAll('.hidden-card');
        
        // Reveal left card first
        setTimeout(() => {
            if (hiddenCards[0]) {
                hiddenCards[0].classList.add('reveal');
            }
        }, 400);
        
        // Reveal right card after a short delay
        setTimeout(() => {
            if (hiddenCards[1]) {
                hiddenCards[1].classList.add('reveal');
            }
        }, 600);
    }, 800);

    // Optional: Add hover effect to main card to temporarily hide side cards
    const mainCard = document.querySelector('.main-card');
    const hiddenCards = document.querySelectorAll('.hidden-card');

    if (mainCard) {
        mainCard.addEventListener('mouseenter', function() {
            hiddenCards.forEach(card => {
                card.style.opacity = '0.3';
            });
        });

        mainCard.addEventListener('mouseleave', function() {
            hiddenCards.forEach(card => {
                card.style.opacity = '1';
            });
        });
    }
});
