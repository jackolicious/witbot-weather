var QpxBot = require('qpx-express');

module.exports = function(token) {
  return new Flights(token)
}

function Flights(token) {
  var self = this

  self.get = function(origin, destination, date, fn) {
    var qpx = new QpxBot(token);
    console.log(origin, destination, date,'asdf')

    var body = {
    	"request": {
    	    "passengers": { "adultCount": 1 },
    	    "slice": [{
    	        "origin": origin,
    	        "destination": destination,
    	        "date": date // YYYY-MM-DD
    	      }
            //,
    	      //{
    	      //  "origin": destination,
    	      //  "destination": origin,
    	      //  "date": returningDate // YYYY-MM-DD
    	      //}
    	    ]
    	  }
    	};
    qpx.getInfo(body, function(error, data){
      fn(null,' > :airplane: Going one-way from *'+ origin + '* to *' + destination + '* on *' + date + '*?\n'+
        ' > Cheapest ticket found: '+ data.trips.tripOption[0].saleTotal)
    	console.log('Cheapest one-way flight found: ', data.trips.tripOption[0].saleTotal);
    });


  }
}
