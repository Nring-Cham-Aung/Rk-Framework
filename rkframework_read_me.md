# CSS #
# animation classes
-----------------------
rk-fadein
rk-fadeout
rk-faderight
rk-fadeleft
rk-fadeup
rk-fadedown
rk-fadezoom-down
rk-fadezoom-up
rk-bounce
rk-rotate3
rk-rotate3r

##### Note ###### 
# -f and -vf can be use in those animation classess
# example --
 rk-fadein
 rk-fadein-f
 rk-fadein-vf

# **********************************************************************


# JavaScript
# Methods 

rkviewport(element,callback,offset);
# -element >>>> element is jquery selector string.
# example 
    1. <div id='id1'> something </div>   
#       rkviewport('#id1',callback,offset);
    2. <div class="class1"> something </div>
#       rkviewport('.class',callback,offset);

# -callback >>>> callback function have two parameter. first param if jquery element and second param is boolean that element is viewport in or out.
# example
    const callback = (el,res)=>{
#       el is like this "$('#id1')".
#       res is true or false.
        if(res){
            el.addClass('rk-fadein');
        }else{
            el.removeClass('rk-fadein');
        }
    }

# -offset >>>> offset is number data type. that perform viewport offset.

>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

rktoastmes(mes,position,decoration);
# -mes >>>> mes is message text you want to show
# -position >>>> position is toast message position.
# the position is two character.
# the first character is mean "t (top), m (middle), b (bottom)".
# the second character is mean "s (start), c (center), e (end)".

# example
    rktoastmes('hello message','bc',decoration);

# -decoration >>>> decoration is bootstrap btn decoration
# example 
    rktoastmes('hello message','be','btn-dark');



