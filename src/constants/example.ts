// TODO: remove this file
import type { Reducer, ReducerState, ReducerAction, Dispatch } from 'react';

export type ExampleState = { example: boolean };
export type ExampleReducer = Reducer<ExampleState, { type: 'YES' | 'NO' }>;
export type ExampleReducerState = ReducerState<ExampleReducer>;
export type ExampleReducerAction = ReducerAction<ExampleReducer>;
export type ExampleReducerDispatch = Dispatch<ExampleReducerAction>;
export type ExampleContextType = [ExampleReducerState, ExampleReducerDispatch]
