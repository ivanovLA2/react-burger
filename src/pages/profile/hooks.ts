import {TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook} from 'react-redux';
import {RootState} from '../..';
import {AppDispatch} from "../../services/types";


export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;