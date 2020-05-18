document.addEventListener('DOMContentLoaded', function () {
  // this function runs when the DOM is ready, i.e. when the document has been parsed
  exec();
});

const exec = function () {
  const amenities = [];
  const amNames = [];
  const limit = 50;
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    type: 'GET',
    dataType: 'json', // added data type
    success: function (res) {
      if (res.status === 'OK') {
        $('header #api_status').addClass('available');
      }
    }
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    contentType: 'application/json',
    data: '{}',
    type: 'POST',
    success: (data) => {
      data.forEach(object => {
        console.log(object.amenities);
        const stPlaces = [
          '<article>',
          '<div class="title_box">',
          '<h2>',
          object.name,
          '</h2>',
          '<div class="price_by_night">',
          '$' + object.price_by_night,
          '</div>',
          '</div>',
          '<div class="information">',
          '<div class="max_guest">',
          object.max_guest + ' Guest' + validatePlural(object.max_guest),
          '</div>',
          '<div class="number_rooms">',
          object.number_rooms + ' Bedroom' + validatePlural(object.number_rooms),
          '</div>',
          '<div class="number_bathrooms">',
          object.number_bathrooms + ' Bathroom' + validatePlural(object.number_bathrooms),
          '</div>',
          '</div>',
          '<div class="user">',
          '<b>Owner: </b>',
          '</div>',
          '<div class="description">',
          object.description,
          '</div>',
          '</article>'
        ];
        $(stPlaces.join('')).appendTo($('.places'));
      });
    }
  });


  $('button').click(function () {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      contentType: 'application/json',
      data: JSON.stringify({'amenities': amenities}),
      type: 'POST',
      success: (data) => {
      	$(".places").empty();
        data.forEach(object => {
          const stPlaces = [
            '<article>',
            '<div class="title_box">',
            '<h2>',
            object.name,
            '</h2>',
            '<div class="price_by_night">',
            '$' + object.price_by_night,
            '</div>',
            '</div>',
            '<div class="information">',
            '<div class="max_guest">',
            object.max_guest + ' Guest' + validatePlural(object.max_guest),
            '</div>',
            '<div class="number_rooms">',
            object.number_rooms + ' Bedroom' + validatePlural(object.number_rooms),
            '</div>',
            '<div class="number_bathrooms">',
            object.number_bathrooms + ' Bathroom' + validatePlural(object.number_bathrooms),
            '</div>',
            '</div>',
            '<div class="user">',
            '<b>Owner: </b>',
            '</div>',
            '<div class="description">',
            object.description,
            '</div>',
            '</article>'
          ];
          $(stPlaces.join('')).appendTo($('.places'));
        });
      }
    });
  });


  function truncateString (str, limit) {
    return str.length > limit ? str.substring(limit, -3) + '...' : str;
  }

  function validatePlural (num) {
    return (num !== 1) ? 's' : '';
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
