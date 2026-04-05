# Server-Side Website

Ontwerp en ontwikkel een server-side website voor een opdrachtgever

## Beschrijving
<!-- In de Beschrijving staat kort beschreven wat voor project het is en wat je hebt gemaakt -->
<!-- Voeg een mooie poster visual toe 📸 -->
<!-- Voeg een link toe naar Github Pages 🌐-->

In deze repo zie je de eerste sprint voor het SnappThis project.

Snappthis is een mobiele webapplicatie waarmee gebruikers foto's delen binnen zogenoemde snappmaps. Een gebruiker wordt uitgenodigd in een groep; die groep kan meerdere snappmaps bevatten. Een begeleider, bijvoorbeeld een docent, maakt een snappmap aan en geeft deze een thema of opdracht. Deelnemers delen hierin zelfgemaakte foto's, die dienen als inspiratie en gespreksonderwerp vanuit de echte wereld.

Deze sprint stond volledig in het teken van de **GET** methode. Het ging er dus om dat wij uit de aangeleverde database, de data gebruikte als content van deze website. Zodat de website **dynamisch** is en aangevuld kan worden vanuit de database.

<img width="361" height="743" alt="Screenshot 2026-04-05 at 19 31 57" src="https://github.com/user-attachments/assets/b6aae205-a812-4256-9b5c-d12be134489b" />


[Link naar de live website.](https://server-side-rendering-server-side-website-m2eo.onrender.com/)

## Kenmerken
Deze website is met NodeJS, ExpressJS en LiquidJS gemaakt. Met NodeJS haal ik door middel van een fetch de data uit de database(directus), die geef ik vervolgens als JSON met een render mee aan een view. De view is eigenlijk een bestand net als HTML waarin je de structuur maakt. In de view werk je met Liquid om de JSON data om te zetten in content. Liquid is Server-side wat voordelig is aangezien de browser dan HTML ontvangt. Dit is goed voor performance en accessibility.

Hier is een stukje code van de server die de data uit de fetch mee geeft aan de view:
```
app.get('/snappmaps/:uuid', async function (request, response) {

  const snappmapResponse = await fetch('https://fdnd-agency.directus.app/items/snappthis_snapmap?fields=*.*.*&filter[uuid][_eq]=' + request.params.uuid)
  const snappmappJSON = await snappmapResponse.json()
  const path = request.path

  response.render('snappmap.liquid', { snappmap: snappmappJSON.data, groups: groupsJSON.data, path: path, currentPage: '' })
})

```


Hier is een stukje code van Liquid die je JSON data gebruikt als content:
```
  <ul class="grid-view">
    {% for snappmap in snappmap %}
      {% for snapp in snappmap.snaps %}
        {% if snapp.picture.id != null %}
          <li>
            <a href="/snapps/snappmap/{{ snapp.uuid }}">
              <img
                src="https://fdnd-agency.directus.app/assets/{{ snapp.picture.id }}"
                alt="Image made in {{ snapp.location }}"
                loading="lazy"
              >
            </a>
          </li>
        {% endif %}
      {% endfor %}
    {% endfor %}
```

## Installatie
Als je zelf aan dit project wilt werken is de eerste stap na het clonen `npm install` te doen, dit doe je in de terminal van de code editor. Hiermee zorg je er voor dat alle benodigde packages geinstalleerd worden in het project.

Wil je een nieuwe pagina? Maak een nieuwe `app.get` route en maak een nieuwe view aan in de map views.

Test de website locaal door middel van `npm start`

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
