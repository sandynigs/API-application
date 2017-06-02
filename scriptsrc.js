function call_user_api() {
	oReq = new XMLHttpRequest() ;
	var input = document.getElementById("handles").value ;
	var api = "http://codeforces.com/api/user.info?handles=" ;
	var url = api + input ;
    
    var e = document.getElementById("for-error-1") ;
    e.style.display = 'none';

    var o = document.getElementById("for-output-1") ;
    o.style.display = 'none' ;


    oReq.open("GET", url, true) ;
    oReq.addEventListener("error", function() { e.style.display = 'inline'; document.getElementById("error-sentence-1").innerHTML = "Something went wrong! Check your input or internet connection." ; }) ;
    oReq.send() ;  
    oReq.onreadystatechange = function() {
        if (oReq.readyState == 4) {
            var jsonObj = JSON.parse(oReq.responseText) ;
            o.style.display = 'inline' ;
            
            document.getElementById("show-titlePhoto").innerHTML = "<img src=" + jsonObj.result[0].titlePhoto + " alt = titlePhoto style='width:75px;height:75px;' >"  ;
            document.getElementById("show-firstname").innerHTML = "First Name :  " + jsonObj.result[0].firstName + "<br/>"  ;
            document.getElementById("show-lastname").innerHTML = "Last Name :  " + jsonObj.result[0].lastName + "<br/>"  ;
            document.getElementById("show-handle").innerHTML = "Handle :  " + jsonObj.result[0].handle + "<br/>"  ; 
            document.getElementById("show-city").innerHTML = "City :  " + jsonObj.result[0].city + "<br/>"  ;
            document.getElementById("show-organization").innerHTML = "Organization :  " + jsonObj.result[0].organization + "<br/>"  ;
            document.getElementById("show-rank").innerHTML = "Rank :  " + jsonObj.result[0].rank + "<br/>"  ;
            document.getElementById("show-maxrank").innerHTML = "Max Rank :  " + jsonObj.result[0].maxRank + "<br/>"  ;
            document.getElementById("show-rating").innerHTML = "Rating :  " + jsonObj.result[0].rating + "<br/>" ;
            document.getElementById("show-max-rating").innerHTML = "Max Rating :  " +jsonObj.result[0].maxRating + "<br/>" ;
            document.getElementById("show-contribution").innerHTML = "Contributions :   " + jsonObj.result[0].contribution + "<br/>" ;
            document.getElementById("show-friendscount").innerHTML = "Total Friends :  " + jsonObj.result[0].friendOfCount + "<br/>"  ;
            
        }
    }
}

function call_contest_standing() {
    oReq = new XMLHttpRequest() ;
    var input = document.getElementById("contest-id").value ;
    var api = " http://codeforces.com/api/contest.standings?contestId=" ; 
    var rem = "&from=1&count=50&showUnofficial=true" ;
    var url = api + input + rem ; var jsonObj ;

    var e = document.getElementById("for-error-4") ;
    e.style.display = 'none';

    var o = document.getElementById("for-output-4") ;
    o.style.display = 'none' ;



    oReq.open("GET", url, true);
    var table = document.getElementById("rank-list") ;
    var x = document.getElementById("rank-list").rows.length ;
            if (x > 0) {
                while (x > 0) {
                    document.getElementById("rank-list").deleteRow(0);
                    x = document.getElementById("rank-list").rows.length ;
                }
            }

    oReq.addEventListener("error", function() { e.style.display = 'inline'; document.getElementById("error-sentence-4").innerHTML = "Something went wrong! Check your input or internet connection." ; }) ;
    oReq.send();
    oReq.onreadystatechange = function() {
        
        if (oReq.readyState == 4) {
            jsonObj = JSON.parse(oReq.responseText);
            o.style.display = 'inline' ;

            //document.getElementById("the-rank-list").innerHTML = "The Rank list is : " + "<br/>" ;
            var len = Object.keys(jsonObj.result.rows).length ;
            for (var i = 0 ; i < len ; i++) {
                var row = table.insertRow(i); 
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                if (i == 0) {
                    cell1.innerHTML = "Rank        " ;
                    cell2.innerHTML = "Handle        " ;
                    cell3.innerHTML = "Points        " ;   
                }
                else {
                    cell2.innerHTML = jsonObj.result.rows[i - 1].party.members[0].handle + "        " ;
                    cell1.innerHTML = jsonObj.result.rows[i - 1].rank + "        "  ;
                    cell3.innerHTML = jsonObj.result.rows[i - 1].points ; 
                }
            }
        }
    }
}


