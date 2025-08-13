import React, {useEffect, useState} from 'react';
import './text.scss'
import ResponsiveAppBar from "./components/nav/ResponsiveAppBar";
import {Grid} from "@mui/material";
import Gmap from "./components/googlemaps/Gmap";
import InputWithIcon from "./components/inputforms/InputWithIcon";
import axios from 'axios';

import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Footer from './components/Footer'
import {Route, Routes} from "react-router-dom";


const App = () => {
    const API_URL = "http://localhost:8080/api/artillery";
    const API_URL_INFANTRY = "http://localhost:8080/api/infantry";
    const [artillery, setArtillery] = useState([]);
    const [infantry, setInfantry] = useState([]);
    const [currentArt, setCurrentArt] = useState('');
    const [currentArtRange, setCurrentArtRange] = useState('');
    const [currentFriend, setCurrentFriend] = useState('');
    const [currentRPM, setCurrentRPM] = useState(0);
    const [currentFacts, setCurrentFacts] = useState('');
    const [currentInfantry, setCurrentInfantry] = useState('');
    const [currentInfantryRange, setCurrentInfantryRange] = useState('');
    const [currentInfantryFriend, setCurrentInfantryFriend] = useState('');
    const [currentInfantryRPM, setCurrentInfantryRPM] = useState(0);
    const [currentInfantryFacts, setCurrentInfantryFacts] = useState('');
    const [distance, setDistance] = useState(0);
    const [count, setCount] = useState(0);
    const [currentGrid, setCurrentGrid] = useState({});
    const [elevator, setElevator] = useState([{elevation: 0.00}]);
    const [toggle, setToggle] = useState(true);
    const [prediction, setPrediction] = useState({});
    const [imageDetected, setImageDetected] = useState(false);

    //target hit message
    const [message, setMessage] = useState('');

    //fetch Database Artillery
    const fetchArtillery = () => {
        axios.get(API_URL)
            .then((r) => {
                setArtillery(r.data);
            })
            .catch((e) => console.log(e));
    }
    useEffect(() => fetchArtillery(), [])

    //fetch Database Infantry
    const fetchInfantry = () => {
        axios.get(API_URL_INFANTRY)
            .then((r) => {
                setInfantry(r.data);
            })
            .catch((e) => console.log(e));
    }
    useEffect(() => fetchInfantry(), [])

    //set the Message that is passed to the header
    const setMessageFunc = (localMessage) => {
        setMessage(localMessage)
    }

    //set the Grid that is passed to the header
    const setCurrentGridFunc = (latlng) => {
        setCurrentGrid(latlng);
    }

    const toggleImageDetected = (val) => {
        setImageDetected(val);
    }

    //calculate the direct line distance of two coordinates
    function haversine_distance(mk1, mk2) {
        let R = 3958.8; // Radius of the Earth in miles
        let rlat1 = mk1.lat * (Math.PI / 180); // Convert degrees to radians
        let rlat2 = mk2.lat * (Math.PI / 180); // Convert degrees to radians
        let difflat = rlat2 - rlat1; // Radian difference (latitudes)
        let difflon = (mk2.lng - mk1.lng) * (Math.PI / 180); // Radian difference (longitudes)

        let d = 2 * R *
            Math.asin(Math.sqrt(Math.sin(difflat / 2) *
                Math.sin(difflat / 2) + Math.cos(rlat1) *
                Math.cos(rlat2) * Math.sin(difflon / 2) *
                Math.sin(difflon / 2)));
        setDistance(d);
    }

    //Take two coordinates and calculate the midpoint
    function midpoint(lat1, lng1, lat2, lng2) {
        lat1 = lat1 * 0.017453292519943295;
        lng1 = lng1 * 0.017453292519943295;
        lat2 = lat2 * 0.017453292519943295;
        lng2 = lng2 * 0.017453292519943295;

        let dLng = lng2 - lng1;
        let Bx = Math.cos(lat2) * Math.cos(dLng);
        let By = Math.cos(lat2) * Math.sin(dLng);
        let lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + Bx) * (Math.cos(lat1) + Bx) + By * By));
        let lng3 = lng1 + Math.atan2(By, (Math.cos(lat1) + Bx));
        let pi = 3.141592653589793;
        let lat = (lat3 * 180) / pi;
        let lng = (lng3 * 180) / pi;
        return {lat: lat, lng: lng};
    }

    function arePointsNear(checkPoint, centerPoint, km) {
        let ky = 40000 / 360;
        let kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
        let dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
        let dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
        return Math.sqrt(dx * dx + dy * dy) <= km;
    }

    const setElevatorFunc = (latLng) => setElevator(latLng)
    const incrementCount = () => {
        setCount(count + 1)
    }

    const predictionService = (vehicle) => {
        setPrediction(vehicle)
    }
    
    const currentArtSelected = (selected) => {
        for (let i = 0; i < artillery.length; i++) {
            if (artillery[i].type === selected.target.value) {
                setCurrentArt(artillery[i].type);
                setCurrentArtRange(artillery[i].artRange)
                setCurrentFriend(artillery[i].favorite)
                setCurrentRPM(artillery[i].rpm)
                setCurrentFacts(artillery[i].facts)
            }
        }
        setToggle(true);
    }

    const currentInfantrySelected = (selected) => {
        for (let i = 0; i < infantry.length; i++) {
            if (infantry[i].type === selected.target.value) {
                setCurrentInfantry(infantry[i].type);
                setCurrentInfantryRange(infantry[i].artRange)
                setCurrentInfantryFriend(infantry[i].favorite)
                setCurrentInfantryRPM(infantry[i].rpm)
                setCurrentInfantryFacts(infantry[i].facts)
            }
        }
        setToggle(false);
    }
    return (<>
        <Grid container spacing={0} columns={12} rows={10} sx={{margin: 0, padding: 0}}>
            <Grid item xs={12}>
                <ResponsiveAppBar/>
            </Grid>
            <Grid item xs={12}>
                <InputWithIcon
                    elevator={elevator}
                    artillery={artillery}
                    infantry={infantry}
                    currentGrid={currentGrid}
                    currentInfantryRange={currentInfantryRange}
                    currentInfantry={currentInfantry}
                    currentInfantryRPM={currentInfantryRPM}
                    currentArtRange={currentArtRange}
                    currentArt={currentArt}
                    currentRPM={currentRPM}
                    distance={distance}
                    toggle={toggle}
                    currentArtSelected={currentArtSelected}
                    currentInfantrySelected={currentInfantrySelected}/>
            </Grid>
            <Grid item xs={12} rows={9}>
                <table className="tableContainer">
                    <tbody>
                    <tr>
                        <td>
                            <Routes>
                                <Route exact path="/" element={<Home/>}/>
                                <Route path="/home" element={<Home/>}/>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/register" element={<Register/>}/>
                                <Route path="/gmap"
                                       element={<Gmap
                                           toggle={toggle}
                                           message={message}
                                           artillery={artillery}
                                           infantry={infantry}
                                           currentInfantryFacts={currentInfantryFacts}
                                           currentInfantryRange={currentInfantryRange}
                                           currentInfantry={currentInfantry}
                                           currentInfantryRPM={currentInfantryRPM}
                                           currentInfantryFriend={currentInfantryFriend}
                                           currentFacts={currentFacts}
                                           currentArtRange={currentArtRange}
                                           currentArt={currentArt}
                                           currentRPM={currentRPM}
                                           currentFriend={currentFriend}
                                           prediction={prediction}
                                           toggleImageDetected={toggleImageDetected}
                                           imageDetected={imageDetected}
                                           predictionService={predictionService}
                                           setMessageFunc={setMessageFunc}
                                           incrementCount={incrementCount}
                                           arePointsNear={arePointsNear}
                                           haversine_distance={haversine_distance}
                                           midpoint={midpoint}
                                           setElevatorFunc={setElevatorFunc}
                                           setCurrentGridFunc={setCurrentGridFunc}
                                       />}/>
                                <Route component={App}/>
                            </Routes>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        </td>
                    </tr>
                    </tbody>
                </table>

                {/*<Gmap artillery={artillery} currentArtRange={currentArtRange} currentArt={currentArt}*/}
                {/*      currentRPM={currentRPM} currentFriend={currentFriend} haversine_distance={haversine_distance}/>*/}
            </Grid>
            <Grid item xs={12}>
                <Footer count={count} message={message}/>
            </Grid>
        </Grid></>);
}
export default App;

