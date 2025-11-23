// 🦷⚡ MADENTA: BROFORCE – THE TOOTH CARTEL SAGA
// © 2076 ehf | Built with Phaser 3

//═══════════════════════════════════════════════════════════════════════════
// HERO DEFINITIONS
//═══════════════════════════════════════════════════════════════════════════

const HEROES = {
    jawbreaker: {
        name: 'JAWBREAKER FARKAS',
        displayName: 'DR. FARKAS',
        color: 0x00ff88,
        health: 100,
        speed: 220,
        jumpPower: 450,
        primaryWeapon: 'laser',
        primaryDamage: 15,
        primaryCooldown: 300,
        ultimate: 'fullArchPurge',
        special: 'laughingGas',
        passive: 'calmAura'
    },
    gabriella: {
        name: 'BRACKET QUEEN',
        displayName: 'GABRIELLA',
        color: 0xff69b4,
        health: 90,
        speed: 200,
        jumpPower: 420,
        primaryWeapon: 'whip',
        primaryDamage: 12,
        primaryCooldown: 250,
        ultimate: 'perfectAlignment',
        special: 'orthodonticWhip',
        passive: 'smileBuffAura'
    },
    ekaterina: {
        name: 'LASER KAT',
        displayName: 'EKATERINA',
        color: 0x00ffff,
        health: 80,
        speed: 180,
        jumpPower: 400,
        primaryWeapon: 'sniper',
        primaryDamage: 30,
        primaryCooldown: 800,
        ultimate: 'periLaserStorm',
        special: 'precisionStrike',
        passive: 'eagleEye'
    },
    fruzsina: {
        name: 'IMPLANT ANGEL',
        displayName: 'FRUZSINA',
        color: 0xffd700,
        health: 110,
        speed: 190,
        jumpPower: 400,
        primaryWeapon: 'implant',
        primaryDamage: 10,
        primaryCooldown: 400,
        ultimate: 'titaniumBridge',
        special: 'healWave',
        passive: 'regenAura'
    },
    petra: {
        name: 'SMILESMITH',
        displayName: 'PETRA',
        color: 0xffffff,
        health: 85,
        speed: 210,
        jumpPower: 430,
        primaryWeapon: 'composite',
        primaryDamage: 18,
        primaryCooldown: 350,
        ultimate: 'whiteningFlash',
        special: 'compositeBlast',
        passive: 'confidenceBoost'
    },
    flora: {
        name: 'FLOWMASTER',
        displayName: 'FLÓRA',
        color: 0x90ee90,
        health: 95,
        speed: 200,
        jumpPower: 410,
        primaryWeapon: 'clipboard',
        primaryDamage: 8,
        primaryCooldown: 200,
        ultimate: 'perfectWorkflow',
        special: 'clipboardShield',
        passive: 'efficiencyAura'
    },
    gunnar: {
        name: 'GATEKEEPER',
        displayName: 'GUNNAR',
        color: 0x9370db,
        health: 100,
        speed: 230,
        jumpPower: 460,
        primaryWeapon: 'drill',
        primaryDamage: 20,
        primaryCooldown: 400,
        ultimate: 'portalStorm',
        special: 'teamTeleport',
        passive: 'spatialAwareness'
    }
};

//═══════════════════════════════════════════════════════════════════════════
// BOOT SCENE - Asset Loading
//═══════════════════════════════════════════════════════════════════════════

