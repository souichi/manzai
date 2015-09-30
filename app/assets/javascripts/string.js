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
    function adjustMaxLineLength(message, maxLineLength) {
        message = message.replace((new RegExp("\r\n", "g")), "");
        message = message.replace((new RegExp("\n", "g")), "");
        var sb = new StringBuffer(message);
        var p = 0;
        var insertText = "<br>";
        while (p < sb.length) {
            p += maxLineLength;
            if (message.indexOf(sb.toString()[p], 0) > -1)
                p++;
            sb.insert(p, insertText);
            p += insertText.length;
        }
        return sb.toString();
    }
    exports.adjustMaxLineLength = adjustMaxLineLength;
});
