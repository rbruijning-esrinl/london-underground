export default async function install(app) {
  const layer = app.layers['tfl-underground-stations'];
  app.assert(layer, 'The TfL Underground stations layer is not available.');
  await layer.load();
  const zones = [
    ['1', '#E32017'], ['1+2', '#E32017'],
    ['2', '#F7941D'], ['2+3', '#F7941D'],
    ['3', '#FFD300'], ['3+4', '#FFD300'],
    ['4', '#00782A'], ['4+5', '#00782A'],
    ['5', '#00A3A6'], ['5+6', '#00A3A6'],
    ['6', '#003688'], ['6+7', '#003688'],
    ['7', '#7B2E83'], ['7+8', '#7B2E83'],
    ['8', '#D64B9A'], ['8+9', '#D64B9A'], ['9', '#9B5A2E']
  ];
  layer.renderer = {
    type: 'unique-value', field: 'zone', defaultLabel: 'Zone not reported',
    defaultSymbol: { type: 'simple-marker', style: 'circle', color: '#8A8A8A', size: 8, outline: { color: '#ffffff', width: 1.5 } },
    uniqueValueInfos: zones.map(([value, color]) => ({
      value, label: `Fare zone ${value}`,
      symbol: { type: 'simple-marker', style: 'circle', color, size: 8, outline: { color: '#ffffff', width: 1.5 } }
    }))
  };
  layer.effect = 'drop-shadow(2px, 2px, 3px)';
  return { layerId: layer.id, field: 'zone', zoneClasses: zones.length, popupPreserved: Boolean(layer.popupTemplate) };
}