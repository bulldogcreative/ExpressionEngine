EE.publish=EE.publish||{};EE.publish.category_editor=function(){var e=[],c={},d=EE.BASE+"&C=admin_content&M=category_editor&group_id=";function a(){return +new Date}$(".edit_categories_link").each(function(){var f=this.href.substr(this.href.lastIndexOf("=")+1);$(this).data("gid",f);e.push(f)});for(i=0;i<e.length;i++){c[e[i]]=$("#cat_group_container_"+[e[i]]);c[e[i]].data("gid",e[i])}refresh_cats=function(f){c[f].text("loading...").load(d+f+"&timestamp="+a()+" .pageContents",function(g){setup_page(g,false)})};setup_page=function(g,h){if(g[0]!="<"&&h){return refresh_cats($(this).closest(".cat_group_container").data("gid"))}var f=$(this);f.parent().find("#refresh_categories").show();f.find("form").submit(function(){var l=$(this),j=l.serialize(),k=l.attr("action");$.ajax({url:k,type:"POST",data:j,dataType:"html",beforeSend:function(){f.html("loading...")},success:function(m){f.html($(m).find(".pageContents"));setup_page.call(f)}});return false});return false};function b(){var f=$(this).data("gid");if(!f){f=$(this).closest(".cat_group_container").data("gid")}c[f].text("loading...").load(this.href+"&modal=yes&timestamp="+a()+" .pageContents",setup_page);return false}$(".edit_categories_link").click(b);$.each(c,function(){this.find("a").live("click",b)});$("a#refresh_categories","#sub_hold_field_category").live("click",function(){var f=$(this).hide().nextAll("div");f.text("loading...").load(EE.BASE+"&C=content_publish&M=ajax_update_cat_fields&group_id="+f.data("gid")+"&timestamp="+a());return false})};EE.publish.save_layout=function(){var a=0,c={},b=$("#tab_menu_tabs li.current").attr("id");$(".main_tab").show();$("li:visible","#tab_menu_tabs").each(function(){if(this.id&&this.id!=""){var d=this.id.replace(/menu_/,"");c[d]={};$("#"+d).find(".publish_field").each(function(){var e=$(this);id=this.id.replace(/hold_field_/,""),percent_width=Math.round((e.width()/e.parent().width())*10)*10,temp_buttons=$("#sub_hold_field_"+id+" .markItUp ul li:eq(2)");if(temp_buttons.html()!="undefined"&&temp_buttons.css("display")!="none"){temp_buttons=true}else{temp_buttons=false}c[d][id]={visible:($(this).css("display")=="none")?false:true,collapse:($("#sub_hold_field_"+id).css("display")=="none")?true:false,htmlbuttons:temp_buttons,width:percent_width+"%"}});a++}});alert(JSON.stringify(c,null,"\t"));if(a==0){$.ee_notice(EE.publish.lang.tab_count_zero,{type:"error"})}else{if($("#layout_groups_holder input:checked").length==0){$.ee_notice(EE.publish.lang.no_member_groups,{type:"error"})}else{$.ajax({type:"POST",url:EE.BASE+"&C=content_publish&M=save_layout",data:"XID="+EE.XID+"&json_tab_layout="+json_tab_layout+"&"+$("#layout_groups_holder input").serialize()+"&channel_id="+EE.publish.channel_id,success:function(d){$.ee_notice(d,{type:"success"})}})}}};EE.publish.remove_layout=function(){if($("#layout_groups_holder input:checked").length==0){return $.ee_notice(EE.publish.lang.no_member_groups,{type:"error"})}var a="{}";$.ajax({type:"POST",url:EE.BASE+"&C=content_publish&M=save_layout",data:"XID="+EE.XID+"&json_tab_layout="+a+"&"+$("#layout_groups_holder input").serialize()+"&channel_id='.$channel_id.'&field_group='.$field_group.'",success:function(b){$.ee_notice(EE.publish.lang.layout_removed+' <a href="javascript:location=location">'+EE.publish.lang.refresh_layout+"</a>",{duration:0,type:"success"})}})};