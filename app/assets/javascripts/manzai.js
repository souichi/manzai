var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var collections = require("./collections");
(function (Actor) {
    Actor[Actor["whole"] = 0] = "whole";
    Actor[Actor["boke"] = 1] = "boke";
    Actor[Actor["tsukkomi"] = 2] = "tsukkomi";
})(exports.Actor || (exports.Actor = {}));
var Actor = exports.Actor;
(function (Action) {
    Action[Action["message"] = 0] = "message";
    Action[Action["bokeru"] = 1] = "bokeru";
    Action[Action["tsukkomu"] = 2] = "tsukkomu";
})(exports.Action || (exports.Action = {}));
var Action = exports.Action;
var Timeline = (function (_super) {
    __extends(Timeline, _super);
    function Timeline(script) {
        _super.call(this);
        this.script = script;
        for (var i = 0; i < this.script.sentences.length; i++) {
            this.enqueue(this.script.sentences[i]);
        }
    }
    Object.defineProperty(Timeline.prototype, "title", {
        get: function () {
            return this.script.title;
        },
        enumerable: true,
        configurable: true
    });
    return Timeline;
})(collections.Queue);
exports.Timeline = Timeline;
