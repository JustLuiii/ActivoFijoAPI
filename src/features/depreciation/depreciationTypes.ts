import { IAssets } from "../assets/assetsTypes";

export interface DepreciationFormData {
  idActivoFijo: number;
  vidaUtilAnios: number;
  valorResidual: number;
  fechaCorte: string;
}


export interface IDepreciacion {
  id: number;
  anioProceso: number;
  mesProceso: number;
  activoFijoId: number;
  fechaProceso: string;
  montoDepreciado: number;
  depreciacionAcumulada: number;
  cuentaCompra: string;
  cuentaDepreciacion: string;
  eliminado: boolean;

  activoFijo: IAssets
}
