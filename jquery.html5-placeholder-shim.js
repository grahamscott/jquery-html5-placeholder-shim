(function($) {
    $.fn.placeholderShim = function(method) {

        var methods = {

            init : function(options) {
                var settings = this.placeholderShim.settings = $.extend({}, this.placeholderShim.defaults, options);
                return this.each(function() {
                    var $element = $(this),
                         element = this;
                    
                    if($element.data('placeholder')){
                        return true;
                    }
        
                    var ol = $('<label />');

                    ol.text($element.attr('placeholder'));
                    ol.addClass(settings.cls);
                            ol.css({ 
                                position:'absolute', 
                                display: 'inline',
                                float:'none',
                                overflow:'hidden', 
                                whiteSpace:'nowrap',
                                textAlign: 'left',
                                color: settings.color, 
                                cursor: 'text',
                                fontSize: parseInt($element.height() * .85)
                            });
                            ol.css(helpers.calcPositionCss(element, settings));
                            ol.data('target', $element);
                            ol.click(function(){
                                $element.data('target').focus()
                            });
                            ol.insertAfter($element);
                    
                    $element
                        .data('placeholder',ol)
                        .focus(function(){
                            ol.hide();
                        })
                        .blur(function() {
                            ol[$element.val().length ? 'hide' : 'show']();
                            })
                        .triggerHandler('blur');
                    
                    $(window).resize(function() {
                        var $target = ol.data('target');
                        ol.css(helpers.calcPositionCss($target, settings));
                    });
                });
            }
        }

        var helpers = {
            calcPositionCss: function(target, settings)
            {
                var op = $(target).offsetParent().offset(),
                    ot = $(target).offset();
                
                return {
                    top: ot.top - op.top + ($(target).outerHeight() - $(target).height()) /2 + $(target).height()*.07,
                    left: ot.left - op.left + settings.lr_padding,
                    width: $(target).width() - settings.lr_padding
                };
            }
        }

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error( 'Method "' +  method + '" does not exist in placeholderShim plugin!');
        }

    }

    $.fn.placeholderShim.defaults = {
        color: '#888',
        cls: 'placeholder_shim',
        lr_padding:4
    }

    $.fn.placeholderShim.settings = {}

})(jQuery);