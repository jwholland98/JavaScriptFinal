var raycaster, intersected = [];

var cylinder;
// var thisScene;
var line;

function createController(scene, renderer, cameraFixture, controllerId=0) {
    // RENDER CONTROLLER
    const controller = renderer.xr.getController( controllerId );
    //Cylinder for button presses:
    //var cylinder, line;
    const cylinderGeometry = new THREE.CylinderGeometry( 0.025, 0.025, 0.5, 32 );
    const cylinderMaterial = new THREE.MeshPhongMaterial( {color: 0xffff00} );
    cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
    cylinder.geometry.translate( 0, 0.25, 0 );
    cylinder.rotateX( - 0.25 * Math.PI );
    controller.add( cylinder );
    //Line for pointing:
    const  lineGeometry = new THREE.BufferGeometry().setFromPoints( [ new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, - 1 ) ] );

    line = new THREE.Line( lineGeometry );
    line.name = 'line';
    line.scale.z = 5;
    line.rotateX( (- 0.25 * Math.PI) + 0.5 * Math.PI );
    controller.add(line);
    cameraFixture.add( controller );
    //Trigger events
    //controller.addEventListener( 'selectstart', () => { cylinderMaterial.color.set( 0xff0000 ); updateRaycasts(controllerId); } );
    controller.addEventListener( 'selectstart', () => { incremementButtonNum(); cylinderMaterial.color.set( 0xff0000 ); } );
    controller.addEventListener( 'selectend', () => { cylinderMaterial.color.set( 0xffff00 ) } );
    var geometry = new THREE.BufferGeometry().setFromPoints( [ new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, - 1 ) ] );
    //add built controller to a global object:
    // if(controllerId == 0){
    //     controller1.add(controller);
    // }else if(controllerId == 1){
    //     controller2.add(controller);
    // }
    //raycaster.layers.set( 99 );
    //while(true){
    //updateRaycasts(cylinder, raycaster);
    //}
    // controller1.add( line.clone() );
    // controller2.add( line.clone() );
}
function updateRaycasts(controllerId=0){
    var intersected = [];
    //var points = [];
    //var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
    //points.push(c.position, )
    var thisController;
    if(controllerId == 0){
        thisController = controller1;
    } else {
        thisController = controller2;
    }
    var thisLine = line;
    let pos = new Vector3();
    let rot = new Vector3(0,0,0);
    pos = cylinder.position;
    rot = rot.applyEuler(cylinder.rotation);
    rot = rot.normalize();
    raycaster.set(pos, rot);
    intersected = raycaster.intersectObjects( scene.children );
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