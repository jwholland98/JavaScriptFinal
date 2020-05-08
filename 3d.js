import { VRButton } from './three/examples/jsm/webxr/CustomVRButton.js';

//________Global variables:_______

//General scene:
var scene, camera, renderer, cameraFixture;

//makeShape & animations
var geometry, material, shape;
var shapes = new Array;

//createController
var controller1, controller2;

//objectLoader:
var myObj, loaded;


function init(){   
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.xr.enabled = true;
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild(VRButton.createButton(renderer));
    
    document.body.appendChild( renderer.domElement );

    scene = new THREE.Scene();{
        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
          'textures/skybox/skybox_left.png',
          'textures/skybox/skybox_right.png',
          'textures/skybox/skybox_up.png',
          'textures/skybox/skybox_down.png',
          'textures/skybox/skybox_front.png',
          'textures/skybox/skybox_back.png',
        ]);
        scene.background = texture;
      }

    //making the head a referenceable location

    cameraFixture = new Group();
    controller1 = new Group();
    controller2 = new Group();
    raycaster = new THREE.Raycaster();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set(0, 6, 10);
    cameraFixture.add(camera);
    cameraFixture.add(controller1);
    cameraFixture.add(controller2);
    scene.add( cameraFixture );

    //Orbit Controls for debugging outside of vr:
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDampening = true;
    controls.campingFactor = 0.25;
    controls.enableZoom = true;

    //Scene Lights:
    var light = new THREE.PointLight(0xffffff, .75, 1000);
    light.position.set(-50, 50,-50);

    var keyLight = new THREE.DirectionalLight(0xffffff, .75);
    keyLight.position.set(-60, 0, 60);

    var fillLight = new THREE.DirectionalLight(0xffffff, 0.75);
    fillLight.position.set(60, -60, 60);

    var backLight = new THREE.DirectionalLight(0xffffff, .75);
    backLight.position.set(60, 0, -60).normalize();

    scene.add(light);
    scene.add(keyLight);
    scene.add(fillLight);
    scene.add(backLight);

    //just something to resize page
    window.addEventListener('resize', () => {
        renderer.setSize( window.innerWidth, window.innerHeight );
        camera.aspect = window.innerWidth / window.innerHeight;
    })

}

function makeShape(type, xPos=0, yPos=0, zPos=0){
    if(type=="sphere")
        geometry = new THREE.SphereGeometry();
    if(type=="cube")
        geometry = new THREE.CubeGeometry(1, 1, 1);
    material = new THREE.MeshBasicMaterial( { color: 0x00ff00,flatShading: true, wireframe: false} );
    shape = new THREE.Mesh( geometry, material );
    shape.geometry.translate(xPos, yPos, zPos);
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
            myObj = object;
            object.position.set(0, .2, -6)
            object.scale.set(.25, .25, .25);
            scene.add( object );
        },
        function ( xhr ) {
            var percentloaded = xhr.loaded / xhr.total * 100;
            console.log( percentloaded + '% loaded' );
            if (percentloaded == 100){
                loaded = true;
            }
    
        },
        // called when loading has errors
        function ( error ) {
            console.log( 'An error happened' );
        }
    );
}

function loadFloor(){
    var floorGeometry = new THREE.CubeGeometry(30, .4, 20);
    //var floorMaterial = new THREE.MeshBasicMaterial( { color: 0xa9a9a9} );
    const loader = new THREE.TextureLoader();
    const floorMaterial = new THREE.MeshBasicMaterial({
        map: loader.load('textures/floorgrid.jpg')
    })
    var floor = new THREE.Mesh( floorGeometry, floorMaterial );
    floor.position.set(0, 0, 0);
    scene.add( floor );
}

function main(){
    init();
    loadFloor();
    loadObj('models/human.obj');
    createController(scene, renderer, cameraFixture, 0);
    loadBoxAnimation(scene, shapes);
    loadPivotAnimation(scene);
    makeSign('Custom Animation\n     using GSAP', scene, -12, 9, -2, .2);
    makeSign('Custom Loaded\n        Model', scene, -2.9, 9, -6, 0);
    makeSign('Objects Rotating Around\n     Custom Pivot Point', scene, 6, 9, -6, -.2);

    function checkVariable() {//makes sure everything is loaded before going to animation loop
        if (loaded == true) {
            play(renderer, scene, camera, shapes, myObj);
        }
    }
    
    setTimeout(checkVariable, 1000);
}

main()