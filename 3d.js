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
var raycaster, intersected = [];

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
          'https://threejsfundamentals.org/threejs/resources/images/grid-1024.png',
        ]);
        scene.background = texture;
      }

      //making the head a referenceable location
    
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set(0, 30, 50);
    
    /*cameraFixture.add(camera);
    cameraFixture.position.set(0, 20, 30);
    scene.add( cameraFixture );*/


    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDampening = true;
    controls.campingFactor = 0.25;
    controls.enableZoom = true;
    controls.target.set(0, 1, -30);
    controls.update();
  
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

    /*var keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
    keyLight.position.set(-60, 0, 60);

    var fillLight = new THREE.DirectionalLight(0xffffff, 0.50);
    fillLight.position.set(60, 0, 60);

    var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
    backLight.position.set(60, 0, -60).normalize();

    scene.add(keyLight);
    scene.add(fillLight);
    scene.add(backLight);*/

    window.addEventListener('resize', () => {
        renderer.setSize( window.innerWidth, window.innerHeight );
        camera.aspect = window.innerWidth / window.innerHeight;

        //camera.updatePojectionMatrix();
        
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

function createController( controllerId ) {
    // RENDER CONTROLLER
    const controller = renderer.xr.getController( controllerId );
    const cylinderGeometry = new THREE.CylinderGeometry( 0.025, 0.025, 1, 32 );
    const cylinderMaterial = new THREE.MeshPhongMaterial( {color: 0xffff00} );
    const cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
    cylinder.geometry.translate( 0, 0.5, 0 );
    cylinder.rotateX( - 0.25 * Math.PI );
    controller.add( cylinder );
    cameraFixture.add( controller );
    // TRIGGER
    controller.addEventListener( 'selectstart', () => { cylinderMaterial.color.set( 0xff0000 ) } );
    controller.addEventListener( 'selectend', () => { cylinderMaterial.color.set( 0xffff00 ) } );
    var geometry = new THREE.BufferGeometry().setFromPoints( [ new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, - 1 ) ] );

    var line = new THREE.Line( geometry );
    line.name = 'line';
    line.scale.z = 5;

    // controller1.add( line.clone() );
    // controller2.add( line.clone() );

    // raycaster = new THREE.Raycaster();
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
            object.position.set(0, 1, -30)
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
    geometry = new THREE.CubeGeometry(150, 2, 100);
    material = new THREE.MeshBasicMaterial( { color: 0xa9a9a9} );
    var floor = new THREE.Mesh( geometry, material );
    floor.position.set(0, 0, 0);
    scene.add( floor );
}

function main(){
    init();
    loadFloor();
    loadObj('models/human.obj');
    createController(0);
    createController(1);
    loadBoxAnimation(scene, shapes);
    loadPivotAnimation(scene);
    makeSign('Custom Animation\n     using GSAP', scene, -60, 45, -30);
    makeSign('Custom Loaded\n        model', scene, -14.5, 45, -30);
    makeSign('Objects rotating around\n     custom pivot point', scene, 30, 45, -30);
    var buttonNum = 1;

    function checkVariable() {//makes sure everything is loaded before going to animation loop
        if (loaded == true) {
            play(renderer, scene, camera, shapes, myObj, buttonNum);
        }
    }
     
    setTimeout(checkVariable, 1000);
}

main()