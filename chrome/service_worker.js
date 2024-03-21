'use strict';

// Based on https://github.com/nownabe/golink/blob/9be56269cf12e4444794c9d55a324a1a5fe8b181/extension/src/background/updateRedirectRule.ts#L46
// Sort of a hack to tell Chrome that http://go/ is a valid url.
// I'm not entirely sure it is totally necessary, but my extension wasn't working without it.
async function openGoTab(url) {
  console.debug(`[openGoTab] started`);

  const goTab = await chrome.tabs.create({ url: "http://go/" });
  console.debug(`[openGoTab] opened http://go/:`, goTab);

  const onUpdated = (
    tabId,
    changeInfo,
    tab,
  ) => {
    if (tabId === goTab.id && changeInfo.status === "complete") {
      console.debug("[openGoTab] loading tab is completed", tab);

      chrome.tabs.remove(tabId);
      console.debug("[openGoTab] closed tab");

      chrome.tabs.onUpdated.removeListener(onUpdated);
      console.debug(`[openGoTab] removed listener`);

      console.debug(`[openGoTab] succeeded to open and redirect http://go/ to ${tab.url}`);
    }
  };

  chrome.tabs.onUpdated.addListener(onUpdated);
  console.debug(`[openGoTab] added listener`);

  console.debug(`[openGoTab] finished`);
}

function onInstalled() {
  (async () => {
    try {
      await openGoTab("http://127.0.0.1:5000/");
    } catch (e) {
      console.error("[onInstalled]", e);
    }
  })();

  return true;
}

chrome.runtime.onInstalled.addListener(onInstalled);

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((e) => {
  const msg = `Navigation to ${e.request.url} redirected on tab ${e.request.tabId}.`;
  console.log(msg);
});


console.log('Service worker started.');
