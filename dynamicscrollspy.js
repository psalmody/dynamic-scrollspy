/**
*  AutoScrollspy v 0.0.1
*  
*/

$(function() {

  $.fn.DynamicScrollspy = function( opts ) {
    //define opts
    opts = (typeof(opts) == 'undefined') ? {} : opts;
    this.isinit = (typeof(this.isinit) == 'undefined') ? false : self.isinit;

    if (opts == 'destroy') {
      this.isinit = false;
      this.empty();
      this.off('activate.bs.scrollspy');
      $(body).removeAttr('data-spy');
      return this;
    }

    //extend options priorities: passed, existing, defaults
    this.options = $.extend({},{
      tH: 2,
      bH: 6,
      genIDs: false,
      offset: 100,
      ulClassNames: 'hidden-print',
      activeClass: 'bg-info text-info',
      testing: false
    }, this.options, opts);

    var self = this;

    this.tree = {};

    function selectAllH() {
      var st = [];
      for (var i=self.options.tH; i<=self.options.bH; i++) {
        st.push('H'+i);
      }
      return $(st.join(','));
    }

    //don't want duplicat random numbers
    this.rands = [];
    function randID() {
      var r;
      function rand() {
        r = Math.floor(Math.random() * (1000 - 100))+100;
      }
      //get first random number
      rand();
      while (self.rands.indexOf(r) >= 0) {
        //when that random is found, try again until it isn't
        rand();
      }
      //save random for later
      self.rands.push(r);
      return r;
    }

    //generate random IDs for elements if requested
    function genIDs() {
      selectAllH().prop('id',function() {
        // if no id prop for this header, return a random id
        return ($(this).prop('id') == '') ? $(this).prop('tagName')+(randID()) : $(this).prop('id');
      })
      if (self.options.testing) {
        selectAllH().append(function() {
          // let's see the tag names (for test)
          return ' ('+$(this).prop('tagName')+', '+$(this).prop('id')+')'
        });
      }
    }

    //setup the tree, (first level)
    function makeTree() {
      var tree = self.tree;

      $('H'+self.options.tH).each(function() {
        //run the first level
        tree[$(this).prop('id')] = {
          dstext: $(this).text(),
          jqel: $(this)
        }
      });

      if (self.options.tH+1 < self.options.bH) {
        //only recurse if more than one level requested
        itCreateTree(tree);
      }

      return tree;
    }

    //iterate through each grandchild+ level of the tree
    function itCreateTree( what ) {
      for (k in what) {
        // skip if text or element
        if (k == 'dstext' || k == 'jqel') continue;
        //get the current level
        var lvl = Number($('#'+k).prop('tagName').replace('H',''));
        //end if we are at the final level
        if (lvl >= self.options.bH) return false;

        //next until
        $('#'+k).nextUntil('H'+lvl).filter('H'+(lvl+1)).each(function() {
          what[k][$(this).prop('id')] = {
            dstext: $(this).text(),
            jqel: $(this)
          }
        });

        if (lvl < self.options.bH) itCreateTree( what[k] );

      }
    };

    //render tree (setup first level)
    function renderTree() {

      var ul = $('<ul class="nav '+self.options.ulClassNames+'"></ul>');
      self.append(ul);

      $.each(self.tree,function(k) {
        var c = self.tree[k];
        var li = '<li id="dsli'+k+'"><a href="#'+k+'">' + c.dstext + '</a></li>';
        ul.append(li);
        itRenderTree(self.tree[k]);
      });

      return self;
    }

    //iterate and render each subsequent level
    function itRenderTree( what ) {
      //if no children, skip
      if (Object.keys(what).length < 3) return false;
      //parent element, append sub list
      var parent = $('#dsli'+what.jqel.prop('id'));
      var ul = $("<ul class='nav child'></ul>");
      parent.append( ul );
      for (k in what) {
        //skip if text or element
        if (k == 'dstext' || k == 'jqel') continue;
        var c = what[k];
        ul.append('<li id="dsli'+k+'"><a href="#'+k+'">' + c.dstext + '</a></li>');
        itRenderTree(what[k]);
      }
    }


    function init() {

      if (self.isinit==false) {
        if (self.options.genIDs) genIDs();

        makeTree();

        renderTree();
        self.on('activate.bs.scrollspy', function () {
            var current = $('.nav li.active > a');
            $('.nav a').removeClass(self.options.activeClass);
            $('.child').hide();
            if (current.closest('ul').hasClass('child')) {
                current.closest('ul').show();
            }
            current.addClass(self.options.activeClass);
        });

        var ul = self.children('ul');

        self.children('ul').affix({
          offset: {
            top: function() {
              var c = ul.offset().top,
                d = parseInt(ul.children(0).css("margin-top"), 10),
                e = $(self).height();
              return this.top = c - e - d
            },
            bottom: function() {
              return this.bottom = $(self).outerHeight(!0)
            }
          }
        })

        $('body').attr('data-spy','true').scrollspy({ target: '#'+self.prop('id') });

        self.isinit = true;
      } else {

        makeTree();

        renderTree();

        $('[data-spy="scroll"]').each(function () {
          var $spy = $(this).scrollspy('refresh')
        })

      }



      return self;

    }



    return init();

  }

})
