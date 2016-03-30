/*Skip to content
 
 
Search…
All gists
GitHub
New gist @guzmonne
  Unstar 18
  Fork 2
  @cklanaccklanac/Javascript OO Cheat Sheet
Last active 5 days ago
Embed  
<script src="https://gist.github.com/cklanac/1433963.js"></script>
  Download ZIP
 Code  Revisions 5  Stars 17  Forks 2
Javascript OO Cheat Sheet
Raw  Javascript OO Cheat Sheet
/*
/***********************************************************************************************************************
***********************************************************************************************************************
* CONTENTS: 
* Native Object
* Object Literal
* Basic Object
* Psuedo-Class
* Self Executing/Invoking Structure
* Lazy Function
* Module Pattern
* Reveal Module Pattern
* Singleton Module
* "Real" Singleton
* Widget Pattern
* Curried Function
* JR's Simple Javascript Inheritance
* jQuery Plugin Pattern

***********************************************************************************************************************
***********************************************************************************************************************/


/***********************************************************************************************************************
* Object
* Work with Intellij Structure but Object Literal works slightly better
*/
var NewObject = new Object();
NewObject.foo = 123;
NewObject.bar = 123;
NewObject.method = function(){
 //do stuff
};

/***********************************************************************************************************************
* Object Literal (Static Class, psuedo-Singleton)
* Object Literal is often confused with Singleton, it's similar to a Static Class
* Object Literals don't have Function.prototype and Function.prototype.constructor
* Singletons are instance of a class which can only be create once
*/
var ObjectLiteral = {
    foo : 123,
    bar : 456,
    method : function() {
        //do stuff
    }
};

/***********************************************************************************************************************
* Simple Javascript Psuedo-Class (Object Constructor, Object Prototype and Prototype Chaining)
* Technically these are Object Constructors not Classes since classes implies datatypes which javascript doesn't support
* Reference:
* http://helephant.com/2008/09/constructor-functions/
* http://helephant.com/2009/01/javascript-object-prototype/
* http://helephant.com/2009/08/javascript-prototype-chaining/
*
* Pros:
* Javascript 101 so it's easy to understand.
* No External libraries or custom create, init, extend or inherit needed
* Works well with IDE's code completion
* Cons:
* Classically trained people don't like it
*
* Sort of works with Intellij Structure...
* Occassionally it gets confused and loses the Constructors properties and methods
*/
function SimpleClass() {
    this.x = 123;
    this.y = 456;
    this.instanceMethod = function() {
        //Specific to the instance
    }
}
/** Caution: Object Prototype Overwrite
* NOTE don't use object literal. It overwrites the SimpleClass.prototype.constructor
* SimpleClass.prototype = {
* foo = function(){},
* bar = function(){}
* }
* Fix for the constructor.
* SimpleClass.prototype = {
* foo : function(){},
* bar : function(){}, `
* constructor : SimpleClass
* }
*/
SimpleClass.prototype.protoMethod = function() {
    //Same across all object of the same class
};

/**
* a static function (aka class or shared function) lives on the Object but does not have access to the instance.
* http://www.komodomedia.com/blog/2008/09/javascript-classes-for-n00bs
* It seems a bit superfluous since we can create a prototype function
**/
SimpleClass.staticMember = 555;
SimpleClass.staticFunction = function() {
    return new Date();
};

var simpleObject = new SimpleClass();
simpleObject.foo();

SimpleSubClass.prototype = new A;
SimpleSubClass.prototype.constructor = SimpleSubClass;
function SimpleSubClass() {
    SimpleClass.call(this);
    this.z = 555;
}
SimpleSubClass.prototype.protoMethod = function() {
    //Overrides SimpleClass.protoMethod
    SimpleClass.prototype.protoMethod.call(this); //call super class method
};
SimpleSubClass.prototype.protoMethodSub = function() {
    //define new SimpleSubClass method
};

var simpleSubObject = new SimpleSubClass();
console.log(simpleSubObject instanceof SimpleObject); //true
console.log(simpleSubObject instanceof SimpleSubObject); //true

/***********************************************************************************************************************
* Self Executing/Invoking Anonymous Function
* Good for intensive computations once at loadtime
* Work with Intellij Structure
**/
var selfExecuting = (function() {
    var result = true; 
    //result = "intensive calculation goes here"
    return result;
})();

console.log(selfExecuting);

/***********************************************************************************************************************
* Lazy Function Pattern using closure
* Good for intensive computations once at runtime
* http://michaux.ca/articles/lazy-function-definition-pattern
* Work with Intellij Structure
**/
function lazyOuter() {
    var closed = new Date();
    //closed = "intensive calculation goes here"
    return function lazyInner() {
        console.log(closed);
    };
}
//First call to outer gets date and returns a new function which "closes-over" the date
//All subsequent calls to "outer" are actually calling "inner" so the date is the same.
outer();
outer();
outer();

/***********************************************************************************************************************
* Module Pattern by Cornford/Crockford
* Module Pattern is often confused with Singleton. Modules don't have Function.prototype and Function.prototype.constructor
* http://jibbering.com/faq/notes/closures/#clEncap
* http://www.crockford.com/javascript/private.html
* Work surprisingly well with Intellij Structure
**/

