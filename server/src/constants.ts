export const ROOMS = {
    GLOBAL: 'chat:global',
};

export const EVENTS = {
    GLOBAL: {
        JOIN: `${ROOMS.GLOBAL}:join`,
        LEAVE: `${ROOMS.GLOBAL}:leave`,
        MESSAGE: `${ROOMS.GLOBAL}:message`,
        COUNT: `${ROOMS.GLOBAL}:count`,
        COUNT_GET: `${ROOMS.GLOBAL}:count:get`,
    },
    USERS: {
        COUNT: 'users:count',
        COUNT_GET: 'users:count:get',
    },
};
