const pg = require("pg");

const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const getFirstName = (last_name, callback) => {

  client.connect((err) => {

    if (err) {
      return console.error("Connection Error", err);
    }

    let query = "SELECT * FROM famous_people WHERE last_name = $1;"

    console.log('Searching');

    client.query(query, [last_name], (err, result) => {

      if (err) {
        return console.error("error running query", err);
        callback([]);
      }

      else {
        resultArr = [];
        for (i = 0; i < result.rows.length; i++) {
          resultArr.push(result.rows[i].first_name)
        }
        console.log(`Returning ${resultArr.length} results from query ${last_name}`)
        callback(resultArr);
      }

      client.end();

    });
  });
}

var input =  process.argv[2];

getFirstName(input, (res) => {

  res.forEach( (x) => { console.log(x) } )

})
