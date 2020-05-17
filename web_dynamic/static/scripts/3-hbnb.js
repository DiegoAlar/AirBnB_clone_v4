document.addEventListener('DOMContentLoaded', function () {
  // this function runs when the DOM is ready, i.e. when the document has been parsed
  exec();
});

const exec = function () {
  const amenities = [];
  const amNames = [];
  const limit = 15;
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    contentType: 'application/json',
    data: '{}',
    type: 'POST',
    success: function (data) {
      console.log(data);
      for (object in data) {
        const place = data[object];
        const stPlaces = [
          '<article>',
          '<div class="title">',
          '<h2>',
          place.name,
          '</h2>',
          '<div class="price_by_night">',
          place.price_by_night,
          '</div>',
          '</div>',
          '<div class="information">',
          '<div class="max_guest">',
          place.max_guest,
          '</div>',
          '<div class="number_rooms">',
          place.number_rooms,
          '</div>',
          '<div class="number_bathrooms">',
          place.number_bathrooms,
          '</div>',
          '<div class="dscription">',
          place.descriotion,
          '</div>',
          '<article>'
        ];
        $(stPlaces.join('')).appendTo($('.places'))
      }
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
