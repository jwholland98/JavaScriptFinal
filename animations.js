var pivot;

function update(buttonNum, shapes, object){
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
    if (buttonNum == 3){
        pivot.rotation.z += .01;
    }
}

function play(renderer, scene, camera, shapes, object, buttonNum){
    renderer.setAnimationLoop( function () {

        update(buttonNum, shapes, object)

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

function loadPivotAnimation(scene){
    var Ncubes = new Array;
    var Ecubes = new Array;
    var Scubes = new Array;
    var Wcubes = new Array;
    var NEcubes = new Array;
    var SEcubes = new Array;
    var SWcubes = new Array;
    var NWcubes = new Array;
    pivot = new THREE.Object3D();
    pivot.position.set(30, 21, -30);
    for(var i = 0;i<4;i++){
        Ncube = new THREE.Mesh( new THREE.CubeGeometry(2,2,2), new THREE.MeshLambertMaterial({ color: 0x008080}) );
        Ecube = new THREE.Mesh( new THREE.CubeGeometry(2,2,2), new THREE.MeshLambertMaterial({ color: 0x008080}) );
        Scube = new THREE.Mesh( new THREE.CubeGeometry(2,2,2), new THREE.MeshLambertMaterial({ color: 0x008080}) );
        Wcube = new THREE.Mesh( new THREE.CubeGeometry(2,2,2), new THREE.MeshLambertMaterial({ color: 0x008080}) );
        NEcube = new THREE.Mesh( new THREE.CubeGeometry(2,2,2), new THREE.MeshLambertMaterial({ color: 0x008080}) );
        SEcube = new THREE.Mesh( new THREE.CubeGeometry(2,2,2), new THREE.MeshLambertMaterial({ color: 0x008080}) );
        SWcube = new THREE.Mesh( new THREE.CubeGeometry(2,2,2), new THREE.MeshLambertMaterial({ color: 0x008080}) );
        NWcube = new THREE.Mesh( new THREE.CubeGeometry(2,2,2), new THREE.MeshLambertMaterial({ color: 0x008080}) );
        Ncubes.push(Ncube)
        Ecubes.push(Ecube);
        Scubes.push(Scube)
        Wcubes.push(Wcube);
        NEcubes.push(NEcube)
        SEcubes.push(SEcube);
        SWcubes.push(SWcube)
        NWcubes.push(NWcube);

        pivot.add(Ncube);
        pivot.add(Ecube);
        pivot.add(Scube);
        pivot.add(Wcube);
        pivot.add(NEcube);
        pivot.add(SEcube);
        pivot.add(SWcube);
        pivot.add(NWcube);
    }
    scene.add(pivot);
    for(var i = 0;i<4;i++){
        Ncubes[i].position.set(6+i*3, 0, 0);
        Ecubes[i].position.set(0, 6+i*3, 0);
        Scubes[i].position.set(-6-i*3, 0, 0);
        Wcubes[i].position.set(0, -6-i*3, 0);
        NEcubes[i].position.set(4+i*3, 4+i*3, 0);
        SEcubes[i].position.set(4+i*3, -4-i*3, 0);
        SWcubes[i].position.set(-4-i*3, 4+i*3, 0);
        NWcubes[i].position.set(-4-i*3, -4-i*3, 0);
    }
}
