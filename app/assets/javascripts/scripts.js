define(["require", "exports", "./manzai"], function (require, exports, manzai) {
    document.addEventListener("page:change", function () {
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
});
