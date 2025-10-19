;(function (global) {
  function setupScrollBehavior () {
    if (global.__setupScrollBehaviorDone) return

    const navbar = document.querySelector('.navbar')
    if (!navbar) return console.warn('.navbar not found')

    const navbarNav = document.getElementById('navbarNav')
    if (!navbarNav) return

    // Select all links inside the navbar, including dropdown items
    const allLinks = navbarNav.querySelectorAll('a.nav-link, .dropdown-item')

    allLinks.forEach(link => {
      link.addEventListener('click', e => {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarNav)

        // If link is a dropdown toggle parent → do nothing
        if (link.classList.contains('dropdown-toggle')) return

        // Otherwise → collapse the entire navbar (including submenu)
        if (bsCollapse) bsCollapse.hide()
      })
    })

    function updateNavLinkColor () {
      const isScrolled = navbar.classList.contains('navbar-scrolled')
      const navLinks = navbarNav.querySelectorAll('.nav-link')
      navLinks.forEach(link => {
        // Customize colors if needed
        // link.style.setProperty('color', isScrolled ? 'black' : 'white', 'important')
      })
    }

    function handleScroll () {
      if (window.scrollY >= 56) {
        navbar.classList.add('navbar-scrolled')
      } else {
        const isMenuOpen = navbarNav.classList.contains('show')
        if (!isMenuOpen) navbar.classList.remove('navbar-scrolled')
      }
      updateNavLinkColor()
    }

    // Handle menu open/close
    navbarNav.addEventListener('show.bs.collapse', () => {
      navbar.classList.add('navbar-scrolled')
      updateNavLinkColor()
    })

    navbarNav.addEventListener('hidden.bs.collapse', () => {
      if (window.scrollY < 56) navbar.classList.remove('navbar-scrolled')
      updateNavLinkColor()
    })

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    global.__setupScrollBehaviorDone = true
  }

  function handleInitialHashScroll () {
    window.addEventListener('load', () => {
      setTimeout(() => {
        if (window.location.hash) {
          const target = document.querySelector(window.location.hash)
          if (target) target.scrollIntoView({ behavior: 'smooth' })
        }
      }, 300)
    })
  }

  global.handleInitialHashScroll = handleInitialHashScroll
  global.setupScrollBehavior = setupScrollBehavior
})(window)
