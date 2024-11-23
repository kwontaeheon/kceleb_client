class SlotMachine {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.reels = [];
        this.symbols = ['cherry', 'lemon', 'grape', 'seven', 'bell', 'star'];
        this.reelWidth = 3; // 릴 간격
        this.faceAngle = Math.PI / 3; // 60도 (한 면의 각도)
        this.initialRotation = -this.faceAngle / 2; // 초기 회전 각도 (면이 평행하도록)
        this.rotationDirection = 1; // 회전 방향 (1: 아래 방향)
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
        
        this.sounds = {
            spin: new Audio('/slot/sounds/spin.mp3'),
            win: new Audio('/slot/sounds/win.mp3'),
            stop: new Audio('/slot/sounds/stop.mp3')
        };

        this.textureAtlas = null;  // 텍스처 아틀라스 저장용 변수 추가
    }

    async loadTextures() {
        const loader = new THREE.TextureLoader();
        this.textures = {};
        
        // 모든 텍스처 로딩을 기다림
        await Promise.all(this.symbols.map(symbol => {
            return new Promise((resolve) => {
                this.textures[symbol] = loader.load(`/slot/textures/${symbol}.png`, resolve);
            });
        }));

        // 텍스처 아틀라스 생성
        await this.createTextureAtlas();
    }

    async createTextureAtlas() {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 170;
        const ctx = canvas.getContext('2d');

        const symbolWidth = canvas.width / 6;

        // 모든 이미지를 캔버스에 그리기
        await Promise.all(this.symbols.map((symbol, index) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => {
                    ctx.drawImage(img, index * symbolWidth, 0, symbolWidth, canvas.height);
                    resolve();
                };
                img.src = `/slot/textures/${symbol}.png`;
            });
        }));

        // 텍스처 아틀라스 생성 및 저장
        this.textureAtlas = new THREE.CanvasTexture(canvas);
        this.textureAtlas.needsUpdate = true;
    }

    createHexagonalPrism() {
        const radius = 1;
        const height = 2;
        const segments = 6;
        
        const geometry = new THREE.CylinderGeometry(radius, radius, height, segments);
        
        // UV 매핑 수정
        const uvs = geometry.attributes.uv;
        for (let i = 0; i < uvs.count; i++) {
            const u = uvs.getX(i);
            const v = uvs.getY(i);
            
            // 옆면의 UV만 수정
            if (v === 0 || v === 1) {
                const faceIndex = Math.floor(u * 6);
                const normalizedU = (faceIndex + (u * 6 - faceIndex)) / 6;
                uvs.setXY(i, normalizedU, v);
            }
        }

        // 재질 생성
        const sideMaterial = new THREE.MeshPhongMaterial({
            map: this.textureAtlas,
            specular: 0x222222,     // 반사광 감소
            shininess: 10,          // 광택 감소
            emissive: 0x222222,     // 약간의 자체 발광 추가
            emissiveIntensity: 0.1  // 발광 강도
        });

        const capMaterial = new THREE.MeshPhongMaterial({
            color: 0x808080,
            specular: 0x222222,
            shininess: 10
        });

        // 재질 배열: [옆면, 윗면, 아랫면]
        const materials = [
            sideMaterial,
            capMaterial,
            capMaterial
        ];

        const prism = new THREE.Mesh(geometry, materials);
        prism.rotation.z = Math.PI / 2;
        prism.rotation.x = this.initialRotation;
        
        return prism;
    }

    async init() {
        await this.loadTextures();

        this.camera.position.z = 10;
        this.camera.position.y = 0;
        this.camera.rotation.x = 0;

        // 릴 생성
        for (let i = 0; i < 3; i++) {
            const prism = this.createHexagonalPrism();
            prism.position.x = (i - 1) * this.reelWidth;
            
            this.reels.push({ 
                mesh: prism,
                currentIndex: 0,
                targetRotation: this.initialRotation
            });
            this.scene.add(prism);
        }

        // 조명 설정 수정
        // 전체적인 은은한 조명
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        this.scene.add(ambientLight);

        // 전면 메인 조명
        const frontLight = new THREE.DirectionalLight(0xffffff, 0.5);
        frontLight.position.set(0, 0, 5);
        this.scene.add(frontLight);

        // 좌우 보조 조명
        const leftLight = new THREE.DirectionalLight(0xffffff, 0.3);
        leftLight.position.set(-5, 0, 3);
        this.scene.add(leftLight);

        const rightLight = new THREE.DirectionalLight(0xffffff, 0.3);
        rightLight.position.set(5, 0, 3);
        this.scene.add(rightLight);

        // 약간의 상단 조명
        const topLight = new THREE.DirectionalLight(0xffffff, 0.2);
        topLight.position.set(0, 5, 2);
        this.scene.add(topLight);

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
            // 회재 회전 각도
            const currentRotation = reel.mesh.rotation.x;
            
            // 회전 수 계산 (항상 양수로)
            const rotations = 4 + Math.random() * 2; // 4-6회전
            const randomSymbol = Math.floor(Math.random() * 6);
            
            // 최종 회전 위치 계산 (항상 증가하는 방향)
            const fullRotations = Math.floor(rotations) * Math.PI * 2;
            const symbolRotation = randomSymbol * this.faceAngle;
            const targetRotation = currentRotation + (fullRotations + symbolRotation) * this.rotationDirection;
            
            finalSymbols[index] = randomSymbol;
            reel.targetRotation = targetRotation;
            
            // 애니메이션 적용
            gsap.to(reel.mesh.rotation, {
                x: targetRotation,
                duration: spinDurations[index] / 1000,
                ease: "power1.out",
                onComplete: () => {
                    this.sounds.stop.play();
                    reel.currentIndex = randomSymbol;
                    
                    // 회전 완료 후 정확한 위치로 조정
                    const normalizedRotation = this.initialRotation + (randomSymbol * this.faceAngle);
                    reel.mesh.rotation.x = targetRotation;
                    
                    if (index === 2) {
                        this.isSpinning = false;
                        this.checkWin(finalSymbols);
                    }
                }
            });
        });
    }

    showWinAnimation(symbols) {
        this.reels.forEach((reel, index) => {
            // 현재 회전 상태를 유지하면서 크기 애니메이션
            gsap.to(reel.mesh.scale, {
                x: 1.2,
                y: 1.2,
                z: 1.2,
                duration: 0.3,
                yoyo: true,
                repeat: 3,
                onComplete: () => {
                    // 크기를 원래대로 복구
                    reel.mesh.scale.set(1, 1, 1);
                }
            });
        });
    }

    checkWin(symbols) {
        if (symbols[0] === symbols[1] && symbols[1] === symbols[2]) {
            const symbolName = this.symbols[symbols[0]];
            const winAmount = this.symbolValues[symbolName] * 3;
            this.score += winAmount;
            this.coins += winAmount;
            this.sounds.win.play();
            
            this.showWinAnimation(symbols);
        }
        
        this.updateUI();
    }

    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('coins').textContent = this.coins;
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        // 각 릴의 회전 상태 업데이트
        this.reels.forEach(reel => {
            if (!this.isSpinning) {
                // 회전이 멈췄을 때 정확한 위치 유지
                reel.mesh.rotation.x = reel.targetRotation;
            }
        });
        
        this.renderer.render(this.scene, this.camera);
    }
}

// 슬롯머신 인스턴스 생성 및 초기화
async function initSlotMachine() {
    const slotMachine = new SlotMachine();
    await slotMachine.init();
    
    // 이벤트 리스너 설정
    document.getElementById('spinButton').addEventListener('click', () => {
        slotMachine.spin();
    });

    window.addEventListener('resize', () => {
        slotMachine.camera.aspect = window.innerWidth / window.innerHeight;
        slotMachine.camera.updateProjectionMatrix();
        slotMachine.renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// 슬롯머신 초기화 실행
initSlotMachine(); 