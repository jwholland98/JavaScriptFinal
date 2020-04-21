import { VRButton } from './three/examples/jsm/webxr/CustomVRButton.js';

var scene, camera, renderer;
function init(){
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.xr.enabled = true;
    //renderer.setClearColor("#858585");
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild(VRButton.createButton(renderer));

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set(0, 20, 30);

    document.body.appendChild( renderer.domElement );

    scene = new THREE.Scene();{
        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
          'https://threejsfundamentals.org/threejs/resources/images/grid-1024.png',
          'https://threejsfundamentals.org/threejs/resources/images/grid-1024.png',
          'https://threejsfundamentals.org/threejs/resources/images/grid-1024.png',
          'https://threejsfundamentals.org/threejs/resources/images/grid-1024.png',
          'https://threejsfundamentals.org/threejs/resources/images/grid-1024.png',
          'https://threejsfundamentals.org/threejs/resources/images/grid-1024.png',
        ]);
        scene.background = texture;
      }

    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDampening = true;
    controls.campingFactor = 0.25;
    controls.enableZoom = true;

    var keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
    keyLight.position.set(-60, 0, 60);

    var fillLight = new THREE.DirectionalLight(0xffffff, 0.75);
    fillLight.position.set(60, 0, 60);

    var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
    backLight.position.set(60, 0, -60).normalize();

    scene.add(keyLight);
    scene.add(fillLight);
    scene.add(backLight);

    window.addEventListener('resize', () => {
        renderer.setSize( window.innerWidth, window.innerHeight );
        camera.aspect = window.innerWidth / window.innerHeight;

        //camera.updatePojectionMatrix();
    })
}

var geometry, material, shape;
var shapes = new Array;
function makeShape(type){
    if(type=="sphere")
        geometry = new THREE.SphereGeometry();
    if(type=="cube")
        geometry = new THREE.CubeGeometry(3, 3, 3);
    material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true} );
    shape = new THREE.Mesh( geometry, material );
    shapes.push(shape);
    scene.add( shape );
}

function loadObj(path){
    // instantiate a loader
    var loader = new THREE.OBJLoader();

    // load a resource
    loader.load(
        // resource URL
        path,
        function ( object ) {
            scene.add( object );
        },
        function ( xhr ) {

            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
        },
        // called when loading has errors
        function ( error ) {
    
            console.log( 'An error happened' );
    
        }
    );

    // load a resource from provided URL synchronously
   // loader.load( path, callbackOnLoad, null, null, null );
}

function animate() {
    shapes[0].rotation.x += 0.001;
    shapes[1].rotation.y += 0.01;
    renderer.setAnimationLoop( function () {

        renderer.render( scene, camera );
    
    } );
}

function main(){
    init();
    makeShape("sphere");
    makeShape("cube");
    loadObj('models/human.obj');
    animate();
}

main()
