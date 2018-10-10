import { Directive, forwardRef } from '@angular/core';
import { AbstractObject3D } from "./abstract-object-3d";
import { Scene } from "three";

@Directive({
  selector: 'three-scene',
  providers: [{ provide: AbstractObject3D, useExisting: forwardRef(() => SceneDirective) }]
})
export class SceneDirective extends AbstractObject3D<Scene> {

  constructor() {
    console.log('SceneDirective.constructor');
    super();
  }

  protected afterInit(): void {
    console.log('SceneDirective.afterInit');
  }

  protected newObject3DInstance(): THREE.Scene {
    console.log('SceneDirective.newObject3DInstance');
    return new Scene();
  }

}
