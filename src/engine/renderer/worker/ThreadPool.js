System.register(["./Thread"], function(exports_1) {
    var Thread_1;
    var ThreadPool;
    return {
        setters:[
            function (Thread_1_1) {
                Thread_1 = Thread_1_1;
            }],
        execute: function() {
            ThreadPool = (function () {
                function ThreadPool() {
                }
                Object.defineProperty(ThreadPool, "maxThreads", {
                    get: function () {
                        return navigator["hardwareConcurrency"] || 2;
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                ThreadPool.getThreads = function () {
                    console.info("Available Threads:" + ThreadPool.maxThreads);
                    if (ThreadPool.pool) {
                        return ThreadPool.pool;
                    }
                    var threads = [];
                    for (var i = 0; i < ThreadPool.maxThreads; i++) {
                        threads.push(new Thread_1.Thread("Thread:#" + i, i));
                    }
                    ThreadPool.pool = threads;
                    return threads;
                };
                return ThreadPool;
            })();
            exports_1("ThreadPool", ThreadPool);
        }
    }
});
//# sourceMappingURL=ThreadPool.js.map