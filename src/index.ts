import express from 'express'
try {
  const httpServer = express()
  const PORT = 3200

  httpServer.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!!!`)
  })
} catch (error) {
  handleError(error)
}

function handleError(error: any) {
  console.log(error)
  process.exit(1)
}
