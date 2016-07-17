/**
 * Created by yangyang on 7/17/16.
 */
var stats = (function () {
    var people = 0;

    //cache DOM
    var $stats = $('#statsModule');
    var $peoplenumber = $stats.find('#peopleNumber');
    var template = $('#stats-template').html();

    //bind events
    events.on("peopleChanged", setPeople);

    function _render() {
        $peoplenumber.html(Mustache.render(template, {people: people}));
    }

    _render();

    function setPeople(number) {
        people = number;
        _render();
    }

    function destory() {
        $stats.remove();
        events.off('peopleChanged', setPeople);
    }

    return {
        destory: destory
    };

})();
