const Travel = require('../models/travel.models');

module.exports.findAllTravels = (req, res) => {
    Travel.find()
    .then(allTravels => res.json({travels: allTravels}))
    .catch(err => res.json({error: null}));
}

module.exports.createNewTravel = (req, res) => {

    console.log('llegue aqui',req.body);
    Travel.create(req.body)
    .then(newTravel => res.send({travel: newTravel}))
    .catch(err => res.send({errors: err}));
}

module.exports.getTravelByID = (req, res) => {
    Travel.findById(req.params.id)
    .then(singleTravel => res.json({travelData: singleTravel}))
    .catch(error => res.json({travelData: null}));
}

module.exports.updateExistingTravel = (req, res) => {
    Travel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(updateTravel => res.json({ travel: updateTravel }))
        .catch(err => res.json({ message: "Algo salió mal :(", error: err }));
};

module.exports.deleteExistingTravel = (req, res) => {
    Travel.findByIdAndDelete({ _id: req.params.id })
        .then(deleteTravel => res.json({ travelDeleted: deleteTravel }))
        .catch(err => res.json({ message: "Algo salió mal :(", error: err }));
};