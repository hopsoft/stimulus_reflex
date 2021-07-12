document.addEventListener('stimulus-reflex:before', event => {
  if (window.Turbo) {
    window.Turbo.navigator.adapter.progressBar.setValue(0)
    window.Turbo.navigator.adapter.progressBar.show()
  }

  if (window.Turbolinks) {
    window.Turbolinks.adapter.progressBar.setValue(0)
    window.Turbolinks.adapter.progressBar.show()
  }
})

document.addEventListener('stimulus-reflex:after', event => {
  if (window.Turbo) {
    window.Turbo.navigator.adapter.progressBar.setValue(100)
    window.Turbo.navigator.adapter.progressBar.hide()
  }

  if (window.Turbolinks) {
    window.Turbolinks.adapter.progressBar.setValue(100)
    window.Turbolinks.adapter.progressBar.hide()
  }
})