var Module = (function() {
    var privateVar;

    function privateMethod() {
        // ...
    }

    return { // public interface
        publicMethod1: function () {
            // private members can be accessed here
        },
        publicMethod2: function () {
            // ...
        }
    };
})();

/***********************************************************************************************************************
* Reveal Module Pattern:
* Same as the Module patterns but returns an object literal which maps public methods to private functions
* http://www.wait-till-i.com/2007/08/22/again-with-the-module-pattern-reveal-something-to-the-world/
* Work surprisingly well with Intellij Structure
**/

var RevealModule = (function() {
    var privateVar;

    function privateMethod() {
        // ...
    }

    function publicMethod1() {
        // private members can be accessed here
    }

    function publicMethod2() {
        // ...
    }

    return { // public interface
        pub1 : publicMethod1,
        pub2 : publicMethod2
    };
})();

/***********************************************************************************************************************
* Singleton Using a module, closure and function redefinition
* Allows for private variables and function closed in scope
* Function.constructor property for debugger
* http://stackoverflow.com/questions/1895635/javascript-singleton-question
*/
//This version isn't preferred since it is confusing to follow and causes problems with debugging.

/*function SingletonModule() {
    var instance = (function() {
    var privateVar;

    function privateMethod() {
        // ...
    }

    return { // public interface
        publicMethod1: function () {
            // private members can be accessed here
        },
        publicMethod2: function () {
            // ...
        }
    };
})();

SingletonModule = function SingletonModule() { // re-define the function for subsequent calls
    return instance;
};

// call the new function
return SingletonModule();

}*/

//console.log(singleton)
//console.log(typeof singleton == 'function')
//console.log(singleton() == singleton())
//console.log(singleton() === singleton())
//console.log(singleton.prototype)
//console.log(singleton.prototype.constructor)
//console.log(singleton.name)

/***********************************************************************************************************************
* Real Singletons
* Allows for private variables and function closed in scope
* Singletons are instantiated from classes so they have prototype chains and constructor reference
* http://stackoverflow.com/questions/1895635/javascript-singleton-question
*
* Confuses Intellij Structure.
* singletion() appears as a private despite being global
* methods and properties are not shown
*/
(function (global) {
    var singleton;
    function Singleton () {
        // singleton does have a constructor that should only be used once
        this.foo = "bar";
        delete Singleton; // disappear the constructor if you want
    }
    Singleton.prototype.log = function(){
        console.log('hello, ', this)
    };

    global.singleton = function singleton() {
        return singleton || (singleton = new Singleton());
    };
})(window);

console.log(singleton)
console.log(typeof singleton == 'function')
console.log(singleton() == singleton())
console.log(singleton() === singleton())
console.log(singleton.prototype)
console.log(singleton.prototype.constructor)
console.log(singleton.name)

/***********************************************************************************************************************
* Javascript Widget Pattern Using the Module Pattern
* http://michaux.ca/articles/how-i-write-javascript-widgets
* NOTE: this pattern is used by John Resig for SimpleJavaScriptInheritance
*
* Pros
* "global" is references "this" which is returned to the global namespace
* Anything attached to "globaL" is publically available but not internally available
* Provides an additional closure level for helper functions
*
* Cons:
* More difficult to understand and debug
* Confuse Intellij Structure
* global and helperFunction appear as private
* PublicObject doesn't appear at all
*/
(function() {
    var global = this;

    // helper functions
    var helperFunction = function(msg) {
        //...
    };

    // widget constructor function
    global.PublicObject = function() {

        // private instance methods
        var privateMethod = function() {
            //..
        };

        var anotherPrivate = function() {
            //..
        };
    
        // public instance methods
        return {
            publicMethod1 : function() {return privateMethod;},
            publicMethod2 : anotherPrivate
        };
    };
})();

/***********************************************************************************************************************
* Curried Function
* http://flesler.blogspot.com/2008/11/haskell-functions-for-javascript.html
* http://www.svendtofte.com/code/curried_javascript/
* Essentially they are partially executed functions. Or in javascripts case, they are functions which are redefined
* The new returned function will accept the additional missing parameter to complete the functions purpose.
* Pros: Convenient tool for certain circumstances
* Cons: Not widely understood
*
* Sort of works with Intellij. The primary function works, but subsequent references are lost
*/
function add(a, b) {
    if (arguments.length < 1) {
        return add;
    } else {
        if (arguments.length < 2) {
            return function(c) {
                return a + c
            }
        } else {
            return a + b;
        }
    }
}
//console.log(add(2, 2)); // alerts 4
//var adds4 = add(4); // adds4, is now a function,
//// which adds 4, to it's argument.
//console.log(adds4(5)); // alerts 9.


/***********************************************************************************************************************
* John Resig's Simple JavaScript Inheritance
* Works fairly well with Intellij Structure
* Intellij Structure fails to recognize super members in the inherited classes
* IOW: Intellij Structure does not show Ninja.foo() (.foo() is inherited from Person)
*/
var Person = Class.extend({
    init: function(isDancing) {
        this.dancing = isDancing;
    },
    foo: function(){}
});

