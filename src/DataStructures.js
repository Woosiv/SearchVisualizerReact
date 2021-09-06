class PriorityQueue {

    // Elements will be stored in format of [element, value]
    constructor() {
        this.heap = [];
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    push(element) {
        this.heap.push(element);
        if (this.heap.length === 1) {
            return;
        }
        this.heapUp(this.heap.length - 1);
    }

    heapUp(index) {
        let parentIndex = Math.floor((index - 1) / 2);
        if (parentIndex < 0) {
            return;
        }
        // console.log(parentIndex)
        // console.log('Values of parent and child')
        // console.log(this.heap[index][1])
        // console.log(this.heap[parentIndex][1])
        // Check if they are in correct order
        if (this.heap[index][1] < this.heap[parentIndex][1]) {
            // console.log('swapped')
            let temp = this.heap[parentIndex];
            this.heap[parentIndex] = this.heap[index];
            this.heap[index] = temp;
            this.heapUp(parentIndex);
        }
    }

    pop() {
        let min = this.heap[0];
        if (this.heap.length !== 1) {
            this.heap[0] = this.heap.pop();
            this.heapDown(0);
        }
        else {
            this.heap.pop();
        }
        return min;
    }

    heapDown(index) {
        let length = this.heap.length;
        let left = 2 * index + 1;
        let right = 2 * index + 2;
        let smallerIndex = null;
        // Take the smallest child
        if (left < length) {
            smallerIndex = left;
        }
        if (right < length && this.heap[right][1] < this.heap[smallerIndex][1]) {
            smallerIndex = right;
        }
        if (smallerIndex == null) {
            return;
        }
        // check if the smallest child is smaller than the parent
        if (this.heap[smallerIndex][1] < this.heap[index][1]) {
            let temp = this.heap[smallerIndex];
            this.heap[smallerIndex] = this.heap[index];
            this.heap[index] = temp;
            this.heapDown(smallerIndex);
        }
    }

    delete(index) {
        let deleted = this.heap[index][1];
        this.heap[index] = this.heap.pop();
        if (this.heap[index][1] < deleted) {
            this.heapUp(index);
        }
        else if (this.heap[index][1] > deleted) {
            this.heapDown(index);
        }
    }
}

class Queue {
    constructor() {
        this.queue = {};
        this.head = 0;
        this.tail = 0;
    }
    push(item) {
        this.queue[this.tail++] = item;
    }
    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        let res = this.queue[this.head];
        delete this.queue[this.head++];
        return res;
    }
    isEmpty() {
        return this.head === this.tail;
    }
    toString() {
        let temp = this.head;
        while (temp !== this.tail) {
            console.log(this.queue[temp++]);
        }
    }
}


export {Queue, PriorityQueue};