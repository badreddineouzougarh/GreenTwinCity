function createPickedFeatureDescription(pickedFeature) {
    const description =
        `<table class="cesium-infoBox-defaultTable"><tbody>` +
        `<tr><th>BIN</th><td>${pickedFeature.BIN}</td></tr>` +
        `<tr><th>DOITT ID</th><td>${pickedFeature.DOITT_ID}</td></tr>` +
        `<tr><th>SOURCE ID</th><td>${pickedFeature.SOURCE_ID}</td></tr>` +
        `<tr><th>Longitude</th><td>${pickedFeature.Longitude}</td></tr>` +
        `<tr><th>Latitude</th><td>${pickedFeature.Latitude}</td></tr>` +
        `<tr><th>Height</th><td>${pickedFeature.Height}</td></tr>` +
        `<tr><th>Terrain Height (Ellipsoid)</th><td>${pickedFeature.TerrainHeight}</td></tr>` +
        `</tbody></table>`;
    return description;
}