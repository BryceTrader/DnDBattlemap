window.addEventListener("resize", () => {
  onWindowResize();
});

window.addEventListener("mousedown", (e) => {
  addEntityToManger(e);
});

window.addEventListener("keydown", (key) => {
  GM.systems[GM.systemsDictionary.InputSystem].keyInput.push(key.code);
});

function onWindowResize() {
  const camera = GM.systems[GM.systemsDictionary["CameraSystem"]];
  camera.resized = true;
}

function addEntityToManger(e) {
  const camera = GM.systems[GM.systemsDictionary.CameraSystem];
  const cX = Math.floor(e.clientX / camera.tileScaled) - camera.xOffset;
  const cY = Math.floor(e.clientY / camera.tileScaled) - camera.yOffset;

  if (!GM.checkSamePosition(cX, cY)) return
	target = new Entity();
  target.addComponent(new Position(cX, cY));
  target.addComponent(new Sprite("orc"));
  target.addComponent(new Animator(target.components.Sprite.spriteName));
  GM.addEntity(target);

  GM.systems[GM.systemsDictionary.AnimationSystem].getFrameData(
    target.components.Animator
  );
}

function updateLoop() {
  GM.update();
  requestAnimationFrame(updateLoop);
}

function setupCanvasSystemsManager() {
  // Canvases
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  backCanvas.width = document.body.clientWidth;
  backCanvas.height = document.body.clientHeight;

  // Systems
  const CameraSys = new CameraSystem();
  const InputSys = new InputSystem();
  const AnimationSys = new AnimationSystem();
  const RenderSys = new RenderSystem(ctx, canvas);
  const BackgroundSys = new BackgroundSystem(bctx, backCanvas);
  // const NetworkSys = new NetworkSystem()

  // ManagerSystems
  GM.addSystem(CameraSys);
  GM.addSystem(InputSys);
  GM.addSystem(AnimationSys);
  GM.addSystem(RenderSys);
  GM.addSystem(BackgroundSys);
  // GM.addSystem(NetworkSys)
}

const socket = io();
const canvas = document.getElementById("foreground");
const ctx = canvas.getContext("2d");
const backCanvas = document.getElementById("background");
const bctx = backCanvas.getContext("2d");

const GM = new Manager();
setupCanvasSystemsManager();

// Socket.io
socket.on("connected", (data) => {
  AnimationSys.animationJSON = data.animatedSpriteJSON;
});

updateLoop();
