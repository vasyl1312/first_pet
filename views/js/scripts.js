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
  tempInput.value = `${value}`
  document.body.appendChild(tempInput)
  tempInput.select()
  document.execCommand('copy')
  document.body.removeChild(tempInput)
  alert('Copied')
}

function setMedia(value) {
  const link = `${value}`

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

// var ascendingOrder = true

// function sortObjects(allObj) {
//   console.log(allObj)

//   // замість цього масиву можна використовувати будь-який масив об'єктів з ключами дати
//   const objects = [{ date: '2022-01-01' }, { date: '2022-01-03' }, { date: '2022-01-02' }]

//   if (ascendingOrder) {
//     objects.sort((a, b) => new Date(a.date) - new Date(b.date))
//   } else {
//     objects.sort((a, b) => new Date(b.date) - new Date(a.date))
//   }

//   console.log(objects)
//   ascendingOrder = !ascendingOrder
// }
