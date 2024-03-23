import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
controls.update();

let CreateBoxGeometry = (w , h , d) => {
  return new THREE.BoxGeometry(w,h,d)
}
camera.position.z = 5;
//Background
const geometry = new THREE.CylinderGeometry( 5, 5, 20, 8 ); 
const mat = new THREE.MeshBasicMaterial({wireframe: true, color:0x00ff00 })
const cylinder = new THREE.Mesh( geometry,mat ); 
cylinder.rotation.x = 80;
cylinder.position.z = 10;
scene.add( cylinder );
//Shooting + Player
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const player = new THREE.Mesh(CreateBoxGeometry(1,1,1), material );
scene.add( player );
player.position.y = -3;
scene.updateMatrixWorld(true)

let PlayerBox = new THREE.Box3(new THREE.Vector3(),new THREE.Vector3())
PlayerBox.setFromObject(player)
let ActiveBullets = [];
let Shoot = () => {
  const bullet = new THREE.Mesh( CreateBoxGeometry(0.1,0.1,0.1), material );
  scene.add( bullet )
  bullet.position.set(player.position.x,player.position.y+0.7,player.position.z)
  ActiveBullets.push(bullet)
}

let PlayerMove = () => {
    window.addEventListener('keydown', function (event) {
        if (event.key === 'a' || event.key === 'A') {
        player.position.x -= 0.5;
      } else if (event.key === 'd' || event.key === 'D') {
        player.position.x += 0.5;
      } else if (event.key === 'w' || event.key === 'W') {
        player.position.y += 0.5;
      } else if (event.key === 's' || event.key === 'S') {
        player.position.y -= 0.5;
      } else if (event.key === 'e' || event.key === 'E') {
        Shoot();
      }
    });
  };
//Enemy *Make this shit as function later*
//var EnemyPositionCap = new THREE.Vector3(4,3,0)
const enemy = new THREE.Mesh(CreateBoxGeometry(1,1,1), material );
const enemyBox = new THREE.Box3(new THREE.Vector3() , new THREE.Vector3());
enemyBox.setFromObject(enemy)
enemy.position.y = 3;

scene.add(enemy)

//Collision
let checkCollision = () => {
if(PlayerBox.intersectsBox(enemyBox)){
   
}
}

//let flip = true; a
function animate() {
  requestAnimationFrame( animate );
  enemyBox.copy(enemy.geometry.boundingBox).applyMatrix4(enemy.matrixWorld);
  PlayerBox.copy(player.geometry.boundingBox).applyMatrix4(player.matrixWorld);
  checkCollision();



// Clean this shit up a
  for(let i in ActiveBullets){
    ActiveBullets[i].position.y += 0.2
    if(ActiveBullets[i].position.y >= 4){
      scene.remove( ActiveBullets[i] );
    }
  }

  if(flip == true){
    enemy.position.x += 0.02;
    if (enemy.position.x > EnemyPositionCap.x) {
      flip = false;
  }
  }else if(flip == false){
    enemy.position.x -= 0.02;
    if(enemy.position.x < -EnemyPositionCap.x){
      flip = true;
    }
  }
  cylinder.rotation.y += 0.02;
  controls.update();
  renderer.render( scene, camera );
}
PlayerMove();
animate();