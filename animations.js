function update(buttonNum, shapes){
    if (buttonNum == 1){
        shapes[2].rotation.x+=.005;
        shapes[2].rotation.y+=.001;
    }
    // if for each different button
}

function play(renderer, scene, camera, shapes, buttonNum){
    renderer.setAnimationLoop( function () {
        update(buttonNum, shapes)

        shapes[0].rotation.x += 0.007;
        shapes[1].rotation.y += 0.01;

        renderer.render(scene, camera);
    });

}

function stop() {

    renderer.setAnimationLoop( null );
  
}

function loadBoxAnimation(scene, shapes){
    geometry = new THREE.CubeGeometry(3, 3, 3);
    material = new THREE.MeshLambertMaterial( { color: 0xffcc00});
    shape = new THREE.Mesh( geometry, material );
    shapes.push(shape);
    shape.position.z = -10
    scene.add(shape);
}