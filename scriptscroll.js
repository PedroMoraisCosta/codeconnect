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

    // Collapse on mobile when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarNav)
        if (bsCollapse) bsCollapse.hide()
      })
    })

    // Change color of nav links (you can adjust this if needed)
    function updateNavLinkColor () {
      const isScrolled = navbar.classList.contains('navbar-scrolled')
      navLinks.forEach(link => {
        // link.style.setProperty(
        //   'color',
        //   isScrolled ? 'black' : 'white',
        //   'important'
        // )
      })
    }

    // Handle scroll color
    function handleScroll () {
      if (window.scrollY >= 56) {
        navbar.classList.add('navbar-scrolled')
      } else {
        // only remove if the menu is NOT open
        const isMenuOpen = navbarNav.classList.contains('show')
        if (!isMenuOpen) navbar.classList.remove('navbar-scrolled')
      }
      updateNavLinkColor()
    }

    // --- NEW: handle menu open/close ---
    navbarNav.addEventListener('show.bs.collapse', () => {
      navbar.classList.add('navbar-scrolled') // yellow when menu opens
      updateNavLinkColor()
    })

    navbarNav.addEventListener('hidden.bs.collapse', () => {
      // if user is at top and closes menu → remove yellow
      if (window.scrollY < 56) navbar.classList.remove('navbar-scrolled')
      updateNavLinkColor()
    })
    // -----------------------------------

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    global.__setupScrollBehaviorDone = true
  }

  function handleInitialHashScroll () {
    // Wait until the page finishes loading all DOM content
    window.addEventListener('load', () => {
      setTimeout(() => {
        if (window.location.hash) {
          const target = document.querySelector(window.location.hash)
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' })
          } else {
            console.warn(
              'handleInitialHashScroll: target not found for',
              window.location.hash
            )
          }
        }
      }, 300) // Adjust delay if architecture.js takes longer
    })
  }

  // Expose globally so you can call it when architecture.js finishes
  global.handleInitialHashScroll = handleInitialHashScroll
  // expose
  global.setupScrollBehavior = setupScrollBehavior
})(window)
