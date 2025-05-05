setTimeout(() => {
    

    
    jQuery(function($) {

        // widget boxes
        // widget box drag & drop example
        $('#containerDashboardWorkspace .widget-container-col').sortable({
            connectWith: '.widget-container-col',
            items:'> .widget-boxx',
            handle: ace.vars['touch'] ? '.widget-title' : false,
            cancel: '.fullscreen',
            opacity:0.8,
            revert:true,
            forceHelperSize:true,
            placeholder: 'widget-placeholder',
            forcePlaceholderSize:true,
            tolerance:'pointer',
            start: function(event, ui) {
                //when an element is moved, it's parent becomes empty with almost zero height.
                //we set a min-height for it to be large enough so that later we can easily drop elements back onto it
                ui.item.parent().css({'min-height':ui.item.height()})
                //ui.sender.css({'min-height':ui.item.height() , 'background-color' : '#F5F5F5'})
                
            },
            update: function(event, ui) {
                ui.item.parent({'min-height':''})
                //p.style.removeProperty('background-color');

                //save widget positions
                var widget_order = {}
                $('#containerDashboardWorkspace .widget-container-col').each(function() {
                    var container_id = $(this).attr('id');
                    widget_order[container_id] = []
                    
                    
                    $(this).find('> .widget-box').each(function() {
                        var widget_id = $(this).attr('id');
                        widget_order[container_id].push(widget_id);
                        //now we know each container contains which widgets

                        
                    });
                });
                
                setOrderWorkspace()
                ace.data.set('demo', 'widget-order', widget_order, null, true);
            }

            
        });

        ///////////////////////
        //when a widget is shown/hidden/closed, we save its state for later retrieval
        $(document).on('shown.ace.widget hidden.ace.widget closed.ace.widget', '.widget-box', function(event) {
            var widgets = ace.data.get('demo', 'widget-state', true);
            if(widgets == null) widgets = {}

            var id = $(this).attr('id');
            widgets[id] = event.type;
            ace.data.set('demo', 'widget-state', widgets, null, true);
            
        });


        (function() {
            //restore widget order
            var container_list = ace.data.get('demo', 'widget-order', true);
            if(container_list) {
                for(var container_id in container_list) if(container_list.hasOwnProperty(container_id)) {

                    var widgets_inside_container = container_list[container_id];
                    if(widgets_inside_container.length == 0) continue;
                    
                    for(var i = 0; i < widgets_inside_container.length; i++) {
                        var widget = widgets_inside_container[i];
                        $('#'+widget).appendTo('#'+container_id);
                    }
                }
            }
            
            
            //restore widget state
            var widgets = ace.data.get('demo', 'widget-state', true);
            if(widgets != null) {
                for(var id in widgets) if(widgets.hasOwnProperty(id)) {
                    var state = widgets[id];
                    var widget = $('#'+id);
                    if
                    (
                        (state == 'shown' && widget.hasClass('collapsed'))
                        ||
                        (state == 'hidden' && !widget.hasClass('collapsed'))
                    ) 
                    {
                        widget.widget_box('toggleFast');
                    }
                    else if(state == 'closed') {
                        widget.widget_box('closeFast');
                    }
                }
            }
            
            
            $('#main-widget-container').removeClass('invisible');
            
            
            //reset saved positions and states
            $('#reset-widgets').on('click', function() {
                ace.data.remove('demo', 'widget-state');
                ace.data.remove('demo', 'widget-order');
                document.location.reload();
            });
        
        })();
    });
}, 2000);


function setOrderWorkspace(){
    var container = document.getElementById("containerDashboardWorkspace");
    var rows = container.getElementsByClassName("tblShowWorkspace");
    var dataArray = [];

    for (var i = 0; i < rows.length; i++){
        var workspaceID = rows[i].querySelector(".hiddentblWorkspaceID").value;

        dataArray.push({
            workspaceID: workspaceID,

        })
    }

    // console.log(dataArray);
    localStorage.setItem(lsDashboardWorkspaceOrder, JSON.stringify(dataArray));

}




