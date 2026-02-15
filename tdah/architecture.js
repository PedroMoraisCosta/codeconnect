// Expose a build function globally
function buildArchitecture (callback) {
  // List of fetches
  const tasks = [
    fetch('header.html')
      .then(res => res.text())
      .then(data => {
        document.getElementById('header-placeholder').innerHTML = data
      }),

    fetch('phones.html')
      .then(res => res.text())
      .then(data => {
        document.getElementById('phones-placeholder').innerHTML = data
      }),

    fetch('attachments.html')
      .then(res => res.text())
      .then(data => {
        document.getElementById('attachments-placeholder').innerHTML = data
      }),

    fetch('middle.html')
      .then(res => res.text())
      .then(data => {
        document.getElementById('middle-placeholder').innerHTML = data
      })

    // fetch('footer.html')
    //   .then(res => res.text())
    //   .then(data => {
    //     document.getElementById('footer-placeholder').innerHTML = data
    //   })
  ]

  // Wait for all fetches to finish, then call the callback
  Promise.all(tasks).then(() => {
    if (typeof callback === 'function') {
      callback() // DOM is now fully built
    }
  })
}

// Make it accessible in other scripts
window.buildArchitecture = buildArchitecture

// document.addEventListener('DOMContentLoaded', function () {
//   buildArchitecture(function () {
    
//   })
// })
