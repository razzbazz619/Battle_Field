// JavaScript source code
(function ()
{
    var val = 1000;                                     // value of score counter is set initially to 1000
    var tank = document.getElementById("tank");           // getting dom object of element having id=tank
    var hwalls = document.querySelectorAll("[hwallno]");  // array of all hwalls is returned 
    var vwall = document.querySelectorAll(".vwall");      // vwall is a class
    var scorespan = document.getElementById("scorespan");  
    var turret = document.querySelector(".turret");
    var to = document.getElementById("to");
    var container = document.getElementById("container");
    var main = document.getElementById("bdy");
    var x1, x2, y1, y2, h1, h2, w1, w2;
  
    if(tank.style.top === '')  
    {
        tank.style.top = '2px';      // initially the tank  is 1px from top
        tank.style.left = '85%';   // initially  the tank is 550px from left
        tank.direction = 'south';   // direction is an attribute of tank having initial value=south
    }

    var dx=0 , dy=0;              // initially dx and dy are zero   
    var mx = 3 , my = 3;          //value by which the tank will move 

    function onkeypress()
    {
        debugger;
        switch(window.event.which) // which event is being executed
        { 
            case 97:   // a , anti-clockwise
                {
                    dx = 0, dy = 0;
                    if (tank.direction === 'south')
                    {
                            tank.direction = 'east';
                        
                    }
                    else if (tank.direction === 'north')
                    {
                        tank.direction = 'west';
                    }
                    else if (tank.direction === 'east')
                    {
                        tank.direction = 'north';
                    }
                    else if (tank.direction === 'west')
                    {
                        tank.direction = 'south';
                    }
                    break;
                }

            case 100:  // d , clockwise
                {
                    dx = 0, dy = 0;
                    if (tank.direction === 'south')
                    {
                        tank.direction = 'west';
                    }
                    else if (tank.direction === 'north')
                    {
                        tank.direction = 'east';
                    }
                    else if (tank.direction === 'east')
                    {
                        tank.direction = 'south';
                    }
                    else if (tank.direction === 'west')
                    {
                        tank.direction = 'north';
                    }
                
                    break;
                }
                
            case 115:  // s , reverse
                {
                    if (tank.direction === 'south')
                    {
                        dy = -1 * my;
                        dx = 0;
                    }
                    else if (tank.direction === 'north')
                    {
                        dy = 1 * my;
                        dx = 0;
                    }
                    else if (tank.direction === 'east')
                    {
                        dx = -1 * mx;
                        dy = 0;
                    }
                    else if (tank.direction === 'west')
                    {
                        dx = 1 * mx;
                        dy = 0;
                    }
                
                }

                break;

            case 119: // w , forward
                {

                    if (tank.direction === 'south')
                    {
                        dy = 1 * my;
                        dx = 0;
                    }
                    else if (tank.direction === 'north')
                    {
                        dy = -1 * my;
                        dx = 0;
                    }
                    else if (tank.direction === 'east')
                    {
                        dx = 1 * mx;
                        dy = 0;
                    }
                    else if (tank.direction === 'west')
                    {
                        dx = -1 * mx;
                        dy = 0;
                    }
                }

                break;
                
        };

        tank.className = tank.direction;                 // class of dom object tank is set according to styling done in css
        var orgt = window.parseInt(tank.style.top,10);   // 10->decimal
        var orgl = window.parseInt(tank.style.left, 10);

        orgt = orgt + dy; // change is made in y co-ordinate
        orgl = orgl + dx; // change is made in x-co-ordinate
        tank.style.top = orgt + 'px';  // converted to string
        tank.style.left = orgl + '%';
        window.scrollBy(0, dy);          // scroll by y( i.e change in y at keypress)
        window.setInterval(checkStatus, 500); // we check status of game by adding function checkstatus into browser's queue immediately

    }

    window.addEventListener('keypress', onkeypress); 
    window.setInterval(score, 1000);

    function score()
    {
        val--;                       //timer in score is updated
        scorespan.innerHTML = val;
    }

    function checkStatus()
    {
         for (i = 0; i < hwalls.length ; i++) // total 8 horizontal walls
        {
            if (iscollide(tank, hwalls[i]) || iscollide(turret, hwalls[i]))  // if tank and hwall collide or turret and hwall collide
            {
                window.alert("Game Over");
            }
        }
        for (i = 0; i < vwall.length; i++)
        {
            if (iscollide(tank, vwall[i]) || iscollide(turret, vwall[i]))
            {
                window.alert("Game Over");
            }
        }

        if(!iscollide(turret,container) || !iscollide(tank,container))
        {
            window.alert("Game Over");
        }
       

        if( iscollide(tank,to)|| iscollide(turret,to) )
        {
            window.alert("Game Over->You Win");
        }


    }

    function iscollide(box1, box2)
    {
            box1 = box1.getBoundingClientRect(); // gets all the attributes of div rectangle
            box2 = box2.getBoundingClientRect(); 
            x1 = box1.left;
            x2 = box2.left;
            y1 = box1.top;
            y2 = box2.top;
            h1 = box1.height;
            h2 = box2.height;
            w1 = box1.width;
            w2 = box2.width;

            if (x1 < x2 && (x1 + w1) > x2) 
            {
                if (y1 < y2 && (y1 + h1) > y2) 
                {
                    return true;
                }
                else if (y2 < y1 && (y2 + h2) > y1) 
                {
                    return true;
                }
            }

            else if (x2 < x1 && (x2 + w2) > x1) 
            {
                if (y1 < y2 && (y1 + h1) > y2)
                {
                    return true;
                }
                else if (y2 < y1 && (y2 + h2) > y1) 
                {
                    return true;
                }
            }

            return false;
    }

   

})();