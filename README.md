# Info
Scraper for football stats data from Soccerway.com

# Methods
scrapeLeague(leagueOptions)
---
Scrapes data for a single league season

leagueOptions is an object with parameters country, league and season

Returns a promise, which resolves with an league stats object

scrapeMany(list)
---
Scrapes data for a list of leagues, an array of leagueOptions objects

Returns a promise, which resolves with an array of league stats objects
