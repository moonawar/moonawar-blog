import path from "path";
import { promises as fs } from "fs";
import { globby } from "globby";
import os from "os";
import grayMatter from "gray-matter";

(async function () {
  // prepare the dirs
  const srcDir = path.join(process.cwd(), "src");
  const publicDir = path.join(process.cwd(), "public");
  const contentDir = path.join(srcDir, "content", "posts");
  let contentFilePattern = path.join(contentDir, "*.md");

  if(os.platform().includes("win")) {
    contentFilePattern = contentFilePattern.replaceAll("\\", "/");
  } 
  const indexFile = path.join(publicDir, "search-index.json");
  const contentFilePaths = await globby([contentFilePattern]);
  
  if (contentFilePaths.length) {
    const getSlugFromPathname = (pathname) =>
      path.basename(pathname, path.extname(pathname));
    
    const files = contentFilePaths.map(
      async (filePath) => await fs.readFile(filePath, "utf8")
    );
    const index = [];
    let i = 0;
    for await (let file of files) {
      const {
        data: { title, tags, pubDate }
      } = grayMatter(file);
      index.push({
        slug: getSlugFromPathname(contentFilePaths[i]),
        title,
        tags,
        dateString: pubDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
      });
      i++;
    }
    await fs.writeFile(indexFile, JSON.stringify(index));
    console.log(
      `Indexed ${index.length} documents from ${contentDir} to ${indexFile}`
    );
  }
})();