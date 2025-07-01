import type { FirebotViewer } from "../viewer";

/** @deprecated */
export type UserDb = {
    getTwitchUserByUsername: (
        username: string
    ) => Promise<FirebotViewer | undefined>;
    /**
     * Creates a new user in the database. Returns the created user if successful.
     *
     * @param userId User's Twitch account ID
     * @param username Twitch username
     * @param displayName Twitch display name
     * @param profilePicUrl Profile pic URL, if available
     * @param twitchRoles List of role strings, if applicable
     * @param isOnline Whether the user is currently online, defaults to false @default false
     */
    createNewUser: (
        userId: string,
        username: string,
        displayName?: string,
        profilePicUrl?: string,
        twitchRoles?: string[],
        isOnline?: boolean
    ) => Promise<FirebotViewer | undefined>;
    /**
     * Updates the given user in the database. Returns true if successful.
     * @param user that should be updated.
     */
    updateUser: (user: FirebotViewer) => Promise<boolean>;
    /**
     * Adds some metadata to a user.
     * @param username of the user that should be updated.
     * @param key the metadata value should be saved under.
     * @param value to store under the key.
     * @param propertyPath defines in dot-notation which sub-element of value should be stored.
     *                     If omitted, stores the given value as-is.
     */
    updateUserMetadata: (
        username: string,
        key: string,
        value: any,
        propertyPath?: string
    ) => Promise<void>;
    /**
     * Retrieves metadata associated with the given user.
     * @param username of the user that has the metadata.
     * @param key of the metadata to retrieve.
     * @param propertyPath defines in dot-notation which sub-element of value should be retrieved.
     *                     If omitted, retrieves the whole value stored under the given key.
     */
    getUserMetadata: (
        username: string,
        key: string,
        propertyPath?: string
    ) => Promise<any>;
    getUserById: (id: string) => Promise<FirebotViewer | undefined>;
    /**
     * Return all users with a username that contains `usernameFragment`.
     * @param usernameFragment the username should contain.
     */
    searchUsers: (
        usernameFragment: string
    ) => Promise<FirebotViewer[] | undefined>;
    /**
     * Returns the top users with the most view time.
     * @param count how many users should be returned.
     */
    getTopViewTimeUsers: (
        count: number
    ) => Promise<Array<{ username: string; minutesInChannel: number }>>;
    getUserOnlineMinutes: (username: string) => Promise<number>;
    getOnlineUsers: () => Promise<FirebotViewer[]>;
};
