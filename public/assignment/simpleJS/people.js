/**
 * Created by yangyang on 7/17/16.
 */
//(function () {
//    var people = {
//        people: ['Yang', 'Gu'],
//        init: function () {
//            this.cacheDom();
//            this.bindEvents();
//            this._render();
//        },
//        cacheDom: function () {
//            this.$el = $('#peopleModule');
//            this.$button = this.$el.find('button');
//            this.$input = this.$el.find('input');
//            this.$ul = this.$el.find('ul');
//            this.template = this.$el.find('#people-template').html();
//        },
//        bindEvents: function () {
//            this.$button.on('click', this.addPerson.bind(this));
//            this.$ul.delegate('i.del', 'click', this.deletePerson.bind(this));
//        },
//        render: function () {
//            var data = {
//                people: this.people
//            };
//            this.$ul.html(Mustache.render(this.template, data));
//        },
//        addPerson: function () {
//            this.people.push(this.$input.val());
//            this._render();
//            this.$input.val('');
//        },
//        deletePerson: function (event) {
//            var $remove = $(event.target).closest('li');
//            var i = this.$ul.find('li').index($remove);
//            this.people.splice(i, 1);
//            this._render();
//        }
//    };
//
//    people.init();
//})();


var people = (function () {
    var people = ['Yang', 'Gu'];

    //cache DOM
    var $el = $('#peopleModule');
    var $button = $el.find('button');
    var $input = $el.find('input');
    var $ul = $el.find('ul');
    var template = $el.find('#people-template').html();

    //bind events
    $button.on('click', addPerson);
    $ul.delegate('i.del', 'click', deletePerson);

    function _render() {
        $ul.html(Mustache.render(template, {people: people}));
        events.emit("peopleChanged", people.length);
    }

    _render();

    function addPerson(value) {
        var name = (typeof value === 'string') ? value : $input.val();
        people.push(name);
        _render();
        $input.val('');
    }

    function deletePerson(event) {
        var i;
        if(typeof event === 'number') {
            i = event;
        } else {
            var $remove = $(event.target).closest('li');
            i = $ul.find('li').index($remove);
        }
        people.splice(i, 1);
        _render();
    }

    return {
        addPerson: addPerson,
        deletePerson: deletePerson
    }

})();