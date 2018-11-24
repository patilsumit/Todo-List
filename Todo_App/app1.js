var tableElement = document.getElementById("myList");
    var count = 0;
    var del = 0;
    var i = 0;
    var d = new Date(); //Getting current date
    var c = 0;
    var e ;
    var sample = new Array();
    var sample1 = new Array();
    function addTask(){
        if(c == 0){ // Adding new task
        if((document.getElementById("taskName").value == '') || (document.getElementById("describtion").value == '')){
            return;
        }
        else{
        
        count++;
        del++;
        var d = new Date();
        var date = d.getDate()+" - "+d.getMonth()+" - "+d.getFullYear(); // retriving date only
        var time = d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();  // retriving time only
        var taskName = document.getElementById("taskName").value; 
        var taskCat = document.getElementById("taskCat").value;
        var describtion = document.getElementById("describtion").value;
        var priority = document.getElementById("taskPriority").value;
        var newTRtag = document.createElement("tr");
        newTRtag.setAttribute('id',count);
        tableElement.appendChild(newTRtag);
        addElement(taskName);
        addElement(taskCat);
        addElement(priority);
        addElement(describtion);
        addElement(date);
        addElement(time);
        addReport();

        for(j=0;j<6;j++){
        pre = document.getElementById(count+'td'+j).innerHTML;
        sample.push(pre);
        }
        localStorage.setItem('sample1',sample);
        document.getElementById("taskName").value = '';
        document.getElementById("describtion").value = '';
        document.getElementById("taskCat").value = 'Add Category';
        document.getElementById("taskPriority").value = 'Priority';
        
        // if(del != 0){ // Hiding tag
        //     document.getElementById("dis").style.display = "none"
        //     //tableElement.style.display = 'inherit';
        // }
        }
        
        }
        

        else{ // For editing the previous task
            var previousValue = [];
            for(j=0;j<6;j++){
            previousValue[j] = document.getElementById(e+'td'+j).innerHTML;
            }
            str1 = previousValue.toString();
            document.getElementById(e+'td0').innerHTML = document.getElementById("taskName").value;
            document.getElementById(e+'td1').innerHTML = document.getElementById("taskCat").value;
            document.getElementById(e+'td2').innerHTML = document.getElementById("taskPriority").value;
            document.getElementById(e+'td3').innerHTML = document.getElementById("describtion").value;
            
            var newValue = [];
            for(j=0;j<6;j++){
            newValue[j] = document.getElementById(e+'td'+j).innerHTML;
            }
            str = newValue.toString();
            sample = localStorage.getItem('sample1');
            //sample = sample.toString();
            sample = sample.replace(str1,str);
            localStorage.setItem('sample1',sample);
            
            document.getElementById("taskName").value = '';
            document.getElementById("describtion").value = '';
            document.getElementById("taskCat").value = 'Add Category';
            document.getElementById("taskPriority").value = 'Priority';
            document.getElementById("add").innerHTML = 'Add Now';
            c=0;
        }
    }


    function addElement(a){ // creating element
        var newTDtag = document.createElement("td");
        newTDtag.setAttribute('id',count+'td'+i);
        if(a == 'Add Category')
        document.getElementById(count).appendChild(newTDtag).innerHTML = 'Default';
        else if (a == 'Priority')
        document.getElementById(count).appendChild(newTDtag).innerHTML = 'Default';
        else
        document.getElementById(count).appendChild(newTDtag).innerHTML = a;
        i = i+1;
        if(i==6){
            i=0;
        }
    }


    function addReport(){ // creating buttons
        var newTDtag = document.createElement("td");
        newTDtag.setAttribute('id','report'+count);
        document.getElementById(count).appendChild(newTDtag);
        
        var newButton = document.createElement('button');
        newButton.setAttribute('id','complete'+count);
        newButton.setAttribute('class','buttonn');
        newButton.setAttribute('onclick','taskComplete(this.id)');
        document.getElementById('report'+count).appendChild(newButton).innerHTML = "Task Completed";
        
        var newButton = document.createElement('button');
        newButton.setAttribute('id','edit'+count);
        newButton.setAttribute('class','buttonn');
        newButton.setAttribute('onclick','taskEdit(this.id)');
        document.getElementById('report'+count).appendChild(newButton).innerHTML = "Edit";
        
        var newButton = document.createElement('button');
        newButton.setAttribute('id','del'+count);
        newButton.setAttribute('class','buttonn');
        newButton.setAttribute('onclick','taskDelete(this.id)');
        document.getElementById('report'+count).appendChild(newButton).innerHTML = "Delete";
    
    };

    function taskComplete(a){ // properties of buttons
        var ele = document.getElementById(a.substr(-1)+"td5").innerHTML;
        sample1.push(ele);
        localStorage.setItem("sample",sample1);
        document.getElementById(a).setAttribute("disabled",'');
        document.getElementById("edit"+a.substr(-1)).setAttribute("disabled",'');
        document.getElementById(a.substr(-1)).style.backgroundColor = "gray";
    }

    function taskDelete(a){ // properties of buttons
        var pre = [];
        for(j=0;j<6;j++){
        pre[j] = document.getElementById((a.substr(-1))+'td'+j).innerHTML;
        }
        str = pre.toString();
        str3 = document.getElementById(a.substr(-1)+'td5').innerHTML;
        sample1 = localStorage.getItem('sample');
        sample1 = sample1.replace(str,'');
        localStorage.setItem('sample',sample1);

        sample = localStorage.getItem('sample1');
        sample = sample.replace(str,'');
        localStorage.setItem('sample1',sample);
        if(document.getElementById('add').innerHTML == 'Edit Now'){
            alert("Edit Task First");
            return;
        }
        else{
        document.getElementById(a.substr(-1)).innerHTML = '';
        del -= 1;
        if (del == 0){
            document.getElementById("dis").style.display = "block";
            //tableElement.style.display = "none";
        }
    }
    }

    function taskEdit(a){ // properties of buttons
        document.getElementById("taskName").value = document.getElementById(a.substr(-1)+'td0').innerHTML;
        document.getElementById("taskCat").value = document.getElementById(a.substr(-1)+'td1').innerHTML;
        document.getElementById("taskPriority").value = document.getElementById(a.substr(-1)+'td2').innerHTML;
        document.getElementById("describtion").value = document.getElementById(a.substr(-1)+'td3').innerHTML;
        document.getElementById("add").innerHTML = 'Edit Now';
        c=1;
        e = a.substr(-1);
    }
    

        /* When the user clicks on the button, 
    toggle between hiding and showing the dropdown content */
    function myFunction(a) {
        if(a == "taskCat")
        document.getElementById("myDropdown1").classList.toggle("show");
        else
        document.getElementById("myDropdown2").classList.toggle("show");
    }

    // Close the dropdown if the user clicks outside of it
    window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
        }
        }
    }
    }

    function myFunction1(a){
        document.getElementById("taskCat").value = a;
    }
    function myFunction2(a){
        document.getElementById("taskPriority").value = a;
    }
    window.onload(restart());
    function restart(){
        if(localStorage.getItem('sample1')==undefined){
            return;
        }
        else{
        var str = localStorage.getItem("sample1");
        
        if(localStorage.getItem('sample')==undefined){
            
        }
        else{
            var str2 = localStorage.getItem("sample");
            str2 = str2.split(',');
            str2 = str2.filter(remove);
        }
        str = str.split(",");
        str = str.filter(remove);
        if(str.length>4){
        var iloop = 0;
        for(count = 1; count<=str.length/6; count++){
        var newTRtag = document.createElement("tr");
        newTRtag.setAttribute('id',count);
        tableElement.appendChild(newTRtag);
        addElement(str[iloop]);
        iloop++;
        addElement(str[iloop]);
        iloop++;
        addElement(str[iloop]);
        iloop++;
        addElement(str[iloop]);
        iloop++;
        addElement(str[iloop]);
        iloop++;
        addElement(str[iloop]);
        iloop++;
        addReport();
        if(str2==undefined){
            return;
        }
        else{
        var m = "complete"+count;
        for (n=0; n<str2.length;n++){
        if(str[iloop-1]==str2[n])
        taskComplete(m);
        }
        }
        for(j=0;j<6;j++){
        var pre = count+'td'+j;
        pre = document.getElementById(count+'td'+j).innerHTML;
        sample.push(pre);
        }
        }
        count--;
        }
    }
    }

    function remove(st){
        
        return st !== "";

    }