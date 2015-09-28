var Queue = (function () {
    function Queue() {
        this.data = new Array();
    }
    Object.defineProperty(Queue.prototype, "size", {
        get: function () {
            return this.data.length;
        },
        enumerable: true,
        configurable: true
    });
    Queue.prototype.enqueue = function (o) {
        this.data.push(o);
    };
    Queue.prototype.dequeue = function () {
        if (0 < this.data.length) {
            return this.data.shift();
        }
        else {
            return null;
        }
    };
    Queue.prototype.toString = function () {
        return "[" + this.data.join(",") + "]";
    };
    return Queue;
})();
exports.Queue = Queue;
