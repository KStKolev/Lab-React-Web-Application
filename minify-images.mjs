import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceFolder = join(__dirname, "src/assets/images");

async function minifyImages() {
  try {
    await imagemin([`${sourceFolder}/**/*.jpg`], {
      destination: sourceFolder,
      plugins: [
        imageminMozjpeg({
          quality: 80,
          progressive: true,
        }),
      ],
      glob: true,
    });
  } catch (error) {
    console.error("Error minifying images:", error);
    process.exit(1);
  }
}

minifyImages();
