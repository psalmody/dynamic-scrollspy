(function($) {

  $.fn.DynamicScrollspy = function(opts) {
    //define opts
    opts = (typeof(opts) == 'undefined') ? {} : opts;
    this.isinit = (typeof(this.isinit) == 'undefined') ? false : self.isinit;

    //destroy scrollspy ooption
    if (opts == 'destroy') {
      this.isinit = false;
      this.empty();
      this.off('activate.bs.scrollspy');
      $('body').removeAttr('data-spy');
      return this;
    }

    //extend options priorities: passed, existing, defaults
    this.options = $.extend({}, {
      affix: true, //use affix by default, doesn't work for Bootstrap 4
      tH: 2, //lowest-level header to be included (H2)
      bH: 6, //highest-level header to be included (H6)
      exclude: false, //jquery filter
      genIDs: false, //generate random IDs?
      offset: 100, //offset for scrollspy
      ulClassNames: 'hidden-print', //add this class to top-most UL
      activeClass: '', //active class (besides .active) to add
      testing: false //if testing, show heading tagName and ID
    }, this.options, opts);

    var self = this;

    //store tree and used random numbers
    this.tree = {};
    this.rands = [];

    //encode any text in header title to HTML entities
    function encodeHTML(value) {
      return $('<div></div>').text(value).html();
    }

    //returns jQuery object of all headers between tH and bH
    function selectAllH() {
      var st = [];
      for (var i = self.options.tH; i <= self.options.bH; i++) {
        st.push('H' + i);
      }
      return $(st.join(',')).not(self.options.exclude);
    }

    //generate random numbers; save and check saved to keep them unique
    function randID() {
      var r;

      function rand() {
        r = Math.floor(Math.random() * (1000 - 100)) + 100;
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
      selectAllH().prop('id', function() {
        // if no id prop for this header, return a random id
        return ($(this).prop('id') === '') ? $(this).prop('tagName') + (randID()) : $(this).prop('id');
      });
    }

    //check that all have id attribute
    function checkIDs() {
      var missing = 0;
      //check they exist first
      selectAllH().each(function() {
        if ($(this).prop('id') === '') {
          missing++;
        } else {
          if ($('[id="' + $(this).prop('id') + '"]').length > 1) throw new Error("DynamicScrollspy: Error! Duplicate id " + $(this).prop('id'));
        }

      });
      if (missing > 0) {
        var msg = "DynamicScrollspy: Not all headers have ids and genIDs: false.";
        throw new Error(msg);
      }
      return missing;
    }

    //testing - show IDs and tag types
    function showTesting() {
      selectAllH().append(function() {
        // let's see the tag names (for test)
        return ' (' + $(this).prop('tagName') + ', ' + $(this).prop('id') + ')';
      });
    }

    //setup the tree, (first level)
    function makeTree() {
      var tree = self.tree;
      $('H' + self.options.tH).not(self.options.exclude).each(function() {
        //run the first level
        tree[$(this).prop('id')] = {
          dstext: encodeHTML($(this).text()),
          jqel: $(this)
        };
      });

      if (self.options.tH + 1 <= self.options.bH) {
        //only recurse if more than one level requested
        itCreateTree(tree);
      }

      return tree;
    }

    //iterate through each grandchild+ level of the tree
    function itCreateTree(what) {
      for (var k in what) {
        //skip empty items
        if (k === '') continue;
        // skip if text or element
        if (k == 'dstext' || k == 'jqel') continue;
        //get the current level
        var lvl = Number($('#' + k).prop('tagName').replace('H', ''));
        //end if we are at the final level
        if (lvl >= self.options.bH) return false;
        //next until
        $('#' + k).nextUntil('H' + lvl).filter('H' + (lvl + 1)).not(self.options.exclude).each(function() {
          what[k][$(this).prop('id')] = {
            dstext: encodeHTML($(this).text()),
            jqel: $(this)
          };
        });
        //keep recursing if necessary
        if (lvl < self.options.bH) itCreateTree(what[k]);

      }
    }

    //render tree (setup first level)
    function renderTree() {
      var ul = $('<ul class="nav ' + self.options.ulClassNames + '"></ul>');
      self.append(ul);
      //then iterate three tree
      $.each(self.tree, function(k) {
        var c = self.tree[k];
        var li = '<li id="dsli' + k + '" class="nav-item"><a href="#' + k + '" class="nav-link">' + c.dstext + '</a></li>';
        ul.append(li);
        itRenderTree(self.tree[k]);
      });

      return self;
    }

    //iterate and render each subsequent level
    function itRenderTree(what) {
      //if no children, skip
      if (Object.keys(what).length < 3) return false;
      //parent element, append sub list
      var parent = $('#dsli' + what.jqel.prop('id'));
      var ul = $("<ul class='nav child'></ul>");
      parent.append(ul);
      for (var k in what) {
        //skip if text or element
        if (k == 'dstext' || k == 'jqel') continue;
        var c = what[k];
        ul.append('<li id="dsli' + k + '" class="nav-item"><a href="#' + k + '" class="nav-link">' + c.dstext + '</a></li>');
        itRenderTree(what[k]);
      }
    }

    //initialize plugin
    function init() {
      //first time (or after destroy)
      if (self.isinit === false) {
        //generate IDs
        if (self.options.genIDs) {
          genIDs();
        } else {
          checkIDs();
        }

        if (self.options.testing) showTesting();

        //make the tree
        makeTree();
        //render it
        renderTree();

        //bootstrap 4 has no affix
        if (self.options.affix && typeof(self.children('ul').affix) === 'function') {
          var ul = self.children('ul');

          self.children('ul').affix({
            offset: {
              top: function() {
                var c = ul.offset().top,
                  d = parseInt(ul.children(0).css("margin-top"), 10),
                  e = $(self).height();
                return this.top = c - e - d;
              },
              bottom: function() {
                return this.bottom = $(self).outerHeight(!0);
              }
            }
          });
        }


        $('body').attr('data-spy', 'true').scrollspy({
          target: '#' + self.prop('id'),
          offset: self.options.offset
        });

        self.isinit = true;
      } else {

        makeTree();

        renderTree();

        $('[data-spy="scroll"]').each(function() {
          $(this).scrollspy('refresh');
        });

      }



      return self;

    }



    return init();

  };

}(jQuery));
