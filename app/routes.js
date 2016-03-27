var Food = require('./models/food');
var Order = require('./models/order');

function getFoods(res) {
    Food.find(function (err, foods) {

        if (err) {
            res.send(err);
        }

        res.json(foods); // return all foods in JSON format
    });
};

function getOrders(res) {
    Order.find().populate('food').exec(function (err, orders) {

        if (err) {
            res.send(err);
        }
        res.json(orders); // return all orders in JSON format
    });
};

function getOrderTotal(res) {
 Order.find(function (err, orders) {

        if (err) {
            res.send(err);
        }
        var total = orders.reduce(function (total, order) {
            total += order.price + (0.075 * order.price);
            return total;
        }, 0);

        var subtotal = orders.reduce(function (subtotal, order) {
            subtotal += order.price 
            return subtotal;
        }, 0);        

        res.json({total:total, subtotal:subtotal}); // return total and subtotal object
    });
}


module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all foods
    app.get('/api/foods', function (req, res) {
        getFoods(res);
    });

    // get order total
    app.get('/api/total', function (req, res) {
        getOrderTotal(res);
    });

    
    // create food and send back all foods after creation
    app.post('/api/foods', function (req, res) {

        // create a food, information comes from AJAX request from Angular
        Food.create({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            done: false
        }, function (err, food) {
            console.log(err);
            if (err)
                res.send(err);

            // get and return all the foods after you create another
            getFoods(res);
        });

    });

        app.post('/api/order', function (req, res) {

        // create an order, information comes from AJAX request from Angular
        Order.create({
            food: req.body.food._id,
            price: req.body.price
        }, function (err, food) {
            if (err)
                res.send(err);

            // get and return all the foods after you create another
            getOrders(res);
        });

    });
    // delete a food
    app.delete('/api/foods/:food_id', function (req, res) {
        Food.remove({
            _id: req.params.food_id
        }, function (err, food) {
            if (err)
                res.send(err);
            getFoods(res);
        });
    });
};