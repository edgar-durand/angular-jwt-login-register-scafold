/**
 * Handle result from rejection
 *
 * @param errorException comes from response rejection header
 */
import {IResponse} from "../interfaces/IResponse";

export const handleRejectionMessage = (errorException: any): IResponse => {
  if (errorException?.message && errorException.error){
    const {
      error: { error, message },
    } = errorException;
    return {
      result: false,
      message,
      data: error,
    };
  }
  return {
    result: false,
    message: 'Service unavailable'
  };

};
