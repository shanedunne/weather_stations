// import { weatherStationStore };

export const stationController = {
    async index(request, response) {
        const viewData = {
            title : "Station Dashboard",
        }
        console.log("station dashboard rendering");
        response.render("dashboard-view", viewData);
    }
}