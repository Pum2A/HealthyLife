import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "./actionTypes";
import { RegisterError } from "../interfaces/register-error.interface";
import { User } from "../interfaces/user.interface";

export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<{user:User}>()

)

export const registerFailure = createAction(
  ActionTypes.REGISTER_FAILURE,
  props<{ error: RegisterError }>()
);


export const setRegisterButtonDisabled = createAction(
  '[Auth] Set Register Button Disabled',
  props<{ disabled: boolean }>()
);
export const registerSuccess = createAction(
  ActionTypes.REGISTER_SUCCESS,
  props<{ message: string }>()


);

export const passwordTooShort = createAction(
  '[Auth] Password Too Short'

  );

export const passwordMissingSpecialChar = createAction(
  '[Auth] Password Missing Special Character'

  );

export const emailInvalid = createAction(
  '[Auth] Wrong email structure'

  );



