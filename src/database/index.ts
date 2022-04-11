import { response } from 'express'
import {createConnection} from 'typeorm'

createConnection()// Connect
  .then(response => {
    console.log('~ database connected')
  })
  .catch(error => {
    console.log('~ ' + error)
  })
