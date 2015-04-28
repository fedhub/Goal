//// ---- Author - Shimon Swisa 300000098 ---- ////
var http = require('http');
var events = require('events');
var util = require('util');
var messages = require('./messages'); // require my own module
util.inherits(Goal, events.EventEmitter);

//-- Goal Object Constructor ------
function Goal () {
    this.balance = 0;
    events.EventEmitter.call(this);
}

//-- Goal Object prototypes ------
// Increase Goals
Goal.prototype.increase = function(amount) {
    this.balance += amount;
    this.emit('balanceChanged'); // fire event
};

// Decrease Goals and ensures positivity
Goal.prototype.decrease = function(amount) {
    var tmpBalance = this.balance;
    tmpBalance -= amount;
    if(tmpBalance < 0){
        var err_msg = '  ERROR: An attempt to decrease the goals balance ' +
            'by the amount of ' + amount + ', \n  that would cause the new ' +
            'balance to be ' + tmpBalance + ' which is negative, is illegal. ' +
            '\n  The balance will not be updated.';
        messages.updateBrowserMessage(err_msg); // update the screen message by accessing my module
        console.log(err_msg);
    }
    else this.balance -= amount;
    this.emit('balanceChanged'); // fire event
};

//-- Create Goal instance and attach callbacks to events ------
var goal = new Goal();
goal.on('balanceChanged', messages.displayBalance);

//-- run some methods ------
goal.increase(200);
goal.increase(200);
goal.decrease(500);

http.createServer(messages.reqHandler).listen('8080');