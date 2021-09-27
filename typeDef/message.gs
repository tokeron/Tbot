/** @typedef {Object} TelegramMessage
 * 
 * @property {Number} message_id Unique message identifier inside this chat.
 * @property {TelegramUser} [from] Optional. Sender, empty for messages sent to channels.
 * @property {TelegramChat} [sender_chat] Optional. Sender of the message, sent on behalf of a chat. The channel itself for channel messages. The supergroup itself for messages from anonymous group administrators. The linked channel for messages automatically forwarded to the discussion group.
 * @property {Number} date Date the message was sent in Unix time.
 * @property {TelegramChat} chat Conversation the message belongs to.
 * @property {String} [text] Optional. For text messages, the actual UTF-8 text of the message, 0-4096 characters.
 * @property {TelegramMessageEntity[]} [entities] Optional. For text messages, special entities like usernames, URLs, bot commands, etc. that appear in the text.
 * @property {TelegramDocument} [document] Optional. Message is a general file, information about the file.
 * @property {TelegramPhotoSize[]} [photo] Optional. Message is a photo, available sizes of the photo.
 * 
 * 
 * @typedef {Object} TelegramMessageExtendedTemp
 * 
 * @property {TelegramUser} [forward_from] Optional. For forwarded messages, sender of the original message.
 * @property {TelegramChat} [forward_from_chat] Optional. For messages forwarded from channels or from anonymous administrators, information about the original sender chat.
 * @property {Number} [forward_from_message_id] Optional. For messages forwarded from channels, identifier of the original message in the channel.
 * @property {String} [forward_signature] Optional. For messages forwarded from channels, signature of the post author if present.
 * @property {String} [forward_sender_name] Optional. Sender's name for messages forwarded from users who disallow adding a link to their account in forwarded messages.
 * @property {Number} [forward_date] Optional. For forwarded messages, date the original message was sent in Unix time.
 * @property {TelegramMessage} [reply_to_message] Optional. For replies, the original message. Note that the Message object in this field will not contain further reply_to_message fields even if it itself is a reply.
 * @property {TelegramUser} [via_bot] Optional. Bot through which the message was sent.
 * @property {Number} [edit_date] Optional. Date the message was last edited in Unix time.
 * @property {String} [media_group_id] Optional. The unique identifier of a media message group this message belongs to.
 * @property {String} [author_signature] Optional. Signature of the post author for messages in channels, or the custom title of an anonymous group administrator.
 * @property {TelegramAnimation} [animation] Optional. Message is an animation, information about the animation. For backward compatibility, when this field is set, the document field will also be set.
 * @property {TelegramAudio} [audio] Optional. Message is an audio file, information about the file.
 * @property {TelegramSticker} [sticker] Optional. Message is a sticker, information about the sticker.
 * @property {TelegramVideo} [video] Optional. Message is a video, information about the video.
 * @property {TelegramVideoNote} [video_note] Optional. Message is a video note, information about the video message.
 * @property {TelegramVoice} [voice] Optional. Message is a voice message, information about the file.
 * @property {String} [caption] Optional. Caption for the animation, audio, document, photo, video or voice, 0-1024 characters.
 * @property {TelegramMessageEntity[]} [caption_entities] Optional. For messages with a caption, special entities like usernames, URLs, bot commands, etc. that appear in the caption.
 * @property {TelegramContact} [contact] Optional. Message is a shared contact, information about the contact.
 * @property {TelegramDice} [dice] Optional. Message is a dice with random value.
 * @property {TelegramGame} [game] Optional. Message is a game, information about the game.
 * @property {TelegramPoll} [poll] Optional. Message is a native poll, information about the poll.
 * @property {TelegramVenue} [venue] Optional. Message is a venue, information about the venue. For backward compatibility, when this field is set, the location field will also be set.
 * @property {TelegramLocation} [location] Optional. Message is a shared location, information about the location.
 * @property {TelegramUser[]} [new_chat_members] Optional. New members that were added to the group or supergroup and information about them (the bot itself may be one of these members).
 * @property {TelegramUser} [left_chat_member] Optional. A member was removed from the group, information about them (this member may be the bot itself).
 * @property {String} [new_chat_title] Optional. A chat title was changed to this value.
 * @property {TelegramPhotoSize[]} [new_chat_photo] Optional. A chat photo was change to this value.
 * @property {Boolean} [delete_chat_photo] Optional. Service message: the chat photo was deleted.
 * @property {Boolean} [group_chat_created] Optional. Service message: the group has been created.
 * @property {Boolean} [supergroup_chat_created] Optional. Service message: the supergroup has been created. This field can't be received in a message coming through updates, because bot can't be a member of a supergroup when it is created. It can only be found in reply_to_message if someone replies to a very first message in a directly created supergroup.
 * @property {Boolean} [channel_chat_created] Optional. Service message: the channel has been created. This field can't be received in a message coming through updates, because bot can't be a member of a channel when it is created. It can only be found in reply_to_message if someone replies to a very first message in a channel.
 * @property {MessageAutoDeleteTimerChanged} [message_auto_delete_timer_changed] Optional. Service message: auto-delete timer settings changed in the chat.
 * @property {Number} [migrate_to_chat_id] Optional. The group has been migrated to a supergroup with the specified identifier. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier.
 * @property {Number} [migrate_from_chat_id] Optional. The supergroup has been migrated from a group with the specified identifier. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier.
 * @property {TelegramMessage} [pinned_message] Optional. Specified message was pinned. Note that the Message object in this field will not contain further reply_to_message fields even if it is itself a reply.
 * @property {TelegramInvoice} [invoice] Optional. Message is an invoice for a payment, information about the invoice.
 * @property {TelegramSuccessfulPayment} [successful_payment] Optional. Message is a service message about a successful payment, information about the payment.
 * @property {String} [connected_website] Optional. The domain name of the website on which the user has logged in.
 * @property {TelegramPassportData} [passport_data] Optional. Telegram Passport data.
 * @property {TelegramProximityAlertTriggered} [proximity_alert_triggered] Optional. Service message. A user in the chat triggered another user's proximity alert while sharing Live Location.
 * @property {TelegramVoiceChatScheduled} [voice_chat_scheduled] Optional. Service message: voice chat scheduled.
 * @property {TelegramVoiceChatStarted} [voice_chat_started] Optional. Service message: voice chat started.
 * @property {TelegramVoiceChatEnded} [voice_chat_ended] Optional. Service message: voice chat ended.
 * @property {TelegramVoiceChatParticipantsInvited} [voice_chat_participants_invited] Optional. Service message: new participants invited to a voice chat
 * @property {TelegramInlineKeyboardMarkup} [reply_markup] Optional. Inline keyboard attached to the message. login_url buttons are represented as ordinary url buttons.
 * 
 * 
 *  @typedef {TelegramMessage & TelegramMessageExtendedTemp} TelegramMessageExtended
 * 
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

/** @typedef {Object} TelegramChatPhoto
 * 
 * @property {String} small_file_id 	File identifier of small (160x160) chat photo. This file_id can be used only for photo download and only for as long as the photo is not changed.
 * @property {String} small_file_unique_id Unique file identifier of small (160x160) chat photo, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file.
 * @property {String} big_file_id File identifier of big (640x640) chat photo. This file_id can be used only for photo download and only for as long as the photo is not changed.
 * @property {String} big_file_unique_id Unique file identifier of big (640x640) chat photo, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file.
*/

