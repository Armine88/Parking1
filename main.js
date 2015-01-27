var ParkingDB = {};
var cellC = new CellContainer();


function Park () {
	var _is24hour = false;
	var _isfull = false;
	var _cellPrice = 10;
    var _parkTpl = [
                    '<div class="parkContainer">',
                        '<div>+</div>',
                        '<div>',
                            '<span>10</span>',
                            '<input type="range" value="10" min="10" max="100" step="10" id="range">',
                            '<span>100</span>',
                            '<p>Price of a cell is <span id="valBox">10</span> dram.</p>',
                            '<button>Save</button>',
                        '</div>',
                    '</div>'
                    ].join("");
    var _parkElem = $(_parkTpl);

    this.atatchListeners = function() {
        var self = this;
        var  childArray = _parkElem.children("div");
        $(childArray[0]).click(function() {  
            cellC.renderCellContainer();
            var c1 = new Cell();
            c1.render(cellC.getCellContElem());
            c1.setPosition(0,0);
            c1.atatchListeners();
        });
        $("input").change(function() {
            $('#valBox').text($(this).val());
            self.setCellPrice($(this).val());
        });
        $("button").click(function(){
            var cellArray = cellC.getCellsArray();
            var l = cellArray.length;
            for (var i = 0; i < l; i++) {
                ParkingDB[i] = cellArray[i].getPosition();
            };
            console.log(JSON.stringify(ParkingDB));
        });
    }

    this.getParkElem = function() {
        return _parkElem;
    }

	this.renderPark = function() {
        $("body").append(this.getParkElem());
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

function CellContainer(){
	var _cells = [];
    var _cellContTpl = '<div class="cellContainer"></div>';
    var _cellContElem = $(_cellContTpl);

    this.getCellContElem = function() {
        return _cellContElem;
    }

    this.renderCellContainer = function() {
        $("body").append(this.getCellContElem());
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

function Cell() {
	var _x=0, _y=0;
	var _neighbours = [];
    var _cellTpl = [
                    '<div class = "cell">',
                        '<div></div>',
                        '<div></div>',
                        '<div></div>',
                        '<div></div>',
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
        var nc = new Cell();
        
        var pos = cellOb.getPosition();
        switch(nPos){
            case 1:
            if(pos[0]-54 >= 0 && pos[1]-54 >= 0 && pos[0]-54 < 540 && pos[1] < 540) {
                nc.setPosition(pos[0]-54, pos[1]-54);
                nc.render(parent);
                cellOb.setNeighbours(nPos, nc);
            }
            break;
            case 2:
            if(pos[1]-54 >= 0 && pos[1]-54 < 540 && pos[0] < 540){
                nc.setPosition(pos[0], pos[1]-54);
                nc.render(parent);
                cellOb.setNeighbours(nPos, nc);
            }
            break;
            case 3:
            if(pos[0]+54 < 540 && pos[1]-54 >= 0 && pos[1]-54 < 540) {
                nc.setPosition(pos[0]+54, pos[1]-54);
                nc.render(parent);
                cellOb.setNeighbours(nPos, nc);
            }
            break;
            case 4:
            if(pos[0]-54 >= 0 && pos[0]-54 < 540 && pos[1] < 540) {
                nc.setPosition(pos[0]-54, pos[1]);
                nc.render(parent);
                cellOb.setNeighbours(nPos, nc);
            }
            break;
            case 5:
            if(pos[0]+54 < 540 && pos[1] < 540) {
                nc.setPosition(pos[0]+54, pos[1]);
                nc.render(parent);
                cellOb.setNeighbours(nPos, nc);
            }
            break;
            case 6:
            if(pos[0]-54 >= 0 && pos[0]-54 < 540 && pos[1]+54 < 540) {
                nc.setPosition(pos[0]-54, pos[1]+54);
                nc.render(parent);
                cellOb.setNeighbours(nPos, nc);
            }
            break;
            case 7:
            if(pos[0] >= 0 && pos[0] < 540 && pos[1]+54 < 540) {
                nc.setPosition(pos[0], pos[1]+54);
                nc.render(parent);
                cellOb.setNeighbours(nPos, nc);
            }
            break;
            case 8:
            if(pos[0]+54 < 540 && pos[1]+54 < 540) {
                nc.setPosition(pos[0]+54, pos[1]+54);
                nc.render(parent);
                cellOb.setNeighbours(nPos, nc);
            }
            break;
        }
        nc.setNeighbours(9-nPos, cellOb);
        nc.atatchListeners();
    }
    
    this.atatchListeners = function() {
        var self = this;
        var plusArray = _element.children("div");
        // top plus btn
        $(plusArray[0]).on("click", function() {
            _renderNeigbour(self, 2);
            console.log(self.getNeighbours());
        });
        $(plusArray[1]).on("click", function() {
            _renderNeigbour(self, 5);
             console.log(self.getNeighbours());
        });
        $(plusArray[2]).on("click", function() {
            _renderNeigbour(self, 7);
            console.log(self.getNeighbours());
        });
        $(plusArray[3]).on("click", function() {
            _renderNeigbour(self, 4);
            console.log(self.getNeighbours());
        });
    
    };
    
    this.render = function (pelem) {
        if(typeof pelem == "string"){
            $(pelem).append(_element);
        }
        else{
            pelem.append(_element);
        }
        cellC.pushCell(this);
        console.log((cellC.getCellsArray()).length);
        // if there are neigbours set them in _neighbours array
    };
                 
	this.setPosition=function(x1,y1){
		_x = x1;
		_y = y1;
        var el = this.getElement();
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
