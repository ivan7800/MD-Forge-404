import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('navegación principal y editor', async ({ page }) => {
  await expect(page.locator('#page-home')).toBeVisible();
  for (const name of ['project','editor','doctor','build','github','publish','home']) {
    await page.locator(`.topnav [data-page="${name}"]`).click();
    await expect(page.locator(`#page-${name}`)).toBeVisible();
  }
  await page.locator('.topnav [data-page="editor"]').click();
  const before=await page.locator('#editor').inputValue();
  await page.locator('[data-insert="bold"]').click();
  await expect(page.locator('#editor')).not.toHaveValue(before);
});

test('workspace multiproyecto', async ({ page }) => {
  await expect(page.locator('#workspaceList .workspace-card')).toHaveCount(1);
  await page.locator('#newWorkspaceBtn').click();
  await page.locator('#projectDialog input[name="name"]').fill('QA Workspace');
  await page.locator('#projectForm .primary').click();
  await page.locator('.topnav [data-page="home"]').click();
  await expect(page.locator('#workspaceList .workspace-card')).toHaveCount(2);
  await expect(page.locator('#homeProjectName')).toHaveText('QA Workspace');
});

test('MD Doctor, code-docs y workflow', async ({ page }) => {
  await page.evaluate(() => {
    const files={
      'package.json': JSON.stringify({name:'qa',version:'5.0.0',scripts:{build:'vite build'},dependencies:{vite:'latest'}}),
      'index.html':'<title>QA</title>',
      'app.js':'localStorage.setItem("x","1"); fetch("/api"); navigator.serviceWorker.register("sw.js")',
      'manifest.webmanifest':'{"name":"QA"}'
    };
    showEvidence(deriveEvidence(files,'QA',Object.keys(files)));
  });
  await page.locator('.topnav [data-page="doctor"]').click();
  await expect(page.locator('#codeDocsScore')).not.toHaveText('—');
  await expect(page.locator('#coverageGrid .coverage-row')).toHaveCount(7);
  await page.locator('.topnav [data-page="github"]').click();
  await page.locator('#generateWorkflowBtn').click();
  await expect(page.locator('#workflowState')).toContainText('Generado');
});

test('GitHub público con red simulada', async ({ page }) => {
  await page.route('https://api.github.com/**', async route => {
    const u=route.request().url();
    let body={};
    if(u.endsWith('/repos/openai/testrepo')) body={private:false,default_branch:'main',html_url:'https://github.com/openai/testrepo',stargazers_count:1,forks_count:0,license:{spdx_id:'MIT'},description:'QA',language:'JavaScript',archived:false};
    else if(u.includes('/git/ref/heads/main')) body={object:{sha:'commit'}};
    else if(u.includes('/git/commits/commit')) body={tree:{sha:'tree'}};
    else if(u.includes('/git/trees/tree')) body={tree:[{path:'README.md',type:'blob',size:60},{path:'package.json',type:'blob',size:80}]};
    else return route.fulfill({status:404,json:{}});
    await route.fulfill({status:200,json:body});
  });
  await page.route('https://raw.githubusercontent.com/**', async route => {
    const u=route.request().url();
    await route.fulfill({status:200,contentType:'text/plain',body:u.endsWith('README.md')?'# Repo QA\n\n## Instalación\n':'{"name":"testrepo","version":"5.0.0","scripts":{"build":"vite build"}}'});
  });
  await page.locator('.topnav [data-page="github"]').click();
  await page.locator('#githubRepoInput').fill('openai/testrepo');
  await page.locator('#githubAnalyzeBtn').click();
  await expect(page.locator('#githubConnectionState')).toContainText('Conectado');
  await expect(page.locator('#githubRepoSummary')).toContainText('openai/testrepo');
});

test('Site Builder 2.0 genera navegación y SEO opcional', async ({ page }) => {
  await page.locator('.topnav [data-page="build"]').click();
  await page.locator('#siteBaseUrl').fill('https://example.github.io/docs/');
  await page.locator('#siteBaseUrl').dispatchEvent('change');
  const result=await page.evaluate(async()=>{const e=await buildSiteEntries();return {keys:Object.keys(e),index:String(e['index.html']),sitemap:String(e['sitemap.xml']||'')}});
  expect(result.keys).toContain('index.html');
  expect(result.keys).toContain('sitemap.xml');
  expect(result.keys).toContain('robots.txt');
  expect(result.index).toContain('page-nav');
  expect(result.sitemap).toContain('https://example.github.io/docs/');
});
