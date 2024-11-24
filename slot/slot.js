class SlotMachine {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.reels = [];
        this.symbols = ['cherry', 'lemon', 'grape', 'seven', 'bell', 'star'];
        this.reelWidth = 2.05; // 릴 간격
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
        this.coins = 1000;
        
        this.sounds = {
            spin: new Audio('/slot/sounds/spin.mp3'),
            win: new Audio('/slot/sounds/win.mp3'),
            stop: new Audio('/slot/sounds/stop.mp3')
        };

        this.textureAtlas = null;  // 텍스처 아틀라스 저장용 변수 추가

        this.finalSymbols = [0, 0, 0];
        this.updateCameraPosition();  // 초기 카메라 위치 설정
        this.frameGroup = new THREE.Group(); // 프레임을 담을 그룹
        this.controls = null; // OrbitControls 추가
        this.centerRod = null; // 중심축 저장용 변수 추가
    }

    setupControls() {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        
        // 카메라 이동 제한
        this.controls.enablePan = false; // 카메라 평행이동 비활성화
        this.controls.enableZoom = true; // 줌 활성화
        
        // 회전 제한
        this.controls.minPolarAngle = Math.PI * 0.25; // 최소 상하 각도 (45도)
        this.controls.maxPolarAngle = Math.PI * 0.75; // 최대 상하 각도 (135도)
        this.controls.minAzimuthAngle = -Math.PI * 0.25; // 최소 좌우 각도 (-45도)
        this.controls.maxAzimuthAngle = Math.PI * 0.25;  // 최대 좌우 각도 (45도)
        
        // 줌 제한
        this.controls.minDistance = 8;  // 최소 줌
        this.controls.maxDistance = 15; // 최대 줌
        
        // 감속 설정
        this.controls.enableDamping = true; // 부드러운 움직임
        this.controls.dampingFactor = 0.05; // 감속 계수
        
        // 자동 회전 비활성화
        this.controls.autoRotate = false;
        
        // 초기 카메라 위치 설정
        this.camera.position.set(0, 0, 10);
        this.controls.update();
    }

    updateCameraPosition() {
        const baseDistance = 10;
        const aspectRatio = window.innerWidth / window.innerHeight;
        
        let targetZ;
        if (aspectRatio < 1) {
            targetZ = baseDistance * (1.0 / aspectRatio);
        } else {
            targetZ = baseDistance * (0.9 / Math.sqrt(aspectRatio));
        }
        
        // controls가 있을 때는 minDistance와 maxDistance만 업데이트
        if (this.controls) {
            this.controls.minDistance = targetZ * 0.8;
            this.controls.maxDistance = targetZ * 1.5;
            this.controls.update();
        } else {
            this.camera.position.z = targetZ;
        }
        
        this.camera.updateProjectionMatrix();
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

        // 모든 이미지를 90도 회전하여 캔버스에 그리기
        await Promise.all(this.symbols.map((symbol, index) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => {
                    // 임시 캔버스 생성하여 이미지 회전
                    const tempCanvas = document.createElement('canvas');
                    const tempCtx = tempCanvas.getContext('2d');
                    tempCanvas.width = img.height;
                    tempCanvas.height = img.width;
                    
                    // 이미지 90도 회전
                    tempCtx.translate(tempCanvas.width/2, tempCanvas.height/2);
                    tempCtx.rotate(Math.PI / 2);
                    tempCtx.drawImage(img, -img.width/2, -img.height/2);
                    
                    // 회전된 이미지를 메인 캔버스에 그리기
                    ctx.drawImage(tempCanvas, index * symbolWidth, 0, 
                        symbolWidth, canvas.height);
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

    createFrame() {
        // 프레임 재질
        const frameMaterial = new THREE.MeshPhongMaterial({
            color: 0xFFD700,  // 황금색
            specular: 0xFFFFFF,
            shininess: 100,
            metalness: 1.0,
        });

        // 프레임 두께와 크기
        const thickness = 0.3;
        const width = this.reelWidth * 3 + 1.5;
        const height = 3;
        const depth = 1;

        // 상단 프레임 (텍스트가 들어갈 부분)
        const topFrame = new THREE.Mesh(
            new THREE.BoxGeometry(width + thickness * 2, thickness * 15, depth),
            frameMaterial
        );
        topFrame.position.y = height/2 + thickness*15/2;

        // 하단 프레임
        const bottomFrame = new THREE.Mesh(
            new THREE.BoxGeometry(width + thickness * 2, thickness * 10, depth),
            frameMaterial
        );
        bottomFrame.position.y = -height/2 - thickness * 10/2;

        // 좌측 프레임
        const leftFrame = new THREE.Mesh(
            new THREE.BoxGeometry(thickness, height + thickness * 2, depth),
            frameMaterial
        );
        leftFrame.position.x = -width/2 - thickness/2;

        // 우측 프레임
        const rightFrame = new THREE.Mesh(
            new THREE.BoxGeometry(thickness, height + thickness * 2, depth),
            frameMaterial
        );
        rightFrame.position.x = width/2 + thickness/2;

        // 장식용 모서리 구체들
        const sphereGeometry = new THREE.SphereGeometry(thickness * 1.2, 32, 32);
        const corners = [
            {x: -width/2 - thickness/2, y: height/2 + thickness/2},
            {x: width/2 + thickness/2, y: height/2 + thickness/2},
            {x: -width/2 - thickness/2, y: -height/2 - thickness/2},
            {x: width/2 + thickness/2, y: -height/2 - thickness/2}
        ];

        corners.forEach(pos => {
            const sphere = new THREE.Mesh(sphereGeometry, frameMaterial);
            sphere.position.set(pos.x, pos.y, 0);
            this.frameGroup.add(sphere);
        });

        // 텍스트 추가
        const loader = new THREE.FontLoader();
        loader.load('/slot/fonts/helvetiker_bold.typeface.json', (font) => {
            const textGeometry = new THREE.TextGeometry('LUCKY SLOT', {
                font: font,
                size: 0.5,
                height: 0.1,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            });

            const textMaterial = new THREE.MeshPhongMaterial({ 
                color: 0xFFD700,
                specular: 0xFFFFFF,
                shininess: 10
            });

            const textMesh = new THREE.Mesh(textGeometry, textMaterial);
            textGeometry.computeBoundingBox();
            const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
            textMesh.position.set(-textWidth/2, height/2 + thickness, 1);
            this.frameGroup.add(textMesh);
        });

        // 모든 프레임 요소를 그룹에 추가
        this.frameGroup.add(topFrame, bottomFrame, leftFrame, rightFrame);
        this.frameGroup.position.z = -0.5; // 릴보다 약간 뒤에 위치
        this.scene.add(this.frameGroup);

        // 프레임 주변 조명 추가
        const frameLight1 = new THREE.PointLight(0xFFD700, 0.5, 5);
        frameLight1.position.set(0, height/2 + thickness, 2);
        const frameLight2 = new THREE.PointLight(0xFFD700, 0.5, 5);
        frameLight2.position.set(0, -height/2 - thickness, 2);
        this.scene.add(frameLight1, frameLight2);
    }

    setupLights() {
        // 기존 조명 제거
        this.scene.remove(...this.scene.children.filter(child => child.isLight));
        
        // 주변광 추가 (전체적인 밝기를 낮춤)
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); // 강도를 0.3으로 낮춤
        
        // 메인 조명 (위에서 비추는 조명)
        const mainLight = new THREE.DirectionalLight(0xffffff, 0.4);
        mainLight.position.set(0, 5, 5);
        
        // 보조 조명 (아래에서 약하게 비추는 조명)
        const fillLight = new THREE.DirectionalLight(0xffffff, 0.2); // 강도를 0.2로 설정
        fillLight.position.set(0, -5, 5);
        
        // 프레임 조명 (황금색 프레임을 위한 조명)
        const frameLight1 = new THREE.PointLight(0xFFD700, 0.2, 8); // 강도와 거리 조절
        frameLight1.position.set(0, 3, 2);
        
        const frameLight2 = new THREE.PointLight(0xFFD700, 0.2, 8);
        frameLight2.position.set(0, -3, 2);
        
        this.scene.add(ambientLight, mainLight, fillLight, frameLight1, frameLight2);
    }

    createCenterRod() {
        // 원기둥 지오메트리 생성
        const geometry = new THREE.CylinderGeometry(0.1, 0.1, 7.5, 16); // 반지름 0.1, 높이 7
        
        // 금속 재질 생성
        const material = new THREE.MeshPhongMaterial({
            color: 0xC0C0C0,        // 은색
            metalness: 0.8,
            roughness: 0.2,
            specular: 0x222222,     // 반사광
            shininess: 100          // 광택
        });
        
        // 원기둥 메쉬 생성
        this.centerRod = new THREE.Mesh(geometry, material);
        this.centerRod.rotation.z = Math.PI / 2; // 90도 회전하여 세로로 세움
        this.centerRod.position.x = 0; // 릴의 중앙에 위치
        this.centerRod.position.z = -0.3; // 릴보다 약간 뒤에 위치
        
        // 원기둥 끝부분 장식 추가
        const capGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 16);
        const capMaterial = new THREE.MeshPhongMaterial({
            color: 0xFFD700,        // 황금색
            metalness: 0.8,
            roughness: 0.2,
            specular: 0x222222,
            shininess: 100
        });
        
        // 왼쪽 캡
        const leftCap = new THREE.Mesh(capGeometry, capMaterial);
        leftCap.rotation.z = Math.PI / 2; // 90도 회전하여 가로로 눕힘
        leftCap.position.set(-3.8, 0, -0.3); // 릴의 왼쪽에 위치
        
        // 오른쪽 캡
        const rightCap = new THREE.Mesh(capGeometry, capMaterial);
        rightCap.rotation.z = Math.PI / 2; // 90도 회전하여 가로로 눕힘
        rightCap.position.set(3.8, 0, -0.3); // 릴의 오른쪽에 위치
        
        // 씬에 추가
        this.scene.add(this.centerRod);
        this.scene.add(leftCap);
        this.scene.add(rightCap);
    }

    async init() {
        await this.loadTextures();

        // this.camera.position.z = 10; // updateCamaraPosition 에서 수행
        this.camera.position.y = 0;
        this.camera.rotation.x = 0;

        // 릴 생성
        for (let i = 0; i < 3; i++) {
            const prism = this.createHexagonalPrism();
            prism.position.x = (i - 1) * this.reelWidth * 1.1 ;
            
            this.reels.push({ 
                mesh: prism,
                currentIndex: 0,
                targetRotation: this.initialRotation
            });
            this.scene.add(prism);
        }

        this.setupLights(); // 조명 설정 호출

        this.createFrame(); // 프레임 생성 추가
        this.createCenterRod(); // 중심축 생성 추가
        this.setupControls(); // 컨트롤 설정 추가

        this.animate();
        this.updateUI();

        // resize 이벤트 핸들러 수정
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.updateCameraPosition();  // 리사이즈할 때마다 카메라 위치 업데이트
        });
    }
    
    spin() {
        if (this.isSpinning || this.coins < 10) return;
        
        this.coins -= 10;
        this.updateUI();
        this.isSpinning = true;
        this.sounds.spin.play();

        const spinDurations = [2000, 2500, 3000];
        

        this.reels.forEach((reel, index) => {
            // 회재 회전 각도
            const currentRotation = reel.mesh.rotation.x;
            
            // 회전 수 계산 (항상 양수로)
            const randVal = Math.random();
            const rotations = 10 + randVal * 6; // 4-6회전
            const randomSymbol = Math.floor(randVal * 6);
            
            // 최종 회전 위치 계산 (항상 증가하는 방향)
            const fullRotations = Math.floor(rotations) * Math.PI * 2;
            const symbolRotation = randomSymbol * this.faceAngle;
            const targetRotation = currentRotation + (fullRotations + symbolRotation) * this.rotationDirection;
            
            this.finalSymbols[index] = (this.finalSymbols[index] + randomSymbol) % 6;
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
                        console.log(this.finalSymbols);
                        this.isSpinning = false;
                        this.checkWin(this.finalSymbols);
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
        
        // 컨트롤 업데이트 추가
        if (this.controls) {
            this.controls.update();
        }
        
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