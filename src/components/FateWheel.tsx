
import React, { useEffect, useRef, useState } from 'react';
import { Camera } from 'lucide-react';
// @ts-ignore
import { Hands, Results, HAND_CONNECTIONS } from '@mediapipe/hands';
// @ts-ignore
import { Camera as MPCamera } from '@mediapipe/camera_utils';

// --- Types ---
type InteractionMode = 'mouse' | 'camera';

const FL = 400;
const IDLE_EMOJIS = ['💰', '🧧', '🏮', '🥟', '🪙', '✨'];
const DEFAULT_PHRASES = ['恭喜发财', '万事如意', '身体健康', '财源广进', '大吉大利', '步步高升', '心想事成'];

const FateWheel: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    // UI State
    const [mode, setMode] = useState<InteractionMode>('mouse');
    const [phrases, setPhrases] = useState<string[]>(DEFAULT_PHRASES);
    const [inputText, setInputText] = useState(DEFAULT_PHRASES.join(' '));
    const [tips, setTips] = useState("按住蓄力 · 抽取命运");

    // Logic Refs
    const stateRef = useRef({
        isMouseDown: false,
        mouseX: 0,
        mouseY: 0,
        canvasWidth: 300,
        canvasHeight: 600,
        cx: 150,
        cy: 300,
        bgParticles: [] as any[],
        burstParticles: [] as any[],
        idleTextureMap: new Map<string, HTMLCanvasElement>(),
        phraseTextureMap: new Map<string, HTMLCanvasElement>(),
        phrases: DEFAULT_PHRASES,
        cameraActive: false,
        handClosed: false, // For gesture detection
        lastHandClosed: false
    });

    // --- 1. Pre-render Helpers ---
    const preRenderIdle = () => {
        const map = new Map<string, HTMLCanvasElement>();
        const size = 64; // Smaller for phone
        IDLE_EMOJIS.forEach(emoji => {
            const c = document.createElement('canvas');
            c.width = size; c.height = size;
            const ctx = c.getContext('2d');
            if (!ctx) return;
            ctx.font = `bold ${size * 0.75}px "Segoe UI Emoji", sans-serif`;
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.shadowBlur = 10; ctx.shadowColor = '#4400ff';
            ctx.fillText(emoji, size / 2, size / 2 + size * 0.05);
            map.set(emoji, c);
        });
        stateRef.current.idleTextureMap = map;
    };

    const preRenderPhrases = (currentPhrases: string[]) => {
        const map = new Map<string, HTMLCanvasElement>();
        const w = 180;
        const h = 64;

        currentPhrases.forEach(text => {
            const c = document.createElement('canvas');
            c.width = w; c.height = h;
            const ctx = c.getContext('2d');
            if (!ctx) return;

            ctx.font = `bold 26px "Microsoft YaHei", sans-serif`;
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.shadowBlur = 15; ctx.shadowColor = '#ffcc00';
            ctx.fillStyle = '#fff';
            ctx.fillText(text, w / 2, h / 2);
            ctx.strokeStyle = '#ffaa00';
            ctx.lineWidth = 2;
            ctx.strokeText(text, w / 2, h / 2);

            map.set(text, c);
        });
        stateRef.current.phraseTextureMap = map;
        stateRef.current.phrases = currentPhrases;
    };

    // --- 2. Particle Classes (simplified for functional component) ---
    class BgParticle {
        emoji: string = '';
        x: number = 0;
        y: number = 0;
        z: number = 0;
        speed: number = 0;
        rotation: number = 0;
        rotSpeed: number = 0;

        constructor() { this.reset(true); }

        reset(init = false) {
            const { canvasWidth, canvasHeight } = stateRef.current;
            this.emoji = IDLE_EMOJIS[Math.floor(Math.random() * IDLE_EMOJIS.length)];
            this.x = (Math.random() - 0.5) * canvasWidth * 5;
            this.y = (Math.random() - 0.5) * canvasHeight * 5;
            this.z = init ? Math.random() * 5000 : 5000 + Math.random() * 500;
            this.speed = Math.random() * 0.6 + 0.2;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotSpeed = (Math.random() - 0.5) * 0.01;
        }

        update() {
            this.z -= this.speed;
            this.rotation += this.rotSpeed;
            if (this.z < -FL) this.reset(false);
        }
    }

    class SpinParticle {
        phrase: string;
        cx: number; cy: number; cz: number = 0;
        angle: number;
        currentRadius: number = 0;
        targetRadius: number;
        spinSpeed: number;
        totalRotation: number = 0;
        state: 'EXPANDING' | 'SPINNING' | 'FADING' = 'EXPANDING';
        scale: number = 0.1;
        alpha: number = 1;

        x: number = 0; y: number = 0; z: number = 0;

        constructor(centerX: number, centerY: number, phrase: string, startAngle: number, targetRadius: number, spinSpeed: number) {
            this.phrase = phrase;
            this.cx = centerX; this.cy = centerY;
            this.angle = startAngle;
            this.targetRadius = targetRadius;
            this.spinSpeed = spinSpeed;
        }

        update() {
            if (this.state === 'EXPANDING') {
                const speed = (this.targetRadius - this.currentRadius) * 0.08;
                this.currentRadius += speed;
                this.angle += this.spinSpeed * 0.2;
                if (this.targetRadius - this.currentRadius < 1) {
                    this.currentRadius = this.targetRadius;
                    this.state = 'SPINNING';
                }
            } else if (this.state === 'SPINNING' || this.state === 'FADING') {
                this.angle += this.spinSpeed;
                this.totalRotation += Math.abs(this.spinSpeed);
                if (this.totalRotation > Math.PI * 4) this.state = 'FADING';
            }

            this.x = this.cx + Math.cos(this.angle) * this.currentRadius;
            this.y = this.cy + Math.sin(this.angle) * this.currentRadius;
            this.z = this.cz;

            if (this.scale < 1) this.scale += 0.05;
            if (this.state === 'FADING') this.alpha -= 0.02;
        }
    }

    // --- 3. Animation Loop ---
    useEffect(() => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        // Init Data
        preRenderIdle();
        preRenderPhrases(stateRef.current.phrases);
        stateRef.current.bgParticles = Array(150).fill(null).map(() => new BgParticle());

        let animationId: number;

        const loop = () => {
            const {
                canvasWidth, canvasHeight, cx, cy,
                bgParticles, burstParticles,
                idleTextureMap, phraseTextureMap,
                isMouseDown, mouseX, mouseY
            } = stateRef.current;

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            // Draw Background (Deep Space)
            const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, canvasHeight);
            grd.addColorStop(0, '#050010');
            grd.addColorStop(1, '#000000');
            ctx.fillStyle = grd;
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);

            // Interaction Glow
            if (isMouseDown) {
                const glow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 150);
                glow.addColorStop(0, 'rgba(100, 200, 255, 0.6)');
                glow.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = glow;
                ctx.globalCompositeOperation = 'lighter';
                ctx.beginPath();
                ctx.arc(mouseX, mouseY, 150, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalCompositeOperation = 'source-over';
            }

            // Update & Draw IDLE particles
            bgParticles.sort((a, b) => b.z - a.z);
            bgParticles.forEach(p => {
                p.update();
                const perspective = FL / (FL + p.z);
                const screenX = cx + p.x * perspective;
                const screenY = cy + p.y * perspective;
                const size = 100 * perspective;

                if (size > 300 || p.z < -FL + 10 || size < 2) return;
                const img = idleTextureMap.get(p.emoji);
                if (!img) return;

                ctx.save();
                ctx.translate(screenX, screenY);
                ctx.rotate(p.rotation);
                ctx.globalAlpha = Math.min(1, (5000 - p.z) / 1000);
                ctx.drawImage(img, -size / 2, -size / 2, size, size);
                ctx.restore();
            });

            // Update & Draw Burst particles
            for (let i = burstParticles.length - 1; i >= 0; i--) {
                const p = burstParticles[i];
                p.update();
                if (p.alpha <= 0) {
                    burstParticles.splice(i, 1);
                    continue;
                }

                const perspective = FL / (FL + p.z);
                const screenX = cx + p.x * perspective;
                const screenY = cy + p.y * perspective;

                let sizeBonus = p.targetRadius / 500;
                sizeBonus = Math.max(0.8, Math.min(1.2, sizeBonus));

                const baseW = 120 * sizeBonus;
                const baseH = 42 * sizeBonus;
                const w = baseW * perspective * p.scale;
                const h = baseH * perspective * p.scale;

                const img = phraseTextureMap.get(p.phrase);
                if (!img) continue;

                ctx.save();
                ctx.translate(screenX, screenY);
                ctx.rotate(p.angle + Math.PI / 2);
                ctx.globalAlpha = p.alpha;
                ctx.globalCompositeOperation = 'lighter';
                ctx.drawImage(img, -w / 2, -h / 2, w, h);
                ctx.restore();
            }

            animationId = requestAnimationFrame(loop);
        };

        loop();

        return () => cancelAnimationFrame(animationId);
    }, []);

    // --- 4. Event Handlers ---
    const triggerOneRing = () => {
        const { cx, cy, mouseX, mouseY, phrases } = stateRef.current;
        const mousePerspective = 1; // Simplified for 2D interaction plane
        const targetX3D = (mouseX - cx);
        const targetY3D = (mouseY - cy);

        const targetRadius = Math.random() * 630 + 120;
        let count = Math.floor((targetRadius * 2 * Math.PI) / 100);
        if (count < 6) count = 6;
        if (count > 24) count = 24;

        const dir = Math.random() > 0.5 ? 1 : -1;
        const speedFactor = Math.pow(Math.random(), 2);
        const spinSpeed = (speedFactor * 0.08 + 0.002) * dir;
        const angleStep = (Math.PI * 2) / count;

        for (let i = 0; i < count; i++) {
            const text = phrases[i % phrases.length];
            const startAngle = i * angleStep;
            stateRef.current.burstParticles.push(new SpinParticle(
                targetX3D, targetY3D, text, startAngle, targetRadius, spinSpeed
            ));
        }
    };

    const handleMouseDown = () => {
        stateRef.current.isMouseDown = true;
        setTips(""); // Hide tips on interaction
    };

    const handleMouseUp = () => {
        stateRef.current.isMouseDown = false;
        triggerOneRing();
    };

    const handleMouseMove = (e: React.MouseEvent | MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        stateRef.current.mouseX = e.clientX - rect.left;
        stateRef.current.mouseY = e.clientY - rect.top;
    };

    // Resize Observer
    useEffect(() => {
        if (!containerRef.current || !canvasRef.current) return;
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                canvasRef.current!.width = width;
                canvasRef.current!.height = height;
                stateRef.current.canvasWidth = width;
                stateRef.current.canvasHeight = height;
                stateRef.current.cx = width / 2;
                stateRef.current.cy = height / 2;
            }
        });
        resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    // --- 5. Camera & Gesture Logic ---
    useEffect(() => {
        if (mode !== 'camera' || !videoRef.current) {
            stateRef.current.cameraActive = false;
            // cleanup if needed
            return;
        }

        const hands = new Hands({
            locateFile: (file: string) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
            }
        });

        hands.setOptions({
            maxNumHands: 1,
            modelComplexity: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });

        hands.onResults((results: any) => {
            if (!stateRef.current.cameraActive) return;

            if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
                const landmarks = results.multiHandLandmarks[0];
                // 1. Position Mapping (Index Finger Tip: 8)
                // Mirror x coordinate because camera is mirrored
                const x = (1 - landmarks[8].x) * stateRef.current.canvasWidth;
                const y = landmarks[8].y * stateRef.current.canvasHeight;

                stateRef.current.mouseX = x;
                stateRef.current.mouseY = y;

                // 2. Gesture Detection (Fist vs Open)
                // Simple heuristic: if Index (8) is close to Wrist (0) => Closed
                // Better: Check if finger tips are below PIP joints?
                // Let's use distance between Index Tip(8) and Thumb Tip(4) for "Pinch" which is easier
                // Or "Hold" gesture: all fingers curled.

                // Let's use Index Finger Tip (8) vs Thumb Tip (4) distance for "Active/Hold"
                const dx = landmarks[8].x - landmarks[4].x;
                const dy = landmarks[8].y - landmarks[4].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                const isPinching = dist < 0.1; // Threshold

                // Update state
                if (isPinching && !stateRef.current.lastHandClosed) {
                    // Start Hold
                    stateRef.current.isMouseDown = true;
                    setTips(""); // Hide tips
                } else if (!isPinching && stateRef.current.lastHandClosed) {
                    // Release
                    stateRef.current.isMouseDown = false;
                    triggerOneRing();
                }

                stateRef.current.lastHandClosed = isPinching;
            } else {
                // No hand detected
                stateRef.current.isMouseDown = false;
                stateRef.current.lastHandClosed = false;
            }
        });

        const camera = new MPCamera(videoRef.current, {
            onFrame: async () => {
                if (videoRef.current && stateRef.current.cameraActive) {
                    await hands.send({ image: videoRef.current });
                }
            },
            width: 320,
            height: 240
        });

        stateRef.current.cameraActive = true;
        camera.start();

        return () => {
            stateRef.current.cameraActive = false;
            camera.stop(); // This might define a promise, but we can ignore cleanup complexity for now
            hands.close();
        };
    }, [mode]);

    // Update phrases when changed
    const handleUpdatePhrases = () => {
        const newPhrases = inputText.split(' ').filter(t => t.length > 0);
        if (newPhrases.length > 0) {
            setPhrases(newPhrases);
            preRenderPhrases(newPhrases);
        }
    };

    return (
        <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-black select-none font-sans">
            {/* Canvas Layer */}
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full cursor-crosshair z-0"
                onMouseDown={mode === 'mouse' ? handleMouseDown : undefined}
                onMouseUp={mode === 'mouse' ? handleMouseUp : undefined}
                onMouseMove={mode === 'mouse' ? handleMouseMove : undefined}
                onMouseLeave={mode === 'mouse' ? handleMouseUp : undefined}
                onTouchStart={mode === 'mouse' ? (e) => {
                    handleMouseDown();
                    if (e.touches[0]) handleMouseMove(e as any);
                } : undefined}
                onTouchEnd={mode === 'mouse' ? handleMouseUp : undefined}
                onTouchMove={mode === 'mouse' ? (e) => {
                    if (e.touches[0]) handleMouseMove(e as any);
                } : undefined}
            />

            {/* UI Layer */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 w-full text-center">
                <div
                    className="text-yellow-400 font-bold text-xl tracking-widest transition-opacity duration-500 px-4 drop-shadow-[0_0_10px_rgba(100,100,255,0.8)]"
                    style={{ opacity: stateRef.current.isMouseDown ? 0 : 1, textShadow: '0 0 20px rgba(100, 100, 255, 0.8)' }}
                >
                    {mode === 'camera' ? '捏合手指蓄力 · 松开抽取' : tips}
                </div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-6 left-0 right-0 z-20 flex flex-col items-center gap-3 px-4 pointer-events-auto">
                <div className="flex w-full gap-2">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="输入祝福语，空格分隔"
                        className="flex-1 bg-black/40 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-500 transition-colors text-center"
                    />
                    <button
                        onClick={handleUpdatePhrases}
                        className="bg-yellow-500 text-black font-bold px-3 py-2 rounded-lg text-sm shadow-[0_0_10px_rgba(255,215,0,0.5)] active:scale-95 transition-transform"
                    >
                        更新
                    </button>
                </div>

                <button
                    onClick={() => setMode(mode === 'mouse' ? 'camera' : 'mouse')}
                    className={`flex items-center justify-center gap-2 w-full py-2 rounded-lg text-xs font-medium border transition-all ${mode === 'camera'
                            ? 'bg-purple-600 border-purple-500 text-white shadow-[0_0_15px_rgba(147,51,234,0.5)]'
                            : 'bg-zinc-800/80 border-zinc-700 text-zinc-400 hover:bg-zinc-800'
                        }`}
                >
                    <Camera size={14} />
                    {mode === 'camera' ? '摄像头操控中 (捏合手指)' : '切换到手势操控'}
                </button>
            </div>

            {/* Hidden Video Feed for MediaPipe */}
            <video
                ref={videoRef}
                className="absolute top-0 left-0 w-24 h-auto opacity-50 z-30 pointer-events-none hidden"
                style={{ display: mode === 'camera' ? 'block' : 'none' }}
                playsInline
            />
        </div>
    );
};

export default FateWheel;
