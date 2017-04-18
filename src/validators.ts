export type IValidator<T> = (value: T) => string | null;

export function createValidator<T>(defaultErrorMessage: string, isValid: (value: T) => boolean): (message?: string) => IValidator<T> {
  return (errorMessage?: string) => {
    const message = errorMessage || defaultErrorMessage;
    return (value: T) => {
      return isValid(value) ? null : message;
    };
  };
}

export const notEmpty = createValidator("This fields is required", (value: string) => !!value.trim().length);
export const isEmail = createValidator("It is not a valid email", (value: string) => {
  const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(value);
});