/** @typedef {Object} TelegramChatPermissions
 * 
 * @property {Boolean} [can_send_messages] Optional. True, if the user is allowed to send text messages, contacts, locations and venues.
 * @property {Boolean} [can_send_media_messages] Optional. True, if the user is allowed to send audios, documents, photos, videos, video notes and voice notes, implies can_send_messages.
 * @property {Boolean} [can_send_polls] Optional. True, if the user is allowed to send polls, implies can_send_messages.
 * @property {Boolean} [can_send_other_messages] Optional. True, if the user is allowed to send animations, games, stickers and use inline bots, implies can_send_media_messages.
 * @property {Boolean} [can_add_web_page_previews] Optional. True, if the user is allowed to add web page previews to their messages, implies can_send_media_messages.
 * @property {Boolean} [can_change_info] Optional. True, if the user is allowed to change the chat title, photo and other settings. Ignored in public supergroups
 * @property {Boolean} [can_invite_users] Optional. True, if the user is allowed to invite new users to the chat.
 * @property {Boolean} [can_pin_messages] Optional. True, if the user is allowed to pin messages. Ignored in public supergroups.
*/

/** @typedef {Object} TelegramChatLocation
 * 
 * @property {TelegramLocation} location The location to which the supergroup is connected. Can't be a live location.
 * @property {String} address Location address; 1-64 characters, as defined by the chat owner.
*/

