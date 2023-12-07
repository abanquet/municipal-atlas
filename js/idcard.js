// Import Leaflet library
// import 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';

// // Import Esri Leaflet library
// import 'https://unpkg.com/esri-leaflet@3.0.10/dist/esri-leaflet.js';
// import 'https://unpkg.com/esri-leaflet-vector@4.1.0/dist/esri-leaflet-vector.js';

// // Import VectorGrid extension
// import 'https://unpkg.com/leaflet.vectorgrid@1.3.0/dist/Leaflet.VectorGrid.bundled.js';
var tilesUrl = "https://raw.githubusercontent.com/abanquet/municipal-atlas-tiles/main";
// var tilesUrl = "../oecd-municipal-atlas-tiles";

function buildSauProfile(data){
    var sauname = data.launame;

    var fuacode = data.fuacode;
    var fuaname = data.fuaname_en;
    var cityname = data.cityname_en;
    var citycode = data.citycode;
    var tl2_id = data.tl2_id;
    var tl2_name_en = data.tl2_name_en;
    var tl3_id = data.tl3_id;
    var tl3_name_en = data.tl3_name_en;

    if (sauname == undefined) {
        var sauInfo = ''
    } else {
        // var sauInfo = `<b>Commune:</b> ${sauname} <br>`
        var sauInfo = `${sauname}`
    };

    
    var innerHtmlDemography = `
    <div id="topic-demography" class="flex flex-col gap-5 hidden">
        <div class="flex items-center gap-3">
            <div class="text-xl font-bold sm:text-2xl">Demography</div>
        </div>
    `;

    var poptot = data.POP_T;
    if (poptot != undefined) {
        innerHtmlDemography += `
        <div class="flex flex-col gap-2">
            <div class="flex items-start gap-3 px-3">
                <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white"
                style="background: rgb(178, 82, 144);"><i
                    class="fa-fw fa-regular fa-person"></i></div>
                <div class="font-bold text-lg">Population size</div>
            </div>`;
        innerHtmlDemography += `
        <div class="flex items-start gap-2 px-3">                    
            <div class="text-gray-600 items-center justify-center">
                <span style="font-weight: bold; font-size: 1.1rem; color: rgb(178, 82, 144);">${(Math.round(poptot)).toLocaleString('en-US').replaceAll(',', ' ')}</span> 
                persons live in this municipality.
                </div>                     
        </div>
        `;
        innerHtmlDemography += '</div>';
    };

    var youthsh = data.YOUTH_SH;
    var oldsh = data.OLD_SH;
    var workagesh = data.WORKAGE_SH;

    if ((youthsh != undefined) | (workagesh != undefined) | (oldsh != undefined)){
        innerHtmlDemography += `
        <div class="flex flex-col gap-2">
        <div class="flex items-start gap-3 px-3">
                <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white"
                style="background: rgb(178, 82, 144);"><i
                    class="fa-fw fa-regular fa-person-cane"></i></div>
            <div class="font-bold text-lg">Population by age group</div>
        </div>`;
        innerHtmlDemography +=  `
        <div class="flex items-start gap-2 px-3">                    
            <div class="text-gray-600 items-center justify-center">
                <span style="font-weight: bold; font-size: 1.1rem; color: rgb(178, 82, 144);">${Math.round(youthsh * 10) / 10} %</span> 
                of the population is younger than 14 years old.
                </div>                     
        </div>
        `;
        innerHtmlDemography +=  `
        <div class="flex items-start gap-2 px-3">                    
            <div class="text-gray-600 items-center justify-center">
                <span style="font-weight: bold; font-size: 1.1rem; color: rgb(178, 82, 144);">${Math.round(workagesh * 10) / 10} %</span> 
                of the population is between 15 and 64 years old.
                </div>                     
        </div> 
        `;
        innerHtmlDemography +=  `
        <div class="flex items-start gap-2 px-3">                    
            <div class="text-gray-600 items-center justify-center">
                <span style="font-weight: bold; font-size: 1.1rem; color: rgb(178, 82, 144);">${Math.round(oldsh * 10) / 10} %</span> 
                of the population is older than 65 years old.
                </div>                     
        </div>
    `;
    innerHtmlDemography += '</div>'
    };

    var sexratio = data.SEX_RATIO_TOT;
    if (sexratio != undefined) {
        innerHtmlDemography += `
        <div class="flex flex-col gap-2">
        <div class="flex items-start gap-3 px-3">
                <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white"
                style="background: rgb(178, 82, 144);"><i
                    class="fa-fw fa-regular fa-venus-mars"></i></div>
            <div class="font-bold text-lg">Sex ratio</div>
        </div>`;
        innerHtmlDemography += `
        <div class="flex items-start gap-2 px-3">                    
            <div class="text-gray-600 items-center justify-center">
                <span style="font-weight: bold; font-size: 1.1rem; color: rgb(178, 82, 144);">${Math.round(sexratio * 100) / 100}</span> 
                males per 100 females.
                </div>                     
        </div>
        `;
        innerHtmlDemography += '</div>';
    };

    var popch = data.POP_CH;
    if (popch != undefined) {
        innerHtmlDemography += `
        <div class="flex flex-col gap-2">
            <div class="flex items-start gap-3 px-3">
                    <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white"
                    style="background: rgb(178, 82, 144);"><i
                        class="fa-fw fa-regular fa-chart-line-up"></i></div>
                <div class="font-bold text-lg">Population change</div>
            </div>`;
        if (popch > 0) {
            var popchInfo = "of population increase over the past 5 years.";
        } else {
            var popchInfo = "of population loss over the past 5 years.";
        }
        
        innerHtmlDemography += `
        <div class="flex items-start gap-2 px-3">                    
            <div class="text-gray-600 items-center justify-center">
                <span style="font-weight: bold; font-size: 1.1rem; color: rgb(178, 82, 144);">${popch<0?"":"+"}${Math.round(popch * 100) / 100} %</span> 
                ${popchInfo}
                </div>                     
        </div>
        `;
        innerHtmlDemography += '</div>'
    };

    var natch = data.NETNAT_RATE;
    var births = data.BIRTHS_RATE;
    var deaths = data.DEATHS_RATE;
    if ((natch != undefined) | (births != undefined) | (deaths != undefined)){
        innerHtmlDemography += `
        <div class="flex flex-col gap-3">
            <div class="flex items-start gap-3 px-3">
                    <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white"
                    style="background: rgb(178, 82, 144);"><i
                        class="fa-fw fa-regular fa-baby"></i></div>
                <div class="font-bold text-lg">Natural change</div>
            </div>
        `;

            if (natch != undefined) {
        if (natch > 0) {
            var natchInfo = "of natural increase over the past 5 years.";
        } else {
            var natchInfo = "of natural decrease over the past 5 years.";
        }
        innerHtmlDemography += `
        <div class="flex items-start gap-2 px-3">                    
            <div class="text-gray-600 items-center justify-center">
                <span style="font-weight: bold; font-size: 1.1rem; color: rgb(178, 82, 144);">${natch<0?"":"+"}${Math.round(natch * 100) / 100} %</span> 
                ${natchInfo}
                </div>                     
        </div>
        `;
    };
    if (births != undefined) {
        innerHtmlDemography += `
        <div class="flex items-start gap-2 px-3">                    
            <div class="text-gray-600 items-center justify-center">
                <span style="font-weight: bold; font-size: 1.1rem; color: rgb(178, 82, 144);">${Math.round(births * 100) / 100}</span> 
                births per 1000 people on average each year over the past 5 years.
                </div>                     
        </div>
        `;
    };

    if (deaths != undefined) {
        innerHtmlDemography += `
        <div class="flex items-start gap-2 px-3">                    
            <div class="text-gray-600 items-center justify-center">
                <span style="font-weight: bold; font-size: 1.1rem; color: rgb(178, 82, 144);">${Math.round(deaths * 100) / 100}</span> 
                deaths per 1000 people on average each year over the past 5 years.
                </div>                     
        </div>
        `;
    };
    innerHtmlDemography += '</div>'
    };
    
    var netmobmig = data.NETMOBMIG_RATE;
    var netmob = data.NETMOB_RATE;
    var netmig = data.NETMIG_RATE;
    var migrants = data.MIGRANT_SH;

    if ((netmobmig != undefined) | (netmob != undefined) | (netmig != undefined) | (migrants != undefined)){
        innerHtmlDemography += `
        <div class="flex flex-col gap-3">
            <div class="flex items-start gap-3 px-3">
                    <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white"
                    style="background: rgb(178, 82, 144);"><i
                        class="fa-fw fa-regular fa-globe"></i></div>
                <div class="font-bold text-lg">Migration</div>
            </div>
        `;

        if (netmobmig != undefined) {
            if (netmobmig > 0) {
                var netmobmigInfo = "of net migration over the past 5 years.";
            } else {
                var netmobmigInfo = "of net migration over the past 5 years.";
            }
            innerHtmlDemography += `
            <div class="flex items-start gap-2 px-3">                    
                <div class="text-gray-600 items-center justify-center">
                    <span style="font-weight: bold; font-size: 1.1rem; color: rgb(178, 82, 144);">${netmobmig<0?"":"+"}${Math.round(netmobmig * 100) / 100} %</span> 
                    ${netmobmigInfo}
                    </div>                     
            </div>
            `;
        };

        if (netmob != undefined) {
            if (netmob > 0) {
                var netmobInfo = "of net internal mobility over the past 5 years.";
            } else {
                var netmobInfo = "of net internal mobility over the past 5 years.";
            }
            innerHtmlDemography += `
            <div class="flex items-start gap-2 px-3">                    
                <div class="text-gray-600 items-center justify-center">
                    <span style="font-weight: bold; font-size: 1.1rem; color: rgb(178, 82, 144);">${netmob<0?"":"+"}${Math.round(netmob * 100) / 100} %</span> 
                    ${netmobInfo}
                    </div>                     
            </div>
            `;
        };

        if (netmig != undefined) {
            if (netmig > 0) {
                var netmigInfo = "of net international migration over the past 5 years.";
            } else {
                var netmigInfo = "of net international migration over the past 5 years.";
            }
            innerHtmlDemography += `
            <div class="flex items-start gap-2 px-3">                    
                <div class="text-gray-600 items-center justify-center">
                    <span style="font-weight: bold; font-size: 1.1rem; color: rgb(178, 82, 144);">${netmig<0?"":"+"}${Math.round(netmig * 100) / 100} %</span> 
                    ${netmigInfo}
                    </div>                     
            </div>
            `;
        };
        if (migrants != undefined) {
            innerHtmlDemography += `
            <div class="flex items-start gap-2 px-3">                    
                <div class="text-gray-600 items-center justify-center">
                    <span style="font-weight: bold; font-size: 1.1rem; color: rgb(178, 82, 144);">${Math.round(migrants * 100) / 100} %</span> 
                    of the population was born in a foreign country.
                    </div>                     
            </div>
            
            `;
        };

        innerHtmlDemography += '</div>'
        };
        innerHtmlDemography += '</div>'

        var innerHtmlEnvironment = `
        <div id="topic-environment" class="flex flex-col gap-5 hidden">
            <div class="flex items-center gap-2">
                <div>
                    <div class="text-xl font-bold sm:text-2xl">Environment</div>
                </div>
            </div>`;

        var greenAreaShare = data.GREEN_AREA_SHARE;
        var greenAreasCap = data.GREEN_AREA_CAPITA;
        if ((greenAreaShare != undefined) | greenAreasCap != undefined) {
            innerHtmlEnvironment += `
            <div class="flex flex-col gap-2">
                <div class="flex items-start gap-2 px-3">
                    <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white"
                        style="background: rgb(16, 149, 76);"><i class="fa-fw fa-regular fa-seedling"></i></div>
                    <div class="font-bold text-lg">Green areas</div>
                </div>
                `;

            if (greenAreaShare != undefined) {
                innerHtmlEnvironment += `
                <div class="flex items-start gap-2 px-3">                    
                    <div class="text-gray-600 items-center justify-center">
                        <span style="font-weight: bold; font-size: 1.1rem; color: rgb(16, 149, 76);">${Math.round(greenAreaShare * 10) / 10} %</span> 
                        of the area is covered by green spaces.
                        </div>                     
                </div>
                `;
            }

            if (greenAreasCap != undefined) {
                innerHtmlEnvironment += `
                <div class="flex items-start gap-2 px-3">                    
                    <div class="text-gray-600 items-center justify-center">
                        <span style="font-weight: bold; font-size: 1.1rem; color: rgb(16, 149, 76);">${(Math.round(greenAreasCap)).toLocaleString('en-US').replaceAll(',', ' ')} m<sup>2</sup></span> 
                        of green areas per capita.
                        </div>                     
                </div>
               `;
            };
            innerHtmlEnvironment += `</div>
            `;
        }

        var treeCoverChange = data.FOREST_CH;
        if (treeCoverChange != undefined) {
            innerHtmlEnvironment += `
            <div class="flex flex-col gap-2">
                <div class="flex items-start gap-2 px-3">
                    <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white"
                        style="background: rgb(16, 149, 76);"><i class="fa-fw fa-regular fa-trees"></i></div>
                    <div class="font-bold text-lg">Tree cover change</div>
                </div>
                <div class="flex items-start gap-2 px-3">                    
                    <div class="text-gray-600 items-center justify-center">
                        <span style="font-weight: bold; font-size: 1.1rem; color: rgb(16, 149, 76);">${Math.round(treeCoverChange * 100) / 100} %</span> 
                        change in tree cover from 2000 to 2020.
                        </div>                     
                </div>
            </div>`;
        }

        // var O3 = data.O3_POP_W_MEAN;
        // var NO2 = data.NO2_POP_W_MEAN;
        // var PM25 = data.PM2_5_POP_W_MEAN;
        // var PM10 = data.PM10_POP_W_MEAN;

        // if ((O3 != undefined) | (NO2 != undefined) | (PM25 != undefined) | (PM10 != undefined)) {
        //     innerHtmlEnvironment += `
        //     <div class="flex flex-col gap-2">
        //         <div class="flex items-start gap-2 px-3">
        //             <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white"
        //                 style="background: rgb(16, 149, 76);"><i class="fa-fw fa-regular fa-fog"></i></div>
        //             <div class="font-bold text-lg">Air pollution</div>
        //         </div>
        //         `;

        //     if (NO2 != undefined) {
        //         if (NO2 > 10) {
        //             var NO2Info = `${Math.round((100 * (NO2 / 10 - 1)) *10) / 10} % higher`;
        //         } else {
        //             var NO2Info = `${Math.round((100 * (NO2 / 10 - 1)) *10) / 10} % lower`;
        //         }
        //         innerHtmlEnvironment += `
        //         <div class="flex items-start gap-2 px-3">                    
        //             <div class="text-gray-600 items-center justify-center">
        //                 <span style="font-weight: bold; font-size: 1.1rem; color: rgb(16, 149, 76);">${Math.round(NO2 * 10) / 10} μg/m³</span> 
        //                 is the average population exposure to nitrogen dioxide (NO<sub>2</sub>), which is 
        //                 <span style="font-weight: bold; font-size: 1.1rem; color: rgb(16, 149, 76);">${NO2Info}</span> 
        //                 than the WHO guideline.
        //                 </div>                     
        //         </div>
        //         `;
        //     }

        //     if (PM25 != undefined) {
        //         if (PM25 > 5) {
        //             var PM25Info = `${Math.round((100 * (PM25 / 5 - 1)) *10) / 10} % higher`;
        //         } else {
        //             var PM25Info = `${Math.round((100 * (PM25 / 5 - 1)) *10) / 10} % lower`;
        //         }
        //         innerHtmlEnvironment += `
        //         <div class="flex items-start gap-2 px-3">                    
        //             <div class="text-gray-600 items-center justify-center">
        //                 <span style="font-weight: bold; font-size: 1.1rem; color: rgb(16, 149, 76);">${Math.round(PM25 * 10) / 10} μg/m³</span> 
        //                 is the average population exposure to fine particulate matters (PM2.5), which is 
        //                 <span style="font-weight: bold; font-size: 1.1rem; color: rgb(16, 149, 76);">${PM25Info}</span> 
        //                 than the WHO guideline.
        //                 </div>                     
        //         </div>
        //         `;
        //     }

        //     if (PM10 != undefined) {
        //         if (PM10 > 15) {
        //             var PM10Info = `${Math.round((100 * (PM10 / 15 - 1)) * 10) / 10} % higher`;
        //         } else {
        //             var PM10Info = `${Math.round((100 * (PM10 / 15 - 1)) * 10) / 10} % lower`;
        //         }
        //         innerHtmlEnvironment += `
        //         <div class="flex items-start gap-2 px-3">                    
        //             <div class="text-gray-600 items-center justify-center">
        //                 <span style="font-weight: bold; font-size: 1.1rem; color: rgb(16, 149, 76);">${Math.round(PM10 * 10) / 10} μg/m³</span> 
        //                 is the average population exposure to coarse particulate matters (PM10), which is 
        //                 <span style="font-weight: bold; font-size: 1.1rem; color: rgb(16, 149, 76);">${PM10Info}</span> 
        //                 than the WHO guideline.
        //                 </div>                     
        //         </div>
        //         `;
        //     }

        //     if (O3 != undefined) {
        //         if (O3 > 60) {
        //             var O3Info = `${Math.round((100 * (O3 / 60 - 1)) * 10) / 10} % higher`;
        //         } else {
        //             var O3Info = `${Math.round((100 * (O3 / 60 - 1)) * 10) / 10} % lower`;
        //         }
        //         innerHtmlEnvironment += `
        //         <div class="flex items-start gap-2 px-3">                    
        //             <div class="text-gray-600 items-center justify-center">
        //                 <span style="font-weight: bold; font-size: 1.1rem; color: rgb(16, 149, 76);">${Math.round(O3 * 10) / 10} μg/m³</span> 
        //                 is the average average population exposure to ozone (O<sub>3</sub>), which is 
        //                 <span style="font-weight: bold; font-size: 1.1rem; color: rgb(16, 149, 76);">${O3Info}</span> 
        //                 than the WHO guideline.
        //                 </div>                     
        //         </div>
        //         `;
        //     }
        //     innerHtmlEnvironment += `</div>`;
        // }
        innerHtmlEnvironment += `</div>`;

        var innerHtmlEnergy = `
        <div id="topic-energy" class="flex flex-col gap-5 hidden">
            <div class="flex items-center gap-2">
                <div>
                    <div class="text-xl font-bold sm:text-2xl">Energy</div>
                </div>
            </div>`;


        // var enerCons = data.ENER_CONS;
        // var elecCons = data.ELEC_CONS;
        // var gasCons = data.GAS_CONS;
        // if (enerCons != undefined || elecCons != undefined || gasCons != undefined) {
        //     innerHtmlEnergy += `
        //     <div class="flex flex-col gap-2">
        //         <div class="flex items-start gap-2 px-3">
        //             <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white bg-energy"
        //                 ><i class="fa-fw fa-regular fa-power-off"></i></div>
        //             <div class="font-bold text-lg">Final energy consumption</div>
        //         </div>
        //         `;

        //     if (enerCons != undefined) {
        //         innerHtmlEnergy += `
        //         <div class="flex items-start gap-2 px-3">                    
        //             <div class="text-gray-600 items-center justify-center">
        //                 <span style="font-weight: bold; font-size: 1.1rem; color: darkorchid">${(Math.round(enerCons)).toLocaleString('en-US').replaceAll(',', ' ')} MWh</span> 
        //                 of total final energy consumption.
        //                 </div>                     
        //         </div>`;
        //     }

        //     if (elecCons != undefined) {
        //         innerHtmlEnergy += `
        //         <div class="flex items-start gap-2 px-3">                    
        //             <div class="text-gray-600 items-center justify-center">
        //                 <span style="font-weight: bold; font-size: 1.1rem; color: darkorchid">${(Math.round(elecCons)).toLocaleString('en-US').replaceAll(',', ' ')} MWh</span> 
        //                 of electricity consumption.
        //                 </div>                     
        //         </div>`;
        //     }

        //     if (gasCons != undefined) {
        //         innerHtmlEnergy += `
        //         <div class="flex items-start gap-2 px-3">                    
        //             <div class="text-gray-600 items-center justify-center">
        //                 <span style="font-weight: bold; font-size: 1.1rem; color: darkorchid">${(Math.round(gasCons)).toLocaleString('en-US').replaceAll(',', ' ')} MWh</span> 
        //                 of natural gas consumption.
        //                 </div>                     
        //         </div>`;
        //     }
        //     innerHtmlEnergy += '</div>'
        // }
        
        var solarPowerPotential = data.SOLAR_POWER_POT;
        var windPowerPotential = data.WIND_POWER_POT;
        if (solarPowerPotential != undefined || windPowerPotential != undefined) {
            innerHtmlEnergy += `
            <div class="flex flex-col gap-2">
                <div class="flex items-start gap-2 px-3">
                    <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white bg-energy"
                        ><i class="fa-fw fa-regular fa-wind-turbine"></i></div>
                    <div class="font-bold text-lg">Renewable potential</div>
                </div>
                `;

            if (solarPowerPotential != undefined) {
                innerHtmlEnergy += `
                <div class="flex items-start gap-2 px-3">                    
                    <div class="text-gray-600 items-center justify-center">
                        <span style="font-weight: bold; font-size: 1.1rem; color: darkorchid">${Math.round(solarPowerPotential * 10) / 10} kWh/kWp</span> 
                        of solar power potential.
                        </div>                     
                </div>`;
            }

            if (windPowerPotential != undefined) {
                innerHtmlEnergy += `
                <div class="flex items-start gap-2 px-3">                    
                    <div class="text-gray-600 items-center justify-center">
                        <span style="font-weight: bold; font-size: 1.1rem; color: darkorchid;">${Math.round(windPowerPotential * 10) / 10} W/m<sup>2</sup></span> 
                        of wind power potential.
                        </div>                     
                </div>
                `;
            }
            innerHtmlEnergy += '</div>'
        }
        var cdd = data.CDD_T_22C;
        var cddch = data.CDD_T_22C_CH;
        var hdd = data.HDD_T_15C;
        var hddch = data.HDD_T_15C_CH;
        if (cdd != undefined | cddch != undefined) {
            innerHtmlEnergy += `
            <div class="flex flex-col gap-2">
                <div class="flex items-start gap-3 px-3">
                    <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white bg-energy"
                        ><i class="fa-fw fa-regular fa-fan"></i></div>
                    <div class="font-bold text-lg">Cooling Degree Days</div>
                </div>
                `;
    
            if (cdd != undefined & cddch != undefined) {
                innerHtmlEnergy += `
                <div class="flex items-start gap-2 px-3">                    
                    <div class="text-gray-600 items-center justify-center">
                        <span style="font-weight: bold; font-size: 1.1rem; color: darkorchid;">${(Math.round(cdd * 10) / 10).toLocaleString('en-US').replaceAll(',', ' ')}</span> 
                        cooling degree days per year over the past 5 years, which is 
                        <span style="font-weight: bold; font-size: 1.1rem; color: darkorchid;">${(Math.round(cddch * 10) / 10).toLocaleString('en-US').replaceAll(',', ' ')}</span> degree days longer than in 1981-2010.
                    </div>                     
                </div>`;
            }
    
            innerHtmlEnergy += `
            </div>`;
        }
    
        if (hdd != undefined | hddch != undefined) {
            innerHtmlEnergy += `
            <div class="flex flex-col gap-2">
                <div class="flex items-start gap-3 px-3">
                    <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white bg-energy"
                        "><i class="fa-fw fa-regular fa-heat"></i></div>
                    <div class="font-bold text-lg">Heating Degree Days</div>
                </div>
                `;
    
            if (hdd != undefined & hddch != undefined) {
                innerHtmlEnergy += `
                <div class="flex items-start gap-2 px-3">                    
                    <div class="text-gray-600 items-center justify-center">
                        <span style="font-weight: bold; font-size: 1.1rem; color: darkorchid;">${(Math.round(hdd * 10) / 10).toLocaleString('en-US').replaceAll(',', ' ')}</span> 
                        heating degree days per year over the past 5 years, which is 
                        <span style="font-weight: bold; font-size: 1.1rem; color: darkorchid;">${(Math.round(hddch * 10) / 10).toLocaleString('en-US').replaceAll(',', ' ')}</span>
                        degree days lower than in 1981-2010.
                    </div>                     
                </div>`;
            }
    
            innerHtmlEnergy += `
            </div>`;
        }

        innerHtmlEnergy += `</div>`;

        var innerHtmlServices = `
        <div id="topic-services" class="flex flex-col gap-5 hidden">
            <div class="flex items-center gap-2">
                <div>
                    <div class="text-xl font-bold sm:text-2xl">Services</div>
                </div>
            </div>`;

        var downloadSpeedDeviation = data.OOKLA_FIXED_DOWNLOAD_DEV;
        var uploadSpeedDeviation = data.OOKLA_FIXED_UPLOAD_DEV;

        if (downloadSpeedDeviation != undefined || uploadSpeedDeviation != undefined) {
            innerHtmlServices += `
            <div class="flex flex-col gap-2">
                <div class="flex items-start gap-3 px-3">
                    <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white"
                        style="background: rgb(255, 130, 0);"><i class="fa-fw fa-regular fa-wifi"></i></div>
                    <div class="font-bold text-lg">Digitalisation</div>
                </div>
                <div class="flex flex-col gap-2">`;

            if (downloadSpeedDeviation != undefined) {
                if (downloadSpeedDeviation > 0) {
                    var downloadSpeedDeviationInfo = "faster fixed download speed than the national average.";
                } else {
                    var downloadSpeedDeviationInfo = "slower fixed download speed than the national average.";
                }
                innerHtmlServices += `
                <div class="flex items-start gap-2 px-3">                    
                    <div class="text-gray-600 items-center justify-center">
                        <span style="font-weight: bold; font-size: 1.1rem; color: rgb(255, 130, 0);">${Math.round(downloadSpeedDeviation * 10) / 10} %</span> 
                        ${downloadSpeedDeviationInfo}
                        </div>                     
                </div>
                `;
            }

            if (uploadSpeedDeviation != undefined) {
                if (uploadSpeedDeviation > 0) {
                    var uploadSpeedDeviationInfo = "faster upload speed than the national average.";
                } else {
                    var uploadSpeedDeviationInfo = "slower upload speed than the national average.";
                }
                innerHtmlServices += `
                <div class="flex items-start gap-2 px-3">                    
                    <div class="text-gray-600 items-center justify-center">
                        <span style="font-weight: bold; font-size: 1.1rem; color: rgb(255, 130, 0);">${Math.round(uploadSpeedDeviation * 10) / 10} %</span> 
                        ${uploadSpeedDeviationInfo}
                        </div>                     
                </div>
                `;
            }
            innerHtmlServices += '</div>'
        }

    innerHtmlServices += `
        </div>`;

    var innerHtmlGHSL = `
    <div id="topic-ghsl" class="flex flex-col gap-5 hidden">
        <div class="flex items-center gap-2">
            <div>
                <div class="text-xl font-bold sm:text-2xl">Territorial Organisation</div>
            </div>
        </div>`;

    var popdens = data['pop_density_km2'];
    var builts = data['BUILT_S__T'];
    var builtsres = data['BUILT_S_RES'];
    var builtsnres = data['BUILT_S_NRES'];
    var builtv = data['BUILT_V__T'];
    var builtvres = data['BUILT_V_RES'];
    var builtvnres = data['BUILT_V_NRES'];
    var builth = data['BUILT_H'];
    var builtsch = data['BUILT_S__T_CH_2000_2020'];
    var builtsresch = data['BUILT_S_RES_CH_2000_2020'];
    var builtvch = data['BUILT_V__T_CH_2000_2020'];
    var builtvresch = data['BUILT_V_RES_CH_2000_2020'];
    var degurbal1 = data['DEGURBA_L1'];
    var degurbal2 = data['DEGURBA_L2'];

    if (popdens != undefined) {
        innerHtmlGHSL += `
        <div class="flex flex-col gap-2">
            <div class="flex items-start gap-3 px-3">
                <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white"
                    style="background: rgb(122, 64, 43);"><i class="fa-fw fa-regular fa-person-arrow-up-from-line"></i></div>
                <div class="font-bold text-lg">Population density</div>
            </div>
            `;

            innerHtmlGHSL += `
            <div class="flex items-start gap-2 px-3">                    
                <div class="text-gray-600 items-center justify-center">
                    <span style="font-weight: bold; font-size: 1.1rem; color: rgb(122, 64, 43);">${(Math.round(popdens)).toLocaleString('en-US').replaceAll(',', ' ')}  persons/km<sup>2</sup></span> 
                    </div>                     
            </div>
       `;
        innerHtmlGHSL += `
        </div>`;
    }

    if (builts != undefined | builtsres != undefined | builtsnres != undefined | builtsch != undefined) {
        innerHtmlGHSL += `
        <div class="flex flex-col gap-2">
            <div class="flex items-start gap-3 px-3">
                <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white"
                    style="background: rgb(122, 64, 43);"><i class="fa-fw fa-regular fa-square"></i></div>
                <div class="font-bold text-lg">Built-up surface</div>
            </div>
            `;

        if (builts != undefined) {
            innerHtmlGHSL += `
            <div class="flex items-start gap-2 px-3">                    
                <div class="text-gray-600 items-center justify-center">
                    <span style="font-weight: bold; font-size: 1.1rem; color: rgb(122, 64, 43);">${(Math.round(builts * 10) / 10).toLocaleString('en-US').replaceAll(',', ' ')} m<sup>2</sup></span> 
                    of built-up surface per capita.
                    </div>                     
            </div>
            `;
        }

        if (builtsres != undefined) {
            innerHtmlGHSL += `
            <div class="flex items-start gap-2 px-3">                    
                <div class="text-gray-600 items-center justify-center">
                    <span style="font-weight: bold; font-size: 1.1rem; color: rgb(122, 64, 43);">${(Math.round(builtsres * 10) / 10).toLocaleString('en-US').replaceAll(',', ' ')} m<sup>2</sup></span> 
                    of residential built-up surface per capita.
                    </div>                     
            </div>`;
        }

        if (builtsnres != undefined) {
            innerHtmlGHSL += `
            <div class="flex items-start gap-2 px-3">                    
                <div class="text-gray-600 items-center justify-center">
                    <span style="font-weight: bold; font-size: 1.1rem; color: rgb(122, 64, 43);">${(Math.round(builtsnres * 10) / 10).toLocaleString('en-US').replaceAll(',', ' ')} m<sup>2</sup></span> 
                    of non-residential built-up surface per capita.
                    </div>                     
            </div>`;
        }

        if (builtsch != undefined) {
            innerHtmlGHSL += `
            <div class="flex items-start gap-2 px-3">                    
                <div class="text-gray-600 items-center justify-center">
                    <span style="font-weight: bold; font-size: 1.1rem; color: rgb(122, 64, 43);">${builtsch<0?"":"+"}${(Math.round(builtsch * 10) / 10).toLocaleString('en-US').replaceAll(',', ' ')} %</span> 
                    change in built-up surface from 2000 to 2020.
                    </div>                     
            </div>`;
        }

        if (builtsresch != undefined) {
            innerHtmlGHSL += `
            <div class="flex items-start gap-2 px-3">                    
                <div class="text-gray-600 items-center justify-center">
                    <span style="font-weight: bold; font-size: 1.1rem; color: rgb(122, 64, 43);">${builtsresch<0?"":"+"}${(Math.round(builtsresch * 10) / 10).toLocaleString('en-US').replaceAll(',', ' ')} %</span> 
                    change in residential built-up surface from 2000 to 2020.
                    </div>                     
            </div>`;
        }

        innerHtmlGHSL += `
        </div>`;
    }

    if (builtv != undefined | builtvres != undefined | builtvnres != undefined | builth != undefined ) {
        innerHtmlGHSL += `
        <div class="flex flex-col gap-2">
            <div class="flex items-start gap-3 px-3">
                <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white"
                    style="background: rgb(122, 64, 43);"><i class="fa-fw fa-regular fa-cube"></i></div>
                <div class="font-bold text-lg">Built-up volume</div>
            </div>
            `;

        if (builtv != undefined) {
            innerHtmlGHSL += `
            <div class="flex items-start gap-2 px-3">                    
                <div class="text-gray-600 items-center justify-center">
                    <span style="font-weight: bold; font-size: 1.1rem; color: rgb(122, 64, 43);">${(Math.round(builtv * 10) / 10).toLocaleString('en-US').replaceAll(',', ' ')} m<sup>3</sup></span> 
                    of built-up volume per capita.
                    </div>                     
            </div>`;
        }

        if (builtvres != undefined) {
            innerHtmlGHSL += `
            <div class="flex items-start gap-2 px-3">                    
                <div class="text-gray-600 items-center justify-center">
                    <span style="font-weight: bold; font-size: 1.1rem; color: rgb(122, 64, 43);">${(Math.round(builtvres * 10) / 10).toLocaleString('en-US').replaceAll(',', ' ')} m<sup>3</sup></span> 
                    of residential built-up volume per capita.
                </div>                     
            </div>`;
        }

        if (builtvnres != undefined) {
            innerHtmlGHSL += `
            <div class="flex items-start gap-2 px-3">                    
                <div class="text-gray-600 items-center justify-center">
                    <span style="font-weight: bold; font-size: 1.1rem; color: rgb(122, 64, 43);">${(Math.round(builtvnres * 10) / 10).toLocaleString('en-US').replaceAll(',', ' ')} m<sup>3</sup></span> 
                    of non-residential residential built-up volume per capita.
                </div>                     
            </div>`;
        }

        if (builth != undefined) {
            innerHtmlGHSL += `
            <div class="flex items-start gap-2 px-3">                    
                <div class="text-gray-600 items-center justify-center">
                    <span style="font-weight: bold; font-size: 1.1rem; color: rgb(122, 64, 43);">${(Math.round(builth * 10) / 10).toLocaleString('en-US').replaceAll(',', ' ')} m</span> 
                    average building height.
                </div>                     
            </div>`;
        }

        if (builtvch != undefined) {
            innerHtmlGHSL += `
            <div class="flex items-start gap-2 px-3">                    
                <div class="text-gray-600 items-center justify-center">
                    <span style="font-weight: bold; font-size: 1.1rem; color: rgb(122, 64, 43);">${builtvch<0?"":"+"}${(Math.round(builtvch * 10) / 10).toLocaleString('en-US').replaceAll(',', ' ')} %</span> 
                    change in built-up volume from 2000 to 2020.
                    </div>                     
            </div>`;
        }

        if (builtvresch != undefined) {
            innerHtmlGHSL += `
            <div class="flex items-start gap-2 px-3">                    
                <div class="text-gray-600 items-center justify-center">
                    <span style="font-weight: bold; font-size: 1.1rem; color: rgb(122, 64, 43);">${builtvresch<0?"":"+"}${(Math.round(builtvresch * 10) / 10).toLocaleString('en-US').replaceAll(',', ' ')} %</span> 
                    change in residential built-up volume from 2000 to 2020.
                    </div>                     
            </div>`;
        }

        innerHtmlGHSL += `
        </div>`;
    }

    if (degurbal1 != undefined | degurbal2 != undefined ) {
        innerHtmlGHSL += `
        <div class="flex flex-col gap-2">
            <div class="flex items-start gap-3 px-3">
                <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white"
                    style="background: rgb(122, 64, 43);"><i class="fa-fw fa-regular fa-tree-city"></i></div>
                <div class="font-bold text-lg">Degree of Urbanisation</div>
            </div>
            `;

        if (degurbal1 != undefined) {
            innerHtmlGHSL += `
            <div class="flex items-start gap-2 px-3">                    
                <div class="text-gray-600 items-center justify-center">
                    <span style="font-weight: bold; font-size: 1.1rem; color: rgb(122, 64, 43);">${degurbal1}</span> 
                    (Level 1 classification)
                </div>                     
            </div>
            `;
        }

        if (degurbal2 != undefined) {
            innerHtmlGHSL += `
            <div class="flex items-start gap-2 px-3">                    
                <div class="text-gray-600 items-center justify-center">
                    <span style="font-weight: bold; font-size: 1.1rem; color: rgb(122, 64, 43);">${degurbal2}</span> 
                    (Level 2 classification)
                </div>                     
            </div>`;
        }
        innerHtmlGHSL += '</div>'
    }

    innerHtmlGHSL += `
        </div>`;


    var innerHtmlClimate = `
    <div id="topic-climate" class="flex flex-col gap-5 hidden">
        <div class="flex items-center gap-2">
            <div>
                <div class="text-xl font-bold sm:text-2xl">Climate</div>
            </div>
        </div>`;

    var temp = data.AIR_TEMP2M;
    var tempCh = data.AIR_TEMP2M_DIFF_1981_2010;
    var daylst = data.LST_DAY_SUMMER;
    var nightlst = data.LST_NIGHT_SUMMER;
    var hotDays = data.HOT_DAYS;
    var hotDaysCh = data.HOT_DAYS_DIFF_1981_2010;
    var utci32Days = data.UTCI_GT32;
    var utci32DaysCh = data.UTCI_GT32_DIFF_1981_2010;
    var utci38Days = data.UTCI_GT38;
    var utci38DaysCh = data.UTCI_GT38_DIFF_1981_2010;
    var utci46Days = data.UTCI_GT46;
    var utci46DaysCh = data.UTCI_GT46_DIFF_1981_2010;
    var tropicalNights = data.TROPICAL_NIGHTS;
    var tropicalNightsCh = data.TROPICAL_NIGHTS_DIFF_1981_2010;
    var precip = data.PRECIP_SUM;
    var precipCh = data.PRECIP_SUM_DIFF_1981_2010;
    var extPrecip = data.EXT_PRECIP_DAYS;
    var extPrecipCh = data.EXT_PRECIP_DAYS_1981_2010;
    var drought = data.SOIL_MOIST_L1_CH_1981_2018;
    var fire = data.FIRE_TOTAL_AREA_SH;
    var riverFlood = data.RIVER_FLOOD_RP100_POP_SH;
    var coastalFlood = data.COASTALFLOOD_RP100_POP_SH;

    if (temp != undefined | tempCh != undefined | daylst != undefined | nightlst != undefined) {
        innerHtmlClimate += `
        <div class="flex flex-col gap-2">
            <div class="flex items-start gap-3 px-3">
                <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white"
                    style="background: darkred;"><i class="fa-fw fa-regular fa-temperature-arrow-up"></i></div>
                <div class="font-bold text-lg">Temperature trends</div>
            </div>
            `;
            

        if (temp != undefined & tempCh != undefined) {
            innerHtmlClimate += `
            <div class="flex items-start gap-2 px-3">                    
                <div class="text-gray-600 items-center justify-center">
                    <span style="font-weight: bold; font-size: 1.1rem; color: darkred;">${Math.round(temp * 10) / 10}°C</span> 
                    is the average annual air temperature in the past 5 years, which increased by 
                    <span style="font-weight: bold; font-size: 1.1rem; color: darkred;">${tempCh<0?"":"+"}${Math.round(tempCh * 10) / 10}°C</span> 
                    compared to 1981-2010.
                </div>                     
            </div>`;
        }

        if (daylst != undefined | nightlst != undefined) {
            innerHtmlClimate += `
            <div class="flex items-start gap-2 px-3">
                <div class="text-gray-600 items-center justify-center">
                    <span style="font-weight: bold; font-size: 1.1rem; color: darkred;">${Math.round(daylst * 10) / 10}°C</span>
                    is the average summer daytime land surface temperature and
                    <span style="font-weight: bold; font-size: 1.1rem; color: darkred;">${Math.round(nightlst * 10) / 10}°C</span>
                    is the average summer nighttime land surface temperature.
                </div>
            </div>`;
        }

        innerHtmlClimate += `
        </div>`;
    }

    if (hotDays != undefined | hotDaysCh != undefined | tropicalNights != undefined | tropicalNightsCh != undefined | utci32Days != undefined  | utci38Days != undefined  | utci46Days != undefined) {
        innerHtmlClimate += `
        <div class="flex flex-col gap-2">
            <div class="flex items-start gap-3 px-3">
                <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white"
                    style="background: darkred;"><i class="fa-fw fa-regular fa-temperature-sun"></i></div>
                <div class="font-bold text-lg">Heat stress</div>
            </div>
            `;

        if (hotDays != undefined & hotDaysCh != undefined) {
            innerHtmlClimate += `
            <div class="flex items-start gap-2 px-3">                    
                <div class="text-gray-600 items-center justify-center">
                    <span style="font-weight: bold; font-size: 1.1rem; color: darkred;">${Math.round(hotDays * 10) / 10} hot days</span> per year over the past 5 years, 
                    i.e. days during which the maximum daily temperature is higher than 35°C, which is 
                    <span style="font-weight: bold; font-size: 1.1rem; color: darkred;">${Math.round(hotDaysCh * 10) / 10} days</span> longer than in 1981-2010.
                </div>                     
            </div>`;
        }

        if (tropicalNights != undefined & tropicalNightsCh != undefined) {
            innerHtmlClimate += `
            <div class="flex items-start gap-2 px-3">                    
                <div class="text-gray-600 items-center justify-center">
                    <span style="font-weight: bold; font-size: 1.1rem; color: darkred;">${Math.round(tropicalNights * 10) / 10} tropical nights</span> per year over the past 5 years, 
                    i.e. days during which the minimum daily temperature is higher than 20°C, which is 
                    <span style="font-weight: bold; font-size: 1.1rem; color: darkred;">${Math.round(tropicalNightsCh * 10) / 10} nights</span> longer than in 1981-2010.
                </div>
            </div>`;
        }

        innerHtmlClimate += `
            <div class="flex items-start gap-2 px-3">                    
                <div class="text-gray-600 items-center justify-center">
                Hot days and tropical nights are based on the air temperature and do not take into account other meteorological variables impacting thermal comfort.
                The Universal Thermal Climate Index (UTCI) provides a more comprehensive measure of thermal comfort by considering factors such as humidity, wind speed, and radiation, offering a more accurate assessment than air temperature alone.
                </div>
            </div>`;

        if (utci32Days != undefined & utci32DaysCh != undefined) {
            innerHtmlClimate += `
            <div class="flex items-start gap-2 px-3">                    
                <div class="text-gray-600 items-center justify-center">
                    <span style="font-weight: bold; font-size: 1.1rem; color: darkred;">${Math.round(utci32Days * 10) / 10} strong heat stress days</span> per year over the past 5 years, 
                    i.e. days during which the maximum daily UTCI is higher than 32°C, which is 
                    <span style="font-weight: bold; font-size: 1.1rem; color: darkred;">${Math.round(utci32DaysCh * 10) / 10} days</span> longer than in 1981-2010.
                </div>
            </div>`;
        }

        if (utci38Days != undefined & utci38DaysCh != undefined) {
            innerHtmlClimate += `
            <div class="flex items-start gap-2 px-3">                    
                <div class="text-gray-600 items-center justify-center">
                    <span style="font-weight: bold; font-size: 1.1rem; color: darkred;">${Math.round(utci38Days * 10) / 10} very strong heat stress days</span> per year over the past 5 years, 
                    i.e. days during which the maximum daily UTCI is higher than 38°C, which is 
                    <span style="font-weight: bold; font-size: 1.1rem; color: darkred;">${Math.round(utci38DaysCh * 10) / 10} days</span> longer than in 1981-2010.
                </div>
            </div>`;
        }

        if (utci46Days != undefined & utci46DaysCh != undefined) {
            innerHtmlClimate += `
            <div class="flex items-start gap-2 px-3">                    
                <div class="text-gray-600 items-center justify-center">
                    <span style="font-weight: bold; font-size: 1.1rem; color: darkred;">${Math.round(utci46Days * 10) / 10} extreme heat stress days</span> per year over the past 5 years, 
                    i.e. days during which the maximum daily UTCI is higher than 46°C, which is 
                    <span style="font-weight: bold; font-size: 1.1rem; color: darkred;">${Math.round(utci46DaysCh * 10) / 10} days</span> longer than in 1981-2010.
                </div>
            </div>`;
        }

        innerHtmlClimate += `
        </div>`;
    }

    if (precip != undefined | precipCh != undefined | extPrecip != undefined | extPrecipCh != undefined) {
        innerHtmlClimate += `
        <div class="flex flex-col gap-2">
            <div class="flex items-start gap-3 px-3">
                <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white"
                    style="background: darkred;"><i class="fa-fw fa-regular fa-cloud-showers-heavy"></i></div>
                <div class="font-bold text-lg">Precipitation</div>
            </div>
            `;

        if (precip != undefined & precipCh != undefined) {
            innerHtmlClimate += `
            <div class="flex items-start gap-2 px-3">                    
                <div class="text-gray-600 items-center justify-center">
                    <span style="font-weight: bold; font-size: 1.1rem; color: darkred;">${Math.round(precip * 10) / 10} mm</span> 
                    of yearly accumulated precipitation over the past 5 years, which is 
                    <span style="font-weight: bold; font-size: 1.1rem; color: darkred;">${Math.round(precipCh * 10) / 10} mm</span>
                    ${precipCh<0?"lower":"higher"} than in 1981-2010.
                </div>                     
            </div>`;
        }

        if (extPrecip != undefined & extPrecipCh != undefined) {
            innerHtmlClimate += `
            <div class="flex items-start gap-2 px-3">                    
                <div class="text-gray-600 items-center justify-center">
                    <span style="font-weight: bold; font-size: 1.1rem; color: darkred;">${Math.round(extPrecip * 10) / 10} days</span> 
                    per year of extreme precipitation (daily precipitation above 20 mm) over the past 5 years, which is 
                    <span style="font-weight: bold; font-size: 1.1rem; color: darkred;">${Math.round(extPrecipCh * 10) / 10} days</span>
                    ${extPrecipCh<0?"less":"more"} than in 1981-2010.
                </div>                     
            </div>`;
        }

        innerHtmlClimate += `
        </div>`;
    }

    if (drought != undefined ) {
        innerHtmlClimate += `
        <div class="flex flex-col gap-2">
            <div class="flex items-start gap-3 px-3">
                <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white"
                    style="background: darkred;"><i class="fa-fw fa-regular fa-sun-plant-wilt"></i></div>
                <div class="font-bold text-lg">Drought</div>
            </div>
            `;

        if (drought != undefined) {
            innerHtmlClimate += `
            <div class="flex items-start gap-2 px-3">                    
                <div class="text-gray-600 items-center justify-center">
                    <span style="font-weight: bold; font-size: 1.1rem; color: darkred;">${Math.round(drought * 10) / 10}%</span> 
                    of soil moisture change over the past 5 years compared to 1981-2010.
                </div>                     
            </div>`;
        }

        innerHtmlClimate += `
        </div>`;
    }

    if (fire != undefined ) {
        innerHtmlClimate += `
        <div class="flex flex-col gap-2">
            <div class="flex items-start gap-3 px-3">
                <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white"
                    style="background: darkred;"><i class="fa-fw fa-regular fa-fire"></i></div>
                <div class="font-bold text-lg">Fires</div>
            </div>
            `;

        if (fire != undefined) {
            innerHtmlClimate += `
            <div class="flex items-start gap-2 px-3">                    
                <div class="text-gray-600 items-center justify-center">
                    <span style="font-weight: bold; font-size: 1.1rem; color: darkred;">${Math.round(fire * 10) / 10}%</span> 
                    of the total area was burned in the past 5 years.
                </div>                     
            </div>`;
        }

        innerHtmlClimate += `
        </div>`;
    }

    if (riverFlood != undefined ) {
        innerHtmlClimate += `
        <div class="flex flex-col gap-2">
            <div class="flex items-start gap-3 px-3">
                <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white"
                    style="background: darkred;"><i class="fa-fw fa-regular fa-house-flood-water"></i></div>
                <div class="font-bold text-lg">River Flooding</div>
            </div>
            `;

        if (riverFlood != undefined) {
            innerHtmlClimate += `
            <div class="flex items-start gap-2 px-3">                    
                <div class="text-gray-600 items-center justify-center">
                    <span style="font-weight: bold; font-size: 1.1rem; color: darkred;">${Math.round(riverFlood * 10) / 10}%</span> 
                    of the total population is exposed to 100-year river flooding.
                </div>                     
            </div>`;
        }

        innerHtmlClimate += `
        </div>`;
    }

    if (coastalFlood != undefined ) {
        innerHtmlClimate += `
        <div class="flex flex-col gap-2">
            <div class="flex items-start gap-3 px-3">
                <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white"
                    style="background: darkred;"><i class="fa-fw fa-regular fa-house-tsunami"></i></div>
                <div class="font-bold text-lg">Coastal Flooding</div>
            </div>
            `;

        if (coastalFlood != undefined) {
            innerHtmlClimate += `
            <div class="flex items-start gap-2 px-3">                    
                <div class="text-gray-600 items-center justify-center">
                    <span style="font-weight: bold; font-size: 1.1rem; color: darkred;">${Math.round(coastalFlood * 10) / 10}%</span> 
                    of the total population is exposed to 100-year coastal flooding.
                </div>                     
            </div>`;
        }
        innerHtmlClimate += '</div>'
    }

    innerHtmlClimate += `
        </div>`;

    var innerHtmlEcon = `
    <div id="topic-economy" class="flex flex-col gap-5 hidden">
        <div class="flex items-center gap-2">
            <div>
                <div class="text-xl font-bold sm:text-2xl">Economy and Labour</div>
            </div>
        </div>
    `;

    var medianIncome = data.MEDIAN_DISP_INC;
    var povertyRate = data.POV_RATE_60;
    var giniCoefficient = data.GINI;
    var unemploymentRate = data.UNEMP_RA_15_64;
    var rentPerSqMeter = data.RENT_M2;
    var housingPricePerSqMeter = data.HOUSING_PRICE_M2;

    if (medianIncome != undefined | povertyRate != undefined | giniCoefficient != undefined) {
        innerHtmlEcon += `
        <div class="flex flex-col gap-2">
            <div class="flex items-start gap-3 px-3">
                <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white"
                    style="background: rgb(77, 82, 168);"><i class="fa-fw fa-regular fa-dollar-sign"></i></div>
                <div class="font-bold text-lg">Income distribution</div>
            </div>
            `;

        if (medianIncome != undefined) {
            innerHtmlEcon += `
            <div class="flex items-start gap-2 px-3">                    
                <div class="text-gray-600 items-center justify-center">
                    <span style="font-weight: bold; font-size: 1.1rem; color: rgb(77, 82, 168);">${(Math.round(medianIncome * 10) / 10).toLocaleString('en-US').replaceAll(',', ' ')} €</span> 
                    is the median disposable income.
                </div>                     
            </div>`;
        }

        if (povertyRate != undefined) {
            innerHtmlEcon += `
            <div class="flex items-start gap-2 px-3">                    
                <div class="text-gray-600 items-center justify-center">
                    <span style="font-weight: bold; font-size: 1.1rem; color: rgb(77, 82, 168);">${Math.round(povertyRate * 10) / 10} %</span> 
                    of the population lives below the poverty line (defined as 60% of the national median disposable income).
                </div>                     
            </div>
            `;
        }

        if (giniCoefficient != undefined) {
            innerHtmlEcon += `
            <div class="flex items-start gap-2 px-3">                    
                <div class="text-gray-600 items-center justify-center">
                    <span style="font-weight: bold; font-size: 1.1rem; color: rgb(77, 82, 168);">${Math.round(giniCoefficient * 10) / 10}</span> 
                    is the Gini coefficient.
                    </div>                     
            </div>`;
        }

        innerHtmlEcon += `
        </div>`;
    }

    if (unemploymentRate != undefined) {
        innerHtmlEcon += `
        <div class="flex flex-col gap-2">
            <div class="flex items-start gap-3 px-3">
                <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white"
                    style="background: rgb(77, 82, 168);"><i class="fa-fw fa-regular fa-briefcase"></i></div>
                <div class="font-bold text-lg">Labour</div>
            </div>
            `;

        innerHtmlEcon += `
        <div class="flex items-start gap-2 px-3">                    
                <div class="text-gray-600 items-center justify-center">
                    <span style="font-weight: bold; font-size: 1.1rem; color: rgb(77, 82, 168);">${Math.round(unemploymentRate * 10) / 10} %</span> 
                    of the labour force between 15 and 64 years old is unemployed.
                    </div>                     
            </div>`;
        innerHtmlEcon += `
        </div>`;
    }

    if (rentPerSqMeter != undefined | housingPricePerSqMeter != undefined) {
        innerHtmlEcon += `
        <div class="flex flex-col gap-2">
            <div class="flex items-start gap-3 px-3">
                <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white"
                    style="background: rgb(77, 82, 168);"><i class="fa-fw fa-regular fa-house"></i></div>
                <div class="font-bold text-lg">Housing</div>
            </div>
            `;

        if (rentPerSqMeter != undefined) {
            innerHtmlEcon += `
            <div class="flex items-start gap-2 px-3">                    
                <div class="text-gray-600 items-center justify-center">
                    <span style="font-weight: bold; font-size: 1.1rem; color: rgb(77, 82, 168);">${Math.round(rentPerSqMeter * 10) / 10}  €/m<sup>2</sup></span> 
                    is the average rent.
                    </div>                     
            </div>
            `;
            }

        if (housingPricePerSqMeter != undefined) {
            innerHtmlEcon += `
            <div class="flex items-start gap-2 px-3">                    
                <div class="text-gray-600 items-center justify-center">
                    <span style="font-weight: bold; font-size: 1.1rem; color: rgb(77, 82, 168);">${(Math.round(housingPricePerSqMeter * 10) / 10).toLocaleString('en-US').replaceAll(',', ' ')}  €/m<sup>2</sup></span> 
                    is the average home transaction price.
                </div>                     
            </div>`;
        }
        innerHtmlEcon += `
        </div>`;
    }
    innerHtmlEcon += `
        </div>`;


    var innerHtmlHighlights = `
    <div id="topic-highlights" class="flex flex-col gap-5">
        <div class="flex items-center gap-2">
            <div>
                <div class="text-xl font-bold sm:text-2xl">Highlights</div>
            </div>
        </div>
        <div class=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">        
    `;

    var poptot = data.POP_T;
    if (poptot != undefined) {
        innerHtmlHighlights += `
        
                <div class="flex flex-col gap-1 p-3 rounded-md border border-gray-600">
                    <div class="flex items-start gap-3 justify-center">
                        <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white bg-gray-800"><i
                            class="fa-fw fa-regular fa-person"></i></div>
                        <div class="font-bold text-lg">Total population</div>
                    </div>
                    <div class="text-gray-600 items-center justify-center ">
                        <span style="font-weight: bold; font-size: 1.1rem; color: rgb(31 41 55);">${(Math.round(poptot)).toLocaleString('en-US').replaceAll(',', ' ')}</span> 
                        persons
                    </div>   
                </div>
            `;
    };

    var popdens = data.pop_density_km2;
    if (popdens != undefined) {
        innerHtmlHighlights += `
        
                <div class="flex flex-col gap-1 p-3 rounded-md border border-gray-600">
                    <div class="flex items-start gap-3 justify-center">
                        <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white bg-gray-800"><i
                            class="fa-fw fa-regular fa-person-arrow-up-from-line"></i></div>
                        <div class="font-bold text-lg">Population density</div>
                    </div>
                    <div class="text-gray-600 items-center justify-center ">
                        <span style="font-weight: bold; font-size: 1.1rem; color: rgb(31 41 55);">${(Math.round(popdens)).toLocaleString('en-US').replaceAll(',', ' ')}</span> 
                        persons/km<sup>2</sup>
                    </div>   
                </div>
            `;
    };

    var popch = data.POP_CH;
    if (popch != undefined) {
        if (popch > 0) {
            var popchInfo = "of population increase over the past 5 years.";
        } else {
            var popchInfo = "of population loss over the past 5 years.";
        }
        
        innerHtmlHighlights += `
                <div class="flex flex-col gap-1 p-3 rounded-md border border-gray-600">
                    <div class="flex items-start gap-3 justify-center">
                        <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white bg-gray-800"><i
                            class="fa-fw fa-regular fa-chart-line-up"></i></div>
                        <div class="font-bold text-lg">Population change</div>
                    </div>                  
                    <div class="text-gray-600 items-center justify-center ">
                        <span style="font-weight: bold; font-size: 1.1rem; color: rgb(31 41 55);">${popch<0?"":"+"}${Math.round(popch * 100) / 100}%</span> 
                        over the past 5 years
                    </div>                  
                </div>
            `;
        
    };

    var tempCh = data.AIR_TEMP2M_DIFF_1981_2010;
    if (tempCh != undefined) {
        innerHtmlHighlights += `
                <div class="flex flex-col gap-1 p-3 rounded-md border border-gray-600 ">
                    <div class="flex items-start gap-3 justify-center">
                        <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white bg-gray-800"><i
                            class="fa-fw fa-regular fa-temperature-arrow-up"></i></div>
                        <div class="font-bold text-lg">Climate change</div>
                    </div>                  
                    <div class="text-gray-600 items-center justify-center">
                        <span style="font-weight: bold; font-size: 1.1rem; color: rgb(31 41 55);">${tempCh<0?"":"+"}${Math.round(tempCh * 10) / 10}°C</span> 
                        warmer than during 1981-2010
                    </div>                  
                </div>
            `;
        
    }


    var treeCoverChange = data.FOREST_CH;
    if (tempCh != undefined) {
        innerHtmlHighlights += `
                <div class="flex flex-col gap-1 p-3 rounded-md border border-gray-600 ">
                    <div class="flex items-start gap-3 justify-center">
                        <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white bg-gray-800"><i
                            class="fa-fw fa-regular fa-trees"></i></div>
                        <div class="font-bold text-lg">Tree cover change</div>
                    </div>                  
                    <div class="text-gray-600 items-center justify-center">
                        <span style="font-weight: bold; font-size: 1.1rem; color: rgb(31 41 55);">${treeCoverChange<0?"":"+"}${Math.round(treeCoverChange * 10) / 10}%</span> 
                        from 2000 to 2020.
                    </div>                  
                </div>
            `;
        
    }

    var medianIncome = data.MEDIAN_DISP_INC_PC_CURR_PR;
    var povertyRate = data.POV_RATE_60;
    var unemploymentRate = data.UNEMP_RA_15_64;
    var housingPricePerSqMeter = data.HOUSING_PRICE_M2;

    if (medianIncome != undefined) {
        innerHtmlHighlights += `
                <div class="flex flex-col gap-1 p-3 rounded-md border border-gray-600">
                    <div class="flex items-start gap-3 justify-center">
                        <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white bg-gray-800"><i
                            class="fa-fw fa-regular fa-dollar-sign"></i></div>
                        <div class="font-bold text-lg">Income</div>
                    </div>                  
                    <div class="text-gray-600 items-center justify-center">
                        <span style="font-weight: bold; font-size: 1.1rem; color: rgb(31 41 55);">${(Math.round(medianIncome * 10) / 10).toLocaleString('en-US').replaceAll(',', ' ')} €</span> 
                        median disposable income.
                    </div>                  
                </div>
            `;
        
    }

    if (unemploymentRate != undefined) {
        innerHtmlHighlights += `
                <div class="flex flex-col gap-1 p-3 rounded-md border border-gray-600">
                    <div class="flex items-start gap-3 justify-center">
                        <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white bg-gray-800"><i
                            class="fa-fw fa-regular fa-suitcase"></i></div>
                        <div class="font-bold text-lg">Employment</div>
                    </div>                  
                    <div class="text-gray-600 items-center justify-center ">
                        <span style="font-weight: bold; font-size: 1.1rem; color: rgb(31 41 55);">${(Math.round(unemploymentRate * 10) / 10)} %</span> 
                        unemployment rate
                    </div>                  
                </div>
            `;
    }

    if (housingPricePerSqMeter != undefined) {
        innerHtmlHighlights += `
                <div class="flex flex-col gap-1 p-3 rounded-md border border-gray-600">
                    <div class="flex items-start gap-3 justify-center">
                        <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white bg-gray-800"><i
                            class="fa-fw fa-regular fa-house"></i></div>
                        <div class="font-bold text-lg">Housing</div>
                    </div>                  
                    <div class="text-gray-600 items-center justify-center ">
                        <span style="font-weight: bold; font-size: 1.1rem; color: rgb(31 41 55);">${(Math.round(housingPricePerSqMeter)).toLocaleString('en-US').replaceAll(',', ' ')}  €/m<sup>2</sup> </span> 
                        average transaction price.
                    </div>                  
                </div>
            `;
    }

    var downloadSpeedDeviation = data.OOKLA_FIXED_DOWNLOAD_DEV;
    if (downloadSpeedDeviation != undefined) {
        if (downloadSpeedDeviation > 0) {
            var downloadSpeedDeviationInfo = "faster fixed download speed than the national average.";
        } else {
            var downloadSpeedDeviationInfo = "slower fixed download speed than the national average.";
        }
        innerHtmlHighlights += `
                <div class="flex flex-col gap-1 p-3 rounded-md border border-gray-600">
                    <div class="flex items-start gap-3 justify-center">
                        <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white bg-gray-800"><i
                            class="fa-fw fa-regular fa-wifi"></i></div>
                        <div class="font-bold text-lg">Digitalisation</div>
                    </div>                  
                    <div class="text-gray-600 items-center justify-center ">
                        <span style="font-weight: bold; font-size: 1.1rem; color: rgb(31 41 55);">${Math.round(downloadSpeedDeviation * 10) / 10} % </span> 
                        ${downloadSpeedDeviationInfo}
                    </div>                  
                </div>
            `;
    }

    
    innerHtmlHighlights += `</div></div>`

    sauHtmlContent = `
    <hr />
    <div class="flex flex-col gap-8 break-words print:!w-full sm:w">
        <div class="flex flex-wrap items-center gap-2">
            <div id="button-highlights" class="cursor-pointer flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl text-white bg-highlights"
                title="Highlights"><i class="fa-fw fa-regular fa-square-info"></i>
            </div>
            <div id="button-demography" class="cursor-pointer flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl text-white bg-gray-700 hover:bg-gray-900"
                title="Demography"><i class="fa-fw fa-regular fa-people"></i>
            </div>
            <div id="button-environment" class="cursor-pointer flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl text-white bg-gray-700 hover:bg-gray-900"
                title="Environment"><i class="fa-fw fa-regular fa-seedling"></i>
            </div>
            <div id="button-energy" class="cursor-pointer flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl text-white bg-gray-700 hover:bg-gray-900"
                title="Energy"><i class="fa-fw fa-regular fa-bolt"></i>
            </div>
            <div id="button-climate" class="cursor-pointer flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl text-white bg-gray-700 hover:bg-gray-900"
                title="Climate"><i class="fa-fw fa-regular fa-temperature-arrow-up"></i>
            </div>
            <div id="button-economy" class="cursor-pointer flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl text-white bg-gray-700 hover:bg-gray-900"
                title="Economy and Labour"><i class="fa-fw fa-regular fa-building-columns"></i>
            </div>
            <div id="button-ghsl" class="cursor-pointer flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl text-white bg-gray-700 hover:bg-gray-900"
                title="Territorial Organisation"><i class="fa-fw fa-regular fa-building-user"></i>
            </div>
            <div id="button-services" class="cursor-pointer flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl text-white bg-gray-700 hover:bg-gray-900"
                title="Services"><i class="fa-fw fa-regular fa-shop"></i>
            </div>
            
        </div>

        <div id="topic-content" class="flex flex-col gap-8">
        ${innerHtmlHighlights}
        ${innerHtmlDemography}
        ${innerHtmlEnvironment}
        ${innerHtmlEnergy}
        ${innerHtmlClimate}
        ${innerHtmlEcon}
        ${innerHtmlGHSL}
        ${innerHtmlServices}
        </div>
    </div>
    <hr />
    `;

return sauHtmlContent
};


