const yt = "https://www.youtube.com/watch";

chrome.action.onClicked.addListener(async (tab) => {
  // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  // Next state will always be the opposite
  const nextState = prevState === "ON" ? "OFF" : "ON";

  // Set the action badge to the next state
  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState,
  });
  chrome.tabs.sendMessage(tab.id, { state: nextState });
});
chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
  try {
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // Next state will always be the opposite
    chrome.tabs.sendMessage(tabId, { state: prevState || "ON" });
  } catch (e) {
    console.error(e);
  }
});
