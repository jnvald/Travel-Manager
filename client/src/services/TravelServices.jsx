import axios from 'axios';

export default class TravelServices {

    constructor() {}

    async getOneSingleTravel(id) {
        try {
            
            const travels = await axios.get(`http://localhost:8000/api/travels/${id}`)
            return travels.data.travelData;
        } catch(err) {
            return err;
        }
    };

    async getAllTravels() {
         try {
            const TravelList = await axios.get('http://localhost:8000/api/travels');
            console.log(TravelList)
            return TravelList.data.travels;

        } catch (error) {
            return error;
        }
    }

    async createTravel(travel) {
        try {
            const newTravels = await axios.post(`http://localhost:8000/api/travels/new`, travel)
            return newTravels.data.travel;
        } catch(err) {
            return err;
        }
    }

    async updateTravel(id, travel) {
        try {
            const updatedTravel = await axios.put(`http://localhost:8000/api/travels/update/${id}`, travel)
            return updatedTravel.data.travel;
        } catch(err) {
            return err;
        }
    }

    async deleteTravel(id) {
        try {
            const deleteTravel = await axios.delete(`http://localhost:8000/api/travels/delete/${id}`)
            return deleteTravel.data.travelDeleted;
        } catch(err) {
            return err;
        }
    }

    async registerUser(user) {
        try {
            const response = await axios.post('http://localhost:8000/api/users/new', user);
            return response.data.user;
        } catch(err){
            return err;
        }
    }

    async loginUser(user) {
        try {
            const response = await axios.get('http://localhost:8000/api/users/login', user);
            return response.data.user;
        } catch(err){
            return err;
        }
    }



};