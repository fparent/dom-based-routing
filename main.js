var PROJECT = (function( $, window, document, undefined ) {
    'use strict';

    var SITE = {}, UTIL = SITE;

    SITE = {
        common: {
            init: function() {
                console.log('execute generic commands everywhere...');
            }
        },

        my_module: {
            init: function() {
                console.log('execute actions specific to this controller...');

                // sample bind to finalize event
                $(document).on( 'finalized', function() {
                    console.log('actions called once eveything is executed in the controller...');
                });
            },

            my_action: function() {
                console.log('do some stuff on a specific page...');
            }
        }
    };

    UTIL = {
        _exec: function( controller, action ) {
            var ns = SITE;
            var cmd = ( action === undefined ) ? "init" : action;

            if ( controller !== '' && ns[controller] && typeof( ns[controller][cmd] ) === 'function' ) {
                ns[controller][cmd]();
            }
        },

        _init: function() {
            var body = document.body;
            var controller = body.getAttribute( 'data-controller' );
            var action = body.getAttribute( 'data-action' );

            UTIL._exec( 'common' );
            UTIL._exec( controller );
            UTIL._exec( controller, action );

            $( document ).trigger( 'finalized' );
        },

        _lang: $( 'html' ).attr( 'lang' ),

        log: function() {
            console.log('public method that could be used for logging or something');
        },

        publicParams: function ( param ) {
            console.log('param = ' + param);
        }
    };

    $( document ).ready( UTIL._init );


    return {
        log: UTIL.log,
        custom: UTIL.publicParams
    };

} ( jQuery, window, document ) );

console.log('***********');
PROJECT.log();
PROJECT.custom('val specific to this page');