export function generateBgColor(n) {
  const colors = [];
  for(let i = 0; i < n; i++) {
    const red = Math.floor(Math.random() * 255) + 1;
    const green = Math.floor(Math.random() * 255) + 1;
    const blue = Math.floor(Math.random() * 255) + 1;
    colors.push(`rgba(${red}, ${green}, ${blue}, 0.2)`);
  }
  return colors;
}

export function generateBorderColor(colorsArray) {
  return colorsArray.map(color => {
    return color.slice(0, -6) + color.slice(-1);
  })
}