/** @typedef {Object} TelegramLocation
 * 
 * @property {Number} longitude Longitude as defined by sender.
 * @property {Number} latitude Latitude as defined by sender.
 * @property {Number} [horizontal_accuracy] Optional. The radius of uncertainty for the location, measured in meters; 0-1500
 * @property {Number} [live_period] Optional. Time relative to the message sending date, during which the location can be updated, in seconds. For active live locations only.
 * @property {Number} [heading] Optional. The direction in which user is moving, in degrees; 1-360. For active live locations only.
 * @property {Number} [proximity_alert_radius] Optional. Maximum distance for proximity alerts about approaching another chat member, in meters. For sent live locations only.
*/

/** @typedef {Object} TelegramMessageEntity
 * 
 * @property {String} type Type of the entity. Can be “mention” (`@username), “hashtag” (#hashtag), “cashtag” ($USD), “bot_command” (/start@jobs_bot), “url” (https://telegram.org), “email” (do-not-reply@telegram.org), “phone_number” (+1-212-555-0123), “bold” (bold text), “italic” (italic text), “underline” (underlined text), “strikethrough” (strikethrough text), “code” (monowidth string), “pre” (monowidth block), “text_link” (for clickable text URLs), “text_mention” (for users without usernames).
 * @property {Number} offset Offset in UTF-16 code units to the start of the entity.
 * @property {Number} length Length of the entity in UTF-16 code units.
 * @property {String} [url] Optional. For “text_link” only, url that will be opened after user taps on the text.
 * @property {TelegramUser} [user] Optional. For “text_mention” only, the mentioned user.
 * @property {String} [language] Optional. For “pre” only, the programming language of the entity text.
*/

/** @typedef {TelegramVideo} TelegramAnimation This object represents an animation file (GIF or H.264/MPEG-4 AVC video without sound). */

/** @typedef {Object} TelegramAudio
 * 
 * @property {String} file_id Identifier for this file, which can be used to download or reuse the file.
 * @property {String} file_unique_id Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file.
 * @property {Number} Duration of the audio in seconds as defined by sender.
 * @property {TelegramPhotoSize} [thumb] Optional. Thumbnail of the album cover to which the music file belongs.
 * @property {String} [file_name] Optional. Original animation filename as defined by sender.
 * @property {String} [mime_type] Optional. MIME type of the file as defined by sender.
 * @property {Number} [file_size] Optional. File size.
 * @property {String} [title] Optional. Title of the audio as defined by sender or by audio tags.
 * @property {String} [file_name] Optional. Original filename as defined by sender.
*/

/** @typedef {Object} TelegramDocument
 * 
 * @property {String} file_id Identifier for this file, which can be used to download or reuse the file.
 * @property {String} file_unique_id Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file.
 * @property {TelegramPhotoSize} [thumb] Optional. Document thumbnail as defined by sender.
 * @property {String} [file_name] Optional. Original animation filename as defined by sender.
 * @property {String} [mime_type] Optional. MIME type of the file as defined by sender.
 * @property {Number} [file_size] Optional. File size.
*/

/** @typedef {Object} TelegramVideo
 * 
 * @property {String} file_id Identifier for this file, which can be used to download or reuse the file.
 * @property {String} file_unique_id Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file.
 * @property {Number} width Video width as defined by sender.
 * @property {Number} height Video height as defined by sender.
 * @property {Number} duration Duration of the video in seconds as defined by sender.
 * @property {TelegramPhotoSize} [thumb] Optional. Video thumbnail.
 * @property {String} [file_name] Optional. Original animation filename as defined by sender.
 * @property {String} [mime_type] Optional. MIME type of the file as defined by sender.
 * @property {Number} [file_size] Optional. File size.
*/

