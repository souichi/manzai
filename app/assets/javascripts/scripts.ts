/// <reference path="./manzai.ts"/>

document.addEventListener("DOMContentLoaded", () => {
  var script = <Manzai.IScript>{
    title: "test",
    sentences: <Manzai.ISentence[]>[
      {
        actor: Manzai.Actor.tsukkomi,
        action: Manzai.Action.message,
        message: "hoge"
      }
    ]
  };
  var timeline = new Manzai.Timeline(script);
  console.log(timeline.title);
});
