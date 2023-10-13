var mapDataTilesUrl = "https://municipalatlas.blob.core.windows.net/tiles/sau_tiles/{z}/{x}/{y}.pbf";

function normalizeData(val, valMin, valMax) {
    var valNorm = (Math.min(val, valMax) - valMin) / (valMax - valMin);
    return valNorm;
    }

function clickHandler(e, variable, label, unit){
    var radarLabels = [];
    var radarSauData = [];
    var radarFuaData = [];

    var sauname = e.layer.properties.launame;
    var saucode = e.layer.properties.pk;
    var fuacode = e.layer.properties.fuacode;
    var fuaname = e.layer.properties.fuaname_en;
    var cityname = e.layer.properties.cityname_en;
    var citycode = e.layer.properties.citycode;
    var tl2_id = e.layer.properties.tl2_id;
    var tl2_name_en = e.layer.properties.tl2_name_en;
    var tl3_id = e.layer.properties.tl3_id;
    var tl3_name_en = e.layer.properties.tl3_name_en;

    if (sauname == undefined) {
        var sauInfo = ''
    } else {
        // var sauInfo = `<b>Commune:</b> ${sauname} <br>`
        var sauInfo = `${sauname}`
    };

    var varValue = e.layer.properties[variable];
    
    var innerHtmlTl = "";

    if (tl2_name_en != undefined) {
        innerHtmlTl += `<div class="flex items-start gap-1" style="padding-left: 0.2em">
                        <div class="flex h-6 w-6 items-center justify-center rounded text-white font-bold"
                        style="background: darkgrey; font-size: 0.6rem"> TL2 </div>
                    <div class="flex h-6 items-center justify-center font-bold text-gray-500" style="padding-left: 0.2em; padding-right: 1em">${tl2_name_en}</div>
                </div>`
    };

    if (tl3_name_en != undefined) {
        innerHtmlTl += `<div class="flex items-start gap-1" style="padding-left:0.2em">
                    <div class="flex h-6 w-6 items-center justify-center rounded text-white text-sm font-bold"
                        style="background: darkgrey; font-size: 0.6rem"> TL3 </div>
                    <div class="flex h-6 items-center justify-center font-bold text-gray-500" style="padding-left: 0.2em; padding-right: 1em">${tl3_name_en}</div>
                </div>`
    };

    if (fuaname != undefined) {
        innerHtmlTl += `<div class="flex items-start gap-1" style="padding-left: 0.2em">
                        <div class="flex h-6 w-6 items-center justify-center rounded text-white text-sm font-bold"
                        style="background: darkgrey; font-size: 0.6rem;"> FUA </div>
                    <div class="flex h-6 items-center justify-center font-bold text-gray-500" style="padding-left: 0.2em; padding-right: 1em">${fuaname}</div>
                </div>`
    };

    if (cityname != undefined) {
        innerHtmlTl += `<div class="flex items-start gap-1" style="padding-left: 0.2em">
                        <div class="flex h-6 w-6 items-center justify-center rounded text-white text-sm font-bold"
                        style="background: darkgrey; font-size: 0.6rem;"> City </div>
                    <div class="flex h-6 items-center justify-center font-bold text-gray-500" style="padding-left: 0.2em; padding-right: 1em">${cityname}</div>
                </div>
                    `
    };

    var innerHtmlTopic = "";

    varListDemography = ["POP_T", "POP_CH", "NETNAT_RATE", "NETMOBMIG_RATE", "NETMOB_RATE", "NETMIG_RATE", "OLD_SH", "WORKAGE_SH", "YOUTH_SH",
                        "MIGRANT_SH", "SEX_RATIO_TOT", "BIRTH_RATE", "DEATH_RATE"];
    varListEnvironment = [
        "GREEN_AREA_SHARE", "GREEN_AREA_CAPITA", "FOREST_CH", "SOLAR_POWER_POT", "WIND_POWER_POT"
                        ];
    varListClimate = [
        "AIR_TEMP2M", "AIR_TEMP2M_DIFF_1981_2010", "LST_DAY_SUMMER", "LST_NIGHT_SUMMER",
        "CDD_T_22C", "CDD_T_22C_CH", "HDD_T_15C", "HDD_T_15C_CH", 
        "HOT_DAYS", "HOT_DAYS_DIFF_1981_2010", "TROPICAL_NIGHTS", "TROPICAL_NIGHTS_DIFF_1981_2010",
        "PRECIP_SUM", "PRECIP_SUM_DIFF_1981_2010", "EXT_PRECIP_DAYS", "EXT_PRECIP_DAYS_1981_2010",
        "SOIL_MOIST_L1_CH_1981_2018", "FIRE_TOTAL_AREA_SH", "RIVER_FLOOD_RP100_POP_SH", "COASTAL_FLOOD_RP100_POP_SH",
    ];
    varListEconomy = [
        "MEDIAN_DISP_INC", "GINI", "POV_RATE_60", "UNEMP_RA_15_64", "RENT_M2", "HOUSING_PRICE_M2", 
    ];
    varListGHSL = [
        "pop_density_km2", "BUILT_S_RES", "BUILT_S_NRES", "BUILT_S_CH__T", 
        "BUILT_V__T", "BUILT_V_RES", "BUILT_V_NRES", "BUILT_H",
        "DEGURBA_L1", "DEGURBA_L2"
    ];
    varListServices= [
        "OOKLA_FIXED_DOWNLOAD_DEV", "OOKLA_FIXED_UPLOAD_DEV"
    ];

    if (varListDemography.includes(variable)) {
        innerHtmlTopic += `<div class="flex items-center gap-1">
                <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white"
                style="background: rgb(178, 82, 144);"><i
                    class="fa-fw fa-regular fa-people"></i></div>
            <div class="font-bold">Demography</div>
            </div>`
    } else if (varListEnvironment.includes(variable)) {
        innerHtmlTopic += `<div class="flex items-center gap-1">
        <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white"
        style="background: rgb(16, 149, 76);"><i
            class="fa-fw fa-regular fa-seedling"></i></div>
    <div class="font-bold">Environment</div>
    </div>`
    } else if (varListClimate.includes(variable)) {
        innerHtmlTopic += `<div class="flex items-center gap-1">
        <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white"
        style="background: darkred;"><i
            class="fa-fw fa-regular fa-temperature-arrow-up"></i></div>
    <div class="font-bold">Climate</div>
    </div>`
    } else if (varListEconomy.includes(variable)) {
        innerHtmlTopic += `<div class="flex items-center gap-1">
        <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white"
        style="background: rgb(77, 82, 168);"><i
            class="fa-fw fa-regular fa-building-columns"></i></div>
    <div class="font-bold">Economy and labour</div>
    </div>`
    } else if (varListGHSL.includes(variable)) {
        innerHtmlTopic += `<div class="flex items-center gap-1">
        <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white"
        style="background: rgb(122, 64, 43);"><i
            class="fa-fw fa-regular fa-building-user"></i></div>
    <div class="font-bold">Territorial organisation</div>
    </div>`
    } else if (varListServices.includes(variable)) {
        innerHtmlTopic += `<div class="flex items-center gap-1">
        <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white"
        style="background: rgb(255, 130, 0);"><i
            class="fa-fw fa-regular fa-shop"></i></div>
    <div class="font-bold">Services</div>
    </div>`
    }

    let popupResult;

    if (typeof varValue === 'string') {
        popupResult = varValue; // If varValue is a string, use it as is
    } else {
        popupResult = `${(Math.round(varValue * 10) / 10).toLocaleString('en-US').replaceAll(',', ' ')} ${unit}`;
    }

    L.popup({maxHeight: 300, maxWidth: 600})
        .setContent(`
            <div class="flex flex-col gap-2">
                <div class="flex flex-col gap-1">
                    <div class="flex items-start text-xl font-bold">${sauInfo}</div>
                    <div class="flex flex-col items-start gap-1" style="padding-left: 1em">
                    ${innerHtmlTl}
                    </div>
                </div>
                <hr />
                
                <div class="flex flex-col gap-1">
                    ${innerHtmlTopic}
                    <div class="font-bold px-3 text-gray-500">${label.replaceAll("<br>", " ")}</div>
                    <div class="px-3 text-gray-500">${popupResult} ${unit}</div>
                </div>
                <hr />
                <div class="flex flex-col gap-1">
                    <div class="text-xs font-bold">
                        Get all statistics about <a class="text-gray-800 transition hover:text-shift-blue" href="profile.html?code=${saucode}"><u>${sauname}</u></a>.
                    </div>
                </div>
            </div>
                    ` )
        .setLatLng(e.latlng)
        .openOn(map);
            
    }

