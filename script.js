document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startButton');
    const beerCountInput = document.getElementById('beerCount');
    const timeToDrinkInput = document.getElementById('timeToDrink');
    const timerDisplay = document.getElementById('timer');
    const timeLeftDisplay = document.getElementById('timeLeft');
    const beersLeftDisplay = document.getElementById('beersLeft');
    const sipSound = document.getElementById('sipSound');

    let beerCount = 0;
    let timeToDrink = 0;
    let sipInterval;
    let timeLeftInterval;

    startButton.addEventListener('click', function() {
        beerCount = parseInt(beerCountInput.value);
        timeToDrink = parseInt(timeToDrinkInput.value);

        if (beerCount <= 0 || timeToDrink <= 0) {
            alert('Please enter valid inputs.');
            return;
        }

        const sipAmount = 5; // in centiliters
        const beerAmount = 33; // in centiliters
        const totalSips = beerCount * (beerAmount / sipAmount);
        const sipIntervalTime = (timeToDrink * 60 * 1000) / totalSips;

        let sipCounter = 0;
        let timeLeft = timeToDrink * 60 * 1000;
        timerDisplay.textContent = 'Get Ready!';
        startButton.disabled = true;

        sipInterval = setInterval(function() {
            sipCounter++;
            if (sipCounter <= totalSips) {
                timerDisplay.textContent = 'Take a sip!';
                sipSound.play();
                // Update Beers Left
                beersLeftDisplay.textContent = `Beers Left: ${beerCount - Math.ceil(sipCounter * sipAmount / beerAmount)}`;
            } else {
                clearInterval(sipInterval);
                timerDisplay.textContent = 'Cheers! You finished your beers!';
                startButton.disabled = false;
            }
        }, sipIntervalTime);

        timeLeftInterval = setInterval(function() {
            if (timeLeft > 0) {
                timeLeft -= 1000; // Decrease by 1 second
                const minutes = Math.floor(timeLeft / (60 * 1000));
                const seconds = Math.floor((timeLeft % (60 * 1000)) / 1000);
                timeLeftDisplay.textContent = `Time Left: ${minutes}m ${seconds}s`;
            } else {
                clearInterval(timeLeftInterval);
                timeLeftDisplay.textContent = 'Time Left: 0m 0s';
            }
        }, 1000);

        beersLeftDisplay.textContent = `Beers Left: ${beerCount}`;
    });
});
