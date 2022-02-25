import { response } from 'express'
import {createConnection} from 'typeorm'

createConnection()
  .then(response => {
    console.log('~ database connected')
  })
  .catch(error => {
    console.log('~ ' + error)
  })
