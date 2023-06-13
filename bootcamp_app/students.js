const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const input = process.argv.splice(2);
const month = input[0];
const limit = input[1];
const values = [`%${month}%`, limit];

pool.query(`
SELECT students.id, students.name, cohorts.name as cohort_name
FROM students
JOIN cohorts on cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
LIMIT $2;
`, values)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort_name} cohort`);
  })
}).catch(err => console.error('query error', err.stack));