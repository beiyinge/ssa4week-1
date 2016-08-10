// Finds the first prime number
function showFindIndex() {
    console.log('showFindIndex()');
    var origArr = [100, 50, 11, 10, 7];
    var index = origArr.findIndex(function(element, index, array) {
        if((element % 2) != 0) {
            return true;
        }
        else {
            return false;
        }
    });
  console.log('origArr=' + origArr);
  console.log('index of Prime=' + index);
}

// Multipies each element by 2
function showForEach() {
    console.log('showForEach');
    var origArr = [ 50, 100, 60, 200 ];
    origArr.forEach(function(val) {
        console.log((val*2) + ', ');
    });
    console.log('origArr=' + origArr);
}

// find the occurrance of HELLO
function showIncludes() {
    console.log('showIncludes()');
    var origArr = [ 'HI', 'BYE', 'HELLO', 'GOOD-BYE' ];
    console.log('includes HI=' + origArr.includes('HI'));
    console.log('origArr=' + origArr);
}

function showIndexOf() {
    console.log('showIndexOf');
    var origArr = [ 'HI', 'BYE', 'HELLO', 'GOOD-BYE' ];
    console.log('indexOf HELLO=' + origArr.indexOf('HELLO'));
    console.log('origArr=' + origArr);
}

function showJoin() {
    console.log('showJoin');
    var origArr = [ 'HI', 'BYE', 'HELLO', 'GOOD-BYE' ];
    console.log('join all elements into string=' + origArr.join('|'));
    console.log('origArr=' + origArr);
}

showFindIndex();
showForEach();
showIncludes();
showIndexOf();
showJoin();

