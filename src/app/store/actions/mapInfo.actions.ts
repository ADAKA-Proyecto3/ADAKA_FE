import { createAction, props } from "@ngrx/store";
import { MapInfo } from "src/app/models/map-info.interface";



export const loadMapInfo = createAction(
    '[MapInfo] Load MapInfo'  
);

export const loadMapInfoSuccess = createAction(
  '[MapInfo] Load MapInfo Success',
  props<{ mapInfo: MapInfo[] }>()
);

export const loadMapInfoFailure = createAction(
  '[MapInfo] Load MapInfo Failure',
  props<{ error: any }>()
);