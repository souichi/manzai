/// <reference path="./typings/enchant/enchant.d.ts"/>
/// <reference path="./collections.ts"/>
/// <reference path="./string.ts"/>

interface IScript {
  title: string;
  sentences: ISentence[];
}

interface ISentence {
  actor: Actor;
  action: Action;
  message: string;
}

const enum Actor {
  whole,
  boke,
  tsukkomi
}

const enum Action {
  message,
  bokeru,
  tsukkomu
}

class Timeline {
  private script: IScript;
  private queue: Queue<ISentence>;
  private game: enchant.Game;
  private tsukkomi: enchant.Sprite;
  private boke: enchant.Sprite;
  private balloon: enchant.Group;

  constructor(script: IScript) {
    this.script = script;
    this.queue = new Queue<ISentence>();
    for (var i = 0; i < this.script.sentences.length; i++) {
      this.queue.enqueue(this.script.sentences[i]);
    }

    this.game = new enchant.Game(320, 320);
    this.game.preload([
      "/assets/stage.jpg",
      "/assets/0124.gif",
      "/assets/0125.gif",
      "/assets/balloon.png",
      "/assets/curtain.jpg",
      "/audios/clapping_short.mp3",
      "/audios/vipsz3_snd3827.wav",
      "/audios/vipsz3_snd3830.wav",
      "/audios/se7.wav",
      "/audios/lock3.wav"]);
    this.game.onload = () => {
      this.game.assets["/audios/clapping_short.mp3"].clone().play();

      var background = new enchant.Sprite(320, 320);
      background.image = this.game.assets["/assets/stage.jpg"];
      background.x = 0;
      background.y = 0;
      this.game.rootScene.addChild(background);

      this.tsukkomi = new enchant.Sprite(35, 53);
      this.tsukkomi.image = this.game.assets["/assets/0124.gif"];
      this.tsukkomi.x = 160 - this.tsukkomi.width - 15;
      this.tsukkomi.y = 195;
      this.game.rootScene.addChild(this.tsukkomi);

      this.boke = new enchant.Sprite(43, 49);
      this.boke.image = this.game.assets["/assets/0125.gif"];
      this.boke.x = 160 + 10;
      this.boke.y = 200;
      this.game.rootScene.addChild(this.boke);
    }
    this.game.start();
  }

  public get title(): string {
    return this.script.title;
  }

  public get playing(): boolean {
    return 0 < this.queue.size;
  }

  public play(): void {
    var sentence = this.queue.dequeue();
    if (!sentence)
      return;

    var scaleY = 0.7;
    var scaleX = 1;
    switch (sentence.actor) {
      case Actor.boke:
        switch (sentence.action) {
          case Action.bokeru:
            this.game.assets["/audios/vipsz3_snd3827.wav"].clone().play();
            var counter = 1;
            var timerId = setInterval(() => {
              this.boke.scaleX *= -1;
              if (10 <= counter) {
                clearInterval(timerId);
              }
              counter++;
            }, 100);
            break;
        }
        break;
      case Actor.tsukkomi:
        scaleX *= -1;
        switch (sentence.action) {
          case Action.tsukkomu:
            this.game.assets["/audios/vipsz3_snd3830.wav"].clone().play();
            var defaultX = 160 - this.tsukkomi.width - 15;
            var defaultY = 195;
            this.tsukkomi.tl.moveTo(defaultX + 10, defaultY, 10, enchant.Easing.QUAD_EASEINOUT);
            var counter = 1;
            var timerId = setInterval(() => {
              this.tsukkomi.scaleX *= -1;
              if (10 <= counter) {
                this.tsukkomi.tl.moveTo(defaultX, defaultY, 10, enchant.Easing.QUAD_EASEINOUT);
                clearInterval(timerId);
              }
              counter++;
            }, 100);
            break;
        }
        break;
    }

    this.game.rootScene.removeChild(this.balloon);
    this.balloon = new enchant.Group();
    this.balloon.x = 0;
    this.balloon.y = 0;
    var sprite = new enchant.Sprite(300, 205);
    sprite.x = 0;
    sprite.y = 0;
    sprite.image = this.game.assets["/assets/balloon.png"];
    sprite.scale(scaleX, scaleY);
    this.balloon.addChild(sprite);
    var label = new enchant.Label(adjustMaxLineLength(sentence.message, 14));
    label.x = 40;
    label.y = 55;
    this.balloon.addChild(label);
    this.game.rootScene.addChild(this.balloon);
    this.game.assets["/audios/lock3.wav"].clone().play();
  }

  public end(callback?: () => void): void {
    this.game.assets["/audios/clapping_short.mp3"].clone().play();
    var curtain = new enchant.Sprite(320, 320);
    curtain.image = this.game.assets["/assets/curtain.jpg"];
    curtain.x = 320;
    curtain.y = 0;
    this.game.rootScene.addChild(curtain);
    curtain.tl.moveTo(0, 0, 50, enchant.Easing.QUAD_EASEINOUT);
    callback && callback();
  }
}

var xhr = new XMLHttpRequest();
xhr.open("GET", location.href + ".json");
xhr.addEventListener("loadend", () => {
  if (xhr.status == 200) {
    var script = <IScript> JSON.parse(xhr.responseText);
    var timeline = new Timeline(script);
    var onclick = () => {
      if (timeline.playing) {
        timeline.play();
      } else {
        timeline.end();
        document.removeEventListener("click", onclick);
      }
    }
    document.addEventListener("click", onclick);
  }
});
xhr.send();
