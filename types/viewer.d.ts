export interface BasicViewer {
    /** The user's globally-unique identifier. */
    id: string;
    /** The viewer's unique username. */
    username: string;
    /** The formatted display name of the viewer. */
    displayName?: string;
    /** A `string` URL pointing to the user's profile picture.  */
    profilePicUrl?: string;
    /** The Twitch roles that the user is a member of. */
    twitchRoles?: string[];
}

export type FirebotViewer = {
    readonly _id: string;
    username: string;
    displayName?: string;
    profilePicUrl?: string;
    twitch: boolean;
    twitchRoles: string[];
    online: boolean;
    /** Timestamp value */
    onlineAt: number;
    /** Timestamp value */
    lastSeen: number;
    /** Timestamp value */
    joinDate: number;
    minutesInChannel: number;
    chatMessages: number;
    disableAutoStatAccrual: boolean;
    disableActiveUserList: boolean;
    /** Allows storing arbitrary objects as additional data in key-value pairs into the user object in the database. */
    metadata: Record<string, any>;
    /** Maps currency-id to the amount the user has. */
    currency: Record<string, number>;
    ranks?: Record<string, string>;
};
