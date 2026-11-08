export const machineKinds = [
  { value: 'grafa', label: 'Grafa' },
  { value: 'hjolaskofla', label: 'Hjólaskófla' },
  { value: 'jardyta', label: 'Jarðýta' },
  { value: 'veghefill', label: 'Veghefill' },
  { value: 'valtari', label: 'Valtari' },
  { value: 'drattarbill', label: 'Dráttarbíll' },
  { value: 'vorubill', label: 'Vörubíll' },
  { value: 'kranabill', label: 'Kranabíll' },
  { value: 'tankbill', label: 'Tankbíll' },
  { value: 'bukolla', label: 'Búkolla' },
  { value: 'vagn', label: 'Vagn' },
  { value: 'sendibill', label: 'Sendibíll / rúta' },
  { value: 'pallbill', label: 'Pallbíll' },
  { value: 'fjorhjol', label: 'Fjórhjól / sexhjól' },
  { value: 'snjosledi', label: 'Snjósleði' },
  { value: 'drattarvel', label: 'Dráttarvél' },
  { value: 'lyftari', label: 'Lyftari' },
  { value: 'almennt', label: 'Annað' },
] as const;

export type MachineKind = (typeof machineKinds)[number]['value'];
