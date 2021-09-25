import message from "common/globals/message";

export function success(data?: any, text?: string) {
  return {
    message: text || message.success,
    data,
  };
}

export function fail(data?: any, text?: string) {
  return {
    message: message.fail,
    description: text || data.message,
    data,
  };
}

export function notFound(text?: string) {
  return fail(text || "The requested data cannot be found.");
}
