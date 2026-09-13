# Harmonia via GitHub Pages

De code is voorbereid, maar er is nog geen GitHub-repo aangemaakt of gekoppeld en er is nog niets gepubliceerd.

## Instellen

1. Maak een repository aan, bijvoorbeeld `harmonia-playground`.
2. Plaats de inhoud van deze map in de root van de repo op branch `main`, inclusief `.github/workflows/pages.yml`.
3. Kies in GitHub **Settings → Pages → Build and deployment → Source → GitHub Actions**.
4. Start de workflow **Publish Harmonia playground** via Actions, of push een wijziging naar main.
5. Open de URL uit de geslaagde deployment, doorgaans `https://GEBRUIKERSNAAM.github.io/harmonia-playground/`.

De workflow voert de gedragstests uit en publiceert alleen de map `dist`. Een push op `main` werkt de demo automatisch bij. Je lokale server hoeft niet aan te staan voor deze online versie.

Met GitHub Free vereist Pages een openbare repository: de broncode is dan zichtbaar. Private repositories met Pages vereisen een geschikt betaald GitHub-plan. De Pages-demo is normaal publiek bereikbaar, ook als de repository privé is.

De huidige app heeft alleen fictieve accounts en lokale browseropslag. Alle bezoekers krijgen dezelfde beginprofielen, maar ieder heeft eigen swipes, chats en wijzigingen. Een reset wist uitsluitend de gegevens van de browser waarin je reset. De online URL krijgt een eigen lege opslag ten opzichte van de localhost-versie.

Service worker en manifest gebruiken relatieve paden zodat de demo zowel op localhost als onder een GitHub-repositorypad werkt.
