# Harmonia Playground 0.2

**Find your harmony.** Een lokale telefoonapp om te swipen, design te testen en vrij te experimenteren. Geen publicatie of productieomgeving.

## Meteen gebruiken

Open **http://127.0.0.1:4173/**. De server draait op de achtergrond.

- Later opnieuw openen: gebruik dezelfde link.
- Na een herstart van de computer: dubbelklik op **START.cmd**. Dit start de server verborgen en opent de browser.
- Nogmaals starten is veilig: de launcher herkent een bestaande Harmonia-server.
- Node.js 18 of nieuwer is nodig. Geen installatie van npm-pakketten nodig.
- Handmatig starten: `npm start`. Achtergrondstart: `npm run launch`.
- Je gegevens blijven in dezelfde browser bewaard. Browsergegevens wissen verwijdert ze.

De link werkt op deze computer. De mobiele vormgeving werkt ook in een smal browservenster; dit is geen gedeelde online app voor meerdere apparaten.

De app cachet de belangrijkste bestanden voor offline gebruik na het eerste laden. Een al geladen app blijft bruikbaar als de server wegvalt; voor nieuwe code of bij een lege cache start je de server via START.cmd. De cache vervangt geen back-up van je testgegevens.

## Wat is nieuw?

- Telefooninterface op elk scherm, met Discover, Harmonies, Explore en Profiel vast onderaan.
- Find your harmony als nieuwe tekst en merkrichting.
- Meebewegende swipekaarten met feedback, uitzwaai-animaties en een Harmony-animatie. Animaties respecteren verminderde-bewegingsinstellingen.
- 60 fictieve studenten, 20 bedrijven, 1 admin en 40 activiteiten. Twee bedrijven zijn ongeverifieerd, hun vier activiteiten zijn concepten.
- Accountzoeker met tabs voor studenten, bedrijven en admin.
- Nieuwe Harmonies en ongelezen berichten hebben eigen gelezen-status per ontvanger. Ze blijven zichtbaar na accountwissel of opnieuw laden en verdwijnen zodra je het gesprek opent.
- Explore toont alle gepubliceerde activiteiten van actieve, geverifieerde bedrijven, onafhankelijk van profielinteresses. Filters: Alles, Koffie, Muziek, Sport, Quiz, Cultuur, Gaming, Eten en Buiten.
- Activiteiten bewaren en delen met een Harmony, vanuit Explore of de chat.
- Twee afzonderlijke resets bovenaan in de adminomgeving.

## De resets

**Admin → Overzicht → Reset interacties**

Wist alle swipes, Harmonies, berichten, meldingen, blokkeringen en bewaarde activiteiten. Bewaart je profielwijzigingen, bedrijfsgegevens, verificaties, schorsingen en aangemaakte/bewerkte evenementen. Na deze reset zijn er geen vooraf ingevulde likes meer: speel beide accounts om een match te maken.

**Admin → Overzicht → Reset volledige demo**

Herstelt alle fictieve profielen en evenementen en verwijdert alle eigen testwijzigingen. De standaard inkomende likes worden opnieuw klaargezet; matches en chats beginnen leeg. Voorbeeldevenementen krijgen datums in de komende vier weken.

De vorige v1-browsergegevens worden bij de eerste update uitgebreid zonder bestaande profielen, gesprekken of evenementen weg te gooien. De oorspronkelijke v1-opslag blijft als oude kopie staan. De twee resets werken op de nieuwe versie.

## Snelle testroute

1. Kies Noor. Swipe Luca naar rechts: hij heeft Noor in de begingegevens al geliket.
2. Open de nieuwe Harmony, stuur een bericht en deel een activiteit via **Deel een activiteit**.
3. Wissel naar Luca. Bekijk de teller en nieuwe-Harmonybanner. Open Harmonies en daarna het gesprek; de gelezen markeringen verdwijnen.
4. Ga naar Explore. Kies Sport, bewaar een activiteit en gebruik de Bewaard-filter. Kies Alles voor de volledige feed.
5. Wissel naar Café Cadans. Bewerk of maak een evenement; bekijk het daarna vanuit een studentenaccount.
6. Wissel naar Harmonia Admin en probeer beide resets.

Noor heeft meer vooraf ingestelde inkomende likes om herhaaldelijk matchanimaties te proberen. Er worden geen automatische chatantwoorden of onvoorwaardelijke matches verzonnen. Alle accounts zijn zelf te bedienen.

## Mappenstructuur

```text
harmonia/
  START.cmd                  Start de achtergrondserver en open de browser
  package.json               npm start, npm run launch, npm test
  README.md                  Handleiding
  TESTVERSLAG.md             Uitgevoerde controles
  dist/
    index.html               Appdocument en metadata
    styles.css               Gedeelde basis en beheeromgeving
    mobile.css               Telefooninterface en animaties
    manifest.webmanifest     Appmetadata
    icon.svg                 Appicoon
    sw.js                    Lokale offlinecache
    src/
      app.js                 Navigatie, interacties en lokale opslag
      views.js               Studentenschermen en accountkeuze
      domain.js              Matching, meldingen, events, migratie en resets
      data.js                Alle fictieve begingegevens
  scripts/
    server.mjs               Lokale HTTP-server
    launch.mjs               Controleert/start de verborgen server
  tests/
    domain.test.mjs          18 herhaalbare gedragstests
```

## Grenzen van de playground

De app gebruikt localStorage voor gegevens en sessionStorage voor de actieve accountkeuze per tab. Tabs binnen dezelfde browser/oorsprong ontvangen elkaars opgeslagen wijzigingen; apparaten en verschillende browsers delen geen database. De accountwisselaar is bedoeld om te testen, niet als echte authenticatie. Profielen hebben gestileerde initialen; echte schoolmailverificatie, foto-opslag en telefoonpushmeldingen zijn geen onderdeel van deze versie. Lettertypen laden optioneel via Google Fonts; de app heeft lokale fallbacklettertypen.
