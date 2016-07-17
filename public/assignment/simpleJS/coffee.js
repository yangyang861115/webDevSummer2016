$(function () {
    var $orders = $('#orders');
    var $name = $('#name');
    var $drink = $('#drink');

    var orderTemplate = $('#order-template').html();

    function addOrder(order) {
        $orders.append(Mustache.render(orderTemplate, order));
    }

    //Get all orders
    $.ajax({
        type: 'GET',
        url: '/api/coffee',
        success: function (orders) {
            $.each(orders, function (idx, order) {
                addOrder(order);
            })

        },
        error: function () {
            alert('error loading orders');
        }
    });

    //Add a new order
    $("#add-order").on('click', function () {
        var order = {
            name: $name.val(),
            drink: $drink.val()
        };

        $.ajax({
            type: 'POST',
            url: '/api/coffee',
            data: order,
            success: function (order) {
                addOrder(order);
                $name.val('');
                $drink.val('');
            },
            error: function () {
                alert('error adding new order');
            }

        });
    });

    //Delete an order
    $orders.delegate('.remove', 'click', function () {
        var $li = $(this).closest('li');
        $.ajax({
            type: 'DELETE',
            url: '/api/coffee/' + $(this).attr('data-id'),
            success: function (msg) {
                $li.fadeOut(300, function () {
                    $(this).remove();
                });
            },
            error: function () {
                alert('error deleting order');
            }

        });
    });

    //update an order
    $orders.delegate('.editOrder', 'click', function () {
        var $li = $(this).closest('li');
        $li.find('input.name').val($li.find('span.name').html());
        $li.find('input.drink').val($li.find('span.drink').html());
        $li.addClass('edit');
    })

    $orders.delegate('.cancelEdit', 'click', function () {
        var $li = $(this).closest('li');
        $li.removeClass('edit');
    })

    $orders.delegate('.saveEdit', 'click', function () {
        var $li = $(this).closest('li');
        var order = {
            name: $li.find('input.name').val(),
            drink: $li.find('input.drink').val()
        };
        $.ajax({
            type: 'PUT',
            url: '/api/coffee/' + $li.attr('data-id'),
            data: order,
            success: function (newOrder) {
                $li.find('span.name').html(order.name);
                $li.find('span.drink').html(order.drink);
                $li.removeClass('edit');
            },
            error: function () {
                alert('error updating order');
            }
        });

    })

});