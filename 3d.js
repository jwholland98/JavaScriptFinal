//just literally grab everything from three's modules
//import { Bone } from './three/build/three.module.js';
//import * as THREE from './three/build/three.module.js';
import { VRButton } from './three/examples/jsm/webxr/CustomVRButton.js';
//import { XRControllerModelFactory } from './three/examples/jsm/webxr/XRControllerModelFactory.js';
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
          'https://threejsfundamentals.org/threejs/resources/images/grid-1024.png',
          'https://threejsfundamentals.org/threejs/resources/images/grid-1024.png',
          'https://threejsfundamentals.org/threejs/resources/images/grid-1024.png',
          'https://threejsfundamentals.org/threejs/resources/images/grid-1024.png',
          'https://threejsfundamentals.org/threejs/resources/images/grid-1024.png',
          'https://i.pinimg.com/originals/6d/a3/c4/6da3c4228b17b9357ce6c3bd42a4c665.jpg',
        ]);
        scene.background = texture;
      }

      //making the head a referenceable location
    
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    cameraFixture.add(camera);
    //cameraFixture.position.set(2, 2, -1);
    scene.add( cameraFixture );


    var controls = new THREE.OrbitControls(cameraFixture, renderer.domElement);
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


function loadObj(path){
    // instantiate a loader
    var loader = new THREE.OBJLoader();

    // load a resource
    loader.load(
        // resource URL
        path,
        function ( object ) {
            object.position.set(0, -10, -30)
            object.scale.set(0.5,0.5,0.5);
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

function main(){
    init();
    makeShape("sphere", 0, 0, 0);
    makeShape("cube",0,0,0);
    makeButton("cube", 0,1,-1, scene, shapes);
    makeButton("cube", 1,1,-1, scene, shapes);
    makeButton("cube", -1,1,-1,scene, shapes);
    loadObj('models/human.obj',scene, shapes);
    
    loadBoxAnimation(scene, shapes);
    createController(0, renderer, cameraFixture, scene);
    createController(1, renderer, cameraFixture, scene);
    //updateRaycasts();
    var buttonNum = 1;
    play(renderer, scene, camera, shapes, buttonNum);
}

main()