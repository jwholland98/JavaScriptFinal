

function update(buttonNum, shapes, scene){
    if (buttonNum == 1){
        shapes[0].rotation.x += 0.007;
        shapes[1].rotation.y += 0.01;
        /*shapes[2].rotation.x+=.005;
        shapes[2].rotation.y+=.001;*/
        this.tl = new TimelineMax().delay(.3);
        this.tl.to(shapes[2].scale, 1, {x: 2, ease: Expo.easeOut})
        //this.tl.to(shapes[2].scale, .5, {x: .5, ease: Expo.easeOut})// this line makes it shake for some reason
        this.tl.to(shapes[2].position, .5, {x: 2, ease: Expo.easeOut})
        this.tl.to(shapes[2].rotation, .5, {x: Math.PI*.5, ease: Expo.easeOut}, "=-1.5")
    }
    // if for each different button
}

function play(renderer, scene, camera, shapes, buttonNum){
    renderer.setAnimationLoop( function () {

        update(buttonNum, shapes, scene)

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