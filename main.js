if ('serviceWorker' in navigator) {
  window.navigator.serviceWorker.register('sw.js')
    .then((data) => {
      console.log("Service Worker is Registered" + data);
    })
    .catch((error) => {
      console.log("Some Error Occured While Registering Service Worker" + error);
    });
}