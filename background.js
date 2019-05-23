(urls =>
{
  const cancel = request =>
  {
    // exclude service workers from counters
    request && request.tabId > 0 && chrome.storage.sync.get('counter', data =>
    {
      counter = 1 + (data && data.counter ? parseInt(data.counter) : 0)
      chrome.storage.sync.set({ counter })
    })

    return { cancel: true }
  }

  // prevent duplicate event callbacks
  chrome.webRequest.onBeforeRequest.hasListener( cancel )
    && chrome.webRequest.onBeforeRequest.removeListener( cancel )
  
  // attach event
  chrome.webRequest.onBeforeRequest.addListener( cancel, { urls }, [ 'blocking' ] )

  // record extension activation time
  chrome.storage.sync.set({ activated: +new Date })
})(['*://*.youtube.com/*'])
