function setup() {
  var sll = new LinkedList();
  
  sll.push(2)
  sll.push(3)
  sll.push(1)
  sll.push(4)
  
  console.log(sll.head.value);
  console.log(sll.head.next.value);
  console.log(sll.head.next.next.value);
  //printList(first)
  
}

function draw() {
  
}



function LinkedList() {
  this.head = null;
}

LinkedList.prototype.push = function(value) {
  var node = {
    value: value,
    next: null
  }
  if(!this.head) {
    this.head = node;
  }
  else {
    current = this.head;
    while(current.next) {
      current = current.next;
    }
    current.next = node;
  }
}

function printList(head) {
  var n = head;
  while(n.nextnode !== null) {
    console.log(n.nextnode.data)
    console.log('ye')
  }
}