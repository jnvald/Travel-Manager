const TravelController = require('../controllers/travel.controller');

module.exports = app => {
    app.get('/api/travels', TravelController.findAllTravels);
    app.get('/api/travels/:id', TravelController.getTravelByID);
    app.post('/api/travels/new', TravelController.createNewTravel);
    app.put("/api/travels/update/:id", TravelController.updateExistingTravel);
    app.delete("/api/travels/delete/:id", TravelController.deleteExistingTravel);
}