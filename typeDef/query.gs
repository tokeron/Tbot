/** @typedef {Object} TelegramInlineQuery 
 * This object represents an incoming inline query. When the user sends an empty query, your bot could return some default or trending results.
 * @property {String} id Unique identifier for this query
 * @property {TelegramUser} from Sender
 * @property {String} query Text of the query (up to 256 characters)
 * @property {String} offset Offset of the results to be returned, can be controlled by the bot
 * @property {String} [chat_type] Optional. Type of the chat, from which the inline query was sent.
 *    Can be either “sender” for a private chat with the inline query sender, “private”, “group”, “supergroup”, or “channel”.
 *    The chat type should be always known for requests sent from official clients and most third-party clients, unless the request was sent from a secret chat
 * @property {TelegramLocation} [location] Optional. Sender location, only for bots that request user location
*/


/** @typedef {Object} TelegramChosenInlineResult 
 * Represents a result of an inline query that was chosen by the user and sent to their chat partner.
 * @property {String} result_id The unique identifier for the result that was chosen
 * @property {User} from The user that chose the result
 * @property {TelegramLocation} [location] Optional. Sender location, only for bots that require user location
 * @property {String} [inline_message_id] Optional. Identifier of the sent inline message.
 *    Available only if there is an inline keyboard attached to the message.
 *    Will be also received in callback queries and can be used to edit the message.
 * @property {String} query The query that was used to obtain the result.
*/


/** @typedef {Object} TelegramCallbackQuery 
 * This object represents an incoming callback query from a callback button in an inline keyboard.
 *    If the button that originated the query was attached to a message sent by the bot, the field message will be present.
 *    If the button was attached to a message sent via the bot (in inline mode), the field inline_message_id will be present.
 *    Exactly one of the fields data or game_short_name will be present.
 * @property {String} id Unique identifier for this query
 * @property {User} from Sender
 * @property {TelegramMessage} [message] Optional. Message with the callback button that originated the query.
 *    Note that message content and message date will not be available if the message is too old
 * @property {String} [inline_message_id] Optional. Identifier of the message sent via the bot in inline mode, that originated the query.
 * @property {String} chat_instance Global identifier, uniquely corresponding to the chat to which the message with the callback button was sent. Useful for high scores in games.
 * @property {String} [data] Optional. Data associated with the callback button. Be aware that a bad client can send arbitrary data in this field.
 * @property {String} [game_short_name] Optional. Short name of a Game to be returned, serves as the unique identifier for the game
*/



