import React, { FC } from 'react';

import { IVarBaseInputProps, VarBase } from './VarBase';

export interface IVarSliderProps extends IVarBaseInputProps<number> {
  min: number;
  max: number;
  step: number;
  integer?: boolean;
}

export const VarSlider: FC<IVarSliderProps> = ({ label }) => {
  return <VarBase label={label}></VarBase>;
};
