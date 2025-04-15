export interface IAssets {
  id: number,
  descripcion: string,
  departamentoId: number,
  departamento: string,
  tipoActivoId: number,
  tipoActivo: string,
  fechaAdquisicion: string,
  valor: number,
  depreciacionAcumulada: number,
  estado: number
}

export interface IAssetsForm {
  id: number,
  descripcion: string,
  departamentoId: string,
  tipoActivoId: string,
  fechaAdquisicion: string,
  valor: number,
  depreciacionAcumulada: number,
  estado: string
}