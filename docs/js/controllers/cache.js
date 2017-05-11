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
                this.life = life; // time is MS till expired.
                this.timeStamp = new Date().getTime();
                this.result = result;

                this.isStale = function() {
                    var test = new Date().getTime();
                    return test > this.timeStamp + this.life ? true : false;
                };
                return this;
            };

            this.storeResult = function(data) {
                _this.requestArray.push(data.request);
                _this.storage.push(data);
            };

            this.has = function(stamp) {
                return _this.requestArray.indexOf(stamp) !== -1 ? true : false;
            };

            this.clearStale = function() {
                $.each(_this.storage, function(index, value) {
                    if (value.isStale) {
                        _this.storage.splice(index, 1);
                        _this.requestArray.splice(index, 1);
                    }
                });
            };

            this.getCachedData = function(stamp) {
                console.log('Getting cashed data');
                return _this.storage[_this.requestArray.indexOf(stamp)];
            };

        };
        return new Cache();
    });