import { StatusEnums } from '../../common/types'

export interface IParams {
  callback?: any;
  bucket?: any;
}

export interface IProjectParams extends IParams {
  projectId?: string;
}

export interface ProjectRepoState {
  getProjectStatus: StatusEnums;
}
