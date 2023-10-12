import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import cors from 'cors'

import routes from './shared/routes'
import uploadConfig from './config/upload'
import AppError from './shared/errors/AppError'

const app = express()

import './shared/database'

app.use(express.json())
app.use(cors())

app.use('/files', express.static(uploadConfig.directory))

app.use(routes);// Rotas

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if(err instanceof AppError) {// Se foi um erro originado pela aplicação
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

app.listen(3333, () => {
  console.log(`~ server running on port ${3333}`);
})
