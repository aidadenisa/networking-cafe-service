try {
  console.log('starting the app!')
} catch (error) {
  handleError(error)
}

function handleError(error: any) {
  console.log(error)
  process.exit(1)
}
