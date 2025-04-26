const { fetchJson } = require('../../lib/myfunc');
const { ringtone } = require('../../lib/scraper');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const yts = require('yt-search');

module.exports = [
  {
    command: ['apk', 'apkdl'],
    operate: async ({ m, text, Cypher, botname, reply }) => {
      if (!text) return reply("Which apk do you want to download?");
      try {
        let apiUrl = await fetchJson(`https://bk9.fun/search/apk?q=${encodeURIComponent(text)}`);
        let tylor = await fetchJson(`https://bk9.fun/download/apk?id=${apiUrl.BK9[0].id}`);
        await Cypher.sendMessage(m.chat, {
          document: { url: tylor.BK9.dllink },
          fileName: tylor.BK9.name,
          mimetype: "application/vnd.android.package-archive",
          contextInfo: {
            externalAdReply: {
              title: botname,
              body: tylor.BK9.name,
              thumbnailUrl: tylor.BK9.icon,
              sourceUrl: tylor.BK9.dllink,
              mediaType: 2,
              showAdAttribution: true,
              renderLargerThumbnail: false
            }
          }
        }, { quoted: m });
      } catch (error) {
        reply(`Error fetching APK details: ${error.message}`);
      }
    },
    react: "📱" // Mobile app download
  },
  {
    command: ['download'],
    operate: async ({ m, text, Cypher, reply }) => {
      if (!text) return reply('Enter download URL');
      try {
        let res = await fetch(text, { method: 'GET', redirect: 'follow' });
        let contentType = res.headers.get('content-type');
        let buffer = await res.buffer();
        let extension = contentType.split("/")[1];
        let filename = res.headers.get('content-disposition')?.match(/filename="(.*)")/)?.[1] || `download-${Math.random().toString(36).slice(2, 10)}.${extension}`;
        let mimeType;
        switch (contentType) {
          case 'audio/mpeg': mimeType = 'audio/mpeg'; break;
          case 'image/png': mimeType = 'image/png'; break;
          case 'image/jpeg': mimeType = 'image/jpeg'; break;
          case 'application/pdf': mimeType = 'application/pdf'; break;
          case 'application/zip': mimeType = 'application/zip'; break;
          case 'video/mp4': mimeType = 'video/mp4'; break;
          case 'video/webm': mimeType = 'video/webm'; break;
          case 'application/vnd.android.package-archive': mimeType = 'application/vnd.android.package-archive'; break;
          default: mimeType = 'application/octet-stream';
        }
        await Cypher.sendMessage(m.chat, { document: buffer, mimetype: mimeType, fileName: filename }, { quoted: m });
      } catch (error) {
        reply(`Error downloading file: ${error.message}`);
      }
    },
    react: "⬇️" // General download
  },
  {
    command: ['facebook', 'fbdl'],
    operate: async ({ m, text, Cypher, reply }) => {
      if (!text) return reply('Please provide a Facebook video URL!');
      try {
        let dlink = await fetchJson(`https://api-aswin-sparky.koyeb.app/api/downloader/fbdl?url=${encodeURIComponent(text)}`);
        let dlurl = dlink.data.high;
        await Cypher.sendMessage(m.chat, { video: { url: dlurl }, caption: global.botname }, { quoted: m });
      } catch (error) {
        reply(`Error fetching video: ${error.message}`);
      }
    },
    react: "📹" // Video download
  },
  {
    command: ['gdrive'],
    operate: async ({ Cypher, m, reply, text }) => {
      if (!text) return reply("Please provide a Google Drive file URL");
      try {
        let response = await fetch(`https://api.siputzx.my.id/api/d/gdrive?url=${encodeURIComponent(text)}`);
        let data = await response.json();
        if (response.status !== 200 || !data.status || !data.data) {
          return reply("Please try again later or try another command!");
        }
        const downloadUrl = data.data.download;
        const filePath = path.join(__dirname, data.data.name);
        const writer = fs.createWriteStream(filePath);
        const fileResponse = await axios({ url: downloadUrl, method: 'GET', responseType: 'stream' });
        fileResponse.data.pipe(writer);
        await new Promise((resolve, reject) => {
          writer.on('finish', resolve);
          writer.on('error', reject);
        });
        await Cypher.sendMessage(m.chat, {
          document: { url: filePath },
          fileName: data.data.name,
          mimetype: fileResponse.headers['content-type']
        }, { quoted: m });
        fs.unlinkSync(filePath);
      } catch (error) {
        console.error('Error fetching Google Drive file:', error);
        reply(`Error fetching Google Drive file: ${error.message}`);
      }
    },
    react: "📂" // Cloud storage
  },
  {
    command: ['gitclone'],
    operate: async ({ m, args, prefix, command, Cypher, reply, isUrl }) => {
      if (!args[0]) return reply(`GitHub link to clone?*\nExample: \n${prefix}${command} https://github.com/Dark-Xploit/CypherX`);
      if (!isUrl(args[0]) || !/^(https?:\/\/)?(www\.)?github\.com\/[\w-]+\/[\w-]+\/?$/.test(args[0])) {
        return reply("Link invalid! Please provide a valid GitHub repository URL.");
      }
      try {
        // Placeholder: Implement cloning logic (e.g., using nodegit or GitHub API)
        reply("Cloning repository... (please implement cloning logic)");
      } catch (error) {
        reply(`Error cloning repository: ${error.message}`);
      }
    },
    react: "📚" // Code repository
  },
  {
    command: ['instagram', 'igdl'],
    operate: async ({ Cypher, m, reply, text }) => {
      if (!text) return reply("Please provide an Instagram URL!");
      try {
        const response = await fetch(`https://xploader-api.vercel.app/igdl?url=${encodeURIComponent(text)}`);
        const data = await response.json();
        if (!data.url) return reply("Failed to retrieve the video!");
        await Cypher.sendMessage(m.chat, {
          video: { url: data.url },
          mimetype: 'video/mp4',
          fileName: 'Instagram_Video.mp4'
        }, { quoted: m });
      } catch (error) {
        console.error('Instagram download failed:', error);
        reply(`Error: ${error.message}`);
      }
    },
    react: "📸" // Social media photo/video
  },
  {
    command: ['itunes'],
    operate: async ({ m, text, Cypher, reply }) => {
      if (!text) return reply("Please provide a song name");
      try {
        let res = await fetch(`https://api.popcat.xyz/itunes?q=${encodeURIComponent(text)}`);
        if (!res.ok) throw new Error(`API request failed with status ${res.status}`);
        let json = await res.json();
        let songInfo = `Song Information:\n*Name:* ${json.name}\n*Artist:* ${json.artist}\n*Album:* ${json.album}\n*Release Date:* ${json.release_date}\n*Price:* ${json.price}\n*Length:* ${json.length}\n*Genre:* ${json.genre}\n*URL:* ${json.url}`;
        if (json.thumbnail) {
          await Cypher.sendMessage(m.chat, {
            image: { url: json.thumbnail },
            caption: songInfo
          }, { quoted: m });
        } else {
          reply(songInfo);
        }
      } catch (error) {
        console.error('iTunes fetch failed:', error);
        reply(`Error fetching song information: ${error.message}`);
      }
    },
    react: "🎶" // Music info
  },
  {
    command: ['mediafire'],
    operate: async ({ Cypher, m, reply, text }) => {
      if (!text) return reply("Please provide a MediaFire file URL");
      try {
        let response = await fetch(`https://api.siputzx.my.id/api/d/mediafire?url=${encodeURIComponent(text)}`);
        let data = await response.json();
        if (response.status !== 200 || !data.status || !data.data) {
          return reply("Please try again later or try another command!");
        }
        const downloadUrl = data.data.downloadLink;
        const filePath = path.join(__dirname, `${data.data.fileName}.zip`);
        const writer = fs.createWriteStream(filePath);
        const fileResponse = await axios({ url: downloadUrl, method: 'GET', responseType: 'stream' });
        fileResponse.data.pipe(writer);
        await new Promise((resolve, reject) => {
          writer.on('finish', resolve);
          writer.on('error', reject);
        });
        await Cypher.sendMessage(m.chat, {
          document: { url: filePath },
          fileName: data.data.fileName,
          mimetype: 'application/zip'
        }, { quoted: m });
        fs.unlinkSync(filePath);
      } catch (error) {
        console.error('Error fetching MediaFire file:', error);
        reply(`Error fetching MediaFire file: ${error.message}`);
      }
    },
    react: "📦" // File storage
  },
  {
    command: ['pinterest'],
    operate: async ({ Cypher, m, reply, text }) => {
      if (!text) return reply("Please provide a search query");
      try {
        let response = await fetch(`https://api.siputzx.my.id/api/s/pinterest?query=${encodeURIComponent(text)}`);
        let data = await response.json();
        if (response.status !== 200 || !data.status || !data.data || data.data.length === 0) {
          return reply("Please try again later or try another command!");
        }
        const images = data.data.slice(0, 5);
        for (const image of images) {
          await Cypher.sendMessage(m.chat, { image: { url: image.images_url } }, { quoted: m });
        }
      } catch (error) {
        console.error('Error fetching Pinterest images:', error);
        reply(`Error fetching Pinterest images: ${error.message}`);
      }
    },
    react: "🖼️" // Images
  },
  {
    command: ['play', 'song'],
    operate: async ({ Cypher, m, reply, text, fetchMp3DownloadUrl }) => {
      if (!text) return reply("Please provide a song name!");
      try {
        const search = await yts(text);
        if (!search || search.all.length === 0) return reply("The song you are looking for was not found.");
        const video = search.all[0];
        const downloadUrl = await fetchMp3DownloadUrl(video.url);
        await Cypher.sendMessage(m.chat, {
          audio: { url: downloadUrl },
          mimetype: 'audio/mpeg',
          fileName: `${video.title}.mp3`
        }, { quoted: m });
      } catch (error) {
        console.error('Play command failed:', error);
        reply(`Error: ${error.message}`);
      }
    },
    react: "🎵" // Music playback
  },
  {
    command: ['playdoc', 'songdoc'],
    operate: async ({ Cypher, m, reply, text, fetchMp3DownloadUrl }) => {
      if (!text) return reply("Please provide a song name!");
      try {
        const search = await yts(text);
        if (!search || search.all.length === 0) return reply("The song you are looking for was not found.");
        const video = search.all[0];
        const downloadUrl = await fetchMp3DownloadUrl(video.url);
        await Cypher.sendMessage(m.chat, {
          document: { url: downloadUrl },
          mimetype: 'audio/mpeg',
          fileName: `${video.title}.mp3`
        }, { quoted: m });
      } catch (error) {
        console.error('Playdoc command failed:', error);
        reply(`Error: ${error.message}`);
      }
    },
    react: "📄🎵" // Audio as document
  },
  {
    command: ['ringtone'],
    operate: async ({ m, text, prefix, command, Cypher, reply }) => {
      if (!text) return reply(`Example: ${prefix}${command} black rover`);
      try {
        let dltone2 = await ringtone.ringtone(text);
        let result = dltone2[Math.floor(Math.random() * dltone2.length)];
        await Cypher.sendMessage(m.chat, {
          audio: { url: result.audio },
          fileName: `${result.title}.mp3`,
          mimetype: "audio/mpeg"
        }, { quoted: m });
      } catch (error) {
        reply(`Error fetching ringtone: ${error.message}`);
      }
    },
    react: "🔔" // Ringtones
  },
  {
    command: ['savestatus', 'save'],
    operate: async ({ m, saveStatusMessage }) => {
      try {
        await saveStatusMessage(m);
        // Placeholder: Add confirmation if needed
        reply("Status saved successfully!");
      } catch (error) {
        reply(`Error saving status: ${error.message}`);
      }
    },
    react: "💾" // Saving
  },
  {
    command: ['tiktok', 'tikdl', 'tiktokvideo'],
    operate: async ({ m, args, fetchJson, Cypher, reply }) => {
      if (!args[0]) return reply('Please provide a TikTok video URL!');
      try {
        let apiUrl = await fetchJson(`https://api-aswin-sparky.koyeb.app/api/downloader/tiktok?url=${encodeURIComponent(args[0])}`);
        await Cypher.sendMessage(m.chat, {
          video: { url: apiUrl.data.url },
          fileName: "tiktok_video.mp4",
          mimetype: "video/mp4",
          caption: global.wm
        }, { quoted: m });
      } catch (error) {
        reply(`Error fetching video: ${error.message}`);
      }
    },
    react: "🎥" // TikTok videos
  },
  {
    command: ['tiktokaudio'],
    operate: async ({ m, args, fetchJson, Cypher, reply }) => {
      if (!args[0]) return reply('Please provide a TikTok audio URL!');
      try {
        let apiUrl = await fetchJson(`https://api-aswin-sparky.koyeb.app/api/downloader/tiktok?url=${encodeURIComponent(args[0])}`);
        await Cypher.sendMessage(m.chat, {
          audio: { url: apiUrl.data.audio },
          fileName: "tiktok_audio.mp3",
          mimetype: "audio/mpeg"
        }, { quoted: m });
      } catch (error) {
        reply(`Error fetching audio: ${error.message}`);
      }
    },
    react: "🎧" // TikTok audio
  },
  {
    command: ['video'],
    operate: async ({ Cypher, m, reply, text, fetchVideoDownloadUrl }) => {
      if (!text) return reply('Please provide a song name!');
      try {
        const search = await yts(text);
        if (!search || search.all.length === 0) return reply('The song you are looking for was not found.');
        const video = search.all[0];
        const videoData = await fetchVideoDownloadUrl(video.url);
        await Cypher.sendMessage(m.chat, {
          video: { url: videoData.data.dl },
          mimetype: 'video/mp4',
          fileName: `${videoData.data.title}.mp4`,
          caption: videoData.data.title
        }, { quoted: m });
      } catch (error) {
        console.error('Video command failed:', error);
        reply(`Error: ${error.message}`);
      }
    },
    react: "🎬" // Videos
  },
  {
    command: ['video.doc', 'videodoc'],
    operate: async ({ Cypher, m, reply, text, fetchVideoDownloadUrl }) => {
      if (!text) return reply('Please provide a song name!');
      try {
        const search = await yts(text);
        if (!search || search.all.length === 0) return reply('The song you are looking for was not found.');
        const video = search.all[0];
        const videoData = await fetchVideoDownloadUrl(video.url);
        await Cypher.sendMessage(m.chat, {
          document: { url: videoData.data.dl },
          mimetype: 'video/mp4',
          fileName: `${videoData.data.title}.mp4`,
          caption: videoData.data.title
        }, { quoted: m });
      } catch (error) {
        console.error('Videodoc command failed:', error);
        reply(`Error: ${error.message}`);
      }
    },
    react: "📄🎬" // Video as document
  },
  {
    command: ['xvideos', 'porn', 'xdl'],
    operate: async ({ m, text, isCreator, reply, mess, Cypher, fetchJson }) => {
      if (!isCreator) return reply(mess.owner);
      if (!text) return reply('Please provide a porn video search query!');
      try {
        let kutu = await fetchJson(`https://api-aswin-sparky.koyeb.app/api/search/xnxx?search=${encodeURIComponent(text)}`);
        let apiUrl = await fetchJson(`https://api-aswin-sparky.koyeb.app/api/downloader/xnxx?url=${encodeURIComponent(kutu.result.result[0].link)}`);
        await Cypher.sendMessage(m.chat, {
          video: { url: apiUrl.data.files.high },
          caption: global.wm,
          contextInfo: {
            externalAdReply: {
              title: global.botname,
              body: kutu.result.result[0].title,
              sourceUrl: kutu.result.result[0].link,
              mediaType: 2,
              mediaUrl: kutu.result.result[0].link
            }
          }
        }, { quoted: m });
      } catch (error) {
        console.error('Xvideos command failed:', error);
        reply(`Error fetching video: ${error.message}`);
      }
    },
    react: "🔞" // Adult content (use with caution)
  },
  {
    command: ['ytmp3'],
    operate: async ({ Cypher, m, reply, text, fetchMp3DownloadUrl }) => {
      if (!text) return reply('Please provide a valid YouTube link!');
      try {
        const urlMatch = text.match(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch\?v=)?[a-zA-Z0-9_-]{11})/gi);
        if (!urlMatch) return reply('Seems like your message does not contain a valid YouTube link');
        const link = urlMatch[0];
        const downloadUrl = await fetchMp3DownloadUrl(link);
        await Cypher.sendMessage(m.chat, {
          audio: { url: downloadUrl },
          mimetype: 'audio/mpeg',
          fileName: 'youtube_audio.mp3'
        }, { quoted: m });
      } Â catch (error) {
        console.error('Ytmp3 command failed:', error);
        reply(`Error: ${error.message}`);
      }
    },
    react: "🎵" // YouTube audio
  },
  {
    command: ['ytmp3doc'],
    operate: async ({ Cypher, m, reply, text, fetchMp3DownloadUrl }) => {
      if (!text) return reply('Please provide a valid YouTube link!');
      try {
        const urlMatch = text.match(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch\?v=)?[a-zA-Z0-9_-]{11})/gi);
        if (!urlMatch) return reply('Seems like your message does not contain a valid YouTube link');
        const link = urlMatch[0];
        const downloadUrl = await fetchMp3DownloadUrl(link);
        const search = await yts(link);
        const name = search.all[0];
        await Cypher.sendMessage(m.chat, {
          document: {
            url: downloadUrl,
            mimetype: 'audio/mpeg',
            fileName: `${name.title}.mp3`
          },
          caption: name.title
        }, { quoted: m });
      } catch (error) {
        console.error('Ytmp3doc command failed:', error);
        reply(`Error: ${error.message}`);
      }
    },
    react: "📄const { fetchJson } = require('../../lib/myfunc');
