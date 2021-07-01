import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap'
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";
import TravelService from '../services/TravelServices';
import Navigation from './Navigation'
import Swal from 'sweetalert2'



    const NewTravelForm = () => {
        const travelService = new TravelService;
        const { id } = useParams();
        const history = useHistory();
        const initialState = {
            "destiny": '',
            "date_travel_iso": '',
            "group_travel": '',
            "travel_state": ''
        }
        const [travel, setTravel] = useState(initialState);
        const [error, setError] = useState('');
        const [buttonMessage, setButtonMessage] = useState('');

        const getASingleTravelFromService = async () => {
            try {
                const singleTravel = await travelService.getOneSingleTravel(id);
                singleTravel(singleTravel);
            } catch (err) {
                return err;
            }
    
        }
        const createTravel = async (e) =>{
            e.preventDefault();
            const created = await travelService.createTravel(travel);
            if(created){
                Swal.fire(
                'Added!',
                'Your travel has been added.',
                'success'
                )
                setTravel(initialState);
                history.push('/');
                }
            }
            
            const updateTravel = async (e) =>{
                e.preventDefault();
                const updated= await travelService.updateTravel(id,travel);
                if(updated){
                    Swal.fire(
                        'Updated!',
                        'Your travel has been updated.',
                        'success'
                        )
                        history.push('/');
                    }else{
                        Swal.fire(
                            'Error!',
                            'Debe completar todos los campos requeridos',
                            'error'
                            )
                            
                        }
                    }
                    
                    const handleCommit = (e)=>{
                        id ? updateTravel(e) : createTravel(e);   
                        
                    }

                    const handleChangeInput = (e)=>{
                        if(e.target.name==='destiny'){
                            (e.target.value.length >0 && e.target.value.length <3) ? setError('* El nombre debe tener por lo menos 3 caracteres') : setError('')
                        }else if(e.target.name==='group_travel'){
                            (e.target.value.length >0 && e.target.value.length <3) ? setError('* El tipo de mascota debe tener por lo menos 3 caracteres') : setError('')
                            
                        }else if(e.target.name==='travel_state'){
                            (e.target.value.length >0 && e.target.value.length <3) ? setError('* La descripcion debe tener por lo menos 3 caracteres') : setError('')
                        }
                
                        setTravel({...travel, [e.target.name]: e.target.value});    
                    }

                    const onChange = (e) => {
                        e.preventDefault();
                        setTravel({...travel, [e.target.name]: e.target.value}); 
                    }
                    
                
                    useEffect(()=>{
                        if (id){
                            getASingleTravelFromService();
                            setButtonMessage('Editar');
                
                        }
                        else{
                            setButtonMessage('Add');
                
                        }
                    },[])
            
    
        return (
            <div className="container-prin">
                <Navigation/>
                <Form onSubmit={(e)=>handleCommit(e)}>
                    <div className="card-body col-4 m-3"> 
                        <input class="form-control form-control-lg m-4" type="text"  placeholder="Lugar de destino" aria-label=".form-control-lg example" name="destiny" value={travel.destiny} onChange={(e) => handleChangeInput(e)}/>
                        <input class="form-control form-control-lg m-4" type="date" placeholder="Fecha" aria-label=".form-control-lg example" name="date_travel_iso" value={travel.date_travel_iso} onChange={(e) => handleChangeInput(e)}/>
                        <input class="form-control form-control-lg m-4" type="text" placeholder="Grupo de viajeros" aria-label=".form-control-lg example" name="group_travel" value={travel.group_travel} onChange={(e) => handleChangeInput(e)}/>
                        <select class="form-select m-4" id="inputGroupSelect01" name="travel_state" value={travel.travel_state} onChange={(e) => handleChangeInput(e)}>
                            <option selected value={travel.travel_state} onChange={(e) => onChange(e)}>Elije un estado del viaje</option>
                            <option className="m-3" value="Pending">Pendiente</option>
                            <option className="m-3" value="Cursed">En curso</option>
                            <option className="m-3" value="Completed">Completado</option>
                        </select>
                        <div className="row mb-3">
                                    <div className="col-4">
                                    {error ? (
                                            <button type="submit" className="btn btn-primary btn-lg disabled">{buttonMessage}</button>
                                        ) :(
                                            <button type="submit" className="btn btn-primary btn-lg">{buttonMessage}</button>
                                        )}
                                    </div>
                                    
                                </div>
                    </div>
                </Form>
            </div>
        )

}

export default NewTravelForm
