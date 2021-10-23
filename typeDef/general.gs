/** @typedef {Object} TelegramUpdate 
 * 
 * @property {Number} update_id The update's unique identifier. Update identifiers start from a certain positive number and increase sequentially.
 *    This ID becomes especially handy if you're using [Webhooks](https://core.telegram.org/bots/api#setwebhook),
 *    since it allows you to ignore repeated updates or to restore the correct update sequence, should they get out of order.
 *    If there are no new updates for at least a week, then identifier of the next update will be chosen randomly instead of sequentially.
 * @property {TelegramMessage} [message] Optional. New incoming message of any kind — text, photo, sticker, etc..
 * @property {TelegramMessage} [edited_message] Optional. New version of a message that is known to the bot and was edited.
 * @property {TelegramMessage} [channel_post] Optional. New incoming channel post of any kind — text, photo, sticker, etc..
 * @property {TelegramMessage} [edited_channel_post] Optional. New version of a channel post that is known to the bot and was edited.
 * @property {TelegramInlineQuery} [inline_query] Optional. New incoming [inline](https://core.telegram.org/bots/api#inline-mode) query.
 * @property {TelegramChosenInlineResult} [chosen_inline_result] Optional. The result of an [inline](https://core.telegram.org/bots/api#inline-mode) query that was chosen by a user
 *    and sent to their chat partner.
 *    ### Please see our documentation on the [feedback collecting](https://core.telegram.org/bots/inline#collecting-feedback) for details on how to enable these updates for your bot.
 * @property {TelegramCallbackQuery} [callback_query] Optional. New incoming callback query.
 * @property {TelegramShippingQuery} [shipping_query] Optional. New incoming shipping query. Only for invoices with flexible price.
 * @property {TelegramPreCheckoutQuery} [pre_checkout_query] Optional. New incoming pre-checkout query. Contains full information about checkout.
 * @property {TelegramPoll} [poll] Optional. New poll state. Bots receive only updates about stopped polls and polls, which are sent by the bot.
 * @property {TelegramPollAnswer} [poll_answer] Optional. A user changed their answer in a non-anonymous poll. Bots receive new votes only in polls that were sent by the bot itself.
 * @property {TelegramChatMemberUpdated} [my_chat_member] Optional. The bot's chat member status was updated in a chat.
 *    or private chats, this update is received only when the bot is blocked or unblocked by the user.
 * @property {TelegramChatMemberUpdated} [chat_member] Optional. A chat member's status was updated in a chat.
 *    The bot must be an administrator in the chat and must explicitly specify “chat_member” in the list of allowed_updates to receive these updates.
*/


/** @typedef {Object} TelegramUser
 * 
 * @property {Number} id Unique identifier for this user or bot.
 * @property {Boolean} is_bot True, if this user is a bot.
 * @property {String} first_name User's or bot's first name.
 * @property {String} [last_name] Optional. User's or bot's last name.
 * @property {String} [username] Optional. User's or bot's username.
 * @property {String} [language_code] Optional. IETF language tag of the user's language.
 * @property {Boolean} [can_join_groups] Optional. True, if the bot can be invited to groups. Returned only in getMe.
 * @property {Boolean} [can_read_all_group_messages] Optional. True, if privacy mode is disabled for the bot. Returned only in getMe.
 * @property {Boolean} [supports_inline_queries] Optional. True, if the bot supports inline queries. Returned only in getMe.
*/

/** @typedef {Object} TelegramChat
 * 
 * @property {Number} id Unique identifier for this chat.
 * @property {String} type Type of chat, can be either “private”, “group”, “supergroup” or “channel”.
 * @property {String} [title] Optional. Title, for supergroups, channels and group chats.
 * @property {String} [first_name] Optional. First name of the other party in a private chat.
 * @property {String} [last_name] Optional. Last name of the other party in a private chat
 * @property {String} [username] Optional. Username, for private chats, supergroups and channels if available.
 * @property {TelegramChatPhoto} [photo] Optional. Chat photo. Returned only in getChat.
 * @property {String} [bio] Optional. Bio of the other party in a private chat. Returned only in getChat.
 * @property {String} [description] Optional. Description, for groups, supergroups and channel chats. Returned only in getChat.
 * @property {String} [invite_link] Optional. Primary invite link, for groups, supergroups and channel chats. Returned only in getChat.
 * @property {TelegramMessage} [pinned_message] Optional. The most recent pinned message (by sending date). Returned only in getChat.
 * @property {TelegramChatPermissions} [permissions] Optional. Default chat member permissions, for groups and supergroups. Returned only in getChat.
 * @property {Number} [slow_mode_delay] Optional. For supergroups, the minimum allowed delay between consecutive messages sent by each unpriviledged user. Returned only in getChat.
 * @property {Number} [message_auto_delete_time] Optional. The time after which all messages sent to the chat will be automatically deleted; in seconds. Returned only in getChat.
 * @property {String} [sticker_set_name] Optional. For supergroups, name of group sticker set. Returned only in getChat.
 * @property {Boolean} [can_set_sticker_set] Optional. True, if the bot can change the group sticker set. Returned only in getChat.
 * @property {Number} [linked_chat_id] Optional. Unique identifier for the linked chat, i.e. the discussion group identifier for a channel and vice versa; for supergroups and channel chats. This identifier may be greater than 32 bits and some programming languages may have difficulty/silent defects in interpreting it. But it is smaller than 52 bits, so a signed 64 bit integer or double-precision float type are safe for storing this identifier. Returned only in getChat.
 * @property {TelegramChatLocation} [location] Optional. For supergroups, the location to which the supergroup is connected. Returned only in getChat.
*/

