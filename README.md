# Weather Station Website

Whether Station allows users to add weather stations to the account they set up, log or auto generate weather reports and view summaries, tables and graphs of weather data.


## Repo
The repo can be found here: [Github](https://github.com/shanedunne/weather_stations)

## Features

- **Weather Summaries**: Summaries for each station of recent weather reports + min and max values
- **Station Map**: A map marking all stations created by a user
- **Auto Generating Reports**: The ability to auto generate a report if the station exists in the OpenWeatherMap API
- **Login System**: The ability to create an account, login and logout
- **Trend Graphs**: A graph to show recent temperature trends based on reports

## Pages
### Index / Home
Home page prompting the user to either sign up or log in via the buttons in the nav bar

### Signup
- This page requests the users first name, last name, email address and desired password. 
- When the user provides this information and presses sign up, their data will be added to the users database along with a user ID. 
- A cookie is created to record their signed in status based on the users ID
- Users are then directed to the dashboard

### login
- If already a member, users provide their email and password and press log in
- Users are then directed to the dashboard

### Dashboard
- The dashboard is where the user can access, create and delete weather stations
- The user can add a weather station by providing the city name, latitude and longitude coordinates
- Once created, a section containing the city will appear along with a summary of recent weather. Summaries are only populated once a user adds or generates a report from the station view
- The dashboard also contains a map where the coordinates and station name provided by the user will be marked on a map

### Station View
- The station view contains all information related to a station.
- A weather summary containing a mix of the most recent conditions + weather min and max values is displayed, just like on the dashboard
- Next, a graph is displayed indicating the trend in temperature based on a max of the last 7 weather reports
- A table displays the weather reports, including timestamps, weather codes, temperature, wind speed, wind direction, pressure and a button to delete a report
- A form follows where users can manually input a weather report.
- - An external link containing all weather codes available in the system is featured in this form to ensure the user selects a verified code
- The user can also press the Auto Generate Report button which will access the OpenWeather API and return a report, provided the station is in existence. 

### Account
- The user can come and view their account information here. There is a button that will take them to the Account Edit view if they need to change some information

### Account Editing View
- The user is faced with a form pre-populated with their user information. They can change any items necessary.
- The user is redirected to the account page



## Use Cases
- Add local weather stations to a users account to see what the local weather is like nearby, by generating reports.

- A user can read weather reports from alternative sources and add them to a weather station for their own records

- A user can create a weather station and record their own data if they have the correct instrumentation




## Technologies used

- Javascript - for handling and rendering data and components
- Handlebars - as the HTML templating system to produce the pages
- Bulma - CSS Framework
- Express JS - As the server
- Axios - for fetching data from external APIs
- OpenWeatherMap - API for weather reports and codes
- Leaflet - Open source map integration for JS