function buildSauHighlights(data){
    
    var innerHtmlHighlights = `<div class="flex items-center gap-2">
    <div>
        <div class="text-xl font-bold sm:text-2xl">Highlights</div>
    </div>
</div>
        <div class=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
    `;

    var poptot = data.POP_T;
    if (poptot != undefined) {
        innerHtmlHighlights += `
        
                <div class="flex flex-col gap-1 p-3 rounded-md border border-gray-600">
                    <div class="flex items-start gap-3 justify-center">
                        <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white bg-gray-800"><i
                            class="fa-fw fa-regular fa-person"></i></div>
                        <div class="font-bold text-lg">Total population</div>
                    </div>
                    <div class="text-gray-600 items-center justify-center ">
                        <span style="font-weight: bold; font-size: 1.1rem; color: rgb(31 41 55);">${(Math.round(poptot)).toLocaleString('en-US').replaceAll(',', ' ')}</span> 
                        persons
                    </div>   
                </div>
            `;
    };

    var popdens = data.pop_density_km2;
    if (popdens != undefined) {
        innerHtmlHighlights += `
        
                <div class="flex flex-col gap-1 p-3 rounded-md border border-gray-600">
                    <div class="flex items-start gap-3 justify-center">
                        <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white bg-gray-800"><i
                            class="fa-fw fa-regular fa-person-arrow-up-from-line"></i></div>
                        <div class="font-bold text-lg">Population density</div>
                    </div>
                    <div class="text-gray-600 items-center justify-center ">
                        <span style="font-weight: bold; font-size: 1.1rem; color: rgb(31 41 55);">${(Math.round(popdens)).toLocaleString('en-US').replaceAll(',', ' ')}</span> 
                        persons/km<sup>2</sup>
                    </div>   
                </div>
            `;
    };

    var popch = data.POP_CH;
    if (popch != undefined) {
        if (popch > 0) {
            var popchInfo = "of population increase over the past 5 years.";
        } else {
            var popchInfo = "of population loss over the past 5 years.";
        }
        
        innerHtmlHighlights += `
                <div class="flex flex-col gap-1 p-3 rounded-md border border-gray-600">
                    <div class="flex items-start gap-3 justify-center">
                        <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white bg-gray-800"><i
                            class="fa-fw fa-regular fa-chart-line-up"></i></div>
                        <div class="font-bold text-lg">Population change</div>
                    </div>                  
                    <div class="text-gray-600 items-center justify-center ">
                        <span style="font-weight: bold; font-size: 1.1rem; color: rgb(31 41 55);">${popch<0?"":"+"}${Math.round(popch * 100) / 100}%</span> 
                        over the past 5 years
                    </div>                  
                </div>
            `;
        
    };

    var tempCh = data.AIR_TEMP2M_DIFF_1981_2010;
    if (tempCh != undefined) {
        innerHtmlHighlights += `
                <div class="flex flex-col gap-1 p-3 rounded-md border border-gray-600 ">
                    <div class="flex items-start gap-3 justify-center">
                        <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white bg-gray-800"><i
                            class="fa-fw fa-regular fa-temperature-arrow-up"></i></div>
                        <div class="font-bold text-lg">Climate change</div>
                    </div>                  
                    <div class="text-gray-600 items-center justify-center">
                        <span style="font-weight: bold; font-size: 1.1rem; color: rgb(31 41 55);">${tempCh<0?"":"+"}${Math.round(tempCh * 10) / 10}°C</span> 
                        warmer than during 1981-2010
                    </div>                  
                </div>
            `;
        
    }


    var treeCoverChange = data.FOREST_CH;
    if (tempCh != undefined) {
        innerHtmlHighlights += `
                <div class="flex flex-col gap-1 p-3 rounded-md border border-gray-600 ">
                    <div class="flex items-start gap-3 justify-center">
                        <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white bg-gray-800"><i
                            class="fa-fw fa-regular fa-trees"></i></div>
                        <div class="font-bold text-lg">Tree cover change</div>
                    </div>                  
                    <div class="text-gray-600 items-center justify-center">
                        <span style="font-weight: bold; font-size: 1.1rem; color: rgb(31 41 55);">${treeCoverChange<0?"":"+"}${Math.round(treeCoverChange * 10) / 10}%</span> 
                        from 2000 to 2020.
                    </div>                  
                </div>
            `;
        
    }

    var medianIncome = data.MEDIAN_DISP_INC_PC_CURR_PR;
    var povertyRate = data.POV_RATE_60;
    var unemploymentRate = data.UNEMP_RA_15_64;
    var housingPricePerSqMeter = data.HOUSING_PRICE_M2;

    if (medianIncome != undefined) {
        innerHtmlHighlights += `
                <div class="flex flex-col gap-1 p-3 rounded-md border border-gray-600">
                    <div class="flex items-start gap-3 justify-center">
                        <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white bg-gray-800"><i
                            class="fa-fw fa-regular fa-dollar-sign"></i></div>
                        <div class="font-bold text-lg">Income</div>
                    </div>                  
                    <div class="text-gray-600 items-center justify-center">
                        <span style="font-weight: bold; font-size: 1.1rem; color: rgb(31 41 55);">${(Math.round(medianIncome * 10) / 10).toLocaleString('en-US').replaceAll(',', ' ')} €</span> 
                        median disposable income.
                    </div>                  
                </div>
            `;
        
    }

    if (unemploymentRate != undefined) {
        innerHtmlHighlights += `
                <div class="flex flex-col gap-1 p-3 rounded-md border border-gray-600">
                    <div class="flex items-start gap-3 justify-center">
                        <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white bg-gray-800"><i
                            class="fa-fw fa-regular fa-suitcase"></i></div>
                        <div class="font-bold text-lg">Employment</div>
                    </div>                  
                    <div class="text-gray-600 items-center justify-center ">
                        <span style="font-weight: bold; font-size: 1.1rem; color: rgb(31 41 55);">${(Math.round(unemploymentRate * 10) / 10)} %</span> 
                        unemployment rate
                    </div>                  
                </div>
            `;
    }

    if (housingPricePerSqMeter != undefined) {
        innerHtmlHighlights += `
                <div class="flex flex-col gap-1 p-3 rounded-md border border-gray-600">
                    <div class="flex items-start gap-3 justify-center">
                        <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white bg-gray-800"><i
                            class="fa-fw fa-regular fa-house"></i></div>
                        <div class="font-bold text-lg">Housing</div>
                    </div>                  
                    <div class="text-gray-600 items-center justify-center ">
                        <span style="font-weight: bold; font-size: 1.1rem; color: rgb(31 41 55);">${(Math.round(housingPricePerSqMeter)).toLocaleString('en-US').replaceAll(',', ' ')}  €/m<sup>2</sup> </span> 
                        average transaction price.
                    </div>                  
                </div>
            `;
    }

    var downloadSpeedDeviation = data.OOKLA_FIXED_DOWNLOAD_DEV;
    if (downloadSpeedDeviation != undefined) {
        if (downloadSpeedDeviation > 0) {
            var downloadSpeedDeviationInfo = "faster fixed download speed than the national average.";
        } else {
            var downloadSpeedDeviationInfo = "slower fixed download speed than the national average.";
        }
        innerHtmlHighlights += `
                <div class="flex flex-col gap-1 p-3 rounded-md border border-gray-600">
                    <div class="flex items-start gap-3 justify-center">
                        <div class="flex h-6 w-6 items-center justify-center rounded-full text-xs text-white bg-gray-800"><i
                            class="fa-fw fa-regular fa-wifi"></i></div>
                        <div class="font-bold text-lg">Digitalisation</div>
                    </div>                  
                    <div class="text-gray-600 items-center justify-center ">
                        <span style="font-weight: bold; font-size: 1.1rem; color: rgb(31 41 55);">${Math.round(downloadSpeedDeviation * 10) / 10} % </span> 
                        ${downloadSpeedDeviationInfo}
                    </div>                  
                </div>
            `;
    }

    
    innerHtmlHighlights += `</div>`

return innerHtmlHighlights;

}

