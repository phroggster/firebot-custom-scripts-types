import type { TypedEmitter } from "tiny-typed-emitter";

type BasicViewer = {
    id: string;
    username: string;
    displayName?: string;
    twitchRoles?: string[];
    profilePicUrl?: string;
};

interface ChatEvents {
    "connected": () => void;
    "connecting": () => void;
    "disconnected": () => void;
}

export type TwitchChat = TypedEmitter<ChatEvents> & {
    /** @returns `true` if the streamer's chat client is connected; otherwise, `false`. */
    get chatIsConnected(): boolean;

    /** Connects the streamer and bot to chat. */
    connect(): Promise<void>;
    /** Disconnects the streamer and bot from chat.
     * @param emitDisconnectEvent If `false`, prevents emitting a "disconnected" event. @default true
     */
    disconnect(emitDisconnectEvent?: boolean): Promise<void>;
    /** Get the list of online viewers. */
    getViewerList(): Promise<BasicViewer[]>;
    /** Polls Twitch for an online viewer list. This will be performed automatically by Firebot every few minutes and
     * does **not** need to be performed manually.
     * @see {@link TwitchChat.getViewerList}
     */
    populateChatterList(): Promise<void>;
    /** Send the message as the bot if available, otherwise as the streamer.
     * @param message The message to send.
     * @param whisperTarget If provided, the message will be whispered to this username.
     * @param accountType Which account to chat as. Default to `"bot"`, if available; otherwise, the streamer.
     * @default "bot"
     * @param replyToMessageId A message ID to reply to. @default undefined
     * @returns `null` if the message is invalid; otherwise, `undefined`.
     */
    sendChatMessage(
        message: string,
        whisperTarget?: string,
        accountType?: "bot" | "streamer",
        replyToMessageId?: string
    ): Promise<null | undefined>;
};
