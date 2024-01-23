import { createSelector } from "@reduxjs/toolkit";

const baseState = state => state.markersReducer;

export const position = createSelector(baseState, state => state.position);
export const markers = createSelector(baseState, state => state.markers);
export const actualTag = createSelector(baseState, state => state.actualTag);