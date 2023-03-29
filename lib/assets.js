// if this fails, please run `npm run build` first
import data from "../dist/manifest.json" assert { type: 'json' };

export const assetUrl = (path) => {
  const asset = data[path];

  if (!asset) {
    throw new Error(`asset not found: ${path}`);
  }

  return `/${asset.file}`;
}
