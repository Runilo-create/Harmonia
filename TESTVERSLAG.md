# Controleverslag — Harmonia Playground 0.2

## Automatische tests

18 tests geslaagd via `node tests/domain.test.mjs` (ook beschikbaar als `npm test`):

- Wederzijdse matching, afwijzingen en dubbele swipes.
- Geen swipes voor bedrijven/admin of naar het eigen profiel.
- Chat alleen binnen een beschikbare Harmony; correcte afzender en berichtvalidatie.
- Blokkeringen en schorsingen stoppen contact en meldingen.
- Event-eigenaarschap en conceptstatus voor ongeverifieerde bedrijven.
- Precies 60 studenten, 20 bedrijven, 40 events en unieke identifiers.
- Nieuwe-Harmony- en ongelezen-berichtstatus per ontvanger.
- Gelezen-status blijft correct na opslaan en opnieuw laden.
- Alle gepubliceerde events zijn zichtbaar ongeacht profielinteresses; categorie-filter werkt.
- Activiteit delen vereist een toegankelijke Harmony en gepubliceerd evenement.
- Interactie-reset wist de bedoelde gegevens en behoudt bewerkte content.
- Volledige reset herstelt alle demo-inhoud; alleen admin kan resetten.
- Migratie van v1 bewaart bestaande profielwijzigingen, events en gesprekken.
- Onbestaande kalenderdatums worden afgewezen.

## Browsercontroles

Uitgevoerd met afzonderlijke testgegevens op localhost, zodat de bestaande gebruikersdata op 127.0.0.1 bewaard bleef:

- Accountselectie, roltabs en zoeken op Noor.
- Nieuwe mobiele studenteninterface met vaste navigatie onderaan.
- Swipeknop en echte horizontale sleepbeweging leveren een Harmony op.
- Matchanimatie en overgang naar chat.
- Bericht versturen en sportevenement delen vanuit Explore.
- Sportfilter toont uitsluitend sportactiviteiten.
- Bij Luca: 1 nieuwe Harmony en 2 ongelezen berichten, ook na herladen.
- Gesprek openen wist de markeringen voor Luca.
- Beide resetknoppen in admin, bevestigingsdialoog en succesvolle uitvoering.
- Mobiele viewport 390 × 844: geen horizontale documentoverloop; swipeknoppen en navigatie zichtbaar.
- Geen console-errors gemeld tijdens deze browserflows.

## Starten en bestanden

- Launcher start de lokale server; een tweede uitvoering herkent de bestaande server en eindigt succesvol.
- De server geeft HTTP 200 en blijft bereikbaar.
- JavaScript-syntax gecontroleerd voor app, views, domein en service worker.
- De offlinecache is geïmplementeerd; een volledige offline/herstarttest is niet uitgevoerd.

Geen tests tegen echte gebruikers, maildiensten, telefoonpush of een externe database: deze lokale playground gebruikt die niet.
