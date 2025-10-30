// Acrobatic Game - Main Game Logic
// Compatible with both Web and Mobile

// Game Configuration
const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game-container',
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    backgroundColor: '#87CEEB'
};

// Game Variables
let player;
let platforms;
let cursors;
let score = 0;
let level = 1;
let scoreText;
let levelText;
let gameStarted = false;

// Combo System (inspired by Tower Game)
let combo = 0;
let perfectStreak = 0;
let comboTimeout = null;

// Mobile Controls
let mobileControls = {
    left: false,
    right: false,
    jump: false,
    trick: false
};

// Touch buttons
let btnLeft, btnRight, btnJump, btnTrick;

// Player states
let playerState = {
    canDoubleJump: true,
    isPerformingTrick: false,
    trickRotation: 0,
    velocityMultiplier: 1,
    consecutiveTricks: 0
};

// Initialize Phaser Game
const game = new Phaser.Game(config);

function preload() {
    // Hide loading text
    const loadingEl = document.getElementById('loading');
    if (loadingEl) {
        loadingEl.style.display = 'none';
    }

    // Graphics will be created programmatically
}

function create() {
    // Setup mobile touch controls
    setupMobileControls();

    // Create platforms
    platforms = this.physics.add.staticGroup();

    // Ground
    const ground = this.add.rectangle(
        this.cameras.main.centerX,
        this.cameras.main.height - 20,
        this.cameras.main.width,
        40,
        0x00aa00
    );
    this.physics.add.existing(ground, true);
    platforms.add(ground);

    // Create multiple platforms
    createPlatforms.call(this);

    // Create player
    player = this.add.rectangle(100, 100, 30, 40, 0xff0000);
    this.physics.add.existing(player);
    player.body.setCollideWorldBounds(true);
    player.body.setBounce(0.1);

    // Collider between player and platforms
    this.physics.add.collider(player, platforms, onPlatformLand, null, this);

    // Keyboard controls
    cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.on('keydown-SPACE', performTrick, this);

    // Score display
    updateScoreDisplay();

    gameStarted = true;

    // Resize handler
    this.scale.on('resize', handleResize, this);
}

function update() {
    if (!gameStarted || !player) return;

    // Handle input (keyboard or touch)
    handleInput();

    // Update player rotation during tricks
    if (playerState.isPerformingTrick) {
        playerState.trickRotation += 15;
        player.setRotation(Phaser.Math.DegToRad(playerState.trickRotation));

        // End trick after full rotation
        if (playerState.trickRotation >= 360) {
            completeTrick();
        }
    }

    // Reset rotation when on ground and not tricking
    if (player.body.touching.down && !playerState.isPerformingTrick) {
        player.setRotation(0);
        playerState.trickRotation = 0;
    }

    // Check if player fell off the screen
    if (player.y > this.cameras.main.height + 100) {
        resetPlayer.call(this);
    }
}

function handleInput() {
    // Check keyboard input
    const leftPressed = cursors.left.isDown || mobileControls.left;
    const rightPressed = cursors.right.isDown || mobileControls.right;
    const jumpPressed = cursors.up.isDown || mobileControls.jump;

    // Horizontal movement
    if (leftPressed) {
        player.body.setVelocityX(-250 * playerState.velocityMultiplier);

        // Flip player (visual feedback)
        player.flipX = true;
    } else if (rightPressed) {
        player.body.setVelocityX(250 * playerState.velocityMultiplier);

        player.flipX = false;
    } else {
        // Gradual slowdown
        player.body.setVelocityX(player.body.velocity.x * 0.85);
    }

    // Jump logic
    if (jumpPressed) {
        if (player.body.touching.down) {
            // Normal jump
            player.body.setVelocityY(-450);
            playerState.canDoubleJump = true;
            vibrate('light');
            addScore(5);
        } else if (playerState.canDoubleJump && !player.body.touching.down) {
            // Double jump
            player.body.setVelocityY(-400);
            playerState.canDoubleJump = false;
            vibrate('light');
            addScore(10);
        }
    }

    // Trick input
    if (mobileControls.trick && !playerState.isPerformingTrick && !player.body.touching.down) {
        performTrick();
        mobileControls.trick = false; // Reset to prevent continuous tricks
    }
}

