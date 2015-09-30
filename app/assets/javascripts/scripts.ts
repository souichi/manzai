import * as manzai from "./manzai";

loadEnchantJs();

var xhr = new XMLHttpRequest();
xhr.open("GET", location.href + ".json");
xhr.addEventListener("loadend", () => {
  var script = <manzai.IScript> JSON.parse(xhr.responseText);
  var timeline = new manzai.Timeline(script);
  document.addEventListener("click", onclick);
  
  function onclick(): void {
    if (timeline.playing) {
      timeline.play();
    } else {
      timeline.end();
      document.removeEventListener("click", onclick);
    }
  }
});
xhr.send();

function loadEnchantJs(): void {
  (() => {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://cdn.jsdelivr.net/enchantjs/0.8.1/enchant.min.js';
      document.getElementsByTagName('script')[0].parentNode.appendChild(script);
      // var viewport = document.createElement("meta");
      // viewport.name = "viewport";
      // viewport.content = "width=320, initial-scale=1.0, user-scalable=no";
      // document.getElementsByTagName('script')[0].parentNode.appendChild(viewport);
  })();
}