class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        this.createPlaceholderAssets();
    }

    createPlaceholderAssets() {
        // Hero sprites (32x32 for each hero)
        Object.keys(HEROES).forEach(heroKey => {
            const hero = HEROES[heroKey];
            const graphics = this.add.graphics();
            graphics.fillStyle(hero.color, 1);
            graphics.fillRect(0, 0, 32, 32);
            graphics.fillStyle(0xffffff, 1);
            graphics.fillCircle(16, 12, 5);
            graphics.generateTexture(`hero-${heroKey}`, 32, 32);
            graphics.destroy();
        });

        // Weapon projectiles
        this.createProjectile('laser-beam', 0xffffff, 64, 8);
        this.createProjectile('whip-strike', 0xff69b4, 48, 12);
        this.createProjectile('sniper-shot', 0x00ffff, 80, 4);
        this.createProjectile('implant-proj', 0xffd700, 24, 24);
        this.createProjectile('composite-blob', 0xffffff, 32, 32);
        this.createProjectile('clipboard-page', 0x90ee90, 40, 30);
        this.createProjectile('drill-bit', 0x9370db, 32, 16);

        // Special effects
        this.createEffect('gas-cloud', 0xffff00, 64, 64);
        this.createEffect('ultimate-flash', 0xffffff, 128, 128);
        this.createEffect('heal-wave', 0x00ff00, 96, 96);

        // Enemy sprites
        this.createEnemy('carius', 0x8b4513);
        this.createEnemy('bactus', 0x654321);
        this.createEnemy('fairy-villain', 0xff1493);
        this.createEnemy('fraududent', 0x4169e1);
        this.createEnemy('bacteria', 0x228b22);

        // Environment
        this.createPlatform();
    }

    createProjectile(name, color, width, height) {
        const g = this.add.graphics();
        g.fillStyle(color, 0.9);
        g.fillRect(0, 0, width, height);
        g.fillStyle(0xffffff, 0.5);
        g.fillRect(0, height/3, width, height/3);
        g.generateTexture(name, width, height);
        g.destroy();
    }

    createEffect(name, color, size, size2) {
        const g = this.add.graphics();
        g.fillStyle(color, 0.5);
        g.fillCircle(size/2, (size2||size)/2, size/2);
        g.generateTexture(name, size, size2||size);
        g.destroy();
    }

    createEnemy(name, color) {
        const g = this.add.graphics();
        g.fillStyle(color, 1);
        g.fillCircle(16, 16, 14);
        g.fillStyle(0xff0000, 1);
        g.fillRect(8, 12, 4, 4);
        g.fillRect(20, 12, 4, 4);
        g.generateTexture(name, 32, 32);
        g.destroy();
    }

    createPlatform() {
        const g = this.add.graphics();
        g.fillStyle(0x444444, 1);
        g.fillRect(0, 0, 128, 32);
        g.fillStyle(0x555555, 1);
        g.fillRect(0, 0, 128, 8);
        g.generateTexture('platform', 128, 32);
        g.destroy();
    }

    create() {
        this.scene.start('MenuScene');
    }
}

//═══════════════════════════════════════════════════════════════════════════
// MENU SCENE
//═══════════════════════════════════════════════════════════════════════════

class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // Title
        this.add.text(centerX, centerY - 150, 'MADENTA', {
            fontSize: '64px',
            fontFamily: '"Press Start 2P", monospace',
            fill: '#00ff88',
            align: 'center'
        }).setOrigin(0.5);

        this.add.text(centerX, centerY - 80, 'BROFORCE', {
            fontSize: '48px',
            fontFamily: '"Press Start 2P", monospace',
            fill: '#ff1493',
            align: 'center'
        }).setOrigin(0.5);

        // Subtitle
        this.add.text(centerX, centerY - 20, 'The Tooth Cartel Saga', {
            fontSize: '14px',
            fontFamily: '"Press Start 2P", monospace',
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        // Start button
        const startText = this.add.text(centerX, centerY + 50, 'PRESS SPACE TO START', {
            fontSize: '16px',
            fontFamily: '"Press Start 2P", monospace',
            fill: '#ffff00'
        }).setOrigin(0.5);

        // Credits
        this.add.text(centerX, centerY + 120, '© 2076 ehf | Starring Dr. Dávid Farkas', {
            fontSize: '10px',
            fontFamily: '"Press Start 2P", monospace',
            fill: '#888888',
            align: 'center'
        }).setOrigin(0.5);

        // Blinking effect
        this.tweens.add({
            targets: startText,
            alpha: 0.3,
            duration: 800,
            yoyo: true,
            repeat: -1
        });

        // Start game on space
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('GameScene');
        });

        // Hide loading screen
        document.getElementById('loading').style.display = 'none';
    }
}

