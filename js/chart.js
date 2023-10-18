function createRadarChart(radarElem) {
    var ctx = document.getElementById("radar-chart").getContext("2d");

    var radarDataSets = [{
        label: radarElem.sauname,
        data: radarElem.radarSauDataNorm,
        backgroundColor: "rgba(75, 192, 192, 0.4)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
    }];
    // if (fuaname != undefined) {
                //     radarDataSets.push({
                //             label: `FUA of ${fuaname}`,
                //             data: radarFuaData,
                //             backgroundColor: "rgba(255, 99, 132, 0.4)",
                //             borderColor: "rgba(255, 99, 132, 1)",
                //             borderWidth: 1,
            // });

    var data = {
        labels: radarElem.radarLabels,
        datasets: radarDataSets,
    };

    var options = {
        scale: {
            ticks: {
                callback: function() {return ""},
                backdropColor: "rgba(0, 0, 0, 0)"
            },
            
        },
        plugins: {
            tooltip: {
                enabled: true,
                // mode: 'index',
                // intersect: false,
                callbacks: {
                    label: function (tooltipItem) {
                        var datasetLabel = radarElem.radarLabels[tooltipItem.dataIndex];
                        var sauname = radarElem.sauname;
                        var datasetValue = radarElem.radarSauData[tooltipItem.dataIndex];
                        var datasetUnit = radarElem.radarUnits[tooltipItem.dataIndex];
                        return `${sauname}: ${Math.round(datasetValue * 10) / 10} ${datasetUnit}`;
                    },
                },
            },
        },
    };


    // Create the radar chart
    var radarChart = new Chart(ctx, {
        type: "radar",
        data: data,
        options: options,
    });

    return radarChart
}

function normalizeData(val, valMin, valMax) {
    var valNorm = (Math.min(val, valMax) - valMin) / (valMax - valMin);
    return valNorm;
    }