/** @typedef {Object} TelegramVideoNote
 * 
 * @property {String} file_id Identifier for this file, which can be used to download or reuse the file.
 * @property {String} file_unique_id Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file.
 * @property {Number} length Video width and height (diameter of the video message) as defined by sender.
 * @property {Number} duration Duration of the video in seconds as defined by sender.
 * @property {TelegramPhotoSize} [thumb] Optional. Video thumbnail.
 * @property {Number} [file_size] Optional. File size.
*/

/** @typedef {Object} TelegramVoice
 * 
 * @property {String} file_id Identifier for this file, which can be used to download or reuse the file.
 * @property {String} file_unique_id Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file.
 * @property {Number} duration Duration of the video in seconds as defined by sender.
 * @property {String} [mime_type] Optional. MIME type of the file as defined by sender.
 * @property {Number} [file_size] Optional. File size.
*/

/** @typedef {Object} TelegramContact
 * 
 * @property {String} phone_number Contact's phone number.
 * @property {String} first_name Contact's first name.
 * @property {String} [last_name] Optional. Contact's last name.
 * @property {Number} [user_id] Optional. Contact's user identifier in Telegram. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier.
 * @property {String} [vcard] Optional. Additional data about the contact in the form of a vCard.
*/

/** @typedef {Object} TelegramDice
 * 
 * @property {String} emoji Emoji on which the dice throw animation is based.
 * @property {Number} value Value of the dice, 1-6 for “🎲”, “🎯” and “🎳” base emoji, 1-5 for “🏀” and “⚽” base emoji, 1-64 for “🎰” base emoji.
*/

/** @typedef {Object} TelegramPollOption
 * 
 * @property {String} text Option text, 1-100 characters.
 * @property {Number} voter_count Number of users that voted for this option.
*/

/** @typedef {Object} TelegramPollAnswer
 * 
 * @property {String} poll_id Unique poll identifier
 * @property {TelegramUser} user The user, who changed the answer to the poll.
 * @property {Number[]} option_ids 0-based identifiers of answer options, chosen by the user. May be empty if the user retracted their vote.
*/

/** @typedef {Object} TelegramPoll
 * 
 * @property {String} id Unique poll identifier.
 * @property {String} question Poll question, 1-300 characters.
 * @property {TelegramPollOption[]} options List of poll options.
 * @property {Number} total_voter_count Total number of users that voted in the poll.
 * @property {Boolean} is_closed True, if the poll is closed.
 * @property {Boolean} is_anonymous True, if the poll is anonymous.
 * @property {String} type Poll type, currently can be “regular” or “quiz”.
 * @property {Boolean} allows_multiple_answers True, if the poll allows multiple answers.
 * @property {Number} [correct_option_id] Optional. 0-based identifier of the correct answer option. Available only for polls in the quiz mode, which are closed, or was sent (not forwarded) by the bot or to the private chat with the bot.
 * @property {String} [explanation] Optional. Text that is shown when a user chooses an incorrect answer or taps on the lamp icon in a quiz-style poll, 0-200 characters.
 * @property {TelegramMessageEntity[]} [explanation_entities] Optional. Special entities like usernames, URLs, bot commands, etc. that appear in the explanation.
 * @property {Number} [open_period] Optional. Amount of time in seconds the poll will be active after creation.
 * @property {Number} [close_date] Optional. Point in time (Unix timestamp) when the poll will be automatically closed.
*/

/** @typedef {Object} TelegramPhotoSize
 * 
 * @property {String} file_id Identifier for this file, which can be used to download or reuse the file.
 * @property {String} file_unique_id Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file.
 * @property {Number} width Photo width.
 * @property {Number} height Photo height.
 * @property {Number} [file_size] Optional. File size.
*/

