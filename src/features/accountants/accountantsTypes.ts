export interface IAccountantEntry {
  id?: number,
  descripcion: string,
  sistemaAuxiliarId: number,
  fechaAsiento: string,
  detalles: TAccountantDetails[]
}

export type TAccountantDetails = {
  cuentaId: number,
  tipoMovimiento: string,
  montoAsiento: number,
}