chrome.action.onClicked.addListener(() => {
    // alert("got clickde ");
    chrome.tabs.create({
        url: "index.html"
      })
  });