function performTrick() {
    if (!playerState.isPerformingTrick && !player.body.touching.down) {
        playerState.isPerformingTrick = true;
        playerState.trickRotation = 0;
        playerState.velocityMultiplier = 1.3;

        // Add some upward velocity for style
        if (player.body.velocity.y > 0) {
            player.body.setVelocityY(player.body.velocity.y * 0.7);
        }
    }
}

function completeTrick() {
    playerState.isPerformingTrick = false;
    playerState.trickRotation = 0;
    playerState.velocityMultiplier = 1;
    player.setRotation(0);

    // Increment combo and perfect streak
    combo++;
    perfectStreak++;
    playerState.consecutiveTricks++;

    // Vibration feedback (web & mobile)
    vibrate('medium');

    // Calculate points with combo multiplier
    const basePoints = 50;
    const comboMultiplier = 1 + (combo * 0.2);
    const points = Math.floor(basePoints * comboMultiplier * (1 + perfectStreak * 0.1));

    addScore(points);

    // Show combo indicator
    if (combo > 1) {
        showComboIndicator(combo, points);
    }

    // Update streak display
    updateStreakDisplay();

    // Reset combo after 3 seconds of inactivity
    resetComboTimer();

    // Check for level up
    if (score > level * 300) {
        levelUp.call(this);
    }
}

function onPlatformLand(player, platform) {
    // Reset double jump when landing
    playerState.canDoubleJump = true;

    // If landed while performing trick, fail the trick
    if (playerState.isPerformingTrick) {
        playerState.isPerformingTrick = false;
        playerState.trickRotation = 0;
        playerState.velocityMultiplier = 1;
        player.setRotation(0);
    }
}

function createPlatforms() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Create platforms at various heights
    const platformData = [
        { x: width * 0.2, y: height * 0.7, w: 150, h: 20 },
        { x: width * 0.5, y: height * 0.5, w: 120, h: 20 },
        { x: width * 0.8, y: height * 0.4, w: 140, h: 20 },
        { x: width * 0.3, y: height * 0.3, w: 100, h: 20 },
        { x: width * 0.7, y: height * 0.6, w: 130, h: 20 }
    ];

    platformData.forEach(data => {
        const platform = this.add.rectangle(data.x, data.y, data.w, data.h, 0x8B4513);
        this.physics.add.existing(platform, true);
        platforms.add(platform);
    });
}

function levelUp() {
    level++;
    updateScoreDisplay();

    // Increase game difficulty
    // Could add more platforms, increase speed, etc.

    // Visual feedback
    this.cameras.main.flash(500, 100, 255, 100);
}

function addScore(points) {
    score += points;
    updateScoreDisplay();
}

function updateScoreDisplay() {
    // Update mobile display
    const scoreDisplay = document.getElementById('score-display');
    const levelDisplay = document.getElementById('level-display');

    if (scoreDisplay) scoreDisplay.textContent = `Puntos: ${score}`;
    if (levelDisplay) levelDisplay.textContent = `Nivel: ${level}`;

    // Update desktop display
    const desktopScore = document.getElementById('desktop-score');
    const desktopLevel = document.getElementById('desktop-level');

    if (desktopScore) desktopScore.textContent = `Puntos: ${score}`;
    if (desktopLevel) desktopLevel.textContent = `Nivel: ${level}`;
}

function resetPlayer() {
    if (player) {
        player.setPosition(100, 100);
        player.setVelocity(0, 0);
        player.setRotation(0);
        playerState.isPerformingTrick = false;
        playerState.trickRotation = 0;
        playerState.canDoubleJump = true;

        // Reset combo on fall
        resetCombo();

        // Vibration for fall
        vibrate('heavy');

        // Penalty
        score = Math.max(0, score - 50);
        updateScoreDisplay();
    }
}

// Vibration System (Web Vibration API)
function vibrate(type) {
    if ('vibrate' in navigator) {
        switch(type) {
            case 'light':
                navigator.vibrate(10);
                break;
            case 'medium':
                navigator.vibrate(50);
                break;
            case 'heavy':
                navigator.vibrate([50, 30, 50]);
                break;
        }
    }
}

