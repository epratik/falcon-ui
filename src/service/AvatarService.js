
export function getAvatar(text) {

    text = text.split(" ").map((n)=>n[0]).join("");
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const colors =['#E67E22','#3498DB','#27AE60','#EC7063']
    let textToNum = '';

    for (let i = 0; i < text.length; i++) {
        let val = text.slice(i, i + 1);
        textToNum += val.charCodeAt(0);
    }

    const colorIndex = textToNum % colors.length;

    canvas.width = 200;
    canvas.height = 200;

    const backgroundColor = colors[colorIndex];
    const foregroundColor = '#FDFEFE';

    // Draw background
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw text
    context.font = "bold 100px Assistant";
    context.fillStyle = foregroundColor;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    return canvas.toDataURL("image/png");
}

