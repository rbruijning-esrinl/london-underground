export default async function install(app) {
  const trains = app.layers['tfl-live-trains'];
  const stations = app.layers['tfl-underground-stations'];
  app.assert(trains, 'The live TfL train layer is not available.');
  app.assert(stations, 'The TfL Underground stations layer is not available.');
  await Promise.all([trains.load(), stations.load()]);
  const colors = { bakerloo:'#B36305',central:'#E32017',circle:'#FFD300',district:'#00782A','hammersmith-city':'#F3A9BB',jubilee:'#A0A5A9',metropolitan:'#9B0056',northern:'#000000',piccadilly:'#003688',victoria:'#0098D4','waterloo-city':'#95CDBA' };
  const trainPath = 'M-7,-9 L7,-9 L9,-5 L9,7 L6,10 L-6,10 L-9,7 L-9,-5 Z M-5,-6 L5,-6 L5,-1 L-5,-1 Z M-5,3 L-1,3 L-1,7 L-5,7 Z M1,3 L5,3 L5,7 L1,7 Z';
  const trainSymbol = (color) => ({ type: 'simple-marker', style: 'path', path: trainPath, color, size: 18, outline: { color: '#ffffff', width: 1.7 } });
  trains.renderer = {
    type: 'unique-value', field: 'line_id', defaultLabel: 'Other live train', defaultSymbol: trainSymbol('#777777'),
    uniqueValueInfos: Object.entries(colors).map(([value, color]) => ({ value, label: `${value} live train`, symbol: trainSymbol(color) }))
  };
  trains.effect = 'drop-shadow(2px, 2px, 3px)';
  stations.effect = 'drop-shadow(2px, 2px, 3px)';
  app.map.reorder(trains, app.map.layers.length - 1);
  return { liveLayer: trains.id, symbol: 'train-front', liveSymbolSize: 18, colorsRetained: Object.keys(colors).length, topLayer: app.map.layers.at(app.map.layers.length - 1)?.id };
}