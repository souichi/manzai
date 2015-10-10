declare module enchant {
  export class Event {
    static LOAD: string;
    static PROGRESS: string;
    static ENTER_FRAME: string;
    static EXIT_FRAME: string;
    static ENTER: string;
    static EXIT: string;
    static ADDED: string;
    static ADDED_TO_SCENE: string;
    static REMOVED: string;
    static REMOVED_FROM_SCENE: string;
    static TOUCH_START: string;
    static TOUCH_MOVE: string;
    static TOUCH_END: string;
    static RENDER: string;
    static INPUT_START: string;
    static INPUT_CHANGE: string;
    static INPUT_END: string;
    static LEFT_BUTTON_DOWN: string;
    static LEFT_BUTTON_UP: string;
    static RIGHT_BUTTON_DOWN: string;
    static RIGHT_BUTTON_UP: string;
    static UP_BUTTON_DOWN: string;
    static UP_BUTTON_UP: string;
    static DOWN_BUTTON_DOWN: string;
    static DOWN_BUTTON_UP: string;
    static A_BUTTON_DOWN: string;
    static A_BUTTON_UP: string;
    static B_BUTTON_DOWN: string;
    static B_BUTTON_UP: string;
  }
  export class EventTarget {
    addEventListener(type: string, listener: Function);
    removeEventListener(type: string, listener: Function);
    clearEventListener(type: string);
    dispatchEvent(e: any);
    on(type: string, listener: Function);
    onload: Function;
  }
  export class Game extends EventTarget {
    input: any;
    fps: number;
    rootScene: Scene;
    assets: Scene;
    actualFps: number;
    width: number;
    height: number;
    frame: number;

    constructor();
    constructor(w: number, h: number);
    //start and stop
    start(): void;
    stop(): void;
    pause(): void;
    debug(): void;
    resume(): void;
    getElapsedTime(): number;

    // loading
    load(src: string, callback?: Function): void;
    preload(Array): void;
    findExt(path: string): string;

    //scene
    pushScene(scene: Scene);
    popScene(scene: Scene);
    replaceScene(scene: Scene);
    removeScene(scene: Scene);
    keybind(key: string, buttons: string);
  }
  export class Node extends EventTarget {
    x: number;
    y: number;
    tl: Timeline;
    moveTo(x: number, y: number): void;
    moveBy(x: number, y: number): void;
    remove();
  }

  export class Entity extends Node {
    id: string;
    className: string;
    width: number;
    height: number;
    backgroundColor: string;
    opacity: number;
    visible: boolean;
    touchEnabled: boolean;
    scaleX: number;
    scaleY: number;
    intersect(other: Entity): boolean;
    within(other: Entity, distance: number): boolean;
    scale(x: number, y: number): void;
    rotate(degree: number): void;
  }

  export class Sprite extends Entity {
    image: any;
    frame: number;
    constructor(w: number, h: number);
  }
  export class Label extends Entity {
    text: string;
    textAlign: string;
    font: string;
    color: string;
    constructor(text: string);
  }
  export class Map extends Entity {
    image: any;
    tileWidth: number;
    width: number;
    height: number;
    loadData(data: Array<Array<number>>);
    loadData(background: Array<Array<number>>, foreground: Array<Array<number>>);
    collisionData: Array<Array<number>>;
    checkTile(x: number, y: number);
    hitTest(x: number, y: number);
    redraw(x: number, y: number, width: number, height: number);
    constructor(w: number, h: number);
  }

  export class Group extends Node {
    firstChild: Node;
    lastChild: Node;
    addChild(node: Node): void;
    removeChild(node: Node): void;
    insertBefore(node: Node, reference): void;
  }
  export class RGroup extends Group {
    rotation: number;
  }

  export class Scene extends Group {
    backgroundColor: string;
  }

  export class CanvasGroup extends Group {
    rotation: number;
  }
  export class Surface extends EventTarget {
    static load(src: string);
    getPixel(x: number, y: number);
    setPixel(x: number, y: number);
    clear();
    draw(image);
    draw(image: string, takeFrom: number, takeTo: number, takeWidth: number, takeHeight: number, scaleFrom: number, scaleTo: number, scaleWidth: number, scaleHeight: number);
    clone();
    toDataURL();
    constructor(width: number, height: number);
  }
  export class Sound extends EventTarget {
    static load(src: string);
    play();
    pause();
    stop();
    clone();
    currentTime: number;
    volume: number;
    static load(src: string, type?: string);
  }

  export class Timeline extends EventTarget {
    moveTo(x: number, y: number, time: number);
    moveTo(x: number, y: number, time: number, easing: Easing);
    delay(time: number): Timeline;
    then(func: () => void);
  }

  export class Easing {
    static QUAD_EASEINOUT: string;
    static BOUNCE_EASEIN: string;
  }

  export module nineleap {
    export class Core extends enchant.Game {
      end(score: number, result: string, image?: string);
    }
  }

  export module ui {
    export class Pad extends Sprite {
      constructor();
    }

    export class APad extends Sprite {
      constructor();
    }

    export class Button extends Entity {
      cofor: string;
      font: string;
      size: number;
      text: string;
      constructor(text?: string, theme?: any, height?: number, width?: number);
    }

    export class MutableText extends Sprite {

    }

    export class TimeLabel extends MutableText {
      time: number;
      _count: number;
      constructor(x: number, y: number, counttype?: string);
    }

    export class ScoreLabel extends MutableText {
      score: number;
    }

    export class LifeLabel extends Group {
      life: number;
      constructor(x: number, y: number, maxlife: number);
    }
  }
}
