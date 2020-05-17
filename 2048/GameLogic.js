function drag(line) {
  ret=copyArray1D(line)
  let orw = ret.length;
  for (let i = ret.length - 1; i >= 0; i--) {
    if (ret[i] == 0) {
      ret.splice(i, 1);
    }
  }
  while (ret.length != orw) {
    ret.unshift(0);
  }
  return ret;
}

function add(line) {
  let moved = !checkEqual1D(line,drag(line));
  line = drag(line);
  for (let i = line.length - 1; i >= 1; i--) {
    if (line[i] == line[i - 1] && line[i]!=0) {
      line[i] = line[i - 1] + line[i];
      line[i - 1] = 0;
      score+=line[i];
      i--;
      moved=true;
    }
  }
  line = drag(line);
  return [line, moved]
}

function down(arr) {
  arr = copyArray(arr);
  let moved = false;
  for (let i = 0; i < arr.length; i++) {
    let a = add(arr[i]);
    if (a[1]) {
      moved = true;
    };
    arr[i] = a[0];
  }
  return [arr, moved];
}

function right(arr){
  arr = copyArray(arr);

  arr=transpose(arr);
  a=down(arr);
  a[0]=transpose(a[0]);
  return a;
}

function left(arr){
  arr = copyArray(arr);

  arr=reverseX(arr);
  a=right(arr);
  a[0]=reverseX(a[0]);
  return a;
}

function up(arr){
  arr = copyArray(arr);

  arr=reverseY(arr);
  a=down(arr);
  a[0]=reverseY(a[0]);
  return a;
}