//═══════════════════════════════════════════════════════════════════════════
// MAIN GAME SCENE
//═══════════════════════════════════════════════════════════════════════════

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.currentHero = 'jawbreaker';
        this.hero = null;
        this.enemies = null;
        this.platforms = null;
        this.projectiles = null;
        this.score = 0;
        this.level = 1;
        this.ultimateCharge = 0;
    }

    create() {
        // Create platforms
        this.platforms = this.physics.add.staticGroup();
        this.createLevel1Platforms();

        // Create projectile group
        this.projectiles = this.physics.add.group();

        // Create hero
        this.hero = new Hero(this, 100, 450, this.currentHero);
        
        // Create enemy group
        this.enemies = this.physics.add.group();
        
        // Spawn initial enemies
        this.spawnEnemy(650, 450, 'carius');
        this.spawnEnemy(700, 350, 'bacteria');
        this.time.delayedCall(2000, () => {
            this.spawnEnemy(600, 400, 'bactus');
        });

        // Collisions
        this.physics.add.collider(this.hero.sprite, this.platforms);
        this.physics.add.collider(this.enemies, this.platforms);
        this.physics.add.overlap(this.hero.sprite, this.enemies, this.heroHitEnemy, null, this);
        this.physics.add.overlap(this.projectiles, this.enemies, this.projectileHitEnemy, null, this);

        // Controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = {
            shoot: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
            ultimate: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X),
            special: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C),
            hero1: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE),
            hero2: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO),
            hero3: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE),
            hero4: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR),
            hero5: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE),
            hero6: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SIX),
            hero7: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SEVEN)
        };

        // Enemy spawn timer
        this.time.addEvent({
            delay: 4000,
            callback: this.spawnRandomEnemy,
            callbackScope: this,
            loop: true
        });

        // UI update
        this.updateUI();
    }

    createLevel1Platforms() {
        // Ground
        this.platforms.create(400, 568, 'platform').setScale(6, 1).refreshBody();
        // Platforms
        this.platforms.create(200, 450, 'platform').setScale(1.5, 1).refreshBody();
        this.platforms.create(600, 450, 'platform').setScale(1.5, 1).refreshBody();
        this.platforms.create(400, 350, 'platform').setScale(1, 1).refreshBody();
        this.platforms.create(100, 300, 'platform').setScale(1, 1).refreshBody();
        this.platforms.create(700, 300, 'platform').setScale(1, 1).refreshBody();
    }

    update() {
        if (!this.hero || !this.hero.sprite.active) return;

        this.hero.update(this.cursors, this.keys);
        
        // Hero switching
        this.handleHeroSwitch();
        
        // Update ultimate charge display
        const chargePercent = (this.ultimateCharge / 100) * 100;
        document.getElementById('ultimate-fill').style.width = chargePercent + '%';
    }

    handleHeroSwitch() {
        const heroKeys = Object.keys(HEROES);
        
        if (Phaser.Input.Keyboard.JustDown(this.keys.hero1)) this.switchHero(heroKeys[0]);
        if (Phaser.Input.Keyboard.JustDown(this.keys.hero2)) this.switchHero(heroKeys[1]);
        if (Phaser.Input.Keyboard.JustDown(this.keys.hero3)) this.switchHero(heroKeys[2]);
        if (Phaser.Input.Keyboard.JustDown(this.keys.hero4)) this.switchHero(heroKeys[3]);
        if (Phaser.Input.Keyboard.JustDown(this.keys.hero5)) this.switchHero(heroKeys[4]);
        if (Phaser.Input.Keyboard.JustDown(this.keys.hero6)) this.switchHero(heroKeys[5]);
        if (Phaser.Input.Keyboard.JustDown(this.keys.hero7)) this.switchHero(heroKeys[6]);
    }

    switchHero(heroKey) {
        if (heroKey === this.currentHero) return;
        
        const oldPos = { x: this.hero.sprite.x, y: this.hero.sprite.y };
        const oldHealth = this.hero.health;
        
        this.hero.sprite.destroy();
        this.currentHero = heroKey;
        this.hero = new Hero(this, oldPos.x, oldPos.y, heroKey);
        this.hero.health = oldHealth;
        
        this.physics.add.collider(this.hero.sprite, this.platforms);
        this.physics.add.overlap(this.hero.sprite, this.enemies, this.heroHitEnemy, null, this);
        
        this.updateUI();
        
        // Visual effect
        this.cameras.main.flash(200, 255, 255, 255, false);
    }

    spawnEnemy(x, y, type) {
        const enemy = this.enemies.create(x, y, type);
        enemy.setCollideWorldBounds(true);
        enemy.setBounce(0.2);
        enemy.enemyType = type;
        enemy.health = this.getEnemyHealth(type);
        enemy.damage = this.getEnemyDamage(type);
        
        // Simple AI - move toward hero
        enemy.aiTimer = this.time.addEvent({
            delay: 100,
            callback: () => {
                if (!enemy.active || !this.hero || !this.hero.sprite.active) return;
                
                const direction = this.hero.sprite.x > enemy.x ? 1 : -1;
                const speed = type === 'bacteria' ? 40 : 60;
                enemy.setVelocityX(direction * speed);
                
                // Random jump
                if (enemy.body.touching.down && Math.random() < 0.02) {
                    enemy.setVelocityY(-300);
                }
            },
            loop: true
        });
    }

    getEnemyHealth(type) {
        const healthMap = {
            'bacteria': 10,
            'carius': 30,
            'bactus': 35,
            'fairy-villain': 50,
            'fraududent': 100
        };
        return healthMap[type] || 20;
    }

    getEnemyDamage(type) {
        const damageMap = {
            'bacteria': 5,
            'carius': 10,
            'bactus': 12,
            'fairy-villain': 15,
            'fraududent': 20
        };
        return damageMap[type] || 8;
    }

    spawnRandomEnemy() {
        const types = ['bacteria', 'carius', 'bactus'];
        const type = Phaser.Math.RND.pick(types);
        const x = Phaser.Math.Between(600, 750);
        const y = 300;
        this.spawnEnemy(x, y, type);
    }

    heroHitEnemy(heroSprite, enemy) {
        if (!this.hero) return;
        this.hero.takeDamage(enemy.damage);
        this.updateUI();
    }

    projectileHitEnemy(projectile, enemy) {
        this.damageEnemy(enemy, projectile.damage || 15);
        projectile.destroy();
    }

    damageEnemy(enemy, damage) {
        enemy.health -= damage;
        
        // Flash white
        enemy.setTint(0xffffff);
        this.time.delayedCall(100, () => {
            if (enemy.active) enemy.clearTint();
        });

        if (enemy.health <= 0) {
            this.enemyDeath(enemy);
        }
    }

    enemyDeath(enemy) {
        // Stop AI
        if (enemy.aiTimer) enemy.aiTimer.remove();
        
        // Particle explosion
        for (let i = 0; i < 10; i++) {
            const particle = this.add.circle(enemy.x, enemy.y, 3, 0x00ff88);
            this.tweens.add({
                targets: particle,
                x: enemy.x + Phaser.Math.Between(-50, 50),
                y: enemy.y + Phaser.Math.Between(-50, 50),
                alpha: 0,
                duration: 500,
                onComplete: () => particle.destroy()
            });
        }
        
        enemy.destroy();
        this.score += 100;
        this.ultimateCharge = Math.min(100, this.ultimateCharge + 15);
        this.updateUI();
    }

    fireUltimate() {
        const heroData = HEROES[this.currentHero];
        
        if (this.ultimateCharge < 100) {
            console.log('Ultimate not charged');
            return;
        }
        
        this.ultimateCharge = 0;
        
        // Execute ultimate based on hero
        switch(heroData.ultimate) {
            case 'fullArchPurge':
                this.ultimateFullArchPurge();
                break;
            case 'perfectAlignment':
                this.ultimatePerfectAlignment();
                break;
            case 'periLaserStorm':
                this.ultimatePeriLaserStorm();
                break;
            case 'titaniumBridge':
                this.ultimateTitaniumBridge();
                break;
            case 'whiteningFlash':
                this.ultimateWhiteningFlash();
                break;
            case 'perfectWorkflow':
                this.ultimatePerfectWorkflow();
                break;
            case 'portalStorm':
                this.ultimatePortalStorm();
                break;
        }
        
        this.updateUI();
    }

    ultimateFullArchPurge() {
        // Screen flash
        this.cameras.main.flash(500, 255, 255, 255);
        
        // Massive laser beam
        const beam = this.add.rectangle(
            this.hero.sprite.x,
            this.hero.sprite.y,
            1000,
            100,
            0xffffff,
            0.8
        );
        beam.setOrigin(0, 0.5);
        
        // Destroy all enemies
        this.enemies.children.entries.forEach(enemy => {
            if (enemy.active) {
                this.damageEnemy(enemy, 999);
            }
        });
        
        this.time.delayedCall(500, () => beam.destroy());
    }

    ultimatePerfectAlignment() {
        // Wave effect
        const wave = this.add.circle(this.hero.sprite.x, this.hero.sprite.y, 10, 0xff69b4, 0.5);
        this.tweens.add({
            targets: wave,
            radius: 400,
            alpha: 0,
            duration: 1000,
            onComplete: () => wave.destroy()
        });
        
        // Stun all enemies
        this.enemies.children.entries.forEach(enemy => {
            if (enemy.active) {
                enemy.setVelocity(0, 0);
                enemy.setTint(0xff69b4);
                this.time.delayedCall(2000, () => {
                    if (enemy.active) enemy.clearTint();
                });
            }
        });
    }

    ultimatePeriLaserStorm() {
        // Multiple laser strikes
        for (let i = 0; i < 10; i++) {
            this.time.delayedCall(i * 100, () => {
                const x = Phaser.Math.Between(100, 700);
                const laser = this.add.rectangle(x, 0, 5, 600, 0x00ffff, 0.8);
                
                this.enemies.children.entries.forEach(enemy => {
                    if (enemy.active && Math.abs(enemy.x - x) < 30) {
                        this.damageEnemy(enemy, 40);
                    }
                });
                
                this.time.delayedCall(200, () => laser.destroy());
            });
        }
    }

    ultimateTitaniumBridge() {
        // Heal effect
        if (this.hero) {
            this.hero.health = Math.min(100, this.hero.health + 50);
            this.updateUI();
        }
        
        const healCircle = this.add.circle(
            this.hero.sprite.x,
            this.hero.sprite.y,
            50,
            0xffd700,
            0.5
        );
        this.tweens.add({
            targets: healCircle,
            radius: 150,
            alpha: 0,
            duration: 800,
            onComplete: () => healCircle.destroy()
        });
    }

    ultimateWhiteningFlash() {
        // Blind all enemies
        this.cameras.main.flash(1000, 255, 255, 255);
        
        this.enemies.children.entries.forEach(enemy => {
            if (enemy.active) {
                enemy.setVelocity(
                    Phaser.Math.Between(-200, 200),
                    -300
                );
                this.damageEnemy(enemy, 25);
            }
        });
    }

    ultimatePerfectWorkflow() {
        // Slow time effect
        this.physics.world.timeScale = 2;
        this.time.delayedCall(3000, () => {
            this.physics.world.timeScale = 1;
        });
    }

    ultimatePortalStorm() {
        // Teleport enemies randomly
        this.enemies.children.entries.forEach(enemy => {
            if (enemy.active) {
                enemy.x = Phaser.Math.Between(100, 700);
                enemy.y = Phaser.Math.Between(200, 400);
                this.damageEnemy(enemy, 30);
            }
        });
    }

    updateUI() {
        const heroData = HEROES[this.currentHero];
        document.getElementById('hero-name').textContent = heroData.name;
        document.getElementById('health').textContent = this.hero ? this.hero.health : 0;
        document.getElementById('score').textContent = this.score;
        document.getElementById('level').textContent = this.level;
        document.getElementById('portrait-name').innerHTML = heroData.displayName.replace(' ', '<br>');
    }
}

