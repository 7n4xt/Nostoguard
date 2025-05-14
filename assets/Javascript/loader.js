// Create a self-executing function to avoid global scope pollution
(function () {
    // Run immediately when script is loaded
    const createLoader = () => {
        // Get the loader container
        const loaderContainer = document.querySelector('.loader');

        if (!loaderContainer) return;

        // Clear any existing content (prevents duplicates)
        loaderContainer.innerHTML = '';

        // Create the spinner
        const spinner = document.createElement('div');
        spinner.className = 'loader__spinner';

        // Create the shield
        const shield = document.createElement('div');
        shield.className = 'shield';
        spinner.appendChild(shield);

        // Create the lock icon
        const lockIcon = document.createElement('div');
        lockIcon.className = 'lock-icon';
        lockIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>';
        spinner.appendChild(lockIcon);

        // Create binary text
        const binary = document.createElement('div');
        binary.className = 'binary';
        binary.textContent = '01001110';
        spinner.appendChild(binary);

        // Add text
        const loadingText = document.createElement('p');
        loadingText.style = 'color: #1a237e; font-weight: bold; margin-top: 10px;';
        loadingText.textContent = 'SÉCURISATION...';

        // Add to loader
        loaderContainer.appendChild(spinner);
        loaderContainer.appendChild(loadingText);

        // Start binary animation
        const updateBinary = () => {
            const binaryString = Array(8).fill(0).map(() => Math.round(Math.random())).join('');
            binary.textContent = binaryString;
        };

        // Update binary every 200ms
        const binaryInterval = setInterval(updateBinary, 200);

        // Hide loader after delay - 1s as requested
        setTimeout(() => {
            clearInterval(binaryInterval);
            loaderContainer.classList.add('hidden');
        }, 1000);
    };

    // Execute immediately
    createLoader();
})();
