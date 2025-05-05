
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
            let countTaskNoTargetDate = 0;
            let countTaskPending = 0;

            const datePhils = new Date().toLocaleString('en-PH', { timeZone: 'Asia/Manila' });
            const year = new Date(datePhils).getFullYear();
            const month = String(new Date(datePhils).getMonth() + 1).padStart(2, '0'); // Adding 1 to month as it is zero-based
            const day = String(new Date(datePhils).getDate()).padStart(2, '0');
            const currentDate = `${year}-${month}-${day}`;

            for(let index = 0; index < list.length; index++){
                if(list[index].b == "3"){
                    countCompletedTask++;
                } else {
                    countIncompleteTask++;
                }

                if(list[index].c == "" || list[index].c == "[]"){
                    countTaskNoAssignee++;
                }

                if(list[index].d == "" || list[index].d == "0000-00-00"  || list[index].d == null){
                    countTaskNoTargetDate++;
                }

                if (list[index].d < currentDate && list[index].b !== "3") {
                   countTaskPending++;
                }

            }

            /*
            for(let index = 0; index < list.length; index++){
                if(list[index].c == "" || list[index].c == "[]"){
                    countTaskNoAssignee++;
                }
            }
            for(let index = 0; index < list.length; index++){
                if(list[index].d == "" || list[index].d == "0000-00-00"){
                    countTaskNoTargetDate++;
                }
            }
            
            */


            $("#countIncompleteTask").text(countIncompleteTask);
            $("#countCompletedTask").text(countCompletedTask);
            $("#countTotalTask").text(countTotalTask);
            $("#countTaskNoAssignee").text(countTaskNoAssignee);
            $("#countPendingTask").text(countTaskPending);
            $("#countTaskNoTargetDate").text(countTaskNoTargetDate);

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
                            theme: "fusion",
                            showLegend: "0",
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



function generateChart3(workspace){
    // let workspace = $("#selectWorkspace").val()

    setTimeout(() => {

        let members = JSON.parse($("#txtArrayMembers").val());
        let memberCategory = []

        for(let index = 0; index < members.length; index++){

            if(members[index].c != "1"){
                memberCategory.push({
                    label:members[index].b,
                    id:members[index].a,
                })
            }

        }
        memberCategory.push({
            label:"NO ASSIGNEE",
            id: 0,
        })

        // console.log(memberCategory);

        $.ajax({
            url: '/'+rootFolder+'/getRecords/getCountTaskByStatus.php',
            type: 'POST',
            data: {
                workspace: workspace,
            },
            success: function(list) {
                // console.log(list);

                let labelArray = [];
                let completeArray = [];
                let incompleteArray = [];

                for(let i = 0; i < memberCategory.length; i++){
                    labelArray.push({
                        label: memberCategory[i].label
                    })

                    if(memberCategory[i].id != 0){
                        let complete = 0;
                        let incomplete = 0;

                        for(let j = 0; j < list.length; j++){

                            let assignee = '["'+memberCategory[i].id+'"]';

                            if(assignee == list[j].a){
                                complete = list[j].b
                                incomplete = list[j].c
                                break;
                            }
                            
                        }

                        completeArray.push({value: complete});
                        incompleteArray.push({value: incomplete});

                    } else {
                        let complete = 0;
                        let incomplete = 0;

                        list.forEach(item => {
                            if (item.a === "" || item.a === "[]") {
                                complete += parseInt(item.b);
                                incomplete += parseInt(item.c);
                            }
                        });
                        completeArray.push({value: complete});
                        incompleteArray.push({value: incomplete});

                    }
                    
                }

                // console.log(labelArray);
                // console.log(completeArray);
                // console.log(incompleteArray);

                FusionCharts.ready(function() {
                    var myChart = new FusionCharts({
                        type: "stackedbar2d",
                        renderAt: "chart3",
                        width: "100%",
                        height: "400",
                        dataFormat: "json",
                        dataSource: {
            
                            chart: {
                                caption: "Total Task per Assignees",
                                subcaption: "",
                                yaxisname: "",
                                palettecolors: "#23c552, #f84f31",
                                plotgradientcolor: "",
                                plottooltext: "<b>$dataValue</b>, $seriesname",
                                theme: "fusion",
                                // yaxismaxvalue: "30",
                                numdivlines: "2",
                                showlegend: "1",
                                interactivelegend: "0",
                                showvalues: "0",
                                showsum: "1"
                            },
                            categories: [
                                {
                                    category: labelArray
                                }
                            ],
                            dataset: [
                                {
                                    seriesname: "Complete",
                                    data: completeArray
                                },
                                {
                                    seriesname: "Incomplete",
                                    data: incompleteArray
                                }
                            ]
                        }
            
                    }).render();
                });

                
            }
        }); 



    }, "1000");

}


// [
//     {
//         desc:"abc",
//         assignee: "josh",
//         status: "Complete",
//     },
//     {
//         desc:"def",
//         assignee: "josh",
//         status: "Incomplete",
//     },
//     {
//         desc:"defwq",
//         assignee: "josh",
//         status: "Incomplete",
//     },
//     {
//         desc:"sdf",
//         assignee: "noah",
//         status: "Complete",
//     },
//     {
//         desc:"qwe",
//         assignee: "noah",
//         status: "Complete",
//     },
// ]
