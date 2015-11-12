// set the scene size
var WIDTH = window.innerWidth,
	HEIGHT = 768,
	VIEW_ANGLE = 45,
	ASPECT = WIDTH / HEIGHT,
	NEAR = 0.1,
	FAR = 10000;

var	container, renderer, camera, scene, controls, scale, pointLight, bars = [];

init();
animate();

function toRadians (angle) {
	return angle * (Math.PI / 180);
}

function init() {
	// camera
	camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	camera.position.x = 96;
	camera.position.y = 150;
	camera.position.z = 25;

	controls = new THREE.TrackballControls(camera);
	controls.target = new THREE.Vector3(96, 0, 0)

	// scene
	scene = new THREE.Scene();

	for(var i=0; i<128;i++) {
		var geometry = new THREE.CubeGeometry(.75, 1, 1),
			material;

		geometry.faces.forEach(function(face) {
			face.color.setHex( Math.random() * 0xffffff );
		});

		material = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors } );

		bars[i] = new THREE.Mesh(geometry, material);
		bars[i].position.x = i * 1.5;

		scene.add(bars[i]);
	}

	// and the camera
	scene.add(camera);

	pointLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
	pointLight.position.x = 10;
	pointLight.position.y = 50;
	pointLight.position.z = 130;

	scene.add(pointLight);
	// Renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(WIDTH, HEIGHT);

	container = document.getElementById('container');
	container.appendChild(renderer.domElement);

	render();
}

function animate(timeStamp) {
	for (var i = 0; i < bars.length; i++) {
		bars[i].scale.z = (array[i] + boost)/15; //or i * 2?
	}

	requestAnimationFrame(animate);
	controls.update();
	render();
}

function render() {
	renderer.render(scene, camera);
}
