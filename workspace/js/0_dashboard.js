
// generateDashboard1();
// generateChart2();


function generateDashboard1(categoryID){

    $.ajax({
        url: '/'+rootFolder+'/getRecords/getAllTaskByCategory.php',
        type: 'POST',
        data: {
            categoryID: categoryID
        },
        success: function(list) {
            // console.log(list);

            let countTotalTask = list.length;
            let countIncompleteTask = 0;
            let countCompletedTask = 0;
            let countTaskNoAssignee = 0;

            for(let index = 0; index < list.length; index++){
                if(list[index].b == "3"){
                    countCompletedTask++;
                } else {
                    countIncompleteTask++;
                }

            }
            for(let index = 0; index < list.length; index++){
                if(list[index].c == "" || list[index].c == "[]"){
                    countTaskNoAssignee++;
                }
            }

            $("#countIncompleteTask").text(countIncompleteTask);
            $("#countCompletedTask").text(countCompletedTask);
            $("#countTotalTask").text(countTotalTask);
            $("#countTaskNoAssignee").text(countTaskNoAssignee);

            FusionCharts.ready(function() {
                var myChart = new FusionCharts({
                    type: "pie2d",
                    renderAt: "chart1",
                    width: "100%",
                    height: "400",
                    dataFormat: "json",
                    dataSource: {
                        chart: 
                        {
                            caption: "Total Task By Status",
                            subcaption: "",
                            decimals: "1",
                            theme: "fusion"
                        },
                        data: [
                            {
                                label: "INCOMPLETE TASK",
                                value: countIncompleteTask
                            },
                            {
                                label: "COMPLETED",
                                value: countCompletedTask
                            },
                        ]
                    }
                }).render();
            });
            
        }
    });   
}


function generateChart2(categoryID){

    $.ajax({
        url: '/'+rootFolder+'/getRecords/getCountTaskPerActivity.php',
        type: 'POST',
        data: {
            categoryID: categoryID
        },
        success: function(list) {
            // console.log(list);

            FusionCharts.ready(function() {
                var myChart = new FusionCharts({
                    type: "column2d",
                    renderAt: "chart2",
                    width: "100%",
                    height: "400",
                    dataFormat: "json",
                    dataSource: {
                        chart: 
                        {
                            caption: "Total Task By Activities",
                            subcaption: "",
                            decimals: "1",
                            theme: "fusion",
                            plottooltext: "<b>$dataValue</b> task in $label"
                        },
                        data: list
                    }
                }).render();
            });
        }
    }); 

}