const { ringtone } = require('../../lib/scraper');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const yts = require('yt-search');

module.exports = [
  {
    command: ['apk', 'apkdl'],
    operate: async ({ m, text, Cypher, botname, reply }) => {
      if (!text) return reply("Which apk do you want to download?");
      try {
        let apiUrl = await fetchJson(`https://bk9.fun/search/apk?q=${encodeURIComponent(text)}`);
        let tylor = await fetchJson(`https://bk9.fun/download/apk?id=${apiUrl.BK9[0].id}`);
        await Cypher.sendMessage(m.chat, {
          document: { url: tylor.BK9.dllink },
          fileName: tylor.BK9.name,
          mimetype: "application/vnd.android.package-archive",
          contextInfo: {
            externalAdReply: {
              title: botname,
              body: tylor.BK9.name,
              thumbnailUrl: tylor.BK9.icon,
              sourceUrl: tylor.BK9.dllink,
              mediaType: 2,
              showAdAttribution: true,
              renderLargerThumbnail: false
            }
          }
        }, { quoted: m });
      } catch (error) {
        reply(`Error fetching APK details: ${error.message}`);
      }
    },
    react: "📱" // Mobile app download
  },
  {
    command: ['download'],
    operate: async ({ m, text, Cypher, reply }) => {
      if (!text) return reply('Enter download URL');
      try {
        let res = await fetch(text, { method: 'GET', redirect: 'follow' });
        let contentType = res.headers.get('content-type');
        let buffer = await res.buffer();
        let extension = contentType.split("/")[1];
        let filename = res.headers.get('content-disposition')?.match(/filename="(.*)")/)?.[1] || `download-${Math.random().toString(36).slice(2, 10)}.${extension}`;
        let mimeType;
        switch (contentType) {
          case 'audio/mpeg': mimeType = 'audio/mpeg'; break;
          case 'image/png': mimeType = 'image/png'; break;
          case 'image/jpeg': mimeType = 'image/jpeg'; break;
          case 'application/pdf': mimeType = 'application/pdf'; break;
          case 'application/zip': mimeType = 'application/zip'; break;
          case 'video/mp4': mimeType = 'video/mp4'; break;
          case 'video/webm': mimeType = 'video/webm'; break;
          case 'application/vnd.android.package-archive': mimeType = 'application/vnd.android.package-archive'; break;
          default: mimeType = 'application/octet-stream';
        }
        await Cypher.sendMessage(m.chat, { document: buffer, mimetype: mimeType, fileName: filename }, { quoted: m });
      } catch (error) {
        reply(`Error downloading file: ${error.message}`);
      }
    },
    react: "⬇️" // General download
  },
  {
    command: ['facebook', 'fbdl'],
    operate: async ({ m, text, Cypher, reply }) => {
      if (!text) return reply('Please provide a Facebook video URL!');
      try {
        let dlink = await fetchJson(`https://api-aswin-sparky.koyeb.app/api/downloader/fbdl?url=${encodeURIComponent(text)}`);
        let dlurl = dlink.data.high;
        await Cypher.sendMessage(m.chat, { video: { url: dlurl }, caption: global.botname }, { quoted: m });
      } catch (error) {
        reply(`Error fetching video: ${error.message}`);
      }
    },
    react: "📹" // Video download
  },
  {
    command: ['gdrive'],
    operate: async ({ Cypher, m, reply, text }) => {
      if (!text) return reply("Please provide a Google Drive file URL");
      try {
        let response = await fetch(`https://api.siputzx.my.id/api/d/gdrive?url=${encodeURIComponent(text)}`);
        let data = await response.json();
        if (response.status !== 200 || !data.status || !data.data) {
          return reply("Please try again later or try another command!");
        }
        const downloadUrl = data.data.download;
        const filePath = path.join(__dirname, data.data.name);
        const writer = fs.createWriteStream(filePath);
        const fileResponse = await axios({ url: downloadUrl, method: 'GET', responseType: 'stream' });
        fileResponse.data.pipe(writer);
        await new Promise((resolve, reject) => {
          writer.on('finish', resolve);
          writer.on('error', reject);
        });
        await Cypher.sendMessage(m.chat, {
          document: { url: filePath },
          fileName: data.data.name,
          mimetype: fileResponse.headers['content-type']
        }, { quoted: m });
        fs.unlinkSync(filePath);
      } catch (error) {
        console.error('Error fetching Google Drive file:', error);
        reply(`Error fetching Google Drive file: ${error.message}`);
      }
    },
    react: "📂" // Cloud storage
  },
  {
    command: ['gitclone'],
    operate: async ({ m, args, prefix, command, Cypher, reply, isUrl }) => {
      if (!args[0]) return reply(`GitHub link to clone?*\nExample: \n${prefix}${command} https://github.com/Dark-Xploit/CypherX`);
      if (!isUrl(args[0]) || !/^(https?:\/\/)?(www\.)?github\.com\/[\w-]+\/[\w-]+\/?$/.test(args[0])) {
        return reply("Link invalid! Please provide a valid GitHub repository URL.");
      }
      try {
        // Placeholder: Implement cloning logic (e.g., using nodegit or GitHub API)
        reply("Cloning repository... (please implement cloning logic)");
      } catch (error) {
        reply(`Error cloning repository: ${error.message}`);
      }
    },
    react: "📚" // Code repository
  },
  {
    command: ['instagram', 'igdl'],
    operate: async ({ Cypher, m, reply, text }) => {
      if (!text) return reply("Please provide an Instagram URL!");
      try {
        const response = await fetch(`https://xploader-api.vercel.app/igdl?url=${encodeURIComponent(text)}`);
        const data = await response.json();
        if (!data.url) return reply("Failed to retrieve the video!");
        await Cypher.sendMessage(m.chat, {
          video: { url: data.url },
          mimetype: 'video/mp4',
          fileName: 'Instagram_Video.mp4'
        }, { quoted: m });
      } catch (error) {
        console.error('Instagram download failed:', error);
        reply(`Error: ${error.message}`);
      }
    },
    react: "📸" // Social media photo/video
  },
  {
    command: ['itunes'],
    operate: async ({ m, text, Cypher, reply }) => {
      if (!text) return reply("Please provide a song name");
      try {
        let res = await fetch(`https://api.popcat.xyz/itunes?q=${encodeURIComponent(text)}`);
        if (!res.ok) throw new Error(`API request failed with status ${res.status}`);
        let json = await res.json();
        let songInfo = `Song Information:\n*Name:* ${json.name}\n*Artist:* ${json.artist}\n*Album:* ${json.album}\n*Release Date:* ${json.release_date}\n*Price:* ${json.price}\n*Length:* ${json.length}\n*Genre:* ${json.genre}\n*URL:* ${json.url}`;
        if (json.thumbnail) {
          await Cypher.sendMessage(m.chat, {
            image: { url: json.thumbnail },
            caption: songInfo
          }, { quoted: m });
        } else {
          reply(songInfo);
        }
      } catch (error) {
        console.error('iTunes fetch failed:', error);
        reply(`Error fetching song information: ${error.message}`);
      }
    },
    react: "🎶" // Music info
  },
  {
    command: ['mediafire'],
    operate: async ({ Cypher, m, reply, text }) => {
      if (!text) return reply("Please provide a MediaFire file URL");
      try {
        let response = await fetch(`https://api.siputzx.my.id/api/d/mediafire?url=${encodeURIComponent(text)}`);
        let data = await response.json();
        if (response.status !== 200 || !data.status || !data.data) {
          return reply("Please try again later or try another command!");
        }
        const downloadUrl = data.data.downloadLink;
        const filePath = path.join(__dirname, `${data.data.fileName}.zip`);
        const writer = fs.createWriteStream(filePath);
        const fileResponse = await axios({ url: downloadUrl, method: 'GET', responseType: 'stream' });
        fileResponse.data.pipe(writer);
        await new Promise((resolve, reject) => {
          writer.on('finish', resolve);
          writer.on('error', reject);
        });
        await Cypher.sendMessage(m.chat, {
          document: { url: filePath },
          fileName: data.data.fileName,
          mimetype: 'application/zip'
        }, { quoted: m });
        fs.unlinkSync(filePath);
      } catch (error) {
        console.error('Error fetching MediaFire file:', error);
        reply(`Error fetching MediaFire file: ${error.message}`);
      }
    },
    react: "📦" // File storage
  },
  {
    command: ['pinterest'],
    operate: async ({ Cypher, m, reply, text }) => {
      if (!text) return reply("Please provide a search query");
      try {
        let response = await fetch(`https://api.siputzx.my.id/api/s/pinterest?query=${encodeURIComponent(text)}`);
        let data = await response.json();
        if (response.status !== 200 || !data.status || !data.data || data.data.length === 0) {
          return reply("Please try again later or try another command!");
        }
        const images = data.data.slice(0, 5);
        for (const image of images) {
          await Cypher.sendMessage(m.chat, { image: { url: image.images_url } }, { quoted: m });
        }
      } catch (error) {
        console.error('Error fetching Pinterest images:', error);
        reply(`Error fetching Pinterest images: ${error.message}`);
      }
    },
    react: "🖼️" // Images
  },
  {
    command: ['play', 'song'],
    operate: async ({ Cypher, m, reply, text, fetchMp3DownloadUrl }) => {
      if (!text) return reply("Please provide a song name!");
      try {
        const search = await yts(text);
        if (!search || search.all.length === 0) return reply("The song you are looking for was not found.");
        const video = search.all[0];
        const downloadUrl = await fetchMp3DownloadUrl(video.url);
        await Cypher.sendMessage(m.chat, {
          audio: { url: downloadUrl },
          mimetype: 'audio/mpeg',
          fileName: `${video.title}.mp3`
        }, { quoted: m });
      } catch (error) {
        console.error('Play command failed:', error);
        reply(`Error: ${error.message}`);
      }
    },
    react: "🎵" // Music playback
  },
  {
    command: ['playdoc', 'songdoc'],
    operate: async ({ Cypher, m, reply, text, fetchMp3DownloadUrl }) => {
      if (!text) return reply("Please provide a song name!");
      try {
        const search = await yts(text);
        if (!search || search.all.length === 0) return reply("The song you are looking for was not found.");
        const video = search.all[0];
        const downloadUrl = await fetchMp3DownloadUrl(video.url);
        await Cypher.sendMessage(m.chat, {
          document: { url: downloadUrl },
          mimetype: 'audio/mpeg',
          fileName: `${video.title}.mp3`
        }, { quoted: m });
      } catch (error) {
        console.error('Playdoc command failed:', error);
        reply(`Error: ${error.message}`);
      }
    },
    react: "🎵" // Audio as document
  },
  {
    command: ['ringtone'],
    operate: async ({ m, text, prefix, command, Cypher, reply }) => {
      if (!text) return reply(`Example: ${prefix}${command} black rover`);
      try {
        let dltone2 = await ringtone.ringtone(text);
        let result = dltone2[Math.floor(Math.random() * dltone2.length)];
        await Cypher.sendMessage(m.chat, {
          audio: { url: result.audio },
          fileName: `${result.title}.mp3`,
          mimetype: "audio/mpeg"
        }, { quoted: m });
      } catch (error) {
        reply(`Error fetching ringtone: ${error.message}`);
      }
    },
    react: "🔔" // Ringtones
  },
  {
    command: ['savestatus', 'save'],
    operate: async ({ m, saveStatusMessage }) => {
      try {
        await saveStatusMessage(m);
        // Placeholder: Add confirmation if needed
        reply("Status saved successfully!");
      } catch (error) {
        reply(`Error saving status: ${error.message}`);
      }
    },
    react: "💾" // Saving
  },
  {
    command: ['tiktok', 'tikdl', 'tiktokvideo'],
    operate: async ({ m, args, fetchJson, Cypher, reply }) => {
      if (!args[0]) return reply('Please provide a TikTok video URL!');
      try {
        let apiUrl = await fetchJson(`https://api-aswin-sparky.koyeb.app/api/downloader/tiktok?url=${encodeURIComponent(args[0])}`);
        await Cypher.sendMessage(m.chat, {
          video: { url: apiUrl.data.url },
          fileName: "tiktok_video.mp4",
          mimetype: "video/mp4",
          caption: global.wm
        }, { quoted: m });
      } catch (error) {
        reply(`Error fetching video: ${error.message}`);
      }
    },
    react: "🎥" // TikTok videos
  },
  {
    command: ['tiktokaudio'],
    operate: async ({ m, args, fetchJson, Cypher, reply }) => {
      if (!args[0]) return reply('Please provide a TikTok audio URL!');
      try {
        let apiUrl = await fetchJson(`https://api-aswin-sparky.koyeb.app/api/downloader/tiktok?url=${encodeURIComponent(args[0])}`);
        await Cypher.sendMessage(m.chat, {
          audio: { url: apiUrl.data.audio },
          fileName: "tiktok_audio.mp3",
          mimetype: "audio/mpeg"
        }, { quoted: m });
      } catch (error) {
        reply(`Error fetching audio: ${error.message}`);
      }
    },
    react: "🎧" // TikTok audio
  },
  {
    command: ['video'],
    operate: async ({ Cypher, m, reply, text, fetchVideoDownloadUrl }) => {
      if (!text) return reply('Please provide a song name!');
      try {
        const search = await yts(text);
        if (!search || search.all.length === 0) return reply('The song you are looking for was not found.');
        const video = search.all[0];
        const videoData = await fetchVideoDownloadUrl(video.url);
        await Cypher.sendMessage(m.chat, {
          video: { url: videoData.data.dl },
          mimetype: 'video/mp4',
          fileName: `${videoData.data.title}.mp4`,
          caption: videoData.data.title
        }, { quoted: m });
      } catch (error) {
        console.error('Video command failed:', error);
        reply(`Error: ${error.message}`);
      }
    },
    react: "🎬" // Videos
  },
  {
    command: ['video.doc', 'videodoc'],
    operate: async ({ Cypher, m, reply, text, fetchVideoDownloadUrl }) => {
      if (!text) return reply('Please provide a song name!');
      try {
        const search = await yts(text);
        if (!search || search.all.length === 0) return reply('The song you are looking for was not found.');
        const video = search.all[0];
        const videoData = await fetchVideoDownloadUrl(video.url);
        await Cypher.sendMessage(m.chat, {
          document: { url: videoData.data.dl },
          mimetype: 'video/mp4',
          fileName: `${videoData.data.title}.mp4`,
          caption: videoData.data.title
        }, { quoted: m });
      } catch (error) {
        console.error('Videodoc command failed:', error);
        reply(`Error: ${error.message}`);
      }
    },
    react: "🎬" // Video as document
  },
  {
    command: ['xvideos', 'porn', 'xdl'],
    operate: async ({ m, text, isCreator, reply, mess, Cypher, fetchJson }) => {
      if (!isCreator) return reply(mess.owner);
      if (!text) return reply('Please provide a porn video search query!');
      try {
        let kutu = await fetchJson(`https://api-aswin-sparky.koyeb.app/api/search/xnxx?search=${encodeURIComponent(text)}`);
        let apiUrl = await fetchJson(`https://api-aswin-sparky.koyeb.app/api/downloader/xnxx?url=${encodeURIComponent(kutu.result.result[0].link)}`);
        await Cypher.sendMessage(m.chat, {
          video: { url: apiUrl.data.files.high },
          caption: global.wm,
          contextInfo: {
            externalAdReply: {
              title: global.botname,
              body: kutu.result.result[0].title,
              sourceUrl: kutu.result.result[0].link,
              mediaType: 2,
              mediaUrl: kutu.result.result[0].link
            }
          }
        }, { quoted: m });
      } catch (error) {
        console.error('Xvideos command failed:', error);
        reply(`Error fetching video: ${error.message}`);
      }
    },
    react: "🔞" // Adult content (use with caution)
  },
  {
    command: ['ytmp3'],
    operate: async ({ Cypher, m, reply, text, fetchMp3DownloadUrl }) => {
      if (!text) return reply('Please provide a valid YouTube link!');
      try {
        const urlMatch = text.match(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch\?v=)?[a-zA-Z0-9_-]{11})/gi);
        if (!urlMatch) return reply('Seems like your message does not contain a valid YouTube link');
        const link = urlMatch[0];
        const downloadUrl = await fetchMp3DownloadUrl(link);
        await Cypher.sendMessage(m.chat, {
          audio: { url: downloadUrl },
          mimetype: 'audio/mpeg',
          fileName: 'youtube_audio.mp3'
        }, { quoted: m });
      } Â catch (error) {
        console.error('Ytmp3 command failed:', error);
        reply(`Error: ${error.message}`);
      }
    },
    react: "🎵" // YouTube audio
  },
  {
    command: ['ytmp3doc'],
    operate: async ({ Cypher, m, reply, text, fetchMp3DownloadUrl }) => {
      if (!text) return reply('Please provide a valid YouTube link!');
      try {
        const urlMatch = text.match(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch\?v=)?[a-zA-Z0-9_-]{11})/gi);
        if (!urlMatch) return reply('Seems like your message does not contain a valid YouTube link');
        const link = urlMatch[0];
        const downloadUrl = await fetchMp3DownloadUrl(link);
        const search = await yts(link);
        const name = search.all[0];
        await Cypher.sendMessage(m.chat, {
          document: {
            url: downloadUrl,
            mimetype: 'audio/mpeg',
            fileName: `${name.title}.mp3`
          },
          caption: name.title
        }, { quoted: m });
      } catch (error) {
        console.error('Ytmp3doc command failed:', error);
        reply(`Error: ${error.message}`);
      }
    },
    react: "🎵" // YouTube audio as document
  },
  {
    command: ['ytmp4'],
    operate: async ({ Cypher, m, reply, text, fetchVideoDownloadUrl }) => {
      if (!text) return reply('Please provide a valid YouTube link!');
      try {
        const urlMatch = text.match(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch\?v=)?[a-zA-Z0-9_-]{11})/gi);
        if (!urlMatch) return reply('Seems like your message does not contain a valid YouTube link');
        const link = urlMatch[0];
        const videoData = await fetchVideoDownloadUrl(link);
        await Cypher.sendMessage(m.chat, {
          video: { url: videoData.data.dl },
          mimetype: 'video/mp4',
          fileName: `${videoData.data.title}.mp4`,
          caption: videoData.data.title
        }, { quoted: m });
      } catch (error) {
        console.error('Ytmp4 command failed:', error);
        reply(`Error: ${error.message}`);
      }
    },
    react: "🎬" // YouTube video
  },
  {
    command: ['ytmp4doc'],
    operate: async ({ Cypher, m, reply, text, fetchVideoDownloadUrl }) => {
      if (!text) return reply('Please provide a valid YouTube link!');
      try {
        const urlMatch = text.match(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch\?v=)?[a-zA-Z0-9_-]{11})/gi);
        if (!urlMatch) return reply('Seems like your message does not contain a valid YouTube link');
        const link = urlMatch[0];
        const videoData = await fetchVideoDownloadUrl(link);
        await Cypher.sendMessage(m.chat, {
          document: { url: videoData.data.dl },
          mimetype: 'video/mp4',
          fileName: `${videoData.data.title}.mp4`,
          caption: videoData.data.title" // YouTube audio as document
  },
  {
    command: ['ytmp4'],
    operate: async ({ Cypher, m, reply, text, fetchVideoDownloadUrl }) => {
      if (!text) return reply('Please provide a valid YouTube link!');
      try {
        const urlMatch = text.match(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch\?v=)?[a-zA-Z0-9_-]{11})/gi);
        if (!urlMatch) return reply('Seems like your message does not contain a valid YouTube link');
        const link = urlMatch[0];
        const videoData = await fetchVideoDownloadUrl(link);
        await Cypher.sendMessage(m.chat, {
          video: { url: videoData.data.dl },
          mimetype: 'video/mp4',
          fileName: `${videoData.data.title}.mp4`,
          caption: videoData.data.title
        }, { quoted: m });
      } catch (error) {
        console.error('Ytmp4 command failed:', error);
        reply(`Error: ${error.message}`);
      }
    },
    react: "🎬" // YouTube video
  },
  {
    command: ['ytmp4doc'],
    operate: async ({ Cypher, m, reply, text, fetchVideoDownloadUrl }) => {
      if (!text) return reply('Please provide a valid YouTube link!');
      try {
        const urlMatch = text.match(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch\?v=)?[a-zA-Z0-9_-]{11})/gi);
        if (!urlMatch) return reply('Seems like your message does not contain a valid YouTube link');
        const link = urlMatch[0];
        const videoData = await fetchVideoDownloadUrl(link);
        await Cypher.sendMessage(m.chat, {
          document: { url: videoData.data.dl },
          mimetype: 'video/mp4',
          fileName: `${videoData.data.title}.mp4`,
          caption: videoData.data.title
        }, { quoted: m });
      } catch (error) {
        console.error('Ytmp4doc command failed:', error);
        reply(`Error: ${error.message}`);
      }
    },
    react: "📄"
  }
];