// Combo System Functions
function showComboIndicator(comboCount, points) {
    const comboEl = document.getElementById('combo-indicator');
    const comboText = document.getElementById('combo-text');
    const comboPoints = document.getElementById('combo-points');

    if (comboEl && comboText) {
        comboText.textContent = `${comboCount}x COMBO!`;
        if (comboPoints) {
            comboPoints.textContent = `+${points} pts`;
        }

        comboEl.classList.remove('combo-hidden');
        comboEl.classList.add('combo-show');

        // Hide after 1.5 seconds
        setTimeout(() => {
            comboEl.classList.remove('combo-show');
            comboEl.classList.add('combo-hidden');
        }, 1500);
    }
}

function updateStreakDisplay() {
    const streakEl = document.getElementById('streak-indicator');
    const streakCount = document.getElementById('streak-count');

    if (streakEl && streakCount) {
        if (perfectStreak > 0) {
            streakCount.textContent = perfectStreak;
            streakEl.classList.remove('streak-hidden');
            streakEl.classList.add('streak-show');
        } else {
            streakEl.classList.add('streak-hidden');
            streakEl.classList.remove('streak-show');
        }
    }
}

function resetCombo() {
    combo = 0;
    perfectStreak = 0;
    playerState.consecutiveTricks = 0;
    updateStreakDisplay();

    if (comboTimeout) {
        clearTimeout(comboTimeout);
        comboTimeout = null;
    }
}

function resetComboTimer() {
    if (comboTimeout) {
        clearTimeout(comboTimeout);
    }

    comboTimeout = setTimeout(() => {
        resetCombo();
    }, 3000); // Reset after 3 seconds of no tricks
}

function setupMobileControls() {
    // Get button elements
    btnLeft = document.getElementById('btn-left');
    btnRight = document.getElementById('btn-right');
    btnJump = document.getElementById('btn-jump');
    btnTrick = document.getElementById('btn-trick');

    // Left button
    if (btnLeft) {
        btnLeft.addEventListener('touchstart', (e) => {
            e.preventDefault();
            mobileControls.left = true;
        });

        btnLeft.addEventListener('touchend', (e) => {
            e.preventDefault();
            mobileControls.left = false;
        });

        btnLeft.addEventListener('touchcancel', (e) => {
            e.preventDefault();
            mobileControls.left = false;
        });
    }

    // Right button
    if (btnRight) {
        btnRight.addEventListener('touchstart', (e) => {
            e.preventDefault();
            mobileControls.right = true;
        });

        btnRight.addEventListener('touchend', (e) => {
            e.preventDefault();
            mobileControls.right = false;
        });

        btnRight.addEventListener('touchcancel', (e) => {
            e.preventDefault();
            mobileControls.right = false;
        });
    }

    // Jump button
    if (btnJump) {
        btnJump.addEventListener('touchstart', (e) => {
            e.preventDefault();
            mobileControls.jump = true;
        });

        btnJump.addEventListener('touchend', (e) => {
            e.preventDefault();
            mobileControls.jump = false;
        });

        btnJump.addEventListener('touchcancel', (e) => {
            e.preventDefault();
            mobileControls.jump = false;
        });
    }

    // Trick button
    if (btnTrick) {
        btnTrick.addEventListener('touchstart', (e) => {
            e.preventDefault();
            mobileControls.trick = true;
        });

        btnTrick.addEventListener('touchend', (e) => {
            e.preventDefault();
            mobileControls.trick = false;
        });

        btnTrick.addEventListener('touchcancel', (e) => {
            e.preventDefault();
            mobileControls.trick = false;
        });
    }
}

function handleResize(gameSize) {
    // Rebuild platforms on resize
    if (platforms) {
        platforms.clear(true, true);

        // Recreate ground
        const ground = this.add.rectangle(
            this.cameras.main.centerX,
            this.cameras.main.height - 20,
            this.cameras.main.width,
            40,
            0x00aa00
        );
        this.physics.add.existing(ground, true);
        platforms.add(ground);

        // Recreate platforms
        createPlatforms.call(this);

        // Re-add collider
        this.physics.add.collider(player, platforms, onPlatformLand, null, this);
    }
}

// Prevent default touch behaviors
document.addEventListener('touchmove', function(e) {
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
    }
}, { passive: false });

// Prevent context menu on long press
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Prevent bounce effect on iOS
document.body.addEventListener('touchmove', function(e) {
    e.preventDefault();
}, { passive: false });

console.log('Acrobatic Game loaded successfully!');
console.log('Web controls: Arrow keys to move, UP to jump, SPACE for tricks');
console.log('Mobile controls: Use on-screen buttons');
