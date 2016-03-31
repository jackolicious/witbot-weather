var amazon = require('amazon-product-api');

module.exports = function(amazonApiId, amazonSecret, amazonTag) {
  return new Amazon(amazonApiId, amazonSecret, amazonTag)
}

function Amazon(amazonApiId, amazonSecret, amazonTag) {
  var self = this

  self.get = function(item, fn) {
    var client = amazon.createClient({
      awsId: amazonApiId,
      awsSecret: amazonSecret,
      awsTag: amazonTag
    });
    //
    console.log(item)

    client.itemSearch({
      Keywords: item,
      responseGroup: 'ItemAttributes'//'ItemAttributes,Offers,Images'
    }, function(err, results, response) {
      if (err) {
        console.log('ERROR',err.Error[0])
      } else {
        //console.log('PRODUCTS',results);  // products
        if (results[0]) {
          //DetailPageURL
          //console.log(results[0].ItemAttributes[0].Title[0],'\n\n\n',results[0].DetailPageURL[0])
          //fn(null,'<'+results[0].DetailPageURL[0]+'|'+ results[0].ItemAttributes[0].Title[0] +'>')
          fn(null,{text: '> <'+results[0].DetailPageURL[0]+'|'+ results[0].ItemAttributes[0].Title[0] +'>',username: "wit",icon_emoji:':money_with_wings:'})
        } else {
          fn(null,'> Didn\'t find anything... sorry!')
        }
        //fn(null,'> :airplane: Going one-way from *'+ origin + '* to *' + destination + '* on *' + date + '*?\n'+'> Cheapest ticket found: *'+ data.trips.tripOption[0].saleTotal+'*')
        //console.log('RESPONSE',response); // response (containing TotalPages, TotalResults, MoreSearchResultsUrl and so on)
      }
    });


  }
}
