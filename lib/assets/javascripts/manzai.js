var Actor;
(function (Actor) {
    Actor[Actor["whole"] = 0] = "whole";
    Actor[Actor["boke"] = 1] = "boke";
    Actor[Actor["tsukkomi"] = 2] = "tsukkomi";
})(Actor || (Actor = {}));
var Action;
(function (Action) {
    Action[Action["message"] = 0] = "message";
    Action[Action["bokeru"] = 1] = "bokeru";
    Action[Action["tsukkomu"] = 2] = "tsukkomu";
})(Action || (Action = {}));
var Timeline = (function () {
    function Timeline(script) {
        var _this = this;
        this.script = script;
        this.queue = new Queue();
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
        this.game.onload = function () {
            _this.game.assets["/audios/clapping_short.mp3"].clone().play();
            var background = new enchant.Sprite(320, 320);
            background.image = _this.game.assets["/assets/stage.jpg"];
            background.x = 0;
            background.y = 0;
            _this.game.rootScene.addChild(background);
            _this.tsukkomi = new enchant.Sprite(35, 53);
            _this.tsukkomi.image = _this.game.assets["/assets/0124.gif"];
            _this.tsukkomi.x = 160 - _this.tsukkomi.width - 15;
            _this.tsukkomi.y = 195;
            _this.game.rootScene.addChild(_this.tsukkomi);
            _this.boke = new enchant.Sprite(43, 49);
            _this.boke.image = _this.game.assets["/assets/0125.gif"];
            _this.boke.x = 160 + 10;
            _this.boke.y = 200;
            _this.game.rootScene.addChild(_this.boke);
        };
        this.game.start();
    }
    Object.defineProperty(Timeline.prototype, "title", {
        get: function () {
            return this.script.title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timeline.prototype, "playing", {
        get: function () {
            return 0 < this.queue.size;
        },
        enumerable: true,
        configurable: true
    });
    Timeline.prototype.play = function () {
        var _this = this;
        var sentence = this.queue.dequeue();
        if (!sentence) {
            return;
        }
        var scaleY = 0.7;
        var scaleX = 1;
        switch (sentence.actor) {
            case 1:
                switch (sentence.action) {
                    case 1:
                        this.game.assets["/audios/vipsz3_snd3827.wav"].clone().play();
                        var counter = 1;
                        var timerId = setInterval(function () {
                            _this.boke.scaleX *= -1;
                            if (10 <= counter) {
                                clearInterval(timerId);
                            }
                            counter++;
                        }, 100);
                        break;
                }
                break;
            case 2:
                scaleX *= -1;
                switch (sentence.action) {
                    case 2:
                        this.game.assets["/audios/vipsz3_snd3830.wav"].clone().play();
                        var defaultX = 160 - this.tsukkomi.width - 15;
                        var defaultY = 195;
                        this.tsukkomi.tl.moveTo(defaultX + 10, defaultY, 10, enchant.Easing.QUAD_EASEINOUT);
                        var counter = 1;
                        var timerId = setInterval(function () {
                            _this.tsukkomi.scaleX *= -1;
                            if (10 <= counter) {
                                _this.tsukkomi.tl.moveTo(defaultX, defaultY, 10, enchant.Easing.QUAD_EASEINOUT);
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
    };
    Timeline.prototype.end = function (callback) {
        this.game.assets["/audios/clapping_short.mp3"].clone().play();
        var curtain = new enchant.Sprite(320, 320);
        curtain.image = this.game.assets["/assets/curtain.jpg"];
        curtain.x = 320;
        curtain.y = 0;
        this.game.rootScene.addChild(curtain);
        curtain.tl.moveTo(0, 0, 50, enchant.Easing.QUAD_EASEINOUT);
        callback && callback();
    };
    return Timeline;
})();
var xhr = new XMLHttpRequest();
xhr.open("GET", location.href + ".json");
xhr.addEventListener("loadend", function () {
    if (xhr.status == 200) {
        var script = JSON.parse(xhr.responseText);
        var timeline = new Timeline(script);
        var onclick = function () {
            if (timeline.playing) {
                timeline.play();
            }
            else {
                timeline.end(function () {
                    document.removeEventListener("click", onclick);
                });
            }
        };
        document.addEventListener("click", onclick);
    }
});
xhr.send();
