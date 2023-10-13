function autcomplete_search(_data, multiple, minimumInputLength, searchid, _placeholder) {
    m=(multiple==1)?false:true;
    placeholder=(multiple==1)?'Select a region':'';

    function matchStart(params, _data) {
      //console.log(params);
      // If there are no search terms, return all of the data
      if ($.trim(params.term) === ''){
        return null;
      }
      // Skip if there is no 'children' property
      if (typeof _data.children === 'undefined') {
        return null;
      }
      if (data.text.indexOf(params.term) > -1) {
         var modifiedData = $.extend({}, _data, true);
         modifiedData.text += ' (matched)';
         // You can return modified objects from here
         // This includes matching the `children` how you want in nested data sets
         return modifiedData;
       }
      // `data.children` contains the actual options that we are matching against
      var filteredChildren = [];
      $.each(data.children, function (idx, child) {
        if (child.text.toUpperCase().indexOf(params.term.toUpperCase()) >-1) {
          filteredChildren.push(child);
        }
      });
      // If we matched any of the timezone group's children, then set the matched children on the group
      // and return the group object
      if (filteredChildren.length) {
        var modifiedData = $.extend({}, _data, true);
        modifiedData.children = filteredChildren;
        // You can return modified objects from here
        // This includes matching the `children` how you want in nested data sets
        return modifiedData;
      }
      // Return `null` if the term should not be displayed
      return null;
    }

    $('#'+searchid).empty();
    $(document).ready(function() {
        $('#'+searchid).select2({
          allowClear: true,
          data:_data,
          multiple: m,
          minimumInputLength: minimumInputLength,
          placeholder: _placeholder,
          initSelection: function(element, callback) {
              callback(null);
          }
          });
          // $('#'+searchid).val(null).trigger('change');
    });

};