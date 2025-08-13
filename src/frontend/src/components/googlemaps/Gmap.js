import * as React from "react"
import {useCallback, useEffect, useMemo, useRef, useState} from "react"
import {Circle, GoogleMap, InfoWindow, Marker, Polyline, useJsApiLoader} from '@react-google-maps/api';
import mapStyles from './mapstyles'
import MyLocationIcon from "@mui/icons-material/MyLocation";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import * as tf from '@tensorflow/tfjs';
import padSequences from './helper/paddedSeq';
import CodedBy from "../common/CodedBy";
import {Grid} from "@mui/material";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {ObjectDetector} from "../ai/ObjectDetectV";

function Gmap({
                  currentArt,
                  currentArtRange,
                  currentFacts,
                  currentFriend,
                  currentInfantry,
                  currentInfantryFacts,
                  currentInfantryFriend,
                  currentInfantryRPM,
                  currentInfantryRange,
                  currentRPM,
                  haversine_distance,
                  imageDetected,
                  incrementCount,
                  message,
                  midpoint,
                  prediction,
                  predictionService,
                  setCurrentGridFunc,
                  setElevatorFunc,
                  setMessageFunc,
                  toggle,
                  toggleImageDetected
              }) {
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script', googleMapsApiKey: API_KEY_GOES_HERE //  see: process.env.MY_ENVIRONMENT_VARIABLE
    })


    const url = {

        model: 'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json',
        metadata: 'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json'
    };

    const OOV_INDEX = 2;
    const [metadata, setMetadata] = useState();
    const [model, setModel] = useState();
    const [testText, setText] = useState("");
    const [testScore, setScore] = useState("");
    const [trimedText, setTrim] = useState("")
    const [seqText, setSeq] = useState("")
    const [padText, setPad] = useState("")
    const [inputText, setInput] = useState("")

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    async function loadModel(url) {
        try {
            const model = await tf.loadLayersModel(url.model);
            setModel(model);
        } catch (err) {
            console.log(err);
        }
    }

    async function loadMetadata(url) {
        try {
            const metadataJson = await fetch(url.metadata);
            const metadata = await metadataJson.json();
            setMetadata(metadata);
        } catch (err) {
            console.log(err);
        }
    }


    const getSentimentScore = (text) => {
        console.log(text)
        const inputText = text.trim().toLowerCase().replace(/(\.|\,|\!)/g, '').split(' ');
        setTrim(inputText)
        console.log(inputText)
        const sequence = inputText.map(word => {
            let wordIndex = metadata.word_index[word] + metadata.index_from;
            if (wordIndex > metadata.vocabulary_size) {
                wordIndex = OOV_INDEX;
            }
            return wordIndex;
        });
        setSeq(sequence)
        console.log(sequence)
        // Perform truncation and padding.
        const paddedSequence = padSequences([sequence], metadata.max_len);
        console.log(metadata.max_len)
        setPad(paddedSequence)

        const input = tf.tensor2d(paddedSequence, [1, metadata.max_len]);
        console.log(input)
        setInput(input)
        const predictOut = model.predict(input);
        const score = predictOut.dataSync()[0];
        predictOut.dispose();
        setScore(score)
        return score;
    }


    useEffect(() => {
        tf.ready().then(
            () => {
                loadModel(url)
                loadMetadata(url)
            }
        );

    }, [])

    //Austin -30.2672° N, 97.7431
    //-> 30.2826922,-97.7740298 - start in+-
    // g location
    //Memo state - help manage map refresh
    const center = useMemo(() => ({
        lat: 30.282692, lng: -97.77402
    }), [])

    //Memo - default map options
    const options = useMemo(() => ({
        styles: mapStyles,
        disableDefaultUI: true,
        visible: true,
        zIndex: 1,
        zoomControl: true,
        mapTypeControl: true,
        mapTypeId: 'terrain',
        // mapTypeControlOptions: {
        //     style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        //     mapTypeIds: ["roadmap", "terrain", "satelite"],
        // },
        scaleControl: true,
        streetViewControl: false,
        rotateControl: true,
        fullscreenControl: true,
        terrain: true,
        heading: 90,
        tilt: 45,
    }), [])

    //fire projectiles
    const [fires, setFire] = useState([]);
    //store  clicked locations in state
    const [places, setPlaces] = React.useState([])
    //const save the prev place for calculating route
    const [directions, setDirections] = useState({});

    //store previous place
    const prevPlace = useRef();

    //path polyline ...
    const [paths, setPaths] = useState([]);

    //target of missile state
    const [targetOfMissile, setTargetOfMissile] = useState({})

    //setup the projectile
    const [targetShot, setTargetShot] = useState([]);


    useEffect(() => {
        prevPlace.current = places[places.length - 1];
    })

    const [tick, setTick] = useState(7)
    //to store coordinate from state
    const [intervalRender, setIntervalRender] = useState(null);

    //directions display control
    const [directionsAvail, setDirectionsAvail] = useState(false);
    //store for Info WWindows, if implemented
    const [focusedPlace, setFocusedPlace] = React.useState(null)

    //sae map to ref, help with refresh
    const mapRef = React.useRef();

    //Use Google Maps onload feature to store mapRef
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, [])

    //container style for the map,
    //100% of container
    const mapContainerStyle = {
        height: "80vh", width: "100%"
    }

    //Target Accuracy options
    const radOptions = {
        strikeOpacity: 0.5, strokeWeight: 2, clickable: false, draggable: false, editable: false, visible: true,
    }

    //inner accuracy - requires recalculations based on art type
    const accuracyHighRadOptions = {
        ...radOptions, zIndex: 3, fillOpacity: 0.05, strokeColor: '#8BC30A', fillColor: '#8BC30A',
    }

    //middle accuracy - may need logic to remove this if range is below
    //certain radius
    const accuracyMedRadOptions = {
        ...radOptions, zIndex: 2, fillOpacity: 0.05, strokeColor: '#FBC12D', fillColor: '#FBC12D',
    }

    //low accuracy options...
    const accuracyLowRadOptions = {
        ...radOptions, zIndex: 1, fillOpacity: 0.05, strokeColor: '#FF5252', fillColor: '#FF5252',
    }

    //low accuracy options...
    const accuracyLowFriendRadOptions = {
        ...radOptions, zIndex: 1, fillOpacity: 0.05, strokeColor: '#0043ff', fillColor: '#0043ff',
    }

    //fires  options...
    const firesOption = {
        ...radOptions, zIndex: 1, fillOpacity: 1, strokeColor: '#ff0000', fillColor: '#ff0000',
    }



    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        color: '#000000',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    //function to store places, clicked - store the lat long
    //and record ...previous places  - useCall back to help with map refresh (state changes)
    const handleRender = useCallback((event) => {
        if(imageDetected === true) {
            console.log(imageDetected)
            console.log(prediction)
            console.log(prediction.lat)
            setPlaces([...places, {
                lat: Number(prediction.lat),
                lng: Number(prediction.lng),
                range: 10000,
                currentArt: 'Vehicle',
                friendly: true,
                rpm: 2,
                facts: "Vehicle, range 10000. Threat is significant.",
                src: "./truckdetect.png",
            }]);
            toggleImageDetected(false)
        } else
        if (currentArtRange > 0) {
            incrementCount()
            setPlaces([...places, {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
                range: (toggle) ? currentArtRange : currentInfantryRange,
                currentArt: (toggle) ? currentArt : currentInfantry,
                friendly: (toggle) ? currentFriend : currentInfantryFriend,
                rpm: (toggle) ? currentRPM : currentInfantryRPM,
                facts: (toggle) ? currentFacts : currentInfantryFacts,
                src: (toggle) ? "./icons8-army-62.png" : "./Spartan.gif",
            }]);
        }
    })

    useEffect(() => {})
    //remove place on Right Click ---> doesnt work
    const handleRenderOff = React.useCallback((event) => {
        setPlaces([...places, places.filter((place) => {
            return place.lat !== event.latLng.lat()
        })]);
    })

    const getRoute = (currentLatLong = {}) => {
        //if there are only 1 place or if the place and prev place is the same,
        //there is no need for a route. need to add additional logic
        if (places.length < 1) return;
        if (currentLatLong === prevPlace.current) return;

        //For google routes if enabled/rendered
        const service = new window.google.maps.DirectionsService();

        //target of missile
        let currLNG = currentLatLong.lng;
        let currLAT = currentLatLong.lat;

        //Need to render the last place clicked, normally handled in Main map, not on marker click
        setPlaces([...places,
            {
                lat: prevPlace.current.lat,
                lng: prevPlace.current.lng,
                range: (toggle) ? currentArtRange : currentInfantryRange,
                currentArt: (toggle) ? currentArt : currentInfantry,
                friendly: (toggle) ? currentFriend : currentInfantryFriend,
                rpm: (toggle) ? currentRPM : currentInfantryRPM,
                facts: (toggle) ? currentFacts : currentInfantryFacts,
                src: (toggle) ? "./icons8-army-62.png" : "./halo1.gif",
            }
        ]);

        //Target of Missle for explosion
        setTargetOfMissile({lat: prevPlace.current.lat, lng: prevPlace.current.lng})

        //create a path to the target using Polyline
        setPaths([{lat: prevPlace.current.lat, lng: prevPlace.current.lng}, {
            lat: currLAT, lng: currLNG
        }])


        //calculations for missile points.
        let exact_midpoint = midpoint(prevPlace.current.lat, prevPlace.current.lng, currLAT, currLNG)
        let exact_midpoint_between_target = midpoint(exact_midpoint.lat, exact_midpoint.lng, currLAT, currLNG)
        let exact_midpoint_between_target_half = midpoint(exact_midpoint_between_target.lat, exact_midpoint_between_target.lng, currLAT, currLNG)

        let exact_midpoint_between_source = midpoint(prevPlace.current.lat, prevPlace.current.lng, exact_midpoint.lat, exact_midpoint.lng)
        let exact_midpoint_between_source_half = midpoint(prevPlace.current.lat, prevPlace.current.lng, exact_midpoint_between_source.lat, exact_midpoint_between_source.lng)

        setTargetShot([exact_midpoint_between_target_half, exact_midpoint_between_target, exact_midpoint, exact_midpoint_between_source, exact_midpoint_between_source_half,]);

        //reset the tick of missile traveling to 0 this is to render when needed
        setTick(0)

        //routing if enabled to draw driving route
        service.route({
            origin: prevPlace.current, destination: currentLatLong, travelMode: window.google.maps.TravelMode.DRIVING
        }, (result, status) => {
            if (status === "OK" && result) {
                setDirections(result);
                setDirectionsAvail(true);
                haversine_distance(prevPlace.current, currentLatLong);
            }
        })
    }


    //control render of missle
    useEffect(() => {
        if (tick <= 6) {
            setTimeout(() => {
                setIntervalRender(targetShot[tick])
                setTick(tick + 1);
            }, 3000);
        }
        if (tick === 6) {
            setFire(targetOfMissile);
            setTimeout(setMessageFunc("Target Hit!"), 1000);
        } else {
            setMessageFunc("");
        }
        //
        // setInterval(() => setIntervalRender(
        //     targetShot.filter((e, i) => i === 0)
        //         .map((targetShot) => targetShot), 3000));

    }, [tick]);

    //Maps loaded, called onLoad
    const toastyLoading = () => {
        toast.success('Google Maps has been loaded successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            icon: "🚀",
            className: 'dark',
            bodyClassName: 'dark',
            theme: 'dark'
        });
    }

    const handleLoadToastAndMaps = (event) => {
        toastyLoading();
        onMapLoad(event)
    }

    // Define the symbol, using one of the predefined paths ('CIRCLE')
    // supplied by the Google Maps JavaScript API.

    function animateCircle(line) {
        let count = 0;

        setInterval(() => {
            count = (count + 1) % 200;

            const icons = line.get("icons");

            icons[0].offset = count / 2 + "%";
            line.set("icons", icons);
        }, 20);
    }

    //set the elavation
    const elevatorService = (latLng) => {
        const elevator = new window.google.maps.ElevationService();
        return elevator.getElevationForLocations({
            locations: [latLng]
        })
    }
    return isLoaded ? (
        <Grid container spacing={0} columns={12} rows={10} sx={{margin: 0, padding: 0}}>
            <Grid item xs={12}>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    icon={false}
                    theme="dark"
                />

                <ToastContainer/>
                <h2 className="tacticalMapsLogo">{message} {(message.length > 0) ? "WAY TO GO!" : "System Active"}<MyLocationIcon
                    sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/></h2>
                <GoogleMap
                    id="marker-example"
                    mapContainerStyle={mapContainerStyle}
                    zoom={8}
                    center={center}
                    options={options}
                    onClick={handleRender}
                    tilt={45}

                    onLoad={handleLoadToastAndMaps}
                >  
                    {/* draw directions */}
                    {/*{directionsAvail && <DirectionsRenderer directions={(directionsAvail) ? directions : null}/>}*/}


                    {

                        (intervalRender !== null) ? // <Circle
                            //     center={intervalRender}
                            //     radius={1000}
                            //     options={accuracyHighRadOptions}/>
                            <Marker
                                position={intervalRender}
                                icon={{
                                    url: "./missile.gif",
                                    scaledSize: new window.google.maps.Size(100, 100),
                                    origin: new window.google.maps.Point(0, 0),
                                    anchor: new window.google.maps.Point(5, 5)
                                }}/>

                            : null

                    }

                    {paths.map(() => {
                        return (
                            <Polyline

                                path={paths}

                                options={{
                                    strokeColor: '#409249',
                                    strokeOpacity: 0.8,
                                    strokeWeight: 2,
                                    fillColor: 'rgba(105,206,243,0.42)',
                                    fillOpacity: 0.35,
                                    clickable: false,
                                    draggable: false,
                                    editable: false,
                                    visible: true,
                                    radius: 30000,
                                }}

                            />);
                    })}

                    {
                        (fires !== null) ? <>
                            <Marker
                                position={{lat: fires.lat, lng: fires.lng}}
                                icon={{
                                    url: "./5.gif",
                                    scaledSize: new window.google.maps.Size(50, 50),
                                    origin: new window.google.maps.Point(0, 0),
                                    anchor: new window.google.maps.Point(25, 25)
                                }}/>
                        </> : null

                    }

                    
                    {

                        places.map((place) => {
                                return (
                                    <>
                                        <Marker key={place} position={{lat: place.lat, lng: place.lng}}
                                                icon={{
                                                    url: place.src,
                                                    scaledSize: new window.google.maps.Size(50, 50),
                                                    origin: new window.google.maps.Point(0, 0),
                                                    anchor: new window.google.maps.Point(25, 25)
                                                }}
                                                animation={2}
                                                onClick={() => {
                                                    setFocusedPlace(place);
                                                    getRoute(place);
                                                    getSentimentScore(place.facts)
                                                    setCurrentGridFunc({lat: place.lat, lng: place.lng})
                                                    elevatorService(place).then((r) => setElevatorFunc(r.results))
                                                }}
                                            //draggable={true}
                                            //onDragEnd={handleRender}
                                                onDblClick={handleRenderOff}
                                        />)

                                        <Circle center={place} key={2342342} radius={(place.range) / 2.3}
                                                options={accuracyHighRadOptions}/>
                                        <Circle center={place} key={2342342} radius={(place.range) / 2.3}
                                                options={accuracyHighRadOptions}/>
                                        <Circle center={place} key={23524365} radius={(place.range) / 1.6}
                                                options={accuracyMedRadOptions}/>
                                        <Circle center={place} key={523523655} radius={place.range}
                                                options={(place.friendly) ? accuracyLowFriendRadOptions : accuracyLowRadOptions}/>


                                        l;
                                    </>
                                )
                            }
                        )}


                    {focusedPlace ? (<InfoWindow
                        position={{lat: focusedPlace.lat, lng: focusedPlace.lng}}
                        onCloseClick={() => setFocusedPlace(null)}
                    >
                        <div className="infoWindow">
                            <h5>{focusedPlace.currentArt}</h5>
                            <p>Max Range: {focusedPlace.range}</p>
                            <p>RPM: {focusedPlace.rpm}</p>
                            <p>Facts: {focusedPlace.facts}</p>
                            <p>TensorFlow AI Score: <b>{testScore.toFixed(5)}</b> calculated.</p>
                        </div>
                    </InfoWindow>) : null}
                </GoogleMap>
            </Grid>
            <Grid item xs={8}>
                <CodedBy/>
            </Grid>
            <Grid item xs={4}>
                <div>
                    <Button className="button-49" sx={{fontSize: '30px', width:'300px'}} onClick={handleOpen}>VEHICLE_RECONNAISSANCE</Button>
                    <Modal
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="keep-mounted-modal-title"
                        aria-describedby="keep-mounted-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                                Upload image for analysis.
                            </Typography>
                            <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                                <ObjectDetector predictionService={predictionService} toggleImageDetected={toggleImageDetected}/>
                            </Typography>
                        </Box>
                    </Modal>
                </div>
            </Grid>
        </Grid>
    ) : <>Loading Map...</>
}

export default Gmap