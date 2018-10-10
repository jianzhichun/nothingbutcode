import {
  Component,
  ViewChild,
  ElementRef,
  HostListener,
  AfterViewInit,
  ContentChild
} from '@angular/core';
import * as THREE from 'three';
import { SceneDirective } from '../directives/scene.directive';
import { AbstractCamera } from '../directives/cameras/abstract-camera';
import 'three-onevent';

@Component({
  selector: 'three-webgl-renderer',
  templateUrl: './webgl-renderer.component.html',
  styleUrls: ['./webgl-renderer.component.scss']
})
export class WebGLRendererComponent implements AfterViewInit {

  private renderer: THREE.WebGLRenderer;
  private viewInitialized = false;

  @ViewChild('canvas')
  private canvasRef: ElementRef; // NOTE: say bye-bye to server-side rendering ;)

  @ContentChild(SceneDirective) sceneComponent: SceneDirective; // TODO: Multiple scenes
  @ContentChild(AbstractCamera) cameraComponent: AbstractCamera<THREE.Camera>; // TODO: Multiple cameras

  constructor() {
    console.log('RendererComponent.constructor');
    this.render = this.render.bind(this);
  }

  ngAfterViewInit() {
    console.log('RendererComponent.ngAfterViewInit');
    this.viewInitialized = true;    
    this.startRendering();
  }

  /**
   * The render pane on which the scene is rendered.
   * Currently, only the WebGL renderer with a canvas is used in this
   * implementation, so this property will always be an ElementRef to the
   * underlying <canvas> element.
   *
   * @example This property can be used to restrict the orbit controls (i.e. the
   * area which is listened for mouse move and zoom events) to the rendering pane:
   * ```
   * <three-orbit-controls [rotateSpeed]=1 [zoomSpeed]=1.2 [listeningControlElement]=mainRenderer.renderPane>
   *   <three-renderer #mainRenderer>
   *     ...
   *   </three-renderer>
   * </three-orbit-controls>
   * ```
   */
  public get renderPane(): ElementRef {
    return this.canvasRef;
  }

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private startRendering() {
    console.log('RendererComponent.startRendering');
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true
    });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setClearColor(0xffffff, 1);
    this.renderer.autoClear = true;
    this.updateChildCamerasAspectRatio();
    
    setTimeout(() => {
      this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
      this.updateChildCamerasAspectRatio();
      this.render();
    },1);
  }



  public render() {

    if (this.viewInitialized) {
      (THREE as any).onEvent(this.sceneComponent.getObject(), this.cameraComponent.camera);
      this.renderer.render(this.sceneComponent.getObject(), this.cameraComponent.camera);
    }
  }

  private calculateAspectRatio(): number {
    const height = this.canvas.clientHeight;
    if (height === 0) {
      return 0;
    }
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: Event) {
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    console.log('RendererComponent.onResize: ' + this.canvas.clientWidth + ', ' + this.canvas.clientHeight);

    this.updateChildCamerasAspectRatio();

    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.render();
  }

  public updateChildCamerasAspectRatio() {
    const aspect = this.calculateAspectRatio();
    this.cameraComponent.updateAspectRatio(aspect);
  }

  /*
  @HostListener('document:keypress', ['$event'])
  public onKeyPress(event: KeyboardEvent) {
    console.log("onKeyPress: " + event.key);
  }
*/

}