//═══════════════════════════════════════════════════════════════════════════
// HERO CLASS
//═══════════════════════════════════════════════════════════════════════════

class Hero {
    constructor(scene, x, y, heroKey) {
        this.scene = scene;
        this.heroKey = heroKey;
        this.data = HEROES[heroKey];
        
        this.sprite = scene.physics.add.sprite(x, y, `hero-${heroKey}`);
        this.sprite.setCollideWorldBounds(true);
        this.sprite.setBounce(0.1);
        
        this.health = this.data.health;
        this.speed = this.data.speed;
        this.jumpPower = this.data.jumpPower;
        
        this.canShoot = true;
        this.shootCooldown = this.data.primaryCooldown;
        this.specialCooldown = 2000;
        this.canUseSpecial = true;
    }

    update(cursors, keys) {
        if (!this.sprite.active) return;

        // Movement
        if (cursors.left.isDown) {
            this.sprite.setVelocityX(-this.speed);
            this.sprite.flipX = true;
        } else if (cursors.right.isDown) {
            this.sprite.setVelocityX(this.speed);
            this.sprite.flipX = false;
        } else {
            this.sprite.setVelocityX(0);
        }

        // Jump
        if (cursors.up.isDown && this.sprite.body.touching.down) {
            this.sprite.setVelocityY(-this.jumpPower);
        }

        // Shoot
        if (Phaser.Input.Keyboard.JustDown(keys.shoot) && this.canShoot) {
            this.shoot();
        }

        // Ultimate
        if (Phaser.Input.Keyboard.JustDown(keys.ultimate)) {
            this.scene.fireUltimate();
        }

        // Special
        if (Phaser.Input.Keyboard.JustDown(keys.special) && this.canUseSpecial) {
            this.useSpecial();
        }
    }

