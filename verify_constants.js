const { RESOURCE_DEMAND_UNIT_SIDOWARJO } = require('./src/lib/constant/resourceDemandUnit.constant');
const { INITIAL_DATA_CONSTANT_SIDOWARJO } = require('./src/lib/constant/initialData.constant');
const { getConstants } = require('./src/lib/utils/constantsHelper');

console.log('RESOURCE_DEMAND_UNIT_SIDOWARJO:', RESOURCE_DEMAND_UNIT_SIDOWARJO ? 'Defined' : 'Undefined');
console.log('INITIAL_DATA_CONSTANT_SIDOWARJO:', INITIAL_DATA_CONSTANT_SIDOWARJO ? 'Defined' : 'Undefined');

const constants = getConstants('SIDOARJO');
console.log('getConstants("SIDOARJO").resourceDemandUnit:', constants.resourceDemandUnit ? 'Defined' : 'Undefined');
