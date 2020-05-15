document.addEventListener('DOMContentLoaded', function () {
    // this function runs when the DOM is ready, i.e. when the document has been parsed
    exec();
  });
  
  const exec = function () {

    let amenities = []
    $('input:checkbox').change(
        function(){
            if ($(this).is(':checked')) {
                amenities.push($(this).data('id'));
            }
            else {
                delete amenities($(this).data('id'));
            }
            console.log(amenities);
        });
    // $('#add_item').click(function () {
    //   $('UL.my_list').append('<li>Item</li>');
    // });
    // $('#remove_item').click(function () {
    //   $('UL.my_list li:last-child').remove();
    // });
    // $('#clear_list').click(function () {
    //   $('UL.my_list').empty();
    // });
  };
  