    shoot() {
        this.canShoot = false;
        
        const direction = this.sprite.flipX ? -1 : 1;
        const offsetX = direction * 32;
        
        const projectile = this.scene.projectiles.create(
            this.sprite.x + offsetX,
            this.sprite.y,
            this.getProjectileTexture()
        );
        
        projectile.setVelocityX(direction * 600);
        projectile.damage = this.data.primaryDamage;
        projectile.setTint(this.data.color);
        
        // Auto-destroy after 2 seconds
        this.scene.time.delayedCall(2000, () => {
            if (projectile.active) projectile.destroy();
        });

        // Reset cooldown
        this.scene.time.delayedCall(this.shootCooldown, () => {
            this.canShoot = true;
        });
    }

    getProjectileTexture() {
        const weaponMap = {
            'laser': 'laser-beam',
            'whip': 'whip-strike',
            'sniper': 'sniper-shot',
            'implant': 'implant-proj',
            'composite': 'composite-blob',
            'clipboard': 'clipboard-page',
            'drill': 'drill-bit'
        };
        return weaponMap[this.data.primaryWeapon] || 'laser-beam';
    }

    useSpecial() {
        this.canUseSpecial = false;
        
        switch(this.data.special) {
            case 'laughingGas':
                this.specialLaughingGas();
                break;
            case 'orthodonticWhip':
                this.specialOrthodonticWhip();
                break;
            case 'precisionStrike':
                this.specialPrecisionStrike();
                break;
            case 'healWave':
                this.specialHealWave();
                break;
            case 'compositeBlast':
                this.specialCompositeBlast();
                break;
            case 'clipboardShield':
                this.specialClipboardShield();
                break;
            case 'teamTeleport':
                this.specialTeamTeleport();
                break;
        }
        
        this.scene.time.delayedCall(this.specialCooldown, () => {
            this.canUseSpecial = true;
        });
    }

