// import {Connector} from '@google-cloud/cloud-sql-connector';
const { Connector } = require('@google-cloud/cloud-sql-connector');
// import pg from 'pg';
const { Pool } = require('pg');

// const {Pool} = pg;

// const connector = new Connector();
// const clientOpts = connector.getOptions({
//     instanceConnectionName: 'vertical-karma-409118:us-central1:postgresql',
//     authType: 'IAM'
// });

// const pool = new Pool({
//     ...clientOpts,
//     user: 'postgresql',
//     database: 'hero_wired_assignment_database'
// });




const pool = new Pool({
  user: 'postgresql',
  host: '34.136.209.102',
  database: 'hero_wired_assignment_database',
  password: 'Vasu@123',
  port: 5432,
});

module.exports = pool;