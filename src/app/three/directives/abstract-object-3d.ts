import {
    AfterViewInit,
    ContentChildren,
    Input,
    OnChanges,
    QueryList,
    SimpleChanges
} from '@angular/core';
import { Object3D } from 'three';

export abstract class AbstractObject3D<T extends Object3D> implements AfterViewInit, OnChanges {

    @ContentChildren(AbstractObject3D, { descendants: false }) childNodes: QueryList<AbstractObject3D<Object3D>>;

    @Input() rotateX: number;
    @Input() rotateY: number;
    @Input() rotateZ: number;

    @Input() translateX: number;
    @Input() translateY: number;
    @Input() translateZ: number;

    private object: T;

    protected rerender() {
    }
  
    public ngOnChanges(changes: SimpleChanges) {
      if (!this.object) {
        return;
      }
  
      let mustRerender = false;
  
      if (['rotateX', 'rotateY', 'rotateZ'].some(propName => propName in changes)) {
        this.applyRotation();
        mustRerender = true;
      }
      if (['translateX', 'translateY', 'translateZ'].some(propName => propName in changes)) {
        this.applyTranslation();
        mustRerender = true;
      }
  
      if (mustRerender) {
        this.rerender();
      }
    }
  
    public ngAfterViewInit(): void {
      console.log('AbstractObject3D.ngAfterViewInit');
      this.object = this.newObject3DInstance();
  
      this.applyTranslation();
      this.applyRotation();
  
      if (this.childNodes !== undefined && this.childNodes.length > 1) {
        this.childNodes.filter(i => i !== this && i.getObject() !== undefined).forEach(i => {
          console.log("Add child for " + this.constructor.name);
          console.log(i);
          this.addChild(i.getObject());
        });
      } else {
        console.log("No child Object3D for: " + this.constructor.name);
      }
  
      this.afterInit();
    }
  
    private applyRotation(): void {
      this.object.rotation.set(
        this.rotateX || 0,
        this.rotateY || 0,
        this.rotateZ || 0,
        'XYZ'
      );
    }
  
    private applyTranslation(): void {
      this.object.position.set(
        this.translateX || 0,
        this.translateY || 0,
        this.translateZ || 0
      );
    }
  
    protected addChild(object: THREE.Object3D): void {
      this.object.add(object);
    }
  
    protected removeChild(object: THREE.Object3D): void {
      this.object.remove(object);
    }
  
    public getObject(): T {
      return this.object;
    }
  
    protected abstract newObject3DInstance(): T;
  
    protected abstract afterInit(): void;

}