function call_rating_change() {
    oReq = new XMLHttpRequest() ;
    var input = document.getElementById("contest-id-for-change").value ;
    var api = "http://codeforces.com/api/contest.ratingChanges?contestId=" ; 
    var url = api + input ; var jsonObj ;

    var e = document.getElementById("for-error-5") ;
    e.style.display = 'none';

    var o = document.getElementById("for-output-5") ;
    o.style.display = 'none' ;
    
    oReq.open("GET", url, true) ;
    oReq.addEventListener("error", function() { e.style.display = 'inline'; document.getElementById("error-sentence-5").innerHTML = "Something went wrong! Check your input or internet connection." ; }) ;
    oReq.send() ;
    oReq.onreadystatechange = function() {
        
        if (oReq.readyState == 4) {
            jsonObj = JSON.parse(oReq.responseText);
            o.style.display = 'inline' ;

            document.getElementById("the-ratings-list").innerHTML = "The Ratings list for the constest " + jsonObj.result[0].contestName + " is : " + "<br/>" ;
            var table = document.getElementById("ratings-list") ;
            var len = Object.keys(jsonObj.result).length ;
            /*Edit Here*/
            var x = document.getElementById("ratings-list").rows.length ;
            if (x > 0) {
                while (x > 0) {
                    document.getElementById("ratings-list").deleteRow(0);
                    x = document.getElementById("ratings-list").rows.length ;
                }
            }
            for (var i = 0 ; i < len ; i++) {
                var row = table.insertRow(i) ;
                var cell1 = row.insertCell(0) ;
                var cell2 = row.insertCell(1) ;
                var cell3 = row.insertCell(2) ;
                var cell4 = row.insertCell(3) ;
                if (i == 0) {
                    cell1.innerHTML = "    Rank        " ;
                    cell2.innerHTML = "    Handle        " ;
                    cell3.innerHTML = "    Old Rating        " ;
                    cell4.innerHTML = "    New Rating        " ;    
                }
                else {
                    cell1.innerHTML = "        " + jsonObj.result[i - 1].rank + "        " ;
                    cell2.innerHTML = "        " + jsonObj.result[i - 1].handle + "        "  ; 
                    cell3.innerHTML = "        " + jsonObj.result[i - 1].oldRating + "        "  ;
                    cell4.innerHTML = "        " + jsonObj.result[i - 1].newRating + "        "  ;
                }
            }
        }
    }
}


