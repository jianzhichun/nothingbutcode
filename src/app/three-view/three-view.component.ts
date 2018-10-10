import { Component, OnInit } from '@angular/core';
import { Object3D, Color } from 'three';

const flatten = <T>(array: T[], mapper: (t: T) => T[]): T[] =>
  array.reduce((arr, a) => {
    let _array = mapper(a);
    if (_array && _array.length) {
      arr = arr.concat(flatten(_array, mapper));
    } else {
      arr.push(a);
    }
    return arr;
  }, []);

@Component({
  selector: 'app-three-view',
  templateUrl: './three-view.component.html',
  styleUrls: ['./three-view.component.css']
})
export class ThreeViewComponent implements OnInit {

  meshes: Object3D[];
  perspectiveCamera: { [key: string]: number } = {
    fov: 60,
    near: 0.5,
    far: 2000,
    positionX: 100,
    positionY: 1300,
    positionZ: 200
  };
  pointLight: { [key: string]: any } = {
    color: '#ffffff',
    intensity: 1,
    distance: 10000,
    translateX: 100,
    translateY: 300,
    translateZ: 200
  };
  loadModel: { [key: string]: any } = {
    model: 'assets/three-view/demo/file.obj',
    material: 'assets/three-view/demo/file.mtl',
    texturePath: 'assets/three-view/demo/'
  };

  constructor() { }

  ngOnInit() { }

  loaded(model: Object3D) {
    this.meshes = flatten(model.children, obj => obj.children).filter(obj => obj.type === 'Mesh');
  }
}
