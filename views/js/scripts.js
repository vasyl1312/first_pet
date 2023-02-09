$(document).ready(function () {
  var multipleCancelButton = new Choices('#categories', {
    removeItemButton: true,
  })
})

$('.chosen-select').chosen({
  no_results_text: 'Oops, nothing found!',
})
