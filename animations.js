

function update(buttonNum, shapes, object, loaded){
    if (buttonNum == 1){
        for(var i = 0;i<shapes.length;i++){
        this.tl = new TimelineMax().delay(.3);
            this.tl.to(shapes[i].scale, 1, {z: 2, ease: Expo.easeOut})
            this.tl.to(shapes[i].scale, .5, {x: .5, ease: Expo.easeOut})
            this.tl.to(shapes[i].scale, .5, {y: .5, ease: Expo.easeOut})
            this.tl.to(shapes[i].rotation, .5, {z: shapes[i].rotation.z + Math.PI*.5, ease: Expo.easeOut})
            this.tl.to(shapes[i].position, 1, {z: -40, ease: Expo.easeOut})
        }
    }
    if (buttonNum == 2){
            object.rotation.y+=.01;
    }
    // if for each different button
}

function play(renderer, scene, camera, shapes, object, loaded, buttonNum){
    renderer.setAnimationLoop( function () {

        update(buttonNum, shapes, object, loaded)

        renderer.render(scene, camera);
    });

}

function stop() {

    renderer.setAnimationLoop( null );
  
}

function loadBoxAnimation(scene, shapes){
    geometry = new THREE.CubeGeometry(3, 3, 3);
    material = new THREE.MeshLambertMaterial( { color: 0x008080});
    meshX = -10;
    for(var i = 0; i<10;i++){
        shape = new THREE.Mesh( geometry, material );
        shape.position.set((Math.random()-.5)*30, 20+(Math.random()-.5)*30, (Math.random()-1)*30)
        shapes.push(shape);
        scene.add(shape);
        meshX+=1;
    }
}

