const knex = require('knex');

const settings = require("./settings"); // settings.json

const pg = knex({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
})

const getFirstName = (last_name, callback) => {

  console.log('Searching');

  pg.select('first_name')
  .from('famous_people')
  .where('last_name','=',last_name)
  .asCallback((err, result) => {
    if (err) return console.error("error running query", err)
    else {
      resultArr = [];
      for (i = 0; i < result.length; i++) {
        resultArr.push(result[i].first_name)
      }
      console.log(`Returning ${resultArr.length} results from query ${last_name}`)
      callback(resultArr);
      }
    })

  //pg.destroy();

};

input = process.argv[2]
getFirstName(input, (res) => {
  res.forEach( (x) => { console.log(x) } )
})