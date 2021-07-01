import React, { useEffect, useState } from 'react'
import TravelServices from '../services/TravelServices';
import '../style/styles.css'
import { Link } from 'react-router-dom';
import { useParams, useHistory } from 'react-router-dom';
import Navigation from './Navigation'
import Swal from 'sweetalert2'



const Dashboard = () => {
    const { id } = useParams();
    const history = useHistory();
    const [travelList, setTravelList] = useState([]);
   
    const [travel, setTravel] = useState({})
    const travelService = new TravelServices;
    const [buttonMessage, setButtonMessage] = useState('');

    const getAllTravelsFromService = async ()=>{
        try {
            const List = await travelService.getAllTravels();
            setTravelList(List);
        } catch (err) {
            return err;
        }

    }
        
    const verModal = async (viaje) => {
        console.log(viaje)
        const { value: travel_seleted} = await Swal.fire({
            title: 'Select field validation',
            input: 'select',
            inputOptions: {
                pendiente: "Pendiente",
                en_curso: "En curso",
                completado: "Completado",
                oranges: 'Oranges'
            },
            inputPlaceholder: 'Select un estado del viaje',
            showCancelButton: true,

            inputValidator: (value) => {
                console.log(value)
                const newTravel = {...viaje, travel_state: value}
                return new Promise((resolve) => {
                //Cambiar o modificar el estado del viaje 
                if(value) {
                updateTravel(viaje._id,newTravel); 
                resolve(getAllTravelsFromService)
                } else {
                    resolve('Por favor selecciona un estado :)')
                    }
                })
            }
        })
        
        //agregar el setTravel
        
        } 
    
        const updateTravel = async (id, travel) =>{
        const updated = await travelService.updateTravel(id, travel);
        console.log("aqui estoy", updated)
        if(updated){
            await getAllTravelsFromService();
            Swal.fire(
            'Updated!',
            'El estado ha sido actualizado',
            'success'
        )
    }else{
        Swal.fire(
            'Error!',
            'No se ha podido completar',
            'error'
            )
            
        }
        history.push('/');
    }



    useEffect(()=>{
        getAllTravelsFromService();
    },[])

    return (
        <div className="container-prin">
            <Navigation/>
            <div className="container">
            <small>Administrador de viaje  
            </small>
            <form class="d-flex col-2">
                <input class="form-control me-2 col-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Buscar</button>
            </form>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Lugar de viaje</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Grupo del viaje</th>
                        <th scope="col">Estado del viaje</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        travelList.length > 0 && travelList.map((item) => (

                            <tr key={item._id} value={item._id}>
                                <td>{item.destiny}</td>
                                <td>{item.date_travel_iso}</td>
                                <td>{item.group_travel}</td>
                                <td>{item.travel_state}
                                <button  className="btn btn-sm btn-info m-2" value="travel_state " type="submit" onClick={() => verModal(item)}>Cambiar estado</button>
                                </td>
                                <td>
                                    <div className="btn-group btn-group-sm" role="group" aria-label="Basic mixed styles example">
                                        <Link to={`/product/${item._id}`}>
                                            <button type="button" className="btn btn-sm btn-warning m-2">Editar</button>
                                        </Link>
                                        <Link to={`/edit/${item._id}`}>
                                            <button type="button" className="btn btn-sm btn-danger m-2">Eliminar</button>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }


                </tbody>


            </table>

            </div>
        </div>
    )
}

export default Dashboard
