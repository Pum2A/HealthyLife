export interface LoginError {
  message:string;
  validationErrors?: ValidationError[];
}

interface ValidationError {
  field: string;
  message: string;
}
