const fs = require('fs');
const fsp = fs.promises;

module.exports = [
  {
    command: ['addbadword'],
    operate: async ({ Cypher, m, isCreator, mess, prefix, args, q, bad, reply }) => {
      if (!isCreator) return reply(mess.owner);
      if (args.length < 1) return reply(`Use ${prefix}addbadword [harsh word].`);

      if (bad.includes(q)) {
        return reply('This word is already in the list!');
      }
      
      bad.push(q);

      try {
        await fsp.writeFile('./src/Database/badwords.json', JSON.stringify(bad, null, 2));
        reply('Successfully added bad word!');
      } catch (error) {
        console.error('Error writing to badwords.json:', error);
        reply('An error occurred while adding the bad word.');
      }
    },
    react: "🛑" // Stop sign for adding bad words
  },
  {
    command: ['addignorelist', 'ban', 'banchat'],
    operate: async ({ m, args, isCreator, loadBlacklist, mess, reply, saveDatabase }) => {
      if (!isCreator) return reply(mess.owner);

      let mentionedUser = m.mentionedJid && m.mentionedJid[0];
      let quotedUser = m.quoted && m.quoted.sender;
      let userToAdd = mentionedUser || quotedUser || m.chat;

      if (!userToAdd) return reply('Mention a user, reply to their message, or provide a phone number to ignore.');

      let blacklist = loadBlacklist();
      if (!blacklist.blacklisted_numbers.includes(userToAdd)) {
        blacklist.blacklisted_numbers.push(userToAdd);
        await saveDatabase();
        await reply(`+${userToAdd.split('@')[0]} added to the ignore list.`);
      } else {
        await reply(`+${userToAdd.split('@')[0]} is already ignored.`);
      }
    },
    react: "🚫" // No entry sign for banning or ignoring users
  },
  {
    command: ['addsudo', 'addowner'],
    operate: async ({ m, args, isCreator, reply, saveDatabase }) => {
      if (!isCreator) return reply(mess.owner);

      if (m.chat.endsWith('@g.us') && !(m.mentionedJid && m.mentionedJid[0]) && !(m.quoted && m.quoted.sender)) {
        return reply('Reply to or tag a person!');
      }

      const userToAdd = m.mentionedJid && m.mentionedJid[0] || m.quoted && m.quoted.sender || m.chat;

      if (!userToAdd) return reply('Mention a user or reply to their message to add them to the sudo list.');

      const sudoList = global.db.sudo;

      if (!sudoList.includes(userToAdd)) {
        sudoList.push(userToAdd);
        await saveDatabase();
        await reply(`+${userToAdd.split('@')[0]} added to the sudo list and are be able to use any function of the bot even in private mode.`);
      } else {
        await reply(`+${userToAdd.split('@')[0]} is already a sudo user.`);
      }
    },
    react: "👑" // Crown for adding sudo users
  },
  {
    command: ['alwaysonline'],
    operate: async ({ Cypher, m, reply, args, prefix, command, isCreator, mess, db, botNumber, saveDatabase }) => {
      if (!isCreator) return reply(mess.owner);
      if (args.length < 1) return reply(`Example: ${prefix + command} on/off`);

      const validOptions = ["on", "off"];
      const option = args[0].toLowerCase();

      if (!validOptions.includes(option)) return reply("Invalid option");

      db.settings.alwaysonline = option === "on";

      await saveDatabase();

      reply(`Always-online ${option === "on" ? "enabled" : "disabled"} successfully`);
    },
    react: "🌐" // Globe for always online status
  },
  {
    command: ['antibug'],
    operate: async ({ Cypher, m, reply, args, prefix, command, isCreator, mess, db, botNumber, saveDatabase }) => {
      if (!isCreator) return reply(mess.owner);
      if (args.length < 1) return reply(`Example: ${prefix + command} on/off`);

      const validOptions = ["on", "off"];
      const option = args[0].toLowerCase();

      if (!validOptions.includes(option)) return reply("Invalid option");

      db.settings.antibug = option === "on";

      await saveDatabase();

      reply(`Anti-bug (Experimental) ${option === "on" ? "enabled" : "disabled"} successfully`);
    },
    react: "🐛" // Bug for anti-bug feature
  },
  {
    command: ['anticall'],
    operate: async ({ reply, args, prefix, command, isCreator, mess, db, saveDatabase }) => {
      if (!isCreator) return reply(mess.owner);
      if (args.length < 1) return reply(`Example: ${prefix + command} block/decline/off\n\nblock - Declines and blocks callers\ndecline - Declines incoming calls\noff - disables anticall`);

      const validOptions = ["block", "decline", "off"];
      const option = args[0].toLowerCase();

      if (!validOptions.includes(option)) return reply(`Invalid option; type *${prefix}anticall* to see available options!`);

      db.settings.anticall = option === "off" ? false : option;

      await saveDatabase();

      reply(`Anti-call set to *${option}* successfully.`);
    },
    react: "📵" // No mobile phones for anti-call
  },
  {
    command: ['antidelete'],
    operate: async ({ Cypher, m, reply, args, prefix, command, isCreator, mess, db, botNumber, saveDatabase }) => {
      if (!isCreator) return reply(mess.owner);
      if (args.length < 1) return reply(`Example: ${prefix + command} private/chat/off\n\nprivate - sends deleted messages to message yourself\nchat - sends to current chat\noff - disables antidelete`);

      const validOptions = ["private", "chat", "off"];
      const option = args[0].toLowerCase();

      if (!validOptions.includes(option)) return reply("Invalid option. Use: private, chat, or off");

      db.settings.antidelete = option;

      await saveDatabase();

      reply(`Anti-delete mode set to: *${option}*`);
    },
    react: "🗑️" // Trash can for anti-delete
  },
  {
    command: ['antiedit'],
    operate: async ({ Cypher, m, reply, args, prefix, command, isCreator, mess, db, botNumber, saveDatabase }) => {
      if (!isCreator) return reply(mess.owner);
      if (args.length < 1) return reply(`Example: ${prefix + command} private/chat/off\n\n private - sends edited messages to message yourself\nchat - sends to current chat\noff - disables antiedit`);

      const validOptions = ["private", "chat", "off"];
      const option = args[0].toLowerCase();

      if (!validOptions.includes(option)) return reply("Invalid option. Use: private, chat, or off");

      db.settings.antiedit = option;

      await saveDatabase();

      reply(`Anti-edit mode set to: *${option}*`);
    },
    react: "✏️" // Pencil for anti-edit
  },
  {
    command: ['autobio'],
    operate: async ({ Cypher, m, reply, args, prefix, command, isCreator, mess, db, botNumber, saveDatabase }) => {
      if (!isCreator) return reply(mess.owner);
      if (args.length < 1) return reply(`Example: ${prefix + command} on/off`);

      const validOptions = ["on", "off"];
      const option = args[0].toLowerCase();

      if (!validOptions.includes(option)) return reply("Invalid option");

      db.settings.autobio = option === "on";

      await saveDatabase();

      reply(`Auto-bio ${option === "on" ? "enabled" : "disabled"} successfully`);
    },
    react: "📝" // Notepad for auto-bio
  },
  {
    command: ['autoreactstatus', 'autostatusreact'],
    operate: async ({ Cypher, m, reply, args, prefix, command, isCreator, mess, db, botNumber, saveDatabase }) => {
      if (!isCreator) return reply(mess.owner);
      if (args.length < 1) return reply(`Example: ${prefix + command} on/off`);

      const validOptions = ["on", "off"];
      const option = args[0].toLowerCase();

      if (!validOptions.includes(option)) return reply("Invalid option");

      db.settings.autoreactstatus = option === "on";

      await saveDatabase();

      reply(`Auto status reaction ${option === "on" ? "enabled" : "disabled"} successfully.`);
    },
    react: "👍" // Thumbs up for auto-reaction on status
  },
  {
    command: ['autoviewstatus', 'autostatusview'],
    operate: async ({ Cypher, m, reply, args, prefix, command, isCreator, mess, db, botNumber, saveDatabase }) => {
      if (!isCreator) return reply(mess.owner);
      if (args.length < 1) return reply(`Example: ${prefix + command} on/off`);

      const validOptions = ["on", "off"];
      const option = args[0].toLowerCase();

      if (!validOptions.includes(option)) return reply("Invalid option");

      db.settings.autoviewstatus = option === "on";

      await saveDatabase();

      reply(`Auto status view ${option === "on" ? "enabled" : "disabled"} successfully`);
    },
    react: "👀" // Eyes for auto-viewing status
  },
  {
    command: ['autoreact', 'autoreacting'],
    operate: async ({ reply, args, prefix, command, isCreator, mess, db, saveDatabase }) => {
      if (!isCreator) return reply(mess.owner);
      
      if (args.length < 1) {
        return reply(`Example: ${prefix + command} all/group/pm/command/off\n\nall - reacts to all messages\ngroup - reacts to messages in groups\npm - reacts to private messages\ncommand - reacts when a command is used\noff - disables auto-reaction`);
      }

      const validOptions = ["all", "group", "pm", "command", "off"];
      const option = args[0].toLowerCase();

      if (!validOptions.includes(option)) {
        return reply(`Invalid option; type *${prefix}autoreact* to see available options!`);
      }

      db.settings.autoreact = option === "off" ? false : option;

      await saveDatabase();

      reply(`Auto-reaction set to *${option}* successfully.`);
    },
    react: "🤖" // Robot for auto-reaction
  },
  {
    command: ['autoread'],
    operate: async ({ reply, args, prefix, command, isCreator, mess, db, saveDatabase }) => {
      if (!isCreator) return reply(mess.owner);
      if (args.length < 1) return reply(`Example: ${prefix + command} all/group/pm/command/off\n\nall - reads all messages\ngroup - reads group messages alone\npm - reads private messages alone\ncommand - reads bot commands only\noff disables autoread`);

      const validOptions = ["all", "group", "pm", "command", "off"];
      const option = args[0].toLowerCase();

      if (!validOptions.includes(option)) return reply(`Invalid option; type *${prefix}autoread* to see available options!`);

      db.settings.autoread = option === "off" ? false : option;

      await saveDatabase();

      reply(`Auto-read set to *${option}* successfully.`);
    },
    react: "👁️" // Eye for auto-reading messages
  },
  {
    command: ['autotype', 'autotyping'],
    operate: async ({ reply, args, prefix, command, isCreator, mess, db, saveDatabase }) => {
      if (!isCreator) return reply(mess.owner);
      if (args.length < 1) return reply(`Example: ${prefix + command} all/group/pm/command/off\n\ngroup - typing in groups\npm - typing in private chats\ncommand - typing when a command is used\noff - disables autotyping`);

      const validOptions = ["all", "group", "pm", "command", "off"];
      const option = args[0].toLowerCase();

      if (!validOptions.includes(option)) return reply(`Invalid option; type *${prefix}autotype* to see available options!`);

      db.settings.autotype = option === "off" ? false : option;

      await saveDatabase();

      reply(`Auto-typing set to *${option}* successfully.`);
    },
    react: "⌨️" // Keyboard for auto-typing
  },
  {
    command: ['autorecord', 'autorecording'],
    operate: async ({ reply, args, prefix, command, isCreator, mess, db, saveDatabase }) => {
      if (!isCreator) return reply(mess.owner);
      if (args.length < 1) return reply(`Example: ${prefix + command} all/group/pm/command/off\n\ngroup - recording in groups\npm - recording in private chats\ncommand - recording when a command is used\noff - disables auto-recording`);

      const validOptions = ["all", "group", "pm", "command", "off"];
      const option = args[0].toLowerCase();

      if (!validOptions.includes(option)) return reply(`Invalid option; type *${prefix}autorecord* to see available options!`);

      db.settings.autorecord = option === "off" ? false : option;

      await saveDatabase();

      reply(`Auto-record set to *${option}* successfully.`);
    },
    react: "🎙️" // Microphone for auto-recording
  },
  {
    command: ['autorecordtyping', 'autorecordtype'],
    operate: async ({ reply, args, prefix, command, isCreator, mess, db, saveDatabase }) => {
      if (!isCreator) return reply(mess.owner);
      if (args.length < 1) return reply(`Example: ${prefix + command} all/group/pm/command/off\n\ngroup - random typing/recording in groups\npm - random typing/recording in private chats\ncommand - random typing/recording when a command is used\noff - disables auto-record typing`);

      const validOptions = ["all", "group", "pm", "command", "off"];
      const option = args[0].toLowerCase();

      if (!validOptions.includes(option)) return reply(`Invalid option; type *${prefix}autorecordtype* to see available options!`);

      db.settings.autorecordtype = option === "off" ? false : option;

      await saveDatabase();

      reply(`Auto-record typing set to *${option}* successfully.`);
    },
    react: "🎙️⌨️" // Microphone and keyboard for auto-record typing
  },
  {
    command: ['chatbot'],
    operate: async ({ Cypher, m, reply, args, prefix, command, isCreator, mess, db, botNumber, saveDatabase }) => {
      if (!isCreator) return reply(mess.owner);
      if (args.length < 1) return reply(`Example: ${prefix + command} on/off`);

      const validOptions = ["on", "off"];
      const option = args[0].toLowerCase();

      if (!validOptions.includes(option)) return reply("Invalid option");

      db.settings.chatbot = option === "on";

      await saveDatabase();

      reply(`Chatbot ${option === "on" ? "enabled" : "disabled"} successfully`);
    },
    react: "🤖" // Robot for chatbot
  },
  {
    command: ['deletebadword'],
    operate: async ({ Cypher, m, isCreator, mess, prefix, args, q, bad, reply }) => {
      if (!isCreator) return reply(mess.owner);
      if (args.length < 1) return reply(`Use ${prefix}deletebadword [harsh word].`);

      const index = bad.indexOf(q);
      if (index === -1) {
        return reply('This word is not in the list!');
      }

      bad.splice(index, 1);

      try {
        await fsp.writeFile('./src/Database/badwords.json', JSON.stringify(bad, null, 2));
        reply('Successfully deleted bad word!');
      } catch (error) {
        console.error('Error writing to badwords.json:', error);
        reply('An error occurred while deleting the bad word.');
      }
    },
    react: "🗑️" // Trash can for deleting bad words
  },
  {
    command: ['delignorelist'],
    operate: async ({ m, args, isCreator, loadBlacklist, mess, reply, saveDatabase }) => {
      if (!isCreator) return reply(mess.owner);

      let mentionedUser = m.mentionedJid && m.mentionedJid[0];
      let quotedUser = m.quoted && m.quoted.sender;
      let userToRemove = mentionedUser || quotedUser || m.chat;

      if (!userToRemove) return reply('Mention a user, reply to their message, or provide a phone number to remove from the ignore list.');

      let blacklist = loadBlacklist();
      let index = blacklist.blacklisted_numbers.indexOf(userToRemove);
      if (index !== -1) {
        blacklist.blacklisted_numbers.splice(index, 1);
        await saveDatabase();
        await reply(`+${userToRemove.split('@')[0]} removed from the ignore list.`);
      } else {
        await reply(`+${userToRemove.split('@')[0]} is not in the ignore list.`);
      }
    },
    react: "✅" // Checkmark for removing from ignore list
  },
  {
    command: ['delsudo'],
    operate: async ({ m, args, isCreator, reply, saveDatabase }) => {
      if (!isCreator) return reply(mess.owner);

      if (m.chat.endsWith('@g.us') && !(m.mentionedJid && m.mentionedJid[0]) && !(m.quoted && m.quoted.sender)) {
        return reply('Reply to or tag a person!');
      }

      const userToRemove = m.mentionedJid && m.mentionedJid[0] || m.quoted && m.quoted.sender || m.chat;

      if (!userToRemove) return reply('Mention a user or reply to their message to remove them from the sudo list.');

      const sudoList = global.db.sudo;
      const index = sudoList.indexOf(userToRemove);

      if (index !== -1) {
        sudoList.splice(index, 1);
        await saveDatabase();
        await reply(`+${userToRemove.split('@')[0]} removed from the sudo list.`);
      } else {
        await reply(`+${userToRemove.split('@')[0]} is not in the sudo list.`);
      }
    },
    react: "👑" // Crown for removing sudo users
  },
  {
    command: ['mode'],
    operate: async ({ Cypher, m, reply, args, prefix, command, isCreator, mess, db, botNumber, saveDatabase }) => {
      if (!isCreator) return reply(mess.owner);
      if (args.length < 1) return reply(`Example: ${prefix + command} public/private/group/pm\n\nprivate - sets the bot to private mode\npublic - sets the bot to public mode\ngroup - sets the bot to be public on groups alone\npm - sets the bot to be public on personal chats alone.`);

      const validOptions = ["private", "public", "group", "pm"];
      const option = args[0].toLowerCase();

      if (!validOptions.includes(option)) return reply("Invalid option. Use: private, public, group or pm");

      db.settings.mode = option;

      await saveDatabase();

      reply(`Bot mode set to: *${option}*`);
    },
    react: "🔧" // Wrench for setting mode
  },
  {
    command: ['setmenu', 'menustyle'],
    operate: async ({ reply, args, prefix, command, db, isCreator, mess, saveDatabase }) => {
      if (!isCreator) return reply(mess.owner);
      if (args.length < 1) return reply(`Example: ${prefix + command} 2\n\nOptions:\n1 = Document menu (Android only)\n2 = Text only menu (Android & iOS)\n3 = Image menu with context (Android & iOS)\n4 = Image menu (Android & iOS)\n5 = Footer/faded menu\n6 = Payment menu`);

      const validOptions = ["1", "2", "3", "4", "5", "6"];
      const option = args[0];

      if (!validOptions.includes(option)) return reply("⚠️ Invalid menu style. Use a number between *1-6*.");

      db.settings.menustyle = option;
      reply(`✅ Menu style changed to *${option}* successfully.`);

      await saveDatabase();
    },
    react: "📋" // Clipboard for setting menu style
  },
  {
    command: ['setprefix'],
    operate: async ({ reply, args, prefix, command, db, isCreator, mess, saveDatabase }) => {
      if (!isCreator) return reply(mess.owner);
      if (args.length < 1) return reply(`Example: ${prefix + command} !\n\n- This will change the bot prefix to *!*\n\nUse *${prefix + command} none* to use the bot without prefix`);

      let newPrefix = args[0];

      if (newPrefix.toLowerCase() === "none" || newPrefix.toLowerCase() === "noprefix") {
        newPrefix = "";
      } else if (newPrefix.length > 3) {
        return reply("⚠️ Prefix should be 1-3 characters long.");
      }

      db.settings.prefix = newPrefix;
      reply(`✅ Prefix changed to *${newPrefix || "No Prefix"}* successfully.`);

      await saveDatabase();
    },
    react: "🔑" // Key for setting prefix
  },
  {
    command: ['setstatusemoji', 'statusemoji'],
    operate: async ({ reply, args, prefix, command, db, isCreator, mess, saveDatabase }) => {
      if (!isCreator) return reply(mess.owner);
      if (args.length < 1) return reply(`Example: ${prefix + command} 🧡\n\n- This will change the bot's status reaction emoji to *🧡*`);

      const newEmoji = args[0];

      if (!/^\p{Emoji}$/u.test(newEmoji)) return reply("⚠️ Please provide a single valid emoji.");

      db.settings.statusemoji = newEmoji;
      reply(`✅ Status reaction emoji changed to *${newEmoji}* successfully.`);

      await saveDatabase();
    },
    react: "😊" // Smiley face for setting status emoji
  },
  {
    command: ['welcome'],
    operate: async ({ Cypher, m, reply, args, prefix, command, isCreator, mess, db, botNumber, saveDatabase }) => {
      if (!isCreator) return reply(mess.owner);
      if (args.length < 1) return reply(`Example: ${prefix + command} on/off`);

      const validOptions = ["on", "off"];
      const option = args[0].toLowerCase();

      if (!validOptions.includes(option)) return reply("Invalid option");

      db.settings.welcome = option === "on";

      await saveDatabase();

      reply(`Group welcome/left messages ${option === "on" ? "enabled" : "disabled"} successfully`);
    },
    react: "👋" // Waving hand for welcome messages
  },
  {
    command: ['getsettings'],
    operate: async ({ reply, db }) => {
      const settings = db.settings;
      
      let message = "⚙️ *Current Bot Settings:*\n\n";
      for (const [key, value] of Object.entries(settings)) {
        message += `🔸 *${key}*: ${typeof value === "boolean" ? (value ? "ON" : "OFF") : value}\n`;
      }

      reply(message);
    },
    react: "🔍" // Magnifying glass for viewing settings
  },
  {
    command: ['resetsetting'],
    operate: async ({ reply, args, prefix, command, db, isCreator }) => {
      if (!isCreator) return reply("Only the owner can reset settings.");
      if (args.length < 1) return reply(`Example: ${prefix + command} <setting/all>\n\n- Use *all* to reset all settings.\n- Use a specific setting name to reset only that.`);

      const settingToReset = args[0].toLowerCase();
      const defaultSettings = {
        prefix: ".",
        mode: "public",
        autobio: false,
        anticall: false,
        chatbot: false,
        antibug: false,
        autotype: false,
        autoread: false,
        welcome: false,
        antiedit: "private",
        menustyle: "2",
        autoreact: false,
        statusemoji: "🧡",
        autorecord: false,
        antidelete: "private",
        alwaysonline: true,
        autoviewstatus: true,
        autoreactstatus: false,
        autorecordtype: false
      };

      if (settingToReset === "all") {
        db.settings = { ...defaultSettings };
        reply("✅ All settings have been reset to default.");
      } else if (settingToReset in defaultSettings) {
        db.settings[settingToReset] = defaultSettings[settingToReset];
        reply(`✅ *${settingToReset}* has been reset to *${defaultSettings[settingToReset]}*.`);
      } else {
        reply(`⚠️ Invalid setting name. Use *${prefix + command} all* to reset everything or provide a valid setting name.`);
      }

      await saveDatabase();
    },
    react: "🔄" // Refresh for resetting settings
  }
];