/** @typedef {Object} TelegramSticker
 * 
 * @property {String} file_id Identifier for this file, which can be used to download or reuse the file.
 * @property {String} file_unique_id Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file.
 * @property {Number} width Sticker width.
 * @property {Number} height Sticker height.
 * @property {Boolean} is_animated True, if the sticker is animated.
 * @property {TelegramPhotoSize} [thumb] Optional. Optional. Sticker thumbnail in the .WEBP or .JPG format.
 * @property {String} [emoji] Optional. Emoji associated with the sticker.
 * @property {String} [set_name] Optional. Name of the sticker set to which the sticker belongs.
 * @property {TelegramMaskPosition} [mask_position] Optional. For mask stickers, the position where the mask should be placed.
 * @property {Number} [file_size] Optional. File size.
*/

/** @typedef {Object} TelegramMaskPosition
 * 
 * @property {String} point The part of the face relative to which the mask should be placed. One of “forehead”, “eyes”, “mouth”, or “chin”.
 * @property {Number} x_shift Shift by X-axis measured in widths of the mask scaled to the face size, from left to right. For example, choosing -1.0 will place mask just to the left of the default mask position.
 * @property {Number} y_shift Shift by Y-axis measured in heights of the mask scaled to the face size, from top to bottom. For example, 1.0 will place the mask just below the default mask position.
 * @property {Number} scale Mask scaling coefficient. For example, 2.0 means double size.
*/

/** @typedef {Object} TelegramVenue
 * 
 * @property {TelegramLocation} location Venue location. Can't be a live location.
 * @property {String} title Name of the venue.
 * @property {String} address Address of the venue.
 * @property {String} [foursquare_id] Optional. Foursquare identifier of the venue.
 * @property {String} [foursquare_type] Optional. Foursquare type of the venue. (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.)
 * @property {String} [google_place_id] Optional. Google Places identifier of the venue.
 * @property {String} [google_place_type] Optional. Google Places type of the venue. 
*/

/** @typedef {Object} TelegramMessageAutoDeleteTimerChanged
 * 
 * @property {Number} message_auto_delete_time New auto-delete time for messages in the chat.
*/

/** @typedef {Object} TelegramInvoice
 * 
 * @property {String} title Product name.
 * @property {String} description Product description.
 * @property {String} start_parameter Unique bot deep-linking parameter that can be used to generate this invoice.
 * @property {String} currency Three-letter ISO 4217 currency code.
 * @property {Number} total_amount Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies).
*/

/** @typedef {Object} TelegramSuccessfulPayment
 * 
 * @property {String} currency Three-letter ISO 4217 currency code.
 * @property {Number} total_amount Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies).
 * @property {String} invoice_payload Bot specified invoice payload.
 * @property {String} [shipping_option_id] Optional. Identifier of the shipping option chosen by the user.
 * @property {TelegramOrderInfo} [order_info] Optional. Order info provided by the user.
 * @property {String} telegram_payment_charge_id Telegram payment identifier.
 * @property {String} provider_payment_charge_id Provider payment identifier.
*/

/** @typedef {Object} TelegramOrderInfo
 * 
 * @property {String} [name] Optional. User name.
 * @property {String} [phone_number] Optional. User's phone number.
 * @property {String} [email] Optional. User email.
 * @property {TelegramShippingAddress} [shipping_address] Optional. User shipping address.
*/

/** @typedef {Object} TelegramShippingAddress
 * 
 * @property {String} country_code ISO 3166-1 alpha-2 country code.
 * @property {String} state State, if applicable.
 * @property {String} city City.
 * @property {String} street_line1 First line for the address.
 * @property {String} street_line2 Second line for the address.
 * @property {String} post_code Address post code.
*/

/** @typedef {Object} TelegramProximityAlertTriggered 
 * 
 * @property {TelegramUser} traveler User that triggered the alert.
 * @property {TelegramUser} watcher User that set the alert.
 * @property {Number} distance The distance between the users.
*/

/** @typedef {Object} TelegramVoiceChatScheduled 
 * 
 * @property {Number} start_date Point in time (Unix timestamp) when the voice chat is supposed to be started by a chat administrator.
*/

/** @typedef {Object} TelegramVoiceChatEnded 
 * 
 * @property {Number} duration Voice chat duration; in seconds.
*/

/** @typedef {Object} TelegramVoiceChatParticipantsInvited
 * 
 * @property {TelegramUser[]} [users] Optional. New members that were invited to the voice chat.
*/

