// Run with: playwright-cli -s=portfolio run-code --filename scripts/browser-check.cjs
async (page) => {
  const base = "http://localhost:4173";
  const slugs = ["tweet-index","r2d2","kurate","squadxoxo","ai-paper-skill","commandvoice","orbit-prm","flow-finance","linkedin-attribution-system"];
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.url().startsWith(base) && response.status() >= 400)
      errors.push(response.status() + " " + response.url());
  });
  const check = (value, message) => {
    if (!value) throw Error(message);
  };
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const slug of slugs) {
    await page.goto(`${base}/projects/${slug}/`);
    await page.reload();
    check((await page.locator("h1").count()) === 1, slug + " h1");
    check(
      (await page.locator("link[rel=canonical]").getAttribute("href")) ===
        `https://nachikethramesh.com/projects/${slug}/`,
      slug + " canonical",
    );
    const workflow = page.getByRole("group", {
      name: "Explore the workflow",
      exact: true,
    });
    if (await workflow.count()) {
      const buttons = workflow.getByRole("button");
      for (let i = 0; i < (await buttons.count()); i++) {
        await buttons.nth(i).click();
        check(
          (await buttons.nth(i).getAttribute("aria-pressed")) === "true",
          slug + " step " + i,
        );
      }
    }
    const gallery = page.getByRole("group", {
      name: "Choose a project image",
      exact: true,
    });
    if (await gallery.count()) {
      const buttons = gallery.getByRole("button");
      for (let i = 0; i < (await buttons.count()); i++)
        await buttons.nth(i).click();
      check(
        await page
          .locator(".gallery img")
          .evaluate((img) => img.complete && img.naturalWidth > 0),
        slug + " gallery image",
      );
    }
    await page.locator("summary").click();
    check(
      (await page.locator("details").getAttribute("open")) !== null,
      slug + " disclosure",
    );
    await page.setViewportSize({ width: 390, height: 844 });
    check(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      slug + " mobile overflow",
    );
    await page.setViewportSize({ width: 1440, height: 1000 });
  }
  await page.goto(`${base}/projects/r2d2/`);
  for (let i = 0; i < 4; i++) {
    await page
      .getByRole("group", { name: "Choose an explanation mode" })
      .getByRole("button")
      .nth(i)
      .click();
    check(
      (await page.locator(".answer p").innerText()).length > 25,
      "R2D2 answer",
    );
  }
  await page.goto(`${base}/projects/orbit-prm/`);
  await page.getByRole("button", { name: "03 Warmth" }).click();
  await page.getByRole("slider").fill("90");
  check(
    (await page.locator("meter").getAttribute("value")) === "0",
    "warmth at day 90",
  );
  await page.getByRole("slider").fill("0");
  check(
    (await page.locator("meter").getAttribute("value")) === "30",
    "warmth at day zero",
  );
  await page.getByRole("button", { name: "05 Follow up" }).click();
  await page.getByRole("button", { name: "Add example reminder" }).click();
  check(
    (await page.getByRole("status").innerText()).includes("added"),
    "reminder add",
  );
  await page.getByRole("button", { name: "Remove example reminder" }).click();
  await page.goto(`${base}/projects/ai-paper-skill/`);
  const lesson = page
    .getByRole("group", { name: "Explore the example lesson" })
    .getByRole("button");
  for (let i = 0; i < 4; i++) await lesson.nth(i).click();
  await page.getByRole("radio").nth(1).check();
  check(
    (await page.getByRole("status").innerText()).includes("Try again"),
    "quiz incorrect",
  );
  await page.getByRole("radio").nth(0).check();
  check(
    (await page.getByRole("status").innerText()).includes("Correct"),
    "quiz correct",
  );
  await page.getByRole("button", { name: "Reset answer" }).click();
  check(
    (await page.locator("input[type=radio]:checked").count()) === 0,
    "quiz reset",
  );
  await page.goto(`${base}/projects/commandvoice/`);
  await page.getByRole("checkbox").check();
  for (let i = 0; i < 3; i++)
    await page.getByRole("button", { name: "Next stage" }).click();
  check(
    (await page.locator(".voice-screen h3").innerText()).includes("paste"),
    "voice paste illustration",
  );
  await page.getByRole("button", { name: "Restart illustration" }).click();
  check((await page.locator("kbd").count()) === 2, "voice restart");
  await page.goto(`${base}/projects/tweet-index/`);
  await page.locator("iframe").scrollIntoViewIfNeeded();
  const frame = page.frameLocator("iframe");
  await frame.locator("#run").click();
  check(await frame.locator("#results").isVisible(), "tweet replay results");
  for (let i = 0; i < 3; i++) {
    await frame.locator(".result button").nth(i).click();
    check(
      await frame.locator(".detail").nth(i).isVisible(),
      "tweet result " + i,
    );
    check(
      (await frame.locator(".detail a").nth(i).getAttribute("href")).startsWith(
        "https://x.com/",
      ),
      "original X link",
    );
  }
  await frame.locator("#run").click();
  check(
    (await frame.locator(".detail:visible").count()) === 0,
    "tweet replay reset",
  );
  for (let i = 0; i < 5; i++) {
    await frame.locator(".stage").nth(i).click();
    check(
      (await frame.locator(".stage").nth(i).getAttribute("aria-pressed")) ===
        "true",
      "pipeline " + i,
    );
  }
  const tweetVideo = frame.locator("video");
  await tweetVideo.evaluate(
    (video) =>
      new Promise((resolve) => {
        if (video.readyState >= 1) resolve();
        else video.addEventListener("loadedmetadata", resolve, { once: true });
      }),
  );
  for (let i = 0; i < 6; i++) {
    await frame.locator(".chapter").nth(i).click();
    await tweetVideo.evaluate((video) => video.pause());
    check(
      (await frame.locator("#chapterlabel").innerText()).includes(
        String(i + 1),
      ),
      "tweet chapter " + i,
    );
    check(
      Math.abs(
        (await tweetVideo.evaluate((video) => video.currentTime)) -
          [0, 5, 10, 13, 21, 27][i],
      ) < 1,
      "Tweet seek " + i,
    );
  }
  check(
    (await tweetVideo.evaluate((video) => video.textTracks.length)) === 1,
    "Tweet supplied captions",
  );
  await tweetVideo.evaluate((video) => {
    video.currentTime = 14;
    video.dispatchEvent(new Event("timeupdate"));
  });
  check(
    (await frame.locator("#chapterlabel").innerText()).includes("4"),
    "tweet playback synchronization",
  );
  await page.locator("#explore").scrollIntoViewIfNeeded();
  await page.screenshot({ path: "output/playwright/tweet-desktop.png" });
  await page.setViewportSize({ width: 390, height: 844 });
  check(
    await frame
      .locator("body")
      .evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    "tweet iframe mobile overflow",
  );
  await page.screenshot({ path: "output/playwright/tweet-mobile.png" });
  await page.goto(`${base}/projects/orbit-prm/`);
  await page.locator("#explore").scrollIntoViewIfNeeded();
  await page.screenshot({ path: "output/playwright/orbit-mobile.png" });
  await page.goto(base + "/#portfolio#kurate");
  await page.waitForURL("**/projects/kurate/");
  await page.getByRole("link", { name: "Back to Portfolio" }).click();
  check(
    (await page.locator(".explore-project").count()) === 9,
    "all homepage project actions",
  );
  check((await page.locator("video").count()) === 0, "homepage no videos");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.getByRole("link", { name: "Skills", exact: true }).last().click();
  check(page.url().endsWith("#skills"), "mobile navigation");
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base + "/projects/kurate/");
  await page.screenshot({ path: "output/playwright/kurate-desktop.png" });
  await page.keyboard.press("Tab");
  check(
    await page
      .locator(".skip-link")
      .evaluate((el) => el === document.activeElement),
    "keyboard skip link",
  );
  await page.getByRole("button", { name: "02 Organize", exact: true }).focus();
  await page.keyboard.press("Space");
  check(
    (await page
      .getByRole("button", { name: "02 Organize", exact: true })
      .getAttribute("aria-pressed")) === "true",
    "keyboard workflow",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  check(
    await page.evaluate(
      () => matchMedia("(prefers-reduced-motion: reduce)").matches,
    ),
    "reduced motion",
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  check(errors.length === 0, errors.join("\n"));
  return "PASS: all 9 routes and refreshes, galleries, workflow steps, all distinct demos, caption tracks/video seeking, legacy redirect, keyboard, mobile overflow, and no runtime/request errors.";
}
