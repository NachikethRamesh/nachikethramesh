// Playwright CLI code file: run-code --filename scripts/landing-browser-check.cjs
async (page) => {
  const base = 'http://localhost:4173';
  const errors = [];
  const requests = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => requests.push(request.url()));
  page.on('response', response => {
    if (response.url().startsWith(base) && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
  });
  const check = (condition, label) => { if (!condition) throw new Error(label); };
  await page.setViewportSize({width:1440,height:1000});
  await page.goto(base);
  check(await page.locator('.work-card').count() === 9, 'All nine projects visible by default');
  check(JSON.stringify(await page.locator('.work-card h3').allTextContents())===JSON.stringify(['Tweet Index','R2D2','Kurate','Squadxoxo','AI-paper explanation skill','CommandVoice','Orbit PRM','Flow Finance','LinkedIn Attribution System']),'Requested project order');
  check(await page.locator('.work-card h3').first().innerText() === 'Tweet Index', 'Tweet Index leads the collection');
  check(await page.locator('video,iframe').count() === 0, 'No homepage video or iframe');
  check(!requests.some(url=>/\.mp4(?:$|\?)/i.test(url)), 'No video requests on homepage load');
  check(!/product manager|product management/i.test(await page.locator('body').innerText()), 'No product-management positioning');
  const title = (await page.locator('h1').innerText()).replace(/\s+/g,' ').trim();
  check(title === 'I turn ideas into useful tools, apps, and experiences.', 'Approved introduction preserved');
  for (const [category, count] of [['AI tools',5],['Apps',2],['Prototypes',1],['Campaigns',1]]) {
    await page.getByRole('group',{name:'Filter projects'}).getByRole('button',{name:new RegExp(`^${category}`)}).click();
    check(await page.locator('.work-card').count() === count, `${category} project count`);
    check((await page.locator('.work-count').innerText()).startsWith(String(count)), `${category} live count`);
  }
  await page.getByRole('button',{name:'Show all 9 projects'}).click();
  check(await page.locator('.work-card').count() === 9, 'Reset project filter');
  await page.getByRole('group',{name:'Filter projects'}).getByRole('button',{name:/^AI tools/}).focus();
  await page.keyboard.press('Space');
  check(await page.locator('.work-card').count() === 5, 'Keyboard filter activation');
  await page.getByRole('button',{name:'Show all 9 projects'}).click();
  await page.getByRole('link',{name:'Explore project: Tweet Index',exact:true}).click();
  await page.waitForURL('**/projects/tweet-index/');
  check(await page.locator('h1').innerText() === 'Tweet Index','Featured project navigation');
  await page.getByRole('link',{name:'Back to Portfolio'}).click();
  check(page.url().endsWith('#portfolio'),'Return to homepage portfolio');
  await page.evaluate(() => {
    Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text => { window.__copiedEmail=text; }}});
  });
  await page.getByRole('button',{name:'Copy email address',exact:true}).click();
  check(await page.evaluate(()=>window.__copiedEmail)==='naramesh@umich.edu','Clipboard receives email');
  check(await page.getByRole('button',{name:'Email copied',exact:true}).count()===1,'Clipboard success feedback');
  await page.evaluate(()=>{navigator.clipboard.writeText=async()=>{throw new Error('Denied for test');};});
  await page.getByRole('button',{name:'Email copied',exact:true}).click();
  check((await page.locator('.copy-status').innerText()).includes('Could not copy'),'Clipboard failure feedback');
  await page.goto(base);
  for (const width of [360,390,768,1024,1440,2048,2560]) {
    await page.setViewportSize({width,height:1000});
    const fits = await page.evaluate(()=>{
      const root=document.documentElement;
      return root.scrollWidth <= innerWidth+1 && [...document.querySelectorAll('h1,h2,.work-card,.email-link')].every(el=>{const r=el.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth+1;});
    });
    check(fits,`No overflow at ${width}px`);
  }
  await page.setViewportSize({width:1440,height:1000});
  await page.evaluate(()=>scrollTo(0,0));
  await page.screenshot({path:'output/playwright/landing-desktop.png'});
  await page.locator('#portfolio').scrollIntoViewIfNeeded();
  await page.screenshot({path:'output/playwright/landing-work-desktop.png'});
  for (const id of ['about','skills','contact']) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await page.screenshot({path:`output/playwright/landing-${id}-desktop.png`});
  }
  await page.setViewportSize({width:390,height:844});
  await page.evaluate(()=>scrollTo(0,0));
  await page.screenshot({path:'output/playwright/landing-mobile.png'});
  await page.getByRole('button',{name:'Open navigation'}).click();
  check(await page.getByRole('navigation',{name:'Mobile navigation'}).isVisible(),'Mobile menu opens');
  await page.keyboard.press('Escape');
  check(await page.getByRole('navigation',{name:'Mobile navigation'}).isHidden(),'Escape closes menu');
  check(await page.getByRole('button',{name:'Open navigation'}).evaluate(el=>el===document.activeElement),'Menu restores focus');
  await page.getByRole('button',{name:'Open navigation'}).click();
  await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'Skills',exact:true}).click();
  check(page.url().endsWith('#skills'),'Mobile anchor navigation');
  check(await page.getByRole('navigation',{name:'Mobile navigation'}).isHidden(),'Navigation collapses after selection');
  await page.locator('#portfolio').scrollIntoViewIfNeeded();
  await page.screenshot({path:'output/playwright/landing-work-mobile.png'});
  await page.goto(base+'/#portfolio#tweet-index');
  await page.waitForURL('**/projects/tweet-index/');
  await page.goto(base);
  await page.keyboard.press('Tab');
  check(await page.locator('.skip-link').evaluate(el=>el===document.activeElement),'Homepage skip link first');
  await page.emulateMedia({reducedMotion:'reduce'});
  check(await page.evaluate(()=>getComputedStyle(document.querySelector('.work-filters button')).transitionDuration)==='0s','Reduced motion disables transitions');
  await page.emulateMedia({reducedMotion:'no-preference'});
  check(errors.length===0,errors.join('\n'));
  return 'PASS: nine cards in the requested order, all filters, keyboard controls, project and legacy navigation, clipboard success/failure, seven viewport widths, and desktop/mobile screenshots. No runtime or local asset errors.';
}