var scaleBrowns = chroma.scale(['#D4BBBA', '#C3A19E', '#B18883', '#9F6F67', '#8D574C', '#7A4031', '#722E2C', '#6A262F', '#612135', '#591D39', '#50183C', '#46143D'])
var scaleReds = chroma.scale(['#ffffe0', '#f5e1c1', '#eac4a3', '#dda686', '#cf8a6a', '#c06d4e', '#b05034', '#9e311b', '#8b0000'])
var scaleGreens = chroma.scale(['#ffffe0', '#e5f2cc', '#cbe5b9', '#b1d8a6', '#97ca93', '#7cbd81', '#60b06f', '#41a25d', '#10954c'])
var scalePinks = chroma.scale(['#E7C4E0', '#DDADD2', '#D396C3', '#C87FB3', '#BD68A2', '#B25290', '#A64995', '#81398E', '#673281', '#502B73', '#3A2466'])
var scaleBlues = chroma.scale(['#ffffe0', '#eae8da', '#d5d1d3', '#c0bacc', '#aba4c5', '#958fbe', '#7f7ab7', '#6766b0', '#4d52a8'])
var scaleOranges = chroma.scale(['#ffffe0', '#eae8da', '#d5d1d3', '#c0bacc', '#aba4c5', '#958fbe', '#7f7ab7', '#6766b0', '#4d52a8'])

