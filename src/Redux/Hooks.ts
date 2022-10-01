import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { ReduxState, AppDispatch } from './Store'

// https://redux-toolkit.js.org/tutorials/typescript
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<ReduxState> = useSelector;