    specialLaughingGas() {
        const gas = this.scene.add.sprite(this.sprite.x, this.sprite.y, 'gas-cloud');
        gas.setScale(2);
        gas.setAlpha(0.6);
        gas.setTint(0xffff00);
        
        this.scene.tweens.add({
            targets: gas,
            scaleX: 5,
            scaleY: 5,
            alpha: 0,
            duration: 2000,
            onComplete: () => gas.destroy()
        });
        
        // Confuse enemies
        this.scene.enemies.children.entries.forEach(enemy => {
            if (enemy.active && Phaser.Math.Distance.Between(
                this.sprite.x, this.sprite.y, enemy.x, enemy.y
            ) < 200) {
                enemy.setTint(0xffff00);
                enemy.setVelocity(
                    Phaser.Math.Between(-150, 150),
                    Phaser.Math.Between(-200, -100)
                );
                this.scene.time.delayedCall(2000, () => {
                    if (enemy.active) enemy.clearTint();
                });
            }
        });
    }

    specialOrthodonticWhip() {
        const whip = this.scene.add.rectangle(
            this.sprite.x + (this.sprite.flipX ? -100 : 100),
            this.sprite.y,
            150,
            20,
            0xff69b4,
            0.7
        );
        
        this.scene.enemies.children.entries.forEach(enemy => {
            if (enemy.active && Phaser.Math.Distance.Between(
                whip.x, whip.y, enemy.x, enemy.y
            ) < 100) {
                this.scene.damageEnemy(enemy, 20);
                enemy.setVelocityX((this.sprite.flipX ? -1 : 1) * 400);
            }
        });
        
        this.scene.time.delayedCall(300, () => whip.destroy());
    }

