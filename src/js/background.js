console.log("Background script loaded");

const tabStates = new Map();

chrome.action.onClicked.addListener((tab) => {
  const currentState = tabStates.get(tab.id) || false;
  const newState = !currentState;
  tabStates.set(tab.id, newState);

  chrome.tabs.sendMessage(tab.id, { action: newState ? "convert" : "revert" }, (response) => {
    if (chrome.runtime.lastError) {
      console.log("Error sending message:", chrome.runtime.lastError.message);
      return;
    }
    updateIcon(tab.id, newState);
  });
});

function updateIcon(tabId, enabled) {
  const iconPath = enabled ? {
    100: '/src/icons/iconX100.png'
  } : {
    100: '/src/icons/icon100.png'
  };

  chrome.action.setIcon({ path: iconPath, tabId: tabId });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    const state = tabStates.get(tabId) || false;
    updateIcon(tabId, state);
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  tabStates.delete(tabId);
});

console.log("Background script setup complete");