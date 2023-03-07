$(document).ready(function () {
  var multipleCancelButton = new Choices('#categories', {
    removeItemButton: true,
  })
})

$('.chosen-select').chosen({
  no_results_text: 'Oops, nothing found!',
})

function setClipboard(value) {
  var tempInput = document.createElement('input')
  tempInput.value = value
  document.body.appendChild(tempInput)
  tempInput.select()
  document.execCommand('copy')
  document.body.removeChild(tempInput)
  document.getElementById('copy').innerHTML = 'Copied'
  timeout = setTimeout(funcSwitch, 3000) //щоб значення кнопки не завжди було як 'скопійовано'
}

function funcSwitch() {
  document.getElementById('copy').innerHTML = 'Copy'
}

function setMedia(value) {
  const link = encodeURI(window.location.href) + `/${value}`

  const fb = document.querySelectorAll('.facebook')
  fb.forEach((fb) => {
    fb.href = `https://www.facebook.com/share.php?u=${link}`
  })

  const twitter = document.querySelectorAll('.twitter')
  twitter.forEach((twitter) => {
    twitter.href = `http://twitter.com/share?&url=${link}`
  })

  const email = document.querySelectorAll('.email')
  email.forEach((email) => {
    email.href = `mailto:?body=${link}`
  })

  const linkedIn = document.querySelectorAll('.linkedin')
  linkedIn.forEach((linkedIn) => {
    linkedIn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${link}`
  })

  const telegram = document.querySelectorAll('.telegram')
  telegram.forEach((telegram) => {
    telegram.href = `https://telegram.me/share/url?url=${link}`
  })
}
