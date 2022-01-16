import { getIn } from "formik";

/* 
	Must be used in all input components where back end validation is necessary,
	this utility will control showing backend error messages 
*/
export const getError = (name, { touched, errors, status }) => {
  const fieldTouched = getIn(touched, name);
  const backendError = getIn(status, ["apiErrors", name]);
  const clientError = getIn(errors, name);
  if (clientError && fieldTouched)
  {
    return clientError;
  }
  if (backendError && !fieldTouched)
  {
    return backendError;
  }
  return undefined;
};
