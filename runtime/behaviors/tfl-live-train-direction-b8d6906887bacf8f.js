export default async function install(app) {
  const trains = app.layers['tfl-live-trains'];
  app.assert(trains, 'The live TfL train layer is not available.');
  await trains.load();
  const colors = { bakerloo:'#B36305',central:'#E32017',circle:'#FFD300',district:'#00782A','hammersmith-city':'#F3A9BB',jubilee:'#A0A5A9',metropolitan:'#9B0056',northern:'#000000',piccadilly:'#003688',victoria:'#0098D4','waterloo-city':'#95CDBA' };
  const path = 'M-7,-9 L7,-9 L9,-5 L9,7 L6,10 L-6,10 L-9,7 L-9,-5 Z M-5,-6 L5,-6 L5,-1 L-5,-1 Z M-5,3 L-1,3 L-1,7 L-5,7 Z M1,3 L5,3 L5,7 L1,7 Z';
  const symbol = color => ({ type:'simple-marker', style:'path', path, color, size:18, outline:{color:'#ffffff',width:1.7} });
  trains.renderer = {
    type:'unique-value', field:'line_id', defaultSymbol:symbol('#777777'), defaultLabel:'Other live train',
    uniqueValueInfos:Object.entries(colors).map(([value,color])=>({value,label:`${value} live train`,symbol:symbol(color)})),
    visualVariables:[{type:'rotation',valueExpression:"IIf($feature.direction == 'outbound', 180, 0)",valueExpressionTitle:'TfL service direction',rotationType:'arithmetic',legendOptions:{showLegend:false}}]
  };
  trains.effect='drop-shadow(2px, 2px, 3px)';
  app.map.reorder(trains, app.map.layers.length - 1);
  return { layerId:trains.id, direction:'TfL inbound/outbound direction', symbol:'rotated train-front', topLayer:app.map.layers.at(app.map.layers.length - 1)?.id };
}