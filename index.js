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
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const player = new THREE.Mesh(CreateBoxGeometry(1,1,1), material );
scene.add( player );
scene.updateMatrixWorld(true)
var PlayerPosition = new THREE.Vector3()
PlayerPosition.setFromMatrixPosition( player.matrixWorld)

player.position.y = -3;
camera.position.z = 5;

let ActiveBullets = [];

const geometry = new THREE.CylinderGeometry( 5, 5, 20, 8 ); 
const mat = new THREE.MeshBasicMaterial({wireframe: true, color:0x00ff00 })
const cylinder = new THREE.Mesh( geometry,mat ); 
cylinder.rotation.x = 80;
cylinder.position.z = 10;
scene.add( cylinder );

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
      } else if (event.key === 'e' || event.key === 'E') {
        Shoot();
      }
    });
  };
var EnemyPosition = new THREE.Vector3()
let Enemy = () => {
  const enemy = new THREE.Mesh(CreateBoxGeometry(1,1,1), material );
  scene.add(enemy)
  enemy.position.y = 3;
  EnemyPosition.setFromMatrixPosition( enemy.matrixWorld)
}
let flip = true;

function animate() {
  requestAnimationFrame( animate );
 
  for(let i in ActiveBullets){
    ActiveBullets[i].position.y += 0.2
    if(ActiveBullets[i].position.y == 0.05){
      scene.remove( ActiveBullets[i] );
    }
  }
  /*
  if(flip == true){
    EnemyPosition.position.x += 0.01;
    if(EnemyPosition.position.x == 1){
      flip = false;
    }
  }else if(flip == false){
    EnemyPosition.position.x -= 0.01;
    if(EnemyPosition.position.x == -1){
      flip = true;
    }
  }
  */
  cylinder.rotation.y += 0.02;
  controls.update();
  renderer.render( scene, camera );
}
Enemy();
PlayerMove();
animate();