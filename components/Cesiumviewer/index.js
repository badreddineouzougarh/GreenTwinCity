import React, { useEffect, useState, useRef } from 'react';
import {
    Viewer, Ion, Cesium3DTileset, Cesium3DTileStyle, defined, Color, Entity,
    ScreenSpaceEventHandler, ScreenSpaceEventType, PostProcessStageLibrary, Cartesian3,
    ShadowMode, JulianDate, TimeInterval
} from 'cesium';
import ReactSlider from 'react-slider';

const CesiumComponent = () => {
    const viewerRef = useRef(null);

    // Utilisation de l'heure marocaine
    const getCurrentTimeGMTPlus1 = () => {
        const date = new Date();
        date.setHours(date.getHours() + 1); // Ajoutez directement 1 heure pour GMT+1
        return date.getHours().toString().padStart(2, '0'); // Format à deux chiffres
    };

    const [time, setTime] = useState(getCurrentTimeGMTPlus1());
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // Date actuelle
    const [speed, setSpeed] = useState(1);
    const [pickedFeatureInfo, setPickedFeatureInfo] = useState({});
    const lastPickedFeature = useRef(null);
    useEffect(() => {
        Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ZTk3YmY2Yy1kNzJiLTQ3NGQtYmQwNi00MTM2MzRiYzViNjgiLCJpZCI6MTY2MDY2LCJpYXQiOjE3MTQwNTMzOTB9.fCHvQM21IEbq8tk9fWGATbXsjtatlmq17vEmc12xc6A';
        const viewer = new Viewer(viewerRef.current, {
            shadows: true,
            terrainShadows: ShadowMode.ENABLED
        });

        const loadTileset = async () => {
            try {
                const tileset = await Cesium3DTileset.fromIonAssetId(2553919);
                tileset.shadows = ShadowMode.ENABLED;
                viewer.scene.primitives.add(tileset);
                await viewer.zoomTo(tileset);
            } catch (error) {
                console.error(error);
            }
        };

        try {
            viewer.clock.startTime = JulianDate.fromIso8601(`${date}T00:00:00Z`);
            viewer.clock.stopTime = JulianDate.fromIso8601(`${date}T23:59:59Z`);
            viewer.clock.currentTime = JulianDate.fromIso8601(`${date}T${time}:00:00Z`);
            viewer.clock.multiplier = speed;
            viewer.clock.shouldAnimate = true;
        } catch (error) {
            console.error('Error setting Cesium clock:', error);
        }

        loadTileset();

        const nameOverlay = document.createElement('div');
        viewer.container.appendChild(nameOverlay);
        nameOverlay.className = 'backdrop';
        nameOverlay.style.display = 'none';
        nameOverlay.style.position = 'absolute';
        nameOverlay.style.bottom = '0';
        nameOverlay.style.left = '0';
        nameOverlay.style.pointerEvents = 'none';
        nameOverlay.style.padding = '4px';
        nameOverlay.style.backgroundColor = 'white';

        const handler = new ScreenSpaceEventHandler(viewer.canvas);
        handler.setInputAction((movement) => {
            const pickedFeature = viewer.scene.pick(movement.endPosition);
            if (!defined(pickedFeature)) {
                nameOverlay.style.display = 'none';
                return;
            }

            nameOverlay.style.display = 'block';
            nameOverlay.style.bottom = `${viewer.canvas.clientHeight - movement.endPosition.y}px`;
            nameOverlay.style.left = `${movement.endPosition.x}px`;
            nameOverlay.textContent = pickedFeature.getProperty('gml:id') || 'No name property';
            setPickedFeatureInfo({
                BIN: pickedFeature.getProperty('gml:id'),
                Building_area: pickedFeature.getProperty('building area'),
                B_Roofs_number: pickedFeature.getProperty('building Roofs number'),
                building_Volume: pickedFeature.getProperty('building Volume'),
                Latitude: pickedFeature.getProperty('Latitude'),
                Height: pickedFeature.getProperty('Height'),
                TerrainHeight: pickedFeature.getProperty('TerrainHeight')
            });
        }, ScreenSpaceEventType.MOUSE_MOVE);

    

        return () => {
            viewer.destroy();
            
        };
    }, [time, date, speed]);

    return (
        <div className="cesium-container">
            <div ref={viewerRef} className="cesium-viewer" />
            <div className="sidebar">

                <h1 className='mx-5 my-5' >Shadow city simulator </h1>
                <div className="slider-container">
                    <label>Time</label>
                    <ReactSlider
                        value={parseInt(time)}
                        min={1}
                        max={23}
                        step={1}
                        onChange={value => setTime(value.toString().padStart(2, '0'))}
                        className="horizontal-slider"
                        thumbClassName="example-thumb"
                        trackClassName="example-track"
                        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}

                    />
                </div>
                <div className="slider-container">
                    <label>Date</label>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} className="date-input" />
                </div>
                <div className="slider-container">
                    <label>Speed</label>
                    <ReactSlider
                        value={speed}
                        min={0}
                        max={120}
                        step={30}
                        onChange={setSpeed}
                        className="horizontal-slider"
                        marks
                        markClassName="example-mark"
                        thumbClassName="example-thumb"
                        trackClassName="example-track"
                        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}

                    />
                </div>
                <div>
                    <h1>building Information</h1>
                    {Object.keys(pickedFeatureInfo).length > 0 && (
                        <table className="cesium-infoBox-defaultTable">
                            <tbody>
                                {Object.entries(pickedFeatureInfo).map(([key, value]) => (
                                    <tr key={key}>
                                        <th>{key}</th>
                                        <td>{value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    
                    
                </div>
            </div>
            
        </div>
    );
};

export default CesiumComponent;
