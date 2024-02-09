chrome.action.onClicked.addListener((tab) => {
	chrome.tabs.create({ url: "https://n1-lb.vercel.app" });
});
