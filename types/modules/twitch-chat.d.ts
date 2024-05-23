export type TwitchChat = {
    /** Whether or not the streamer is currently connected. */
    chatIsConnected(): boolean;
    /**
     * Sends the message as the bot if available, otherwise as the streamer.
     * If a whisperTarget is provided, the message will be whispered.
     * If the message is too long, it will be automatically broken into multiple fragments and sent individually.
     *
     * @param message The message to send
     * @param whisperTarget If provided, message will be whispered to the given user.
     * @param accountType Which account to chat as. Defaults to bot if available otherwise, the streamer.
     * @param replyToMessageId A message id to reply to
     */
    sendChatMessage(
        message: string,
        whisperTarget?: string,
        accountType?: "bot" | "streamer",
        replyToMessageId?: string
    ): Promise<void>;
};