function call_history() {
    oReq = new XMLHttpRequest() ;
    var input = document.getElementById("handle_history_in").value ;
    var api = " http://codeforces.com/api/user.rating?handle=" ; 
    var url = api + input ; var jsonObj ;

    var e = document.getElementById("for-error-2") ;
    e.style.display = 'none';

    var o = document.getElementById("for-output-2") ;
    o.style.display = 'none' ;

    oReq.open("GET", url, true);
    oReq.addEventListener("error", function() { e.style.display = 'inline'; document.getElementById("error-sentence-2").innerHTML = "Something went wrong! Check your input or internet connection." ; }) ;
    oReq.send();
    oReq.onreadystatechange = function() {
        
        if (oReq.readyState == 4) {
            jsonObj = JSON.parse(oReq.responseText) ;
            o.style.display = 'inline' ;

            var len = Object.keys(jsonObj.result).length ;
            document.getElementById("previous-ratings-list").innerHTML = "The previous ratings list for the user " + input + " is : " + "<br/>" ;
            var table = document.getElementById("old-ratings-list") ;
            
            var x = document.getElementById("old-ratings-list").rows.length ;
            if (x > 0) {
                while (x > 0) {
                    document.getElementById("old-ratings-list").deleteRow(0);
                    x = document.getElementById("old-ratings-list").rows.length ;
                }
            }
            for (var i = 0 ; i < len ; i++) {
                var row = table.insertRow(i) ;
                var cell1 = row.insertCell(0) ;
                var cell2 = row.insertCell(1) ;
                var cell3 = row.insertCell(2) ;
                var cell4 = row.insertCell(3) ;
                var cell5 = row.insertCell(4) ;
                if (i == 0) {
                    cell1.innerHTML = "    Contest-Id        " ;
                    cell2.innerHTML = "    Name of the Contest        " ;
                    cell3.innerHTML = "    Rank        " ;
                    cell4.innerHTML = "    Old Rating        " ;
                    cell5.innerHTML = "    New Rating        " ;    
                }
                else {
                    cell1.innerHTML = "        " + jsonObj.result[i - 1].contestId + "        " ;
                    cell2.innerHTML = "        " + jsonObj.result[i - 1].contestName + "        "  ; 
                    cell3.innerHTML = "        " + jsonObj.result[i - 1].rank + "        "  ;
                    cell4.innerHTML = "        " + jsonObj.result[i - 1].oldRating + "        "  ;
                    cell5.innerHTML = "        " + jsonObj.result[i - 1].newRating + "        "  ;
                }
            }
        }
    }
}


function call_blog() {
    oReq = new XMLHttpRequest() ;
    var input = document.getElementById("blog-id").value ;
    var api = "http://codeforces.com/api/blogEntry.view?blogEntryId=" ; 
    var url = api + input ; var jsonObj ;

    var e = document.getElementById("for-error-7") ;
    e.style.display = 'none';

    var o = document.getElementById("for-output-7") ;
    o.style.display = 'none' ;

    oReq.open("GET", url, true);
    oReq.addEventListener("error", function() { e.style.display = 'inline'; document.getElementById("error-sentence-7").innerHTML = "Something went wrong! Check your input or internet connection." ; }) ;
    oReq.send();
    oReq.onreadystatechange = function() {
        
        if (oReq.readyState == 4) {
            jsonObj = JSON.parse(oReq.responseText) ;
            o.style.display = 'inline' ;

            document.getElementById("blog-content").innerHTML = "Title :  " + jsonObj.result.title + "<br/>" + "Author : " + jsonObj.result.authorHandle + "<br/>" + jsonObj.result.content ;
        }
    }
}

function call_blog_comment() {
    oReq = new XMLHttpRequest() ;
    var input = document.getElementById("blog-id-comments").value ;
    var api = "http://codeforces.com/api/blogEntry.comments?blogEntryId=" ; 
    var url = api + input ; var jsonObj ;

    var e = document.getElementById("for-error-8") ;
    e.style.display = 'none';

    var o = document.getElementById("for-output-8") ;
    o.style.display = 'none' ;

    oReq.open("GET", url, true);
    oReq.addEventListener("error", function() { e.style.display = 'inline'; document.getElementById("error-sentence-8").innerHTML = "Something went wrong! Check your input or internet connection." ; }) ;
    oReq.send();
    oReq.onreadystatechange = function() {
        
        if (oReq.readyState == 4) {
            jsonObj = JSON.parse(oReq.responseText) ;
            o.style.display = 'inline' ;


            var len = Object.keys(jsonObj.result).length ;
            var table = document.getElementById("comments-list") ;
            /*Edit Here*/
            var x = document.getElementById("comments-list").rows.length ;
            if (x > 0) {
                while (x > 0) {
                    document.getElementById("comments-list").deleteRow(0);
                    x = document.getElementById("comments-list").rows.length ;
                }
            }
            for (var i = 0 ; i < len ; i++) {
                var row = table.insertRow(i) ;
                var cell1 = row.insertCell(0) ;
                cell1.innerHTML = "User  :      "  + jsonObj.result[i].commentatorHandle + "<br/>Comment  :      " + jsonObj.result[i].text + "<br/>" ;    
            }
            
        }
    }
}


