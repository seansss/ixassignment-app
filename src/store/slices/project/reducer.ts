import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosResponse, IHttpCoreResponse, Project, StatusEnums } from '../../../store/common/types'
import type { RootState } from '../..'
import axios from 'axios'
import { IProjectParams, ProjectRepoState } from './types'
import { API_BASE_URL } from '../../../appSettings'

const initialState: ProjectRepoState = {getProjectStatus: StatusEnums.IDLE,} 

export const getProject = createAsyncThunk(
  'project/getProject',
  async(params: IProjectParams | undefined) => {

    const config = {
      headers: {
        // environment: `${getUserAccess()!.token}`,
      },
    }

    const requestURL = `${API_BASE_URL}/project/projects/${params?.projectId}`

    try {
      const repos: AxiosResponse<IHttpCoreResponse<Project>> = await axios.get(requestURL, config)

      if (params?.callback) {
        if (repos.data && repos.data.results) { 
            params?.callback(repos.data.results)
        } else { 
            // log warning
            params?.callback(undefined)
        }
      }

      return
    } catch (err: any) {
        console.log('log error');

        if (params?.callback) {
              params?.callback(undefined)
        }
    }
  },
)

export const projectSlice = createSlice({
  name: 'projectSlice',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Get Applications
      .addCase(getProject.pending, (state, action) => {
        state.getProjectStatus = StatusEnums.LOADING
      })
      .addCase(getProject.fulfilled, (state, action) => {
        // const { payload } = action;
        state.getProjectStatus = StatusEnums.IDLE
        // state.records = payload;
      })
      .addCase(getProject.rejected, state => {
        state.getProjectStatus = StatusEnums.FAILED
      })
  },
})

// Other code such as selectors can use the imported `RootState` type
export const selectProject = (state: RootState) => state.projectReducer

export default projectSlice.reducer
