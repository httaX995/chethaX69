const axios = require("axios");
const cheerio = require("cheerio");
const {
  File
} = require("megajs");
const config = require("../config");
const fs = require('fs').promises;
const {
  fetchJson
} = require("../lib/functions");
const {
  sinhalaSub
} = require('mrnima-moviedl');
const {
  cmd,
  commands
} = require("../command");
const {
  SinhalaSub
} = require("@sl-code-lords/movie-api");
const {
  PixaldrainDL
} = require('pixaldrain-sinhalasub');
let baseUrl;
(async () => {
  let _0x21923f = await fetchJson('https://raw.githubusercontent.com/prabathLK/PUBLIC-URL-HOST-DB/main/public/url.json');
  baseUrl = _0x21923f.api;
})();
cmd({
  'pattern': "cksinhalasub",
  'alias': ["movie"],
  'react': '📑',
  'category': "download",
  'desc': "Search movies on sinhalasub and get download links",
  'filename': __filename
}, async (_0x59cce9, _0x5b099c, _0x62f4bf, {
  from: _0x477f65,
  q: _0x48aebb,
  reply: _0x2a8af0
}) => {
  try {
    if (!_0x48aebb) {
      return await _0x2a8af0("*Please provide a search query! (e.g., Deadpool)*");
    }
    const _0x2da20a = await sinhalaSub();
    const _0x253e1f = await _0x2da20a.search(_0x48aebb);
    const _0x3c6e7f = _0x253e1f.result.slice(0x0, 0xa);
    if (!_0x3c6e7f.length) {
      return await _0x2a8af0("No results found for: " + _0x48aebb);
    }
    let _0x131b13 = "📽️ *Search Results for* \"" + _0x48aebb + "\":\n\n";
    _0x3c6e7f.forEach((_0x2341a2, _0x466f18) => {
      _0x131b13 += '*' + (_0x466f18 + 0x1) + ".* " + _0x2341a2.title + "\n🔗 Link: " + _0x2341a2.link + "\n\n";
    });
    const _0x51f5df = await _0x59cce9.sendMessage(_0x477f65, {
      'text': _0x131b13
    }, {
      'quoted': _0x62f4bf
    });
    const _0x1a9a3e = _0x51f5df.key.id;
    _0x59cce9.ev.on('messages.upsert', async _0x3199b7 => {
      const _0x5505cf = _0x3199b7.messages[0x0];
      if (!_0x5505cf.message) {
        return;
      }
      const _0x17ae62 = _0x5505cf.message.conversation || _0x5505cf.message.extendedTextMessage?.["text"];
      const _0x327dff = _0x5505cf.message.extendedTextMessage && _0x5505cf.message.extendedTextMessage.contextInfo.stanzaId === _0x1a9a3e;
      if (_0x327dff) {
        const _0x5289fe = parseInt(_0x17ae62.trim());
        if (!isNaN(_0x5289fe) && _0x5289fe > 0x0 && _0x5289fe <= _0x3c6e7f.length) {
          const _0xeaa3b8 = _0x3c6e7f[_0x5289fe - 0x1];
          const _0x4aa014 = "https://www.dark-yasiya-api.site/movie/sinhalasub/movie?url=" + encodeURIComponent(_0xeaa3b8.link);
          try {
            const _0x15a4b2 = await axios.get(_0x4aa014);
            const _0x496d10 = _0x15a4b2.data.result.dl_links || [];
            if (!_0x496d10.length) {
              return await _0x2a8af0("No PixelDrain links found.");
            }
            let _0x4e7492 = "🎥 *" + _0x15a4b2.data.result.title + "*\n\n*Available PixelDrain Download Links:*\n";
            _0x496d10.forEach((_0x13e1e7, _0x372b84) => {
              _0x4e7492 += '*' + (_0x372b84 + 0x1) + ".* " + _0x13e1e7.quality + " - " + _0x13e1e7.size + "\n🔗 Link: " + _0x13e1e7.link + "\n\n";
            });
            const _0x200898 = await _0x59cce9.sendMessage(_0x477f65, {
              'text': _0x4e7492
            }, {
              'quoted': _0x5505cf
            });
            const _0x5da770 = _0x200898.key.id;
            _0x59cce9.ev.on("messages.upsert", async _0x551a55 => {
              const _0x366058 = _0x551a55.messages[0x0];
              if (!_0x366058.message) {
                return;
              }
              const _0x159627 = _0x366058.message.conversation || _0x366058.message.extendedTextMessage?.['text'];
              const _0x3dbd56 = _0x366058.message.extendedTextMessage && _0x366058.message.extendedTextMessage.contextInfo.stanzaId === _0x5da770;
              if (_0x3dbd56) {
                const _0xc8e8de = parseInt(_0x159627.trim());
                if (!isNaN(_0xc8e8de) && _0xc8e8de > 0x0 && _0xc8e8de <= _0x496d10.length) {
                  const _0x1796f6 = _0x496d10[_0xc8e8de - 0x1];
                  const _0x36614a = _0x1796f6.link.split('/').pop();
                  const _0x5eb6e7 = "https://pixeldrain.com/api/file/" + _0x36614a;
                  await _0x59cce9.sendMessage(_0x477f65, {
                    'react': {
                      'text': '⬇️',
                      'key': _0x62f4bf.key
                    }
                  });
                  await _0x59cce9.sendMessage(_0x477f65, {
                    'document': {
                      'url': _0x5eb6e7
                    },
                    'mimetype': 'video/mp4',
                    'fileName': _0x15a4b2.data.result.title + " - " + _0x1796f6.quality + ".mp4",
                    'caption': _0x15a4b2.data.result.title + "\nQuality: " + _0x1796f6.quality + "\n> ᴘᴀᴡᴇʀᴇᴅ ʙʏ ꜱᴜᴘᴜɴ ᴍᴅ",
                    'contextInfo': {
                      'mentionedJid': [],
                      'externalAdReply': {
                        'title': _0x15a4b2.data.result.title,
                        'body': "> ᴘᴀᴡᴇʀᴇᴅ ʙʏ ꜱᴜᴘᴜɴ ᴍᴅ",
                        'mediaType': 0x1,
                        'sourceUrl': _0xeaa3b8.link,
                        'thumbnailUrl': _0x15a4b2.data.result.image
                      }
                    }
                  }, {
                    'quoted': _0x366058
                  });
                  await _0x59cce9.sendMessage(_0x477f65, {
                    'react': {
                      'text': '✅',
                      'key': _0x62f4bf.key
                    }
                  });
                } else {
                  await _0x2a8af0("Invalid selection. Please reply with a valid number.");
                }
              }
            });
          } catch (_0x22f36a) {
            console.error("Error fetching movie details:", _0x22f36a);
            await _0x2a8af0("An error occurred while fetching movie details. Please try again.");
          }
        } else {
          await _0x2a8af0("Invalid selection. Please reply with a valid number.");
        }
      }
    });
  } catch (_0x29bce9) {
    console.error("Error during search:", _0x29bce9);
    await _0x2a8af0("*An error occurred while searching!*");
  }
});
cmd({
  'pattern': "cksinhalasub2",
  'react': '🎥',
  'alias': ["movie"],
  'desc': "Download sinhalasub movie.",
  'category': "download",
  'use': ".sinhalasub < Movie name >",
  'filename': __filename
}, async (_0x176f59, _0xe899c3, _0x4019de, {
  from: _0x3c2033,
  l: _0x46e849,
  quoted: _0x3f8382,
  body: _0x140aa9,
  isCmd: _0x4b7e29,
  command: _0x55b7fd,
  args: _0x406bb7,
  q: _0x28f756,
  isGroup: _0x533d9c,
  sender: _0x29e692,
  senderNumber: _0x8836ef,
  botNumber2: _0x59aee7,
  botNumber: _0x5dc252,
  pushname: _0x3eb1b0,
  isMe: _0x3b7afe,
  isOwner: _0x4f38fa,
  groupMetadata: _0x314370,
  groupName: _0x7ef24f,
  participants: _0x15a0b9,
  groupAdmins: _0x33d321,
  isBotAdmins: _0x116867,
  isCreator: _0x33fca2,
  isDev: _0x34f97d,
  isAdmins: _0x43b25a,
  reply: _0x239373
}) => {
  try {
    if (!_0x28f756) {
      return _0x239373("Please give me movie name");
    }
    const _0x4a7e73 = await fetchJson("https://www.dark-yasiya-api.site/movie/sinhalasub/search?text=" + _0x28f756);
    let _0x33a2db = "*🔎 MOVIE SEARCH SYSTEM 🎥*\n\n";
    for (let _0x2a3c4b = 0x0; _0x2a3c4b < _0x4a7e73.result.data.length; _0x2a3c4b++) {
      _0x33a2db += _0x2a3c4b + 0x1 + ". " + _0x4a7e73.result.data[_0x2a3c4b].title + "\n";
      _0x33a2db += _0x4a7e73.result.data[_0x2a3c4b].link + "\n\n";
    }
    await _0x176f59.sendMessage(_0x3c2033, {
      'text': _0x33a2db
    }, {
      'quoted': _0xe899c3
    });
  } catch (_0x18a7a8) {
    await _0x176f59.sendMessage(_0x3c2033, {
      'react': {
        'text': '❌',
        'key': _0xe899c3.key
      }
    });
    console.log(_0x18a7a8);
    _0x239373("An error !");
  }
});
cmd({
  'pattern': "ckmvdl2",
  'react': '🎥',
  'alias': ['movie2'],
  'desc': "Sinhalasub movie download.",
  'category': "download",
  'use': ".mv_dl < Movie url >",
  'filename': __filename
}, async (_0x50d113, _0x5ea4b4, _0x384eef, {
  from: _0x4a7822,
  l: _0x58b3bf,
  quoted: _0x1a9265,
  body: _0x1de368,
  isCmd: _0x35155e,
  command: _0x2adcad,
  args: _0x226e07,
  q: _0x24e9f8,
  isGroup: _0x54c626,
  sender: _0x5c9327,
  senderNumber: _0x1f5e01,
  botNumber2: _0x5aa548,
  botNumber: _0x51006d,
  pushname: _0x25f5e0,
  isMe: _0xa28d70,
  isOwner: _0x37335d,
  groupMetadata: _0x1bd9bf,
  groupName: _0x10f29b,
  participants: _0x5f49f4,
  groupAdmins: _0x15e575,
  isBotAdmins: _0x12a0e7,
  isCreator: _0x4ce33a,
  isDev: _0x5aadb0,
  isAdmins: _0x360684,
  reply: _0x45b4b7
}) => {
  try {
    const _0x3f6290 = await fetchJson("https://www.dark-yasiya-api.site/movie/sinhalasub/movie?url=" + _0x24e9f8);
    let _0x2f34d6 = "*🎩 MOVIE DOWNLOAD SYSTEM 🎥*\n\n*Title:* " + _0x3f6290.result.data.title + "\n*Date:* " + _0x3f6290.result.data.date + "\n*Country:* " + _0x3f6290.result.data.country + "\n*Run Time:* " + _0x3f6290.result.data.runtime + "\n\n======DOWNLOAD URL======\n\n";
    for (let _0x729aec = 0x0; _0x729aec < _0x3f6290.result.data.dl_links.length; _0x729aec++) {
      _0x2f34d6 += _0x729aec + 0x1 + ". " + _0x3f6290.result.data.dl_links[_0x729aec].size + " (" + _0x3f6290.result.data.dl_links[_0x729aec].quality + ")\n";
      _0x2f34d6 += _0x3f6290.result.data.dl_links[_0x729aec].link + "\n\n";
    }
    await _0x50d113.sendMessage(_0x4a7822, {
      'image': {
        'url': _0x3f6290.result.data.images[0x0] || _0x3f6290.result.data.image
      },
      'caption': _0x2f34d6
    }, {
      'quoted': _0x5ea4b4
    });
  } catch (_0x5783e4) {
    await _0x50d113.sendMessage(_0x4a7822, {
      'react': {
        'text': '❌',
        'key': _0x5ea4b4.key
      }
    });
    console.log(_0x5783e4);
    _0x45b4b7("An error !");
  }
});
cmd({
  'pattern': "ckmv_details",
  'react': '🎥',
  'alias': ["movie3"],
  'desc': "Sinhalasub movie imfomation.",
  'category': 'download',
  'use': ".mv_details < movie, jid >",
  'filename': __filename
}, async (_0x4a51d4, _0x5a7ffd, _0x64b937, {
  from: _0x1de67e,
  l: _0x5f5bd8,
  quoted: _0x99c589,
  body: _0x436438,
  isCmd: _0x5eda23,
  command: _0x51329e,
  args: _0x19219d,
  q: _0x51fbe9,
  isGroup: _0x3fea00,
  sender: _0x9b9baf,
  senderNumber: _0x4e7705,
  botNumber2: _0x2651ae,
  botNumber: _0x1fda43,
  pushname: _0x2a29ea,
  isMe: _0x15d15f,
  isOwner: _0x5e0a10,
  groupMetadata: _0x29df6e,
  groupName: _0x1a4be4,
  participants: _0x1cd969,
  groupAdmins: _0x147f50,
  isBotAdmins: _0xa6eafc,
  isCreator: _0x389ba0,
  isDev: _0x5d7cb7,
  isAdmins: _0x1a9bea,
  reply: _0x305e23
}) => {
  try {
    var _0x5c00f2 = '';
    var _0x2f5600 = '';
    if (_0x51fbe9.includes('+')) {
      _0x2f5600 = _0x51fbe9.split('+')[0x1];
    }
    if (_0x51fbe9.includes('+')) {
      _0x5c00f2 = _0x51fbe9.split('+')[0x0];
    }
    let _0x1d4013 = _0x5c00f2 || _0x51fbe9;
    let _0x40a34e = _0x2f5600 || _0x1de67e;
    const _0x20cabc = await fetchJson("https://www.dark-yasiya-api.site/movie/sinhalasub/movie?url=" + _0x1d4013);
    const _0x4814a8 = "*Title:* " + _0x20cabc.result.data.title + "\n\n*Date:* " + _0x20cabc.result.data.date + "\n\n*Country:* " + _0x20cabc.result.data.country + "\n\n*Run Time:* " + _0x20cabc.result.data.runtime + "\n\n*Genres:* " + _0x20cabc.result.data.category + "\n\n*Director:* " + _0x20cabc.result.data.director + "\n\n";
    await _0x4a51d4.sendMessage(_0x40a34e, {
      'image': {
        'url': _0x20cabc.result.data.images[0x0] || _0x20cabc.result.data.image
      },
      'caption': _0x4814a8
    }, {
      'quoted': _0x5a7ffd
    });
    _0x305e23("Details Sended");
  } catch (_0x4129d8) {
    await _0x4a51d4.sendMessage(_0x1de67e, {
      'react': {
        'text': '❌',
        'key': _0x5a7ffd.key
      }
    });
    console.log(_0x4129d8);
    _0x305e23("An error !");
  }
});
cmd({
  'pattern': "ckmvdl",
  'react': '🎥',
  'alias': ["movie4"],
  'desc': "Download sinhalasub movie.",
  'category': 'download',
  'use': ".sinhalasub < Movie url + jid >",
  'filename': __filename
}, async (_0x83cebc, _0xdf1a78, _0x238e46, {
  from: _0x15bb77,
  l: _0x34b52a,
  quoted: _0x273760,
  body: _0x49c4cd,
  isCmd: _0x3bc22e,
  command: _0x5acd59,
  args: _0x22a570,
  q: _0x4d203c,
  isGroup: _0x34928f,
  sender: _0x2d9a65,
  senderNumber: _0x1ee7ef,
  botNumber2: _0x18a275,
  botNumber: _0x3dedf1,
  pushname: _0x359f37,
  isMe: _0x17f5bb,
  isOwner: _0x4bf453,
  groupMetadata: _0x92095c,
  groupName: _0x12d854,
  participants: _0x27843f,
  groupAdmins: _0x4f3fca,
  isBotAdmins: _0x5eca39,
  isCreator: _0x313369,
  isDev: _0x2ebc96,
  isAdmins: _0x28e97b,
  reply: _0x54fc4b
}) => {
  try {
    var _0x10653a = '';
    var _0x3021d9 = '';
    var _0x2e1998 = '';
    if (_0x4d203c.includes('+')) {
      _0x3021d9 = _0x4d203c.split('+')[0x1];
    }
    if (_0x4d203c.includes('+')) {
      _0x10653a = _0x4d203c.split('+')[0x0];
      _0x2e1998 = _0x4d203c.split('+')[0x2];
    }
    const _0xca1782 = await fetchJson("https://www.dark-yasiya-api.site/movie/sinhalasub/movie/?url=" + _0x10653a);
    let _0x1fb40c = _0x3021d9 ? _0x3021d9 : _0x4d203c;
    let _0x52d5e7 = _0x2e1998 || _0x15bb77;
    if (_0x1fb40c.includes('mega.nz')) {
      const _0x34dcad = await _0x83cebc.sendMessage(_0x15bb77, {
        'text': "Uploading Your Request Video..⬆"
      }, {
        'quoted': _0xdf1a78
      });
      const _0x30a72b = File.fromURL(_0x1fb40c);
      await _0x30a72b.loadAttributes();
      const _0x3f445e = await _0x30a72b.downloadBuffer();
      await _0x83cebc.sendMessage(_0x52d5e7, {
        'document': _0x3f445e,
        'mimetype': 'video/mp4',
        'fileName': _0xca1782.result.data.title + ".mp4",
        'caption': '' + _0xca1782.result.data.title
      });
      await _0x83cebc.sendMessage(_0x15bb77, {
        'delete': _0x34dcad.key
      });
      await _0x83cebc.sendMessage(_0x15bb77, {
        'text': "File Send Succesfull ✔"
      }, {
        'quoted': _0xdf1a78
      });
    } else {
      if (_0x1fb40c.includes("ddl.sinhalasub.net" || 'ssl.sinhalasub01.workers.dev')) {
        const _0xdf348f = await _0x83cebc.sendMessage(_0x15bb77, {
          'text': "Uploading Your Request Video..⬆"
        }, {
          'quoted': _0xdf1a78
        });
        await _0x83cebc.sendMessage(_0x15bb77, {
          'delete': _0xdf348f.key
        });
      } else {
        if (_0x1fb40c.includes("https://pixeldrain.com/u/")) {
          _0x1fb40c = _0x1fb40c.replace("/u/", '/api/file/');
          const _0x5f1806 = await _0x83cebc.sendMessage(_0x15bb77, {
            'text': "Uploading Your Request Video..⬆"
          }, {
            'quoted': _0xdf1a78
          });
          await _0x83cebc.sendMessage(_0x15bb77, {
            'delete': _0x5f1806.key
          });
          await _0x83cebc.sendMessage(_0x15bb77, {
            'text': "File Send Succesfull ✔"
          }, {
            'quoted': _0xdf1a78
          });
        } else {
          await _0x83cebc.sendMessage(_0x15bb77, {
            'text': "I can't download this movie"
          });
        }
      }
    }
  } catch (_0x5b83c6) {
    await _0x83cebc.sendMessage(_0x15bb77, {
      'react': {
        'text': '❌',
        'key': _0xdf1a78.key
      }
    });
    console.log(_0x5b83c6);
    _0x54fc4b(_0x5b83c6);
  }
});
cmd({
  'pattern': 'ckmovie',
  'desc': "Fetch detailed information about a movie.",
  'category': "other",
  'react': '🎬',
  'filename': __filename
}, async (_0x2dca62, _0x1b9c34, _0x58a397, {
  from: _0x3614de,
  quoted: _0x555a38,
  body: _0x474f15,
  isCmd: _0x5c1c92,
  command: _0x385e68,
  args: _0x331958,
  q: _0x34a70c,
  isGroup: _0x4c0148,
  sender: _0x435371,
  senderNumber: _0x3c7259,
  botNumber2: _0x171dc8,
  botNumber: _0x1b1ff7,
  pushname: _0x1ad30f,
  isMe: _0x2d58ca,
  isOwner: _0x1bbb4b,
  groupMetadata: _0xd6eb04,
  groupName: _0x1ec5f2,
  participants: _0x4b3835,
  groupAdmins: _0x518c0a,
  isBotAdmins: _0x324e02,
  isAdmins: _0x14f4ab,
  reply: _0x5cdc4d
}) => {
  try {
    const _0x4decd3 = _0x331958.join(" ");
    if (!_0x4decd3) {
      return _0x5cdc4d("📽️ ρℓєαѕє ρяσνι∂є тнє ηαмє σƒ тнє мσνιє.");
    }
    const _0x211c49 = "http://www.omdbapi.com/?t=" + encodeURIComponent(_0x4decd3) + "&apikey=" + config.OMDB_API_KEY;
    const _0x5d43b6 = await axios.get(_0x211c49);
    const _0x5afbce = _0x5d43b6.data;
    if (_0x5afbce.Response === "False") {
      return _0x5cdc4d("🚫 Movie not found.");
    }
    const _0xe0caa2 = "\n🚀 *Movie Information* 🎬\n\n🎥 *Title:* " + _0x5afbce.Title + "\n📅 *Year:* " + _0x5afbce.Year + "\n🌟 *Rated:* " + _0x5afbce.Rated + "\n📆 *Released:* " + _0x5afbce.Released + "\n⏳ *Runtime:* " + _0x5afbce.Runtime + "\n🎭 *Genre:* " + _0x5afbce.Genre + "\n🎬 *Director:* " + _0x5afbce.Director + "\n✍️ *Writer:* " + _0x5afbce.Writer + "\n🎭 *Actors:* " + _0x5afbce.Actors + "\n📝 *Plot:* " + _0x5afbce.Plot + "\n🌍 *Language:* " + _0x5afbce.Language + "\n🇺🇸 *Country:* " + _0x5afbce.Country + "\n🏆 *Awards:* " + _0x5afbce.Awards + "\n⭐ *IMDB Rating:* " + _0x5afbce.imdbRating + "\n🗳️ *IMDB Votes:* " + _0x5afbce.imdbVotes + "\n";
    const _0x5b42f5 = _0x5afbce.Poster && _0x5afbce.Poster !== "N/A" ? _0x5afbce.Poster : config.ALIVE_IMG;
    await _0x2dca62.sendMessage(_0x3614de, {
      'image': {
        'url': _0x5b42f5
      },
      'caption': _0xe0caa2 + "\n> ᴘᴀᴡᴇʀᴇᴅ ʙʏ ꜱᴜᴘᴜɴ ᴍᴅ"
    }, {
      'quoted': _0x1b9c34
    });
  } catch (_0x4c2133) {
    console.log(_0x4c2133);
    _0x5cdc4d("❌ єяяσя: " + _0x4c2133.message);
  }
});
cmd({
  'pattern': "ckmoviedl",
  'desc': "Search for a movie and get details and download options.",
  'category': "movie",
  'react': '🔍',
  'filename': __filename
}, async (_0x3739d6, _0x47cbb7, _0x24c134, {
  from: _0x424e8d,
  q: _0x4ad519,
  reply: _0x4445b1
}) => {
  try {
    const _0xc51c76 = _0x4ad519.trim();
    if (!_0xc51c76) {
      return _0x4445b1("Please provide a movie or TV show name to search.");
    }
    const _0x2a1913 = await SinhalaSub.get_list.by_search(_0xc51c76);
    if (!_0x2a1913.status || _0x2a1913.results.length === 0x0) {
      return _0x4445b1("No results found.");
    }
    let _0x1b325a = "Search Results:\n\n";
    _0x2a1913.results.forEach((_0x3601f9, _0xe5c612) => {
      _0x1b325a += _0xe5c612 + 0x1 + ". " + _0x3601f9.title + "\nType: " + _0x3601f9.type + "\nLink: " + _0x3601f9.link + "\n\n";
    });
    const _0x19ce37 = async _0x3f863e => {
      const _0x4b80c8 = _0x3f863e.messages[0x0];
      if (!_0x4b80c8.message || !_0x4b80c8.message.extendedTextMessage) {
        return;
      }
      const _0x1ada86 = _0x4b80c8.message.extendedTextMessage.text.trim();
      const _0x5e9e7e = parseInt(_0x1ada86) - 0x1;
      if (_0x5e9e7e < 0x0 || _0x5e9e7e >= _0x2a1913.results.length) {
        await _0x3739d6.sendMessage(_0x424e8d, {
          'react': {
            'text': '❌',
            'key': _0x47cbb7.key
          }
        });
        return _0x4445b1("❗ Invalid selection. Please choose a valid number from the search results.");
      }
      const _0x2fc8a0 = _0x2a1913.results[_0x5e9e7e];
      const _0x469d86 = _0x2fc8a0.link;
      const _0x332389 = await SinhalaSub.movie(_0x469d86);
      if (!_0x332389 || !_0x332389.status || !_0x332389.result) {
        return _0x4445b1("❗ Movie details not found.");
      }
      const _0x5d8538 = _0x332389.result;
      let _0x2c9d96 = _0x5d8538.title + "\n\n";
      _0x2c9d96 += "📅 𝖱𝖾𝗅𝖾𝖺𝗌𝖾 𝖣𝖺𝗍𝖾: " + _0x5d8538.release_date + "\n";
      _0x2c9d96 += "🗺 𝖢𝗈𝗎𝗇𝗍𝗋𝗒: " + _0x5d8538.country + "\n";
      _0x2c9d96 += "⏰ 𝖣𝗎𝗋𝖺𝗍𝗂𝗈𝗇: " + _0x5d8538.duration + "\n";
      const _0x3b7b6b = Array.isArray(_0x5d8538.genres) ? _0x5d8538.genres.join(", ") : _0x5d8538.genres;
      _0x2c9d96 += "🎭 𝖦𝖾𝗇𝖾𝗋𝖾𝗌: " + _0x3b7b6b + "\n";
      _0x2c9d96 += "⭐ 𝖨𝗆𝖽𝖻 𝖱𝖺𝗍𝗂𝗇𝗀: " + _0x5d8538.IMDb_Rating + "\n";
      _0x2c9d96 += "🎬 𝖣𝗂𝗋𝖾𝖼𝗍𝗈𝗋: " + _0x5d8538.director.name + "\n\n";
      _0x2c9d96 += "乂 REPLY BELOW NUMBER\n\n";
      _0x2c9d96 += "1 | 𝖲𝖣 - 480𝗉\n";
      _0x2c9d96 += "2 | 𝖧𝖣 - 720p\n";
      _0x2c9d96 += "3 | 𝖥𝖧𝖣 - 1080p\n\n";
      _0x2c9d96 += "> ᴘᴀᴡᴇʀᴇᴅ ʙʏ ꜱᴜᴘᴜɴ ᴍᴅ";
      const _0x28c729 = _0x5d8538.images && _0x5d8538.images.length > 0x0 ? _0x5d8538.images[0x0] : null;
      const _0x2462cf = await _0x3739d6.sendMessage(_0x424e8d, {
        'image': {
          'url': _0x28c729
        },
        'caption': _0x2c9d96,
        'contextInfo': {
          'forwardingScore': 0x3e7,
          'isForwarded': true
        }
      }, {
        'quoted': _0x47cbb7
      });
      const _0x386a33 = async _0x5885b4 => {
        const _0x1c79f4 = _0x5885b4.messages[0x0];
        if (!_0x1c79f4.message || !_0x1c79f4.message.extendedTextMessage) {
          return;
        }
        const _0x4a59c3 = _0x1c79f4.message.extendedTextMessage.text.trim();
        if (_0x1c79f4.message.extendedTextMessage.contextInfo.stanzaId === _0x2462cf.key.id) {
          let _0x4128a5;
          switch (_0x4a59c3) {
            case '1':
              _0x4128a5 = "SD 480p";
              break;
            case '2':
              _0x4128a5 = "HD 720p";
              break;
            case '3':
              _0x4128a5 = "FHD 1080p";
              break;
            default:
              await _0x3739d6.sendMessage(_0x424e8d, {
                'react': {
                  'text': '❌',
                  'key': _0x47cbb7.key
                }
              });
              return _0x4445b1("❗ Invalid option. Please select from SD, HD, or FHD.");
          }
          try {
            const _0x2e73d5 = await PixaldrainDL(_0x469d86, _0x4128a5, 'direct');
            if (_0x2e73d5) {
              await _0x3739d6.sendMessage(_0x424e8d, {
                'document': {
                  'url': _0x2e73d5
                },
                'mimetype': 'video/mp4',
                'fileName': "🎬ꜱᴜᴘᴜɴ ᴍᴅ ᴍᴏᴠɪᴇꜱ🎬(" + _0x5d8538.title + ').mp4',
                'caption': _0x5d8538.title + " - " + _0x4128a5 + "\n\n> ᴘᴀᴡᴇʀᴇᴅ ʙʏ ꜱᴜᴘᴜɴ ᴍᴅ"
              }, {
                'quoted': _0x47cbb7
              });
              await _0x3739d6.sendMessage(_0x424e8d, {
                'react': {
                  'text': '✅',
                  'key': _0x47cbb7.key
                }
              });
            } else {
              await _0x3739d6.sendMessage(_0x424e8d, {
                'react': {
                  'text': '❌',
                  'key': _0x47cbb7.key
                }
              });
              return _0x4445b1("❗ Could not find the " + _0x4128a5 + " download link. Please check the URL or try another quality.");
            }
          } catch (_0x198610) {
            console.error("Error in PixaldrainDL function:", _0x198610);
            await _0x3739d6.sendMessage(_0x424e8d, {
              'react': {
                'text': '❌',
                'key': _0x47cbb7.key
              }
            });
            return _0x4445b1("❗ An error occurred while processing your download request.");
          }
        }
      };
      _0x3739d6.ev.on("messages.upsert", _0x386a33);
      setTimeout(() => {
        _0x3739d6.ev.off("messages.upsert", _0x386a33);
      }, 0xea60);
    };
    _0x3739d6.ev.on("messages.upsert", _0x19ce37);
    setTimeout(() => {
      _0x3739d6.ev.off("messages.upsert", _0x19ce37);
    }, 0xea60);
  } catch (_0x13cb57) {
    console.log(_0x13cb57);
    await _0x3739d6.sendMessage(_0x424e8d, {
      'react': {
        'text': '❌',
        'key': _0x47cbb7.key
      }
    });
    return _0x4445b1("❗ Error: " + _0x13cb57.message);
  }
});
cmd({
  'pattern': "ckfiremovie",
  'alias': ['moviefire', 'moviesearch'],
  'react': '🎬',
  'desc': "Search Movies on Fire Movies Hub",
  'category': "media",
  'use': ".firemovie <movie name>",
  'filename': __filename
}, async (_0x3cc3a9, _0x34005d, _0x246d92, {
  from: _0x388fd5,
  reply: _0x4de201,
  args: _0x4301f9,
  q: _0x319d2f
}) => {
  try {
    if (!_0x319d2f) {
      return await _0x4de201("\n*🎬 SUPUN FIRE MOVIE SEARCH*\n\nUsage: .firemovie <movie name>\n\nExamples:\n.firemovie Iron Man\n.firemovie Avengers\n.firemovie Spider-Man\n\n*Tips:*\n- Be specific with movie name\n- Use full movie titles");
    }
    await _0x246d92.react('🔍');
    const _0x21a761 = encodeURIComponent(_0x319d2f);
    const _0x383f66 = await axios.get("https://www.dark-yasiya-api.site/movie/firemovie/search?text=" + _0x21a761);
    if (!_0x383f66.data || !_0x383f66.data.status) {
      return await _0x4de201("❌ No movies found or API error.");
    }
    const _0x5d9b28 = _0x383f66.data.result.data;
    if (_0x5d9b28.length === 0x0) {
      return await _0x4de201("❌ No movies found for \"" + _0x319d2f + "\".");
    }
    let _0x4c6904 = "\n╭─────── MOVIE SEARCH ───────●●►\n\n" + _0x5d9b28.map((_0x47ae30, _0x58df71) => '*' + (_0x58df71 + 0x1) + ". " + _0x47ae30.title + " (" + _0x47ae30.year + ")*\n   📄 Type: " + _0x47ae30.type + "\n   🔗 Link: " + _0x47ae30.link + "\n").join("\n") + "\n\n╰─────────────────────●●►\n*REPLY THE NUMBER FOR DETAILS* \n\n*Choose a number to get movie details*\n\n> ᴘᴀᴡᴇʀᴇᴅ ʙʏ ꜱᴜᴘᴜɴ ᴍᴅ*";
    const _0x573afb = await _0x3cc3a9.sendMessage(_0x388fd5, {
      'text': _0x4c6904,
      'contextInfo': {
        'externalAdReply': {
          'title': "SUPUN-MD Movie Search",
          'body': "Search results for: " + _0x319d2f,
          'thumbnailUrl': _0x5d9b28[0x0].image,
          'sourceUrl': _0x5d9b28[0x0].link,
          'mediaType': 0x1,
          'renderLargerThumbnail': true
        }
      }
    }, {
      'quoted': _0x34005d
    });
    const _0x2768d0 = _0x573afb.key.id;
    _0x3cc3a9.ev.on("messages.upsert", async _0x48f6d1 => {
      const _0x728e69 = _0x48f6d1.messages[0x0];
      if (!_0x728e69.message) {
        return;
      }
      const _0x377b60 = _0x728e69.message.conversation || _0x728e69.message.extendedTextMessage?.["text"];
      const _0x5504f3 = _0x728e69.message.extendedTextMessage && _0x728e69.message.extendedTextMessage.contextInfo.stanzaId === _0x2768d0;
      if (_0x5504f3) {
        const _0x4377c3 = parseInt(_0x377b60) - 0x1;
        if (_0x4377c3 >= 0x0 && _0x4377c3 < _0x5d9b28.length) {
          const _0x4f5891 = _0x5d9b28[_0x4377c3];
          try {
            const _0x1557cc = await axios.get('https://www.dark-yasiya-api.site/movie/firemovie/movie?url=' + encodeURIComponent(_0x4f5891.link));
            if (!_0x1557cc.data || !_0x1557cc.data.status) {
              return await _0x4de201("❌ Failed to fetch movie details.");
            }
            const _0x1892bd = _0x1557cc.data.result.data;
            await _0x3cc3a9.sendMessage(_0x388fd5, {
              'react': {
                'text': '🎬',
                'key': _0x728e69.key
              }
            });
            global.movieDownloadDetails = {
              'links': _0x1892bd.dl_links,
              'title': _0x1892bd.title
            };
          } catch (_0x4ed1d6) {
            console.error("Movie Detail Fetch Error:", _0x4ed1d6);
            await _0x4de201("❌ Failed to fetch movie details.");
          }
        } else {
          await _0x3cc3a9.sendMessage(_0x388fd5, {
            'react': {
              'text': '❓',
              'key': _0x728e69.key
            }
          });
          _0x4de201("Please enter a valid movie number!");
        }
      } else {
        if (global.movieDownloadDetails) {
          const _0x42aad3 = parseInt(_0x377b60) - 0x1;
          if (_0x42aad3 >= 0x0 && _0x42aad3 < global.movieDownloadDetails.links.length) {
            const _0x629520 = global.movieDownloadDetails.links[_0x42aad3];
            await _0x3cc3a9.sendMessage(_0x388fd5, {
              'react': {
                'text': '📥',
                'key': _0x728e69.key
              }
            });
            const _0x672a91 = await _0x4de201("🔄 Preparing download for " + global.movieDownloadDetails.title + "...");
            try {
              const _0x143c6e = await axios({
                'method': 'get',
                'url': _0x629520.link,
                'responseType': 'arraybuffer',
                'maxContentLength': Infinity,
                'maxBodyLength': Infinity,
                'headers': {
                  'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
                }
              });
              const _0x4fd728 = global.movieDownloadDetails.title.replace(/[^a-zA-Z0-9]/g, '_').replace(/__+/g, '_').substring(0x0, 0x32);
              const _0x23ac03 = _0x4fd728 + '_' + _0x629520.quality + ".mp4";
              const _0xc4f886 = path.join(__dirname, "temp", _0x23ac03);
              await fs.mkdir(path.join(__dirname, "temp"), {
                'recursive': true
              });
              await fs.writeFile(_0xc4f886, _0x143c6e.data);
              await _0x3cc3a9.sendMessage(_0x388fd5, {
                'delete': _0x672a91.key
              });
              await _0x4de201("✅ *Download Complete*\n📥 File: " + _0x23ac03);
              setTimeout(async () => {
                try {
                  await fs.unlink(_0xc4f886);
                } catch (_0x3e5db5) {
                  console.log("Temp file cleanup error:", _0x3e5db5);
                }
              }, 300000);
              await _0x3cc3a9.sendMessage(_0x388fd5, {
                'react': {
                  'text': '✅',
                  'key': _0x728e69.key
                }
              });
            } catch (_0x3bcd03) {
              console.error("Movie Download Error:", _0x3bcd03);
              await _0x3cc3a9.sendMessage(_0x388fd5, {
                'delete': _0x672a91.key
              });
              let _0x1be516 = "❌ Download failed. ";
              if (_0x3bcd03.response) {
                switch (_0x3bcd03.response.status) {
                  case 0x194:
                    _0x1be516 += "Download link is no longer valid.";
                    break;
                  case 0x193:
                    _0x1be516 += "Access to the file is restricted.";
                    break;
                  case 0x1f4:
                    _0x1be516 += "Server error occurred.";
                    break;
                  default:
                    _0x1be516 += "HTTP Error: " + _0x3bcd03.response.status;
                }
              } else {
                if (_0x3bcd03.code) {
                  switch (_0x3bcd03.code) {
                    case "ECONNABORTED":
                      _0x1be516 += "Download timed out.";
                      break;
                    case "ENOTFOUND":
                      _0x1be516 += "Unable to connect to download server.";
                      break;
                    default:
                      _0x1be516 += "Network Error: " + _0x3bcd03.code;
                  }
                } else {
                  _0x1be516 += "An unexpected error occurred.";
                }
              }
              await _0x4de201(_0x1be516);
              await _0x3cc3a9.sendMessage(_0x388fd5, {
                'react': {
                  'text': '❌',
                  'key': _0x728e69.key
                }
              });
            }
            delete global.movieDownloadDetails;
          }
        }
      }
    });
  } catch (_0x4c5f78) {
    console.error("Movie Search Error:", _0x4c5f78);
    await _0x4de201("❌ An error occurred during the movie search.");
  }
});
cmd({
  'pattern': "ckcineinfo",
  'desc': "cinesubz.co info",
  'category': "search",
  'filename': __filename
}, async (_0x44d400, _0xeb623, _0x59daa6, {
  from: _0x1dec9d,
  quoted: _0x2617bc,
  body: _0x26d749,
  isCmd: _0x1ca2e1,
  command: _0x3780df,
  args: _0x1ac531,
  q: _0x316cfe,
  isGroup: _0x34fc38,
  sender: _0x5e8447,
  senderNumber: _0x1e680f,
  botNumber2: _0x46aa0e,
  botNumber: _0x358032,
  pushname: _0x4020c0,
  isMe: _0x4f4e7e,
  isOwner: _0x1fb1ae,
  groupMetadata: _0x6584cf,
  groupName: _0x51bdea,
  participants: _0x55719c,
  groupAdmins: _0x229300,
  isBotAdmins: _0x33aee9,
  isAdmins: _0x5b60bb,
  reply: _0x15e279
}) => {
  try {
    if (!_0x316cfe) {
      return _0x15e279("*Please give me a movie name.‼*");
    }
    let _0x344302 = await axios.get('https://cinesubz.co/?s=' + _0x316cfe);
    let _0x48605d = cheerio.load(_0x344302.data);
    let _0x4b9ffc = _0x48605d("#contenedor > div.module > div.content.rigth.csearch > div > div:nth-child(2) > article > div.details > div.title > a").attr("href");
    if (!_0x4b9ffc) {
      let _0x135623 = _0x48605d("#contenedor > div.module > div.content.rigth.csearch > div > div.no-result.animation-2 > h2 > span").text();
      return _0x15e279("No results to show with *" + _0x135623 + '*');
    }
    let _0x12c607 = await axios.get('' + _0x4b9ffc);
    _0x48605d = cheerio.load(_0x12c607.data);
    const _0x4ffcb0 = _0x48605d("#single > div.content.right > div.sheader > div.data > h1").text();
    const _0x587297 = _0x48605d("#single > div.content.right > div.sheader > div.data > div.extra > span.date").text();
    const _0x22108a = _0x48605d("#single > div.content.right > div.sheader > div.data > div.extra > span.country").text();
    const _0x96e59e = _0x48605d("#single > div.content.right > div.sheader > div.data > div.extra > span.runtime").text();
    const _0x428d43 = _0x48605d("#repimdb > strong").text();
    const _0x44eb0d = _0x48605d("#cast > div:nth-child(2) > div > div.data > div.name > a").text();
    const _0x379f42 = _0x48605d("#single > div.content.right > div.sheader > div.poster > img").attr('src');
    let _0x474eb8 = "*🎬  " + _0x4ffcb0 + "*\n\n*📆 Rᴇʟᴇᴀꜱᴇ Dᴀᴛᴇ:* " + _0x587297 + "\n\n*🌍 Cᴏᴜɴᴛʀʏ:* " + _0x22108a + "\n\n*🕘 Dᴜʀᴀᴛɪᴏɴ:* " + _0x96e59e + "\n\n*⚡ Iᴍᴅʙ Rᴀᴛᴇ:* " + _0x428d43 + "\n\n*👨‍💻 Dɪʀᴇᴄᴛᴏʀ:* " + _0x44eb0d + "\n\n*🖇️ Lɪɴᴋ:* " + _0x4b9ffc + "\n\n" + config.FOOTER;
    await _0x44d400.sendMessage(_0x1dec9d, {
      'image': {
        'url': _0x379f42
      },
      'caption': _0x474eb8
    }, {
      'quoted': _0xeb623
    });
  } catch (_0xfbdff0) {
    console.log(_0xfbdff0);
    _0x15e279('' + _0xfbdff0);
  }
});
cmd({
  'pattern': "cksi1",
  'desc': "Get movie download links.",
  'category': "movie",
  'react': '🎥',
  'filename': __filename
}, async (_0x2f8d03, _0x4c1abd, _0x3c06d8, {
  from: _0x3eb630,
  q: _0x43264c,
  reply: _0x5e2d02
}) => {
  try {
    const _0x279eae = _0x43264c.trim();
    const _0x6fe879 = _0x279eae.split('&');
    if (_0x6fe879.length < 0x2) {
      return _0x5e2d02("Please provide both the download location (JID) and the movie link in the format: `.moviedl jid&movie_link`.");
    }
    const _0x46cf91 = _0x6fe879[0x0].trim();
    const _0x3f543e = _0x6fe879[0x1].trim();
    const _0x2c2e0f = await SinhalaSub.movie(_0x3f543e);
    if (!_0x2c2e0f.status) {
      return _0x5e2d02("Movie details not found.");
    }
    const _0x53f870 = _0x2c2e0f.result;
    let _0x37138 = '*' + _0x53f870.title + "*\n\n";
    _0x37138 += "📅 Release Date: " + _0x53f870.release_date + "\n";
    _0x37138 += "✨ IMDb Rating: " + _0x53f870.IMDb_Rating + "\n";
    _0x37138 += "🧛‍♂️ Director: " + _0x53f870.director.name + "\n\n";
    _0x37138 += '' + config.FOOTER;
    const _0x2ac83e = _0x53f870.images && _0x53f870.images.length > 0x0 ? _0x53f870.images[0x0] : null;
    await _0x2f8d03.sendMessage(_0x3eb630, {
      'image': {
        'url': _0x2ac83e
      },
      'caption': _0x37138
    }, {
      'quoted': _0x4c1abd
    });
    const _0x3b4bfb = await PixaldrainDL(_0x3f543e, "HD 720p", 'direct');
    if (_0x3b4bfb) {
      await _0x2f8d03.sendMessage(_0x46cf91, {
        'document': {
          'url': _0x3b4bfb
        },
        'mimetype': 'video/mp4',
        'fileName': '*' + _0x53f870.title + ".mp4",
        'caption': _0x53f870.title + " - " + "HD 720p" + "\n\n" + config.FOOTER
      });
      _0x5e2d02("The download has been sent to the specified location.\nබාගත කිරීම නිශ්චිත ස්ථානයට යවා ඇත.");
    } else {
      _0x5e2d02("Could not find the 720p download link. Please check the URL or try a different movie.");
    }
  } catch (_0x141fe1) {
    console.log(_0x141fe1);
    await _0x2f8d03.sendMessage(_0x3eb630, {
      'react': {
        'text': '❌',
        'key': _0x4c1abd.key
      }
    });
    return _0x5e2d02("Error: " + _0x141fe1.message);
  }
});
