// Get elements
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const buttons = document.querySelector('.buttons');
const confirmation = document.getElementById('confirmation');
const confettiContainer = document.getElementById('confetti-container');
const emotionGif = document.getElementById('emotion-gif');
const happyVideo = document.getElementById('happy-video');
const happySound = document.getElementById('happy-sound');
const heading = document.querySelector('h1');
const jumpscare = document.getElementById('jumpscare');
const jumpscareSound = document.getElementById('jumpscare-sound');

// Counter for no button clicks
let noClickCount = 0;
const gifChangeThreshold = 3; // Change gif after 3 clicks
const jumpscareThreshold = 10; // Show jumpscare after 10 clicks

// Make the No button escape on click (for mobile compatibility)
noBtn.addEventListener('click', function() {
    // Increment click counter
    noClickCount++;
    
    // Change gif after threshold clicks
    if (noClickCount === gifChangeThreshold) {
        emotionGif.src = 'gif/gif2.gif';
    }
    
    // Show jumpscare after jumpscare threshold clicks
    if (noClickCount === jumpscareThreshold) {
        showJumpscare();
    }
    
    // Get viewport dimensions
    const viewportWidth = window.innerWidth - this.offsetWidth;
    const viewportHeight = window.innerHeight - this.offsetHeight;
    
    // Calculate random position
    const randomX = Math.floor(Math.random() * viewportWidth);
    const randomY = Math.floor(Math.random() * viewportHeight);
    
    // Apply new position
    this.style.position = 'absolute';
    this.style.left = randomX + 'px';
    this.style.top = randomY + 'px';
});

// Yes button click event
yesBtn.addEventListener('click', function() {
    // Hide buttons
    buttons.style.display = 'none';
    
    // Hide heading
    heading.style.display = 'none';
    
    // Hide gif and show video instead
    emotionGif.style.display = 'none';
    happyVideo.style.display = 'block';
    
    // Show confirmation message
    confirmation.style.display = 'block';
    
    // Show confetti/hearts
    confettiContainer.style.display = 'block';
    createHearts();
    
    // Play happy sound
    try {
        happySound.play();
    } catch (error) {
        console.log('Audio playback failed:', error);
    }
});

// Function to create falling hearts
function createHearts() {
    // Create 50 hearts
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.classList.add('falling-heart');
            
            // Random horizontal position
            const left = Math.random() * 100;
            heart.style.left = left + 'vw';
            
            // Random delay
            const delay = Math.random() * 2;
            heart.style.animationDelay = delay + 's';
            
            // Random size
            const size = Math.random() * 20 + 10;
            heart.style.fontSize = size + 'px';
            
            confettiContainer.appendChild(heart);
            
            // Remove heart after animation completes
            setTimeout(() => {
                heart.remove();
            }, 4000 + (delay * 1000));
        }, i * 100);
    }
}

// Function to show jumpscare
function showJumpscare() {
    // Display jumpscare
    jumpscare.style.display = 'flex';
    
    // Play jumpscare sound
    try {
        jumpscareSound.play();
    } catch (error) {
        console.log('Audio playback failed:', error);
    }
    
    // Hide jumpscare after 3 seconds
    setTimeout(() => {
        jumpscare.style.display = 'none';
        // Reset click counter so jumpscare can happen again after 10 more clicks
        noClickCount = 0;
    }, 3000);
}