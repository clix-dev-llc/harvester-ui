import { RIO } from './types';

// Note: 'id' is always the last sort, so you don't have to specify it here.

export const STATE = {
  name:      'state',
  label:     'State',
  sort:      ['stateSort', 'nameSort'],
  value:     'stateDisplay',
  width:     75,
  default:   'unknown',
  formatter: 'BadgeState',
};

export const NAME = {
  name:      'name',
  label:     'Name',
  value:     'nameDisplay',
  sort:      ['nameSort'],
  formatter: 'LinkDetail',
};

export const NAME_UNLINKED = {
  name:      'name',
  label:     'Name',
  value:     'nameDisplay',
  sort:      ['nameSort'],
};

export const NAMESPACE_NAME_UNLINKED = {
  name:      'namespace-name',
  label:     'Name',
  value:     'namespaceNameDisplay',
  sort:      ['namespaceNameSort'],
};

export const NAMESPACE_NAME = {
  name:      'namespace-name',
  label:     'Name',
  value:     'namespaceNameDisplay',
  sort:      ['namespaceNameSort'],
  formatter: 'LinkDetail',
};

/*
export const NAMESPACE = {
  name:   'namespace',
  label:  'Namespace',
  value:  'metadata.namespace',
  sort:   ['metadata.namespace', 'nameSort'],
};
*/

export const AGE = {
  name:       'age',
  label:      'Age',
  value:      'metadata.creationTimestamp',
  sort:       ['createdTs', 'nameSort'],
  search:     false,
  formatter:  'LiveDate',
  width:      75,
  align:     'right'
};

export const RIO_IMAGE = {
  name:  'image',
  label: 'Image',
  value: 'imageDisplay',
  sort:  ['imageDisplay', 'nameSort'],
};

export const ENDPOINTS = {
  name:      'endpoint',
  label:     'Endpoint',
  value:     'status.endpoints',
  formatter: 'Endpoints',
  width:      60,
  align:     'center',
};

export const SCALE = {
  name:      'scale',
  label:     'Scale',
  value:     'scales.desired',
  sort:      ['scales.desired', 'nameSort'],
  formatter: 'Scale',
  width:     60,
  align:     'center',
};

export const WEIGHT = {
  name:      'weight',
  label:     'Weight',
  value:     'status.computedWeight',
  sort:      'status.computedWeight',
  formatter: 'Weight',
  width:     60,
  align:     'center',
};

export const SUCCESS = {
  name:  'success',
  label: 'Success',
  value: 'success',
  width: 100,
  align: 'right',
};

export const REQ_RATE = {
  name:  'req-rate',
  label: 'Req Rate',
  value: 'rps',
  width: 100,
  align: 'right',
};

export const P95 = {
  name:  'p95',
  label: '95%tile',
  value: 'p95',
  width: 100,
  align: 'right',
};

export const KEYS = {
  name:      'keys',
  label:     'Keys',
  sort:      false,
  value:     'keysDisplay',
};

export const TARGET_KIND = {
  name:  'target-kind',
  label: 'Target Type',
  value: 'kindDisplay',
  width: 100,
};

export const TARGET = {
  name:  'target',
  label: 'Target',
  value: 'targetDisplay',
};

export const MATCHES = {
  name:      'matches',
  label:     'Matches',
  value:     'spec.routes',
  formatter: 'RouterMatch'
};

export const DESTINATION = {
  name:      'destination',
  label:     'Target',
  value:     'spec.routes',
  formatter: 'RouterDestination'
};

export function headersFor(schema) {
  let out = [];
  const columns = schema.attributes.columns;

  if (schema.id === RIO.ROUTER) {
    out = [STATE, NAME, MATCHES, DESTINATION, AGE];

    return out;
  }
  for ( const col of columns ) {
    if ( col.format === 'name' && col.field === 'metadata.name' ) {
      out.push(NAMESPACE_NAME);
    } else if ( col.format === 'date' && col.field === 'metadata.creationTimestamp' ) {
      out.push(AGE);
    } else {
      out.push({
        name:  col.name.toLowerCase(),
        label: col.name,
        value: col.field.replace(/^\./, ''),
        sort:  [col.field]
      });
    }
  }

  return out;
}