function buildSauTitle(data){
    var sauname = data.launame;

    var fuacode = data.fuacode;
    var fuaname = data.fuaname_en;
    var cityname = data.cityname_en;
    var citycode = data.citycode;
    var tl2_id = data.tl2_id;
    var tl2_name_en = data.tl2_name_en;
    var tl3_id = data.tl3_id;
    var tl3_name_en = data.tl3_name_en;

    if (sauname == undefined) {
        var sauInfo = ''
    } else {
        var sauInfo = `${sauname}`
    };

    var innerHtmlTl = "";

    if (tl2_name_en != undefined) {
        innerHtmlTl += `<div class="flex items-start gap-1" style="padding-left: 1em">
                        <div class="flex h-9 w-9 items-center justify-center rounded text-xs text-white text-sm font-bold bg-gray-800"> TL2 </div>
                    <div class="flex h-9 items-center justify-center font-bold" style="padding-left: 0.2em; padding-right: 1em">${tl2_name_en}</div>
                </div>`
    };

    if (tl3_name_en != undefined) {
        innerHtmlTl += `<div class="flex items-start gap-1" style="padding-left: 1em">
                    <div class="flex h-9 w-9 items-center justify-center rounded text-xs text-white text-sm font-bold bg-gray-800"> TL3 </div>
                    <div class="flex h-9 items-center justify-center font-bold" style="padding-left: 0.2em; padding-right: 1em">${tl3_name_en}</div>
                </div>`
    };

    if (fuaname != undefined) {
        innerHtmlTl += `<div class="flex items-start gap-1" style="padding-left: 1em">
                        <div class="flex h-9 w-9 items-center justify-center rounded text-xs text-white text-sm font-bold bg-gray-800"> FUA </div>
                    <div class="flex h-9 items-center justify-center font-bold" style="padding-left: 0.2em; padding-right: 1em">${fuaname}</div>
                </div>`
    };

    if (cityname != undefined) {
        innerHtmlTl += `<div class="flex items-start gap-1" style="padding-left: 1em">
                        <div class="flex h-9 w-9 items-center justify-center rounded text-xs text-white text-sm font-bold bg-gray-800"> City </div>
                    <div class="flex h-9 items-center justify-center font-bold" style="padding-left: 0.2em; padding-right: 1em">${cityname}</div>
                </div>
                    `
    };

    sauHtmlContent = `<div class="flex flex-col gap-2">
                        <div class="text-2xl font-extrabold sm:text-3xl">${sauInfo}</div>
                        <div class="flex flex-col items-start gap-1" style="padding-left: 0.2em">
                            ${innerHtmlTl}
                        </div>
                        
                    </div>` 
return sauHtmlContent;

}