function buildRadarChartData(data) {
    var radarLabels = [];
    var radarUnits = [];
    var radarSauData = [];
    var radarSauDataNorm = [];
    var radarFuaData = [];
    var radarFUADataNorm = [];
    var radarCityData = [];
    var radarCityDataNorm = [];
    var radarTL1Data = [];
    var radarTL1DataNorm = [];
    var radarTL2Data = [];
    var radarTL2DataNorm = [];
    var radarTL3Data = [];
    var radarTL3DataNorm = [];
    var radarOECDData = [];
    var radarOECDDataNorm = [];

    var sauname = data.launame;
    var fuacode = data.fuacode;
    var citycode = data.citycode;
    var tl2_id = data.tl2_id;
    var tl3_id = data.tl3_id;

    // if (data.POP_T != undefined) {
    //     radarLabels.push('Total population');
    //     radarUnits.push('persons');
    //     radarSauData.push(data.POP_T);
    //     radarSauDataNorm.push(normalizeData(data.POP_T, 0, 25000));
    // }
    if (data.POP_CH != undefined) {
        radarLabels.push('Population change');
        radarUnits.push('%');
        radarSauData.push(data.POP_CH);
        radarSauDataNorm.push(normalizeData(data.POP_CH, -30, 30));
    }
    // if (data.NETNAT_RATE != undefined) {
    //     radarLabels.push('Natural change');
    //     radarUnits.push('%');
    //     radarSauData.push(data.NETNAT_RATE);
    //     radarSauDataNorm.push(normalizeData(data.NETNAT_RATE, -30, 30));
    // }
    // if (data.NETMOBMIG_RATE != undefined) {
    //     radarLabels.push('Net migration rate');
    //     radarUnits.push('%');
    //     radarSauData.push(data.NETMOBMIG_RATE);
    //     radarSauDataNorm.push(normalizeData(data.NETMOBMIG_RATE, -30, 30));
    // }
    
    // if (data.NETMOB_RATE != undefined) {
    //     radarLabels.push('Net internal migration rate');
    //     radarSauDataNorm.push(normalizeData(data.NETMOB_RATE, -30, 30));
    // }
    
    // if (data.NETMIG_RATE != undefined) {
    //     radarLabels.push('Net international migration rate');
    //     radarSauDataNorm.push(normalizeData(data.NETMIG_RATE, -30, 30));
    // }
    
    // if (data.OLD_SH != undefined) {
    //     radarLabels.push('Elderly population');
    //     radarUnits.push('%');
    //     radarSauData.push(data.OLD_SH);
    //     radarSauDataNorm.push(normalizeData(data.OLD_SH, 0, 40));
    // }
    
    // if (data.WORKAGE_SH != undefined) {
    //     radarLabels.push('Working age population');
    //     radarUnits.push('%');
    //     radarSauData.push(data.WORKAGE_SH);
    //     radarSauDataNorm.push(normalizeData(data.WORKAGE_SH, 30, 80));
    // }
    
    // if (data.YOUTH_SH != undefined) {
    //     radarLabels.push('Young population');
    //     radarUnits.push('%');
    //     radarSauData.push(data.YOUTH_SH);
    //     radarSauDataNorm.push(normalizeData(data.YOUTH_SH, 0, 30));
    // }
    
    // if (data.MIGRANT_SH != undefined) {
    //     radarLabels.push('Foreign-born population');
    //     radarUnits.push('%');
    //     radarSauData.push(data.MIGRANT_SH);
    //     radarSauDataNorm.push(normalizeData(data.MIGRANT_SH, 0, 40));
    // }
    
    // if (data.SEX_RATIO_TOT != undefined) {
    //     radarLabels.push('Sex ratio');
    //     radarSauData.push(data.SEX_RATIO_TOT);
    //     radarUnits.push('');
    //     radarSauDataNorm.push(normalizeData(data.SEX_RATIO_TOT, 85, 115));
    // }
    
    // if (data.BIRTHS_RATE != undefined) {
    //     radarLabels.push('Birth rate');
    //     radarUnits.push('%');
    //     radarSauData.push(data.BIRTH_RATE);
    //     radarSauDataNorm.push(normalizeData(data.BIRTH_RATE, 0, 25));
    // }
    
    // if (data.DEATHS_RATE != undefined) {
    //     radarLabels.push('Death rate');
    //     radarUnits.push('%');
    //     radarSauData.push(data.DEATH_RATE);
    //     radarSauDataNorm.push(normalizeData(data.DEATH_RATE, 0, 25));
    // }

    // if (data.AIR_TEMP2M != undefined) {
    //     radarLabels.push('Average air temperature');
    //     radarSauDataNorm.push(normalizeData(data.AIR_TEMP2M, 5, 25));
    // }
    
    if (data.AIR_TEMP2M_DIFF_1981_2010 != undefined) {
        radarLabels.push('Air temperature change');
        radarUnits.push('°C');
        radarSauData.push(data.AIR_TEMP2M_DIFF_1981_2010);
        radarSauDataNorm.push(normalizeData(data.AIR_TEMP2M_DIFF_1981_2010, -3, 3));
    }
    
    // if (data.LST_DAY_SUMMER != undefined) {
    //     radarLabels.push('Summer daytime surface temperature');
    //     radarSauDataNorm.push(normalizeData(data.LST_DAY_SUMMER, 20, 40));
    // }
    
    if (data.LST_NIGHT_SUMMER != undefined) {
        radarLabels.push('Summer nighttime surface temperature');
        radarUnits.push('°C');
        radarSauData.push(data.LST_NIGHT_SUMMER);
        radarSauDataNorm.push(normalizeData(data.LST_NIGHT_SUMMER, 10, 30));
    }
    
    // if (data.CDD_T_22C != undefined) {
    //     radarLabels.push('Cooling Degree Days');
    //     radarUnits.push('degree days');
    //     radarSauData.push(data.CDD_T_22C);
    //     radarSauDataNorm.push(normalizeData(data.CDD_T_22C, 0, 3000));
    // }
    
    // if (data.CDD_T_22C_CH != undefined) {
    //     radarLabels.push('Change in Cooling Degree Days');
    //     radarSauDataNorm.push(normalizeData(data.CDD_T_22C_CH, -100, 100));
    // }
    
    // if (data.HDD_T_15C != undefined) {
    //     radarLabels.push('Heating Degree Days');
    //     radarUnits.push('degree days');
    //     radarSauData.push(data.HDD_T_15C);
    //     radarSauDataNorm.push(normalizeData(data.HDD_T_15C, 0, 3000));
    // }
    
    // if (data.HDD_T_15C_CH != undefined) {
    //     radarLabels.push('Change in Heating Degree Days');
    //     radarSauDataNorm.push(normalizeData(data.HDD_T_15C_CH, -500, 500));
    // }
    
    // if (data.HOT_DAYS != undefined) {
    //     radarLabels.push('Hot days');
    //     radarUnits.push('days');
    //     radarSauData.push(data.HOT_DAYS);
    //     radarSauDataNorm.push(normalizeData(data.HOT_DAYS, 0, 30));
    // }
    
    // if (data.HOT_DAYS_DIFF_1981_2010 != undefined) {
    //     radarLabels.push('Change in number of hot days');
    //     radarSauDataNorm.push(normalizeData(data.HOT_DAYS_DIFF_1981_2010, -14, 14));
    // }
    
    // if (data.TROPICAL_NIGHTS != undefined) {
    //     radarLabels.push('Tropical nights');
    //     radarUnits.push('nights');
    //     radarSauData.push(data.TROPICAL_NIGHTS);
    //     radarSauDataNorm.push(normalizeData(data.TROPICAL_NIGHTS, 0, 50));
    // }
    
    // if (data.TROPICAL_NIGHTS_DIFF_1981_2010 != undefined) {
    //     radarLabels.push('Change in number of tropical nights');
    //     radarSauDataNorm.push(normalizeData(data.TROPICAL_NIGHTS_DIFF_1981_2010, -14, 14));
    // }
    
    // if (data.PRECIP_SUM != undefined) {
    //     radarLabels.push('Total precipitation');
    //     radarUnits.push('mm');
    //     radarSauData.push(data.PRECIP_SUM);
    //     radarSauDataNorm.push(normalizeData(data.PRECIP_SUM, 0, 1500));
    // }
    
    // if (data.PRECIP_SUM_DIFF_1981_2010 != undefined) {
    //     radarLabels.push('Change in annual precipitation');
    //     radarSauDataNorm.push(normalizeData(data.PRECIP_SUM_DIFF_1981_2010, -100, 100));
    // }
    
    // if (data.EXT_PRECIP_DAYS != undefined) {
    //     radarLabels.push('Extreme precipitation');
    //     radarUnits.push('days');
    //     radarSauData.push(data.EXT_PRECIP_DAYS);
    //     radarSauDataNorm.push(normalizeData(data.EXT_PRECIP_DAYS, 0, 50));
    // }
    
    // if (data.EXT_PRECIP_DAYS_1981_2010 != undefined) {
    //     radarLabels.push('Change in extreme precipitation days');
    //     radarSauDataNorm.push(normalizeData(data.EXT_PRECIP_DAYS_1981_2010, -10, 10));
    // }
    
    // if (data.SOIL_MOIST_L1_CH_1981_2018 != undefined) {
    //     radarLabels.push('Soil moisture change');
    //     radarUnits.push('%');
    //     radarSauData.push(data.SOIL_MOIST_L1_CH_1981_2018);
    //     radarSauDataNorm.push(normalizeData(data.SOIL_MOIST_L1_CH_1981_2018, -10, 10));
    // }
    
    // if (data.FIRE_TOTAL_AREA_SH != undefined) {
    //     radarLabels.push('Area burned');
    //     radarUnits.push('%');
    //     radarSauData.push(data.FIRE_TOTAL_AREA_SH);
    //     radarSauDataNorm.push(normalizeData(data.FIRE_TOTAL_AREA_SH, 0, 50));
    // }
    
    // if (data.RIVER_FLOOD_RP100_POP_SH != undefined) {
    //     radarLabels.push('River flooding');
    //     radarUnits.push('%');
    //     radarSauData.push(data.RIVER_FLOOD_RP100_POP_SH);
    //     radarSauDataNorm.push(normalizeData(data.RIVER_FLOOD_RP100_POP_SH, 0, 60));
    // }
    
    // if (data.COASTAL_FLOOD_RP100_POP_SH != undefined) {
    //     radarLabels.push('Coastal flooding');
    //     radarUnits.push('%');
    //     radarSauData.push(data.COASTAL_FLOOD_RP100_POP_SH);
    //     radarSauDataNorm.push(normalizeData(data.COASTAL_FLOOD_RP100_POP_SH, 0, 60));
    // }
    
    // if (data.GREEN_AREA_SHARE != undefined) {
    //     radarLabels.push('Green area share');
    //     radarUnits.push('%');
    //     radarSauData.push(data.GREEN_AREA_SHARE);
    //     radarSauDataNorm.push(normalizeData(data.GREEN_AREA_SHARE, 0, 100));
    // }
    
    if (data.GREEN_AREA_CAPITA != undefined) {
        radarLabels.push('Green area per capita');
        radarUnits.push('m²/cap.');
        radarSauData.push(data.GREEN_AREA_CAPITA);
        radarSauDataNorm.push(normalizeData(data.GREEN_AREA_CAPITA, 0, 1400));
    }
    
    if (data.FOREST_CH != undefined) {
        radarLabels.push('Tree cover change');
        radarUnits.push('%');
        radarSauData.push(data.FOREST_CH);
        radarSauDataNorm.push(normalizeData(data.FOREST_CH, -30, 30));
    }
    
    // if (data.SOLAR_POWER_POT != undefined) {
    //     radarLabels.push('Solar Power Potential');
    //     radarUnits.push('kWh/kWp');
    //     radarSauData.push(data.SOLAR_POWER_POT);
    //     radarSauDataNorm.push(normalizeData(data.SOLAR_POWER_POT, 2, 6));
    // }
    
    // if (data.WIND_POWER_POT != undefined) {
    //     radarLabels.push('Wind Power Potential');
    //     radarUnits.push('W/m²');
    //     radarSauData.push(data.WIND_POWER_POT);
    //     radarSauDataNorm.push(normalizeData(data.WIND_POWER_POT, 0, 1250));
    // }

    // if (data.NO2_POP_W_MEAN != undefined) {
    //     radarLabels.push('NO2');
    //     radarUnits.push('μg/m³');
    //     radarSauData.push(data.NO2_POP_W_MEAN);
    //     radarSauDataNorm.push(normalizeData(data.NO2_POP_W_MEAN, 0, 30));
    // }

    // if (data.PM2_5_POP_W_MEAN != undefined) {
    //     radarLabels.push('PM2.5');
    //     radarUnits.push('μg/m³');
    //     radarSauData.push(data.PM2_5_POP_W_MEAN);
    //     radarSauDataNorm.push(normalizeData(data.PM2_5_POP_W_MEAN, 5, 15));
    // }

    // if (data.PM10_POP_W_MEAN != undefined) {
    //     radarLabels.push('PM10');
    //     radarUnits.push('μg/m³');
    //     radarSauData.push(data.PM10_POP_W_MEAN);
    //     radarSauDataNorm.push(normalizeData(data.PM10_POP_W_MEAN, 5, 25));
    // }

    // if (data.O3_POP_W_MEAN != undefined) {
    //     radarLabels.push('O3');
    //     radarUnits.push('μg/m³');
    //     radarSauData.push(data.O3_POP_W_MEAN);
    //     radarSauDataNorm.push(normalizeData(data.O3_POP_W_MEAN, 40, 80));
    // }
    
    if (data.OOKLA_FIXED_DOWNLOAD_DEV != undefined) {
        radarLabels.push('Internet download speed');
        radarUnits.push('%');
        radarSauData.push(data.OOKLA_FIXED_DOWNLOAD_DEV);
        radarSauDataNorm.push(normalizeData(data.OOKLA_FIXED_DOWNLOAD_DEV, -100, 100));
    }
    
    // if (data.OOKLA_FIXED_UPLOAD_DEV != undefined) {
    //     radarLabels.push('Internet upload speed');
    //     radarUnits.push('%');
    //     radarSauData.push(data.OOKLA_FIXED_UPLOAD_DEV);
    //     radarSauDataNorm.push(normalizeData(data.OOKLA_FIXED_UPLOAD_DEV, -100, 100));
    // }

    if (data.MEDIAN_DISP_INC_PC_CURR_PR != undefined) {
        radarLabels.push('Median disposable income');
        radarUnits.push('€');
        radarSauData.push(data.MEDIAN_DISP_INC_PC_CURR_PR);
        radarSauDataNorm.push(normalizeData(data.MEDIAN_DISP_INC_PC_CURR_PR, 10000, 50000));
    }
    
    if (data.GINI != undefined) {
        radarLabels.push('Gini index');
        radarUnits.push('');
        radarSauData.push(data.GINI);
        radarSauDataNorm.push(normalizeData(data.GINI, 0.2, 0.5)); 
    }
    
    if (data.POV_RATE_60 != undefined) {
        radarLabels.push('Poverty rate');
        radarUnits.push('%');
        radarSauData.push(data.POV_RATE_60);
        radarSauDataNorm.push(normalizeData(data.POV_RATE_60, 5, 40)); 
    }
    
    if (data.UNEMP_RA_15_64 != undefined) {
        radarLabels.push('Unemployment rate');
        radarUnits.push('%');
        radarSauData.push(data.UNEMP_RA_15_64);
        radarSauDataNorm.push(normalizeData(data.UNEMP_RA_15_64, 0, 30));
    }
    
    // if (data.RENT_M2 != undefined) {
    //     radarLabels.push('Rent');
    //     radarUnits.push('€/m²');
    //     radarSauData.push(data.RENT_M2);
    //     radarSauDataNorm.push(normalizeData(data.RENT_M2, 5, 25)); 
    // }
    
    // if (data.HOUSING_PRICE_M2 != undefined) {
    //     radarLabels.push('Housing price');
    //     radarUnits.push('€/m²');
    //     radarSauData.push(data.HOUSING_PRICE_M2);
    //     radarSauDataNorm.push(normalizeData(data.HOUSING_PRICE_M2, 0, 10000));
    // }
    
    // if (data.pop_density_km2 != undefined) {
    //     radarLabels.push('Population density');
    //     radarUnits.push('people/km²');
    //     radarSauData.push(data.pop_density_km2);
    //     radarSauDataNorm.push(normalizeData(data.pop_density_km2, 0, 10000));
    // }
    
    // if (data.BUILT_S__T != undefined) {
    //     radarLabels.push('Built-up surface per capita');
    //     radarUnits.push('m²/capita');
    //     radarSauData.push(data.BUILT_S__T);
    //     radarSauDataNorm.push(normalizeData(data.BUILT_S__T, 0, 600));
    // }
    
    // if (data.BUILT_S_RES != undefined) {
    //     radarLabels.push('Residential built-up surface per capita');
    //     radarUnits.push('m²/capita');
    //     radarSauData.push(data.BUILT_S_RES);
    //     radarSauDataNorm.push(normalizeData(data.BUILT_S_RES, 0, 600));
    // }
    
    // if (data.BUILT_S_NRES != undefined) {
    //     radarLabels.push('Non-residential built-up surface per capita');
    //     radarUnits.push('m²/capita');
    //     radarSauData.push(data.BUILT_S_NRES);
    //     radarSauDataNorm.push(normalizeData(data.BUILT_S_NRES, 0, 400));
    // }
    
    // if (data.BUILT_S_CH__T != undefined) {
    //     radarLabels.push('Built-up surface growth 2000-2020');
    //     radarUnits.push('%');
    //     radarSauData.push(data.BUILT_S_CH__T);
    //     radarSauDataNorm.push(normalizeData(data.BUILT_S_CH__T, -80, 80));
    // }
    
    // if (data.BUILT_V__T != undefined) {
    //     radarLabels.push('Built-up volume per capita');
    //     radarUnits.push('m³/capita');
    //     radarSauData.push(data.BUILT_V__T);
    //     radarSauDataNorm.push(normalizeData(data.BUILT_V__T, 0, 1500));
    // }
    
    // if (data.BUILT_V_RES != undefined) {
    //     radarLabels.push('Residential built-up volume per capita');
    //     radarUnits.push('m³/capita');
    //     radarSauData.push(data.BUILT_V_RES);
    //     radarSauDataNorm.push(normalizeData(data.BUILT_V_RES, 0, 1500));
    // }
    
    // if (data.BUILT_V_NRES != undefined) {
    //     radarLabels.push('Non-residential built-up volume per capita');
    //     radarUnits.push('m³/capita');
    //     radarSauData.push(data.BUILT_V_NRES);
    //     radarSauDataNorm.push(normalizeData(data.BUILT_V_NRES, 0, 1000));
    // }
    
    // if (data.BUILT_H != undefined) {
    //     radarLabels.push('Building height');
    //     radarUnits.push('m');
    //     radarSauData.push(data.BUILT_H);
    //     radarSauDataNorm.push(normalizeData(data.BUILT_H, 0, 8));
    // }
        
    

    return {sauname: sauname,
            radarLabels: radarLabels, 
            radarUnits: radarUnits, 
            radarSauDataNorm: radarSauDataNorm,
            radarSauData: radarSauData}
}