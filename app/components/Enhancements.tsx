'use client'

import { useEffect } from 'react'

// Ports the static site's main.js: mobile nav, theme toggle, scroll-reveal,
// sticky-header bg, scroll-up, and active-section nav. Runs once after mount.
export default function Enhancements() {
  useEffect(() => {
    const navMenu = document.getElementById('nav-menu')
    const navToggle = document.getElementById('nav-toggle')
    const navClose = document.getElementById('nav-close')
    const themeBtn = document.getElementById('theme-button')
    const themeIcon = themeBtn?.querySelector('i')
    const header = document.getElementById('header')
    const scrollUp = document.getElementById('scroll-up')
    const navLinks = Array.from(document.querySelectorAll<HTMLElement>('.nav__link'))
    const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id]'))

    const openMenu = () => navMenu?.classList.add('show-menu')
    const closeMenu = () => navMenu?.classList.remove('show-menu')
    navToggle?.addEventListener('click', openMenu)
    navClose?.addEventListener('click', closeMenu)
    navLinks.forEach((l) => l.addEventListener('click', closeMenu))

    // theme (default dark; persisted)
    const applyTheme = (light: boolean) => {
      document.body.classList.toggle('light-theme', light)
      if (themeIcon) themeIcon.className = light ? 'ri-sun-line' : 'ri-moon-line'
    }
    applyTheme(localStorage.getItem('theme') === 'light')
    const onTheme = () => {
      const light = !document.body.classList.contains('light-theme')
      applyTheme(light)
      localStorage.setItem('theme', light ? 'light' : 'dark')
    }
    themeBtn?.addEventListener('click', onTheme)

    // scroll reveal
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))

    // header bg + scroll-up + active link
    const onScroll = () => {
      const y = window.scrollY
      header?.classList.toggle('bg-header', y >= 50)
      scrollUp?.classList.toggle('show-scroll', y >= 350)
      sections.forEach((sec) => {
        const top = sec.offsetTop - 90
        const link = document.querySelector(`.nav__link[href="#${sec.id}"]`)
        link?.classList.toggle('active-link', y >= top && y < top + sec.offsetHeight)
      })
    }
    window.addEventListener('scroll', onScroll)
    onScroll()

    return () => {
      navToggle?.removeEventListener('click', openMenu)
      navClose?.removeEventListener('click', closeMenu)
      navLinks.forEach((l) => l.removeEventListener('click', closeMenu))
      themeBtn?.removeEventListener('click', onTheme)
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  return null
}
