/**
 * Using Require.js to define a module responsible for creating a Cache object and defining the modules that are required by this module.
 */
define([
        'jquery'
    ],
    function(
        $
    ) {

        var Cache = function() {
            var _this = this;
            this.requestArray = [];
            this.storage = [];

            var Data = function(request, life, result) {
                this.request = request;
                this.life = life; // time in MS till expired.
                this.timeStamp = new Date().getTime();
                this.result = result;

                this.isStale = function() {
                    var test = new Date().getTime();
                    return test > this.timeStamp + this.life ? true : false;
                };
            };

            this.storeResult = function(request, life, result) {
                var data = new Data(request, life, result);
                _this.requestArray.push(request);
                _this.storage.push(data);
            };

            this.has = function(stamp) {
                return _this.requestArray.indexOf(stamp) !== -1 ? true : false;
            };

            this.clearStale = function() {
                var arr1 = [];
                var arr2 = [];
                    $.each(_this.storage, function(index, value) {
                    if (!value.isStale()) {
                        arr1.push(value);
                        arr2.push(value.request);
                    }
                    _this.storage = arr1;
                    _this.requestArray = arr2;
                });
            };

            this.getCachedData = function(stamp) {
                return _this.storage[_this.requestArray.indexOf(stamp)].result;
            };

        };
        return new Cache();
    });