var scaleBuRd = chroma.scale(['#00429d', '#4771b2', '#73a2c6', '#a5d5d8', '#ffffe0', '#ffbcaf', '#f4777f', '#cf3759', '#93003a'])
var scaleRdBu = chroma.scale(['#93003a', '#cf3759', '#f4777f', '#ffbcaf', '#ffffe0', '#a5d5d8', '#73a2c6', '#4771b2', '#00429d'])


function getColor(d, valMin, valMax, varScale = scaleReds) {
    var scaledValue = (d - valMin) / (valMax - valMin);
    var color = varScale(scaledValue).hex();
    return color;
};

function getVectorLayer(variable, label, unit, varMin, varMax, varScale = scaleReds) {
    var TileStyling = {
        "data_geo": function(properties, zoom) {

            if (properties[variable] !== undefined) {
                var weight = 0.1;
                if (zoom > 12) {
                    weight = 1.0;
                }
                return ({
                    fill: true,
                    fillColor: getColor(properties[variable], varMin, varMax, varScale),
                    fillOpacity: 0.9,
                    weight: weight, // pass the weight variable instead of a value
                    color: "#ffffff",
                    opacity: 1.0,
                });
            }
            else {
                return ({
                    fill: false,
                    weight: 0,
                    color: "#ffffff",
                    opacity: 0,
                });
            }
            
        }
    }

    // define options of vector tiles
    var mapTileOptions = {
        rendererFactory: L.canvas.tile,
        interactive: true,
        maxNativeZoom: 12,
        minZoom: 6,
        vectorTileLayerStyles: TileStyling,
    };

    try {
        var mapLayer = new L.VectorGrid.Protobuf(
            mapDataTilesUrl, mapTileOptions
        ).on('click', e => clickHandler(e, variable, label, unit));
    } catch (error) {
        // Handle the error here (or ignore it)
        console.error("Error loading PBF file:", error);
}

    return mapLayer;

}

function getColorCategorical(d, categoricalColors) {
    const defaultColor = "#808080";
        return categoricalColors[d] || defaultColor;
    };

function getVectorLayerCategorical(variable, label, categoricalColors) {
    var TileStyling = {
        "data_geo": function(properties, zoom) {
            if (properties[variable] !== undefined) {
                var weight = 0.1;
                if (zoom > 12) {
                    weight = 1.0;
                }
                return ({
                    fill: true,
                    fillColor: getColorCategorical(properties[variable], categoricalColors),
                    fillOpacity: 0.9,
                    weight: weight, // pass the weight variable instead of a value
                    color: "#ffffff",
                    opacity: 1.0,
                });
            }
            else {
                return ({
                    fill: false,
                    weight: 0,
                    color: "#ffffff",
                    opacity: 0,
                });
            }
            
        }
    }

    // define options of vector tiles
    var mapTileOptions = {
        rendererFactory: L.canvas.tile,
        interactive: true,
        maxNativeZoom: 12,
        minZoom: 6,
        vectorTileLayerStyles: TileStyling,
    };

    var mapLayer = new L.VectorGrid.Protobuf(
        mapDataTilesUrl, mapTileOptions
    ).on('click', e => clickHandler(e, variable, label, ""));

    return mapLayer;

}

