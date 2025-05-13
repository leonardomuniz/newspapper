import cors from 'cors'
import express, { urlencoded } from 'express'
import path from 'path'
import { routers } from './framework/function/collection'
import populateServer from './framework/scrypts/populateServer'

const port = process.env.PORT || 3030
const app = express()
const publicPath = path.resolve(__dirname, '../public')

const start = async () => {
  app.use(cors())
  app.use(urlencoded({ extended: true }))
  app.use(express.json())
  app.use(routers)
  app.use('/app/public', express.static(publicPath))

  try {
    app.listen(port, () => {
      console.log(`Server is listening at http://localhost:${port}/`)
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  }

  populateServer()
}

start()
