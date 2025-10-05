// document.addEventListener('DOMContentLoaded', function () {
//   const navLinks = document.querySelectorAll('.navbar-nav .nav-link')
//   const navbarNav = document.getElementById('navbarNav')

//   navLinks.forEach(link => {
//     link.addEventListener('click', function () {
//       //   // Remove 'active' from all links
//       //   navLinks.forEach(l => l.classList.remove('active'))
//       //   // Add 'active' to the clicked link
//       //   this.classList.add('active')

//       // Collapse navbar if open (on mobile)
//       const bsCollapse = bootstrap.Collapse.getInstance(navbarNav)
//       if (bsCollapse) {
//         bsCollapse.hide()
//       }
//     })
//   })

//   function updateNavLinkColor () {
//     const navEl = document.querySelector('.navbar')
//     const isScrolled = navEl.classList.contains('navbar-scrolled')

//     navLinks.forEach(link => {
//       link.style.color = isScrolled ? 'black' : 'white'
//     })
//   }

//   updateNavLinkColor()

//   const navEl = document.querySelector('.navbar')
//   window.addEventListener('scroll', () => {
//     if (window.scrollY >= 56) {
//       navEl.classList.add('navbar-scrolled')
//     } else {
//       navEl.classList.remove('navbar-scrolled')
//     }
//     updateNavLinkColor()
//   })
// })
;(function (global) {
  function setupScrollBehavior () {
    if (global.__setupScrollBehaviorDone) return // avoid double init
    const navbar = document.querySelector('.navbar')
    if (!navbar) {
      console.warn('setupScrollBehavior: .navbar not found')
      return
    }

    const navbarNav = document.getElementById('navbarNav')
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link')

    // Collapse on mobile
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarNav)
        if (bsCollapse) bsCollapse.hide()
      })
    })

    function updateNavLinkColor () {
      const isScrolled = navbar.classList.contains('navbar-scrolled')
      navLinks.forEach(link => {
        link.style.color = isScrolled ? 'black' : 'white'
      })
    }

    function handleScroll () {
      if (window.scrollY >= 56) navbar.classList.add('navbar-scrolled')
      else navbar.classList.remove('navbar-scrolled')
      updateNavLinkColor()
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    global.__setupScrollBehaviorDone = true
  }

  // expose
  global.setupScrollBehavior = setupScrollBehavior
})(window)
