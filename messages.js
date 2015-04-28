//-- the callbacks functions ------
// export the functions

var browser_msg = '';

// Updating the string that will be printed to browser at the end
// Including all the console messages
exports.updateBrowserMessage = function(msg){
    browser_msg += msg + '<br>';
};

// Displays the current goals balance
exports.displayBalance = function() {
    var msg = ' Goals balance is: ' + this.balance;
    browser_msg += msg + '<br>';
    console.log(msg);
};

// The messages are available in browser when finish
exports.reqHandler = function(req, res) {
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end(browser_msg);
};