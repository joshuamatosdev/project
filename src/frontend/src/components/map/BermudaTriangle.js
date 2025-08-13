import {useEffect, useState} from 'react';
import {loadModules} from 'esri-loader';
import Circle from "@arcgis/core/geometry/Circle";

const BermudaTriangle = (props) => {

    const [graphic, setGraphic] = useState(null);

    useEffect(() => {

        loadModules(['esri/Graphic']).then(([Graphic]) => {

            // Create a polygon geometry
            // const polygon = {
            //     type: "polygon", // autocasts as new Polygon()
            //     rings: [
            //         [-64.78, 32.3],
            //         [-66.07, 18.45],
            //         [-80.21, 25.78]
            //     ]
            // };


            // const cluster = {
            //     type: "cluster",
            //     clusterRadius: "10000px",
            //     clusterMinSize: "10000px",
            //     clusterMaxSize: "10000px",
            //     labelingInfo: [{
            //         deconflictionStrategy: "none",
            //         labelExpressionInfo: {
            //             expression: "Text($feature.cluster_count, '#,###')"
            //         },
            //         symbol: {
            //             type: "text",
            //             color: "#004a5d",
            //             font: {
            //                 weight: "bold",
            //                 family: "Noto Sans",
            //                 size: "12px"
            //             }
            //         },
            //         labelPlacement: "center-center",
            //     }]
            // }

            // Create a symbol for rendering the graphic
            // const fillSymbol = {
            //     type: "simple-fill", // autocasts as new SimpleFillSymbol()
            //     color: [227, 139, 79, 0.8],
            //     outline: { // autocasts as new SimpleLineSymbol()
            //         color: [255, 255, 255],
            //         width: 1
            //     }
            // };

            // const fillSymbol = {
            //     geometry: circleGeometry,
            //     symbol: {
            //         type: "simple-fill",
            //         color: [227, 139, 79, 0.8],
            //         outline: {
            //             width: 3,
            //             color: "red"
            //         }
            //     }
            // };

            // Add the geometry and symbol to a new graphic
            // const graphic = new Graphic({
            //     geometry: circleGeometry,
            //     symbol: fillSymbol
            // });

            const circleGeometry = new Circle({
                center: [-113, 36],
                geodesic: true,
                numberOfPoints: 100,
                radius: 1000,
                radiusUnit: "kilometers"
            });

            const graphic = new Graphic({
                geometry: circleGeometry,
                symbol: {
                    type: "simple-fill",
                    color: [227, 139, 79, 0.8],
                    outline: {
                        width: 3,
                        color: "red"
                    }
                },
                popupTemplate: {
                    title: "{Name}",
                    content: [
                        {
                            type: "fields",
                            fieldInfos: [
                                {
                                    fieldName: "Name"
                                },
                                {
                                    fieldName: "Owner"
                                },
                                {
                                    fieldName: "Length"
                                }
                            ]
                        }
                    ]
                }
            });

            setGraphic(graphic);
            props.view.graphics.add(graphic);
        }).catch((err) => console.error(err));

        return function cleanup() {
            props.view.graphics.remove(graphic);
        };
    }, [graphic, props]);

    return null;

}

export default BermudaTriangle;