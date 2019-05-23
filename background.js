(urls =>
{
  const cancel = _ => Object.assign({ cancel: true })

  chrome.webRequest.onBeforeRequest.hasListener( cancel )
    && chrome.webRequest.onBeforeRequest.removeListener( cancel )
  
  chrome.webRequest.onBeforeRequest.addListener( cancel, { urls }, [ 'blocking' ] )
})(['*://*.youtube.com/*'])
