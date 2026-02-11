import { RESOURCE_DEMAND_UNIT_SIDOWARJO } from './src/lib/constant/resourceDemandUnit.constant';
import { INITIAL_DATA_CONSTANT_SIDOWARJO } from './src/lib/constant/initialData.constant';
import { getConstants } from './src/lib/utils/constantsHelper';

console.log('RESOURCE_DEMAND_UNIT_SIDOWARJO:', RESOURCE_DEMAND_UNIT_SIDOWARJO ? 'Defined' : 'Undefined');
console.log('INITIAL_DATA_CONSTANT_SIDOWARJO:', INITIAL_DATA_CONSTANT_SIDOWARJO ? 'Defined' : 'Undefined');

const constants = getConstants('SIDOARJO');
console.log('getConstants("SIDOARJO").resourceDemandUnit:', constants.resourceDemandUnit ? 'Defined' : 'Undefined');
