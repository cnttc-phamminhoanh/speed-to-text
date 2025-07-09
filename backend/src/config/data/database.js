const dataSource = require('./dataSource')

let databaseInstall = null

const CONNECT_DB = async () => {
  databaseInstall = await dataSource.initialize()
}

const GET_DB = () => {
  if (!databaseInstall) {
    throw new Error('Must connect to Database first!')
  }

  return databaseInstall
}

const CLOSE_DB = async () => {
  await dataSource.destroy()
}

module.exports = {
  CONNECT_DB,
  GET_DB,
  CLOSE_DB
}
