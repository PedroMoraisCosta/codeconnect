document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link')
  const navbarNav = document.getElementById('navbarNav')

  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      //   // Remove 'active' from all links
      //   navLinks.forEach(l => l.classList.remove('active'))
      //   // Add 'active' to the clicked link
      //   this.classList.add('active')

      // Collapse navbar if open (on mobile)
      const bsCollapse = bootstrap.Collapse.getInstance(navbarNav)
      if (bsCollapse) {
        bsCollapse.hide()
      }
    })
  })

  function updateNavLinkColor () {
    const navEl = document.querySelector('.navbar')
    const isScrolled = navEl.classList.contains('navbar-scrolled')

    navLinks.forEach(link => {
      link.style.color = isScrolled ? 'black' : 'white'
    })
  }

  updateNavLinkColor()

  const navEl = document.querySelector('.navbar')
  window.addEventListener('scroll', () => {
    if (window.scrollY >= 56) {
      navEl.classList.add('navbar-scrolled')
    } else {
      navEl.classList.remove('navbar-scrolled')
    }
    updateNavLinkColor()
  })
})
