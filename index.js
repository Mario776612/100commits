import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const player = new THREE.Mesh( geometry, material );
scene.add( player );

player.position.y = -3;
camera.position.z = 5;

let PlayerMove = () => {
    window.addEventListener('keydown', function (event) {
        if (event.key === 'a' || event.key === 'A') {
        player.position.x -= 1;
      } else if (event.key === 'd' || event.key === 'D') {
        player.position.x += 1;
      }else  if (event.key === 'e' || event.key === 'E') {
       //To do 
      }
    });
  };

function animate() {
	requestAnimationFrame( animate );


	renderer.render( scene, camera );
}
PlayerMove();
animate();