import express from 'express';
import { Liquid } from 'liquidjs';
// import { graphql, buildSchema } from 'graphql';

const app = express()

// Maak werken met data uit formulieren iets prettig
app.use(express.urlencoded({ extended: true }))

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static('public'))

// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine('liquid', engine.express());

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views')




// Snapmaps

const groupsResponse = await fetch('https://fdnd-agency.directus.app/items/snappthis_group?fields=name,uuid,snappmap.snappthis_snapmap_uuid.*.*.*&filter[uuid][_eq]=6d82507e-9bc9-452e-a768-a1bb90d7a37d')
const groupsJSON = await groupsResponse.json()


app.get('/snappmaps', async function (request, response) {

  response.render('snappmaps.liquid', { groups: groupsJSON.data, currentPage: '' })
})




app.get('/snappmaps/:uuid', async function (request, response) {

  const snappmapResponse = await fetch('https://fdnd-agency.directus.app/items/snappthis_snapmap?fields=*.*.*&filter[uuid][_eq]=' + request.params.uuid)
  const snappmappJSON = await snappmapResponse.json()
  const path = request.path

  response.render('snappmap.liquid', { snappmap: snappmappJSON.data, groups: groupsJSON.data, path: path, currentPage: '' })
})











// Snapps


app.get('/snapps/:location', async function (request, response) {

  const snappsResponse = await fetch('https://fdnd-agency.directus.app/items/snappthis_snap?fields=*.*&filter[location][_eq]=' + request.params.location)
  const snappsJSON = await snappsResponse.json()


  response.render('snappmap.liquid', { snapps: snappsJSON.data, currentPage: 'snappmaps' })
})


app.get('/snapps/snappmap/:uuid', async function (request, response) {

  const snappResponse = await fetch('https://fdnd-agency.directus.app/items/snappthis_snap?fields=*.*&filter[uuid][_eq]=' + request.params.uuid)
  const snappJSON = await snappResponse.json()

  response.render('snapp.liquid', { snapp: snappJSON.data[0], groups: groupsJSON.data, path: request.path, currentPage: '' })
})

app.get('/snapps/location/:uuid', async function (request, response) {

  const snappResponse = await fetch('https://fdnd-agency.directus.app/items/snappthis_snap?fields=*.*&filter[uuid][_eq]=' + request.params.uuid)
  const snappJSON = await snappResponse.json()

  response.render('snapp.liquid', { snapp: snappJSON.data[0], groups: groupsJSON.data, path: request.path, currentPage: '' })
})


app.get('/snapps/user/:uuid', async function (request, response) {

  const snappResponse = await fetch('https://fdnd-agency.directus.app/items/snappthis_snap?fields=*.*&filter[author][uuid][_eq]=' + request.params.uuid)
  const snappJSON = await snappResponse.json()

  response.render('snappmap.liquid', { snapps: snappJSON.data, path: request.path, currentPage: '' })
})








app.use((req, res) => {
  res.status(404).render('404.liquid')
})



app.post('/', async function (request, response) {
  // Je zou hier data kunnen opslaan, of veranderen, of wat je maar wilt
  // Er is nog geen afhandeling van een POST, dus stuur de bezoeker terug naar /
  response.redirect(303, '/')
})

// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000, als dit ergens gehost wordt, is het waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)

// Start Express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}/snappmaps`)
})