function buildBaseMap() {
    var map = L.map('map', {
        center: [48.8566, 2.3522],
        minZoom: 3,
        maxZoom: 12,
        zoomControl: false,
        zoom: 7,        
    });

    var mapBaseLayer = L.esri.Vector.vectorBasemapLayer("8d891c38ed57477aa1db1693c144bab4", {
        apikey: "AAPK6733906110644097bc8da019ac9689e2vgrUl21eT8xUm1vNGb7Ovg7qfyhqoi0Ka0yYuNo7J1ER0XeYWtyHpyy7tr5nNtXk", 
    });
    mapBaseLayer.addTo(map);

    var mapBaseLabelsLayer = L.esri.Vector.vectorBasemapLayer("arcgis/light-gray/labels", {
    apikey: "AAPK6733906110644097bc8da019ac9689e2vgrUl21eT8xUm1vNGb7Ovg7qfyhqoi0Ka0yYuNo7J1ER0XeYWtyHpyy7tr5nNtXk", 
    zindex: 10,
    });
    mapBaseLabelsLayer.addTo(map);

    var mapBaseTL1PlainUrl = `${tilesUrl}/tl1_plain_tiles/{z}/{x}/{y}.pbf`;
    var mapBaseTL1PlainStyling = {
            "tl1_plain_boundaries": function (properties, zoom) {
                return {
                    fill: false, // No fill
                    weight: 1,
                    color: "#626262", // Black color
                    opacity: 1.0,
                };
            }
    };
    var mapBaseTL1PlainTileOptions = {
        rendererFactory: L.canvas.tile,
        interactive: false,
        maxNativeZoom: 12,
        minZoom: 0,
        vectorTileLayerStyles: mapBaseTL1PlainStyling,
        attribution: "Source of administrative boundaries: National Statistical Offices and FAO Global Administrative Unit Layers (GAUL). This map is for illustrative purposes and is without prejudice to the status of or sovereignty over any territory covered by this map."
    };
    try {
        var mapBaseTL1PlainLayer = new L.VectorGrid.Protobuf(mapBaseTL1PlainUrl, mapBaseTL1PlainTileOptions);
        mapBaseTL1PlainLayer.setZIndex(12).addTo(map);
    } catch (error) {
        // Handle the error here (or ignore it)
        console.error("Error loading PBF file:", error);
    }

    var mapBaseTL1DottedUrl = `${tilesUrl}/tl1_dotted_tiles/{z}/{x}/{y}.pbf`;
    var mapBaseTL1DottedStyling = {
            "tl1_dotted_boundaries": function (properties, zoom) {
                return {
                    fill: false, // No fill
                    weight: 1,
                    color: "#626262", // Black color
                    opacity: 1.0,
                    dashArray: "4, 4",
                };
            }
    };
    var mapBaseTL1DottedTileOptions = {
        rendererFactory: L.canvas.tile,
        interactive: false,
        maxNativeZoom: 12,
        minZoom: 0,
        vectorTileLayerStyles: mapBaseTL1DottedStyling
    };
    try {
        var mapBaseTL1DottedLayer = new L.VectorGrid.Protobuf(mapBaseTL1DottedUrl, mapBaseTL1DottedTileOptions);
        mapBaseTL1DottedLayer.setZIndex(12).addTo(map);
    } catch (error) {
        console.error("Error loading PBF file:", error);
    }

    return map;
}