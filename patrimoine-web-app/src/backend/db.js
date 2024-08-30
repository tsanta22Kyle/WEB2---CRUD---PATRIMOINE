// import { query, text } from 'express';
//  import {pg} from 'pg';
 const {Pool} = require('pg')
const pool = new Pool({
    user: 'postgres',
    password: 'tsanta',
    host: 'localhost',
    port: 5432,
    database: 'patrimony'
})
 module.exports = {
    query: (text,params)=>pool.query(text,params)
};