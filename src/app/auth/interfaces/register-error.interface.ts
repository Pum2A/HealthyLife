export interface RegisterError {
  message:string;
  validationErrors?: ValidationError[];
}

interface ValidationError {
  field: string;
  message: string;
}
