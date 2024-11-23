class SlotMachine {
class SlotMachine {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.reels = [];
        this.symbols = ['cherry', 'lemon', 'grape', 'seven', 'bell', 'star'];
        this.symbolValues = {
            'cherry': 10,
            'lemon': 20,
            'grape': 30,
            'seven': 100,
            'bell': 50,
            'star': 75
        };
        
        this.isSpinning = false;
        this.score = 0;
        this.coins = 100;
        
        // 사운드 초기화
        this.sounds = {
            spin: new Audio('/sounds/spin.mp3'),
            win: new Audio('/sounds/win.mp3'),
            stop: new Audio('/sounds/stop.mp3')
        };

        this.loadTextures();
        this.initPhysics();
        this.init();
    }

    loadTextures() {
        const loader = new THREE.TextureLoader();
        this.textures = {};
        this.symbols.forEach(symbol => {
            this.textures[symbol] = loader.load(`/textures/${symbol}.png`);
        });
    }

    initPhysics() {
        this.world = new CANNON.World();
        this.world.gravity.set(0, -9.82, 0);
        this.world.broadphase = new CANNON.NaiveBroadphase();
        this.world.solver.iterations = 10;
    }

    init() {
        this.camera.position.z = 10;

        // 릴 생성
        for (let i = 0; i < 3; i++) {
            const reel = new THREE.Group();
            const reelBody = new CANNON.Body({
                mass: 1,
                shape: new CANNON.Box(new CANNON.Vec3(1, 1, 0.25))
            });
            
            for (let j = 0; j < 6; j++) {
                const geometry = new THREE.BoxGeometry(2, 2, 0.5);
                const material = new THREE.MeshPhongMaterial({ 
                    map: this.textures[this.symbols[j]],
                    specular: 0x333333,
                    shininess: 30
                });
                const symbol = new THREE.Mesh(geometry, material);
                symbol.position.y = j * 3;
                reel.add(symbol);
            }

            reel.position.x = (i - 1) * 3;
            this.reels.push({ 
                mesh: reel, 
                body: reelBody,
                currentSymbol: 0 
            });
            this.scene.add(reel);
        }

        // 조명 설정
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(0, 5, 10);
        this.scene.add(pointLight);

        this.animate();
        this.updateUI();
    }

    spin() {
        if (this.isSpinning || this.coins < 10) return;
        
        this.coins -= 10;
        this.updateUI();
        this.isSpinning = true;
        this.sounds.spin.play();

        const spinDurations = [2000, 2500, 3000];
        const finalSymbols = [];

        this.reels.forEach((reel, index) => {
            const rotations = 5 + Math.random() * 5;
            const duration = spinDurations[index];

            gsap.to(reel.mesh.rotation, {
                y: Math.PI * 2 * rotations,
                duration: duration / 1000,
                ease: "power1.out",
                onComplete: () => {
                    this.sounds.stop.play();
                    finalSymbols[index] = Math.floor(Math.random() * 6);
                    if (index === 2) {
                        this.isSpinning = false;
                        this.checkWin(finalSymbols);
                    }
                }
            });
        });
    }

    checkWin(symbols) {
        // 모든 심볼이 같은 경우
        if (symbols[0] === symbols[1] && symbols[1] === symbols[2]) {
            const symbolName = this.symbols[symbols[0]];
            const winAmount = this.symbolValues[symbolName] * 3;
            this.score += winAmount;
            this.coins += winAmount;
            this.sounds.win.play();
            
            // 승리 애니메이션
            this.reels.forEach(reel => {
                gsap.to(reel.mesh.scale, {
                    x: 1.2,
                    y: 1.2,
                    z: 1.2,
                    duration: 0.3,
                    yoyo: true,
                    repeat: 1
                });
            });
        }
        
        this.updateUI();
    }

    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('coins').textContent = this.coins;
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        // 물리 엔진 업데이트
        this.world.step(1/60);
        
        // 릴 업데이트
        this.reels.forEach(reel => {
            reel.mesh.position.copy(reel.body.position);
            reel.mesh.quaternion.copy(reel.body.quaternion);
        });

        this.renderer.render(this.scene, this.camera);
    }
}

const slotMachine = new SlotMachine();

document.getElementById('spinButton').addEventListener('click', () => {
    slotMachine.spin();
});

window.addEventListener('resize', () => {
    slotMachine.camera.aspect = window.innerWidth / window.innerHeight;
    slotMachine.camera.updateProjectionMatrix();
    slotMachine.renderer.setSize(window.innerWidth, window.innerHeight);
}); 