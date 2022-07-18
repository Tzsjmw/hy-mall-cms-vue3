import { ILoginstate } from './login/types'

export interface IRootState {
  name: string
  age: number
}

export interface IRootWithModule {
  login: ILoginstate
}

export type IStoreType = IRootState & IRootWithModule
