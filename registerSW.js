if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/rman/sw.js', { scope: '/rman/' })})}