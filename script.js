let toilet = document.querySelector('.toilet-cost');
let scoreDisplay = document.getElementById('toilet-cost');
let currentScore = 0;
let fartSounds = [
    document.getElementById('fart-sound-1'),
    document.getElementById('fart-sound-2'),
    document.getElementById('fart-sound-3'),
    document.getElementById('fart-sound-4'),
    document.getElementById('fart-sound-5')
];

fartSounds.forEach(sound => sound.playbackRate = 1.5);

let currentFartSoundIndex = 0;


// Define upgrades
const upgrades = [
    {
        name: 'Skibidi Plunger',
        cost: 10000,
        increment: 1,
        periodic:true,
    },
    {
        name: 'Oh My Toilet',
        cost: 75000,
        increment: 2,
        periodic: true,
    },
    {
        name: 'Wet Shit',
        cost: 150000,
        increment: 5,
        periodic: true,
    },
    {
        name: 'Ass opener',
        cost: 5000000,
        increment: 7,
        periodic: true,
    }
];

let activeUpgrades = [];
let periodicUpgradeInterval = null;

// Initialize upgrades
function initializeUpgrades() {
    const upgradesContainer = document.getElementById('upgrades');
    upgrades.forEach((upgrade, index) => {
        const upgradeElement = document.createElement('div');
        upgradeElement.className = 'upgrade';
        upgradeElement.innerHTML = `
            <h4>${upgrade.name}</h4>
            <p>Cost: ${upgrade.cost}</p>
            <button id="upgrade-${index}" onclick="buyUpgrade(${index})">Buy</button>
        `;
        upgradesContainer.appendChild(upgradeElement);
    });
}

function incrementToilet() {
    currentScore += getCurrentIncrement();
    toilet.innerHTML = currentScore;
    scoreDisplay.innerHTML = currentScore;
    fartSounds[currentFartSoundIndex].play();
    currentFartSoundIndex = (currentFartSoundIndex + 1) % fartSounds.length;

}

function getCurrentIncrement() {
    return activeUpgrades.reduce((total, upgrade) => total + upgrade.increment, 1);
}

function buyUpgrade(index) {
    const upgrade = upgrades[index];
    if (currentScore >= upgrade.cost) {
        currentScore -= upgrade.cost;
        toilet.innerHTML = currentScore;
        scoreDisplay.innerHTML = currentScore;
        activeUpgrades.push(upgrade);
        document.getElementById(`upgrade-${index}`).disabled = true;
        if (upgrade.periodic && !periodicUpgradeInterval) {
            startPeriodicEffect();
        }
    }
}

function startPeriodicEffect() {
    periodicUpgradeInterval = setInterval(() => {
        incrementToilet();
    }, 500); // Update every 1000 milliseconds (1 second)
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault(); // Prevent default action (scrolling down)
        incrementToilet();
    }
});

// Initialize the game
initializeUpgrades();
