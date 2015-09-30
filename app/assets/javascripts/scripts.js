define(["require", "exports", "./manzai"], function (require, exports, manzai) {
    (function () {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = 'https://cdn.jsdelivr.net/enchantjs/0.8.1/enchant.min.js';
        document.getElementsByTagName('script')[0].parentNode.appendChild(script);
    })();
    var xhr = new XMLHttpRequest();
    xhr.open("GET", location.href + ".json");
    xhr.addEventListener("loadend", function () {
        var script = JSON.parse(xhr.responseText);
        var timeline = new manzai.Timeline(script);
        document.addEventListener("click", onclick);
        function onclick() {
            if (timeline.playing) {
                timeline.play();
            }
            else {
                timeline.end();
                document.removeEventListener("click", onclick);
            }
        }
    });
    xhr.send();
});
