
var twit = require('twit');
var config = require('./config.js');
var Twitter = new twit(config);
// const bot = new Twit(config)

// function postStatus() {
//     bot.post('statuses/update', {
//         status: 'hello world!'
//       }, (err, data, response) => {
//         if (err) {
//           console.log(err)
//         } else {
//           console.log(`${data.text} tweeted!`)
//         }
//       })
// }
  

var favoriteTweet = function(){
    var params = {
        q: '#code',  // REQUIRED
        result_type: 'recent',
        lang: 'en'
    }
    // find the tweet
    Twitter.get('search/tweets', params, function(err,data){
  
      // find tweets
      var tweet = data.statuses;
      var randomTweet = ranDom(tweet);   // pick a random tweet
  
      // if random tweet exists
      if(typeof randomTweet != 'undefined'){
        // Tell TWITTER to 'favorite'
        Twitter.post('favorites/create', {id: randomTweet.id_str}, function(err, response){
          // if there was an error while 'favorite'
          if(err){
            console.log('CANNOT BE FAVORITE... Error');
            console.log(err)
          }
          else{
            console.log('FAVORITED... Success!!!');
          }
        });
      }
    });
  }
  // grab & 'favorite' as soon as program is running...
  favoriteTweet();
  // 'favorite' a tweet in every 60 minutes
setInterval(favoriteTweet, 3600000);
  
function ranDom (arr) {
  var index = Math.floor(Math.random()*arr.length);
  return arr[index];
};