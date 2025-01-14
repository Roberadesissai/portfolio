import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

interface RepoStructure {
  name: string;
  description: string;
  structure: {
    path: string;
    type: string;
    content?: string;
  }[];
  languages: { [key: string]: number };
  readme?: string;
  packageJson?: any;
}

export async function analyzeGithubRepo(url: string): Promise<RepoStructure> {
  try {
    const urlParts = url.replace("https://github.com/", "").split("/");
    const owner = urlParts[0];
    const repo = urlParts[1];

    const [repoInfo, contents, languages, readme] = await Promise.all([
      octokit.repos.get({ owner, repo }),
      octokit.repos.getContent({ owner, repo, path: "" }),
      octokit.repos.listLanguages({ owner, repo }),
      octokit.repos.getReadme({ owner, repo }).catch(() => null),
    ]);

    let packageJson;
    try {
      const pkgResponse = await octokit.repos.getContent({
        owner,
        repo,
        path: "package.json",
      });

      if ("content" in pkgResponse.data) {
        packageJson = JSON.parse(
          Buffer.from(pkgResponse.data.content, "base64").toString()
        );
      }
    } catch (error) {
      console.log("No package.json found");
    }

    const structure = Array.isArray(contents.data)
      ? contents.data.map((item) => ({
          path: item.path,
          type: item.type,
          ...(item.type === "file" && {
            content: item.content
              ? Buffer.from(item.content, "base64").toString()
              : undefined,
          }),
        }))
      : [];

    return {
      name: repoInfo.data.name,
      description: repoInfo.data.description || "",
      structure,
      languages: languages.data,
      readme: readme?.data.content
        ? Buffer.from(readme.data.content, "base64").toString()
        : undefined,
      packageJson,
    };
  } catch (error) {
    console.error("Error analyzing GitHub repo:", error);
    throw new Error("Failed to analyze GitHub repository");
  }
}