var Ninja = Person.extend({
    init: function() {
        this._super(false);
    },
    bar: function(){}
});

var person = new Person(true);
console.log(person.dancing); // => true

var ninja = new Ninja();
console.log(ninja.dancing); // => false


/***********************************************************************************************************************
* jQuery Basic Plugin Pattern
* http://docs.jquery.com/Plugins/Authoring
*/
(function( $ ){

  $.fn.tooltip = function( options ) {

    var settings = {
      'location' : 'top',
      'background-color' : 'blue'
    };

    return this.each(function() {
      // If options exist, lets merge them
      // with our default settings
      if ( options ) {
        $.extend( settings, options );
      }

      // Tooltip plugin code here

    });

  };
})( jQuery );

/******************
*
* Full jQuery plugin template
* http://docs.jquery.com/Plugins/Authoring
*
*********************/

(function ($) {
    var methods = {
            init: function (options) {
                var settings = $.extend({
                    'location': 'top',
                    'background-color': 'blue'
                }, options);

                //NOTE: here the 'this' refers to the $ wrapped object
                return this.each(function () {
                    //NOTE: here 'this' refers to the element, re-wrap and set to $this
                    var $this = $(this),
                        data = $this.data('tooltip'),   //fetch existing data
                        tooltip = $('<div />', {        //create elements
                            text: $this.attr('title')
                        });

                    // If the plugin hasn't been initialized yet
                    if (!data) {
                        /* Do more setup stuff here */

                        $(this).data('tooltip', { //store object literal on the data attribute of the element
                            target: $this,
                            tooltip: tooltip
                        });

                    }

                    $(window).bind('over.tooltip', methods.show); //bind events to element. NOTE the event namespace ".tooltip"
                });
            },
            destroy: function () {

                return this.each(function () {
                    var $this = $(this),
                        data = $this.data('tooltip'); //fetch existing data

                    $(window).unbind('.tooltip');   //remove (unbind) namespaced events from element
                    data.tooltip.remove();          //remove element stoted on data
                    $this.removeData('tooltip');    //remove data from tooltip

                });

            },
            show: function () {
                return this.each(function () {
                    var $this = $(this);

                });
            },
            hide: function () {
                return this.each(function () {
                    var $this = $(this);

                });
            },
            update: function (content) {
                return this.each(function () {
                    var $this = $(this);

                });
            }
        };
    $.fn.tooltip = function (method) {
        // Method calling logic
        if (methods[method]) {
            return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.tooltip');
        }
    };

})(jQuery);




/** jQuery UI Plugin Template
* http://jqueryui.com/docs/Developer_Guide
* Core widget template with some additional properties and comments for clarity
*/
$.widget("ui.mywidget", {
    //options: instance level options
    options: {
        option1: "defaultValue",
        hidden: true
    },
    //_create: called on construction
    _create: function() {
        var self = this;
        //this: references the instance of the widget, commonly refferred to as 'self'
        //this.element: references the jQuery object
        // creation code for mywidget, can use this.options

        if (self.options.hidden) {
            // and this.element
            self.element
                .addClass('foobar')
                .bind('eventname', function () {})
                .hide();
        }
    },
    //_init: called on construction and re-initialization
    _init : function () {
        this.refresh(); //offloading to refresh() is common in jQuery UI widgets
    },
    refresh : function() {
        this.element.find('selector, selector')//update the HTML
            .addClass('foobar');
    },
    _privateMethod: function() {
        //private functions should be named with a leading underscore
    },
    pubicMethod: function() {
        //public functions do not have an underscore
    },
    pubicMethodWithCallback: function(x,y,z,callback) {
        var result = 1 + 1;
        console.log(x, y, z, callback);
        //_trigger looks for a callback on this.options['eventName']
        //then triggers an event named <widgetName><eventName>
        this._trigger('eventName', evt, result);
    },
    //combo getter/setter
    value: function(newValue) {
        if (newValue === undefined) {
            return this._value();
        }
        this._setOption('value', newValue);
        return this;
    },
    //_setOption: probably don't need to override the default _setOption
    //but if you do then be sure to apply the original like this
    _setOption : function (key, value) {
        if (key === 'special') {
            //do something special
        }
        $.Widget.prototype._setOption.apply(this, arguments); // default setOption
    },
    //destroy: returns the HTML to it's original state
    destroy: function() {
        this.element
            .removeClass('foobar')//remove classes the widget added
            .removeAttr(); //remove attributes the widget

        $.Widget.prototype.destroy.apply(this, arguments); // default destroy
        // now do other stuff particular to this widget
    }
});

$.extend($.ui.mywidget, {
    enhancement : function() {

    }
});
 @guzmonne
           
Write  Preview

Leave a comment
Attach files by dragging & dropping,  Choose Files selecting them, or pasting from the clipboard.
 Styling with Markdown is supported
Comment
Status API Training Shop Blog About
© 2016 GitHub, Inc. Terms Privacy Security Contact Help