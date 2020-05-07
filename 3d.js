//just literally grab everything from three's modules
//import { Bone } from './three/build/three.module.js';
//import * as THREE from './three/build/three.module.js';
import { VRButton } from './three/examples/jsm/webxr/CustomVRButton.js';
//import { XRControllerobjectFactory } from './three/examples/jsm/webxr/XRControllerobjectFactory.js';
//import {createController } from './buttonPusher.js'

var scene, camera, renderer;

var controller1, controller2;
var controllerGrip1, controllerGrip2;
var cameraFixture;


function init(){
    cameraFixture = new Group();
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.xr.enabled = true;
    //renderer.setClearColor("#858585");
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
    
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set(0, 6, 10);

    /*cameraFixture.add(camera);
    //cameraFixture.position.set(2, 2, -1);
    scene.add( cameraFixture );*/

    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDampening = true;
    controls.campingFactor = 0.25;
    controls.enableZoom = true;
  
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

    window.addEventListener('resize', () => {
        renderer.setSize( window.innerWidth, window.innerHeight );
        camera.aspect = window.innerWidth / window.innerHeight;
    })

}

var geometry, material, shape;
var shapes = new Array;
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

var myObj, loaded;
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

    // load a resource from provided URL synchronously
   // loader.load( path, callbackOnLoad, null, null, null );
}

function loadFloor(){
    geometry = new THREE.CubeGeometry(30, .4, 20);
    /*var loader2 = new THREE.CubeTextureLoader();
    var texture = loader2.load([
        'textures/floorgrid.jpg',
        'textures/floorgrid.jpg',
        'textures/floorgrid.jpg',
        'textures/floorgrid.jpg',
        'textures/floorgrid.jpg',
        'textures/floorgrid.jpg'
    ])*/
    material = new THREE.MeshBasicMaterial({ color: 0xa9a9a9/*, envMap: texture */});
    var floor = new THREE.Mesh( geometry, material );
    floor.position.set(0, 0, 0);
    scene.add( floor );
}

function main(){
    init();
    loadFloor();
    loadObj('models/human.obj');
    makeButton("cube", 0,1,-1, scene, shapes);
    makeButton("cube", 1,1,-1, scene, shapes);
    makeButton("cube", -1,1,-1,scene, shapes);
    createController(0, renderer, cameraFixture, scene);
    createController(1, renderer, cameraFixture, scene);
    loadBoxAnimation(scene, shapes);
    loadPivotAnimation(scene);
    makeSign('Custom Animation\n     using GSAP', scene, -12, 9, -6);
    makeSign('Custom Loaded\n        model', scene, -2.9, 9, -6);
    makeSign('Objects rotating around\n     custom pivot point', scene, 6, 9, -6);
    var buttonNum = 1;

    function checkVariable() {//makes sure everything is loaded before going to animation loop
        if (loaded == true) {
            play(renderer, scene, camera, shapes, myObj, buttonNum);
        }
    }
     
    setTimeout(checkVariable, 1000);
}

main()