    specialPrecisionStrike() {
        // Find closest enemy
        let closestEnemy = null;
        let minDist = Infinity;
        
        this.scene.enemies.children.entries.forEach(enemy => {
            if (enemy.active) {
                const dist = Phaser.Math.Distance.Between(
                    this.sprite.x, this.sprite.y, enemy.x, enemy.y
                );
                if (dist < minDist) {
                    minDist = dist;
                    closestEnemy = enemy;
                }
            }
        });
        
        if (closestEnemy) {
            const laser = this.scene.add.line(
                0, 0,
                this.sprite.x, this.sprite.y,
                closestEnemy.x, closestEnemy.y,
                0x00ffff, 1
            );
            laser.setLineWidth(3);
            
            this.scene.damageEnemy(closestEnemy, 50);
            this.scene.time.delayedCall(200, () => laser.destroy());
        }
    }

    specialHealWave() {
        this.health = Math.min(this.data.health, this.health + 30);
        this.scene.updateUI();
        
        const heal = this.scene.add.circle(
            this.sprite.x, this.sprite.y, 30, 0x00ff00, 0.5
        );
        this.scene.tweens.add({
            targets: heal,
            radius: 100,
            alpha: 0,
            duration: 600,
            onComplete: () => heal.destroy()
        });
    }

    specialCompositeBlast() {
        for (let i = 0; i < 5; i++) {
            const angle = (i - 2) * 0.3;
            const projectile = this.scene.projectiles.create(
                this.sprite.x,
                this.sprite.y,
                'composite-blob'
            );
            projectile.setVelocity(
                Math.cos(angle) * 400 * (this.sprite.flipX ? -1 : 1),
                Math.sin(angle) * 400
            );
            projectile.damage = 12;
            projectile.setTint(0xffffff);
            
            this.scene.time.delayedCall(1500, () => {
                if (projectile.active) projectile.destroy();
            });
        }
    }

    specialClipboardShield() {
        this.health = Math.min(this.data.health, this.health + 20);
        this.scene.updateUI();
        
        const shield = this.scene.add.circle(
            this.sprite.x, this.sprite.y, 40, 0x90ee90, 0.4
        );
        shield.setStrokeStyle(3, 0x90ee90);
        
        this.scene.time.delayedCall(3000, () => shield.destroy());
    }

    specialTeamTeleport() {
        // Teleport to random safe location
        const newX = Phaser.Math.Between(150, 650);
        const newY = 300;
        
        this.sprite.x = newX;
        this.sprite.y = newY;
        
        // Portal effect
        const portal1 = this.scene.add.circle(
            this.sprite.x, this.sprite.y, 50, 0x9370db, 0.6
        );
        this.scene.tweens.add({
            targets: portal1,
            alpha: 0,
            duration: 500,
            onComplete: () => portal1.destroy()
        });
    }

    takeDamage(amount) {
        this.health -= amount;
        this.health = Math.max(0, this.health);
        
        // Flash red
        this.sprite.setTint(0xff0000);
        this.scene.time.delayedCall(200, () => {
            if (this.sprite.active) this.sprite.clearTint();
        });

        if (this.health <= 0) {
            this.die();
        }
    }

