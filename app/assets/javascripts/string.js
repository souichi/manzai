define(["require", "exports"], function (require, exports) {
    var StringBuffer = (function () {
        function StringBuffer(text) {
            this.buffer = new Array();
            this.buffer.push(text);
        }
        Object.defineProperty(StringBuffer.prototype, "length", {
            get: function () {
                return this.buffer.toString().length;
            },
            enumerable: true,
            configurable: true
        });
        StringBuffer.prototype.append = function (text) {
            this.buffer.push(text);
        };
        StringBuffer.prototype.insert = function (index, text) {
            var newText = (this.toString().slice(0, index) + text + this.toString().slice(index));
            this.buffer = new Array();
            this.buffer.push(newText);
        };
        StringBuffer.prototype.toString = function () {
            return this.buffer.join("");
        };
        return StringBuffer;
    })();
    exports.StringBuffer = StringBuffer;
});