function call_problem_tag() {
    oReq = new XMLHttpRequest() ;
    var input = document.getElementById("tag").value ;
    var api = "http://codeforces.com/api/problemset.problems?tags=" ; 
    var url = api + input ; var jsonObj ;
    
    var e = document.getElementById("for-error-3") ;
    e.style.display = 'none';

    var o = document.getElementById("for-output-3") ;
    o.style.display = 'none' ;
    
    oReq.open("GET", url, true) ;
    oReq.addEventListener("error", function() {  e.style.display = 'inline'; document.getElementById("error-sentence-3").innerHTML = "Something went wrong! Check your input or internet connection." ; }) ;
    oReq.send() ;
    oReq.onreadystatechange = function() {
        
        if (oReq.readyState == 4) {
            jsonObj = JSON.parse(oReq.responseText) ;
            o.style.display = 'inline' ;


            var len = Object.keys(jsonObj.result.problems).length ;
            document.getElementById("Problem-list").innerHTML = "List of problems with with tag " + "'" + input + "'" + " : <br/>" ;
            var table = document.getElementById("Problem-list-tag") ;
            var x = document.getElementById("Problem-list-tag").rows.length ;
            if (x > 0) {
                while (x > 0) {
                    document.getElementById("Problem-list-tag").deleteRow(0);
                    x = document.getElementById("Problem-list-tag").rows.length ;
                }
            }
            for (var i = 0 ; i < len ; i++) {
                var row = table.insertRow(i) ;
                var cell1 = row.insertCell(0) ;
                var cell2 = row.insertCell(1) ;
                var cell3 = row.insertCell(2) ;
                if (i == 0) {
                    cell1.innerHTML = "    Contest-Id        " ;
                    cell2.innerHTML = "    Index        " ;
                    cell3.innerHTML = "    Problem  Name        " ;    
                }
                else {
                    var short_url = "http://codeforces.com/problemset/problem/" ;
                    var prob_link = short_url + "/" + jsonObj.result.problems[i].contestId + "/" + jsonObj.result.problems[i].index ;
                    cell1.innerHTML = "        " + jsonObj.result.problems[i].contestId + "        " ;
                    cell2.innerHTML = "        " + jsonObj.result.problems[i].index + "        "  ; 
                    cell3.innerHTML = "<a href=" + prob_link + ">" + jsonObj.result.problems[i].name + "</a>" ;
                }
            }
        }
    }
}

