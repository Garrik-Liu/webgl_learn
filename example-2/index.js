var renderer = null,
    scene = null,
    camera = null,
    cube = null;

var duration = 5000; // ms
var currentTime = Date.now();

function animate() {
    var now = Date.now();
    var deltat = now - currentTime;
    currentTime = now;
    var fract = deltat / duration;
    var angle = Math.PI * 2 * fract;
    cube.rotation.y += angle;
}

function run() {
    requestAnimationFrame(() => run());
    // 渲染场景
    renderer.render(scene, camera);
    // 为下一帧动画旋转立方体
    animate();
}

$(document).ready(() => {
    var canvas = document.getElementById("webgl-canvas");

    // 创建Three.js渲染器并将其添加到canvas中
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    });
    // 设置视口尺寸
    renderer.setSize(canvas.width, canvas.height);

    // 创建一个新的Three.js场景
    scene = new THREE.Scene();

    // 添加一个相机以便观察整个场景
    camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 4000);
    scene.add(camera);

    // 添加用于突出显示物体的定向光
    var light = new THREE.DirectionalLight(0xffffff, 1.5);

    // 将灯光放置在场景外，指向原点
    light.position.set(0, 0, 1);
    scene.add(light);

    // 创建一个纹理映射的立方体并将其添加到场景中
    // 首先，创建纹理映射
    var mapUrl = "./logo.png";
    var map = THREE.ImageUtils.loadTexture(mapUrl);

    // 其次，创建一个基础材质，传入纹理映射
    var material = new THREE.MeshPhongMaterial({
        map: map
    });

    // 接着，创建立方体几何形状
    var geometry = new THREE.CubeGeometry(2, 2, 2);

    // 将几何形状和材质整合到一个网格中
    cube = new THREE.Mesh(geometry, material);

    // 将网格移动到与相机有一段距离的位置，并朝向观察者倾斜
    cube.position.z = -8;
    cube.rotation.x = Math.PI / 5;
    cube.rotation.y = Math.PI / 5;

    // 最后，将网格添加到场景中
    scene.add(cube);

    // 启动运行循环
    run();
});