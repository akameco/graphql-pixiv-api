const express = require('express')
const graphqlHTTP = require('express-graphql')
const compression = require('compression')
const Pixiv = require('pixiv-app-api')
const schema = require('./schema')

const app = express()
app.use(compression())

const { PIXIV_USER, PIXIV_PASS, PORT = 3000 } = process.env

const noop = () => {}

const resolver = {
  ranking: async ({ mode = 'day' }) => {
    const pixiv = new Pixiv(PIXIV_USER, PIXIV_PASS)
    const { illusts } = await pixiv.illustRanking({ mode }).catch(noop)
    return illusts
  },
}

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: resolver,
    graphiql: true,
  })
)

app.listen(PORT, () => {
  console.log(
    `Running a GraphQL API server at http://localhost:${PORT}/graphql`
  )
})