function call_available() {
    oReq = new XMLHttpRequest() ;
    var api = "http://codeforces.com/api/contest.list?gym=false" ; 
    var url = api ; var jsonObj ;


    var e = document.getElementById("for-error-9") ;
    e.style.display = 'none';

    var o = document.getElementById("for-output-9") ;
    o.style.display = 'none' ;


    oReq.open("GET", url, true) ;
    oReq.addEventListener("error", function() { e.style.display = 'inline'; document.getElementById("error-sentence-9").innerHTML = "Something went wrong! Check your input or internet connection." ; }) ;
    oReq.send() ;
    oReq.onreadystatechange = function() {
        
        if (oReq.readyState == 4) {
            jsonObj = JSON.parse(oReq.responseText) ;
            o.style.display = 'inline' ;



            var len = Object.keys(jsonObj.result).length ;
            var table = document.getElementById("avlb-contest-list") ;
            var x = document.getElementById("avlb-contest-list").rows.length ;
            if (x > 0) {
                while (x > 0) {
                    document.getElementById("avlb-contest-list").deleteRow(0);
                    x = document.getElementById("avlb-contest-list").rows.length ;
                }
            }
            for (var i = 0 ; i < len ; i++) {
                var row = table.insertRow(i) ;
                var cell1 = row.insertCell(0) ;
                var cell2 = row.insertCell(1) ;
                var cell3 = row.insertCell(2) ;
                var cell4 = row.insertCell(3) ;
                var cell5 = row.insertCell(4) ;
                if (i == 0) {
                    cell1.innerHTML = "    Contest-Id        " ;
                    cell2.innerHTML = "    Index        " ;
                    cell3.innerHTML = "    Type        " ;
                    cell4.innerHTML = "    Phase        " ;
                    cell5.innerHTML = "    Duration (seconds)       " ;    
                }
                else {
                    cell1.innerHTML = "        " + jsonObj.result[i - 1].id + "        " ;
                    cell2.innerHTML = "        " + jsonObj.result[i - 1].name + "        "  ; 
                    cell3.innerHTML = "        " + jsonObj.result[i - 1].type + "        "  ;
                    cell4.innerHTML = "        " + jsonObj.result[i - 1].phase + "        "  ;
                    cell5.innerHTML = "        " + jsonObj.result[i - 1].durationSeconds + "        "  ;
                }
            }
        }
    }
}


function call_blog_by_handle() {
    oReq = new XMLHttpRequest() ;
    var input = document.getElementById("user-handle-blog").value ;
    var api = "http://codeforces.com/api/user.blogEntries?handle=" ; 
    var url = api + input ; var jsonObj ;


    var e = document.getElementById("for-error-6") ;
    e.style.display = 'none';

    var o = document.getElementById("for-output-6") ;
    o.style.display = 'none' ;


    oReq.open("GET", url, true);
    oReq.addEventListener("error", function() { e.style.display = 'inline'; document.getElementById("error-sentence-6").innerHTML = "Something went wrong! Check your input or internet connection." ; }) ;
    oReq.send();
    oReq.onreadystatechange = function() {
        
        if (oReq.readyState == 4) {
            jsonObj = JSON.parse(oReq.responseText) ;
            o.style.display = 'inline' ;


            var len = Object.keys(jsonObj.result).length ;
            var table = document.getElementById("author-blog-details") ;
            /*Edit Here*/
            var x = document.getElementById("author-blog-details").rows.length ;
            if (x > 0) {
                while (x > 0) {
                    document.getElementById("author-blog-details").deleteRow(0);
                    x = document.getElementById("author-blog-details").rows.length ;
                }
            }
            for (var i = 0 ; i < len ; i++) {
                var row = table.insertRow(i) ;
                var cell1 = row.insertCell(0) ;
                var cell2 = row.insertCell(1) ;
                var cell3 = row.insertCell(2) ;
                var cell4 = row.insertCell(3) ;
                if (i == 0) {
                    cell1.innerHTML = "    Blog-Id        " ;
                    cell2.innerHTML = "    Title        " ;
                    cell3.innerHTML = "    Rating        " ;
                    cell4.innerHTML = "    Locale        " ; 
                }
                else {
                    var short_url = "http://codeforces.com/blog/entry/" ;
                    var blog_link = short_url + jsonObj.result[i - 1].id  ;
                    cell1.innerHTML =  jsonObj.result[i - 1].id + "        " ;
                    cell2.innerHTML = "<a href=" + blog_link + ">" + jsonObj.result[i].title + "</a>" ; 
                    cell3.innerHTML =  jsonObj.result[i - 1].rating + "        "  ;
                    cell4.innerHTML =  jsonObj.result[i - 1].locale + "        "  ;
                }
            }
        }
    }
}

