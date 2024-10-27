import React, { useEffect, useRef, useState } from 'react';
import { Viewer, Ion, Cesium3DTileset, defined, Cesium3DTileStyle, OpenStreetMapImageryProvider } from 'cesium';
import { FaBars } from 'react-icons/fa'; // Icon for the toggle button

const CesiumComponent = () => {
    const viewerRef = useRef(null);
    const [viewer, setViewer] = useState(null);

    const [showBuildings, setShowBuildings] = useState(false);
    const [showRoads, setShowRoads] = useState(false);
    const [showVegetation, setShowVegetation] = useState(false);
    const [showVegetation2, setShowVegetation2] = useState(false);
    const [showWaterbody, setShowWaterbody] = useState(false);
    const [showCityfuniture, setShowCityfuniture] = useState(false);

    const ModalOverlay = () => (
        <div
            className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30`}
            onClick={() => setter(oldVal => !oldVal)}
        />
    );
    const LayerControl = ({ name, checked, onChange }) => (
        <div className="p-2">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="mr-2"
            />
            {name}
        </div>
    );
    const [tilesets, setTilesets] = useState({
        lod1: null,
        roads: null,
        trees: null,
        lod2: null,
        waterbody: null,
        vegetation:null,
        lamps:null,
    });
    const [layers, setLayers] = useState({
        showLod1: false,
        showRoads: false,
        showTrees: false,
        showLod2: false,
        showWaterbody: false,
        showCityfuniture: false,
        showVegetation2: false,

    });
    const [showSidebar, setShowSidebar] = useState(false); // Sidebar toggle state

    useEffect(() => {
        Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ZTk3YmY2Yy1kNzJiLTQ3NGQtYmQwNi00MTM2MzRiYzViNjgiLCJpZCI6MTY2MDY2LCJpYXQiOjE3MTQwNTMzOTB9.fCHvQM21IEbq8tk9fWGATbXsjtatlmq17vEmc12xc6A'; // Replace with your access token
        const cesiumViewer = new Viewer(viewerRef.current, {
            imageryProvider: new OpenStreetMapImageryProvider({
                url: 'https://a.tile.openstreetmap.org/',
            }),
            baseLayerPicker: true, // Disable base layer picker if you don't want to allow switching
        });
        setViewer(cesiumViewer);

        const loadTileset = async (assetId) => {
            try {
                const tileset = await Cesium3DTileset.fromIonAssetId(assetId);
                cesiumViewer.scene.primitives.add(tileset);
                tileset.show = false; // Initially hide the tileset
                console.log(`Tileset loaded: ${assetId}`);
                return tileset;
            } catch (error) {
                console.error(`Error loading tileset ${assetId}:`, error);
                return null;
            }
        };

        const loadTilesets = async () => {
            try {
                const lod1Tileset = await loadTileset(2553919); // LOD1 tileset
                const roadsTileset = await loadTileset(2653314); // Roads tileset
                const treesTileset = await loadTileset(2787959); // Trees tileset
                const lod2Tileset = await loadTileset(2581592); // LOD2 tileset
                const waterbodyTileset = await loadTileset(2766942); // Waterbody tileset
                const vegetatio2Tilset = await loadTileset(2766942);
                const lampsTilset = await loadTileset(2783698);

                // Log loaded tilesets
                console.log({ lampsTilset, lod1Tileset, vegetatio2Tilset, roadsTileset, treesTileset, lod2Tileset, waterbodyTileset });

                if (lod1Tileset && roadsTileset && treesTileset && lod2Tileset && waterbodyTileset && lampsTilset && vegetatio2Tilset) {
                    setTilesets({
                        lod1: lod1Tileset,
                        roads: roadsTileset,
                        trees: treesTileset,
                        lod2: lod2Tileset,
                        waterbody: waterbodyTileset,
                        vegetation2: vegetatio2Tilset,
                        lamps: lampsTilset,
                    });

                    // Set styles for the tilesets
                    lod1Tileset.style = new Cesium3DTileStyle({
                        color: "color('orange')",
                    });

                    vegetatio2Tilset.style = new Cesium3DTileStyle({
                        color: "color('green')",
                    });
                    const extras2 = lampsTilset.asset.extras2;
                    if (defined(extras2) && defined(extras2.ion) && defined(extras2.ion.defaultStyle)) {
                        lampsTilset.style = new Cesium3DTileStyle(extras2.ion.defaultStyle);
                    }
                    roadsTileset.style = new Cesium3DTileStyle({
                        color: "color('black')",
                    });
                    waterbodyTileset.style = new Cesium3DTileStyle({
                        color: "color('blue')",
                    });

                    lod2Tileset.style = new Cesium3DTileStyle({
                        color: {
                            conditions: [
                                ['${Geometr_3D} === "roof"', 'color("red")'],
                                ['true', 'color("white")'],
                            ],
                        },
                    });

                    const extras = treesTileset.asset.extras;
                    if (defined(extras) && defined(extras.ion) && defined(extras.ion.defaultStyle)) {
                        treesTileset.style = new Cesium3DTileStyle(extras.ion.defaultStyle);
                    }

                    // Zoom to the first loaded tileset to ensure correct behavior
                    await cesiumViewer.zoomTo(lod1Tileset);
                }
            } catch (error) {
                console.error('Error loading tilesets:', error);
            }
        };

        loadTilesets();

        return () => {
            if (cesiumViewer) {
                cesiumViewer.destroy();
            }
        };
    }, []);

    useEffect(() => {
        if (tilesets.lod1) {
            console.log('LOD1 visibility:', layers.showLod1);
            tilesets.lod1.show = layers.showLod1;
        }

        if (tilesets.vegetation2) {
            console.log(' vegetation visibility:', layers.showVegetation2);
            tilesets.vegetation2.show = layers.showVegetation2;
        }
        if (tilesets.lamps) {
            console.log(' lamp visibility:', layers.showCityfuniture);
            tilesets.lamps.show = layers.showCityfuniture;
        }
        if (tilesets.lod2) {
            console.log('LOD2 visibility:', layers.showLod2);
            tilesets.lod2.show = layers.showLod2;
        }
        if (tilesets.roads) {
            console.log('Roads visibility:', layers.showRoads);
            tilesets.roads.show = layers.showRoads;
        }
        if (tilesets.trees) {
            console.log('Trees visibility:', layers.showTrees);
            tilesets.trees.show = layers.showTrees;
        }
        if (tilesets.waterbody) {
            console.log('Waterbody visibility:', layers.showWaterbody);
            tilesets.waterbody.show = layers.showWaterbody;
        }
    }, [layers, tilesets]);

    const handleLayerChange = (layer) => {
        setLayers((prevLayers) => ({
            ...prevLayers,
            [layer]: !prevLayers[layer],
        }));
    };

    return (
        <div className="flex h-screen">
            <div className={`bg-black w-[300px] transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 z-40 ${showSidebar ? " ml-0" : " ml-[-300px] md:ml-0"}`}>
                <div className="p-4">
                    <h1 className="text-xl text-white mt-10">Layer Control</h1>
                </div>
                <div className="flex flex-col p-4 text-white">
                    <div>
                        <button className="w-full text-left text-lg font-semibold bg-gray-700 py-2 px-4 mb-2"
                            onClick={() => setShowBuildings(!showBuildings)}
                        >Buildings   
                        </button>
                        {showBuildings && (
                            <div className="ml-4">
                                <LayerControl
                                    name="LOD1 Buildings"
                                    checked={layers.showLod1}
                                    onChange={() => handleLayerChange('showLod1')}
                                />
                                <LayerControl
                                    name="LOD2 Buildings"
                                    checked={layers.showLod2}
                                    onChange={() => handleLayerChange('showLod2')}
                                />
                            </div>
                        )}
                        
                    </div>
                    <div>
                        <button
                            className="w-full text-left text-lg font-semibold bg-gray-700 py-2 px-4 mb-2"
                            onClick={() => setShowRoads(!showRoads)}
                        >
                            Roads
                        </button>
                        {showRoads && (
                            <div className="ml-4">
                                <LayerControl
                                    name="Roads"
                                    checked={layers.showRoads}
                                    onChange={() => handleLayerChange('showRoads')}
                                />
                            </div>
                        )}
                    </div>
                    <div>
                        
                    </div>
                    <div>
                        <button
                            className="w-full text-left text-lg font-semibold bg-gray-700 py-2 px-4 mb-2"
                            onClick={() => setShowVegetation(!showVegetation)}
                        >
                            Vegetation
                        </button>
                        {showVegetation && (
                            <div className="ml-4">
                                <LayerControl
                                    name="Vegetation"
                                    checked={layers.showTrees}
                                    onChange={() => handleLayerChange('showTrees')}
                                />
                                <LayerControl
                                    name="Vegetation lands"
                                    checked={layers.showVegetation2}
                                    onChange={() => handleLayerChange('showVegetation2')}
                                />
                            </div>
                        )}
                    </div>
                    <div>
                        <button
                            className="w-full text-left text-lg font-semibold bg-gray-700 py-2 px-4 mb-2"
                            onClick={() => setShowWaterbody(!showWaterbody)}
                        >
                            Waterbody
                        </button>
                        {showVegetation && (
                            <div className="ml-4">
                                <LayerControl
                                    name="waterbody"
                                    checked={layers.showWaterbody}
                                    onChange={() => handleLayerChange('showWaterbody')}
                                />
                            </div>
                        )}
                    </div>
                    <div>
                        <button
                            className="w-full text-left text-lg font-semibold bg-gray-700 py-2 px-4 mb-2"
                            onClick={() => setShowCityfuniture(!showCityfuniture)}
                        >
                           CityFurniture
                        </button>
                        {showCityfuniture && (
                            <div className="ml-4">
                                <LayerControl
                                    name="Street Pole"
                                    checked={layers.showCityfuniture}
                                    onChange={() => handleLayerChange('showCityfuniture')}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            <button
                className="absolute top-4 left-4 z-50 bg-gray-700 text-white p-2 rounded-md hover:bg-gray-600"
                onClick={() => setShowSidebar(!showSidebar)}
            >
                <FaBars />
            </button>

            {/* Cesium Viewer */}
            <div className="flex-1">
                <div ref={viewerRef} className="h-full w-full"></div>
            </div>
        </div>
    );
};

export default CesiumComponent;