    die() {
        this.sprite.setActive(false);
        this.sprite.setVisible(false);
        
        // Game over
        const centerX = this.scene.cameras.main.width / 2;
        const centerY = this.scene.cameras.main.height / 2;
        
        const bg = this.scene.add.rectangle(centerX, centerY, 600, 300, 0x000000, 0.8);
        
        this.scene.add.text(centerX, centerY - 50, 'GAME OVER', {
            fontSize: '48px',
            fontFamily: '"Press Start 2P", monospace',
            fill: '#ff0000',
            align: 'center'
        }).setOrigin(0.5);

        this.scene.add.text(centerX, centerY + 20, `FINAL SCORE: ${this.scene.score}`, {
            fontSize: '20px',
            fontFamily: '"Press Start 2P", monospace',
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        this.scene.add.text(centerX, centerY + 70, 'PRESS R TO RESTART', {
            fontSize: '16px',
            fontFamily: '"Press Start 2P", monospace',
            fill: '#ffff00',
            align: 'center'
        }).setOrigin(0.5);

        this.scene.input.keyboard.once('keydown-R', () => {
            this.scene.scene.restart();
        });
    }
}

//═══════════════════════════════════════════════════════════════════════════
// CUTSCENE SCENE (Placeholder for future cutscenes)
//═══════════════════════════════════════════════════════════════════════════

class CutsceneScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CutsceneScene' });
    }

    create(data) {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.add.rectangle(0, 0, 800, 600, 0x000000).setOrigin(0);
        
        this.add.text(centerX, centerY - 100, 'CUTSCENE', {
            fontSize: '48px',
            fontFamily: '"Press Start 2P", monospace',
            fill: '#00ff88'
        }).setOrigin(0.5);

        this.add.text(centerX, centerY, data.title || 'The Tooth Pipeline Reveal', {
            fontSize: '16px',
            fontFamily: '"Press Start 2P", monospace',
            fill: '#ffffff',
            align: 'center',
            wordWrap: { width: 600 }
        }).setOrigin(0.5);

        this.add.text(centerX, centerY + 100, 'PRESS SPACE TO CONTINUE', {
            fontSize: '14px',
            fontFamily: '"Press Start 2P", monospace',
            fill: '#ffff00'
        }).setOrigin(0.5);

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('GameScene');
        });
    }
}

//═══════════════════════════════════════════════════════════════════════════
// GAME CONFIGURATION & INITIALIZATION
//═══════════════════════════════════════════════════════════════════════════

const GAME_CONFIG = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#1a1a2e',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    },
    scene: [BootScene, MenuScene, GameScene, CutsceneScene]
};

const game = new Phaser.Game(GAME_CONFIG);

//═══════════════════════════════════════════════════════════════════════════
// GAME INITIALIZATION MESSAGE
//═══════════════════════════════════════════════════════════════════════════

console.log(`
🦷⚡ MADENTA: BROFORCE – THE TOOTH CARTEL SAGA
═══════════════════════════════════════════════════════════════════════════
© 2076 ehf | Starring Dr. Dávid Farkas

CONTROLS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ARROW KEYS   - Move & Jump
Z            - Primary Weapon
X            - Ultimate Ability (when charged)
C            - Special Ability
1-7          - Switch Hero
R            - Restart (after game over)

PLAYABLE HEROES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1 - Jawbreaker Farkas  (Dr. Dávíd) - Full Arch Purge
2 - Bracket Queen      (Gabriella)  - Perfect Alignment
3 - Laser Kat          (Ekaterina)  - Peri-Laser Storm
4 - Implant Angel      (Fruzsina)   - Titanium Bridge
5 - Smilesmith         (Petra)      - Whitening Flash
6 - Flowmaster         (Flóra)      - Perfect Workflow
7 - Gatekeeper         (Gunnar)     - Portal Storm

"When The Tooth Cartel strikes... Madenta strikes back."
═══════════════════════════════════════════════════════════════════════════
`);
