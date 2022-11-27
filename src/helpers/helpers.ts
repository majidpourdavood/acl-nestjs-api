
export class Helpers  {
    static  sendJson(status, errors, message, action, data) {
        let response = {
            "statusCode": status,
            "errors": errors,
            "message": message,
            "action": action,
            "data": data
        };
        return response;
    }

}