var cellContainerSize = 10;
var cellSize = 80;
var cellC = new CellContainer(cellContainerSize, "cellContainer1"); 
var ParkingDB = [];
function Parking (className, priceInterval) {
	var _is24hour = false;
	var _isfull = false;
	var _cellPrice = 10;
    var classN;
    var priceInter = [];
    if(className == undefined) {
        classN = "parkContainer";
    }
    else {
        classN = className;
    }
    if(priceInterval == undefined) {
        priceInter = [10, 100];
    }
    else {
        priceInter = priceInterval;
    }
    var _parkTpl = [
                    '<div id = "parkingId" class="'+classN+'">',
                        '<div>',
                            '<span>'+priceInter[0]+'</span>',
                            '<input type="range" value="'+priceInter[0]+'" min="'+priceInter[0]+'" max="'+priceInter[1]+'" step="10" id="range">',
                            '<span>'+priceInter[1]+'</span>',
                            '<p>Price of a cell is <span id="valBox">'+priceInter[0]+'</span> dram.</p>',    
                        '</div>',
                        '<div>',
                            '<p>Select size of cell.</p><input id = "cSize" type = "number" value = "50">',
                            '<br><br>',
                            '<p>Select size of CellContainer.</p><input id = "cCSize" type = "number" value = "10">',
                        '</div>',

                        '<a id="save" href="index.html" target="_blank"><button>Save</button></a>',
                    '</div>'
                    ].join("");
    var _parkElem = $(_parkTpl);

    this.getParkElem = function() {
        return _parkElem;
    }

	this.renderPark = function() {
        $("body").append(this.getParkElem());
        var self = this; 
        cellC.renderCellContainer(); 
        $("#range").change(function() {
            $('#valBox').text($(this).val());
            self.setCellPrice($(this).val());
        });

        $("#save").click(function(){
            var cellArray = cellC.getCellsArray();
            var l = cellArray.length;
            var pos;
            for (var i = 0; i < l; i++) {
                pos = cellArray[i].getPosition();
                ParkingDB[i] = {x:pos[0], y:pos[1]};
            };
            console.log(JSON.stringify(ParkingDB));
           // $("#parkSave").text(JSON.stringify(ParkingDB));
        });
    }

    this.set24HourFlag = function(ff){
		_is24hour = ff;
	};
    
	this.is24Hour = function(){
		return _is24hour;
	};
    
	this.setFullFlag =function(ff){
        _isfull = ff;
	};
    
	this.isFull = function(){
		return _isfull;
	};
    
    this.setCellPrice = function(val) {
		// validation
        _cellPrice = val;
	};
    
	this.getCellPrice = function(){
		return _cellPrice;
	};
}

function CellContainer(cellContSize, cellContClass){
    var cellContS;
    var cellContCl;
    if(cellContSize == undefined) {
        cellContS = 10*(cellSize+4);
    }
    else {
        cellContS = cellContSize*(cellSize+4);
    }
    if(cellContClass == undefined) {
        cellContCl = "cellContainer";
    }
    else {
        cellContCl = cellContClass;
    }
    
	var _cells = [];
    var _cellContTpl = '<div id="cellContId" style=" width : '+cellContS+'px; height : '+cellContS+'px;" class = "'+cellContCl+'"></div>';
    var _cellContElem = $(_cellContTpl);


    this.getCellContElem = function() {
        return _cellContElem;
    }

    this.renderCellContainer = function() {
        var c1 = new Cell(cellSize, "cell1");
        $("body").append(_cellContElem);
        c1.render(this.getCellContElem());
        c1.atatchListeners();
        c1.setPosition(0,0);
    }
	this.pushCell = function(cell){
		_cells.push(cell);
	};
    
	this.getCellsArray=function(){
		return _cells;
	};
    
	this.getAllFreeCells=function(){
        // implement
    };
}

