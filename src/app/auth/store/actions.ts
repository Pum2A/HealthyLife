import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "./actionTypes";
import { RegisterError } from "../interfaces/register-error.interface";

export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<{username: string; password: string; email: string}>()

)

export const registerFailure = createAction(
  ActionTypes.REGISTER_FAILURE,
  props<{ error: RegisterError }>()
);
