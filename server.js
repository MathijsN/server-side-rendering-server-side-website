import express from 'express'
import { Liquid } from 'liquidjs';

// Doe een fetch naar de data die je nodig hebt
// const apiResponse = await fetch('...')

// Lees van de response van die fetch het JSON object in, waar we iets mee kunnen doen
// const apiResponseJSON = await apiResponse.json()

// Controleer eventueel de data in je console
// (Let op: dit is _niet_ de console van je browser, maar van NodeJS, in je terminal)
// console.log(apiResponseJSON)


// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

// Maak werken met data uit formulieren iets prettiger
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



// const allSnappmapsApiURL = 'https://fdnd-agency.directus.app/items/snappthis_snapmap?fields=*.*'
// const allSnappmaps = await fetch(allSnappmapsApiURL)
// const allSnappmapsResJSON = await allSnappmaps.json()

// app.get('/', async function (request, response) {
//   response.render('index.liquid', { allSnappmaps: allSnappmapsResJSON.data })
// })

// app.get('/snappmaps/filter/:uuid', async function (request, response) {

//   const snappmapFilteredApiURL = 'https://fdnd-agency.directus.app/items/snappthis_snapmap?fields=*.*&filter[uuid][_eq]=' + request.params.uuid
//   const snappmapFiltered = await fetch(snappmapFilteredApiURL)
//   const snappmapFilterResJSON = await snappmapFiltered.json()

//   response.render('snappmap.liquid', { snappmapsFiltered: snappmapFilterResJSON.data, allSnappmaps: allSnappmapsResJSON.data })
// })

// app.get('/snappmaps/location/:location', async function (request, response) {

//   const snappmapLocationApiURL = 'https://fdnd-agency.directus.app/items/snappthis_snap?fields=*.*.*&filter[location][_eq]=' + request.params.location
//   const snappmapLocation = await fetch(snappmapLocationApiURL)
//   const snappmapLocationResJSON = await snappmapLocation.json()

//   response.render('snappmap.liquid', { snappmapsFiltered: snappmapLocationResJSON.data })
// })

// app.get('/snappmaps/snapp/:uuid', async function (request, response) {

//   const snapApiURL = 'https://fdnd-agency.directus.app/items/snappthis_snap?fields=*.*&filter[uuid][_eq]=' + request.params.uuid
//   const snap = await fetch(snapApiURL)
//   const snapResJSON = await snap.json()

//   response.render('snapdetail.liquid', { snap: snapResJSON.data[0] })
// })







app.get('/snappmaps', async function (request, response) {

  const snappmapsResponse = await fetch('https://fdnd-agency.directus.app/items/snappthis_group?fields=name,uuid,snappmap.snappthis_snapmap_uuid.*.*.*&filter[uuid][_eq]=6d82507e-9bc9-452e-a768-a1bb90d7a37d')
  const snappmapsJSON = await snappmapsResponse.json()

  response.render('snappmaps.liquid', { group: snappmapsJSON.data[0] })
})

app.get('/snappmaps/:uuid', async function (request, response) {

  const snappmapResponse = await fetch('https://fdnd-agency.directus.app/items/snappthis_snapmap?fields=*.*.*&filter[uuid][_eq]=' + request.params.uuid)
  const snappmappJSON = await snappmapResponse.json()

  response.render('snappmap.liquid', { snappmap: snappmappJSON.data[0] })
})


app.get('/snapps/:uuid', async function (request, response) {

  const snappResponse = await fetch('https://fdnd-agency.directus.app/items/snappthis_snap?fields=*.*&filter[uuid][_eq]=' + request.params.uuid)
  const snappJSON = await snappResponse.json()

  response.render('snapp.liquid', { snapp: snappJSON.data[0] })
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
  console.log(`Application started on http://localhost:${app.get('port')}`)
})




// https://fdnd-agency.directus.app/items/snappthis_group?fields=name,uuid,snappmap.snappthis_snapmap_uuid.*.*.* Alle groups + alle andere velden er in