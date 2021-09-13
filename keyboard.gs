/** @typedef {Object} TelegramInlineKeyboardMarkup 
 * 
 * @property {TelegramInlineKeyboard} inline_keyboard Array of button rows, each represented by an Array of InlineKeyboardButton objects.
*/

/** @typedef {TelegramInlineKeyboardButton[][]} TelegramInlineKeyboard */

/** @typedef {Object} TelegramInlineKeyboardButton 
 * 
 * @property {String} text Label text on the button
 * @property {String} [url] Optional. HTTP or tg:// url to be opened when button is pressed
 * @property {TelegramLoginUrl} [login_url] Optional. An HTTP URL used to automatically authorize the user. Can be used as a replacement for the Telegram Login Widget.
 * @property {String} [callback_data] Optional. Data to be sent in a callback query to the bot when button is pressed, 1-64 bytes
 * @property {String} [switch_inline_query] Optional. If set, pressing the button will prompt the user to select one of their chats,
 *    open that chat and insert the bot's username and the specified inline query in the input field.
 *    Can be empty, in which case just the bot's username will be inserted.
 *    ## Note:
 *      This offers an easy way for users to start using your bot in inline mode when they are currently in a private chat with it.
 *      Especially useful when combined with switch_pm… actions – in this case the user will be automatically returned to the chat they switched from, skipping the chat selection screen.
 * @property {String} [switch_inline_query_current_chat] Optional. If set, pressing the button will insert the bot's username and the specified inline query in the current chat's input field.
 *    Can be empty, in which case only the bot's username will be inserted.
 *    #This offers a quick way for the user to open your bot in inline mode in the same chat – good for selecting something from multiple options.
 * @property {TelegramCallbackGame} [callback_game] Optional. Description of the game that will be launched when the user presses the button.
 *    ## NOTE:
 *      This type of button must always be the first button in the first row.
 * @property {Boolean} [pay] Optional. Specify True, to send a Pay button.
 *    ## NOTE: 
 *      This type of button must always be the first button in the first row.
*/

/** @typedef {Object} TelegramLoginUrl 
 * 
 * @property {String} url An HTTP URL to be opened with user authorization data added to the query string when the button is pressed.
 *    If the user refuses to provide authorization data, the original URL without information about the user will be opened.
 *    The data added is the same as described in Receiving authorization data.
 *    #NOTE: You must always check the hash of the received data to verify the authentication and the integrity of the data as described in Checking authorization.
 * @property {String} [forward_text] Optional. New text of the button in forwarded messages.
 * @property {String} [bot_username] Optional. Username of a bot, which will be used for user authorization. See Setting up a bot for more details.
 *    If not specified, the current bot's username will be assumed. The url's domain must be the same as the domain linked with the bot.
 *    See Linking your domain to the bot for more details.
 * @property {Boolean} [request_write_access] Optional. Pass True to request the permission for your bot to send messages to the user.
*/

/** @typedef {Object} TelegramKeyboardButton
 * 
 * @property {String} text Text of the button. If none of the optional fields are used, it will be sent as a message when the button is pressed.
 * @property {Boolean} [request_contact] Optional. If True, the user's phone number will be sent as a contact when the button is pressed. Available in private chats only.
 * @property {Boolean} [request_location] Optional. If True, the user's current location will be sent when the button is pressed. Available in private chats only.
 * @property {TelegramKeyboardButtonPollType} [request_poll] Optional. If specified, the user will be asked to create a poll and send it to the bot when the button is pressed.
 *    Available in private chats only.
*/ 

/** @typedef {Object} TelegramKeyboardButtonPollType
 * 
 * @property {String} type Optional. If quiz is passed, the user will be allowed to create only polls in the quiz mode.
 *    If regular is passed, only regular polls will be allowed. Otherwise, the user will be allowed to create a poll of any type.
*/

/** @typedef {Object} TelegramReplyKeyboardMarkup
 * 
 * @property {TelegramKeyboard} keyboard Array of button rows, each represented by an Array of KeyboardButton objects.
 * @property {Boolean} resize_keyboard Optional. Requests clients to resize the keyboard vertically for optimal fit
 *    (e.g., make the keyboard smaller if there are just two rows of buttons).
 *    Defaults to false, in which case the custom keyboard is always of the same height as the app's standard keyboard.
 * @property {Boolean} one_time_keyboard Optional. Requests clients to hide the keyboard as soon as it's been used.
 *    The keyboard will still be available, but clients will automatically display the usual letter-keyboard in the chat –
 *    the user can press a special button in the input field to see the custom keyboard again. Defaults to false.
 * @property {String} input_field_placeholder Optional. The placeholder to be shown in the input field when the keyboard is active; 1-64 characters.
 * @property {Boolean} selective Optional. Use this parameter if you want to show the keyboard to specific users only.
 *    ### Targets: 
 *      1. users that are `@mentioned in the text of the Message object;
 *      2. if the bot's message is a reply (has reply_to_message_id), sender of the original message.
 *    ### Example:
 *      A user requests to change the bot's language, bot replies to the request with a keyboard to select the new language. Other users in the group don't see the keyboard.
*/


/** @typedef {TelegramKeyboardButton[][]} TelegramKeyboard */


