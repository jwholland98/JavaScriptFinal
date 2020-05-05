var raycaster, intersected = [];

var cylinder;
var thisScene;
var line;
function createController( controllerId, renderer, cameraFixture, scene ) {
    // RENDER CONTROLLER
    thisScene = scene;
    const controller = renderer.xr.getController( controllerId );
    const cylinderGeometry = new THREE.CylinderGeometry( 0.025, 0.025, 0.5, 32 );
    const cylinderMaterial = new THREE.MeshPhongMaterial( {color: 0xffff00} );
    cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
    cylinder.geometry.translate( 0, 0.25, 0 );
    cylinder.rotateX( - 0.25 * Math.PI );
    controller.add( cylinder );
    cameraFixture.add( controller );
    // TRIGGER
    controller.addEventListener( 'selectstart', () => { cylinderMaterial.color.set( 0xff0000 ); updateRaycasts(); } );
    controller.addEventListener( 'selectend', () => { cylinderMaterial.color.set( 0xffff00 ) } );
    var geometry = new THREE.BufferGeometry().setFromPoints( [ new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, - 1 ) ] );

    line = new THREE.Line( geometry );
    line.name = 'line';
    line.scale.z = 5;
    controller.add(line);

    
   
    //raycaster.layers.set( 99 );
    //while(true){
    //updateRaycasts(cylinder, raycaster);
    //}
    // controller1.add( line.clone() );
    // controller2.add( line.clone() );
}
function updateRaycasts(){
    raycaster = new THREE.Raycaster();
    //var points = [];
    //var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
    //points.push(c.position, )
    raycaster.set(line.position, line.rotation);
    intersected = raycaster.intersectObjects( thisScene.children );
    for ( var i = 0; i < intersected.length; i++ ){
        intersected[i].object.material.color.set(0x0000ff);
    }
    //line.set(c.position, c.rotation);
}

function makeButton(type, xPos=0, yPos=0, zPos=0, scene, shapes){
    if(type=="sphere")
        geometry = new THREE.SphereGeometry();
    if(type=="cube")
        geometry = new THREE.CubeGeometry(.25, .25, .25);
    material = new THREE.MeshBasicMaterial( { color: 0xff0000,flatShading: true, wireframe: false} );
    shape = new THREE.Mesh( geometry, material );
    shape.geometry.translate(xPos, yPos, zPos);
   

    //shape.layers.set(99);
    //shapes.push(shape);
    scene.add( shape );
}