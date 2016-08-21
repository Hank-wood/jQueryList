function showAnimationNumber(x,y,num) {
	var numberCell=$('#number_cell_'+x+"_"+y);
		numberCell.css({
			'backgroundColor':getNumberBackgroundColor(num),
			'color':getNumberColor(num)
		}).text(num);
		numberCell.animate({
			"width":'100px',
			"height":'100px',
			"top":getTop(x,y),
			"left":getLeft(x,y)
		},50)
}
function showAnimationMove(row1,col1,row2,col2) {
	var numberCell=$('#number_cell_'+row1+'_'+col1);
		numberCell.animate({
			top:getTop(row2,col2),
			left:getLeft(row2,col2)
		},200)
}