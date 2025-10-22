// Payment page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const formationType = urlParams.get('type') || 'standard';
    const formationPrice = urlParams.get('price') || '990';

    // Update order summary based on URL parameters
    updateFormationDetails(formationType, formationPrice);

    // Quantity selectors
    let quantity = 1;
    const decreaseBtn = document.getElementById('decrease-qty');
    const increaseBtn = document.getElementById('increase-qty');
    const quantityDisplay = document.getElementById('quantity');
    const totalPriceDisplay = document.getElementById('total-price');
    const pricePerDay = parseInt(formationPrice);

    function updateTotal() {
        const total = pricePerDay * quantity;
        totalPriceDisplay.textContent = total.toLocaleString('fr-FR') + '€';
    }

    decreaseBtn.addEventListener('click', function() {
        if (quantity > 1) {
            quantity--;
            quantityDisplay.textContent = quantity;
            updateTotal();
        }
    });

    increaseBtn.addEventListener('click', function() {
        if (quantity < 10) {
            quantity++;
            quantityDisplay.textContent = quantity;
            updateTotal();
        }
    });

    // Card number formatting
    const cardNumberInput = document.getElementById('card-number');
    cardNumberInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formattedValue;
    });

    // Expiry date formatting
    const expiryDateInput = document.getElementById('expiry-date');
    expiryDateInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value;
    });

    // CVV - only numbers
    const cvvInput = document.getElementById('cvv');
    cvvInput.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '');
    });

    // Form submission
    const paymentForm = document.getElementById('payment-form');
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate form
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const email = document.getElementById('email').value;
        const company = document.getElementById('company').value;
        const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
        const expiryDate = document.getElementById('expiry-date').value;
        const cvv = document.getElementById('cvv').value;

        // Basic validation
        if (!firstName || !lastName || !email || !company || !cardNumber || !expiryDate || !cvv) {
            alert('Veuillez remplir tous les champs');
            return;
        }

        if (cardNumber.length < 16) {
            alert('Numéro de carte invalide');
            return;
        }

        if (cvv.length < 3) {
            alert('CVV invalide');
            return;
        }

        // Show success modal
        showSuccessModal();
    });
});

function updateFormationDetails(type, price) {
    const formationTypeElement = document.getElementById('formation-type');
    const formationPriceElement = document.getElementById('formation-price');
    const featuresList = document.getElementById('features-list');

    let typeName = 'Formation Standard';
    let features = [
        '✓ Sessions interactives',
        '✓ Contenu personnalisé',
        '✓ Exercices pratiques'
    ];

    if (type === 'essentielle' || type === 'essential') {
        typeName = 'Formation Essentielle';
        features = [
            '✓ Formation de base',
            '✓ Jusqu\'à 5 participants',
            '✓ Support email 30 jours',
            '✓ Matériel pédagogique inclus'
        ];
    } else if (type === 'premium') {
        typeName = 'Formation Premium';
        features = [
            '✓ Formation approfondie',
            '✓ Jusqu\'à 15 participants',
            '✓ Exercices avancés en laboratoire',
            '✓ Support prioritaire 90 jours',
            '✓ Certification incluse'
        ];
    }

    formationTypeElement.textContent = typeName;
    formationPriceElement.textContent = parseInt(price).toLocaleString('fr-FR') + '€';

    // Update features list
    featuresList.innerHTML = features.map(feature => `<li>${feature}</li>`).join('');
}

function showSuccessModal() {
    const modal = document.getElementById('success-modal');
    modal.classList.add('show');
}

function closeModal() {
    const modal = document.getElementById('success-modal');
    modal.classList.remove('show');
    // Redirect to home page
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 300);
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('success-modal');
    if (e.target === modal) {
        closeModal();
    }
});
