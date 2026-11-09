export default async function install(app) {
  const stations = app.layers['tfl-underground-stations'];
  app.assert(stations, 'The TfL Underground stations layer is not available.');
  await stations.load();
  const colors = {
    'Bakerloo':'#B36305', 'Central':'#E32017', 'Circle':'#FFD300', 'District':'#00782A',
    'Hammersmith & City':'#F3A9BB', 'Jubilee':'#A0A5A9', 'Metropolitan':'#9B0056',
    'Northern':'#000000', 'Piccadilly':'#003688', 'Victoria':'#0098D4', 'Waterloo & City':'#95CDBA'
  };
  const stationSymbol = color => ({ type:'simple-marker', style:'circle', color, size:8, outline:{color:'#ffffff',width:1.5} });
  stations.renderer = {
    type:'unique-value',
    valueExpression:"IIf(IsEmpty($feature.lines), 'Other', Split($feature.lines, ', ')[0])",
    valueExpressionTitle:'Primary Underground line',
    defaultLabel:'Other Underground station',
    defaultSymbol:stationSymbol('#8A8A8A'),
    uniqueValueInfos:Object.entries(colors).map(([value,color]) => ({ value, label:`${value} line station`, symbol:stationSymbol(color) }))
  };
  stations.effect='drop-shadow(2px, 2px, 3px)';
  return { layerId:stations.id, styling:'primary served line color', lineClasses:Object.keys(colors).length, popupPreserved:Boolean(stations.popupTemplate) };
}