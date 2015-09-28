import collections = require("./collections");

export interface IScript {
  title: string;
  sentences: ISentence[];
}

export interface ISentence {
  actor: Actor;
  action: Action;
  message: string;
}

export const enum Actor {
  whole,
  boke,
  tsukkomi
}

export const enum Action {
  message,
  bokeru,
  tsukkomu
}

export class Timeline extends collections.Queue<ISentence> {
  private script: IScript;

  constructor(script: IScript) {
    super();
    this.script = script;
    for (var i = 0; i < this.script.sentences.length; i++) {
      this.enqueue(this.script.sentences[i]);
    }
  }

  public get title(): string {
    return this.script.title;
  }
}
