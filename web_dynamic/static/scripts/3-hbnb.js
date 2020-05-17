document.addEventListener('DOMContentLoaded', function () {
  // this function runs when the DOM is ready, i.e. when the document has been parsed
  exec();
});

const exec = function () {
  const amenities = [];
  const amNames = [];
  const limit = 15;
  console.log('im hereeeeeeeeeeeeeee');
  $.ajax({
    // url: 'http://localhost:5001/api/v1/places_search/',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    contentType: 'application/json',
    data: '{}',
    type: 'POST',
    success: function (res) {
      console.log(res.status);
    }
  });

  function truncateString (str, limit) {
    return str.length > limit ? str.substring(limit, -3) + '...' : str;
  }

  $('input:checkbox').change(
    function () {
      let txt = '';
      if ($(this).is(':checked')) {
        amenities.push($(this).data('id'));
        amNames.push($(this).data('name'));
      } else {
        amenities.splice($.inArray($(this), amenities), 1);
        amNames.splice($.inArray($(this), amNames), 1);
      }
      if (amNames.length === 0) {
        $('.amenities').children('h4').text(txt);
      } else {
        $.each(amNames, function (index, value) {
          if (index !== 0) {
            txt += ', ' + value;
          } else {
            txt += value;
          }
          const res = truncateString(txt, limit);
          $('.amenities').children('h4').text(res);
        });
      }
    });
};
