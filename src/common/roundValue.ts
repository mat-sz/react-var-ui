export function roundValue(
  value: number,
  min?: number,
  max?: number,
  step?: number,
  integer?: boolean
): number {
  if (!isFinite(value)) {
    value = min ?? 0;
  }

  let decimalPlaces = 2;
  if (typeof step === 'number') {
    decimalPlaces = step.toString().split('.')[1]?.length || 0;
    value = Math.round(value / step) * step;
  }

  if (typeof min === 'number') {
    value = Math.max(min, value);
  }

  if (typeof max === 'number') {
    value = Math.min(max, value);
  }

  return integer ? Math.round(value) : parseFloat(value.toFixed(decimalPlaces));
}
