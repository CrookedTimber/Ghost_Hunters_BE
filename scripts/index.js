const server = require('./server')

let port = process.env.PORT || 5000;


server.listen(port, () => console.log(`\nExpress departing now from port ${port}!\n`))
