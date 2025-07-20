export const ROOM_TYPES = {
    RANDOM: 'random',
    PRIVATE: 'private',
    WAITING: 'waiting',
} as const;

export const ROOM_PREFIXES = {
    RANDOM_PAIR: 'pair:',
    PRIVATE_ROOM: 'room:',
    WAITING_QUEUE: 'queue:waiting',
} as const;