function getLegend(varLabel, varUnit, grades, varMin, varMax, varScale = scaleReds, minusLow=false, plusUp=true) {
        var legend = L.control({position: 'bottomright'});

        legend.onAdd = function (map) {
            var div = L.DomUtil.create('div', 'info legend');
            if (varUnit != "") {
                div.innerHTML += `<b>${varLabel} (${varUnit})</b><br>`
            } else {
                div.innerHTML += `<b>${varLabel}</b><br>`
            }
            
            if (minusLow){
                div.innerHTML +=
                '<i style="background:' + getColor(grades[0], varMin, varMax, varScale) + '"></i> ' + '< ' +
                grades[0]  + '<br>';
            }
            for (var i = 0; i < grades.length - 1; i++) {
                div.innerHTML +=
                    '<i style="background:' + getColor((grades[i + 1] + grades[i]) / 2, varMin, varMax, varScale) + '"></i> ' +
                    grades[i] + ' &ndash; ' + grades[i + 1] + '<br>' ;
            
            }
            if (plusUp){
                    div.innerHTML +=
                    '<i style="background:' + getColor(grades[grades.length-1], varMin, varMax, varScale) + '"></i> '+ '> '  +
                    grades[grades.length - 1] + '<br>';
                }
    

    return div;
    };

    return legend;
}

function getLegendCat(varLabel, categoricalColors){
        var legend = L.control({position: 'bottomright'});

        legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend');
        div.innerHTML += `<b>${varLabel}</b><br>`
        
        for (const category in categoricalColors) {
            if (categoricalColors.hasOwnProperty(category)) {
                const color = categoricalColors[category];
                div.innerHTML +=
                    `<i style="background:${color}"></i> ${category}<br>`;
            }
        }

    return div;
    };

    return legend;
}


function createLayerAndLegend(id, variable, label, unit, min, max, legendVals, scale, firstLayer=false, minusLow=false, plusUp=true) {
  const layer = getVectorLayer(variable, label, unit, min, max, scale);
  const legend = getLegend(label, unit, legendVals, min, max, scale, minusLow, plusUp);
  const buttonElement = document.getElementById(`button-${id}`);

  if (firstLayer)  {
    currentLayer = layer;
    currentLegend = legend;
    currentButton = buttonElement;
    currentButton.classList.remove('bg-white');
    currentButton.classList.add('bg-gray-100');
    currentLayer.addTo(map);
    currentLegend.addTo(map);
  }
  
  buttonElement.addEventListener('click', function () {
    // Remove other layers
    map.removeLayer(currentLayer);
    map.removeControl(currentLegend);
    currentButton.classList.remove('bg-gray-100');
    currentButton.classList.add('bg-white');
    
    currentLayer = layer;
    currentLegend = legend;
    currentButton = buttonElement;
    
    // Add layer to the map
    currentLayer.addTo(map);
    currentLegend.addTo(map);
    currentButton.classList.add('bg-gray-100');
  });
}

function createLayerAndLegendCategorical(id, variable, label, categoricalColors, firstLayer=false) {
  const layer = getVectorLayerCategorical(variable, label, categoricalColors);
  const legend = getLegendCat(label, categoricalColors);
  const buttonElement = document.getElementById(`button-${id}`);

  if (firstLayer) {
    currentLayer = layer;
    currentLegend = legend;
    currentButton = buttonElement;
    currentButton.classList.remove('bg-white');
    currentButton.classList.add('bg-gray-100');
    currentLayer.addTo(map);
    currentLegend.addTo(map);
  }
  
  buttonElement.addEventListener('click', function () {
    // Remove other layers
    map.removeLayer(currentLayer);
    map.removeControl(currentLegend);
    currentButton.classList.remove('bg-gray-100');
    currentButton.classList.add('bg-white');
    
    currentLayer = layer;
    currentLegend = legend;
    currentButton = buttonElement;
    
    // Add layer to the map
    currentLayer.addTo(map);
    currentLegend.addTo(map);
    currentButton.classList.add('bg-gray-100');
  });
}