function Cell(sideSize, cellClass) {
    var _x=0, _y=0;
	var _neighbours = [];
    var sideS;
    var cellCl;
    if(sideSize == undefined) {
        sideS = 50;
    }
    else{
        sideS = sideSize;
    }
    if(cellClass == undefined) {
        cellCl = "cell";
    }
    else {
        cellCl = cellClass;
    }
    var _cellTpl = [
                    '<div id="cellId" style=" width : '+sideS+'px; height : '+sideS+'px;" class = "'+cellCl+'">',
                        '<div><p>+</p></div>',
                        '<div><p>+</p></div>',
                        '<div><p>+</p></div>',
                        '<div><p>+</p></div>',
                    '</div>'
                   ].join("");
    

    var _element = $(_cellTpl);

    this.getElement = function() {
        return _element;
    };
    
    function _renderNeigbour( cellOb, nPos) { 
        var cellElem = cellOb.getElement();
        // cellOb parent
         var parent = cellElem.parent();
        // get position jquery 
        var nc = new Cell(sideS, "cell1");
        nc.atatchListeners();
        var pos = cellOb.getPosition();
        var sideS1 = sideS+4;
        switch(nPos){
            case 1:
                nc.setPosition(pos[0]-sideS1, pos[1]-sideS1);
                nc.render(parent);
            break;
            case 2:
                nc.setPosition(pos[0], pos[1]-sideS1);
                nc.render(parent);
            break;
            case 3:
                nc.setPosition(pos[0]+sideS1, pos[1]-sideS1);
                nc.render(parent);
            break;
            case 4:
                nc.setPosition(pos[0]-sideS1, pos[1]);
                nc.render(parent);
            break;
            case 5:
                nc.setPosition(pos[0]+sideS1, pos[1]);
                nc.render(parent);
            break;
            case 6:
                nc.setPosition(pos[0]-sideS1, pos[1]+sideS1);
                nc.render(parent);
            break;
            case 7:
                nc.setPosition(pos[0], pos[1]+sideS1);
                nc.render(parent);
            break;
            case 8:
                nc.setPosition(pos[0]+sideS1, pos[1]+sideS1);
                nc.render(parent);
            break;
        }
        findNeighbours();
    }

    function findNeighbours() {
        var cellArray = cellC.getCellsArray();
        var sd = sideS+4;
        var sd1 = sd*(cellContainerSize-1);
            var len = cellArray.length;
            for (var i = 0; i < len; i++) {
                var count = 0;
                var pos1 = cellArray[i].getPosition();
                var neigbours = cellArray[i].getNeighbours();
                for (var l = 0; l < 8; l++) {
                    if(neigbours[l]) count++;
                }
                if((pos1[0] == 0 && pos1[1] == 0) || (pos1[0] == sd1 && pos1[1] == sd1) || (pos1[0] == 0 && pos1[1] == sd1) || (pos1[0] == sd1 && pos1[1] == 0)) {
                    if(count == 3) {
                        console.log("N"+(i+1)+"cell's neighbours are all.");
                        continue;
                    }
                }
                else if(pos1[0] == 0 || pos1[0] == sd1) {
                    if(count == 5) {
                        console.log("N"+(i+1)+"cell's neighbours are all.");
                        continue;
                    }
                }
                else if(pos1[1] == 0 || pos1[1] == sd1) {
                    if(count == 5) {
                        console.log("N"+(i+1)+"cell's neighbours are all.");
                        continue;
                    }
                }
                else if(count == 8) {
                    console.log("N"+(i+1)+"cell's neighbours are all.");
                    continue;
                }
                for (var j = 0; j < len; j++) {
                    if(j==i) {
                        continue;
                    }
                    else {
                        var plusDivs = (cellArray[i].getElement()).children("div"); 
                        var neighboursPos = [[pos1[0]-sd, pos1[1]-sd], [pos1[0], pos1[1]-sd], [pos1[0]+sd, pos1[1]-sd], [pos1[0]-sd, pos1[1]], [pos1[0]+sd, pos1[1]], [pos1[0]-sd, pos1[1]+sd], [pos1[0], pos1[1]+sd], [pos1[0]+sd, pos1[1]+sd]];
                        var pos2 = cellArray[j].getPosition();
                        var posLen = neighboursPos.length;
                        for (var k = 0; k < posLen; k++) {
                            if(pos2[0] == neighboursPos[k][0] && pos2[1] == neighboursPos[k][1]) {
                                if(!neigbours[k]) {
                                    cellArray[i].setNeighbours(k+1, cellArray[j]);
                                }
                                else {
                                    console.log("This neighbour allready has been.")
                                }
                                if(k == 1) {
                                    $(plusDivs[0]).off();
                                }
                                else if(k == 3) {
                                   $(plusDivs[3]).off();
                                }
                                else if(k == 4) {
                                   $(plusDivs[1]).off();
                                }
                                else if(k == 6) {
                                   $(plusDivs[2]).off();
                                }
                                    
                            }
                        }
                    }
                }
                
                console.log("N"+(i+1)+" cell's neigbours is: "+cellArray[i].getNeighbours());
            }
    }
    
    this.atatchListeners = function() {
        var t=false;
        var self = this;
        var plusArray = _element.children("div");
        // top plus btn
        $(plusArray[0]).on("click", function(e) {
            _renderNeigbour(self, 2);
            // $(this).off("click"); 
            // $(this).mouseleave(function(){
            //     $(this).off();
            // });
            $(this).empty();
        });
        $(plusArray[1]).on("click", function(e) {
            _renderNeigbour(self, 5); 
            // $(this).off("click");
            // $(this).mouseleave(function(){
            //     $(this).off();
            // });
            $(this).empty();
            
        });
        $(plusArray[2]).on("click", function(e) {
            _renderNeigbour(self, 7);
            // $(this).off("click");
            // $(this).mouseleave(function(){
            //     $(this).off();
            // });
            $(this).empty();
            
        });
        $(plusArray[3]).on("click", function(e) {
            _renderNeigbour(self, 4);
            // $(this).off("click");
            // $(this).mouseleave(function(){
            //     $(this).off();
            // });
            $(this).empty();
            
        });
        $(plusArray).hover( 
            function() {
                $(this).css({
                    "opacity":"1"
                    
                });
            },
            function() {
                $(this).css({
                    "opacity":"0"
                });
            }
        );
    
    };
    
    this.render = function (pelem) {
        if(typeof pelem == "string"){
            $(pelem).append(_element);
        }
        else{
            pelem.append(_element);
        }
        cellC.pushCell(this);
       // console.log(cellC.getCellsArray());
        // if there are neigbours set them in _neighbours array
    };
                 
	this.setPosition=function(x1,y1){
		_x = x1;
		_y = y1;
        var sd1 = (sideS+4)*(cellContainerSize-1);
        var el = this.getElement();
        var divs = el.children("div");
        var par = el.parent();
        if(par) 
        {
           el.css({
            "top":_y,
            "left":_x
           });
        }
        else{
            alert("You mast append the cell element.")
        }
        if(x1 == 0) {
            $(divs[3]).off();
        }
        if(y1 == 0) {
            $(divs[0]).off();
        }
        if(x1 == sd1) {
            $(divs[1]).off();
        }
        if(y1 == sd1) {
            $(divs[2]).off();  
        }
        
	};
    
	this.getPosition=function(){
		return [_x,_y];
	};
    
	this.setNeighbours = function(position, cell){
		_neighbours[position-1] = cell;
	};
    
	this.getNeighbours = function(){
		return _neighbours;
	};
}
