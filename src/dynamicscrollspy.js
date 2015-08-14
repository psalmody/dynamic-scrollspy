
$(function() {

  $.fn.DynamicScrollspy = function( opts ) {
    //define opts
    opts = (typeof(opts) == 'undefined') ? {} : opts;

    //extend options priorities: passed, existing, defaults
    this.options = $.extend({},opts,this.options,{
      tH: '2',
      bH: '6',
      genIDs: false
    });

    var self = $(this);

    this.tree = {};

    function selectAllH() {
      var st = [];
      for (var i=this.options.tH; i<=this.options.bH; i++) {
        st.push('h'+i);
      }
      return $(st.join(','));
    }

    function genIDs() {
      // let's see the tag names
      selectAllH().append(function() {
        return ' ('+$(this).prop('tagName')+')'
      }).prop('id',function() {
        return $(this).prop('tagName')+(Math.floor(Math.random() * (1000 - 100))+100);
      });
    }

    function makeTree() {
      var tree = this.tree;

      $('h'+this.options.tH).each(function() {
        var item = {
          id: $(this).prop('id');

        }
      })

      return tree;
    }

    function renderTree() {

      return self.append(tree);
    }

    function scrollspy() {

      return true;
    }

    if (this.options.genIDs) genIDs();

    return this;

  }

})
