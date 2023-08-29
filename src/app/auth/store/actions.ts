import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "./actionTypes";
import { RegisterError } from "../interfaces/register-error.interface";
import { User } from "../interfaces/user.interface";
import { LoginError } from "../interfaces/login-error.interface";

export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<{user:User}>()

)
export const loginAction = createAction(
  ActionTypes.LOGIN,
  props<{user:User}>()

)

export const loginFailureAction = createAction(
  ActionTypes.LOGIN_FAILURE,
  props<{ error: LoginError }>()
);
export const registerFailure = createAction(
  ActionTypes.REGISTER_FAILURE,
  props<{ message: string }>()
);


export const setRegisterButtonDisabled = createAction(
  '[Auth] Set Register Button Disabled',
  props<{ disabled: boolean }>()
);
export const registerSuccess = createAction(
  ActionTypes.REGISTER_SUCCESS,
  props<{ message: string }>()


);
export const loginSuccess = createAction(
  ActionTypes.LOGIN_SUCCESS,
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



