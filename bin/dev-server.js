const express = require('express')
const app = express()
const fs = require('fs')

app.get('/',(req,res,next) => {
  let html = '<!DOCTYPE html><html><head><title>Dynamic Scrollspy Tests</title></head><body><ul>'
  let htmls = fs.readdirSync('./tests/')

  htmls.forEach((h) => {
    html += `<li><a href="/${h}">${h}</li>`
  })
  html += '</ul></body></html>'

  res.send(html)
  next()
})
app.use(express.static('./tests'))
app.use('/js/', express.static('./dist'))
app.use('/src/', express.static('./src'))

app.listen(3000, () => {
  console.log('listening on 3000')
})
