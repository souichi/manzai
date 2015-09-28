document.addEventListener("DOMContentLoaded", function () {
    var script = {
        title: "test",
        sentences: [
            {
                actor: 2,
                action: 0,
                message: "hoge"
            }
        ]
    };
    var timeline = new Manzai.Timeline(script);
    console.log(timeline.title);
});
