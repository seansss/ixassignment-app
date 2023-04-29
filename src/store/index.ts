import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import projectSliceReducer from './slices/project/reducer'

export const storeAppRTK = configureStore({
  reducer: {
    projectReducer: projectSliceReducer,
  },
})

export type RootState = ReturnType<typeof storeAppRTK.getState>;
export type AppDispatch = typeof storeAppRTK.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
