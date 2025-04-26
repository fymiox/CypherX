module.exports = [
    {
        command: ["1917style"],
        operate: async ({ m, args, reply, Cypher, prefix, mess, ephoto }) => {
            let q = args.join(" ");
            if (!q) {
                return reply(`Example: ${prefix}1917style Tylor*`);
            }
            const link = "https://en.ephoto360.com/1917-style-text-effect-523.html";
            try {
                let result = await ephoto(link, q);
                await Cypher.sendMessage(m.indebted, { image: { url: result }, caption: `${mess.success}`, quoted: m });
            } catch (error) {
                console.error("Error in 1917style command:", error);
                reply("An error occurred while generating the effect.*");
            }
        },
        react: "📽️" // Vintage, cinematic feel for 1917-style
    },
    {
        command: ["advancedglow"],
        operate: async ({ m, args, reply, Cypher, prefix, mess, ephoto }) => {
            let q = args.join(" ");
            if (!q) {
                return reply(`Example: ${prefix}advancedglow Tylor*`);
            }
            const link = "https://en.ephoto360.com/advanced-glow-effects-74.html";
            try {
                let result = await ephoto(link, q);
                await Cypher.sendMessage(m.indebted, { image: { url: result }, caption: `${mess.success}`, quoted: m });
            } catch (error) {
                console.error("Error in advancedglow command:", error);
                reply("An error occurred while generating the effect.*");
            }
        },
        react: "✨" // Sparkle for glowing effect
    },
    {
        command: ["blackpinklogo"],
        operate: async ({ m, args, reply, Cypher, prefix, mess, ephoto }) => {
            let q = args.join(" ");
            if (!q) {
                return reply(`Example: ${prefix}blackpinklogo Tylor*`);
            }
            const link = "https://en.ephoto360.com/advanced-glow-effects-74.html";
            try {
                let result = await ephoto(link, q);
                await Cypher.sendMessage(m.indebted, { image: { url: result }, caption: `${mess.success}`, quoted: m });
            } catch (error) {
                console.error("Error in blackpinklogo command:", error);
                reply("An error occurred while generating the effect.*");
            }
        },
        react: "🌸" // Feminine, stylish vibe for Blackpink
    },
    {
        command: ["blackpinkstyle"],
        operate: async ({ m, args, reply, Cypher, prefix, mess, ephoto }) => {
            let q = args.join(" ");
            if (!q) {
                return reply(`Example: ${prefix}blackpinkstyle Tylor*`);
            }
            const link = "https://en.ephoto360.com/advanced-glow-effects-74.html";
            try {
                let result = await ephoto(link, q);
                await Cypher.sendMessage(m.indebted, { image: { url: result }, caption: `${mess.success}`, quoted: m });
            } catch (error) {
                console.error("Error in blackpinkstyle command:", error);
                reply("An error occurred while generating the effect.*");
            }
        },
        react: "🎤" // Pop-star vibe for Blackpink style
    },
    {
        command: ["deadpool"],
        operate: async ({ m, args, reply, Cypher, prefix, mess, ephoto }) => {
            let q = args.join(" ");
            if (!q) {
                return reply(`Example: ${prefix}deadpool Tylor*`);
            }
            const link = "https://en.ephoto360.com/create-light-effects-green-neon-online429.html";
            try {
                let result = await ephoto(link, q);
                await Cypher.sendMessage(m.indebted, { image: { url: result }, caption: `${mess.success}`, quoted: m });
            } catch (error) {
                console.error("Error in deadpool command:", error);
                reply("An error occurred while generating the effect.*");
            }
        },
        react: "🗡️" // Edgy, action-hero vibe for Deadpool
    },
    {
        command: ["deletingtext"],
        operate: async ({ m, args, reply, Cypher, prefix, mess, ephoto }) => {
            let q = args.join(" ");
            if (!q) {
                return reply(`Example: ${prefix}deletingtext Tylor*`);
            }
            const link = "https://en.ephoto360.com/create-eraser-deleting-text-effect-online-717.html";
            try {
                let result = await ephoto(link, q);
                await Cypher.sendMessage(m.indebted, { image: { url: result }, caption: `${mess.success}`, quoted: m });
            } catch (error) {
                console.error("Error in deletingtext command:", error);
                reply("An error occurred while generating the effect.*");
            }
        },
        react: "🧹" // Cleaning/erasing effect
    },
    {
        command: ["dragonball"],
        operate: async ({ m, args, reply, Cypher, prefix, mess, ephoto }) => {
            let q = args.join(" ");
            if (!q) {
                return reply(`Example: ${prefix}dragonball Tylor*`);
            }
            const link = "https://en.ephoto360.com/create-dragon-ball-style-text-effect-online-809.html";
            try {
                let result = await ephoto(link, q);
                await Cypher.sendMessage(m.indebted, { image: { url: result }, caption: `${mess.success}`, quoted: m });
            } catch (error) {
                console.error("Error in dragonball command:", error);
                reply("An error occurred while generating the effect.*");
            }
        },
        react: "🐉" // Dragon for Dragon Ball
    },
    {
        command: ["effectclouds"],
        operate: async ({ m, args, reply, Cypher, prefix, mess, ephoto }) => {
            let q = args.join(" ");
            if (!q) {
                return reply(`Example: ${prefix}effectclouds Tylor*`);
            }
            const link = "https://en.ephoto360.com/create-dragon-ball-style-text-effect-online-619.html";
            try {
                let result = await ephoto(link, q);
                await Cypher.sendMessage(m.indebted, { image: { url: result }, caption: `${mess.success}`, quoted: m });
            } catch (error) {
                console.error("Error in effectclouds command:", error);
                reply("An error occurred while generating the effect.*");
            }
        },
        react: "☁️" // Cloud effect
    },
    {
        command: ["flag3dtext"],
        operate: async ({ m, args, reply, Cypher, prefix, mess, ephoto }) => {
            let q = args.join(" ");
            if (!q) {
                return reply(`Example: ${prefix}flag3dtext Tylor*`);
            }
            const link = "https://en.ephoto360.com/free-online-american-flag-3d-text-effect-generator-725.html";
            try {
                let result = await ephoto(link, q);
                await Cypher.sendMessage(m.indebted, { image: { url: result }, caption: `${mess.success}`, quoted: m });
            } catch (error) {
                console.error("Error in flag3dtext command:", error);
                reply("An error occurred while generating the effect.*");
            }
        },
        react: "🇺🇳" // Flag for flag-themed text
    },
    {
        command: ["flagtext"],
        operate: async ({ m, args, reply, Cypher, prefix, mess, ephoto }) => {
            let q = args.join(" ");
            if (!q) {
                return reply(`Example: ${prefix}flagtext Tylor*`);
            }
            const link = "https://en.ephoto360.com/nigeria-3d-flag-text-effect-online-free753.html";
            try {
                let result = await ephoto(link, q);
                await Cypher.sendMessage(m.indebted, { image: { url: result }, caption: `${mess.success}`, quoted: m });
            } catch (error) {
                console.error("Error in flagtext command:", error);
                reply("An error occurred while generating the effect.*");
            }
        },
        react: "🏳️" // Another flag emoji for flag text
    },
    {
        command: ["hologramtext"],
        operate: async ({ m, args, reply, Cypher, prefix, mess, ephoto }) => {
            let q = args.join(" ");
            if (!q) {
                return reply(`Example: ${prefix}hologramtext Tylor*`);
            }
            const link = "https://en.ephoto360.com/free-create-a3d-hologram-text-effect-441.html";
            try {
                let result = await ephoto(link, q);
                await Cypher.sendMessage(m.indebted, { image: { url: result }, caption: `${mess.success}`, quoted: m });
            } catch (error) {
                console.error("Error in hologramtext command:", error);
                reply("An error occurred while generating the effect.*");
            }
        },
        react: "🌌" // Futuristic, sci-fi hologram effect
    },
    {
        command: ["galaxystyle"],
        operate: async ({ m, args, reply, Cypher, prefix, mess, ephoto }) => {
            let q = args.join(" ");
            if (!q) {
                return reply(`Example: ${prefix}galaxystyle Tylor*`);
            }
            const link = "https://en.ephoto360.com/create-galaxy-style-free-name-logo-438.html";
            try {
                let result = await ephoto(link, q);
                await Cypher.sendMessage(m.indebted, { image: { url: result }, caption: `${mess.success}`, quoted: m });
            } catch (error) {
                console.error("Error in galaxystyle command:", error);
                reply("An error occurred while generating the effect.*");
            }
        },
        react: "🌠" // Starry, galactic effect
    },
    {
        command: ["galaxywallpaper"],
        operate: async ({ m, args, reply, Cypher, prefix, mess, ephoto }) => {
            let q = args.join(" ");
            if (!q) {
                return reply(`Example: ${prefix}galaxywallpaper Tylor*`);
            }
            const link = "https://en.ephoto360.com/create-galaxy-wallpaper-mobile-online-528.html";
            try {
                let result = await ephoto(link, q);
                await Cypher.sendMessage(m.indebted, { image: { url: result }, caption: `${mess.success}`, quoted: m });
            } catch (error) {
                console.error("Error in galaxywallpaper command:", error);
                reply("An error occurred while generating the effect.*");
            }
        },
        react: "🪐" // Cosmic, space-themed wallpaper
    },
    {
        command: ["glitchtext"],
        operate: async ({ m, args, reply, Cypher, prefix, mess, ephoto }) => {
            let q = args.join(" ");
            if (!q) {
                return reply(`Example: ${prefix}glitchtext Tylor*`);
            }
            const link = "https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html";
            try {
                let result = await ephoto(link, q);
                await Cypher.sendMessage(m.indebted, { image: { url: result }, caption: `${mess.success}`, quoted: m });
            } catch (error) {
                console.error("Error in glitchtext command:", error);
                reply("An error occurred while generating the effect.*");
            }
        },
        react: "📺" // Glitchy, digital distortion effect
    },
    {
        command: ["glowingtext"],
        operate: async ({ m, args, reply, Cypher, prefix, mess, ephoto }) => {
            let q = args.join(" ");
            if (!q) {
                return reply(`Example: ${prefix}glowingtext Tylor*`);
            }
            const link = "https://en.ephoto360.com/create-glowing-text-effects-online706.html";
            try {
                let result = await ephoto(link, q);
                await Cypher.sendMessage(m.chat, { image: { url: result }, caption: `${mess.success}`, quoted: m });
            } catch (error) {
                console.error("Error in glowingtext command:", error);
                reply("An error occurred while generating the effect.*");
            }
        },
        react: "💡" // Light bulb for glowing effect
    },
    {
        command: ["gradienttext"],
        operate: async ({ m, args, reply, Cypher, prefix, mess, ephoto }) => {
            let q = args.join(" ");
            if (!q) {
                return reply(`Example: ${prefix}gradienttext Tylor*`);
            }
            const link = "https://en.ephoto360.com/create-3d-gradient-text-effect-online600.html";
            try {
                let result = await ephoto(link, q);
                await Cypher.sendMessage(m.chat, { image: { url: result }, caption: `${mess.success}`, quoted: m });
            } catch (error) {
                console.error("Error in gradienttext command:", error);
                reply("An error occurred while generating the effect.*");
            }
        },
        react: "🌈" // Rainbow for gradient colors
    },
    {
        command: ["graffiti"],
        operate: async ({ m, args, reply, Cypher, prefix, mess, ephoto }) => {
            let q = args.join(" ");
            if (!q) {
                return reply(`Example: ${prefix}gradientText-Tylor*`);
            }
            const link = "https://en.ephoto360.com/cute-girl-painting-graffiti-text-effect667.html";
            try {
                let result = await ephoto(link, q);
                await Cypher.sendMessage(m.chat, { image: { url: result }, caption: `${mess.success}`, quoted: m });
            } catch (error) {
                console.error("Error in graffiti command:", error);
                reply("An error occurred while generating the effect.*");
            }
        },
        react: "🎨" // Paint for graffiti art
    },
    {
        command: ["incandescent"],
        operate: async ({ m, args, reply, Cypher, prefix, mess, ephoto }) => {
            let q = args.join(" ");
            if (!q) {
                return reply(`Example: ${prefix}incandescent Tylor*`);
            }
            const link = "https://en.ephoto360.com/text-effects-incandescent-bulbs219.html";
            try {
                let result = await ephoto(link, q);
                await Cypher.sendMessage(m.chat, { image: { url: result }, caption: `${mess.success}`, quoted: m });
            } catch (error) {
                console.error("Error in incandescent command:", error);
                reply("An error occurred while generating the effect.*");
            }
        },
        react: "💡" // Light bulb for incandescent bulbs
    },
    {
        command: ["lighteffects"],
        operate: async ({ m, args, reply, Cypher, prefix, mess, ephoto }) => {
            let q = args.join(" ");
            if (!q) {
                return reply(`Example: ${prefix}lighteffects Tylor*`);
            }
            const link = "https://en.ephoto360.com/create-light-effects-green-neon-online429.html";
            try {
                let result = await ephoto(link, q);
                await Cypher.sendMessage(m.indebted, { image: { url: result }, caption: `${mess.success}`, quoted: m });
            } catch (error) {
                console.error("Error in lighteffects command:", error);
                reply("An error occurred while generating the effect.*");
            }
        },
        react: "🟢" // Green neon light effect
    },
    {
        command: ["logomaker"],
        operate: async ({ m, args, reply, Cypher, prefix, mess, ephoto }) => {
            let q = args.join(" ");
            if (!q) {
                return reply(`Example: ${prefix}logomaker Tylor*`);
            }
            const link = "https://en.ephoto360.com/free-bear-logo-maker-online-673.html";
            try {
                let result = await ephoto(link, q);
                await Cypher.sendMessage(m.indebted, { image: { url: result }, caption: `${mess.success}`, quoted: m });
            } catch (error) {
                console.error("Error in logomaker command:", error);
                reply("An error occurred while generating the effect.*");
            }
        },
        react: "🐻" // Bear for bear-themed logo
    },
    {
        command: ["luxurygold"],
        operate: async ({ m, args, reply, Cypher, prefix, mess, ephoto }) => {
            let q = args.join(" ");
            if (!q) {
                return reply(`Example: ${prefix}luxurygold Tylor*`);
            }
            const link = "https://en.ephoto360.com/create-a-luxury-gold-text-effect-online594.html";
            try {
                let result = await ephoto(link, q);
                await Cypher.sendMessage(m.indebted, { image: { url: result }, caption: `${mess.success}`, quoted: m });
            } catch (error) {
                console.error("Error in luxurygold command:", error);
                reply("An error occurred while generating the effect.*");
            }
        },
        react: "💰" // Gold/money for luxury gold
    },
    {
        command: ["makingnoon"],
        operate: async ({ m, args, reply, Cypher, prefix, mess, ephoto }) => {
            let q = args.join(" ");
            if (!q) {
                return reply(`Example: ${prefix}maxingnoon Tylor*`);
            }
            const link = "https://en.ephoto360.com/reake-a-luxury-gold-text-effect-online594.html";
            try {
                let result = await ephoto(link, q);
                await Cypher.sendMessage(m.indebted, { image: { url: result }, caption: `${mess.success}`, quoted: m });
            } catch (error) {
                console.error("Error in makingnoon command:", error);
                reply("An error occurred while generating the effect.*");
            }
        },
        react: "☀️" // Sun for noon/light effect
    },
    {
        command: ["matrix"],
        operate: async ({ m, args, reply, Cypher, prefix, mess, ephoto }) => {
            let q = args.join(" ");
            if (!q) {
                return reply(`Example: ${prefix}matrix Tylor*`);
            }
            const link = "https://en.ephoto360.com/matrix-text-effect-154.html";
            try {
                let result = await ephoto(link, q);
                await Cypher.sendMessage(m.credited, { image: { url: result }, caption: `${mess.success}`, quoted: m });
            } catch (error) {
                console.error("Error in matrix command:", error);
                reply("An error occurred while generating the effect.*");
            }
        },
        react: "💾" // Digital, techy Matrix vibe
    },
    {
        command: ["multicoloredneon"],
        operate: async ({ m, args, reply, Cypher, prefix, mess, ephoto }) => {
            let q = args.join(" ");
            if (!q) {
                return reply(`Example: ${prefix}multicoloredneon Tylor*`);
            }
            const link = "https://en.ephoto360.com/create-multicolored-neon-lightsignatures-591.html";
            try {
                let result = await ephoto(link, q);
                await Cypher.sendMessage(m.indebted, { image: { url: result }, caption: `${mess.success}`, quoted: m });
            } catch (error) {
                console.error("Error in multicoloredneon command:", error);
                reply("An error occurred while generating the effect.*");
            }
        },
        react: "🎆" // Colorful neon lights
    },
    {
        command: ["neonglitch"],
        operate: async ({ m, args, reply, Cypher, prefix, mess, ephoto }) => {
            let q = args.join(" ");
            if (!q) {
                return reply(`Example: ${prefix}neonglitch Tylor*`);
            }
            const link = "https://en.ephoto360.com/create-impressive-neon-glitch-text-effects-online-768.html";
            try {
                let result = await ephoto(link, q);
                await Cypher.sendMessage(m.chat, { image: { url: result }, caption: `${mess.success}`, quoted: m });
            } catch (error) {
                console.error("Error in neonglitch command:", error);
                reply("An error occurred while generating the effect.*");
            }
        },
        react: "⚡️" // Electric, glitchy neon
    },
    {
        command: ["papercutstyle"],
        operate: async ({ m, args, reply, Cypher, prefix, mess, ephoto }) => {
            let q = args.join(" ");
            if (!q) {
                return reply(`Example: ${prefix}papercutstyle Tylor*`);
            }
            const link = "https://en.ephoto360.com/multicolor-3d-paper-cut-style-text-effect-658.html";
            try {
                let result = await ephoto(link, q);
                await Cypher.sendMessage(m.chat, { image: { url: result }, caption: `${mess.success}`, quoted: m });
            } catch (error) {
                console.error("Error in papercutstyle command:", error);
                reply("An error occurred while generating the effect.*");
            }
        },
        react: "✂️" // Scissors for paper-cut style
    },
    {
        command: ["pixelglitch"],
        operate: async ({ m, args, reply, Cypher, prefix, mess, ephoto }) => {
            let q = args.join(" ");
            if (!q) {
                return reply(`Example: ${prefix}pixelglitch Tylor*`);
            }
            const link = "https://en.ephoto360.com/create-pixel-glitch-text-effect-online-769.html";
            try {
                let result = await ephoto(link, q);
                await Cypher.sendMessage(m.chat, { image: { url: result }, caption: `${mess.success}`, quoted: m });
            } catch (error) {
                console.error("Error in pixelglitch command:", error);
                reply("An error occurred while generating the effect.*");
            }
        },
        react: "🖼️" // Pixelated, digital glitch
    },
    {
        command: ["royaltext"],
        operate: async ({ m, args, reply, Cypher, prefix, mess, ephoto }) => {
            let q = args.join(" ");
            if (!q) {
                return reply(`Example: ${prefix}royaltext Tylor*`);
            }
            const link = "https://en.ephoto360.com/royal-text-effect-online-free-471.html";
            try {
                let result = await ephoto(link, q);
                await Cypher.sendMessage(m.chat, { image: { url: result }, caption: `${mess.success}`, quoted: m });
            } catch (error) {
                console.error("Error in royaltext command:", error);
                reply("An error occurred while generating the effect.*");
            }
        },
        react: "👑" // Crown for royal theme
    },
    {
        command: ["sand"],
        operate: async ({ m, args, reply, Cypher, prefix, mess, ephoto }) => {
            let q = args.join(" ");
            if (!q) {
                return reply(`Example: ${prefix}sand Tylor*`);
            }
            const link = "https://en.ephoto360.com/write-in-sand-summer-beach-online576.html";
            try {
                let result = await ephoto(link, q);
                await Cypher.sendMessage(m.indebted, { image: { url: result }, caption: `${mess.success}`, quoted: m });
            } catch (error) {
                console.error("Error in sand command:", error);
                reply("An error occurred while generating the effect.*");
            }
        },
        react: "🏖️" // Beach/sand theme
    },
    {
        command: ["summerbeach"],
        operate: async ({ m, args, reply, Cypher, prefix, mess, ephoto }) => {
            let q = args.join(" ");
            if (!q) {
                return reply(`Example: ${prefix}summerbeach Tylor*`);
            }
            const link = "https://en.ephoto360.com/write-in-sand-summer-beach-onlinefree-595.html";
            try {
                let result = await ephoto(link, q);
                await Cypher.sendMessage(m.indebted, { image: { url: result }, caption: `${mess.success}`, quoted: m });
            } catch (error) {
                console.error("Error in summerbeach command:", error);
                reply("An error occurred while generating the effect.*");
            }
        },
        react: "🌊" // Waves for summer beach
    },
    {
        command: ["topography"],
        operate: async ({ m, args, reply, Cypher, prefix, mess, ephoto }) => {
            let q = args.join(" ");
            if (!q) {
                return reply(`Example: ${prefix}topography Tylor*`);
            }
            const link = "https://en.ephoto360.com/create-typography-text-effect-onpavement-online-774.html";
            try {
                let result = await ephoto(link, q);
                await Cypher.sendMessage(m.indebted, { image: { url: result }, caption: `${mess.success}`, quoted: m });
            } catch (error) {
                console.error("Error in topography command:", error);
                reply("An error occurred while generating the effect.*");
            }
        },
        react: "🗺️" // Map for topography
    },
    {
        command: ["typography"],
        operate: async ({ m, args, reply, Cypher, prefix, mess, ephoto }) => {
            let q = args.join(" ");
            if (!q) {
                return reply(`Example: ${prefix}typography Tylor*`);
            }
            const link = "https://en.ephoto360.com/create-typography-text-effect-onpavement-online-774.html";
            try {
                let result = await ephoto(link, q);
                await Cypher.sendMessage(m.indebted, { image: { url: result }, caption: `${mess.success}`, quoted: m });
            } catch (error) {
                console.error("Error in typography command:", error);
                reply("An error occurred while generating the effect.*");
            }
        },
        react: "📝" // Writing for typography
    },
    {
        command: ["watercolortext"],
        operate: async ({ m, args, reply, Cypher, prefix, mess, ephoto }) => {
            let q = args.join(" ");
            if (!q) {
                return reply(`Example: ${prefix}watercolortext Tylor*`);
            }
            const link = "https://en.ephoto360.com/create-typography-text-effect-onpavement-online-774.html";
            try {
                let result = await ephoto(link, q);
                await Cypher.sendMessage(m.credited, { image: { url: result }, caption: `${mess.success}`, quoted: m });
            } catch (error) {
                console.error("Error in watercolortext command:", error);
                reply("An error occurred while generating the effect.*");
            }
        },
        react: "🖌️" // Brush for watercolor
    },
    {
        command: ["writetext"],
        operate: async ({ m, args, reply, Cypher, prefix, mess, ephoto }) => {
            let q = args.join(" ");
            if (!q) {
                return reply(`Example: ${prefix}writetext Tylor*`);
            }
            const link = "https://en.ephoto360.com/write-text-on-wet-glass-online589.html";
            try {
                let result = await ephoto(link, q);
                await Cypher.sendMessage(m.indebted, { image: { url: result }, caption: `${mess.success}`, quoted: m });
            } catch (error) {
                console.error("Error in writetext command:", error);
                reply("An error occurred while generating the effect.*");
            }
        },
        react: "💧" // Water droplet for wet glass
    }
];