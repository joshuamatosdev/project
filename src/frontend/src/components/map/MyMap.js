import React from 'react';

import {Map} from '@esri/react-arcgis';
import BermudaTriangle from './BermudaTriangle';

const MyMap = () => {
    return (<Map
        mapProperties={{basemap: 'satellite'}}
        viewProperties={{
            center: [-70, 25],
            zoom: 4
        }}>
        <BermudaTriangle/>
    </Map>);
}

export default MyMap;
// import React, { useRef, useEffect } from "react";
// import ArcGISMap from "@arcgis/core/Map";
// import MapView from "@arcgis/core/views/MapView";
//
// function MyMap() {
//     const mapDiv = useRef(null);
//
//     useEffect(() => {
//         if (mapDiv.current) {
//             const map = new ArcGISMap({
//                 basemap: "gray-vector",
//             });
//
//             const view = new MapView({
//                 map,
//                 container: mapDiv.current,
//                 extent: {
//                     spatialReference: {
//                         wkid: 102100,
//                     },
//                     xmax: -13581772,
//                     xmin: -13584170,
//                     ymax: 4436367,
//                     ymin: 4435053,
//                 },
//             });
//         }
//     }, []);
//
//     return <div className="mapDiv" ref={mapDiv}></div>;
// }
//
// export default MyMap;