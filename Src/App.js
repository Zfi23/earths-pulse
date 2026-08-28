* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Cairo', sans-serif; background: #0a0f0d; color: #f1f5f9; }

.loading-screen {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  height: 100vh; background: #0a0f0d;
}
.pulse-circle {
  width: 90px; height: 90px; border-radius: 50%;
  background: radial-gradient(circle, rgba(34,197,94,0.7), transparent 70%);
  animation: pulse 1.6s infinite; margin-bottom: 24px;
}
@keyframes pulse { 0%,100%{transform:scale(1);opacity:.6} 50%{transform:scale(1.5);opacity:1} }

.hero { text-align: center; padding: 60px 20px; }
.hero h1 { font-size: 2.8rem; color: #22c55e; }
.hero p { font-size: 1.2rem; opacity: 0.7; margin-top: 10px; }
