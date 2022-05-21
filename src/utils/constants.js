export const HttpStatusCode = {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    INTERNAL_SERVER: 500,
};

export const caculatorId = (id) => {
    if (id) {
        if (id > 9999) {
            return id;
        }
        if (id < 10) {
            return "000" + id;
        } else if (id < 100) {
            return "00" + id;
        } else if (id < 1000) {
            return "0" + id;
        } else if (id < 10000) {
            return id;
        } else {
            return id;
        }
    } else {
        return 0;
    }
};
