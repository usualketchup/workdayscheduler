const $currentDay = $("#currentDay");

function workdayPlanner() {
    $(document).ready(function() {

        let main = false;
        // Current data of date from moment.js
        const currentDate = moment().format('dddd, MMMM Do YYYY');
        $currentDay.text(currentDate);
      
        // Variables for 12 & 24 hous
        let currentDateHour12 = moment().format("h");
        let currentDateHour24 = moment().format("H");
      
        // Set times for after hours
        if (main) {
          currentDateHour12 = 1;
          currentDateHour24 = 13;
        }
      
        // Stored Todos from Local Storage
        // Parse the JSON string into an object
        let storedData = JSON.parse(localStorage.getItem("storedData"));
      
        // Update text array from local storage retrieval
        if (storedData !== null) {
          textArr = storedData;
        } else {
          textArr = new Array(12);
        }
      
        // Targets container div within form tag
        let $plannerDiv = $(".timeblocks");
        // Clear its DOM child elements
        $plannerDiv.empty();
        
        // Hourly calendar for a fix set of hours
        for (let hour = 9; hour <= 20; hour++) {
          // Index variable from hour offset
          let index = hour - 9;
          
          // Time row div and attributes
          const $rowDiv = $("<div>");
          $rowDiv.addClass("row plannerRow");
          $rowDiv.attr("hour-index", hour);
        
          // Time text div
          const $timeDiv = $("<div>");
          $timeDiv.addClass("col-md-1");
          $timeDiv.css("padding", "12px");
        
          // Time box value and class
          const $timeBox = $("<span>");
          $timeBox.attr("class", "timeBox");
          
          // Display hours
          let displayHour = 0;
          let ampm = "";
          if (hour <= 12) { 
            displayHour = hour;
            ampm = "AM";
          } 
          else {
            displayHour = hour - 12;
            ampm = "PM";
          }
          
          // Set text to displayHour and ampm
          $timeBox.text(`${displayHour} ${ampm}`);
      
          // Append elements
          $timeDiv.append($timeBox);
          $rowDiv.append($timeDiv);
      
          // Daily plan row input and attributes
          const $dailyPlanInput = $("<input>");
      
          $dailyPlanInput.attr("id", `input-${index}`);
          $dailyPlanInput.attr("class", "dailyPlanInput");
          $dailyPlanInput.attr("hour-index", index);
          $dailyPlanInput.attr("type", "text");
          $dailyPlanInput.css("width", "100%");
          $dailyPlanInput.css("padding", "12px");
          $dailyPlanInput.css("border", "none");
          // Data array index for specific hour 
          $dailyPlanInput.val(textArr[index]);
          
          // Daily plan input width
          let $inputDiv = $("<div>");
          $inputDiv.addClass("col-md-10");
      
          // Append elements
          $inputDiv.append($dailyPlanInput);
          $rowDiv.append($inputDiv);
      
          // Save button div and attributes
          const $saveDiv = $("<div>");
          $saveDiv.addClass("col-md-1");
      
          const $saveBtn = $("<button>");
          $saveBtn.attr("id", `saveid-${index}`);
          $saveBtn.attr("id", "saveBtn");
          $saveBtn.attr("class", "btn btn-info far fa-save saveIcon");
          $saveBtn.attr("type", "button");
          $saveBtn.attr("save-id", index);
          
          // Append elements
          $saveDiv.append($saveBtn);
          $rowDiv.append($saveDiv);
      
          // Update row color based on time
          rowColorUpdate($rowDiv, $dailyPlanInput, hour);
          
          // Append row div to planner div
          $plannerDiv.append($rowDiv);

            // Local storage save
            // Save button onclick function
            $saveBtn.on("click", function(event) {
                event.preventDefault();  
             
                let $index = $(this).attr("save-id");
                let inputId = "#input-"+$index;
                let $value = $(inputId).val();
        
                textArr[$index] = $value;
      
                localStorage.setItem("storedData", JSON.stringify(textArr));
          });  
        };
      
        // Update row color function
        function rowColorUpdate ($timeRow, $dailyPlanInput, hour) {         
          if ( hour < currentDateHour24) {
            $timeRow.css("background-color","#96a1ac")
            $dailyPlanInput.css("background-color","#96a1ac")
          } else if ( hour > currentDateHour24) {
            $timeRow.css("background-color","#80df80")
            $dailyPlanInput.css("background-color","#80df80")
          } else {
            $timeRow.css("background-color","#f7583b")
            $dailyPlanInput.css("background-color","#f7583b")
          }
        };
    });
};
workdayPlanner();