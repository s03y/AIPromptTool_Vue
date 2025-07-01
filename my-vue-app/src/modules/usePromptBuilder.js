export function usePromptBuilder(prompt) {
    return () => {
        const parts = [];

        if (prompt.gender) parts.push(prompt.gender);
        if (prompt.age) parts.push(`${prompt.age} years old`);
        if (prompt.skin && prompt.skinTexture)
            parts.push(`${prompt.skin}, ${prompt.skinTexture} textured skin`);
        else if (prompt.skin) parts.push(`${prompt.skin} skin`);
        else if (prompt.skinTexture) parts.push(`${prompt.skinTexture} textured skin`);

        if (prompt.hair?.type || prompt.hair?.color) {
            const hair = [prompt.hair.type, prompt.hair.color].filter(Boolean).join(' ');
            parts.push(`${hair} hair`);
        }

        if (prompt.eyes?.type || prompt.eyes?.color) {
            const eyes = [prompt.eyes.type, prompt.eyes.color].filter(Boolean).join(' ');
            parts.push(`${eyes} eyes`);
        }

        if (prompt.top?.type) {
            let top = `wearing a ${prompt.top.type}`;
            if (prompt.top.color) top += ` in ${prompt.top.color}`;
            parts.push(top);
        }

        if (prompt.bottom?.type) {
            let bottom = `wearing ${prompt.bottom.type}`;
            if (prompt.bottom.color) bottom += ` in ${prompt.bottom.color}`;
            parts.push(bottom);
        }

        if (prompt.shoes?.type) {
            let shoes = `wearing ${prompt.shoes.type}`;
            if (prompt.shoes.color) shoes += ` in ${prompt.shoes.color}`;
            parts.push(shoes);
        }

        if (prompt.movement) parts.push(`doing ${prompt.movement}`);
        if (prompt.objekt) parts.push(`with a ${prompt.objekt}`);
        if (prompt.background) parts.push(`on a ${prompt.background} background`);
        if (prompt.location) parts.push(`at ${prompt.location}`);
        if (prompt.camera) parts.push(`shot with camera settings: ${prompt.camera}`);

        if (prompt.caption) parts.push(`caption: "${prompt.caption}"`);

        return parts.join(', ') + '.';
    };
}
